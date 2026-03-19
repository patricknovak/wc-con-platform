import { NextResponse } from 'next/server';

// TODO: Replace mock data with database queries (Prisma/Drizzle)
// import { db } from '@/lib/db';

// ============================================================
// MOCK DATA - Realistic WC-CON fleet (drivers and equipment)
// ============================================================

const mockDrivers = [
  {
    id: 'drv-001',
    name: 'Mike Lewicki',
    phone: '+17805551201',
    email: 'mike.lewicki@wc-con.ca',
    status: 'ACTIVE',
    licenseClass: 'Class 1',
    licenseExpiry: '2027-06-15',
    currentWorkOrderId: 'wo-001',
    currentWorkOrder: 'WO-2026-0042',
    homeBase: 'Hinton',
    hourlyRate: 65.00,
    kmRate: 3.25,
    startDate: '2019-04-01',
    notes: 'Senior driver. Experienced with highway loads and oversized permits.',
  },
  {
    id: 'drv-002',
    name: 'Travis Fehr',
    phone: '+17805551202',
    email: 'travis.fehr@wc-con.ca',
    status: 'ACTIVE',
    licenseClass: 'Class 1',
    licenseExpiry: '2027-02-28',
    currentWorkOrderId: 'wo-002',
    currentWorkOrder: 'WO-2026-0043',
    homeBase: 'Hinton',
    hourlyRate: 60.00,
    kmRate: 3.25,
    startDate: '2021-06-15',
    notes: 'Belly dump specialist.',
  },
  {
    id: 'drv-003',
    name: 'Kyle Brinson',
    phone: '+17805551203',
    email: 'kyle.brinson@wc-con.ca',
    status: 'AVAILABLE',
    licenseClass: 'Class 1',
    licenseExpiry: '2026-11-30',
    currentWorkOrderId: null,
    currentWorkOrder: null,
    homeBase: 'Edson',
    hourlyRate: 58.00,
    kmRate: 3.25,
    startDate: '2022-03-01',
    notes: 'Based in Edson. Good for Jasper/Parks Canada runs.',
  },
  {
    id: 'drv-004',
    name: 'Dan Whitford',
    phone: '+17805551204',
    email: 'dan.whitford@wc-con.ca',
    status: 'OFF_DUTY',
    licenseClass: 'Class 1',
    licenseExpiry: '2027-09-15',
    currentWorkOrderId: null,
    currentWorkOrder: null,
    homeBase: 'Hinton',
    hourlyRate: 62.00,
    kmRate: 3.25,
    startDate: '2020-08-15',
    notes: 'Off for scheduled days. Back March 21.',
  },
  {
    id: 'drv-005',
    name: 'Ryan Savard',
    phone: '+17805551205',
    email: 'ryan.savard@wc-con.ca',
    status: 'AVAILABLE',
    licenseClass: 'Class 3',
    licenseExpiry: '2026-08-30',
    currentWorkOrderId: null,
    currentWorkOrder: null,
    homeBase: 'Hinton',
    hourlyRate: 52.00,
    kmRate: 3.00,
    startDate: '2023-05-01',
    notes: 'Class 3 only. Single axle and tandem trucks.',
  },
  {
    id: 'drv-006',
    name: 'Chris Fenton',
    phone: '+17805551206',
    email: 'chris.fenton@wc-con.ca',
    status: 'ACTIVE',
    licenseClass: 'Class 1',
    licenseExpiry: '2027-04-20',
    currentWorkOrderId: null,
    currentWorkOrder: null,
    homeBase: 'Hinton',
    hourlyRate: 60.00,
    kmRate: 3.25,
    startDate: '2020-01-15',
    notes: 'Heavy equipment operator. Cat and excavator certified.',
  },
];

