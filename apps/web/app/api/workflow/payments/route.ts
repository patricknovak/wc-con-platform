import { NextResponse } from 'next/server';

// TODO: Replace mock data with database queries (Prisma/Drizzle)
// import { db } from '@/lib/db';
// import { generatePaymentNumber } from '@wc-con/workflow';

// ============================================================
// MOCK DATA - Realistic WC-CON payments
// ============================================================

const mockPayments = [
  {
    id: 'pay-001',
    paymentNumber: 'PAY-2026-0008',
    invoiceId: 'inv-001',
    invoiceNumber: 'INV-2026-0015',
    customerId: 'cust-005',
    customerName: 'Alberta Transportation - West Region',
    amount: 2919.53,
    method: 'EFT',
    referenceNumber: 'AT-EFT-2026-03-19-4421',
    date: '2026-03-19',
    status: 'COMPLETED',
    notes: 'Direct deposit - Alberta Transportation standard payment',
    createdAt: '2026-03-19T14:00:00Z',
    updatedAt: '2026-03-19T14:00:00Z',
  },
  {
    id: 'pay-002',
    paymentNumber: 'PAY-2026-0007',
    invoiceId: 'inv-old-001',
    invoiceNumber: 'INV-2026-0012',
    customerId: 'cust-007',
    customerName: 'Town of Edson',
    amount: 15750.00,
    method: 'CHEQUE',
    referenceNumber: 'CHQ-44821',
    date: '2026-03-15',
    status: 'COMPLETED',
    notes: 'Water main repair project - final payment',
    createdAt: '2026-03-15T10:00:00Z',
    updatedAt: '2026-03-15T10:00:00Z',
  },
  {
    id: 'pay-003',
    paymentNumber: 'PAY-2026-0006',
    invoiceId: 'inv-old-002',
    invoiceNumber: 'INV-2026-0010',
    customerId: 'cust-008',
    customerName: 'Canfor Corporation - Hinton Pulp',
    amount: 5000.00,
    method: 'EFT',
    referenceNumber: 'CANFOR-EFT-88392',
    date: '2026-03-10',
    status: 'COMPLETED',
    notes: 'Partial payment on haul road rebuild. Remaining $3,240 outstanding.',
    createdAt: '2026-03-10T09:00:00Z',
    updatedAt: '2026-03-10T09:00:00Z',
  },
  {
    id: 'pay-004',
    paymentNumber: 'PAY-2026-0005',
    invoiceId: 'inv-old-003',
    invoiceNumber: 'INV-2026-0009',
    customerId: 'cust-002',
    customerName: 'Jasper National Park - Parks Canada',
    amount: 12480.00,
    method: 'EFT',
    referenceNumber: 'GC-PAY-2026-0312',
    date: '2026-03-05',
    status: 'COMPLETED',
    notes: 'Trail maintenance aggregate supply - February work',
    createdAt: '2026-03-05T11:00:00Z',
    updatedAt: '2026-03-05T11:00:00Z',
  },
  {
    id: 'pay-005',
    paymentNumber: 'PAY-2026-0009',
    invoiceId: 'inv-003',
    invoiceNumber: 'INV-2026-0014',
    customerId: 'cust-006',
    customerName: 'Pembina Pipeline Corporation',
    amount: 4116.00,
    method: 'EFT',
    referenceNumber: 'PEMB-AP-2026-88421',
    date: '2026-03-19',
    status: 'PENDING',
    notes: 'Partial payment - 50% of overdue INV-2026-0014. Balance: $4,116.00',
    createdAt: '2026-03-19T16:00:00Z',
    updatedAt: '2026-03-19T16:00:00Z',
  },
];

