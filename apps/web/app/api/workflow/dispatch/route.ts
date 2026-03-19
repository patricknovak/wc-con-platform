import { NextResponse } from 'next/server';

// TODO: Import from the actual workflow service package
// import { formatDispatchSMS } from '@wc-con/workflow';

// ============================================================
// MOCK WORK ORDERS FOR DISPATCH
// TODO: Replace with database queries
// ============================================================

const mockWorkOrders: Record<string, {
  id: string;
  woNumber: string;
  status: string;
  driverId: string | null;
  driverName: string | null;
  driverPhone: string | null;
  priority: string;
  scheduledDate: string;
  scheduledTime: string | null;
  pickupLocation: string;
  deliveryAddress: string;
  deliveryContact: string | null;
  deliveryPhone: string | null;
  items: { description: string; quantity: number; unit: string }[];
  specialInstructions: string | null;
}> = {
  'wo-001': {
    id: 'wo-001',
    woNumber: 'WO-2026-0042',
    status: 'IN_PROGRESS',
    driverId: 'drv-001',
    driverName: 'Mike Lewicki',
    driverPhone: '+17805551201',
    priority: 'HIGH',
    scheduledDate: '2026-03-19',
    scheduledTime: '07:00',
    pickupLocation: 'WC-CON Pit - Hwy 16 West, Hinton',
    deliveryAddress: 'Hwy 16 & Range Rd 45, Yellowhead County, AB',
    deliveryContact: 'Dave Thomson',
    deliveryPhone: '780-555-0101',
    items: [
      { description: 'Road crush (25mm)', quantity: 120, unit: 'tonne' },
    ],
    specialInstructions: 'Soft shoulder at delivery site - use east approach',
  },
  'wo-002': {
    id: 'wo-002',
    woNumber: 'WO-2026-0043',
    status: 'SCHEDULED',
    driverId: 'drv-002',
    driverName: 'Travis Fehr',
    driverPhone: '+17805551202',
    priority: 'NORMAL',
    scheduledDate: '2026-03-19',
    scheduledTime: '07:30',
    pickupLocation: 'WC-CON Pit - Hwy 16 West, Hinton',
    deliveryAddress: 'Hwy 16 & Range Rd 45, Yellowhead County, AB',
    deliveryContact: 'Dave Thomson',
    deliveryPhone: '780-555-0101',
    items: [
      { description: 'Pit run gravel', quantity: 100, unit: 'tonne' },
    ],
    specialInstructions: 'Follow road crush trucks - layer behind',
  },
  'wo-003': {
    id: 'wo-003',
    woNumber: 'WO-2026-0044',
    status: 'SCHEDULED',
    driverId: 'drv-003',
    driverName: 'Kyle Brinson',
    driverPhone: '+17805551203',
    priority: 'NORMAL',
    scheduledDate: '2026-03-20',
    scheduledTime: '06:30',
    pickupLocation: 'WC-CON Pit - Hwy 16 West, Hinton',
    deliveryAddress: 'Jasper Townsite, Cabin Creek Rd, Jasper, AB',
    deliveryContact: 'Sarah Milligan',
    deliveryPhone: '780-555-0202',
    items: [
      { description: 'Washed rock (50mm)', quantity: 150, unit: 'tonne' },
      { description: 'Drain rock', quantity: 80, unit: 'tonne' },
    ],
    specialInstructions: 'Parks Canada escort required at gate. Check in at maintenance compound.',
  },
  'wo-005': {
    id: 'wo-005',
    woNumber: 'WO-2026-0046',
    status: 'PENDING',
    driverId: null,
    driverName: null,
    driverPhone: null,
    priority: 'LOW',
    scheduledDate: '2026-03-25',
    scheduledTime: '08:00',
    pickupLocation: 'WC-CON Yard, Hinton',
    deliveryAddress: '128 Hardisty Ave, Hinton, AB T7V 1B5',
    deliveryContact: 'Janet Olson',
    deliveryPhone: '780-555-0404',
    items: [
      { description: 'Topsoil (screened)', quantity: 60, unit: 'tonne' },
      { description: 'Decorative river rock', quantity: 25, unit: 'tonne' },
    ],
    specialInstructions: 'Residential area - no early morning deliveries before 8am',
  },
};

