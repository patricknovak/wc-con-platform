import { NextResponse } from 'next/server';

// TODO: Replace mock data with database queries (Prisma/Drizzle)
// import { db } from '@/lib/db';
// import { generateTicketNumber, parseTicketSMS } from '@wc-con/workflow';

// ============================================================
// MOCK DATA - Realistic WC-CON driver tickets
// ============================================================

const mockTickets = [
  {
    id: 'tk-001',
    ticketNumber: 'TK-2026-0078',
    status: 'APPROVED',
    workOrderId: 'wo-004',
    woNumber: 'WO-2026-0045',
    driverId: 'drv-001',
    driverName: 'Mike Lewicki',
    date: '2026-03-17',
    jobSite: 'Hwy 16 km 298-305, West of Edson, AB',
    startTime: '06:00',
    endTime: '17:30',
    hoursWorked: 11.5,
    startKm: 145230,
    endKm: 145412,
    totalKm: 182,
    materials: [
      { description: 'Road crush (25mm)', quantity: 25, unit: 'tonne', unitPrice: 17.00 },
    ],
    equipment: ['Kenworth T800 - Unit 12', 'End dump trailer #3'],
    loadNumber: 1,
    notes: 'First load - road was clear. Pilot car met at km 298.',
    source: 'SMS',
    parseConfidence: 85,
    createdAt: '2026-03-17T17:35:00Z',
    updatedAt: '2026-03-18T09:00:00Z',
  },
  {
    id: 'tk-002',
    ticketNumber: 'TK-2026-0079',
    status: 'APPROVED',
    workOrderId: 'wo-004',
    woNumber: 'WO-2026-0045',
    driverId: 'drv-001',
    driverName: 'Mike Lewicki',
    date: '2026-03-17',
    jobSite: 'Hwy 16 km 298-305, West of Edson, AB',
    startTime: '06:00',
    endTime: '17:30',
    hoursWorked: 11.5,
    startKm: 145412,
    endKm: 145594,
    totalKm: 182,
    materials: [
      { description: 'Road crush (25mm)', quantity: 25, unit: 'tonne', unitPrice: 17.00 },
    ],
    equipment: ['Kenworth T800 - Unit 12', 'End dump trailer #3'],
    loadNumber: 2,
    notes: '',
    source: 'SMS',
    parseConfidence: 90,
    createdAt: '2026-03-17T17:36:00Z',
    updatedAt: '2026-03-18T09:00:00Z',
  },
  {
    id: 'tk-003',
    ticketNumber: 'TK-2026-0080',
    status: 'SUBMITTED',
    workOrderId: 'wo-001',
    woNumber: 'WO-2026-0042',
    driverId: 'drv-001',
    driverName: 'Mike Lewicki',
    date: '2026-03-19',
    jobSite: 'Hwy 16 & Range Rd 45, Yellowhead County',
    startTime: '07:00',
    endTime: '12:30',
    hoursWorked: 5.5,
    startKm: 146100,
    endKm: 146182,
    totalKm: 82,
    materials: [
      { description: 'Road crush (25mm)', quantity: 25, unit: 'tonne', unitPrice: 18.50 },
    ],
    equipment: ['Kenworth T800 - Unit 12', 'End dump trailer #3'],
    loadNumber: 1,
    notes: 'Soft ground near east approach - flagged for grader',
    source: 'SMS',
    parseConfidence: 78,
    createdAt: '2026-03-19T12:35:00Z',
    updatedAt: '2026-03-19T12:35:00Z',
  },
  {
    id: 'tk-004',
    ticketNumber: 'TK-2026-0081',
    status: 'SUBMITTED',
    workOrderId: 'wo-001',
    woNumber: 'WO-2026-0042',
    driverId: 'drv-001',
    driverName: 'Mike Lewicki',
    date: '2026-03-19',
    jobSite: 'Hwy 16 & Range Rd 45, Yellowhead County',
    startTime: '07:00',
    endTime: '16:00',
    hoursWorked: 9.0,
    startKm: 146182,
    endKm: 146264,
    totalKm: 82,
    materials: [
      { description: 'Road crush (25mm)', quantity: 25, unit: 'tonne', unitPrice: 18.50 },
    ],
    equipment: ['Kenworth T800 - Unit 12', 'End dump trailer #3'],
    loadNumber: 2,
    notes: '',
    source: 'SMS',
    parseConfidence: 82,
    createdAt: '2026-03-19T16:05:00Z',
    updatedAt: '2026-03-19T16:05:00Z',
  },
  {
    id: 'tk-005',
    ticketNumber: 'TK-2026-0082',
    status: 'DRAFT',
    workOrderId: 'wo-001',
    woNumber: 'WO-2026-0042',
    driverId: 'drv-001',
    driverName: 'Mike Lewicki',
    date: '2026-03-19',
    jobSite: 'Hwy 16 & Range Rd 45, Yellowhead County',
    startTime: '07:00',
    endTime: null,
    hoursWorked: null,
    startKm: 146264,
    endKm: null,
    totalKm: null,
    materials: [
      { description: 'Road crush (25mm)', quantity: 25, unit: 'tonne', unitPrice: 18.50 },
    ],
    equipment: ['Kenworth T800 - Unit 12', 'End dump trailer #3'],
    loadNumber: 3,
    notes: 'In progress',
    source: 'MANUAL',
    parseConfidence: null,
    createdAt: '2026-03-19T16:30:00Z',
    updatedAt: '2026-03-19T16:30:00Z',
  },
  {
    id: 'tk-006',
    ticketNumber: 'TK-2026-0083',
    status: 'DISPUTED',
    workOrderId: 'wo-004',
    woNumber: 'WO-2026-0045',
    driverId: 'drv-002',
    driverName: 'Travis Fehr',
    date: '2026-03-17',
    jobSite: 'Hwy 16 km 300, West of Edson',
    startTime: '07:30',
    endTime: '16:00',
    hoursWorked: 8.5,
    startKm: 89100,
    endKm: 89280,
    totalKm: 180,
    materials: [
      { description: 'Road crush (25mm)', quantity: 22, unit: 'tonne', unitPrice: 17.00 },
    ],
    equipment: ['Kenworth T800 - Unit 14', 'Belly dump trailer #1'],
    loadNumber: 1,
    notes: 'Scale was down - estimated weight. Needs verification.',
    source: 'SMS',
    parseConfidence: 65,
    createdAt: '2026-03-17T16:10:00Z',
    updatedAt: '2026-03-18T11:00:00Z',
  },
];

