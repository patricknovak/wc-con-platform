'use client';

import { Puzzle } from 'lucide-react';
import TrainingGuide, { Section, Tip, Warning, StatusTable } from '@/components/dashboard/TrainingGuide';

const SECTIONS = [
  { id: 'overview', title: 'Integrations Overview' },
  { id: 'connected', title: 'Connected Services' },
  { id: 'statuses', title: 'Integration Statuses' },
  { id: 'troubleshooting', title: 'Troubleshooting' },
];

export default function IntegrationsTraining() {
  return (
    <TrainingGuide
      title="Integrations & Connected Tools"
      description="Managing third-party integrations — Twilio, QuickBooks, ElevenLabs, and more."
      icon={Puzzle}
      difficulty="advanced"
      estimatedMinutes={10}
      lastUpdated="2026-03-19"
      sections={SECTIONS}
      prevModule={{ title: 'Analytics', href: '/dashboard/training/analytics' }}
      nextModule={{ title: 'Safety & Compliance', href: '/dashboard/training/safety' }}
    >
      <Section id="overview" title="Integrations Overview">
        <p>
          The Integrations page at <code className="bg-gray-100 px-1 rounded">/dashboard/integrations</code> manages
          all third-party service connections. Each integration shows its status, features, and configuration options.
        </p>
        <p>Filter by category: All, Communication, Accounting, Analytics, AI & Voice, Operations.</p>
      </Section>

      <Section id="connected" title="Connected Services">
        <p>The platform integrates with these services:</p>
        <div className="border border-gray-200 rounded-lg overflow-hidden my-4">
          <table className="w-full text-sm">
            <thead><tr className="bg-gray-50 border-b border-gray-200">
              <th className="text-left px-4 py-2 text-xs font-semibold text-gray-500">Service</th>
              <th className="text-left px-4 py-2 text-xs font-semibold text-gray-500">Category</th>
              <th className="text-left px-4 py-2 text-xs font-semibold text-gray-500">What It Does</th>
            </tr></thead>
            <tbody>
              {[
                ['Twilio', 'Communication', 'SMS messaging for driver tickets and customer notifications'],
                ['QuickBooks', 'Accounting', 'Invoice syncing, payment tracking, financial reporting'],
                ['Google Analytics', 'Analytics', 'Website traffic, conversions, and user behavior tracking'],
                ['Google Ads', 'Analytics', 'Ad campaign management, keyword bidding, conversion tracking'],
                ['ElevenLabs', 'AI & Voice', 'AI phone agent for automated call handling and lead capture'],
                ['Formspree', 'Communication', 'Form submission handling for quotes, contact, hub requests'],
                ['Claude AI', 'AI & Voice', 'Document analysis, resume screening, pricing intelligence'],
                ['GitHub', 'Operations', 'Code deployment, CI/CD pipeline, website hosting'],
              ].map(([name, cat, desc]) => (
                <tr key={name} className="border-b border-gray-100 last:border-0">
                  <td className="px-4 py-2 font-medium text-gray-800">{name}</td>
                  <td className="px-4 py-2"><span className="px-2 py-0.5 bg-gray-100 rounded text-xs text-gray-600">{cat}</span></td>
                  <td className="px-4 py-2 text-gray-600 text-xs">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section id="statuses" title="Integration Statuses">
        <StatusTable statuses={[
          { name: 'Connected', color: 'bg-green-100 text-green-700', description: 'Active and functioning normally. Data flowing in both directions.' },
          { name: 'Available', color: 'bg-blue-100 text-blue-700', description: 'Can be connected but not yet configured. Click to set up.' },
          { name: 'Error', color: 'bg-red-100 text-red-700', description: 'Connection issue. Check API keys, permissions, or service status.' },
          { name: 'Paused', color: 'bg-yellow-100 text-yellow-800', description: 'Temporarily disabled. Data sync is stopped until resumed.' },
        ]} />
        <p>Each integration card shows its feature list, current status, and action buttons (Configure, Disconnect, View Logs).</p>
      </Section>

      <Section id="troubleshooting" title="Troubleshooting">
        <p>If an integration shows an Error status:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Check API keys</strong> — Keys may have expired or been rotated</li>
          <li><strong>Verify permissions</strong> — The connected account needs proper access levels</li>
          <li><strong>Check service status</strong> — The third-party service may be experiencing an outage</li>
          <li><strong>Review logs</strong> — Click &ldquo;View Logs&rdquo; to see error messages and timestamps</li>
          <li><strong>Reconnect</strong> — Disconnect and reconnect the integration to reset the auth flow</li>
        </ul>
        <Warning>Disconnecting an integration stops data sync immediately. Make sure no critical operations depend on it before disconnecting. Reconnecting may require re-entering API credentials.</Warning>
      </Section>
    </TrainingGuide>
  );
}
