'use client';

import { useState } from 'react';
import {
  Plus,
  Clock,
  CheckCircle2,
  AlertCircle,
  Eye,
  MessageSquare,
  User,
  ChevronDown,
  ChevronUp,
  Smartphone,
  MapPin,
  Gauge,
  Receipt,
} from 'lucide-react';
import clsx from 'clsx';

type TicketStatusFilter = 'all' | 'submitted' | 'under_review' | 'approved' | 'disputed';

interface TicketData {
  id: string;
  workOrderRef: string;
  driver: string;
  driverPhone: string;
  date: string;
  status: TicketStatusFilter;
  jobSite: string;
  startTime: string;
  endTime: string;
  hoursWorked: number;
  startKm: number;
  endKm: number;
  totalKm: number;
  materials: { description: string; quantity: number; unit: string }[];
  equipment: string[];
  parsedBySms: boolean;
  rawSmsText?: string;
  driverNotes?: string;
  selected?: boolean;
}

const tickets: TicketData[] = [
  {
    id: 'TK-2026-0098', workOrderRef: 'WO-2026-0042', driver: 'Mike Thompson', driverPhone: '(780) 555-0112',
    date: '2026-03-19', status: 'submitted', jobSite: 'Hwy 16 & Range Rd 45',
    startTime: '07:00', endTime: '16:30', hoursWorked: 8.5, startKm: 45230, endKm: 45312, totalKm: 82,
    materials: [{ description: 'Road Crush (3/4")', quantity: 40, unit: 'tonne' }, { description: 'Pit Run Gravel', quantity: 28, unit: 'tonne' }],
    equipment: ['Unit #12 - Kenworth T800', 'Trailer #T1'], parsedBySms: true,
    rawSmsText: 'WO:42\nSite: Hwy 16 RR45\n7am-430pm\nKM: 45230-45312\n40T crush\n28T pit run\nTruck 12 Trailer T1\nNote: soft ground east side',
    driverNotes: 'Soft ground east side, flagged for grading.',
  },
  {
    id: 'TK-2026-0097', workOrderRef: 'WO-2026-0043', driver: 'Dave Wilson', driverPhone: '(780) 555-0118',
    date: '2026-03-19', status: 'submitted', jobSite: 'Grande Cache Subdivision, Lot 12-18',
    startTime: '08:00', endTime: '15:00', hoursWorked: 6.0, startKm: 38100, endKm: 38245, totalKm: 145,
    materials: [{ description: 'Topsoil (Screened)', quantity: 25, unit: 'tonne' }],
    equipment: ['Unit #08 - Peterbilt 389'], parsedBySms: true,
    rawSmsText: 'WO 43 grande cache 8am-3pm 145km 25T topsoil truck 08',
  },
  {
    id: 'TK-2026-0096', workOrderRef: 'WO-2026-0044', driver: 'Ryan Chen', driverPhone: '(780) 555-0124',
    date: '2026-03-19', status: 'under_review', jobSite: 'TWP Rd 534, Edson',
    startTime: '06:30', endTime: '17:00', hoursWorked: 9.5, startKm: 52100, endKm: 52280, totalKm: 180,
    materials: [{ description: 'Road Crush (3/4")', quantity: 58, unit: 'tonne' }, { description: 'Washed Rock', quantity: 18, unit: 'tonne' }],
    equipment: ['Unit #15 - Kenworth W900', 'Trailer #T2'], parsedBySms: false,
    driverNotes: 'Short 2T on crush, pit was running low. Rock delivered in 2 loads.',
  },
  {
    id: 'TK-2026-0095', workOrderRef: 'WO-2026-0047', driver: 'Jason Blackwell', driverPhone: '(780) 555-0136',
    date: '2026-03-17', status: 'approved', jobSite: 'TransAlta Sundance Plant',
    startTime: '07:00', endTime: '16:00', hoursWorked: 8.0, startKm: 61400, endKm: 61510, totalKm: 110,
    materials: [{ description: 'Pit Run', quantity: 80, unit: 'tonne' }, { description: 'Road Crush', quantity: 40, unit: 'tonne' }],
    equipment: ['Unit #12 - Kenworth T800', 'Trailer #T1'], parsedBySms: true,
    rawSmsText: 'WO:47\nTransAlta\n7-4pm\nKM: 61400-61510\n80T pit run\n40T crush\nTruck 12',
  },
  {
    id: 'TK-2026-0094', workOrderRef: 'WO-2026-0048', driver: 'Tyler Foss', driverPhone: '(780) 555-0142',
    date: '2026-03-18', status: 'approved', jobSite: '228 Pembina Ave, Hinton',
    startTime: '09:00', endTime: '14:30', hoursWorked: 4.5, startKm: 22300, endKm: 22318, totalKm: 18,
    materials: [{ description: 'Sand (Bedding)', quantity: 12, unit: 'tonne' }, { description: 'Drain Rock', quantity: 8, unit: 'tonne' }],
    equipment: ['Unit #08 - Peterbilt 389'], parsedBySms: false,
  },
  {
    id: 'TK-2026-0093', workOrderRef: 'WO-2026-0041', driver: 'Brad Morrison', driverPhone: '(780) 555-0130',
    date: '2026-03-18', status: 'disputed', jobSite: 'Whitecourt Industrial Park',
    startTime: '07:00', endTime: '15:30', hoursWorked: 7.5, startKm: 71000, endKm: 71155, totalKm: 155,
    materials: [{ description: 'Gravel (Crushed)', quantity: 35, unit: 'tonne' }],
    equipment: ['Unit #21 - Mack Granite'], parsedBySms: true,
    rawSmsText: '41 whitecourt 7-330 155km 35T gravel truck 21',
    driverNotes: 'WO listed 50T but customer only wanted 35T on site.',
  },
];

