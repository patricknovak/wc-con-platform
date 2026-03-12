'use client';

import { ArrowRight, Clock, AlertCircle, CheckCircle2 } from 'lucide-react';
import StatusBadge from '@/components/StatusBadge';
import { formatDistanceToNow } from 'date-fns';

const summaryCards = [
  { label: 'Open Quotes', value: '12', icon: '📄', color: 'bg-blue-50' },
  { label: 'Conversations Today', value: '6', icon: '💬', color: 'bg-green-50' },
  { label: 'Opportunities Matched', value: '3', icon: '🎯', color: 'bg-yellow-50' },
  { label: 'Job Applicants', value: '4', icon: '👤', color: 'bg-purple-50' },
];

const priorityActions = [
  {
    id: 1,
    title: 'New quote request from Mountain View Construction',
    subtitle: '500T road crush',
    priority: 'high',
    timestamp: new Date(Date.now() - 15 * 60000),
  },
  {
    id: 2,
    title: 'Voice agent call: Jasper National Park',
    subtitle: 'Equipment rental inquiry',
    priority: 'medium',
    timestamp: new Date(Date.now() - 45 * 60000),
  },
  {
    id: 3,
    title: 'Strong match: Yellowhead County',
    subtitle: 'Gravel Supply 2026-2027',
    priority: 'high',
    timestamp: new Date(Date.now() - 2 * 60 * 60000),
  },
  {
    id: 4,
    title: 'New applicant: Sarah Blackwood — Truck Driver',
    subtitle: 'AI Score: 92/100 — Top candidate',
    priority: 'medium',
    timestamp: new Date(Date.now() - 4 * 60 * 60000),
  },
  {
    id: 5,
    title: 'Hub application: Parkland Electric Ltd',
    subtitle: 'Review and approve',
    priority: 'low',
    timestamp: new Date(Date.now() - 6 * 60 * 60000),
  },
];

const recentActivity = [
  {
    id: 1,
    event: 'Quote QT-2024-156 sent to Apex Construction',
    timestamp: new Date(Date.now() - 30 * 60000),
  },
  {
    id: 2,
    event: 'AI assessed resume: Dave Makenzie (Crusher Operator) — Score 95',
    timestamp: new Date(Date.now() - 60 * 60000),
  },
  {
    id: 6,
    event: 'Chat widget converted visitor to quote request (driveway project)',
    timestamp: new Date(Date.now() - 90 * 60000),
  },
  {
    id: 3,
    event: 'Quote QT-2024-155 accepted by Twin Rivers Ltd',
    timestamp: new Date(Date.now() - 3 * 60 * 60000),
  },
  {
    id: 4,
    event: 'Hub listing for Cascade Materials approved',
    timestamp: new Date(Date.now() - 5 * 60 * 60000),
  },
  {
    id: 5,
    event: 'Intelligence system learned pricing for 142 new items',
    timestamp: new Date(Date.now() - 8 * 60 * 60000),
  },
];

export default function DashboardHome() {
  return (
    <div className="p-8">
      {/* Welcome */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Good morning, Todd</h1>
        <p className="text-gray-600 mt-1">Here's what's happening with your business</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {summaryCards.map((card, idx) => (
          <div key={idx} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className={`w-12 h-12 rounded-lg ${card.color} flex items-center justify-center mb-4 text-2xl`}>
              {card.icon}
            </div>
            <p className="text-gray-600 text-sm font-medium">{card.label}</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">{card.value}</p>
          </div>
        ))}
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Priority Actions */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Priority Actions</h2>
            <div className="space-y-3">
              {priorityActions.map((action) => (
                <div
                  key={action.id}
                  className="flex items-start gap-4 p-4 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium text-gray-900">{action.title}</h3>
                      <StatusBadge status={action.priority}>
                        {action.priority}
                      </StatusBadge>
                    </div>
                    <p className="text-sm text-gray-600">{action.subtitle}</p>
                    <p className="text-xs text-gray-500 mt-2">
                      {formatDistanceToNow(action.timestamp, { addSuffix: true })}
                    </p>
                  </div>
                  <button className="flex-shrink-0 text-brand-primary hover:text-brand-secondary transition-colors">
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Recent Activity</h2>
            <div className="space-y-4">
              {recentActivity.map((item, idx) => (
                <div key={item.id} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className="w-3 h-3 rounded-full bg-brand-primary mt-1"></div>
                    {idx < recentActivity.length - 1 && (
                      <div className="w-0.5 h-12 bg-gray-200 my-2"></div>
                    )}
                  </div>
                  <div className="pb-4">
                    <p className="text-sm text-gray-700">{item.event}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {formatDistanceToNow(item.timestamp, { addSuffix: true })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
