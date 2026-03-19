'use client';

import { BarChart3 } from 'lucide-react';
import TrainingGuide, { Section, Tip } from '@/components/dashboard/TrainingGuide';

const SECTIONS = [
  { id: 'overview', title: 'Analytics Overview' },
  { id: 'kpis', title: 'Key Performance Indicators' },
  { id: 'services', title: 'Service Line Breakdown' },
  { id: 'quotes', title: 'Quote Performance' },
  { id: 'time-periods', title: 'Time Period Filters' },
];

export default function AnalyticsTraining() {
  return (
    <TrainingGuide
      title="Analytics & KPIs"
      description="Business performance metrics, revenue tracking, win rates, and service line breakdowns."
      icon={BarChart3}
      difficulty="intermediate"
      estimatedMinutes={8}
      lastUpdated="2026-03-19"
      sections={SECTIONS}
      prevModule={{ title: 'Marketing', href: '/dashboard/training/marketing' }}
      nextModule={{ title: 'Integrations', href: '/dashboard/training/integrations' }}
    >
      <Section id="overview" title="Analytics Overview">
        <p>
          The Analytics page at <code className="bg-gray-100 px-1 rounded">/dashboard/analytics</code> provides a
          high-level view of business performance. This is the page to check when you want to know &ldquo;how are we doing?&rdquo;
        </p>
        <p>It includes KPI cards, chart visualizations, service line breakdowns, and quote pipeline metrics.</p>
      </Section>

      <Section id="kpis" title="Key Performance Indicators">
        <p>Four headline KPI cards:</p>
        <div className="border border-gray-200 rounded-lg overflow-hidden my-4">
          <table className="w-full text-sm">
            <thead><tr className="bg-gray-50 border-b border-gray-200">
              <th className="text-left px-4 py-2 text-xs font-semibold text-gray-500">KPI</th>
              <th className="text-left px-4 py-2 text-xs font-semibold text-gray-500">Current</th>
              <th className="text-left px-4 py-2 text-xs font-semibold text-gray-500">Trend</th>
            </tr></thead>
            <tbody>
              {[
                ['Monthly Revenue', '$245,300', '+12% vs last month'],
                ['Quotes Sent', '34', '+8% vs last month'],
                ['Win Rate', '32%', '+3 points improvement'],
                ['Avg Response Time', '8 minutes', '-2 min improvement'],
              ].map(([kpi, current, trend]) => (
                <tr key={kpi} className="border-b border-gray-100 last:border-0">
                  <td className="px-4 py-2 font-medium text-gray-800">{kpi}</td>
                  <td className="px-4 py-2 text-gray-900 font-semibold">{current}</td>
                  <td className="px-4 py-2 text-green-600 text-xs">{trend}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section id="services" title="Service Line Breakdown">
        <p>Revenue breakdown by service category:</p>
        <div className="border border-gray-200 rounded-lg overflow-hidden my-4">
          <table className="w-full text-sm">
            <thead><tr className="bg-gray-50 border-b border-gray-200">
              <th className="text-left px-4 py-2 text-xs font-semibold text-gray-500">Service</th>
              <th className="text-left px-4 py-2 text-xs font-semibold text-gray-500">Revenue</th>
              <th className="text-left px-4 py-2 text-xs font-semibold text-gray-500">Share</th>
            </tr></thead>
            <tbody>
              {[
                ['Gravel Supply', '$85,000', '35%'],
                ['Equipment Rental', '$62,000', '25%'],
                ['Bulk Materials', '$49,000', '20%'],
                ['Other Services', '$49,300', '20%'],
              ].map(([svc, rev, share]) => (
                <tr key={svc} className="border-b border-gray-100 last:border-0">
                  <td className="px-4 py-2 font-medium text-gray-800">{svc}</td>
                  <td className="px-4 py-2 text-gray-900">{rev}</td>
                  <td className="px-4 py-2 text-gray-600">{share}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>Gravel Supply remains the largest revenue driver at 35% of total revenue.</p>
        <Tip>Use service line data to focus sales efforts. If equipment rental is growing, lean into it with more marketing budget and fleet investment.</Tip>
      </Section>

      <Section id="quotes" title="Quote Performance">
        <p>Quote pipeline health metrics:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Total Sent</strong>: 34 this month</li>
          <li><strong>Accepted</strong>: 11 (32% win rate)</li>
          <li><strong>Pending Review</strong>: 8 (still in customer hands)</li>
          <li><strong>Expired/Rejected</strong>: 15 (opportunity to improve)</li>
        </ul>
        <p>A 32% win rate is solid for the aggregate industry. Focus on reducing the expired count by following up before deadlines.</p>
      </Section>

      <Section id="time-periods" title="Time Period Filters">
        <p>Use the time period selector to view different ranges:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>This Month</strong> — Current month-to-date</li>
          <li><strong>Last 30 Days</strong> — Rolling 30-day window</li>
          <li><strong>This Quarter</strong> — Current fiscal quarter</li>
          <li><strong>This Year</strong> — Year-to-date cumulative</li>
        </ul>
        <p>Charts and KPIs update dynamically when you change the time period.</p>
      </Section>
    </TrainingGuide>
  );
}