const mockEquipment = [
  {
    id: 'eq-001',
    name: 'Kenworth T800 - Unit 12',
    type: 'TRUCK',
    category: 'Highway Tractor',
    status: 'IN_USE',
    assignedDriverId: 'drv-001',
    assignedDriver: 'Mike Lewicki',
    year: 2021,
    vin: '1XKAD49X21J000012',
    licensePlate: 'AB-TRK-1201',
    currentKm: 146264,
    lastServiceKm: 142000,
    nextServiceKm: 152000,
    hourlyRate: 95.00,
    kmRate: 3.25,
    insuranceExpiry: '2026-12-31',
    safetyExpiry: '2026-09-15',
    notes: 'Primary highway unit. Cummins X15.',
  },
  {
    id: 'eq-002',
    name: 'Kenworth T800 - Unit 14',
    type: 'TRUCK',
    category: 'Highway Tractor',
    status: 'IN_USE',
    assignedDriverId: 'drv-002',
    assignedDriver: 'Travis Fehr',
    year: 2020,
    vin: '1XKAD49X20J000014',
    licensePlate: 'AB-TRK-1402',
    currentKm: 89280,
    lastServiceKm: 85000,
    nextServiceKm: 95000,
    hourlyRate: 90.00,
    kmRate: 3.25,
    insuranceExpiry: '2026-12-31',
    safetyExpiry: '2026-07-30',
    notes: 'Set up for belly dump. Allison auto.',
  },
  {
    id: 'eq-003',
    name: 'Kenworth W900 - Unit 8',
    type: 'TRUCK',
    category: 'Highway Tractor',
    status: 'AVAILABLE',
    assignedDriverId: null,
    assignedDriver: null,
    year: 2019,
    vin: '1XKWD49X49J000008',
    licensePlate: 'AB-TRK-0803',
    currentKm: 215400,
    lastServiceKm: 210000,
    nextServiceKm: 220000,
    hourlyRate: 85.00,
    kmRate: 3.00,
    insuranceExpiry: '2026-12-31',
    safetyExpiry: '2026-06-15',
    notes: 'Older unit. Reliable for local runs. Cat C15 engine.',
  },
  {
    id: 'eq-004',
    name: 'Peterbilt 389 - Unit 16',
    type: 'TRUCK',
    category: 'Highway Tractor',
    status: 'MAINTENANCE',
    assignedDriverId: null,
    assignedDriver: null,
    year: 2022,
    vin: '1XPBDP9X2CD000016',
    licensePlate: 'AB-TRK-1604',
    currentKm: 67800,
    lastServiceKm: 67800,
    nextServiceKm: 77800,
    hourlyRate: 100.00,
    kmRate: 3.50,
    insuranceExpiry: '2026-12-31',
    safetyExpiry: '2026-11-30',
    notes: 'In shop - transmission rebuild. ETA back: March 24.',
  },
  {
    id: 'eq-005',
    name: 'Cat 320 Excavator',
    type: 'HEAVY_EQUIPMENT',
    category: 'Excavator',
    status: 'AVAILABLE',
    assignedDriverId: null,
    assignedDriver: null,
    year: 2020,
    vin: 'CAT0320E20H00045',
    licensePlate: null,
    currentKm: null,
    lastServiceKm: null,
    nextServiceKm: null,
    hourlyRate: 185.00,
    kmRate: null,
    insuranceExpiry: '2026-12-31',
    safetyExpiry: null,
    notes: 'Thumb attachment available. 2800 hrs.',
  },
  {
    id: 'eq-006',
    name: 'Cat 140M Grader',
    type: 'HEAVY_EQUIPMENT',
    category: 'Grader',
    status: 'IN_USE',
    assignedDriverId: 'drv-006',
    assignedDriver: 'Chris Fenton',
    year: 2018,
    vin: 'CAT0140M18K00022',
    licensePlate: null,
    currentKm: null,
    lastServiceKm: null,
    nextServiceKm: null,
    hourlyRate: 175.00,
    kmRate: null,
    insuranceExpiry: '2026-12-31',
    safetyExpiry: null,
    notes: 'County road maintenance contract. 4200 hrs.',
  },
  {
    id: 'eq-007',
    name: 'End dump trailer #3',
    type: 'TRAILER',
    category: 'End Dump',
    status: 'IN_USE',
    assignedDriverId: 'drv-001',
    assignedDriver: 'Mike Lewicki',
    year: 2021,
    vin: null,
    licensePlate: 'AB-TRL-0307',
    currentKm: null,
    lastServiceKm: null,
    nextServiceKm: null,
    hourlyRate: null,
    kmRate: null,
    insuranceExpiry: '2026-12-31',
    safetyExpiry: '2026-09-15',
    notes: 'Tri-axle. 28T capacity.',
  },
  {
    id: 'eq-008',
    name: 'Belly dump trailer #1',
    type: 'TRAILER',
    category: 'Belly Dump',
    status: 'IN_USE',
    assignedDriverId: 'drv-002',
    assignedDriver: 'Travis Fehr',
    year: 2020,
    vin: null,
    licensePlate: 'AB-TRL-0108',
    currentKm: null,
    lastServiceKm: null,
    nextServiceKm: null,
    hourlyRate: null,
    kmRate: null,
    insuranceExpiry: '2026-12-31',
    safetyExpiry: '2026-07-30',
    notes: 'Good for road crush spreading. 25T capacity.',
  },
  {
    id: 'eq-009',
    name: 'End dump trailer #5',
    type: 'TRAILER',
    category: 'End Dump',
    status: 'AVAILABLE',
    assignedDriverId: null,
    assignedDriver: null,
    year: 2019,
    vin: null,
    licensePlate: 'AB-TRL-0509',
    currentKm: null,
    lastServiceKm: null,
    nextServiceKm: null,
    hourlyRate: null,
    kmRate: null,
    insuranceExpiry: '2026-12-31',
    safetyExpiry: '2026-06-15',
    notes: 'Tandem axle. 22T capacity.',
  },
  {
    id: 'eq-010',
    name: 'Cat 950 Wheel Loader',
    type: 'HEAVY_EQUIPMENT',
    category: 'Loader',
    status: 'AVAILABLE',
    assignedDriverId: null,
    assignedDriver: null,
    year: 2021,
    vin: 'CAT0950G21L00018',
    licensePlate: null,
    currentKm: null,
    lastServiceKm: null,
    nextServiceKm: null,
    hourlyRate: 165.00,
    kmRate: null,
    insuranceExpiry: '2026-12-31',
    safetyExpiry: null,
    notes: 'Pit loader. 4.2 yard bucket. 1800 hrs.',
  },
];

