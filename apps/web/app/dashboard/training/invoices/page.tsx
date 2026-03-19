'use client';

import { Receipt } from 'lucide-react';
import TrainingGuide, { Section, Tip, Warning, StatusTable, Step } from '@/components/dashboard/TrainingGuide';

const SECTIONS = [
  { id: 'overview', title: 'Invoice System Overview' },
  { id: 'statuses', title: 'Invoice Statuses' },
  { id: 'creating', title: 'Creating Invoices' },
  { id: 'payments', title: 'Recording Payments' },
  { id: 'aging', title: 'Aging Report' },
  { id: 'overdue', title: 'Overdue Handling' },
];

export default function InvoicesTraining() {
  return (
    <TrainingGuide
      title="Invoices & Payments"
      description="Generating invoices from approved tickets, sending to customers, recording payments, and aging reports."
      icon={Receipt}
      difficulty="intermediate"
      estimatedMinutes={15}
      lastUpdated="2026-03-19"
      sections={SECTIONS}
      prevModule={{ title: 'Tickets', href: '/dashboard/training/tickets' }}
      nextModule={{ title: 'Fleet Management', href: '/dashboard/training/fleet' }}
    >
      <Section id="overview" title="Invoice System Overview">
        <p>
          Invoices at <code className="bg-gray-100 px-1 rounded">/dashboard/invoices</code> manage the billing side of every job.
          The page shows:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>4 summary cards: Total Outstanding, Overdue Amount, Collected This Month, Avg Days to Pay</li>
          <li><strong>Invoice Aging</strong> breakdown (0-30, 31-60, 61-90, 90+ days)</li>
          <li>Status filter tabs with counts</li>
          <li>Expandable invoice list with payment history</li>
        </ul>
        <p>Invoice IDs follow the format <code className="bg-gray-100 px-1 rounded">INV-2026-XXXX</code>.</p>
      </Section>

      <Section id="statuses" title="Invoice Statuses">
        <StatusTable statuses={[
          { name: 'Draft', color: 'bg-gray-100 text-gray-700', description: 'Generated from tickets but not yet sent. Can still be edited.' },
          { name: 'Sent', color: 'bg-blue-100 text-blue-700', description: 'Delivered to customer. Payment expected within terms (Net 15/30).' },
          { name: 'Partially Paid', color: 'bg-yellow-100 text-yellow-800', description: 'Some payment received but balance remains outstanding.' },
          { name: 'Paid', color: 'bg-green-100 text-green-700', description: 'Full payment received. Invoice is settled.' },
          { name: 'Overdue', color: 'bg-red-100 text-red-700', description: 'Past the payment due date with outstanding balance.' },
        ]} />
      </Section>

      <Section id="creating" title="Creating Invoices">
        <Step number={1} title="Generate from Tickets">
          Select approved tickets in the Tickets page and click &ldquo;Generate Invoice.&rdquo; Or click &ldquo;Create Invoice&rdquo; manually.
        </Step>
        <Step number={2} title="Review Line Items">
          Materials, quantities, and rates from the tickets become invoice line items. Verify pricing and add any additional charges (delivery surcharges, equipment rentals, etc.).
        </Step>
        <Step number={3} title="GST Calculation">
          The system automatically adds <strong>5% GST</strong> to the subtotal. Verify the tax amount is correct.
        </Step>
        <Step number={4} title="Set Payment Terms">
          Standard terms: <strong>Net 30</strong> for contractor accounts, <strong>Net 15</strong> for retail customers.
        </Step>
        <Step number={5} title="Send to Customer">
          Click &ldquo;Send Invoice&rdquo; to email the invoice. The status changes to Sent and the due date clock starts.
        </Step>
        <Tip>Always review draft invoices before sending. Check that the customer name, PO reference, and line items are correct. Errors require credit notes.</Tip>
      </Section>

      <Section id="payments" title="Recording Payments">
        <p>When payment arrives, record it through the payment modal:</p>
        <Step number={1} title="Open Payment Form">
          Click &ldquo;Record Payment&rdquo; on the invoice. A dialog appears with fields.
        </Step>
        <Step number={2} title="Enter Payment Details">
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Amount</strong> — The payment amount received</li>
            <li><strong>Method</strong> — E-Transfer, Cheque, Wire, Cash, Credit Card</li>
            <li><strong>Reference</strong> — Cheque number, transfer confirmation, etc.</li>
            <li><strong>Date</strong> — When the payment was received</li>
          </ul>
        </Step>
        <p>If the payment is less than the total, the invoice moves to <strong>Partially Paid</strong>. Full payment moves it to <strong>Paid</strong>.</p>
        <p>Each invoice shows its full <strong>payment history</strong> when expanded — all payments with dates, amounts, and methods.</p>
      </Section>

      <Section id="aging" title="Aging Report">
        <p>The aging section at the top of the Invoices page breaks down outstanding balances by age:</p>
        <div className="border border-gray-200 rounded-lg overflow-hidden my-4">
          <table className="w-full text-sm">
            <thead><tr className="bg-gray-50 border-b border-gray-200">
              <th className="text-left px-4 py-2 text-xs font-semibold text-gray-500">Bucket</th>
              <th className="text-left px-4 py-2 text-xs font-semibold text-gray-500">Urgency</th>
            </tr></thead>
            <tbody>
              {[
                ['Current (0-30 days)', 'Normal — within standard terms'],
                ['31-60 days', 'Attention needed — follow up with customer'],
                ['61-90 days', 'Escalate — may need phone call or account review'],
                ['90+ days', 'Critical — consider collections or payment plan'],
              ].map(([bucket, urgency]) => (
                <tr key={bucket} className="border-b border-gray-100 last:border-0">
                  <td className="px-4 py-2 font-medium text-gray-800">{bucket}</td>
                  <td className="px-4 py-2 text-gray-600">{urgency}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Warning>Review the aging report weekly. Invoices over 60 days should be escalated to management.</Warning>
      </Section>

      <Section id="overdue" title="Overdue Handling">
        <p>When invoices go past due:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>The status automatically changes to <strong>Overdue</strong> (red badge)</li>
          <li>They appear in the dashboard inbox as priority items</li>
          <li>Standard follow-up: email reminder at 7 days overdue, phone call at 14 days, escalation at 30 days</li>
          <li>For contractor accounts, continued orders may be paused until the account is current</li>
        </ul>
      </Section>
    </TrainingGuide>
  );
}