const statusConfig: Record<string, { label: string; bg: string; text: string }> = {
  submitted: { label: 'Submitted', bg: 'bg-blue-100', text: 'text-blue-700' },
  under_review: { label: 'Under Review', bg: 'bg-yellow-100', text: 'text-yellow-800' },
  approved: { label: 'Approved', bg: 'bg-green-100', text: 'text-green-700' },
  disputed: { label: 'Disputed', bg: 'bg-red-100', text: 'text-red-700' },
};

export default function TicketsPage() {
  const [activeFilter, setActiveFilter] = useState<TicketStatusFilter>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [selectedTickets, setSelectedTickets] = useState<Set<string>>(new Set());

  const filters: { label: string; value: TicketStatusFilter; count: number }[] = [
    { label: 'All', value: 'all', count: tickets.length },
    { label: 'Submitted', value: 'submitted', count: tickets.filter(t => t.status === 'submitted').length },
    { label: 'Under Review', value: 'under_review', count: tickets.filter(t => t.status === 'under_review').length },
    { label: 'Approved', value: 'approved', count: tickets.filter(t => t.status === 'approved').length },
    { label: 'Disputed', value: 'disputed', count: tickets.filter(t => t.status === 'disputed').length },
  ];

  const filtered = activeFilter === 'all' ? tickets : tickets.filter(t => t.status === activeFilter);

  function toggleSelect(id: string) {
    const next = new Set(selectedTickets);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedTickets(next);
  }

  const approvedSelected = [...selectedTickets].filter(id => tickets.find(t => t.id === id)?.status === 'approved');

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Tickets</h1>
          <p className="text-gray-600 mt-1">Daily work records from drivers - review and approve for invoicing</p>
        </div>
        <div className="flex gap-3">
          {approvedSelected.length > 0 && (
            <button className="flex items-center gap-2 px-5 py-2.5 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors">
              <Receipt className="w-5 h-5" />
              Generate Invoice ({approvedSelected.length} tickets)
            </button>
          )}
          <button className="flex items-center gap-2 px-5 py-2.5 bg-blue-700 text-white rounded-lg font-medium hover:bg-blue-800 transition-colors">
            <Plus className="w-5 h-5" />
            Create Ticket
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Submitted Today', value: tickets.filter(t => t.date === '2026-03-19').length, icon: MessageSquare, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Pending Review', value: tickets.filter(t => ['submitted', 'under_review'].includes(t.status)).length, icon: Clock, color: 'text-yellow-600', bg: 'bg-yellow-50' },
          { label: 'Approved', value: tickets.filter(t => t.status === 'approved').length, icon: CheckCircle2, color: 'text-green-600', bg: 'bg-green-50' },
          { label: 'Via SMS', value: tickets.filter(t => t.parsedBySms).length, icon: Smartphone, color: 'text-purple-600', bg: 'bg-purple-50' },
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

      {/* Tickets List */}
      <div className="space-y-3">
        {filtered.map((tk) => {
          const isExpanded = expandedId === tk.id;
          const sc = statusConfig[tk.status];
          const isSelected = selectedTickets.has(tk.id);

          return (
            <div key={tk.id} className={clsx('bg-white rounded-xl border overflow-hidden', isSelected ? 'border-blue-400 ring-1 ring-blue-200' : 'border-gray-200')}>
              {/* Main Row */}
              <div className="p-5">
                <div className="flex items-start gap-3">
                  {/* Checkbox */}
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => toggleSelect(tk.id)}
                    className="mt-1.5 w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />

                  <div className="flex-1 cursor-pointer" onClick={() => setExpandedId(isExpanded ? null : tk.id)}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-gray-900">{tk.id}</span>
                        <span className={clsx('px-2 py-0.5 rounded-full text-xs font-medium', sc.bg, sc.text)}>
                          {sc.label}
                        </span>
                        {tk.parsedBySms && (
                          <span className="flex items-center gap-1 px-2 py-0.5 bg-purple-50 text-purple-600 rounded-full text-xs font-medium">
                            <Smartphone className="w-3 h-3" /> SMS
                          </span>
                        )}
                        <span className="text-sm text-gray-500">{tk.workOrderRef}</span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span>{tk.date}</span>
                        {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                      </div>
                    </div>

                    <div className="mt-2 flex items-center gap-6 text-sm text-gray-600">
                      <div className="flex items-center gap-1.5">
                        <User className="w-4 h-4" />
                        {tk.driver}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-4 h-4" />
                        {tk.jobSite}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4" />
                        {tk.startTime} - {tk.endTime} ({tk.hoursWorked}hrs)
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Gauge className="w-4 h-4" />
                        {tk.totalKm}km
                      </div>
                    </div>

                    {/* Materials chips */}
                    <div className="mt-2 flex gap-2 flex-wrap">
                      {tk.materials.map((m, i) => (
                        <span key={i} className="px-2 py-1 bg-gray-100 rounded text-xs text-gray-700">
                          {m.quantity}{m.unit === 'tonne' ? 'T' : m.unit} {m.description}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Expanded */}
              {isExpanded && (
                <div className="border-t border-gray-100 px-5 py-4 bg-gray-50">
                  <div className="grid grid-cols-2 gap-6 mb-4">
                    <div>
                      <h4 className="text-xs text-gray-500 uppercase tracking-wide mb-2">Ticket Details</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Driver Phone</span>
                          <span className="font-medium">{tk.driverPhone}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Odometer</span>
                          <span className="font-medium">{tk.startKm.toLocaleString()} → {tk.endKm.toLocaleString()} ({tk.totalKm}km)</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Equipment</span>
                          <span className="font-medium">{tk.equipment.join(', ')}</span>
                        </div>
                        {tk.driverNotes && (
                          <div>
                            <span className="text-gray-600">Driver Notes:</span>
                            <p className="mt-1 text-gray-900">{tk.driverNotes}</p>
                          </div>
                        )}
                      </div>
                    </div>

                    {tk.parsedBySms && tk.rawSmsText && (
                      <div>
                        <h4 className="text-xs text-gray-500 uppercase tracking-wide mb-2">Original SMS</h4>
                        <pre className="p-3 bg-white border border-gray-200 rounded-lg text-xs text-gray-700 whitespace-pre-wrap font-mono">
                          {tk.rawSmsText}
                        </pre>
                      </div>
                    )}
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
                      {tk.materials.map((m, i) => (
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
                    {tk.status === 'submitted' && (
                      <>
                        <button className="flex items-center gap-2 px-4 py-2 bg-yellow-500 text-white rounded-lg text-sm font-medium hover:bg-yellow-600">
                          <Eye className="w-4 h-4" />
                          Start Review
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700">
                          <CheckCircle2 className="w-4 h-4" />
                          Approve
                        </button>
                      </>
                    )}
                    {tk.status === 'under_review' && (
                      <>
                        <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700">
                          <CheckCircle2 className="w-4 h-4" />
                          Approve
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700">
                          <AlertCircle className="w-4 h-4" />
                          Dispute
                        </button>
                      </>
                    )}
                    {tk.status === 'disputed' && (
                      <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
                        <MessageSquare className="w-4 h-4" />
                        Message Driver
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
