'use client';

import { Truck } from 'lucide-react';
import TrainingGuide, { Section, Tip, Warning, StatusTable, Step } from '@/components/dashboard/TrainingGuide';

const SECTIONS = [
  { id: 'overview', title: 'Fleet System Overview' },
  { id: 'drivers', title: 'Driver Profiles' },
  { id: 'driver-statuses', title: 'Driver Status Codes' },
  { id: 'equipment', title: 'Equipment Registry' },
  { id: 'equipment-statuses', title: 'Equipment Status Codes' },
  { id: 'assignments', title: 'Assignment Flow' },
  { id: 'compliance', title: 'License & Safety Tracking' },
];

export default function FleetTraining() {
  return (
    <TrainingGuide
      title="Fleet & Driver Management"
      description="Managing trucks, trailers, heavy equipment, driver assignments, and maintenance schedules."
      icon={Truck}
      difficulty="intermediate"
      estimatedMinutes={12}
      lastUpdated="2026-03-19"
      sections={SECTIONS}
      prevModule={{ title: 'Invoices', href: '/dashboard/training/invoices' }}
      nextModule={{ title: 'Opportunities', href: '/dashboard/training/opportunities' }}
    >
      <Section id="overview" title="Fleet System Overview">
        <p>
          The Fleet page at <code className="bg-gray-100 px-1 rounded">/dashboard/fleet</code> manages all WCC drivers and
          equipment in one place. It has two tabs: <strong>Drivers</strong> and <strong>Equipment</strong>.
        </p>
        <p>Summary cards show: total drivers, available count, active (on job), and off-duty or maintenance counts.</p>
      </Section>

      <Section id="drivers" title="Driver Profiles">
        <p>Each driver card displays:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Name and status badge</strong></li>
          <li><strong>License class</strong> — Class 1 (full semi), Class 3 (single axle/tandem)</li>
          <li><strong>License expiry date</strong></li>
          <li><strong>Home base</strong> — Hinton or Edson</li>
          <li><strong>Current assignment</strong> — Which work order they&rsquo;re on (if active)</li>
          <li><strong>Hourly rate and km rate</strong> — For costing</li>
          <li><strong>Phone number</strong> — Clickable to call</li>
          <li><strong>Today&rsquo;s stats</strong> — Hours, loads, km driven</li>
        </ul>
        <p>Current drivers:</p>
        <div className="border border-gray-200 rounded-lg overflow-hidden my-4">
          <table className="w-full text-sm">
            <thead><tr className="bg-gray-50 border-b border-gray-200">
              <th className="text-left px-4 py-2 text-xs font-semibold text-gray-500">Driver</th>
              <th className="text-left px-4 py-2 text-xs font-semibold text-gray-500">License</th>
              <th className="text-left px-4 py-2 text-xs font-semibold text-gray-500">Base</th>
              <th className="text-left px-4 py-2 text-xs font-semibold text-gray-500">Notes</th>
            </tr></thead>
            <tbody>
              {[
                ['Mike Lewicki', 'Class 1', 'Hinton', 'Senior driver. Highway loads, oversized permits.'],
                ['Travis Fehr', 'Class 1', 'Hinton', 'Belly dump specialist.'],
                ['Kyle Brinson', 'Class 1', 'Edson', 'Good for Jasper/Parks Canada runs.'],
                ['Dan Whitford', 'Class 1', 'Hinton', 'Experienced all-rounder.'],
                ['Ryan Savard', 'Class 3', 'Hinton', 'Single axle and tandem trucks only.'],
                ['Chris Fenton', 'Class 1', 'Hinton', 'Heavy equipment operator. Cat & excavator certified.'],
              ].map(([name, lic, base, notes]) => (
                <tr key={name} className="border-b border-gray-100 last:border-0">
                  <td className="px-4 py-2 font-medium text-gray-800">{name}</td>
                  <td className="px-4 py-2 text-gray-600">{lic}</td>
                  <td className="px-4 py-2 text-gray-600">{base}</td>
                  <td className="px-4 py-2 text-gray-500 text-xs">{notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section id="driver-statuses" title="Driver Status Codes">
        <StatusTable statuses={[
          { name: 'Active', color: 'bg-green-100 text-green-700', description: 'Currently on a job. Assigned to a specific work order.' },
          { name: 'Available', color: 'bg-blue-100 text-blue-700', description: 'Ready to be dispatched. No current assignment.' },
          { name: 'Off Duty', color: 'bg-gray-100 text-gray-700', description: 'On scheduled days off. Not available for dispatch.' },
          { name: 'On Leave', color: 'bg-yellow-100 text-yellow-800', description: 'Extended leave (vacation, medical, personal).' },
          { name: 'Terminated', color: 'bg-red-100 text-red-700', description: 'No longer employed. Record retained for history.' },
        ]} />
      </Section>

      <Section id="equipment" title="Equipment Registry">
        <p>The Equipment tab lists all WCC vehicles, trailers, and heavy equipment:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Trucks</strong> — Kenworth T800s, W900, Peterbilt 389 (highway tractors)</li>
          <li><strong>Trailers</strong> — End dumps (tri-axle 28T, tandem 22T), belly dump (25T)</li>
          <li><strong>Heavy Equipment</strong> — Cat 320 Excavator, Cat 140M Grader, Cat 950 Wheel Loader</li>
        </ul>
        <p>Each equipment card shows: name, unit number, type/category, make/model/year, status, current km, assigned driver, rates (hourly and daily), next service due, and insurance/safety expiry dates.</p>
      </Section>

      <Section id="equipment-statuses" title="Equipment Status Codes">
        <StatusTable statuses={[
          { name: 'In Use', color: 'bg-green-100 text-green-700', description: 'Assigned to a driver and actively being operated.' },
          { name: 'Available', color: 'bg-blue-100 text-blue-700', description: 'Ready for assignment. No current operator.' },
          { name: 'Maintenance', color: 'bg-yellow-100 text-yellow-800', description: 'In the shop for scheduled service or repairs.' },
          { name: 'Out of Service', color: 'bg-red-100 text-red-700', description: 'Broken down or awaiting parts. Not operational.' },
          { name: 'Retired', color: 'bg-gray-100 text-gray-700', description: 'Decommissioned. No longer in the fleet.' },
        ]} />
      </Section>

      <Section id="assignments" title="Assignment Flow">
        <Step number={1} title="Check Availability">
          Look at the Fleet page to see which drivers are Available and which equipment is ready.
        </Step>
        <Step number={2} title="Assign to Work Order">
          In the Work Orders page, assign a driver and equipment unit to the job.
        </Step>
        <Step number={3} title="Dispatch">
          Dispatching the work order automatically updates the driver&rsquo;s status to Active and equipment to In Use.
        </Step>
        <Step number={4} title="Completion">
          When the work order is completed, statuses revert to Available.
        </Step>
        <Warning>Ryan Savard holds a <strong>Class 3 only</strong> — he cannot operate the Kenworth or Peterbilt semis. Only assign him to single axle or tandem trucks.</Warning>
      </Section>

      <Section id="compliance" title="License & Safety Tracking">
        <p>The fleet system tracks critical compliance dates:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Driver license expiry</strong> — Must be renewed before expiry or driver cannot operate</li>
          <li><strong>Equipment insurance expiry</strong> — All units insured through Dec 31 of each year</li>
          <li><strong>Safety inspection expiry</strong> — Required for highway operation (trucks and trailers)</li>
          <li><strong>Service intervals</strong> — Next service due based on odometer (e.g., every 10,000 km)</li>
        </ul>
        <Tip>Check license and safety expiry dates monthly. Upcoming expirations should trigger renewal action at least 30 days in advance.</Tip>
      </Section>
    </TrainingGuide>
  );
}
