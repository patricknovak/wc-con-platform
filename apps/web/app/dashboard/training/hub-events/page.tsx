'use client';

import { Building2 } from 'lucide-react';
import TrainingGuide, { Section, Tip, Step } from '@/components/dashboard/TrainingGuide';

const SECTIONS = [
  { id: 'hub-overview', title: 'Business Hub Overview' },
  { id: 'directory', title: 'Partner Directory' },
  { id: 'quote-routing', title: 'Quote Request Routing' },
  { id: 'submit-business', title: 'Submit a Business' },
  { id: 'events', title: 'Community Events Calendar' },
  { id: 'submit-event', title: 'Event Submission' },
];

export default function HubEventsTraining() {
  return (
    <TrainingGuide
      title="Business Hub & Community Events"
      description="The local business directory, partner network, and community events calendar."
      icon={Building2}
      difficulty="beginner"
      estimatedMinutes={8}
      lastUpdated="2026-03-19"
      sections={SECTIONS}
      prevModule={{ title: 'Customer Tools', href: '/dashboard/training/customer-tools' }}
      nextModule={{ title: 'Dashboard Overview', href: '/dashboard/training/dashboard-overview' }}
    >
      <Section id="hub-overview" title="Business Hub Overview">
        <p>
          The Business Hub at <code className="bg-gray-100 px-1 rounded">/hub</code> is a <strong>local business directory</strong> that
          connects our customers with trusted partners. It positions WCC as a community hub, not just a supplier.
        </p>
        <p>The Hub serves two purposes:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>For customers</strong> — Find vetted contractors and services in the Hinton/Edson area</li>
          <li><strong>For partner businesses</strong> — Get referrals and visibility through WCC&rsquo;s platform</li>
        </ul>
      </Section>

      <Section id="directory" title="Partner Directory">
        <p>The directory lists <strong>16 partner businesses</strong> across 13 categories:</p>
        <div className="flex flex-wrap gap-1.5 my-3">
          {['Excavation', 'Plumbing & HVAC', 'Electrical', 'Concrete & Paving', 'Landscaping', 'Surveying',
            'Waste Management', 'Building Supplies', 'Safety Training', 'Trucking & Hauling', 'Fencing',
            'Welding & Fabrication', 'Environmental'].map((cat) => (
            <span key={cat} className="px-2.5 py-1 bg-gray-100 rounded-full text-xs font-medium text-gray-700">{cat}</span>
          ))}
        </div>
        <p>Each business listing shows: name, category badge, description, location, phone (clickable), website, service areas, and action buttons.</p>
        <p>Customers can <strong>filter by category</strong> and <strong>search by name or description</strong>.</p>
      </Section>

      <Section id="quote-routing" title="Quote Request Routing">
        <p>When a customer clicks &ldquo;Request Quote&rdquo; on a partner listing, a modal form appears with:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Customer name, email, phone</li>
          <li>&ldquo;What do you need?&rdquo; text area</li>
        </ul>
        <p>
          The request goes to <strong>WCC first</strong> (via Formspree), not directly to the partner. WCC reviews the request
          and forwards it to the appropriate business. This allows us to:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Track referral volume for each partner</li>
          <li>Ensure quality by vetting requests</li>
          <li>Follow up on leads that partners don&rsquo;t respond to</li>
        </ul>
        <Tip>Hub quote requests appear in the Dashboard Hub page where you can review, forward, and follow up. See the Hub Management training module for details.</Tip>
      </Section>

      <Section id="submit-business" title="Submit a Business">
        <p>
          Local businesses can apply to join the Hub through the form at <code className="bg-gray-100 px-1 rounded">/hub/submit</code>.
        </p>
        <p>The submission form collects:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Business name and contact person</li>
          <li>Email, phone, website</li>
          <li>Business description</li>
          <li>Category (dropdown with 10 options)</li>
          <li>Service areas (multi-select checkboxes for 7 towns)</li>
          <li>Logo upload with preview</li>
        </ul>
        <p>Submissions are reviewed by the team before appearing in the directory. New submissions show as &ldquo;Pending&rdquo; in the Dashboard Hub page.</p>
      </Section>

      <Section id="events" title="Community Events Calendar">
        <p>
          The Events page at <code className="bg-gray-100 px-1 rounded">/events</code> is a community calendar listing
          local events across western Alberta.
        </p>
        <p><strong>Features:</strong></p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Featured events</strong> — Up to 3 highlighted events with yellow border at the top</li>
          <li><strong>Town filter</strong> — All, Hinton, Edson, Jasper, Grande Cache, Robb, Cadomin</li>
          <li><strong>Category filter</strong> — Community, Sports, Arts & Culture, Business, Outdoors, Education, Fundraiser</li>
          <li>Each event shows: date, title, category badge, free/paid status, description, time, location, organizer</li>
          <li>Past events are automatically hidden</li>
        </ul>
        <p>The calendar currently lists <strong>15 events</strong> ranging from spring markets to dark sky festivals to hockey fundraisers.</p>
      </Section>

      <Section id="submit-event" title="Event Submission">
        <p>Anyone can submit an event through the &ldquo;Submit an Event&rdquo; button, which opens a modal form:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Event title, date, time, location</li>
          <li>Town (dropdown) and category (dropdown)</li>
          <li>Description, organizer name, contact email</li>
        </ul>
        <p>Submissions go via Formspree and are reviewed before being published to the calendar.</p>
        <Tip>Encouraging local organizations to submit events builds community goodwill and drives traffic to our website.</Tip>
      </Section>
    </TrainingGuide>
  );
}
