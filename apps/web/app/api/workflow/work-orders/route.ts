import { NextResponse } from 'next/server';

// TODO: Replace mock data with database queries (Prisma/Drizzle)
// import { db } from '@/lib/db';
// import { generateWorkOrderNumber } from '@wc-con/workflow';

// ============================================================
// MOCK DATA - Realistic WC-CON work orders
// ============================================================

const mockWorkOrders = [
  {
    id: 'wo-001',
    woNumber: 'WO-2026-0042',
    status: 'IN_PROGRESS',
    poId: 'po-001',
    poNumber: 'PO-2026-0001',
    customerId: 'cust-001',
    customerName: 'Yellowhead County Public Works',
    priority: 'HIGH',
    scheduledDate: '2026-03-19',
    scheduledTime: '07:00',
    driverId: 'drv-001',
    driverName: 'Mike Lewicki',
    driverPhone: '+17805551201',
    equipmentIds: ['eq-001', 'eq-007'],
    equipment: ['Kenworth T800 - Unit 12', 'End dump trailer #3'],
    pickupLocation: 'WC-CON Pit - Hwy 16 West, Hinton',
    deliveryAddress: 'Hwy 16 & Range Rd 45, Yellowhead County, AB',
    deliveryContact: 'Dave Thomson',
    deliveryPhone: '780-555-0101',
    items: [
      { description: 'Road crush (25mm)', quantity: 120, unit: 'tonne', unitPrice: 18.50 },
    ],
    specialInstructions: 'Soft shoulder at delivery site - use east approach',
    estimatedLoads: 5,
    completedLoads: 3,
    createdAt: '2026-03-15T09:00:00Z',
    updatedAt: '2026-03-19T11:30:00Z',
  },
  {
    id: 'wo-002',
    woNumber: 'WO-2026-0043',
    status: 'DISPATCHED',
    poId: 'po-001',
    poNumber: 'PO-2026-0001',
    customerId: 'cust-001',
    customerName: 'Yellowhead County Public Works',
    priority: 'NORMAL',
    scheduledDate: '2026-03-19',
    scheduledTime: '07:30',
    driverId: 'drv-002',
    driverName: 'Travis Fehr',
    driverPhone: '+17805551202',
    equipmentIds: ['eq-002', 'eq-008'],
    equipment: ['Kenworth T800 - Unit 14', 'Belly dump trailer #1'],
    pickupLocation: 'WC-CON Pit - Hwy 16 West, Hinton',
    deliveryAddress: 'Hwy 16 & Range Rd 45, Yellowhead County, AB',
    deliveryContact: 'Dave Thomson',
    deliveryPhone: '780-555-0101',
    items: [
      { description: 'Pit run gravel', quantity: 100, unit: 'tonne', unitPrice: 14.00 },
    ],
    specialInstructions: 'Follow road crush trucks - layer behind',
    estimatedLoads: 4,
    completedLoads: 0,
    createdAt: '2026-03-15T09:15:00Z',
    updatedAt: '2026-03-19T07:30:00Z',
  },
  {
    id: 'wo-003',
    woNumber: 'WO-2026-0044',
    status: 'SCHEDULED',
    poId: 'po-002',
    poNumber: 'PO-2026-0002',
    customerId: 'cust-002',
    customerName: 'Jasper National Park - Parks Canada',
    priority: 'NORMAL',
    scheduledDate: '2026-03-20',
    scheduledTime: '06:30',
    driverId: 'drv-003',
    driverName: 'Kyle Brinson',
    driverPhone: '+17805551203',
    equipmentIds: ['eq-003', 'eq-009'],
    equipment: ['Kenworth W900 - Unit 8', 'End dump trailer #5'],
    pickupLocation: 'WC-CON Pit - Hwy 16 West, Hinton',
    deliveryAddress: 'Jasper Townsite, Cabin Creek Rd, Jasper, AB',
    deliveryContact: 'Sarah Milligan',
    deliveryPhone: '780-555-0202',
    items: [
      { description: 'Washed rock (50mm)', quantity: 150, unit: 'tonne', unitPrice: 24.00 },
      { description: 'Drain rock', quantity: 80, unit: 'tonne', unitPrice: 28.00 },
    ],
    specialInstructions: 'Parks Canada escort required at gate. Check in at maintenance compound.',
    estimatedLoads: 8,
    completedLoads: 0,
    createdAt: '2026-03-14T14:00:00Z',
    updatedAt: '2026-03-18T16:00:00Z',
  },
  {
    id: 'wo-004',
    woNumber: 'WO-2026-0045',
    status: 'COMPLETED',
    poId: 'po-005',
    poNumber: 'PO-2026-0005',
    customerId: 'cust-005',
    customerName: 'Alberta Transportation - West Region',
    priority: 'RUSH',
    scheduledDate: '2026-03-17',
    scheduledTime: '06:00',
    driverId: 'drv-001',
    driverName: 'Mike Lewicki',
    driverPhone: '+17805551201',
    equipmentIds: ['eq-001', 'eq-007'],
    equipment: ['Kenworth T800 - Unit 12', 'End dump trailer #3'],
    pickupLocation: 'WC-CON Pit - Hwy 16 West, Hinton',
    deliveryAddress: 'Hwy 16 km 298-305, West of Edson, AB',
    deliveryContact: 'Regional Dispatch',
    deliveryPhone: '780-555-0303',
    items: [
      { description: 'Road crush (25mm)', quantity: 400, unit: 'tonne', unitPrice: 17.00 },
    ],
    specialInstructions: 'Active highway - pilot car required. Follow TCP.',
    estimatedLoads: 16,
    completedLoads: 16,
    createdAt: '2026-03-10T08:00:00Z',
    updatedAt: '2026-03-17T18:00:00Z',
  },
  {
    id: 'wo-005',
    woNumber: 'WO-2026-0046',
    status: 'PENDING',
    poId: 'po-004',
    poNumber: 'PO-2026-0004',
    customerId: 'cust-004',
    customerName: 'Hinton Housing Co-op',
    priority: 'LOW',
    scheduledDate: '2026-03-25',
    scheduledTime: '08:00',
    driverId: null,
    driverName: null,
    driverPhone: null,
    equipmentIds: [],
    equipment: [],
    pickupLocation: 'WC-CON Yard, Hinton',
    deliveryAddress: '128 Hardisty Ave, Hinton, AB T7V 1B5',
    deliveryContact: 'Janet Olson',
    deliveryPhone: '780-555-0404',
    items: [
      { description: 'Topsoil (screened)', quantity: 60, unit: 'tonne', unitPrice: 32.00 },
      { description: 'Decorative river rock', quantity: 25, unit: 'tonne', unitPrice: 45.00 },
    ],
    specialInstructions: 'Residential area - no early morning deliveries before 8am',
    estimatedLoads: 4,
    completedLoads: 0,
    createdAt: '2026-03-18T10:00:00Z',
    updatedAt: '2026-03-18T10:00:00Z',
  },
];

