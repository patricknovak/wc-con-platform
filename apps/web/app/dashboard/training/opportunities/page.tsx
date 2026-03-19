'use client';

import { Target } from 'lucide-react';
import TrainingGuide, { Section, Tip, StatusTable } from '@/components/dashboard/TrainingGuide';

const SECTIONS = [
  { id: 'overview', title: 'Opportunities Overview' },
  { id: 'sources', title: 'RFP Sources' },
  { id: 'scoring', title: 'Match Scoring' },
  { id: 'pipeline', title: 'Pipeline Stages' },
  { id: 'deadlines', title: 'Deadline Management' },
];

export default function OpportunitiesTraining() {
  return (
    <TrainingGuide
      title="Opportunities & RFP Tracking"
      description="Finding, evaluating, and pursuing government and commercial RFPs and contracts."
      icon={Target}
      difficulty="advanced"
      estimatedMinutes={10}
      lastUpdated="2026-03-19"
      sections={SECTIONS}
      prevModule={{ title: 'Fleet Management', href: '/dashboard/training/fleet' }}
      nextModule={{ title: 'Conversations', href: '/dashboard/training/conversations' }}
    >
      <Section id="overview" title="Opportunities Overview">
        <p>
          The Opportunities page at <code className="bg-gray-100 px-1 rounded">/dashboard/opportunities</code> tracks
          RFPs, tenders, and contract opportunities from government and commercial sources.
        </p>
        <p>Opportunities are displayed as cards in a 2-column grid, each showing:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Title and source label</li>
          <li>Days until deadline (red badge if 7 days or less)</li>
          <li>Estimated value</li>
          <li>Match score with visual progress bar</li>
          <li>Capability tags (e.g., Gravel Supply, Equipment Rental, Site Work)</li>
        </ul>
      </Section>

      <Section id="sources" title="RFP Sources">
        <p>The system pulls opportunities from multiple procurement platforms:</p>
        <div className="border border-gray-200 rounded-lg overflow-hidden my-4">
          <table className="w-full text-sm">
            <thead><tr className="bg-gray-50 border-b border-gray-200">
              <th className="text-left px-4 py-2 text-xs font-semibold text-gray-500">Source</th>
              <th className="text-left px-4 py-2 text-xs font-semibold text-gray-500">Description</th>
            </tr></thead>
            <tbody>
              {[
                ['APC', 'Alberta Purchasing Connection — Provincial government procurement'],
                ['MERX', 'Federal and provincial tender platform'],
                ['Municipal', 'Local county and town government contracts'],
              ].map(([src, desc]) => (
                <tr key={src} className="border-b border-gray-100 last:border-0">
                  <td className="px-4 py-2 font-medium text-gray-800">{src}</td>
                  <td className="px-4 py-2 text-gray-600">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section id="scoring" title="Match Scoring">
        <p>Each opportunity gets an AI-generated <strong>match score (0-100%)</strong> based on how well it fits WCC&rsquo;s capabilities:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>90%+</strong> — Excellent match. Core competency, local area, right scale.</li>
          <li><strong>75-89%</strong> — Good match. Most capabilities align. Worth pursuing.</li>
          <li><strong>60-74%</strong> — Partial match. May require partnering or stretch capabilities.</li>
          <li><strong>Below 60%</strong> — Poor match. Likely not worth the bid preparation effort.</li>
        </ul>
        <p>The score considers: required services vs. our offerings, project location vs. our service areas, contract size vs. our capacity, required certifications vs. what we hold.</p>
        <Tip>Focus bid preparation time on opportunities scoring 75%+. These have the best conversion rates with reasonable effort.</Tip>
      </Section>

      <Section id="pipeline" title="Pipeline Stages">
        <StatusTable statuses={[
          { name: 'Strong Matches', color: 'bg-green-100 text-green-700', description: 'New opportunities scoring 80%+. Review and decide quickly.' },
          { name: 'Worth Reviewing', color: 'bg-blue-100 text-blue-700', description: 'Moderate matches (60-79%). Assess if partnering makes sense.' },
          { name: 'Pursuing', color: 'bg-purple-100 text-purple-700', description: 'Actively preparing a bid or proposal.' },
          { name: 'Submitted', color: 'bg-yellow-100 text-yellow-800', description: 'Bid submitted. Awaiting results.' },
          { name: 'Archived', color: 'bg-gray-100 text-gray-700', description: 'Decided not to pursue, deadline passed, or awarded.' },
        ]} />
      </Section>

      <Section id="deadlines" title="Deadline Management">
        <p>Deadlines are critical in procurement — missing a deadline means you&rsquo;re out.</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Opportunities with <strong>7 days or less</strong> show a red urgent flag</li>
          <li>The card prominently displays &ldquo;X days left&rdquo;</li>
          <li>Estimated values range from $45,000 to $180,000+ for current opportunities</li>
        </ul>
        <p>Actions on each opportunity card:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>View Details</strong> — Full RFP description and requirements</li>
          <li><strong>Pursue</strong> — Move to active bid preparation</li>
          <li><strong>Archive</strong> — Remove from active pipeline</li>
        </ul>
      </Section>
    </TrainingGuide>
  );
}
