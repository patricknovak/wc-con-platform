'use client';

import { Ticket } from 'lucide-react';
import TrainingGuide, { Section, Tip, Warning, StatusTable, Step } from '@/components/dashboard/TrainingGuide';

const SECTIONS = [
  { id: 'overview', title: 'Tickets Overview' },
  { id: 'statuses', title: 'Ticket Statuses' },
  { id: 'submission', title: 'How Drivers Submit Tickets' },
  { id: 'sms', title: 'SMS-Based Tickets' },
  { id: 'review', title: 'Reviewing & Approving' },
  { id: 'disputes', title: 'Handling Disputes' },
  { id: 'invoicing', title: 'Generating Invoices' },
];

export default function TicketsTraining() {
  return (
    <TrainingGuide
      title="Tickets — Daily Driver Records"
      description="How drivers submit daily work records, how dispatchers review them, and the SMS ticket flow."
      icon={Ticket}
      difficulty="intermediate"
      estimatedMinutes={15}
      lastUpdated="2026-03-19"
      sections={SECTIONS}
      prevModule={{ title: 'Work Orders', href: '/dashboard/training/work-orders' }}
      nextModule={{ title: 'Invoices', href: '/dashboard/training/invoices' }}
    >
      <Section id="overview" title="Tickets Overview">
        <p>
          Tickets at <code className="bg-gray-100 px-1 rounded">/dashboard/tickets</code> are <strong>daily work records</strong> submitted
          by drivers after completing jobs. They capture what was actually delivered vs. what was planned on the work order.
        </p>
        <p>The page shows:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>4 summary cards: Submitted Today, Pending Review, Approved, Via SMS</li>
          <li>Status filter buttons with counts</li>
          <li>Expandable ticket list with checkbox selection for bulk actions</li>
        </ul>
        <p>Ticket IDs follow the format <code className="bg-gray-100 px-1 rounded">TK-2026-XXXX</code>.</p>
      </Section>

      <Section id="statuses" title="Ticket Statuses">
        <StatusTable statuses={[
          { name: 'Submitted', color: 'bg-blue-100 text-blue-700', description: 'Driver has submitted the ticket. Awaiting dispatcher review.' },
          { name: 'Under Review', color: 'bg-yellow-100 text-yellow-800', description: 'Dispatcher is actively reviewing materials, hours, and mileage.' },
          { name: 'Approved', color: 'bg-green-100 text-green-700', description: 'Verified accurate. Ready to generate an invoice from this ticket.' },
          { name: 'Disputed', color: 'bg-red-100 text-red-700', description: 'Discrepancy found. Needs clarification from driver before approval.' },
        ]} />
      </Section>

      <Section id="submission" title="How Drivers Submit Tickets">
        <p>Each ticket captures:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Work order reference</strong> — Which job this ticket is for</li>
          <li><strong>Job site</strong> — Where the work was performed</li>
          <li><strong>Time range</strong> — Start and end times (e.g., 06:30 - 14:15)</li>
          <li><strong>Hours worked</strong> — Calculated from time range</li>
          <li><strong>Distance</strong> — Kilometers driven (from odometer readings)</li>
          <li><strong>Equipment used</strong> — Truck/trailer unit number</li>
          <li><strong>Materials delivered</strong> — Each material with quantity in tonnes</li>
          <li><strong>Driver notes</strong> — Any site conditions, delays, or issues</li>
        </ul>
      </Section>

      <Section id="sms" title="SMS-Based Tickets">
        <p>
          Drivers can submit tickets by <strong>text message</strong> when they don&rsquo;t have computer access.
          The system parses SMS messages into structured ticket data.
        </p>
        <p>SMS tickets are flagged with a <span className="px-2 py-0.5 bg-purple-100 text-purple-700 rounded text-xs font-medium">SMS</span> badge in the ticket list.</p>
        <p>When you expand an SMS ticket, you&rsquo;ll see the <strong>raw SMS transcript</strong> alongside the parsed data, so you can verify the system extracted the information correctly.</p>
        <p>Example SMS format:</p>
        <div className="bg-gray-50 rounded-lg p-4 font-mono text-xs my-3">
          <p>WO-2026-0043 Hinton pit to hwy16 km42</p>
          <p>630-1415 3 loads road crush 45T</p>
          <p>odo 89100-89245</p>
        </div>
        <Warning>Always double-check SMS-parsed tickets. The parser handles common formats but may misinterpret unusual messages. Compare the raw text with the parsed fields.</Warning>
      </Section>

      <Section id="review" title="Reviewing & Approving">
        <Step number={1} title="Open the Ticket">
          Click to expand and see full details including materials table, driver notes, and equipment info.
        </Step>
        <Step number={2} title="Verify Against Work Order">
          Compare materials delivered, hours worked, and mileage against the original work order expectations.
        </Step>
        <Step number={3} title="Start Review">
          Click &ldquo;Start Review&rdquo; to move from Submitted to Under Review. This signals to other dispatchers that you&rsquo;re handling it.
        </Step>
        <Step number={4} title="Approve or Dispute">
          If everything checks out, click &ldquo;Approve.&rdquo; If there are questions, click &ldquo;Dispute&rdquo; to flag for driver clarification.
        </Step>
        <Tip>Use the checkbox selection to select multiple approved tickets and generate invoices in bulk using the &ldquo;Generate Invoice&rdquo; button.</Tip>
      </Section>

      <Section id="disputes" title="Handling Disputes">
        <p>If ticket data doesn&rsquo;t match the work order (wrong quantities, missing materials, time discrepancies):</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Mark the ticket as <strong>Disputed</strong></li>
          <li>Use the <strong>&ldquo;Message Driver&rdquo;</strong> button to contact them about the discrepancy</li>
          <li>The driver can respond with corrections or clarification</li>
          <li>Once resolved, move back to Under Review and then Approve</li>
        </ul>
        <p>Common dispute reasons: odometer readings don&rsquo;t match routes, material quantities differ from load counts, time ranges overlap with other tickets.</p>
      </Section>

      <Section id="invoicing" title="Generating Invoices">
        <p>Approved tickets are the basis for customer invoices:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Select one or more approved tickets using the checkboxes</li>
          <li>Click <strong>&ldquo;Generate Invoice&rdquo;</strong></li>
          <li>The system creates a draft invoice with line items from the ticket materials</li>
          <li>Review the draft invoice in the Invoices section before sending</li>
        </ul>
        <p>See the <strong>Invoices & Payments</strong> training module for the full invoicing workflow.</p>
      </Section>
    </TrainingGuide>
  );
}
