'use client';

import { ClipboardList } from 'lucide-react';
import TrainingGuide, { Section, Tip, Warning, StatusTable, Step } from '@/components/dashboard/TrainingGuide';

const SECTIONS = [
  { id: 'overview', title: 'Work Orders Overview' },
  { id: 'statuses', title: 'Status & Priority Codes' },
  { id: 'creating', title: 'Creating a Work Order' },
  { id: 'dispatching', title: 'Dispatching to Drivers' },
  { id: 'details', title: 'Work Order Details' },
  { id: 'completing', title: 'Completing & Closing' },
];

export default function WorkOrdersTraining() {
  return (
    <TrainingGuide
      title="Work Orders & Dispatch"
      description="Scheduling, assigning, dispatching, and completing work orders in the field."
      icon={ClipboardList}
      difficulty="intermediate"
      estimatedMinutes={18}
      lastUpdated="2026-03-19"
      sections={SECTIONS}
      prevModule={{ title: 'Quote Pipeline', href: '/dashboard/training/quotes-management' }}
      nextModule={{ title: 'Tickets', href: '/dashboard/training/tickets' }}
    >
      <Section id="overview" title="Work Orders Overview">
        <p>
          Work Orders at <code className="bg-gray-100 px-1 rounded">/dashboard/work-orders</code> are the operational heart
          of WCC. Every delivery, haul, or service call starts with a work order.
        </p>
        <p>The page shows:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>4 summary stat cards (Active Today, Pending Dispatch, Completed This Week, On Schedule Rate)</li>
          <li>Status filter buttons with counts</li>
          <li>Expandable work order list with full details on click</li>
        </ul>
        <p>Work order IDs follow the format <code className="bg-gray-100 px-1 rounded">WO-2026-XXXX</code>.</p>
      </Section>

      <Section id="statuses" title="Status & Priority Codes">
        <p><strong>Work Order Statuses:</strong></p>
        <StatusTable statuses={[
          { name: 'Pending', color: 'bg-yellow-100 text-yellow-800', description: 'Created but not yet assigned to a driver or scheduled.' },
          { name: 'Scheduled', color: 'bg-blue-100 text-blue-700', description: 'Date and time set, driver assigned. Waiting for dispatch.' },
          { name: 'Dispatched', color: 'bg-indigo-100 text-indigo-700', description: 'Driver has been notified and is en route or loading.' },
          { name: 'In Progress', color: 'bg-purple-100 text-purple-700', description: 'Work is actively being performed on site.' },
          { name: 'Completed', color: 'bg-green-100 text-green-700', description: 'Job finished. Ready for ticket review and invoicing.' },
          { name: 'Cancelled', color: 'bg-gray-100 text-gray-700', description: 'Job cancelled by customer or dispatcher.' },
        ]} />
        <p className="mt-4"><strong>Priority Levels:</strong></p>
        <StatusTable statuses={[
          { name: 'Standard', color: 'bg-gray-100 text-gray-700', description: 'Normal scheduling. Delivered within quoted timeframe.' },
          { name: 'Rush', color: 'bg-orange-100 text-orange-700', description: 'Same-day or next-day delivery requested. Premium rate applies.' },
          { name: 'Emergency', color: 'bg-red-100 text-red-700', description: 'Immediate dispatch needed. Safety or critical infrastructure.' },
        ]} />
      </Section>

      <Section id="creating" title="Creating a Work Order">
        <Step number={1} title="Click 'Create Work Order'">
          Blue button in the top-right. If converting from a quote, details pre-fill automatically.
        </Step>
        <Step number={2} title="Enter Job Details">
          Customer name, PO reference, delivery address, scheduled date/time, priority level.
        </Step>
        <Step number={3} title="Add Materials">
          List each material with description, quantity, and unit (tonnes, loads, hours, etc.).
        </Step>
        <Step number={4} title="Assign Driver & Equipment">
          Select from available drivers and equipment in the Fleet system. Check availability first.
        </Step>
        <Step number={5} title="Add Special Instructions">
          Site access notes, contact person on site, safety requirements, gate codes, etc.
        </Step>
      </Section>

      <Section id="dispatching" title="Dispatching to Drivers">
        <p>Once a work order is Scheduled, it can be dispatched:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Click the <strong>&ldquo;Dispatch&rdquo;</strong> button on a scheduled work order</li>
          <li>The driver receives notification with job details</li>
          <li>Status changes to <strong>Dispatched</strong></li>
          <li>The driver&rsquo;s fleet status updates to <strong>Active</strong></li>
        </ul>
        <Tip>Check the Fleet page to see which drivers are Available before dispatching. The driver card shows their current assignment if they&rsquo;re already on a job.</Tip>
        <Warning>Always confirm driver availability by phone for rush/emergency orders. The system shows planned assignments but doesn&rsquo;t account for real-time delays.</Warning>
      </Section>

      <Section id="details" title="Work Order Details">
        <p>Click any work order row to expand its full details:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Header</strong> — WO number, PO reference, status and priority badges</li>
          <li><strong>Customer</strong> — Name, company, phone</li>
          <li><strong>Schedule</strong> — Date, time window, delivery address with map link</li>
          <li><strong>Driver</strong> — Assigned driver name, phone (clickable), equipment unit</li>
          <li><strong>Materials</strong> — List with descriptions, quantities, and units</li>
          <li><strong>Special Instructions</strong> — Any notes for the driver</li>
          <li><strong>Action Buttons</strong> — Status-specific actions (Dispatch, Mark In Progress, Complete, etc.)</li>
        </ul>
      </Section>

      <Section id="completing" title="Completing & Closing">
        <p>When a job is finished:</p>
        <Step number={1} title="Mark as Completed">
          Click &ldquo;Complete&rdquo; on the work order. This locks the job details.
        </Step>
        <Step number={2} title="Driver Submits Ticket">
          The driver submits a daily ticket with actual hours, materials delivered, and mileage. (See Tickets training.)
        </Step>
        <Step number={3} title="Review & Approve Ticket">
          Dispatcher reviews the ticket against the work order. Approved tickets can be converted to invoices.
        </Step>
        <p>The full lifecycle: <strong>Quote → Work Order → Ticket → Invoice → Payment</strong></p>
      </Section>
    </TrainingGuide>
  );
}
