import { NextResponse } from 'next/server';

// TODO: Replace mock data with database queries (Prisma/Drizzle)
// import { db } from '@/lib/db';
// import { generateInvoiceNumber, calculateInvoiceFromTickets } from '@wc-con/workflow';

// ============================================================
// MOCK DATA - Realistic WC-CON invoices
// ============================================================

const mockInvoices = [
  {
    id: 'inv-001',
    invoiceNumber: 'INV-2026-0015',
    status: 'PAID',
    customerId: 'cust-005',
    customerName: 'Alberta Transportation - West Region',
    customerAddress: 'Alberta Transportation, Twin Atria Building, Edmonton, AB T6B 2X3',
    ticketIds: ['tk-001', 'tk-002'],
    poNumber: 'PO-2026-0005',
    woNumber: 'WO-2026-0045',
    lineItems: [
      {
        description: 'Road crush (25mm) - Load 1',
        quantity: 25,
        unit: 'tonne',
        unitPrice: 17.00,
        total: 425.00,
        ticketRef: 'TK-2026-0078',
      },
      {
        description: 'Road crush (25mm) - Load 2',
        quantity: 25,
        unit: 'tonne',
        unitPrice: 17.00,
        total: 425.00,
        ticketRef: 'TK-2026-0079',
      },
      {
        description: 'Trucking - Kenworth T800 Unit 12 (182km x 2 loads)',
        quantity: 364,
        unit: 'km',
        unitPrice: 3.25,
        total: 1183.00,
        ticketRef: 'TK-2026-0078',
      },
      {
        description: 'Labour - Mike Lewicki (11.5 hrs)',
        quantity: 11.5,
        unit: 'hour',
        unitPrice: 65.00,
        total: 747.50,
        ticketRef: 'TK-2026-0078',
      },
    ],
    subtotal: 2780.50,
    taxRate: 0.05,
    gst: 139.03,
    total: 2919.53,
    issueDate: '2026-03-18',
    dueDate: '2026-04-17',
    paidDate: '2026-03-19',
    notes: 'Highway 16 shoulder repair - first two loads',
    createdAt: '2026-03-18T10:00:00Z',
    updatedAt: '2026-03-19T14:00:00Z',
  },
  {
    id: 'inv-002',
    invoiceNumber: 'INV-2026-0016',
    status: 'SENT',
    customerId: 'cust-001',
    customerName: 'Yellowhead County Public Works',
    customerAddress: 'Yellowhead County Admin, 2716 - 1st Ave, Edson, AB T7E 1P7',
    ticketIds: [],
    poNumber: 'PO-2026-0001',
    woNumber: 'WO-2026-0042',
    lineItems: [
      {
        description: 'Road crush (25mm) - Hwy 16 & RR 45 maintenance',
        quantity: 75,
        unit: 'tonne',
        unitPrice: 18.50,
        total: 1387.50,
        ticketRef: 'Multiple',
      },
      {
        description: 'Trucking - 3 loads to Yellowhead County',
        quantity: 246,
        unit: 'km',
        unitPrice: 3.25,
        total: 799.50,
        ticketRef: 'Multiple',
      },
      {
        description: 'Operator labour - Mike Lewicki',
        quantity: 14.5,
        unit: 'hour',
        unitPrice: 65.00,
        total: 942.50,
        ticketRef: 'Multiple',
      },
    ],
    subtotal: 3129.50,
    taxRate: 0.05,
    gst: 156.48,
    total: 3285.98,
    issueDate: '2026-03-19',
    dueDate: '2026-04-18',
    paidDate: null,
    notes: 'Partial invoice - work in progress',
    createdAt: '2026-03-19T08:00:00Z',
    updatedAt: '2026-03-19T08:00:00Z',
  },
  {
    id: 'inv-003',
    invoiceNumber: 'INV-2026-0014',
    status: 'OVERDUE',
    customerId: 'cust-006',
    customerName: 'Pembina Pipeline Corporation',
    customerAddress: 'Pembina Pipeline, 4000 585 8th Ave SW, Calgary, AB T2P 1G1',
    ticketIds: [],
    poNumber: 'PO-2026-0098',
    woNumber: 'WO-2026-0038',
    lineItems: [
      {
        description: 'Pit run gravel - pipeline access road repair',
        quantity: 200,
        unit: 'tonne',
        unitPrice: 14.00,
        total: 2800.00,
        ticketRef: 'TK-2026-0060',
      },
      {
        description: 'Cat 320 excavator - ditch cleanout',
        quantity: 16,
        unit: 'hour',
        unitPrice: 185.00,
        total: 2960.00,
        ticketRef: 'TK-2026-0061',
      },
      {
        description: 'Trucking - 8 loads',
        quantity: 640,
        unit: 'km',
        unitPrice: 3.25,
        total: 2080.00,
        ticketRef: 'Multiple',
      },
    ],
    subtotal: 7840.00,
    taxRate: 0.05,
    gst: 392.00,
    total: 8232.00,
    issueDate: '2026-02-15',
    dueDate: '2026-03-17',
    paidDate: null,
    notes: 'NET 30 terms. Second notice sent.',
    createdAt: '2026-02-15T09:00:00Z',
    updatedAt: '2026-03-18T10:00:00Z',
  },
  {
    id: 'inv-004',
    invoiceNumber: 'INV-2026-0017',
    status: 'DRAFT',
    customerId: 'cust-001',
    customerName: 'Yellowhead County Public Works',
    customerAddress: 'Yellowhead County Admin, 2716 - 1st Ave, Edson, AB T7E 1P7',
    ticketIds: ['tk-003', 'tk-004'],
    poNumber: 'PO-2026-0001',
    woNumber: 'WO-2026-0042',
    lineItems: [
      {
        description: 'Road crush (25mm) - Today\'s deliveries',
        quantity: 50,
        unit: 'tonne',
        unitPrice: 18.50,
        total: 925.00,
        ticketRef: 'TK-2026-0080, TK-2026-0081',
      },
    ],
    subtotal: 925.00,
    taxRate: 0.05,
    gst: 46.25,
    total: 971.25,
    issueDate: null,
    dueDate: null,
    paidDate: null,
    notes: 'Pending - awaiting ticket approval',
    createdAt: '2026-03-19T16:00:00Z',
    updatedAt: '2026-03-19T16:00:00Z',
  },
];