// ============================================================
// POST /api/workflow/dispatch
// Dispatch a work order to a driver via SMS
// ============================================================

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { workOrderId } = body;

    if (!workOrderId) {
      return NextResponse.json(
        { error: 'workOrderId is required' },
        { status: 400 }
      );
    }

    // TODO: Replace with database lookup
    // const workOrder = await db.workOrder.findUnique({
    //   where: { id: workOrderId },
    //   include: { driver: true, items: true },
    // });
    const workOrder = mockWorkOrders[workOrderId];

    if (!workOrder) {
      return NextResponse.json(
        { error: 'Work order not found' },
        { status: 404 }
      );
    }

    if (!workOrder.driverId || !workOrder.driverPhone) {
      return NextResponse.json(
        { error: 'Work order has no driver assigned. Assign a driver before dispatching.' },
        { status: 400 }
      );
    }

    // Validate work order is in a dispatchable status
    const dispatchableStatuses = ['SCHEDULED', 'PENDING'];
    if (!dispatchableStatuses.includes(workOrder.status) && workOrder.status !== 'IN_PROGRESS') {
      return NextResponse.json(
        { error: `Cannot dispatch work order in ${workOrder.status} status. Must be SCHEDULED or PENDING.` },
        { status: 400 }
      );
    }

    // Format the dispatch SMS
    // TODO: Use formatDispatchSMS from @wc-con/workflow
    const smsLines: string[] = [];
    smsLines.push(`WC-CON DISPATCH ${workOrder.woNumber}`);

    if (workOrder.priority === 'RUSH' || workOrder.priority === 'HIGH') {
      smsLines.push(`*** ${workOrder.priority} PRIORITY ***`);
    }

    smsLines.push(`Date: ${workOrder.scheduledDate}${workOrder.scheduledTime ? ` ${workOrder.scheduledTime}` : ''}`);
    smsLines.push(`Pickup: ${workOrder.pickupLocation}`);
    smsLines.push(`Deliver: ${workOrder.deliveryAddress}`);

    if (workOrder.deliveryContact) {
      smsLines.push(`Contact: ${workOrder.deliveryContact}${workOrder.deliveryPhone ? ` ${workOrder.deliveryPhone}` : ''}`);
    }

    if (workOrder.items.length > 0) {
      smsLines.push('Materials:');
      for (const item of workOrder.items) {
        const unitLabel = item.unit === 'tonne' ? 'T' : item.unit;
        smsLines.push(`- ${item.quantity}${unitLabel} ${item.description}`);
      }
    }

    if (workOrder.specialInstructions) {
      smsLines.push(`Note: ${workOrder.specialInstructions}`);
    }

    smsLines.push('');
    smsLines.push('Reply with ticket when done.');
    smsLines.push('Text HELP for format.');

    const smsMessage = smsLines.join('\n');

    // TODO: Send SMS via Twilio
    // const twilioClient = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
    // const twilioMessage = await twilioClient.messages.create({
    //   body: smsMessage,
    //   from: process.env.TWILIO_PHONE_NUMBER,
    //   to: workOrder.driverPhone,
    // });

    // TODO: Update work order status in database
    // await db.workOrder.update({
    //   where: { id: workOrderId },
    //   data: { status: 'DISPATCHED', dispatchedAt: new Date() },
    // });

    // TODO: Log outbound SMS
    // await db.smsLog.create({
    //   data: {
    //     from: process.env.TWILIO_PHONE_NUMBER,
    //     to: workOrder.driverPhone,
    //     body: smsMessage,
    //     direction: 'OUTBOUND',
    //     workOrderId,
    //     twilioSid: twilioMessage.sid,
    //   },
    // });

    const previousStatus = workOrder.status;

    return NextResponse.json({
      data: {
        workOrderId,
        woNumber: workOrder.woNumber,
        previousStatus,
        newStatus: 'DISPATCHED',
        driverName: workOrder.driverName,
        driverPhone: workOrder.driverPhone,
        smsMessage,
        smsSent: false, // TODO: Set to true once Twilio is integrated
        // twilioSid: twilioMessage.sid, // TODO: Include Twilio message SID
        dispatchedAt: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error('Error dispatching work order:', error);
    return NextResponse.json(
      { error: 'Failed to dispatch work order' },
      { status: 500 }
    );
  }
}