// ============================================================
// GET /api/workflow/payments
// List payments with filtering
// ============================================================

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const customerId = searchParams.get('customerId');
    const invoiceId = searchParams.get('invoiceId');
    const method = searchParams.get('method');
    const dateFrom = searchParams.get('dateFrom');
    const dateTo = searchParams.get('dateTo');
    const search = searchParams.get('search');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');

    // TODO: Replace with database query
    // const payments = await db.payment.findMany({ where: { ... }, include: { invoice: true, customer: true } });
    let filtered = [...mockPayments];

    if (status) {
      filtered = filtered.filter(p => p.status === status);
    }
    if (customerId) {
      filtered = filtered.filter(p => p.customerId === customerId);
    }
    if (invoiceId) {
      filtered = filtered.filter(p => p.invoiceId === invoiceId);
    }
    if (method) {
      filtered = filtered.filter(p => p.method === method);
    }
    if (dateFrom) {
      filtered = filtered.filter(p => p.date >= dateFrom);
    }
    if (dateTo) {
      filtered = filtered.filter(p => p.date <= dateTo);
    }
    if (search) {
      const q = search.toLowerCase();
      filtered = filtered.filter(p =>
        p.paymentNumber.toLowerCase().includes(q) ||
        p.invoiceNumber.toLowerCase().includes(q) ||
        p.customerName.toLowerCase().includes(q) ||
        (p.referenceNumber && p.referenceNumber.toLowerCase().includes(q))
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
    console.error('Error listing payments:', error);
    return NextResponse.json(
      { error: 'Failed to list payments' },
      { status: 500 }
    );
  }
}

// ============================================================
// POST /api/workflow/payments
// Record a payment against an invoice
// ============================================================

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      invoiceId,
      invoiceNumber,
      customerId,
      customerName,
      amount,
      method,
      referenceNumber,
      date,
      notes,
    } = body;

    if (!invoiceId) {
      return NextResponse.json(
        { error: 'Invoice ID is required' },
        { status: 400 }
      );
    }

    if (!amount || amount <= 0) {
      return NextResponse.json(
        { error: 'A positive payment amount is required' },
        { status: 400 }
      );
    }

    if (!method) {
      return NextResponse.json(
        { error: 'Payment method is required (EFT, CHEQUE, CREDIT_CARD, CASH, OTHER)' },
        { status: 400 }
      );
    }

    // TODO: Validate invoice exists and calculate remaining balance
    // const invoice = await db.invoice.findUnique({ where: { id: invoiceId } });
    // if (!invoice) return NextResponse.json({ error: 'Invoice not found' }, { status: 404 });
    // const existingPayments = await db.payment.aggregate({
    //   where: { invoiceId, status: 'COMPLETED' },
    //   _sum: { amount: true },
    // });
    // const remaining = invoice.total - (existingPayments._sum.amount || 0);
    // if (amount > remaining) {
    //   return NextResponse.json({ error: `Payment exceeds remaining balance of $${remaining}` }, { status: 400 });
    // }

    // TODO: Replace with database sequence
    const sequence = mockPayments.length + 1;
    const year = new Date().getFullYear();
    const paymentNumber = `PAY-${year}-${String(sequence + 8).padStart(4, '0')}`;

    const newPayment = {
      id: `pay-${String(sequence).padStart(3, '0')}`,
      paymentNumber,
      invoiceId,
      invoiceNumber: invoiceNumber || 'INV-XXXX',
      customerId: customerId || null,
      customerName: customerName || 'Unknown',
      amount: Math.round(amount * 100) / 100,
      method,
      referenceNumber: referenceNumber || null,
      date: date || new Date().toISOString().split('T')[0],
      status: 'PENDING',
      notes: notes || '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // TODO: Save to database and update invoice status
    // const created = await db.payment.create({ data: newPayment });
    // Update invoice status to PARTIALLY_PAID or PAID based on total payments vs invoice total

    return NextResponse.json({ data: newPayment }, { status: 201 });
  } catch (error) {
    console.error('Error recording payment:', error);
    return NextResponse.json(
      { error: 'Failed to record payment' },
      { status: 500 }
    );
  }
}
