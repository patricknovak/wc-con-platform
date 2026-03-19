'use client';

import { Briefcase } from 'lucide-react';
import TrainingGuide, { Section, Tip, KeyValue } from '@/components/dashboard/TrainingGuide';

const SECTIONS = [
  { id: 'history', title: 'Company History' },
  { id: 'services', title: 'Our 7 Service Lines' },
  { id: 'areas', title: 'Service Area Coverage' },
  { id: 'contacts', title: 'Key Contact Information' },
  { id: 'hours', title: 'Business Hours' },
  { id: 'awards', title: 'Awards & Recognition' },
];

export default function CompanyTraining() {
  return (
    <TrainingGuide
      title="Company Overview & Service Areas"
      description="WCC history, service area coverage, business hours, and key contact information."
      icon={Briefcase}
      difficulty="beginner"
      estimatedMinutes={5}
      lastUpdated="2026-03-19"
      sections={SECTIONS}
      prevModule={{ title: 'Safety & Compliance', href: '/dashboard/training/safety' }}
    >
      <Section id="history" title="Company History">
        <p>
          <strong>West Central Contracting LTD</strong> (also known as WC-CON, formerly Westlake Crushing &amp; Contracting)
          is a <strong>family-owned business founded in 1980</strong>. That&rsquo;s over <strong>45 years</strong> of
          serving western Alberta.
        </p>
        <p>Based in <strong>Hinton, Alberta</strong>, we&rsquo;ve grown from a small crushing operation into a full-service
        aggregates, trucking, and contracting company with 7 service lines, 7 pit locations, and a fleet of trucks and heavy equipment.</p>
        <p>We serve the resource, municipal, commercial, and residential sectors across the Yellowhead corridor.</p>
      </Section>

      <Section id="services" title="Our 7 Service Lines">
        <div className="border border-gray-200 rounded-lg overflow-hidden my-4">
          <table className="w-full text-sm">
            <thead><tr className="bg-gray-50 border-b border-gray-200">
              <th className="text-left px-4 py-2 text-xs font-semibold text-gray-500">Service</th>
              <th className="text-left px-4 py-2 text-xs font-semibold text-gray-500">What We Do</th>
            </tr></thead>
            <tbody>
              {[
                ['Trucking & Hauling', 'End dump, belly dump, tandem, float service. Highway and off-road transport.'],
                ['Aggregate Sales', 'Road crush, pit run, washed rock, sand, topsoil from our 7 pit locations.'],
                ['Gravel Crushing', 'Mobile and stationary crushing. Custom specs for any project requirement.'],
                ['Equipment Rental', 'Excavators, graders, loaders, trucks — with or without operators.'],
                ['Landscaping Supplies', 'Topsoil, mulch, decorative stone, rip rap for residential and commercial.'],
                ['Pre-Cast Concrete', 'Blocks, barriers, planters. Precast and custom concrete products.'],
                ['Environmental Remediation', 'Contaminated soil handling, site restoration, reclamation.'],
              ].map(([svc, desc]) => (
                <tr key={svc} className="border-b border-gray-100 last:border-0">
                  <td className="px-4 py-2 font-medium text-gray-800 whitespace-nowrap">{svc}</td>
                  <td className="px-4 py-2 text-gray-600">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Tip>When talking to customers, lead with the service that matches their need. Don&rsquo;t list everything — focus on solving their specific problem.</Tip>
      </Section>

      <Section id="areas" title="Service Area Coverage">
        <p>We serve <strong>7 communities</strong> across western Alberta:</p>
        <div className="border border-gray-200 rounded-lg overflow-hidden my-4">
          <table className="w-full text-sm">
            <thead><tr className="bg-gray-50 border-b border-gray-200">
              <th className="text-left px-4 py-2 text-xs font-semibold text-gray-500">Town</th>
              <th className="text-left px-4 py-2 text-xs font-semibold text-gray-500">Distance</th>
              <th className="text-left px-4 py-2 text-xs font-semibold text-gray-500">Notes</th>
            </tr></thead>
            <tbody>
              {[
                ['Hinton', 'Home base', 'Full service. Main yard and office at 450 East River Rd.'],
                ['Edson', '~80 km east', 'Full service. Kyle Brinson based here.'],
                ['Jasper', '~80 km west', 'Parks Canada work. Jasper Recovery program active.'],
                ['Grande Cache', '~120 km north', 'Northern reach. Delivery surcharge applies.'],
                ['Whitecourt', '~190 km east', 'Eastern expansion area.'],
                ['Drayton Valley', '~250 km SE', 'Southern service area.'],
                ['Robb / Cadomin', '~40 km south', 'Local mountain communities.'],
              ].map(([town, dist, notes]) => (
                <tr key={town} className="border-b border-gray-100 last:border-0">
                  <td className="px-4 py-2 font-medium text-gray-800">{town}</td>
                  <td className="px-4 py-2 text-gray-600">{dist}</td>
                  <td className="px-4 py-2 text-gray-500 text-xs">{notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section id="contacts" title="Key Contact Information">
        <div className="bg-gray-50 rounded-lg p-4 space-y-1">
          <KeyValue label="Main Office" value="(780) 865-3000" />
          <KeyValue label="Dispatch" value="(780) 865-0068" />
          <KeyValue label="Email" value="admin@wc-con.com" />
          <KeyValue label="Address" value="450 East River Road, Hinton, AB T7V 2A3" />
          <KeyValue label="Website" value="wc-con.com" />
        </div>
        <p className="mt-3">
          <strong>Dispatch</strong> is for drivers and active job coordination. <strong>Main office</strong> is for
          quotes, billing, general inquiries. Direct customers to the appropriate line.
        </p>
      </Section>

      <Section id="hours" title="Business Hours">
        <div className="border border-gray-200 rounded-lg overflow-hidden my-4">
          <table className="w-full text-sm">
            <thead><tr className="bg-gray-50 border-b border-gray-200">
              <th className="text-left px-4 py-2 text-xs font-semibold text-gray-500">Day</th>
              <th className="text-left px-4 py-2 text-xs font-semibold text-gray-500">Hours</th>
            </tr></thead>
            <tbody>
              {[
                ['Monday - Friday', '7:00 AM - 5:00 PM'],
                ['Saturday', 'By appointment only'],
                ['Sunday', 'Closed'],
              ].map(([day, hours]) => (
                <tr key={day} className="border-b border-gray-100 last:border-0">
                  <td className="px-4 py-2 font-medium text-gray-800">{day}</td>
                  <td className="px-4 py-2 text-gray-600">{hours}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>The AI voice agent and chat widget handle inquiries <strong>24/7</strong> outside business hours.</p>
      </Section>

      <Section id="awards" title="Awards & Recognition">
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Business of the Year 2013</strong> — Hinton Chamber of Commerce</li>
          <li><strong>Business of the Year 2017</strong> — Hinton Chamber of Commerce</li>
          <li><strong>COR Certified</strong> — Alberta OHS safety standard</li>
          <li><strong>ISNetworld Member</strong> — Contractor qualification platform</li>
          <li><strong>ComplyWorks Member</strong> — Contractor management system</li>
        </ul>
        <Tip>Two-time Business of the Year is a strong selling point. Mention it when competing against newer or less established companies.</Tip>
      </Section>
    </TrainingGuide>
  );
}
