'use client';

import { useState } from 'react';
import { Calendar, TrendingUp, Archive, Eye } from 'lucide-react';
import StatusBadge from '@/components/StatusBadge';
import { differenceInDays, formatDistanceToNow } from 'date-fns';

type OpportunityTab =
  | 'strong'
  | 'reviewing'
  | 'pursuing'
  | 'submitted'
  | 'archived';

interface Opportunity {
  id: string;
  title: string;
  source: 'APC' | 'MERX' | 'Municipal';
  deadline: Date;
  estimatedValue: string;
  matchScore: number;
  capabilities: string[];
}

const opportunities: Opportunity[] = [
  {
    id: 'OPP-2024-087',
    title: 'Yellowhead County - Gravel Supply 2026-2027',
    source: 'Municipal',
    deadline: new Date(Date.now() + 14 * 24 * 60 * 60000),
    estimatedValue: '$85,000 - $120,000',
    matchScore: 94,
    capabilities: ['Gravel Supply', 'Bulk Materials', 'Local Delivery'],
  },
  {
    id: 'OPP-2024-086',
    title: 'Alberta Parks - Crushed Stone & Aggregate Services',
    source: 'MERX',
    deadline: new Date(Date.now() + 21 * 24 * 60 * 60000),
    estimatedValue: '$65,000 - $95,000',
    matchScore: 87,
    capabilities: ['Aggregate Supply', 'Equipment Rental', 'Site Work'],
  },
  {
    id: 'OPP-2024-085',
    title: 'Northwest Construction - Equipment & Materials RFQ',
    source: 'APC',
    deadline: new Date(Date.now() + 7 * 24 * 60 * 60000),
    estimatedValue: '$45,000 - $75,000',
    matchScore: 76,
    capabilities: ['Equipment Rental', 'Materials Supply', 'Labor'],
  },
  {
    id: 'OPP-2024-084',
    title: 'Municipal Highways - Spring Maintenance Supplies',
    source: 'Municipal',
    deadline: new Date(Date.now() + 3 * 24 * 60 * 60000),
    estimatedValue: '$120,000 - $180,000',
    matchScore: 91,
    capabilities: ['Road Materials', 'Snow Removal', 'Equipment'],
  },
];

const sourceColors = {
  APC: 'bg-blue-100 text-blue-800',
  MERX: 'bg-green-100 text-green-800',
  Municipal: 'bg-purple-100 text-purple-800',
};

export default function OpportunitiesPage() {
  const [activeTab, setActiveTab] = useState<OpportunityTab>('strong');

  const tabs: { label: string; value: OpportunityTab }[] = [
    { label: 'Strong Matches', value: 'strong' },
    { label: 'Worth Reviewing', value: 'reviewing' },
    { label: 'Pursuing', value: 'pursuing' },
    { label: 'Submitted', value: 'submitted' },
    { label: 'Archived', value: 'archived' },
  ];

  // For demo, show all opportunities in "strong" tab
  const displayedOpportunities = activeTab === 'strong' ? opportunities : [];

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Opportunities</h1>
        <p className="text-gray-600 mt-1">Track RFPs and business opportunities</p>
      </div>

      {/* Tabs */}
      <div className="mb-6 flex gap-2 overflow-x-auto pb-2 border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={`px-4 py-3 whitespace-nowrap font-medium transition-colors border-b-2 ${
              activeTab === tab.value
                ? 'border-brand-primary text-brand-primary'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Opportunities Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {displayedOpportunities.map((opp) => {
          const daysLeft = differenceInDays(opp.deadline, new Date());
          const isUrgent = daysLeft <= 7;

          return (
            <div
              key={opp.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
            >
              {/* Header */}
              <div className="mb-4">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-bold text-gray-900 flex-1">
                    {opp.title}
                  </h3>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ml-2 ${sourceColors[opp.source]}`}
                  >
                    {opp.source}
                  </span>
                </div>

                {/* Deadline */}
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <span
                    className={isUrgent ? 'text-red-600 font-medium' : 'text-gray-600'}
                  >
                    {daysLeft} days left
                  </span>
                  <span className="text-gray-400">
                    ({formatDistanceToNow(opp.deadline, { addSuffix: true })})
                  </span>
                </div>
              </div>

              {/* Value */}
              <div className="mb-4 pb-4 border-b border-gray-200">
                <p className="text-sm text-gray-600 mb-1">Estimated Value</p>
                <p className="text-2xl font-bold text-brand-primary">
                  {opp.estimatedValue}
                </p>
              </div>

              {/* Match Score */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium text-gray-700">Match Score</p>
                  <p className="text-sm font-bold text-gray-900">
                    {opp.matchScore}%
                  </p>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-brand-primary rounded-full h-2 transition-all"
                    style={{ width: `${opp.matchScore}%` }}
                  ></div>
                </div>
              </div>

              {/* Capabilities */}
              <div className="mb-6">
                <p className="text-sm font-medium text-gray-700 mb-2">
                  Capability Tags
                </p>
                <div className="flex gap-2 flex-wrap">
                  {opp.capabilities.map((cap, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs"
                    >
                      {cap}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <button className="flex-1 btn btn-primary flex items-center justify-center gap-2">
                  <Eye className="w-4 h-4" />
                  View Details
                </button>
                <button className="flex-1 btn btn-outline">Pursue</button>
                <button className="btn btn-outline p-2">
                  <Archive className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {displayedOpportunities.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600">No opportunities in this category</p>
        </div>
      )}
    </div>
  );
}
