'use client';

import { Calculator } from 'lucide-react';
import TrainingGuide, { Section, Tip, Warning, Step, KeyValue } from '@/components/dashboard/TrainingGuide';

const SECTIONS = [
  { id: 'quote-form', title: 'Quote Request Form' },
  { id: 'form-steps', title: 'The 4 Steps' },
  { id: 'url-params', title: 'URL Pre-Population' },
  { id: 'calculator', title: 'Material Calculator' },
  { id: 'densities', title: 'Material Densities' },
  { id: 'submissions', title: 'Where Submissions Go' },
];

export default function QuotesCalculatorTraining() {
  return (
    <TrainingGuide
      title="Quote Form & Material Calculator"
      description="How customers request quotes and use the tonnage calculator. How data flows into the dashboard."
      icon={Calculator}
      difficulty="beginner"
      estimatedMinutes={8}
      lastUpdated="2026-03-19"
      sections={SECTIONS}
      prevModule={{ title: 'Website Overview', href: '/dashboard/training/website' }}
      nextModule={{ title: 'Order Materials', href: '/dashboard/training/order-materials' }}
    >
      <Section id="quote-form" title="Quote Request Form">
        <p>
          The quote form at <code className="bg-gray-100 px-1 rounded">/quote</code> is one of our primary lead generation tools.
          It&rsquo;s a <strong>multi-step wizard</strong> that walks customers through providing all the information
          we need to build an accurate quote.
        </p>
        <p>Customers reach this form from many places:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>The red &ldquo;Get a Quote&rdquo; button in the navigation</li>
          <li>The homepage hero section</li>
          <li>Material calculator results (with pre-filled data)</li>
          <li>Order materials page cards (with pre-filled material type)</li>
          <li>Individual service pages</li>
          <li>The floating Quick Quote widget</li>
        </ul>
      </Section>

      <Section id="form-steps" title="The 4 Steps">
        <Step number={1} title="Service Selection">
          Customer picks from 6 service categories: Aggregate Sales, Trucking, Gravel Crushing, Equipment Rental, Landscaping Supplies, or Concrete Products.
        </Step>
        <Step number={2} title="Material Details">
          Specific material type and quantity. If they came from the calculator or order page, these fields are <strong>pre-filled automatically</strong>.
        </Step>
        <Step number={3} title="Delivery Location">
          Full delivery address including street, city, postal code, and province (defaults to Alberta). This determines delivery zone surcharges.
        </Step>
        <Step number={4} title="Contact Information">
          Name, email, phone, company name (optional), and any additional notes. This is the information our team uses to follow up.
        </Step>
        <Tip>The form validates each step before allowing the customer to proceed. All required fields must be filled in.</Tip>
      </Section>

      <Section id="url-params" title="URL Pre-Population">
        <p>
          The quote form accepts <strong>URL parameters</strong> that automatically fill in fields. This creates a seamless
          experience when customers come from the calculator or order page.
        </p>
        <div className="bg-gray-50 rounded-lg p-4 font-mono text-xs my-3 space-y-2">
          <p><span className="text-gray-500"># From the calculator:</span></p>
          <p>/quote?<span className="text-blue-600">material</span>=Road+Crush&amp;<span className="text-blue-600">tonnage</span>=45</p>
          <p className="mt-2"><span className="text-gray-500"># From order page material cards:</span></p>
          <p>/quote?<span className="text-blue-600">material</span>=Washed+Rock</p>
        </div>
        <p>This means customers don&rsquo;t have to re-enter information they&rsquo;ve already provided, reducing friction and increasing conversion rates.</p>
      </Section>

      <Section id="calculator" title="Material Calculator">
        <p>
          The calculator at <code className="bg-gray-100 px-1 rounded">/calculator</code> helps customers estimate how much material they need for their project.
        </p>
        <Step number={1} title="Select Material Type">
          Choose from 8 materials: Road Crush, Washed Rock, Pea Gravel, Drain Rock, Rainbow Rock, Sand, Topsoil, or Mulch.
        </Step>
        <Step number={2} title="Enter Dimensions">
          Length, width, and depth in <strong>feet</strong>. The calculator handles the unit conversion internally.
        </Step>
        <Step number={3} title="View Results">
          Shows estimated <strong>cubic yards</strong> and <strong>tonnes</strong> needed. A &ldquo;Get a Quote&rdquo; button passes these values directly to the quote form.
        </Step>
        <p className="mt-3"><strong>The formula:</strong></p>
        <div className="bg-gray-50 rounded-lg p-4 font-mono text-xs my-3">
          <p>cubic_yards = (length_ft × width_ft × depth_ft) / 27</p>
          <p>tonnes = cubic_yards × material_density</p>
        </div>
      </Section>

      <Section id="densities" title="Material Densities">
        <p>Each material has a specific density used for the tonnage calculation:</p>
        <div className="border border-gray-200 rounded-lg overflow-hidden my-4">
          <table className="w-full text-sm">
            <thead><tr className="bg-gray-50 border-b border-gray-200">
              <th className="text-left px-4 py-2 text-xs font-semibold text-gray-500">Material</th>
              <th className="text-left px-4 py-2 text-xs font-semibold text-gray-500">Density (tonnes/yard³)</th>
            </tr></thead>
            <tbody>
              {[
                ['Road Crush', '1.40'],
                ['Washed Rock', '1.35'],
                ['Pea Gravel', '1.35'],
                ['Drain Rock', '1.30'],
                ['Rainbow Rock', '1.30'],
                ['Sand', '1.45'],
                ['Topsoil', '1.10'],
                ['Mulch', '0.45'],
              ].map(([mat, dens]) => (
                <tr key={mat} className="border-b border-gray-100 last:border-0">
                  <td className="px-4 py-2 font-medium text-gray-800">{mat}</td>
                  <td className="px-4 py-2 text-gray-600 font-mono">{dens}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Warning>These densities are <strong>estimates</strong>. Actual weight varies with moisture content. Always quote with a small buffer for wet conditions.</Warning>
      </Section>

      <Section id="submissions" title="Where Submissions Go">
        <p>Quote form submissions are sent via <strong>Formspree</strong>, a third-party form handling service.</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Full quote requests go to the configured Formspree endpoint</li>
          <li>The Quick Quote floating widget uses a separate Formspree form</li>
          <li>If Formspree fails, the form falls back to a <code className="bg-gray-100 px-1 rounded">mailto:admin@wc-con.com</code> link</li>
        </ul>
        <p>Once received, quotes appear in the <strong>Dashboard Inbox</strong> and can be managed through the Quote Pipeline.</p>
        <Tip>The Quick Quote widget (red button, bottom-right on every public page) is designed for quick mobile submissions — just name, phone, material, quantity, and location.</Tip>
      </Section>
    </TrainingGuide>
  );
}
