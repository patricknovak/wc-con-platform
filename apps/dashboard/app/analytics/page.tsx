'use client';

import { useState } from 'react';
import { BarChart3, TrendingUp } from 'lucide-react';

type TimePeriod = 'month' | 'last30' | 'quarter' | 'year';

const KPIs = [
  {
    label: 'Monthly Revenue',
    value: '$245,300',
    change: '+12%',
    changeDirection: 'up' as const,
    icon: '💰',
  },
  {
    label: 'Quotes Sent',
    value: '34',
    change: '+8%',
    changeDirection: 'up' as const,
    icon: '📄',
  },
  {
    label: 'Win Rate',
    value: '32%',
    change: '+3%',
    changeDirection: 'up' as const,
    icon: '🎯',
  },
  {
    label: 'Avg Response Time',
    value: '8 min',
    change: '-2 min',
    changeDirection: 'down' as const,
    icon: '⏱️',
  },
];

const chartPlaceholders = [
  { title: 'Revenue by Service Line', color: 'bg-blue-50' },
  { title: 'Quote Pipeline Funnel', color: 'bg-green-50' },
  { title: 'Monthly Trends', color: 'bg-purple-50' },
  { title: 'Lead Sources', color: 'bg-yellow-50' },
];

export default function AnalyticsPage() {
  const [timePeriod, setTimePeriod] = useState<TimePeriod>('month');

  const periods: { label: string; value: TimePeriod }[] = [
    { label: 'This Month', value: 'month' },
    { label: 'Last 30 Days', value: 'last30' },
    { label: 'This Quarter', value: 'quarter' },
    { label: 'This Year', value: 'year' },
  ];

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
          <p className="text-gray-600 mt-1">Business performance and KPIs</p>
        </div>

        {/* Time Period Selector */}
        <div className="flex gap-2 bg-white rounded-lg shadow-sm border border-gray-200 p-1">
          {periods.map((period) => (
            <button
              key={period.value}
              onClick={() => setTimePeriod(period.value)}
              className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
                timePeriod === period.value
                  ? 'bg-brand-primary text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {period.label}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {KPIs.map((kpi, idx) => (
          <div
            key={idx}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <p className="text-gray-600 text-sm font-medium">{kpi.label}</p>
              <span className="text-2xl">{kpi.icon}</span>
            </div>
            <p className="text-3xl font-bold text-gray-900 mb-3">{kpi.value}</p>
            <p
              className={`text-sm font-medium ${
                kpi.changeDirection === 'up'
                  ? 'text-green-600'
                  : 'text-blue-600'
              }`}
            >
              {kpi.changeDirection === 'up' ? '↑' : '↓'} {kpi.change}
            </p>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {chartPlaceholders.map((chart, idx) => (
          <div
            key={idx}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-8"
          >
            <h2 className="text-lg font-bold text-gray-900 mb-6">
              {chart.title}
            </h2>
            <div className={`${chart.color} rounded-lg h-64 flex items-center justify-center`}>
              <div className="text-center">
                <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-600">Chart visualization</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Additional Insights */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Top Services */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Top Services</h3>
          <div className="space-y-4">
            {[
              { name: 'Gravel Supply', revenue: '$85,000', pct: 35 },
              { name: 'Equipment Rental', revenue: '$72,500', pct: 30 },
              { name: 'Bulk Materials', revenue: '$54,400', pct: 22 },
              { name: 'Other', revenue: '$33,400', pct: 13 },
            ].map((service, idx) => (
              <div key={idx}>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-gray-900">
                    {service.name}
                  </span>
                  <span className="text-sm text-gray-600">{service.revenue}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-brand-primary rounded-full h-2"
                    style={{ width: `${service.pct}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quote Performance */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Quote Performance
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <span className="text-gray-700 font-medium">Total Sent</span>
              <span className="text-2xl font-bold text-gray-900">34</span>
            </div>
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <span className="text-gray-700 font-medium">Accepted</span>
              <span className="text-2xl font-bold text-green-600">11</span>
            </div>
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <span className="text-gray-700 font-medium">Pending Review</span>
              <span className="text-2xl font-bold text-yellow-600">8</span>
            </div>
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <span className="text-gray-700 font-medium">Expired/Rejected</span>
              <span className="text-2xl font-bold text-red-600">15</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