// ============================================================
// GET /api/workflow/tickets
// List tickets with filtering
// ============================================================

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const driverId = searchParams.get('driverId');
    const date = searchParams.get('date');
    const workOrderId = searchParams.get('workOrderId');
    const woNumber = searchParams.get('woNumber');
    const source = searchParams.get('source');
    const search = searchParams.get('search');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');

    // TODO: Replace with database query
    // const tickets = await db.ticket.findMany({ where: { ... }, include: { workOrder: true, driver: true } });
    let filtered = [...mockTickets];

    if (status) {
      filtered = filtered.filter(t => t.status === status);
    }
    if (driverId) {
      filtered = filtered.filter(t => t.driverId === driverId);
    }
    if (date) {
      filtered = filtered.filter(t => t.date === date);
    }
    if (workOrderId) {
      filtered = filtered.filter(t => t.workOrderId === workOrderId);
    }
    if (woNumber) {
      filtered = filtered.filter(t => t.woNumber === woNumber);
    }
    if (source) {
      filtered = filtered.filter(t => t.source === source);
    }
    if (search) {
      const q = search.toLowerCase();
      filtered = filtered.filter(t =>
        t.ticketNumber.toLowerCase().includes(q) ||
        t.driverName.toLowerCase().includes(q) ||
        t.jobSite.toLowerCase().includes(q) ||
        t.woNumber.toLowerCase().includes(q)
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
    console.error('Error listing tickets:', error);
    return NextResponse.json(
      { error: 'Failed to list tickets' },
      { status: 500 }
    );
  }
}

// ============================================================
// POST /api/workflow/tickets
// Create a ticket manually or from parsed SMS data
// ============================================================

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      workOrderId,
      woNumber: woNum,
      driverId,
      driverName,
      date,
      jobSite,
      startTime,
      endTime,
      hoursWorked,
      startKm,
      endKm,
      materials = [],
      equipment = [],
      loadNumber,
      notes,
      source = 'MANUAL',
      parseConfidence = null,
    } = body;

    if (!driverId && !driverName) {
      return NextResponse.json(
        { error: 'Driver information is required' },
        { status: 400 }
      );
    }

    // TODO: Validate work order exists and is in progress
    // if (workOrderId) {
    //   const wo = await db.workOrder.findUnique({ where: { id: workOrderId } });
    //   if (!wo) return NextResponse.json({ error: 'Work order not found' }, { status: 404 });
    // }

    // TODO: Replace with database sequence
    const sequence = mockTickets.length + 1;
    const year = new Date().getFullYear();
    const ticketNumber = `TK-${year}-${String(sequence + 77).padStart(4, '0')}`;

    const totalKm = startKm && endKm ? endKm - startKm : null;

    const newTicket = {
      id: `tk-${String(sequence).padStart(3, '0')}`,
      ticketNumber,
      status: 'DRAFT',
      workOrderId: workOrderId || null,
      woNumber: woNum || null,
      driverId: driverId || null,
      driverName: driverName || null,
      date: date || new Date().toISOString().split('T')[0],
      jobSite: jobSite || null,
      startTime: startTime || null,
      endTime: endTime || null,
      hoursWorked: hoursWorked || null,
      startKm: startKm || null,
      endKm: endKm || null,
      totalKm,
      materials,
      equipment,
      loadNumber: loadNumber || null,
      notes: notes || null,
      source,
      parseConfidence,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // TODO: Save to database
    // const created = await db.ticket.create({ data: newTicket });

    return NextResponse.json({ data: newTicket }, { status: 201 });
  } catch (error) {
    console.error('Error creating ticket:', error);
    return NextResponse.json(
      { error: 'Failed to create ticket' },
      { status: 500 }
    );
  }
}