// ============================================================
// GET /api/workflow/invoices
// List invoices with filtering
// ============================================================

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const customerId = searchParams.get('customerId');
    const dateFrom = searchParams.get('dateFrom');
    const dateTo = searchParams.get('dateTo');
    const search = searchParams.get('search');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');

    // TODO: Replace with database query
    // const invoices = await db.invoice.findMany({ where: { ... }, include: { customer: true, tickets: true } });
    let filtered = [...mockInvoices];

    if (status) {
      filtered = filtered.filter(inv => inv.status === status);
    }
    if (customerId) {
      filtered = filtered.filter(inv => inv.customerId === customerId);
    }
    if (dateFrom) {
      filtered = filtered.filter(inv => inv.issueDate && inv.issueDate >= dateFrom);
    }
    if (dateTo) {
      filtered = filtered.filter(inv => inv.issueDate && inv.issueDate <= dateTo);
    }
    if (search) {
      const q = search.toLowerCase();
      filtered = filtered.filter(inv =>
        inv.invoiceNumber.toLowerCase().includes(q) ||
        inv.customerName.toLowerCase().includes(q) ||
        (inv.poNumber && inv.poNumber.toLowerCase().includes(q))
      );
    }

    const offset = (page - 1) * limit;
    const paginated = filtered.slice(offset, offset + limit);

    return NextResponse.json({
      data: paginated,
      pagination: {
        page,
        limit,
        total: filtered.length,
        totalPages: Math.ceil(filtered.length / limit),
      },
    });
  } catch (error) {
    console.error('Error listing invoices:', error);
    return NextResponse.json(
      { error: 'Failed to list invoices' },
      { status: 500 }
    );
  }
}

// ============================================================
// POST /api/workflow/invoices
// Create an invoice from approved tickets
// ============================================================

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      ticketIds,
      customerId,
      customerName,
      customerAddress,
      poNumber,
      woNumber,
      notes,
      dueDate,
    } = body;

    if (!ticketIds || ticketIds.length === 0) {
      return NextResponse.json(
        { error: 'At least one ticket ID is required' },
        { status: 400 }
      );
    }

    if (!customerId) {
      return NextResponse.json(
        { error: 'Customer ID is required' },
        { status: 400 }
      );
    }

    // TODO: Fetch tickets from database and validate they are APPROVED
    // const tickets = await db.ticket.findMany({
    //   where: { id: { in: ticketIds }, status: 'APPROVED' },
    //   include: { materials: true, equipment: true },
    // });
    // if (tickets.length !== ticketIds.length) {
    //   return NextResponse.json({ error: 'Some tickets are not in APPROVED status' }, { status: 400 });
    // }

    // TODO: Use calculateInvoiceFromTickets from workflow service for real calculation
    // const calculation = calculateInvoiceFromTickets(ticketData, 0.05);

    // TODO: Replace with database sequence
    const sequence = mockInvoices.length + 1;
    const year = new Date().getFullYear();
    const invoiceNumber = `INV-${year}-${String(sequence + 14).padStart(4, '0')}`;

    // Mock line items based on ticket count
    const lineItems = ticketIds.map((ticketId: string, index: number) => ({
      description: `Materials and services - Ticket ${index + 1}`,
      quantity: 25,
      unit: 'tonne',
      unitPrice: 18.50,
      total: 462.50,
      ticketRef: ticketId,
    }));

    const subtotal = lineItems.reduce((sum: number, item: { total: number }) => sum + item.total, 0);
    const gst = Math.round(subtotal * 0.05 * 100) / 100;
    const total = Math.round((subtotal + gst) * 100) / 100;

    const issueDate = new Date().toISOString().split('T')[0];
    const calculatedDueDate = dueDate || (() => {
      const d = new Date();
      d.setDate(d.getDate() + 30);
      return d.toISOString().split('T')[0];
    })();

    const newInvoice = {
      id: `inv-${String(sequence).padStart(3, '0')}`,
      invoiceNumber,
      status: 'DRAFT',
      customerId,
      customerName: customerName || 'Unknown Customer',
      customerAddress: customerAddress || '',
      ticketIds,
      poNumber: poNumber || null,
      woNumber: woNumber || null,
      lineItems,
      subtotal,
      taxRate: 0.05,
      gst,
      total,
      issueDate,
      dueDate: calculatedDueDate,
      paidDate: null,
      notes: notes || '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // TODO: Save to database and mark tickets as invoiced
    // const created = await db.invoice.create({ data: newInvoice });
    // await db.ticket.updateMany({ where: { id: { in: ticketIds } }, data: { invoiced: true } });

    return NextResponse.json({ data: newInvoice }, { status: 201 });
  } catch (error) {
    console.error('Error creating invoice:', error);
    return NextResponse.json(
      { error: 'Failed to create invoice' },
      { status: 500 }
    );
  }
}
