'use client';

import { useState } from 'react';
import {
  Plus,
  Truck,
  CheckCircle2,
  AlertTriangle,
  Send,
  Eye,
  MapPin,
  User,
  Calendar,
  ChevronDown,
  ChevronUp,
  MessageSquare,
} from 'lucide-react';
import clsx from 'clsx';

type WOStatus = 'all' | 'pending' | 'scheduled' | 'dispatched' | 'in_progress' | 'completed';
type Priority = 'LOW' | 'NORMAL' | 'HIGH' | 'RUSH';

interface WorkOrder {
  id: string;
  poRef: string;
  customer: string;
  driver: string | null;
  driverPhone: string | null;
  equipment: string | null;
  deliveryAddress: string;
  scheduledDate: string;
  scheduledTime: string | null;
  priority: Priority;
  status: WOStatus;
  materials: { description: string; quantity: number; unit: string }[];
  specialInstructions: string | null;
}

const workOrders: WorkOrder[] = [
  {
    id: 'WO-2026-0042', poRef: 'PO-2026-0034', customer: 'Apex Construction',
    driver: 'Mike Thompson', driverPhone: '(780) 555-0112', equipment: 'Unit #12 - Kenworth T800',
    deliveryAddress: 'Hwy 16 & Range Rd 45, Hinton', scheduledDate: '2026-03-19', scheduledTime: '7:00 AM',
    priority: 'HIGH', status: 'dispatched',
    materials: [{ description: 'Road Crush (3/4")', quantity: 40, unit: 'tonne' }, { description: 'Pit Run Gravel', quantity: 30, unit: 'tonne' }],
    specialInstructions: 'Gate code: 4521. Contact foreman on arrival.',
  },
  {
    id: 'WO-2026-0043', poRef: 'PO-2026-0035', customer: 'Mountain View Homes',
    driver: 'Dave Wilson', driverPhone: '(780) 555-0118', equipment: 'Unit #08 - Peterbilt 389',
    deliveryAddress: 'Grande Cache Subdivision, Lot 12-18', scheduledDate: '2026-03-19', scheduledTime: '8:00 AM',
    priority: 'NORMAL', status: 'in_progress',
    materials: [{ description: 'Topsoil (Screened)', quantity: 25, unit: 'tonne' }],
    specialInstructions: null,
  },
  {
    id: 'WO-2026-0044', poRef: 'PO-2026-0036', customer: 'Twin Rivers Ltd',
    driver: 'Ryan Chen', driverPhone: '(780) 555-0124', equipment: 'Unit #15 - Kenworth W900',
    deliveryAddress: 'TWP Rd 534, Edson', scheduledDate: '2026-03-19', scheduledTime: '6:30 AM',
    priority: 'RUSH', status: 'in_progress',
    materials: [{ description: 'Road Crush (3/4")', quantity: 60, unit: 'tonne' }, { description: 'Washed Rock', quantity: 20, unit: 'tonne' }],
    specialInstructions: 'Pipeline access road - must be completed today.',
  },
  {
    id: 'WO-2026-0045', poRef: 'PO-2026-0037', customer: 'Parkland Services',
    driver: 'Brad Morrison', driverPhone: '(780) 555-0130', equipment: 'Unit #21 - Mack Granite',
    deliveryAddress: 'Jasper Townsite, Park Admin Building', scheduledDate: '2026-03-20', scheduledTime: '7:30 AM',
    priority: 'NORMAL', status: 'scheduled',
    materials: [{ description: 'Decorative Rock', quantity: 15, unit: 'tonne' }, { description: 'Landscaping Gravel', quantity: 10, unit: 'tonne' }],
    specialInstructions: 'Parks Canada escort required at gate.',
  },
  {
    id: 'WO-2026-0046', poRef: 'PO-2026-0038', customer: 'CN Rail',
    driver: null, driverPhone: null, equipment: null,
    deliveryAddress: 'CN Yard, Mile 165, Hinton', scheduledDate: '2026-03-21', scheduledTime: null,
    priority: 'LOW', status: 'pending',
    materials: [{ description: 'Ballast Rock', quantity: 100, unit: 'tonne' }],
    specialInstructions: 'Rail safety orientation required before entry.',
  },
  {
    id: 'WO-2026-0047', poRef: 'PO-2026-0039', customer: 'TransAlta',
    driver: 'Jason Blackwell', driverPhone: '(780) 555-0136', equipment: 'Unit #12 - Kenworth T800',
    deliveryAddress: 'TransAlta Sundance Plant, Hwy 627', scheduledDate: '2026-03-17', scheduledTime: '7:00 AM',
    priority: 'HIGH', status: 'completed',
    materials: [{ description: 'Pit Run', quantity: 80, unit: 'tonne' }, { description: 'Road Crush', quantity: 40, unit: 'tonne' }],
    specialInstructions: null,
  },
  {
    id: 'WO-2026-0048', poRef: 'PO-2026-0040', customer: 'Hinton Housing Co-op',
    driver: 'Tyler Foss', driverPhone: '(780) 555-0142', equipment: 'Unit #08 - Peterbilt 389',
    deliveryAddress: '228 Pembina Ave, Hinton', scheduledDate: '2026-03-18', scheduledTime: '9:00 AM',
    priority: 'NORMAL', status: 'completed',
    materials: [{ description: 'Sand (Bedding)', quantity: 12, unit: 'tonne' }, { description: 'Drain Rock', quantity: 8, unit: 'tonne' }],
    specialInstructions: null,
  },
];