// ============================================================
// GET /api/workflow/work-orders
// List work orders with filtering
// ============================================================

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const driverId = searchParams.get('driverId');
    const date = searchParams.get('date');
    const priority = searchParams.get('priority');
    const customerId = searchParams.get('customerId');
    const search = searchParams.get('search');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');

    // TODO: Replace with database query
    // const workOrders = await db.workOrder.findMany({ where: { ... }, include: { driver: true, equipment: true } });
    let filtered = [...mockWorkOrders];

    if (status) {
      filtered = filtered.filter(wo => wo.status === status);
    }
    if (driverId) {
      filtered = filtered.filter(wo => wo.driverId === driverId);
    }
    if (date) {
      filtered = filtered.filter(wo => wo.scheduledDate === date);
    }
    if (priority) {
      filtered = filtered.filter(wo => wo.priority === priority);
    }
    if (customerId) {
      filtered = filtered.filter(wo => wo.customerId === customerId);
    }
    if (search) {
      const q = search.toLowerCase();
      filtered = filtered.filter(wo =>
        wo.woNumber.toLowerCase().includes(q) ||
        wo.customerName.toLowerCase().includes(q) ||
        (wo.driverName && wo.driverName.toLowerCase().includes(q)) ||
        wo.deliveryAddress.toLowerCase().includes(q)
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
    console.error('Error listing work orders:', error);
    return NextResponse.json(
      { error: 'Failed to list work orders' },
      { status: 500 }
    );
  }
}

// ============================================================
// POST /api/workflow/work-orders
// Create a new work order (from PO or standalone)
// ============================================================

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      poId,
      customerId,
      customerName,
      priority = 'NORMAL',
      scheduledDate,
      scheduledTime,
      driverId,
      driverName,
      driverPhone,
      equipmentIds = [],
      equipment = [],
      pickupLocation,
      deliveryAddress,
      deliveryContact,
      deliveryPhone,
      items,
      specialInstructions,
    } = body;

    if (!deliveryAddress) {
      return NextResponse.json(
        { error: 'Delivery address is required' },
        { status: 400 }
      );
    }

    if (!scheduledDate) {
      return NextResponse.json(
        { error: 'Scheduled date is required' },
        { status: 400 }
      );
    }

    // TODO: If poId provided, validate PO exists and is in ACCEPTED status
    // const po = await db.purchaseOrder.findUnique({ where: { id: poId } });
    // if (poId && !po) return NextResponse.json({ error: 'PO not found' }, { status: 404 });

    // TODO: Replace with database sequence
    const sequence = mockWorkOrders.length + 1;
    const year = new Date().getFullYear();
    const woNumber = `WO-${year}-${String(sequence + 41).padStart(4, '0')}`;

    const woItems = items || [];
    const estimatedLoads = woItems.reduce(
      (sum: number, item: { quantity: number }) => sum + Math.ceil(item.quantity / 25),
      0
    );

    const newWorkOrder = {
      id: `wo-${String(sequence).padStart(3, '0')}`,
      woNumber,
      status: driverId ? 'SCHEDULED' : 'PENDING',
      poId: poId || null,
      poNumber: poId ? `PO-${year}-XXXX` : null, // TODO: Look up from PO
      customerId: customerId || null,
      customerName: customerName || null,
      priority,
      scheduledDate,
      scheduledTime: scheduledTime || null,
      driverId: driverId || null,
      driverName: driverName || null,
      driverPhone: driverPhone || null,
      equipmentIds,
      equipment,
      pickupLocation: pickupLocation || 'WC-CON Pit - Hwy 16 West, Hinton',
      deliveryAddress,
      deliveryContact: deliveryContact || null,
      deliveryPhone: deliveryPhone || null,
      items: woItems,
      specialInstructions: specialInstructions || null,
      estimatedLoads,
      completedLoads: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // TODO: Save to database
    // const created = await db.workOrder.create({ data: newWorkOrder });

    return NextResponse.json({ data: newWorkOrder }, { status: 201 });
  } catch (error) {
    console.error('Error creating work order:', error);
    return NextResponse.json(
      { error: 'Failed to create work order' },
      { status: 500 }
    );
  }
}
