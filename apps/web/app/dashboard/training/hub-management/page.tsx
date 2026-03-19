'use client';

import { Building2 } from 'lucide-react';
import TrainingGuide, { Section, Tip, Warning, StatusTable, Step } from '@/components/dashboard/TrainingGuide';

const SECTIONS = [
  { id: 'overview', title: 'Hub Management Overview' },
  { id: 'quote-requests', title: 'Handling Quote Requests' },
  { id: 'approvals', title: 'Approving Partners' },
  { id: 'featuring', title: 'Featuring Businesses' },
  { id: 'categories', title: 'Partner Categories' },
];

export default function HubManagementTraining() {
  return (
    <TrainingGuide
      title="Hub Partner Management"
      description="Approving partner businesses, managing the directory, handling quote request routing."
      icon={Building2}
      difficulty="intermediate"
      estimatedMinutes={10}
      lastUpdated="2026-03-19"
      sections={SECTIONS}
      prevModule={{ title: 'Conversations', href: '/dashboard/training/conversations' }}
      nextModule={{ title: 'Voice Agent', href: '/dashboard/training/voice-agent' }}
    >
      <Section id="overview" title="Hub Management Overview">
        <p>
          The Dashboard Hub at <code className="bg-gray-100 px-1 rounded">/dashboard/hub</code> is the admin side of the
          Business Hub. It manages partner approvals, quote request routing, and directory curation.
        </p>
        <p>Summary cards show: New Quote Requests, Active Partners, Featured listings, Pending Review, and Referrals This Month.</p>
        <p>Tabs organize the work: Quote Requests, Pending Approval, Active, Featured, and Rejected.</p>
      </Section>

      <Section id="quote-requests" title="Handling Quote Requests">
        <p>When a customer submits a quote request through the Hub, it appears in the Quote Requests tab:</p>
        <Step number={1} title="Review the Request">
          See the requester&rsquo;s name, which business they&rsquo;re asking about, their message, and contact info.
        </Step>
        <Step number={2} title="Forward to Business">
          Click &ldquo;Forward to Business&rdquo; to send the request to the partner. WCC acts as the intermediary.
        </Step>
        <Step number={3} title="Follow Up">
          Use &ldquo;Follow Up&rdquo; to check whether the partner responded and the customer was served.
        </Step>
        <p>Request statuses: <strong>New</strong> → <strong>Reviewed</strong> → <strong>Forwarded</strong> → <strong>Completed</strong></p>
        <Tip>Following up on forwarded requests builds trust with both customers and partners. It shows we care about the outcome, not just the referral.</Tip>
      </Section>

      <Section id="approvals" title="Approving Partners">
        <p>New business submissions from <code className="bg-gray-100 px-1 rounded">/hub/submit</code> appear in the Pending Approval tab.</p>
        <p>Before approving, verify:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>The business is legitimate and operates in our service area</li>
          <li>The category is accurate</li>
          <li>Contact information is valid</li>
          <li>The description is professional and appropriate</li>
          <li>They don&rsquo;t directly compete with WCC core services</li>
        </ul>
        <p>Actions: <strong>Approve</strong> (moves to Active) or <strong>Reject</strong> (moves to Rejected with option to reconsider).</p>
        <Warning>Rejected businesses can be reconsidered later using the &ldquo;Review Again&rdquo; button on the Rejected tab.</Warning>
      </Section>

      <Section id="featuring" title="Featuring Businesses">
        <p>Active partners can be promoted to <strong>Featured</strong> status, which gives them:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Prominent placement at the top of the Hub directory</li>
          <li>A &ldquo;Featured&rdquo; badge on their listing</li>
          <li>Higher visibility to customers browsing the Hub</li>
        </ul>
        <p>Use this to reward partners who provide excellent service and generate strong referral results.</p>
      </Section>

      <Section id="categories" title="Partner Categories">
        <p>The Hub supports 13+ categories. Currently active partners span:</p>
        <div className="flex flex-wrap gap-1.5 my-3">
          {['Excavation', 'Plumbing & HVAC', 'Electrical', 'Concrete & Paving', 'Landscaping', 'Surveying',
            'Waste Management', 'Building Supplies', 'Safety Training', 'Trucking & Hauling', 'Fencing',
            'Welding & Fabrication', 'Environmental'].map((cat) => (
            <span key={cat} className="px-2.5 py-1 bg-gray-100 rounded-full text-xs font-medium text-gray-700">{cat}</span>
          ))}
        </div>
        <p>These categories are used for filtering on both the public Hub page and the dashboard management view.</p>
      </Section>
    </TrainingGuide>
  );
}
