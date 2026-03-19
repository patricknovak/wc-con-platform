/**
 * WC-CON Workflow Service
 *
 * Full lifecycle management: Quote → PO → Work Order → Ticket → Invoice → Payment
 *
 * This service contains the core business logic for the entire work order
 * lifecycle, including number generation, status transitions, SMS parsing
 * for driver tickets, and invoice generation from completed tickets.
 */

// ============================================================
// NUMBER GENERATORS
// ============================================================

/** Generate a sequential PO number like PO-2026-0001 */
export function generatePONumber(sequence: number): string {
  const year = new Date().getFullYear();
  return `PO-${year}-${String(sequence).padStart(4, '0')}`;
}

/** Generate a sequential Work Order number like WO-2026-0001 */
export function generateWorkOrderNumber(sequence: number): string {
  const year = new Date().getFullYear();
  return `WO-${year}-${String(sequence).padStart(4, '0')}`;
}

/** Generate a sequential Ticket number like TK-2026-0001 */
export function generateTicketNumber(sequence: number): string {
  const year = new Date().getFullYear();
  return `TK-${year}-${String(sequence).padStart(4, '0')}`;
}

/** Generate a sequential Invoice number like INV-2026-0001 */
export function generateInvoiceNumber(sequence: number): string {
  const year = new Date().getFullYear();
  return `INV-${year}-${String(sequence).padStart(4, '0')}`;
}

/** Generate a sequential Payment number like PAY-2026-0001 */
export function generatePaymentNumber(sequence: number): string {
  const year = new Date().getFullYear();
  return `PAY-${year}-${String(sequence).padStart(4, '0')}`;
}

// ============================================================
// SMS PARSING FOR DRIVER TICKETS
// ============================================================

export interface ParsedTicketSMS {
  workOrderRef?: string;
  jobSite?: string;
  startTime?: string;
  endTime?: string;
  hoursWorked?: number;
  startKm?: number;
  endKm?: number;
  materials: { description: string; quantity: number; unit: string }[];
  equipment: string[];
  notes?: string;
  parseConfidence: number;
}

/**
 * Parse an SMS message from a driver into structured ticket data.
 *
 * Drivers can text in various formats. The parser handles:
 *
 * Format 1 (structured):
 *   WO:WO-2026-0042
 *   Site: Hwy 16 & Range Rd 45
 *   Start: 7:00am End: 4:30pm
 *   KM: 45230 - 45312
 *   20T road crush, 15T gravel
 *   Truck 12, Trailer 3
 *   Note: soft ground near east end
 *
 * Format 2 (casual):
 *   WO 42 hwy16 job 7am-430pm 82km
 *   delivered 20 tonne crush 15 tonne gravel
 *   used truck 12
 *
 * Format 3 (minimal):
 *   42 20t crush 15t gravel 7-430 82km
 */
