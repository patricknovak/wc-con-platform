'use client';

import { useState } from 'react';
import {
  Truck,
  User,
  Phone,
  Wrench,
  Calendar,
  Gauge,
  CheckCircle2,
  Clock,
  AlertTriangle,
  MapPin,
} from 'lucide-react';
import clsx from 'clsx';

type Tab = 'drivers' | 'equipment';

interface DriverData {
  id: string;
  name: string;
  phone: string;
  licenseClass: string;
  licenseExpiry: string;
  status: 'active' | 'off_duty' | 'on_leave';
  hourlyRate: number;
  currentAssignment: string | null;
  todayStats: { hours: number; loads: number; km: number };
}

interface EquipmentData {
  id: string;
  name: string;
  unitNumber: string;
  type: string;
  make: string;
  model: string;
  year: number;
  status: 'available' | 'in_use' | 'maintenance' | 'out_of_service';
  currentKm: number;
  dailyRate: number;
  hourlyRate: number;
  currentAssignment: string | null;
  nextService: string | null;
}

const drivers: DriverData[] = [
  { id: '1', name: 'Mike Thompson', phone: '(780) 555-0112', licenseClass: 'Class 1', licenseExpiry: '2027-06-15', status: 'active', hourlyRate: 38, currentAssignment: 'WO-2026-0042', todayStats: { hours: 8.5, loads: 4, km: 82 } },
  { id: '2', name: 'Dave Wilson', phone: '(780) 555-0118', licenseClass: 'Class 1', licenseExpiry: '2027-03-20', status: 'active', hourlyRate: 36, currentAssignment: 'WO-2026-0043', todayStats: { hours: 6.0, loads: 3, km: 145 } },
  { id: '3', name: 'Ryan Chen', phone: '(780) 555-0124', licenseClass: 'Class 3', licenseExpiry: '2026-11-30', status: 'active', hourlyRate: 34, currentAssignment: 'WO-2026-0044', todayStats: { hours: 9.5, loads: 5, km: 180 } },
  { id: '4', name: 'Jason Blackwell', phone: '(780) 555-0136', licenseClass: 'Class 1', licenseExpiry: '2027-09-01', status: 'off_duty', hourlyRate: 38, currentAssignment: null, todayStats: { hours: 0, loads: 0, km: 0 } },
  { id: '5', name: 'Brad Morrison', phone: '(780) 555-0130', licenseClass: 'Class 1', licenseExpiry: '2026-12-15', status: 'active', hourlyRate: 36, currentAssignment: 'WO-2026-0045', todayStats: { hours: 7.5, loads: 4, km: 155 } },
  { id: '6', name: 'Tyler Foss', phone: '(780) 555-0142', licenseClass: 'Class 3', licenseExpiry: '2027-04-10', status: 'on_leave', hourlyRate: 32, currentAssignment: null, todayStats: { hours: 0, loads: 0, km: 0 } },
  { id: '7', name: 'Chris Daniels', phone: '(780) 555-0148', licenseClass: 'Class 1', licenseExpiry: '2027-08-22', status: 'active', hourlyRate: 35, currentAssignment: null, todayStats: { hours: 4.0, loads: 2, km: 45 } },
];

