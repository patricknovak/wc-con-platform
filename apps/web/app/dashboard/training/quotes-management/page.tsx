'use client';

import { FileText } from 'lucide-react';
import TrainingGuide, { Section, Tip, Warning, StatusTable, Step } from '@/components/dashboard/TrainingGuide';

const SECTIONS = [
  { id: 'overview', title: 'Quote Pipeline Overview' },
  { id: 'statuses', title: 'Quote Statuses' },
  { id: 'creating', title: 'Creating a Quote' },
  { id: 'sending', title: 'Sending & Following Up' },
  { id: 'converting', title: 'Converting to Work Order' },
  { id: 'filters', title: 'Filtering & Search' },
];

export default function QuotesManagementTraining() {
  return (
    <TrainingGuide
      title="Quote Pipeline Management"
      description="Creating, reviewing, sending, and tracking quotes through their full lifecycle."
      icon={FileText}
      difficulty="intermediate"
      estimatedMinutes={15}
      lastUpdated="2026-03-19"
      sections={SECTIONS}
      prevModule={{ title: 'Dashboard Overview', href: '/dashboard/training/dashboard-overview' }}
      nextModule={{ title: 'Work Orders', href: '/dashboard/training/work-orders' }}
    >
      <Section id="overview" title="Quote Pipeline Overview">
        <p>
          The Quote Pipeline at <code className="bg-gray-100 px-1 rounded">/dashboard/quotes</code> manages every quote
          from initial request through acceptance or expiry. It&rsquo;s the starting point of our revenue cycle.
        </p>
        <p>The page shows:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Status filter tabs across the top</li>
          <li>Quote list with number, customer, amount, status, date, and actions</li>
          <li>Summary stats at the bottom (Drafts, Awaiting Response, Accepted, Expired)</li>
        </ul>
      </Section>

      <Section id="statuses" title="Quote Statuses">
        <StatusTable statuses={[
          { name: 'Draft', color: 'bg-gray-100 text-gray-700', description: 'Quote created but not yet finalized. Can still be edited.' },
          { name: 'Pending Review', color: 'bg-yellow-100 text-yellow-800', description: 'Finalized internally, waiting for manager approval before sending.' },
          { name: 'Sent', color: 'bg-blue-100 text-blue-700', description: 'Delivered to the customer. Awaiting their response.' },
          { name: 'Accepted', color: 'bg-green-100 text-green-700', description: 'Customer accepted. Ready to convert to a work order.' },
          { name: 'Expired', color: 'bg-red-100 text-red-700', description: 'Quote validity period has passed without a response.' },
        ]} />
        <Tip>Quotes typically have a 30-day validity. Follow up with customers before expiry to improve win rates.</Tip>
      </Section>

      <Section id="creating" title="Creating a Quote">
        <Step number={1} title="Click 'Create Quote'">
          Blue button in the top-right corner of the Quotes page.
        </Step>
        <Step number={2} title="Fill in Customer Details">
          Customer name, company, contact info, delivery address.
        </Step>
        <Step number={3} title="Add Line Items">
          Materials, quantities, unit prices, and any delivery surcharges. The system calculates subtotals.
        </Step>
        <Step number={4} title="Review & Save as Draft">
          The quote saves as Draft, allowing further edits before finalizing.
        </Step>
        <p>Quote numbers follow the format <code className="bg-gray-100 px-1 rounded">QT-2026-XXXX</code> and are auto-generated.</p>
      </Section>

      <Section id="sending" title="Sending & Following Up">
        <p>When a quote is ready:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Click the <strong>check icon</strong> to finalize a draft (moves to Pending Review)</li>
          <li>After approval, click the <strong>send icon</strong> to deliver to the customer (moves to Sent)</li>
          <li>The customer receives the quote via email</li>
        </ul>
        <p>Track response times and follow up on quotes approaching expiry. Expired quotes can be re-sent with updated pricing.</p>
      </Section>

      <Section id="converting" title="Converting to Work Order">
        <p>When a customer accepts a quote:</p>
        <Step number={1} title="Mark as Accepted">
          Update the quote status to Accepted in the pipeline.
        </Step>
        <Step number={2} title="Create Work Order">
          Use the quote details to create a new work order with materials, delivery address, and scheduling.
        </Step>
        <p>This links the quote to the work order for full lifecycle tracking. Customers can track progress using their <code className="bg-gray-100 px-1 rounded">QT-</code> reference number.</p>
        <Warning>Always confirm pricing with the current material rates before converting old quotes. Prices may have changed since the quote was issued.</Warning>
      </Section>

      <Section id="filters" title="Filtering & Search">
        <p>Use the filter tabs to quickly find quotes:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>All</strong> — Shows everything</li>
          <li><strong>Draft</strong> — Quotes still being prepared</li>
          <li><strong>Pending Review</strong> — Need manager sign-off</li>
          <li><strong>Sent</strong> — Awaiting customer response</li>
          <li><strong>Accepted</strong> — Ready for work order creation</li>
          <li><strong>Expired</strong> — Past validity date</li>
        </ul>
        <p>Each filter shows the count of quotes in that status, making it easy to see what needs attention.</p>
      </Section>
    </TrainingGuide>
  );
}