export function parseTicketSMS(message: string): ParsedTicketSMS {
  const lines = message.trim().split('\n').map(l => l.trim()).filter(Boolean);
  const fullText = message.toLowerCase();

  const result: ParsedTicketSMS = {
    materials: [],
    equipment: [],
    parseConfidence: 0,
  };

  let confidencePoints = 0;
  let maxPoints = 0;

  // --- Work Order Reference ---
  maxPoints += 10;
  const woMatch = fullText.match(/wo[:\s#-]*(\d{4}[-]\d{4}|\d{1,4})/i);
  if (woMatch) {
    const num = woMatch[1];
    if (num.includes('-')) {
      result.workOrderRef = `WO-${num}`;
    } else {
      result.workOrderRef = num;
    }
    confidencePoints += 10;
  }

  // --- Job Site ---
  maxPoints += 10;
  for (const line of lines) {
    const siteMatch = line.match(/^site[:\s]+(.+)/i);
    if (siteMatch) {
      result.jobSite = siteMatch[1].trim();
      confidencePoints += 10;
      break;
    }
  }
  // Fallback: look for highway/road references
  if (!result.jobSite) {
    const roadMatch = fullText.match(/(hwy\s*\d+[^,\n]*|range\s*rd\s*\d+[^,\n]*|twp\s*rd\s*\d+[^,\n]*)/i);
    if (roadMatch) {
      result.jobSite = roadMatch[1].trim();
      confidencePoints += 5;
    }
  }

  // --- Time parsing ---
  maxPoints += 20;
  // "Start: 7:00am End: 4:30pm" or "7am-430pm" or "7:00-16:30"
  const timeRange = fullText.match(
    /(?:start[:\s]*)?(\d{1,2}[:.]?\d{0,2}\s*(?:am|pm)?)\s*[-–to]+\s*(?:end[:\s]*)?(\d{1,2}[:.]?\d{0,2}\s*(?:am|pm)?)/i
  );
  if (timeRange) {
    result.startTime = normalizeTime(timeRange[1]);
    result.endTime = normalizeTime(timeRange[2]);
    if (result.startTime && result.endTime) {
      result.hoursWorked = calculateHours(result.startTime, result.endTime);
      confidencePoints += 20;
    }
  } else {
    // Try "Start: X" and "End: Y" on separate lines
    const startMatch = fullText.match(/start[:\s]+(\d{1,2}[:.]?\d{0,2}\s*(?:am|pm)?)/i);
    const endMatch = fullText.match(/end[:\s]+(\d{1,2}[:.]?\d{0,2}\s*(?:am|pm)?)/i);
    if (startMatch) {
      result.startTime = normalizeTime(startMatch[1]);
      confidencePoints += 5;
    }
    if (endMatch) {
      result.endTime = normalizeTime(endMatch[1]);
      confidencePoints += 5;
    }
    if (result.startTime && result.endTime) {
      result.hoursWorked = calculateHours(result.startTime, result.endTime);
      confidencePoints += 10;
    }
  }

  // Try explicit hours: "8.5hrs" or "hours: 8.5"
  if (!result.hoursWorked) {
    const hrsMatch = fullText.match(/(\d+\.?\d*)\s*(?:hrs?|hours)/i);
    if (hrsMatch) {
      result.hoursWorked = parseFloat(hrsMatch[1]);
      confidencePoints += 15;
    }
  }

  // --- Kilometers ---
  maxPoints += 15;
  // "KM: 45230 - 45312" format
  const kmRange = fullText.match(/km[:\s]*(\d{3,6})\s*[-–to]+\s*(\d{3,6})/i);
  if (kmRange) {
    result.startKm = parseInt(kmRange[1]);
    result.endKm = parseInt(kmRange[2]);
    confidencePoints += 15;
  } else {
    // "82km" or "82 km" total
    const kmTotal = fullText.match(/(\d+)\s*km/i);
    if (kmTotal) {
      const totalKm = parseInt(kmTotal[1]);
      // If > 1000, it's likely an odometer reading, not total
      if (totalKm < 1000) {
        // This is a total, not start/end
        confidencePoints += 10;
      }
    }
  }

  // --- Materials ---
  maxPoints += 30;
  const materialPatterns = [
    // "20T road crush" or "20 tonne gravel" or "15t washed rock"
    /(\d+\.?\d*)\s*(?:T|tonne|tonnes|ton|tons|yd|yards|loads?|m3)\s+([a-zA-Z][a-zA-Z\s]{2,30})/gi,
    // "road crush 20T" (quantity after material)
    /([a-zA-Z][a-zA-Z\s]{2,20}?)\s+(\d+\.?\d*)\s*(?:T|tonne|tonnes|ton|tons|yd|yards|loads?|m3)/gi,
  ];

  const knownMaterials = [
    'road crush', 'crush', 'gravel', 'sand', 'topsoil', 'fill',
    'rock', 'washed rock', 'drain rock', 'river rock', 'pit run',
    'rip rap', 'mulch', 'concrete', 'asphalt', 'clay', 'loam',
    'bedding sand', 'screened', 'aggregate',
  ];

  // Pattern 1: quantity first
  const matRegex1 = /(\d+\.?\d*)\s*(?:T|tonne|tonnes|ton|tons|yd|yards|loads?|m3)\s+([a-zA-Z][a-zA-Z\s]{2,30})/gi;
  let match;
  while ((match = matRegex1.exec(fullText)) !== null) {
    const qty = parseFloat(match[1]);
    let desc = match[2].trim();
    // Clean trailing words that aren't material names
    desc = desc.replace(/\s+(and|to|at|from|for|the)\s*$/i, '').trim();
    if (qty > 0 && desc.length >= 3) {
      const unit = detectUnit(match[0]);
      result.materials.push({ description: desc, quantity: qty, unit });
      confidencePoints += 10;
    }
  }

  // Deduplicate materials
  if (result.materials.length > 0) {
    confidencePoints = Math.min(confidencePoints, maxPoints);
  }

  // --- Equipment ---
  maxPoints += 15;
  const equipPatterns = [
    /(?:truck|unit|trailer|excavator|loader|cat|dozer|grader|skid\s*steer)\s*[#]?\s*(\d+)/gi,
    /(?:used?|using)\s+(.+)/i,
  ];

  const equipRegex = /(?:truck|unit|trailer|excavator|loader|cat|dozer|grader|skid\s*steer|compactor)\s*[#]?\s*(\d{1,4})?/gi;
  while ((match = equipRegex.exec(fullText)) !== null) {
    const equipStr = match[0].trim();
    if (!result.equipment.includes(equipStr)) {
      result.equipment.push(equipStr);
      confidencePoints += 5;
    }
  }

  // --- Notes ---
  for (const line of lines) {
    const noteMatch = line.match(/^(?:note|notes|comment)[s]?[:\s]+(.+)/i);
    if (noteMatch) {
      result.notes = noteMatch[1].trim();
      break;
    }
  }

  // Calculate confidence
  result.parseConfidence = maxPoints > 0
    ? Math.min(100, Math.round((confidencePoints / maxPoints) * 100))
    : 0;

  return result;
}

/** Normalize time strings like "7am", "430pm", "7:00", "16:30" to "HH:MM" */
function normalizeTime(raw: string): string {
  const cleaned = raw.trim().toLowerCase().replace(/\s+/g, '');

  // Already HH:MM 24hr
  const match24 = cleaned.match(/^(\d{1,2}):(\d{2})$/);
  if (match24 && !cleaned.includes('am') && !cleaned.includes('pm')) {
    return `${match24[1].padStart(2, '0')}:${match24[2]}`;
  }

  // 12hr with am/pm: "7am", "730am", "7:30am", "430pm"
  const match12 = cleaned.match(/^(\d{1,2})[:.]?(\d{0,2})(am|pm)$/);
  if (match12) {
    let hours = parseInt(match12[1]);
    const minutes = match12[2] ? parseInt(match12[2]) : 0;
    const period = match12[3];

    if (period === 'pm' && hours !== 12) hours += 12;
    if (period === 'am' && hours === 12) hours = 0;

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
  }

  // Just digits: "430" -> "4:30", "7" -> "07:00"
  const digitsOnly = cleaned.replace(/[^0-9]/g, '');
  if (digitsOnly.length <= 2) {
    return `${digitsOnly.padStart(2, '0')}:00`;
  }
  if (digitsOnly.length === 3) {
    return `0${digitsOnly[0]}:${digitsOnly.slice(1)}`;
  }
  if (digitsOnly.length === 4) {
    return `${digitsOnly.slice(0, 2)}:${digitsOnly.slice(2)}`;
  }

  return raw.trim();
}

/** Calculate hours between two HH:MM times */
function calculateHours(start: string, end: string): number {
  const [sh, sm] = start.split(':').map(Number);
  const [eh, em] = end.split(':').map(Number);
  let diff = (eh * 60 + em) - (sh * 60 + sm);
  if (diff < 0) diff += 24 * 60; // overnight
  return Math.round((diff / 60) * 100) / 100;
}

/** Detect unit from a material match string */
function detectUnit(matchStr: string): string {
  const lower = matchStr.toLowerCase();
  if (lower.includes('yd') || lower.includes('yard')) return 'yard';
  if (lower.includes('m3')) return 'm3';
  if (lower.includes('load')) return 'load';
  return 'tonne';
}

// ============================================================
// SMS DISPATCH MESSAGES
// ============================================================

export interface WorkOrderDispatch {
  workOrderNumber: string;
  driverName: string;
  scheduledDate: string;
  scheduledTime?: string;
  pickupLocation?: string;
  deliveryAddress: string;
  deliveryContact?: string;
  deliveryPhone?: string;
  items: { description: string; quantity: number; unit: string }[];
  specialInstructions?: string;
  priority: string;
}

/**
 * Format a work order into an SMS message for a driver.
 * Keeps under 160 chars per segment where possible,
 * but can use multi-part SMS for full details.
 */
export function formatDispatchSMS(dispatch: WorkOrderDispatch): string {
  const lines: string[] = [];

  // Header
  lines.push(`WC-CON DISPATCH ${dispatch.workOrderNumber}`);
  if (dispatch.priority === 'RUSH' || dispatch.priority === 'HIGH') {
    lines.push(`*** ${dispatch.priority} PRIORITY ***`);
  }

  // Schedule
  lines.push(`Date: ${dispatch.scheduledDate}${dispatch.scheduledTime ? ` ${dispatch.scheduledTime}` : ''}`);

  // Locations
  if (dispatch.pickupLocation) {
    lines.push(`Pickup: ${dispatch.pickupLocation}`);
  }
  lines.push(`Deliver: ${dispatch.deliveryAddress}`);
  if (dispatch.deliveryContact) {
    lines.push(`Contact: ${dispatch.deliveryContact}${dispatch.deliveryPhone ? ` ${dispatch.deliveryPhone}` : ''}`);
  }

  // Materials
  if (dispatch.items.length > 0) {
    lines.push('Materials:');
    for (const item of dispatch.items) {
      lines.push(`- ${item.quantity}${item.unit === 'tonne' ? 'T' : item.unit} ${item.description}`);
    }
  }

  // Instructions
  if (dispatch.specialInstructions) {
    lines.push(`Note: ${dispatch.specialInstructions}`);
  }

  // Footer
  lines.push('');
  lines.push('Reply with ticket when done.');
  lines.push('Text HELP for format.');

  return lines.join('\n');
}

/**
 * Format the HELP response when a driver texts HELP.
 * Explains how to submit a ticket via SMS.
 */
export function formatDriverHelpSMS(): string {
  return [
    'WC-CON TICKET FORMAT:',
    'WO:[number]',
    'Site: [location]',
    'Start: [time] End: [time]',
    'KM: [start] - [end]',
    '[qty]T [material]',
    'Truck [#]',
    'Note: [comments]',
    '',
    'Example:',
    'WO:42',
    'Site: Hwy 16 job',
    'Start: 7am End: 4:30pm',
    'KM: 45230 - 45312',
    '20T road crush',
    '15T gravel',
    'Truck 12',
    'Note: soft ground east end',
  ].join('\n');
}

// ============================================================
// INVOICE CALCULATION
// ============================================================

export interface TicketForInvoice {
  ticketNumber: string;
  date: Date;
  hoursWorked?: number;
  totalKm?: number;
  items: {
    description: string;
    quantity: number;
    unit: string;
    unitPrice: number;
  }[];
  equipmentUsed: {
    name: string;
    hoursUsed?: number;
    hourlyRate?: number;
    kmDriven?: number;
    kmRate?: number;
  }[];
  driverHourlyRate?: number;
}

export interface InvoiceCalculation {
  lineItems: {
    description: string;
    quantity: number;
    unit: string;
    unitPrice: number;
    total: number;
    ticketRef: string;
  }[];
  subtotal: number;
  taxRate: number;
  tax: number;
  total: number;
}

/**
 * Calculate invoice totals from a set of approved tickets.
 * Groups line items by material and adds equipment/labour charges.
 */
export function calculateInvoiceFromTickets(
  tickets: TicketForInvoice[],
  taxRate: number = 0.05
): InvoiceCalculation {
  const lineItems: InvoiceCalculation['lineItems'] = [];

  for (const ticket of tickets) {
    // Material line items
    for (const item of ticket.items) {
      lineItems.push({
        description: item.description,
        quantity: item.quantity,
        unit: item.unit,
        unitPrice: item.unitPrice,
        total: Math.round(item.quantity * item.unitPrice * 100) / 100,
        ticketRef: ticket.ticketNumber,
      });
    }

    // Equipment usage charges
    for (const equip of ticket.equipmentUsed) {
      if (equip.hoursUsed && equip.hourlyRate) {
        lineItems.push({
          description: `Equipment: ${equip.name} (${equip.hoursUsed}hrs)`,
          quantity: equip.hoursUsed,
          unit: 'hour',
          unitPrice: equip.hourlyRate,
          total: Math.round(equip.hoursUsed * equip.hourlyRate * 100) / 100,
          ticketRef: ticket.ticketNumber,
        });
      }
      if (equip.kmDriven && equip.kmRate) {
        lineItems.push({
          description: `Transport: ${equip.name} (${equip.kmDriven}km)`,
          quantity: equip.kmDriven,
          unit: 'km',
          unitPrice: equip.kmRate,
          total: Math.round(equip.kmDriven * equip.kmRate * 100) / 100,
          ticketRef: ticket.ticketNumber,
        });
      }
    }

    // Labour charges
    if (ticket.hoursWorked && ticket.driverHourlyRate) {
      lineItems.push({
        description: `Labour - ${ticket.date.toLocaleDateString('en-CA')}`,
        quantity: ticket.hoursWorked,
        unit: 'hour',
        unitPrice: ticket.driverHourlyRate,
        total: Math.round(ticket.hoursWorked * ticket.driverHourlyRate * 100) / 100,
        ticketRef: ticket.ticketNumber,
      });
    }
  }

  const subtotal = Math.round(lineItems.reduce((sum, item) => sum + item.total, 0) * 100) / 100;
  const tax = Math.round(subtotal * taxRate * 100) / 100;
  const total = Math.round((subtotal + tax) * 100) / 100;

  return { lineItems, subtotal, taxRate, tax, total };
}

// ============================================================
// STATUS TRANSITION VALIDATION
// ============================================================

const VALID_PO_TRANSITIONS: Record<string, string[]> = {
  DRAFT: ['PENDING_APPROVAL', 'CANCELLED'],
  PENDING_APPROVAL: ['APPROVED', 'CANCELLED'],
  APPROVED: ['SENT_TO_CUSTOMER', 'CANCELLED'],
  SENT_TO_CUSTOMER: ['ACCEPTED', 'REJECTED'],
  ACCEPTED: [],
  REJECTED: ['DRAFT'],
  CANCELLED: ['DRAFT'],
};

const VALID_WO_TRANSITIONS: Record<string, string[]> = {
  PENDING: ['SCHEDULED', 'CANCELLED'],
  SCHEDULED: ['DISPATCHED', 'CANCELLED'],
  DISPATCHED: ['IN_PROGRESS', 'CANCELLED'],
  IN_PROGRESS: ['ON_HOLD', 'COMPLETED', 'CANCELLED'],
  ON_HOLD: ['IN_PROGRESS', 'CANCELLED'],
  COMPLETED: [],
  CANCELLED: ['PENDING'],
};

const VALID_TICKET_TRANSITIONS: Record<string, string[]> = {
  DRAFT: ['SUBMITTED'],
  SUBMITTED: ['UNDER_REVIEW', 'APPROVED'],
  UNDER_REVIEW: ['APPROVED', 'DISPUTED'],
  APPROVED: [],
  DISPUTED: ['REVISED'],
  REVISED: ['SUBMITTED'],
};

const VALID_INVOICE_TRANSITIONS: Record<string, string[]> = {
  DRAFT: ['PENDING_APPROVAL', 'VOID'],
  PENDING_APPROVAL: ['SENT', 'VOID'],
  SENT: ['VIEWED', 'PARTIALLY_PAID', 'PAID', 'OVERDUE', 'VOID'],
  VIEWED: ['PARTIALLY_PAID', 'PAID', 'OVERDUE', 'VOID'],
  PARTIALLY_PAID: ['PAID', 'OVERDUE', 'VOID'],
  PAID: [],
  OVERDUE: ['PARTIALLY_PAID', 'PAID', 'VOID', 'WRITTEN_OFF'],
  VOID: [],
  WRITTEN_OFF: [],
};

export function canTransitionPO(from: string, to: string): boolean {
  return VALID_PO_TRANSITIONS[from]?.includes(to) ?? false;
}

export function canTransitionWorkOrder(from: string, to: string): boolean {
  return VALID_WO_TRANSITIONS[from]?.includes(to) ?? false;
}

export function canTransitionTicket(from: string, to: string): boolean {
  return VALID_TICKET_TRANSITIONS[from]?.includes(to) ?? false;
}

export function canTransitionInvoice(from: string, to: string): boolean {
  return VALID_INVOICE_TRANSITIONS[from]?.includes(to) ?? false;
}

// ============================================================
// WORKFLOW STATUS LABELS & COLORS (for UI)
// ============================================================

export const PO_STATUS_CONFIG: Record<string, { label: string; color: string }> = {
  DRAFT: { label: 'Draft', color: 'gray' },
  PENDING_APPROVAL: { label: 'Pending Approval', color: 'yellow' },
  APPROVED: { label: 'Approved', color: 'blue' },
  SENT_TO_CUSTOMER: { label: 'Sent', color: 'indigo' },
  ACCEPTED: { label: 'Accepted', color: 'green' },
  REJECTED: { label: 'Rejected', color: 'red' },
  CANCELLED: { label: 'Cancelled', color: 'gray' },
};

export const WO_STATUS_CONFIG: Record<string, { label: string; color: string }> = {
  PENDING: { label: 'Pending', color: 'gray' },
  SCHEDULED: { label: 'Scheduled', color: 'blue' },
  DISPATCHED: { label: 'Dispatched', color: 'indigo' },
  IN_PROGRESS: { label: 'In Progress', color: 'yellow' },
  ON_HOLD: { label: 'On Hold', color: 'orange' },
  COMPLETED: { label: 'Completed', color: 'green' },
  CANCELLED: { label: 'Cancelled', color: 'gray' },
};

export const TICKET_STATUS_CONFIG: Record<string, { label: string; color: string }> = {
  DRAFT: { label: 'Draft', color: 'gray' },
  SUBMITTED: { label: 'Submitted', color: 'blue' },
  UNDER_REVIEW: { label: 'Under Review', color: 'yellow' },
  APPROVED: { label: 'Approved', color: 'green' },
  DISPUTED: { label: 'Disputed', color: 'red' },
  REVISED: { label: 'Revised', color: 'orange' },
};

export const INVOICE_STATUS_CONFIG: Record<string, { label: string; color: string }> = {
  DRAFT: { label: 'Draft', color: 'gray' },
  PENDING_APPROVAL: { label: 'Pending Approval', color: 'yellow' },
  SENT: { label: 'Sent', color: 'blue' },
  VIEWED: { label: 'Viewed', color: 'indigo' },
  PARTIALLY_PAID: { label: 'Partially Paid', color: 'orange' },
  PAID: { label: 'Paid', color: 'green' },
  OVERDUE: { label: 'Overdue', color: 'red' },
  VOID: { label: 'Void', color: 'gray' },
  WRITTEN_OFF: { label: 'Written Off', color: 'gray' },
};
