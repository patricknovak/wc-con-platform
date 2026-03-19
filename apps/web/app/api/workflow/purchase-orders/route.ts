import { NextResponse } from 'next/server';

// TODO: Replace mock data with database queries (Prisma/Drizzle)
// import { db } from '@/lib/db';
// import { generatePONumber } from '@wc-con/workflow';

// ============================================================
// MOCK DATA - Realistic WC-CON purchase orders
// ============================================================

const mockPurchaseOrders = [
  {
    id: 'po-001',
    poNumber: 'PO-2026-0001',
    status: 'ACCEPTED',
    customerId: 'cust-001',
    customerName: 'Yellowhead County Public Works',
    quoteId: 'qt-001',
    items: [
      { description: 'Road crush (25mm)', quantity: 500, unit: 'tonne', unitPrice: 18.50 },
      { description: 'Pit run gravel', quantity: 200, unit: 'tonne', unitPrice: 14.00 },
    ],
    deliveryAddress: 'Hwy 16 & Range Rd 45, Yellowhead County, AB',
    subtotal: 12050.00,
    gst: 602.50,
    total: 12652.50,
    createdAt: '2026-03-01T09:00:00Z',
    updatedAt: '2026-03-03T14:30:00Z',
    notes: 'Ongoing road maintenance contract - Phase 2',
  },
  {
    id: 'po-002',
    poNumber: 'PO-2026-0002',
    status: 'APPROVED',
    customerId: 'cust-002',
    customerName: 'Jasper National Park - Parks Canada',
    quoteId: 'qt-003',
    items: [
      { description: 'Washed rock (50mm)', quantity: 150, unit: 'tonne', unitPrice: 24.00 },
      { description: 'Drain rock', quantity: 80, unit: 'tonne', unitPrice: 28.00 },
    ],
    deliveryAddress: 'Jasper Townsite, Cabin Creek Rd, Jasper, AB',
    subtotal: 5840.00,
    gst: 292.00,
    total: 6132.00,
    createdAt: '2026-03-05T10:15:00Z',
    updatedAt: '2026-03-06T08:00:00Z',
    notes: 'Drainage improvement project - campground area',
  },
  {
    id: 'po-003',
    poNumber: 'PO-2026-0003',
    status: 'DRAFT',
    customerId: 'cust-003',
    customerName: 'Foothills Paving Ltd.',
    quoteId: null,
    items: [
      { description: 'Screened aggregate (19mm)', quantity: 1200, unit: 'tonne', unitPrice: 16.50 },
      { description: 'Bedding sand', quantity: 300, unit: 'tonne', unitPrice: 22.00 },
    ],
    deliveryAddress: 'Twp Rd 520 & Hwy 40, Edson, AB',
    subtotal: 26400.00,
    gst: 1320.00,
    total: 27720.00,
    createdAt: '2026-03-10T11:00:00Z',
    updatedAt: '2026-03-10T11:00:00Z',
    notes: 'Subdivision road base - Edson expansion',
  },
  {
    id: 'po-004',
    poNumber: 'PO-2026-0004',
    status: 'SENT_TO_CUSTOMER',
    customerId: 'cust-004',
    customerName: 'Hinton Housing Co-op',
    quoteId: 'qt-005',
    items: [
      { description: 'Topsoil (screened)', quantity: 60, unit: 'tonne', unitPrice: 32.00 },
      { description: 'Decorative river rock', quantity: 25, unit: 'tonne', unitPrice: 45.00 },
      { description: 'Landscaping mulch', quantity: 40, unit: 'yard', unitPrice: 38.00 },
    ],
    deliveryAddress: '128 Hardisty Ave, Hinton, AB T7V 1B5',
    subtotal: 4565.00,
    gst: 228.25,
    total: 4793.25,
    createdAt: '2026-03-12T13:30:00Z',
    updatedAt: '2026-03-14T09:00:00Z',
    notes: 'Landscaping supply for spring renovation',
  },
  {
    id: 'po-005',
    poNumber: 'PO-2026-0005',
    status: 'ACCEPTED',
    customerId: 'cust-005',
    customerName: 'Alberta Transportation - West Region',
    quoteId: 'qt-007',
    items: [
      { description: 'Road crush (25mm)', quantity: 2000, unit: 'tonne', unitPrice: 17.00 },
      { description: 'Rip rap (300mm)', quantity: 400, unit: 'tonne', unitPrice: 35.00 },
    ],
    deliveryAddress: 'Hwy 16 km 298-305, West of Edson, AB',
    subtotal: 48000.00,
    gst: 2400.00,
    total: 50400.00,
    createdAt: '2026-02-20T08:00:00Z',
    updatedAt: '2026-03-01T10:00:00Z',
    notes: 'Highway shoulder repair and ditch armouring',
  },
];

