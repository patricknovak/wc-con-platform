'use client';

import { Megaphone } from 'lucide-react';
import TrainingGuide, { Section, Tip } from '@/components/dashboard/TrainingGuide';

const SECTIONS = [
  { id: 'overview', title: 'Marketing Dashboard Overview' },
  { id: 'analytics', title: 'Google Analytics Tab' },
  { id: 'ads', title: 'Google Ads Tab' },
  { id: 'keywords', title: 'Keyword Tracking' },
  { id: 'kpis', title: 'Key Marketing KPIs' },
];

export default function MarketingTraining() {
  return (
    <TrainingGuide
      title="Marketing & Google Ads"
      description="Monitoring website traffic, Google Ads campaigns, keyword rankings, and conversion tracking."
      icon={Megaphone}
      difficulty="advanced"
      estimatedMinutes={15}
      lastUpdated="2026-03-19"
      sections={SECTIONS}
      prevModule={{ title: 'Intelligence', href: '/dashboard/training/intelligence' }}
      nextModule={{ title: 'Analytics', href: '/dashboard/training/analytics' }}
    >
      <Section id="overview" title="Marketing Dashboard Overview">
        <p>
          The Marketing page at <code className="bg-gray-100 px-1 rounded">/dashboard/marketing</code> consolidates all
          digital marketing data. It has 4 tabs: Overview, Google Analytics, Google Ads, and Keywords.
        </p>
        <p>Top-level metrics: Website Visitors, Ad Clicks, Conversions, and Ad Spend.</p>
      </Section>

      <Section id="analytics" title="Google Analytics Tab">
        <p>Detailed website performance metrics:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Visitors</strong> — ~3,247/month (+18.3% growth)</li>
          <li><strong>Page Views</strong> — ~8,912/month</li>
          <li><strong>Bounce Rate</strong> — 38.2% (percentage who leave after one page)</li>
          <li><strong>Avg Session Duration</strong> — 3:24 minutes</li>
          <li><strong>Conversions</strong> — Quote requests, calculator usage, contact form submissions</li>
          <li><strong>Conversion Rate</strong> — ~1.45%</li>
        </ul>
        <p><strong>Top Pages</strong> table shows highest-traffic pages: Homepage (2,340 views), Services (1,256), Aggregate Sales (987).</p>
        <p><strong>Traffic Sources</strong> breakdown:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Google Search (organic): 44.8%</li>
          <li>Direct traffic: 25.3%</li>
          <li>Google Ads: 12.7%</li>
          <li>Social media and referrals: remaining</li>
        </ul>
      </Section>

      <Section id="ads" title="Google Ads Tab">
        <p>Manages active advertising campaigns:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Budget overview: daily budget, actual spend, remaining</li>
          <li>Campaign table with: name, impressions, clicks, CTR, conversions, ROAS</li>
          <li>Actions: Pause/Resume campaigns, open settings</li>
        </ul>
        <p>Campaigns target keywords like &ldquo;gravel delivery Hinton&rdquo;, &ldquo;trucking company Edson&rdquo;, &ldquo;equipment rental Alberta.&rdquo;</p>
        <p>Current ROAS (Return on Ad Spend) ranges from <strong>6.2x to 9.1x</strong> across campaigns, meaning every $1 in ads generates $6-9 in revenue.</p>
        <Tip>A ROAS above 4x is considered excellent for local service businesses. Our campaigns are performing well. Focus budget on the highest-ROAS campaigns.</Tip>
      </Section>

      <Section id="keywords" title="Keyword Tracking">
        <p>The Keywords tab monitors our Google search rankings for <strong>10 tracked keywords</strong>:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Each keyword shows: impressions, clicks, CTR, cost-per-click, average position, conversions</li>
          <li>Position tracking helps identify which keywords are improving or declining</li>
          <li>Low-position keywords with high intent may need SEO or ad investment</li>
        </ul>
        <p>Target keywords include location-specific terms: &ldquo;gravel Hinton&rdquo;, &ldquo;aggregate Edson&rdquo;, &ldquo;trucking Jasper.&rdquo;</p>
      </Section>

      <Section id="kpis" title="Key Marketing KPIs">
        <p>Focus on these metrics weekly:</p>
        <div className="border border-gray-200 rounded-lg overflow-hidden my-4">
          <table className="w-full text-sm">
            <thead><tr className="bg-gray-50 border-b border-gray-200">
              <th className="text-left px-4 py-2 text-xs font-semibold text-gray-500">Metric</th>
              <th className="text-left px-4 py-2 text-xs font-semibold text-gray-500">Target</th>
              <th className="text-left px-4 py-2 text-xs font-semibold text-gray-500">Why It Matters</th>
            </tr></thead>
            <tbody>
              {[
                ['Conversion Rate', '> 1.5%', 'Measures how well the website turns visitors into leads'],
                ['Cost Per Lead', '< $25', 'Keeps acquisition costs profitable for our margins'],
                ['ROAS', '> 4x', 'Ensures ads are profitable, not just generating clicks'],
                ['Organic Traffic %', '> 40%', 'Reduces dependency on paid ads for long-term sustainability'],
                ['Bounce Rate', '< 40%', 'Indicates visitors find our content relevant to their search'],
              ].map(([metric, target, why]) => (
                <tr key={metric} className="border-b border-gray-100 last:border-0">
                  <td className="px-4 py-2 font-medium text-gray-800">{metric}</td>
                  <td className="px-4 py-2 text-blue-600 font-mono text-xs">{target}</td>
                  <td className="px-4 py-2 text-gray-500">{why}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>
    </TrainingGuide>
  );
}
