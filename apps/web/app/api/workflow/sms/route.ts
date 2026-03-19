import { NextResponse } from 'next/server';

// TODO: Import from the actual workflow service package once bundling is configured
// import { parseTicketSMS, formatDriverHelpSMS } from '@wc-con/workflow';

// ============================================================
// INLINE HELPERS (duplicated from workflow service for now)
// TODO: Remove once @wc-con/workflow is importable in Next.js
// ============================================================

interface ParsedTicketSMS {
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

function parseTicketSMS(message: string): ParsedTicketSMS {
  const lines = message.trim().split('\n').map(l => l.trim()).filter(Boolean);
  const fullText = message.toLowerCase();

  const result: ParsedTicketSMS = {
    materials: [],
    equipment: [],
    parseConfidence: 0,
  };

  let confidencePoints = 0;
  let maxPoints = 0;

  // Work Order Reference
  maxPoints += 10;
  const woMatch = fullText.match(/wo[:\s#-]*(\d{4}[-]\d{4}|\d{1,4})/i);
  if (woMatch) {
    const num = woMatch[1];
    result.workOrderRef = num.includes('-') ? `WO-${num}` : num;
    confidencePoints += 10;
  }

  // Job Site
  maxPoints += 10;
  for (const line of lines) {
    const siteMatch = line.match(/^site[:\s]+(.+)/i);
    if (siteMatch) {
      result.jobSite = siteMatch[1].trim();
      confidencePoints += 10;
      break;
    }
  }
  if (!result.jobSite) {
    const roadMatch = fullText.match(/(hwy\s*\d+[^,\n]*|range\s*rd\s*\d+[^,\n]*|twp\s*rd\s*\d+[^,\n]*)/i);
    if (roadMatch) {
      result.jobSite = roadMatch[1].trim();
      confidencePoints += 5;
    }
  }

  // Time parsing
  maxPoints += 20;
  const timeRange = fullText.match(
    /(?:start[:\s]*)?(\d{1,2}[:.]?\d{0,2}\s*(?:am|pm)?)\s*[-–to]+\s*(?:end[:\s]*)?(\d{1,2}[:.]?\d{0,2}\s*(?:am|pm)?)/i
  );
  if (timeRange) {
    result.startTime = timeRange[1].trim();
    result.endTime = timeRange[2].trim();
    confidencePoints += 20;
  }

  // Kilometers
  maxPoints += 15;
  const kmRange = fullText.match(/km[:\s]*(\d{3,6})\s*[-–to]+\s*(\d{3,6})/i);
  if (kmRange) {
    result.startKm = parseInt(kmRange[1]);
    result.endKm = parseInt(kmRange[2]);
    confidencePoints += 15;
  }

  // Materials
  maxPoints += 30;
  const matRegex = /(\d+\.?\d*)\s*(?:T|tonne|tonnes|ton|tons|yd|yards|loads?|m3)\s+([a-zA-Z][a-zA-Z\s]{2,30})/gi;
  let match;
  while ((match = matRegex.exec(fullText)) !== null) {
    const qty = parseFloat(match[1]);
    let desc = match[2].trim().replace(/\s+(and|to|at|from|for|the)\s*$/i, '').trim();
    if (qty > 0 && desc.length >= 3) {
      const lower = match[0].toLowerCase();
      const unit = lower.includes('yd') || lower.includes('yard') ? 'yard'
        : lower.includes('m3') ? 'm3'
        : lower.includes('load') ? 'load'
        : 'tonne';
      result.materials.push({ description: desc, quantity: qty, unit });
      confidencePoints += 10;
    }
  }

  // Equipment
  maxPoints += 15;
  const equipRegex = /(?:truck|unit|trailer|excavator|loader|cat|dozer|grader|skid\s*steer|compactor)\s*[#]?\s*(\d{1,4})?/gi;
  while ((match = equipRegex.exec(fullText)) !== null) {
    const equipStr = match[0].trim();
    if (!result.equipment.includes(equipStr)) {
      result.equipment.push(equipStr);
      confidencePoints += 5;
    }
  }

  // Notes
  for (const line of lines) {
    const noteMatch = line.match(/^(?:note|notes|comment)[s]?[:\s]+(.+)/i);
    if (noteMatch) {
      result.notes = noteMatch[1].trim();
      break;
    }
  }

  result.parseConfidence = maxPoints > 0
    ? Math.min(100, Math.round((confidencePoints / maxPoints) * 100))
    : 0;

  return result;
}

// ============================================================
// MOCK DRIVER LOOKUP
// TODO: Replace with database query
// ============================================================

const mockDriversByPhone: Record<string, { id: string; name: string; activeWoId: string | null; activeWoNumber: string | null }> = {
  '+17805551201': { id: 'drv-001', name: 'Mike Lewicki', activeWoId: 'wo-001', activeWoNumber: 'WO-2026-0042' },
  '+17805551202': { id: 'drv-002', name: 'Travis Fehr', activeWoId: 'wo-002', activeWoNumber: 'WO-2026-0043' },
  '+17805551203': { id: 'drv-003', name: 'Kyle Brinson', activeWoId: null, activeWoNumber: null },
  '+17805551204': { id: 'drv-004', name: 'Dan Whitford', activeWoId: null, activeWoNumber: null },
  '+17805551205': { id: 'drv-005', name: 'Ryan Savard', activeWoId: null, activeWoNumber: null },
};

// ============================================================
// MOCK WORK ORDER STATUS LOOKUP
// ============================================================

const mockWorkOrderStatus: Record<string, { woNumber: string; status: string; customer: string; loads: string }> = {
  'wo-001': { woNumber: 'WO-2026-0042', status: 'IN_PROGRESS', customer: 'Yellowhead County', loads: '3/5 loads' },
  'wo-002': { woNumber: 'WO-2026-0043', status: 'DISPATCHED', customer: 'Yellowhead County', loads: '0/4 loads' },
  'wo-003': { woNumber: 'WO-2026-0044', status: 'SCHEDULED', customer: 'Parks Canada', loads: '0/8 loads' },
  'wo-004': { woNumber: 'WO-2026-0045', status: 'COMPLETED', customer: 'Alberta Transportation', loads: '16/16 loads' },
};

// ============================================================
// POST /api/workflow/sms
// Twilio webhook endpoint for receiving SMS from drivers
//
// Twilio sends POST with application/x-www-form-urlencoded body:
//   Body: the SMS text
//   From: sender phone number (e.g., +17805551201)
//   To: Twilio number
//   MessageSid: unique message ID
//   NumMedia: number of media attachments
// ============================================================

export async function POST(request: Request) {
  try {
    // Parse Twilio's form-encoded webhook data
    const formData = await request.formData();
    const smsBody = formData.get('Body') as string | null;
    const fromNumber = formData.get('From') as string | null;
    const toNumber = formData.get('To') as string | null;
    const messageSid = formData.get('MessageSid') as string | null;

    if (!smsBody || !fromNumber) {
      return twimlResponse('Error: Missing message data.');
    }

    const messageText = smsBody.trim();
    const upperText = messageText.toUpperCase();

    // TODO: Log incoming SMS to database for audit trail
    // await db.smsLog.create({
    //   data: { messageSid, from: fromNumber, to: toNumber, body: messageText, direction: 'INBOUND' },
    // });

    // Look up driver by phone number
    // TODO: Replace with database lookup
    // const driver = await db.driver.findUnique({ where: { phone: fromNumber } });
    const driver = mockDriversByPhone[fromNumber];

    if (!driver) {
      console.warn(`SMS from unknown number: ${fromNumber}`);
      return twimlResponse(
        'WC-CON: Unknown number. Contact dispatch at 780-865-XXXX to register your phone.'
      );
    }

    // ---- Handle HELP keyword ----
    if (upperText === 'HELP') {
      return twimlResponse([
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
        '7am-4:30pm',
        'KM: 45230-45312',
        '20T road crush',
        'Truck 12',
      ].join('\n'));
    }

    // ---- Handle STATUS keyword ----
    if (upperText === 'STATUS') {
      if (!driver.activeWoId) {
        return twimlResponse(
          `Hi ${driver.name}. No active work order assigned. Contact dispatch for your next job.`
        );
      }

      const woStatus = mockWorkOrderStatus[driver.activeWoId];
      if (!woStatus) {
        return twimlResponse(
          `Hi ${driver.name}. Could not find status for your work order. Contact dispatch.`
        );
      }

      return twimlResponse(
        `${driver.name} - ${woStatus.woNumber}\n` +
        `Status: ${woStatus.status}\n` +
        `Customer: ${woStatus.customer}\n` +
        `Progress: ${woStatus.loads}`
      );
    }

    // ---- Parse as ticket submission ----
    const parsed = parseTicketSMS(messageText);

    // If we got a work order ref, try to resolve the full WO number
    if (parsed.workOrderRef && !parsed.workOrderRef.startsWith('WO-')) {
      // Short ref like "42" - look up the full number
      // TODO: Query database for matching work order
      const woNum = parseInt(parsed.workOrderRef);
      if (!isNaN(woNum)) {
        parsed.workOrderRef = `WO-2026-${String(woNum).padStart(4, '0')}`;
      }
    }

    // Use driver's active work order if none specified
    if (!parsed.workOrderRef && driver.activeWoNumber) {
      parsed.workOrderRef = driver.activeWoNumber;
    }

    // Check parse confidence and respond accordingly
    if (parsed.parseConfidence < 30) {
      return twimlResponse(
        `Hi ${driver.name}, I couldn't understand your message. ` +
        `Text HELP for the ticket format, or call dispatch at 780-865-XXXX.`
      );
    }

    // Auto-create ticket from parsed data
    // TODO: Save to database
    // const ticket = await db.ticket.create({
    //   data: {
    //     driverId: driver.id,
    //     workOrderRef: parsed.workOrderRef,
    //     jobSite: parsed.jobSite,
    //     startTime: parsed.startTime,
    //     endTime: parsed.endTime,
    //     hoursWorked: parsed.hoursWorked,
    //     startKm: parsed.startKm,
    //     endKm: parsed.endKm,
    //     materials: parsed.materials,
    //     equipment: parsed.equipment,
    //     notes: parsed.notes,
    //     source: 'SMS',
    //     parseConfidence: parsed.parseConfidence,
    //     status: parsed.parseConfidence >= 70 ? 'SUBMITTED' : 'DRAFT',
    //     rawSms: messageText,
    //   },
    // });

    const ticketNumber = `TK-2026-${String(Math.floor(Math.random() * 9000) + 1000)}`;
    const status = parsed.parseConfidence >= 70 ? 'SUBMITTED' : 'DRAFT';

    // Build confirmation message
    const confirmLines: string[] = [];
    confirmLines.push(`Thanks ${driver.name}! Ticket ${ticketNumber} created.`);

    if (parsed.workOrderRef) {
      confirmLines.push(`WO: ${parsed.workOrderRef}`);
    }
    if (parsed.materials.length > 0) {
      const matSummary = parsed.materials
        .map(m => `${m.quantity}${m.unit === 'tonne' ? 'T' : m.unit} ${m.description}`)
        .join(', ');
      confirmLines.push(`Materials: ${matSummary}`);
    }

    confirmLines.push(`Confidence: ${parsed.parseConfidence}%`);

    if (status === 'DRAFT') {
      confirmLines.push('Low confidence - ticket saved as DRAFT. Office will review.');
    } else {
      confirmLines.push('Ticket submitted for review.');
    }

    return twimlResponse(confirmLines.join('\n'));
  } catch (error) {
    console.error('Error processing SMS webhook:', error);
    // Always return TwiML even on error so Twilio doesn't retry excessively
    return twimlResponse('WC-CON: Error processing your message. Please try again or call dispatch.');
  }
}

// ============================================================
// TwiML Response Helper
// Returns proper TwiML XML response for Twilio
// ============================================================

function twimlResponse(message: string): NextResponse {
  const twiml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Message>${escapeXml(message)}</Message>
</Response>`;

  return new NextResponse(twiml, {
    status: 200,
    headers: {
      'Content-Type': 'text/xml',
    },
  });
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}