// ============================================================
// GET /api/workflow/purchase-orders
// List purchase orders with filtering
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
    // const pos = await db.purchaseOrder.findMany({ where: { ... }, skip, take });
    let filtered = [...mockPurchaseOrders];

    if (status) {
      filtered = filtered.filter(po => po.status === status);
    }
    if (customerId) {
      filtered = filtered.filter(po => po.customerId === customerId);
    }
    if (dateFrom) {
      filtered = filtered.filter(po => po.createdAt >= dateFrom);
    }
    if (dateTo) {
      filtered = filtered.filter(po => po.createdAt <= dateTo);
    }
    if (search) {
      const q = search.toLowerCase();
      filtered = filtered.filter(po =>
        po.poNumber.toLowerCase().includes(q) ||
        po.customerName.toLowerCase().includes(q) ||
        po.deliveryAddress.toLowerCase().includes(q)
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
    console.error('Error listing purchase orders:', error);
    return NextResponse.json(
      { error: 'Failed to list purchase orders' },
      { status: 500 }
    );
  }
}

// ============================================================
// POST /api/workflow/purchase-orders
// Create a new purchase order (from quote or manual)
// ============================================================

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { quoteId, customerId, customerName, items, deliveryAddress, notes } = body;

    if (!customerId && !quoteId) {
      return NextResponse.json(
        { error: 'Either customerId or quoteId is required' },
        { status: 400 }
      );
    }

    if (!quoteId && (!items || items.length === 0)) {
      return NextResponse.json(
        { error: 'Items are required when creating a PO without a quote' },
        { status: 400 }
      );
    }

    // TODO: If quoteId provided, fetch quote from database and convert to PO
    // const quote = await db.quote.findUnique({ where: { id: quoteId } });
    // if (!quote) return NextResponse.json({ error: 'Quote not found' }, { status: 404 });

    // TODO: Replace with database sequence
    // const sequence = await db.purchaseOrder.count() + 1;
    const sequence = mockPurchaseOrders.length + 1;
    const year = new Date().getFullYear();
    const poNumber = `PO-${year}-${String(sequence).padStart(4, '0')}`;

    const poItems = items || [
      // Mock items from quote conversion
      { description: 'Road crush (25mm)', quantity: 100, unit: 'tonne', unitPrice: 18.50 },
    ];

    const subtotal = poItems.reduce(
      (sum: number, item: { quantity: number; unitPrice: number }) =>
        sum + item.quantity * item.unitPrice,
      0
    );
    const gst = Math.round(subtotal * 0.05 * 100) / 100;
    const total = Math.round((subtotal + gst) * 100) / 100;

    const newPO = {
      id: `po-${String(sequence).padStart(3, '0')}`,
      poNumber,
      status: 'DRAFT',
      customerId: customerId || 'cust-from-quote',
      customerName: customerName || 'Customer from Quote',
      quoteId: quoteId || null,
      items: poItems,
      deliveryAddress: deliveryAddress || '',
      subtotal,
      gst,
      total,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      notes: notes || '',
    };

    // TODO: Save to database
    // const created = await db.purchaseOrder.create({ data: newPO });

    return NextResponse.json({ data: newPO }, { status: 201 });
  } catch (error) {
    console.error('Error creating purchase order:', error);
    return NextResponse.json(
      { error: 'Failed to create purchase order' },
      { status: 500 }
    );
  }
}