const equipment: EquipmentData[] = [
  { id: '1', name: 'Kenworth T800 Tri-Axle', unitNumber: '#12', type: 'Truck', make: 'Kenworth', model: 'T800', year: 2021, status: 'in_use', currentKm: 145230, dailyRate: 450, hourlyRate: 65, currentAssignment: 'WO-2026-0042', nextService: '2026-04-01' },
  { id: '2', name: 'Peterbilt 389 Tandem', unitNumber: '#08', type: 'Truck', make: 'Peterbilt', model: '389', year: 2019, status: 'in_use', currentKm: 198400, dailyRate: 400, hourlyRate: 60, currentAssignment: 'WO-2026-0043', nextService: '2026-03-25' },
  { id: '3', name: 'Kenworth W900 Tri-Axle', unitNumber: '#15', type: 'Truck', make: 'Kenworth', model: 'W900', year: 2022, status: 'in_use', currentKm: 89500, dailyRate: 475, hourlyRate: 68, currentAssignment: 'WO-2026-0044', nextService: '2026-05-15' },
  { id: '4', name: 'Mack Granite Tandem', unitNumber: '#21', type: 'Truck', make: 'Mack', model: 'Granite', year: 2020, status: 'available', currentKm: 167800, dailyRate: 425, hourlyRate: 62, currentAssignment: null, nextService: '2026-04-10' },
  { id: '5', name: 'Cat 320 Excavator', unitNumber: '#03', type: 'Excavator', make: 'Caterpillar', model: '320', year: 2021, status: 'available', currentKm: 4200, dailyRate: 600, hourlyRate: 85, currentAssignment: null, nextService: '2026-06-01' },
  { id: '6', name: 'Cat 966M Loader', unitNumber: '#04', type: 'Loader', make: 'Caterpillar', model: '966M', year: 2020, status: 'in_use', currentKm: 6800, dailyRate: 550, hourlyRate: 80, currentAssignment: 'Pit Operations', nextService: '2026-04-20' },
  { id: '7', name: 'JD 772GP Grader', unitNumber: '#05', type: 'Grader', make: 'John Deere', model: '772GP', year: 2019, status: 'available', currentKm: 3100, dailyRate: 500, hourlyRate: 75, currentAssignment: null, nextService: '2026-05-01' },
  { id: '8', name: 'Bomag BW211 Compactor', unitNumber: '#06', type: 'Compactor', make: 'Bomag', model: 'BW211', year: 2022, status: 'available', currentKm: 1800, dailyRate: 350, hourlyRate: 55, currentAssignment: null, nextService: '2026-07-01' },
  { id: '9', name: 'Cat 262D3 Skid Steer', unitNumber: '#07', type: 'Skid Steer', make: 'Caterpillar', model: '262D3', year: 2023, status: 'maintenance', currentKm: 950, dailyRate: 300, hourlyRate: 50, currentAssignment: null, nextService: '2026-03-22' },
  { id: '10', name: 'Decap End Dump', unitNumber: '#T1', type: 'Trailer', make: 'Decap', model: 'Tri-Axle End Dump', year: 2021, status: 'in_use', currentKm: 0, dailyRate: 150, hourlyRate: 25, currentAssignment: 'WO-2026-0042', nextService: null },
  { id: '11', name: 'Fruehauf Belly Dump', unitNumber: '#T2', type: 'Trailer', make: 'Fruehauf', model: 'Belly Dump', year: 2020, status: 'available', currentKm: 0, dailyRate: 150, hourlyRate: 25, currentAssignment: null, nextService: null },
  { id: '12', name: 'Cedarapids Jaw Crusher', unitNumber: '#C1', type: 'Crusher', make: 'Cedarapids', model: 'CRJ3255', year: 2018, status: 'maintenance', currentKm: 8500, dailyRate: 800, hourlyRate: 120, currentAssignment: null, nextService: '2026-03-20' },
];

const driverStatusConfig: Record<string, { label: string; bg: string; text: string; dot: string }> = {
  active: { label: 'Active', bg: 'bg-green-100', text: 'text-green-700', dot: 'bg-green-500' },
  off_duty: { label: 'Off Duty', bg: 'bg-gray-100', text: 'text-gray-700', dot: 'bg-gray-400' },
  on_leave: { label: 'On Leave', bg: 'bg-yellow-100', text: 'text-yellow-700', dot: 'bg-yellow-500' },
};

const equipStatusConfig: Record<string, { label: string; bg: string; text: string; dot: string }> = {
  available: { label: 'Available', bg: 'bg-green-100', text: 'text-green-700', dot: 'bg-green-500' },
  in_use: { label: 'In Use', bg: 'bg-blue-100', text: 'text-blue-700', dot: 'bg-blue-500' },
  maintenance: { label: 'Maintenance', bg: 'bg-yellow-100', text: 'text-yellow-700', dot: 'bg-yellow-500' },
  out_of_service: { label: 'Out of Service', bg: 'bg-red-100', text: 'text-red-700', dot: 'bg-red-500' },
};