// ============================================================
// GET /api/workflow/fleet
// List drivers and equipment with status filtering
// ============================================================

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type'); // 'drivers', 'equipment', or null for both
    const status = searchParams.get('status');
    const equipmentType = searchParams.get('equipmentType'); // TRUCK, TRAILER, HEAVY_EQUIPMENT
    const search = searchParams.get('search');

    // TODO: Replace with database queries
    // const drivers = await db.driver.findMany({ where: { ... } });
    // const equipment = await db.equipment.findMany({ where: { ... } });

    let drivers = [...mockDrivers];
    let equipment = [...mockEquipment];

    // Filter drivers
    if (status && (!type || type === 'drivers')) {
      drivers = drivers.filter(d => d.status === status);
    }
    if (search) {
      const q = search.toLowerCase();
      drivers = drivers.filter(d =>
        d.name.toLowerCase().includes(q) ||
        d.phone.includes(q) ||
        d.homeBase.toLowerCase().includes(q)
      );
    }

    // Filter equipment
    if (status && (!type || type === 'equipment')) {
      equipment = equipment.filter(e => e.status === status);
    }
    if (equipmentType) {
      equipment = equipment.filter(e => e.type === equipmentType);
    }
    if (search) {
      const q = search.toLowerCase();
      equipment = equipment.filter(e =>
        e.name.toLowerCase().includes(q) ||
        e.category.toLowerCase().includes(q) ||
        (e.assignedDriver && e.assignedDriver.toLowerCase().includes(q))
      );
    }

    const response: Record<string, unknown> = {};

    if (!type || type === 'drivers') {
      response.drivers = drivers;
    }
    if (!type || type === 'equipment') {
      response.equipment = equipment;
    }

    // Summary counts
    response.summary = {
      drivers: {
        total: mockDrivers.length,
        active: mockDrivers.filter(d => d.status === 'ACTIVE').length,
        available: mockDrivers.filter(d => d.status === 'AVAILABLE').length,
        offDuty: mockDrivers.filter(d => d.status === 'OFF_DUTY').length,
      },
      equipment: {
        total: mockEquipment.length,
        inUse: mockEquipment.filter(e => e.status === 'IN_USE').length,
        available: mockEquipment.filter(e => e.status === 'AVAILABLE').length,
        maintenance: mockEquipment.filter(e => e.status === 'MAINTENANCE').length,
      },
    };

    return NextResponse.json({ data: response });
  } catch (error) {
    console.error('Error listing fleet:', error);
    return NextResponse.json(
      { error: 'Failed to list fleet data' },
      { status: 500 }
    );
  }
}

