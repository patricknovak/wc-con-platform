'use client';

import { Play, FileText, Plus } from 'lucide-react';
import StatusBadge from '@/components/StatusBadge';
import { format } from 'date-fns';

interface CallLog {
  id: string;
  time: Date;
  caller: string;
  intent: string;
  priority: 'low' | 'medium' | 'high';
  duration: string;
  status: string;
}

const callLogs: CallLog[] = [
  {
    id: 'CALL-001',
    time: new Date(Date.now() - 5 * 60000),
    caller: 'Mike Johnson',
    intent: 'Equipment Rental',
    priority: 'high',
    duration: '4:32',
    status: 'Captured',
  },
  {
    id: 'CALL-002',
    time: new Date(Date.now() - 18 * 60000),
    caller: 'Sarah Chen',
    intent: 'Material Quote',
    priority: 'medium',
    duration: '3:15',
    status: 'Captured',
  },
  {
    id: 'CALL-003',
    time: new Date(Date.now() - 32 * 60000),
    caller: 'James Rodriguez',
    intent: 'General Inquiry',
    priority: 'low',
    duration: '1:42',
    status: 'Captured',
  },
  {
    id: 'CALL-004',
    time: new Date(Date.now() - 1 * 60 * 60000),
    caller: 'David Brown',
    intent: 'Equipment Rental',
    priority: 'high',
    duration: '5:08',
    status: 'Captured',
  },
  {
    id: 'CALL-005',
    time: new Date(Date.now() - 2 * 60 * 60000),
    caller: 'Jennifer Lee',
    intent: 'Material Quote',
    priority: 'medium',
    duration: '3:51',
    status: 'Captured',
  },
  {
    id: 'CALL-006',
    time: new Date(Date.now() - 3 * 60 * 60000),
    caller: 'Tom Wilson',
    intent: 'Service Inquiry',
    priority: 'low',
    duration: '2:24',
    status: 'Captured',
  },
];

const intentColors = {
  'Equipment Rental': 'bg-blue-100 text-blue-800',
  'Material Quote': 'bg-green-100 text-green-800',
  'General Inquiry': 'bg-gray-100 text-gray-800',
  'Service Inquiry': 'bg-purple-100 text-purple-800',
};

export default function VoicePage() {
  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Voice Agent</h1>
        <p className="text-gray-600 mt-1">Monitor automated call handling and lead capture</p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <p className="text-gray-600 text-sm font-medium">Calls Today</p>
          <p className="text-3xl font-bold text-brand-primary mt-2">8</p>
          <p className="text-xs text-gray-500 mt-2">vs 6 yesterday</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <p className="text-gray-600 text-sm font-medium">Avg Duration</p>
          <p className="text-3xl font-bold text-brand-secondary mt-2">3:42</p>
          <p className="text-xs text-gray-500 mt-2">minutes</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <p className="text-gray-600 text-sm font-medium">Transfer Rate</p>
          <p className="text-3xl font-bold text-yellow-600 mt-2">15%</p>
          <p className="text-xs text-gray-500 mt-2">to humans</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <p className="text-gray-600 text-sm font-medium">Leads Captured</p>
          <p className="text-3xl font-bold text-green-600 mt-2">5</p>
          <p className="text-xs text-gray-500 mt-2">ready to follow up</p>
        </div>
      </div>

      {/* Call Log Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-8">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h2 className="text-lg font-bold text-gray-900">Call Log</h2>
        </div>

        <table className="w-full">
          <thead className="table-head">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                Time
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                Caller
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                Intent
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                Priority
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                Duration
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                Status
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {callLogs.map((call) => (
              <tr key={call.id} className="table-row">
                <td className="px-6 py-4 text-sm text-gray-700">
                  {format(call.time, 'h:mm a')}
                </td>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  {call.caller}
                </td>
                <td className="px-6 py-4 text-sm">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${intentColors[call.intent as keyof typeof intentColors]}`}
                  >
                    {call.intent}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm">
                  <StatusBadge status={call.priority}>
                    {call.priority}
                  </StatusBadge>
                </td>
                <td className="px-6 py-4 text-sm text-gray-700 font-medium">
                  {call.duration}
                </td>
                <td className="px-6 py-4 text-sm">
                  <StatusBadge status="active">{call.status}</StatusBadge>
                </td>
                <td className="px-6 py-4 text-sm">
                  <div className="flex items-center gap-2">
                    <button className="p-2 text-gray-600 hover:text-brand-primary transition-colors rounded-lg hover:bg-gray-100">
                      <Play className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-600 hover:text-brand-primary transition-colors rounded-lg hover:bg-gray-100">
                      <FileText className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-600 hover:text-brand-primary transition-colors rounded-lg hover:bg-gray-100">
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Knowledge Base Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Knowledge Base</h2>
        <div className="bg-gray-50 rounded-lg p-6 text-center">
          <p className="text-gray-600 mb-4">
            Last updated 2 hours ago with 142 new pricing records
          </p>
          <button className="btn btn-primary">Update Knowledge Base</button>
        </div>
      </div>
    </div>
  );
}