const statusConfig: Record<string, { label: string; bg: string; text: string }> = {
  pending: { label: 'Pending', bg: 'bg-gray-100', text: 'text-gray-700' },
  scheduled: { label: 'Scheduled', bg: 'bg-blue-100', text: 'text-blue-700' },
  dispatched: { label: 'Dispatched', bg: 'bg-indigo-100', text: 'text-indigo-700' },
  in_progress: { label: 'In Progress', bg: 'bg-yellow-100', text: 'text-yellow-800' },
  completed: { label: 'Completed', bg: 'bg-green-100', text: 'text-green-700' },
};

const priorityConfig: Record<Priority, { label: string; bg: string; text: string }> = {
  LOW: { label: 'Low', bg: 'bg-gray-100', text: 'text-gray-600' },
  NORMAL: { label: 'Normal', bg: 'bg-blue-50', text: 'text-blue-600' },
  HIGH: { label: 'High', bg: 'bg-orange-100', text: 'text-orange-700' },
  RUSH: { label: 'Rush', bg: 'bg-red-100', text: 'text-red-700' },
};

export default function WorkOrdersPage() {
  const [activeFilter, setActiveFilter] = useState<WOStatus>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [, setShowCreatePanel] = useState(false);

  const filters: { label: string; value: WOStatus; count: number }[] = [
    { label: 'All', value: 'all', count: workOrders.length },
    { label: 'Pending', value: 'pending', count: workOrders.filter(w => w.status === 'pending').length },
    { label: 'Scheduled', value: 'scheduled', count: workOrders.filter(w => w.status === 'scheduled').length },
    { label: 'Dispatched', value: 'dispatched', count: workOrders.filter(w => w.status === 'dispatched').length },
    { label: 'In Progress', value: 'in_progress', count: workOrders.filter(w => w.status === 'in_progress').length },
    { label: 'Completed', value: 'completed', count: workOrders.filter(w => w.status === 'completed').length },
  ];

  const filtered = activeFilter === 'all' ? workOrders : workOrders.filter(w => w.status === activeFilter);

  const todayCount = workOrders.filter(w => w.scheduledDate === '2026-03-19').length;
  const activeCount = workOrders.filter(w => ['dispatched', 'in_progress'].includes(w.status)).length;
  const completedWeek = workOrders.filter(w => w.status === 'completed').length;

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Work Orders</h1>
          <p className="text-gray-600 mt-1">Manage dispatch and track deliveries</p>
        </div>
        <button
          onClick={() => setShowCreatePanel(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-blue-700 text-white rounded-lg font-medium hover:bg-blue-800 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Create Work Order
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Scheduled Today', value: todayCount, icon: Calendar, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Active Now', value: activeCount, icon: Truck, color: 'text-yellow-600', bg: 'bg-yellow-50' },
          { label: 'Completed (Week)', value: completedWeek, icon: CheckCircle2, color: 'text-green-600', bg: 'bg-green-50' },
          { label: 'Pending Assignment', value: workOrders.filter(w => !w.driver).length, icon: AlertTriangle, color: 'text-orange-600', bg: 'bg-orange-50' },
        ].map((card) => (
          <div key={card.label} className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">{card.label}</span>
              <div className={clsx('w-8 h-8 rounded-lg flex items-center justify-center', card.bg)}>
                <card.icon className={clsx('w-4 h-4', card.color)} />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">{card.value}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="mb-6 flex gap-2 overflow-x-auto pb-2">
        {filters.map((f) => (
          <button
            key={f.value}
            onClick={() => setActiveFilter(f.value)}
            className={clsx(
              'px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap',
              activeFilter === f.value
                ? 'bg-blue-700 text-white'
                : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
            )}
          >
            {f.label} ({f.count})
          </button>
        ))}
      </div>

      {/* Work Orders List */}
      <div className="space-y-3">
        {filtered.map((wo) => {
          const isExpanded = expandedId === wo.id;
          const sc = statusConfig[wo.status];
          const pc = priorityConfig[wo.priority];

          return (
            <div key={wo.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              {/* Main Row */}
              <div
                className="p-5 cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => setExpandedId(isExpanded ? null : wo.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-gray-900">{wo.id}</span>
                        <span className={clsx('px-2 py-0.5 rounded-full text-xs font-medium', sc.bg, sc.text)}>
                          {sc.label}
                        </span>
                        <span className={clsx('px-2 py-0.5 rounded-full text-xs font-medium', pc.bg, pc.text)}>
                          {pc.label}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">{wo.customer} &middot; {wo.poRef}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 text-sm text-gray-600">
                    <div className="flex items-center gap-1.5">
                      <User className="w-4 h-4" />
                      <span>{wo.driver || 'Unassigned'}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4" />
                      <span className="max-w-[200px] truncate">{wo.deliveryAddress}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4" />
                      <span>{wo.scheduledDate}{wo.scheduledTime ? ` ${wo.scheduledTime}` : ''}</span>
                    </div>
                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                </div>

                {/* Materials summary */}
                <div className="mt-2 flex gap-2 flex-wrap">
                  {wo.materials.map((m, i) => (
                    <span key={i} className="px-2 py-1 bg-gray-100 rounded text-xs text-gray-700">
                      {m.quantity}{m.unit === 'tonne' ? 'T' : m.unit} {m.description}
                    </span>
                  ))}
                </div>
              </div>

              {/* Expanded Details */}
              {isExpanded && (
                <div className="border-t border-gray-100 px-5 py-4 bg-gray-50">
                  <div className="grid grid-cols-3 gap-6 mb-4">
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Equipment</p>
                      <p className="text-sm font-medium text-gray-900">{wo.equipment || 'Not assigned'}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Driver Phone</p>
                      <p className="text-sm font-medium text-gray-900">{wo.driverPhone || '-'}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Special Instructions</p>
                      <p className="text-sm text-gray-900">{wo.specialInstructions || 'None'}</p>
                    </div>
                  </div>

                  {/* Materials Table */}
                  <table className="w-full text-sm mb-4">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-2 text-gray-500 font-medium">Material</th>
                        <th className="text-right py-2 text-gray-500 font-medium">Quantity</th>
                        <th className="text-right py-2 text-gray-500 font-medium">Unit</th>
                      </tr>
                    </thead>
                    <tbody>
                      {wo.materials.map((m, i) => (
                        <tr key={i} className="border-b border-gray-100">
                          <td className="py-2 text-gray-900">{m.description}</td>
                          <td className="py-2 text-right text-gray-900">{m.quantity}</td>
                          <td className="py-2 text-right text-gray-600">{m.unit}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {/* Actions */}
                  <div className="flex gap-3">
                    {wo.status === 'scheduled' && (
                      <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700">
                        <Send className="w-4 h-4" />
                        Dispatch via SMS
                      </button>
                    )}
                    {wo.status === 'pending' && (
                      <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
                        <User className="w-4 h-4" />
                        Assign Driver
                      </button>
                    )}
                    {['dispatched', 'in_progress'].includes(wo.status) && (
                      <>
                        <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700">
                          <CheckCircle2 className="w-4 h-4" />
                          Mark Complete
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50">
                          <MessageSquare className="w-4 h-4" />
                          Message Driver
                        </button>
                      </>
                    )}
                    <button className="flex items-center gap-2 px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50">
                      <Eye className="w-4 h-4" />
                      View Details
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <Truck className="w-12 h-12 mx-auto mb-4 text-gray-300" />
          <p className="text-lg font-medium text-gray-700">No work orders found</p>
          <p className="text-sm">Try changing your filters or create a new work order.</p>
        </div>
      )}
    </div>
  );
}