// ============================================================
// PATCH /api/workflow/fleet
// Update driver or equipment status
// ============================================================

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { entityType, entityId, status, assignedDriverId, notes } = body;

    if (!entityType || !entityId) {
      return NextResponse.json(
        { error: 'entityType (driver or equipment) and entityId are required' },
        { status: 400 }
      );
    }

    if (entityType === 'driver') {
      const validStatuses = ['ACTIVE', 'AVAILABLE', 'OFF_DUTY', 'ON_LEAVE', 'TERMINATED'];
      if (status && !validStatuses.includes(status)) {
        return NextResponse.json(
          { error: `Invalid driver status. Must be one of: ${validStatuses.join(', ')}` },
          { status: 400 }
        );
      }

      // TODO: Replace with database update
      // const updated = await db.driver.update({ where: { id: entityId }, data: { status, notes } });
      const driver = mockDrivers.find(d => d.id === entityId);
      if (!driver) {
        return NextResponse.json({ error: 'Driver not found' }, { status: 404 });
      }

      const updated = {
        ...driver,
        status: status || driver.status,
        notes: notes !== undefined ? notes : driver.notes,
        updatedAt: new Date().toISOString(),
      };

      return NextResponse.json({ data: updated });
    }

    if (entityType === 'equipment') {
      const validStatuses = ['AVAILABLE', 'IN_USE', 'MAINTENANCE', 'OUT_OF_SERVICE', 'RETIRED'];
      if (status && !validStatuses.includes(status)) {
        return NextResponse.json(
          { error: `Invalid equipment status. Must be one of: ${validStatuses.join(', ')}` },
          { status: 400 }
        );
      }

      // TODO: Replace with database update
      // const updated = await db.equipment.update({ where: { id: entityId }, data: { status, assignedDriverId, notes } });
      const equip = mockEquipment.find(e => e.id === entityId);
      if (!equip) {
        return NextResponse.json({ error: 'Equipment not found' }, { status: 404 });
      }

      // Look up driver name if assigning
      let assignedDriver = equip.assignedDriver;
      if (assignedDriverId !== undefined) {
        if (assignedDriverId === null) {
          assignedDriver = null;
        } else {
          const driver = mockDrivers.find(d => d.id === assignedDriverId);
          assignedDriver = driver ? driver.name : null;
        }
      }

      const updated = {
        ...equip,
        status: status || equip.status,
        assignedDriverId: assignedDriverId !== undefined ? assignedDriverId : equip.assignedDriverId,
        assignedDriver,
        notes: notes !== undefined ? notes : equip.notes,
        updatedAt: new Date().toISOString(),
      };

      return NextResponse.json({ data: updated });
    }

    return NextResponse.json(
      { error: 'entityType must be "driver" or "equipment"' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Error updating fleet:', error);
    return NextResponse.json(
      { error: 'Failed to update fleet data' },
      { status: 500 }
    );
  }
}