export default function FleetPage() {
  const [activeTab, setActiveTab] = useState<Tab>('drivers');

  const activeDrivers = drivers.filter(d => d.status === 'active').length;
  const inUseEquip = equipment.filter(e => e.status === 'in_use').length;
  const availEquip = equipment.filter(e => e.status === 'available').length;
  const maintEquip = equipment.filter(e => e.status === 'maintenance').length;

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Fleet & Drivers</h1>
        <p className="text-gray-600 mt-1">Manage drivers, trucks, and equipment</p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Active Drivers', value: activeDrivers, total: drivers.length, icon: User, color: 'text-green-600', bg: 'bg-green-50' },
          { label: 'Equipment In Use', value: inUseEquip, total: equipment.length, icon: Truck, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Available Units', value: availEquip, total: equipment.length, icon: CheckCircle2, color: 'text-green-600', bg: 'bg-green-50' },
          { label: 'In Maintenance', value: maintEquip, total: equipment.length, icon: Wrench, color: 'text-yellow-600', bg: 'bg-yellow-50' },
        ].map((card) => (
          <div key={card.label} className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">{card.label}</span>
              <div className={clsx('w-8 h-8 rounded-lg flex items-center justify-center', card.bg)}>
                <card.icon className={clsx('w-4 h-4', card.color)} />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">{card.value}<span className="text-sm font-normal text-gray-500">/{card.total}</span></p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 bg-gray-100 rounded-lg p-1 w-fit">
        <button
          onClick={() => setActiveTab('drivers')}
          className={clsx('px-6 py-2.5 rounded-md text-sm font-medium transition-colors', activeTab === 'drivers' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900')}
        >
          <span className="flex items-center gap-2"><User className="w-4 h-4" /> Drivers ({drivers.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('equipment')}
          className={clsx('px-6 py-2.5 rounded-md text-sm font-medium transition-colors', activeTab === 'equipment' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900')}
        >
          <span className="flex items-center gap-2"><Truck className="w-4 h-4" /> Equipment ({equipment.length})</span>
        </button>
      </div>

      {/* Drivers Grid */}
      {activeTab === 'drivers' && (
        <div className="grid grid-cols-2 xl:grid-cols-3 gap-4">
          {drivers.map((d) => {
            const sc = driverStatusConfig[d.status];
            return (
              <div key={d.id} className="bg-white rounded-xl border border-gray-200 p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-bold text-sm">
                      {d.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{d.name}</p>
                      <p className="text-sm text-gray-500">{d.licenseClass}</p>
                    </div>
                  </div>
                  <span className={clsx('flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium', sc.bg, sc.text)}>
                    <span className={clsx('w-1.5 h-1.5 rounded-full', sc.dot)} />
                    {sc.label}
                  </span>
                </div>

                <div className="space-y-2 text-sm mb-3">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Phone className="w-4 h-4" /> {d.phone}
                  </div>
                  {d.currentAssignment && (
                    <div className="flex items-center gap-2 text-blue-600">
                      <MapPin className="w-4 h-4" /> {d.currentAssignment}
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="w-4 h-4" /> License expires: {d.licenseExpiry}
                  </div>
                </div>

                {d.status === 'active' && (
                  <div className="grid grid-cols-3 gap-2 pt-3 border-t border-gray-100">
                    <div className="text-center">
                      <p className="text-xs text-gray-500">Hours</p>
                      <p className="font-semibold text-gray-900">{d.todayStats.hours}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-gray-500">Loads</p>
                      <p className="font-semibold text-gray-900">{d.todayStats.loads}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-gray-500">KM</p>
                      <p className="font-semibold text-gray-900">{d.todayStats.km}</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Equipment Grid */}
      {activeTab === 'equipment' && (
        <div className="grid grid-cols-2 xl:grid-cols-3 gap-4">
          {equipment.map((e) => {
            const sc = equipStatusConfig[e.status];
            return (
              <div key={e.id} className="bg-white rounded-xl border border-gray-200 p-5">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-semibold text-gray-900">Unit {e.unitNumber}</p>
                    <p className="text-sm text-gray-600">{e.make} {e.model} ({e.year})</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 bg-gray-100 rounded text-xs text-gray-600 font-medium">{e.type}</span>
                    <span className={clsx('flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium', sc.bg, sc.text)}>
                      <span className={clsx('w-1.5 h-1.5 rounded-full', sc.dot)} />
                      {sc.label}
                    </span>
                  </div>
                </div>

                <div className="space-y-2 text-sm mb-3">
                  {e.currentAssignment && (
                    <div className="flex items-center gap-2 text-blue-600">
                      <MapPin className="w-4 h-4" /> {e.currentAssignment}
                    </div>
                  )}
                  {e.currentKm > 0 && (
                    <div className="flex items-center gap-2 text-gray-600">
                      <Gauge className="w-4 h-4" /> {e.currentKm.toLocaleString()} km
                    </div>
                  )}
                  {e.nextService && (
                    <div className="flex items-center gap-2 text-gray-600">
                      <Wrench className="w-4 h-4" /> Service: {e.nextService}
                      {new Date(e.nextService) <= new Date('2026-03-25') && (
                        <AlertTriangle className="w-3.5 h-3.5 text-yellow-500" />
                      )}
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-2 pt-3 border-t border-gray-100 text-center">
                  <div>
                    <p className="text-xs text-gray-500">Daily Rate</p>
                    <p className="font-semibold text-gray-900">${e.dailyRate}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Hourly Rate</p>
                    <p className="font-semibold text-gray-900">${e.hourlyRate}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
