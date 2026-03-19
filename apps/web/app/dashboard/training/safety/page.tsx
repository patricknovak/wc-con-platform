'use client';

import { Shield } from 'lucide-react';
import TrainingGuide, { Section, Tip, Warning, Step } from '@/components/dashboard/TrainingGuide';

const SECTIONS = [
  { id: 'cor', title: 'COR Certification' },
  { id: 'isnetworld', title: 'ISNetworld & ComplyWorks' },
  { id: 'ppe', title: 'PPE Requirements' },
  { id: 'incidents', title: 'Incident Reporting' },
  { id: 'certifications', title: 'Required Certifications' },
];

export default function SafetyTraining() {
  return (
    <TrainingGuide
      title="Safety & Compliance"
      description="COR certification, safety procedures, ISNetworld and ComplyWorks requirements."
      icon={Shield}
      difficulty="beginner"
      estimatedMinutes={10}
      lastUpdated="2026-03-19"
      sections={SECTIONS}
      prevModule={{ title: 'Integrations', href: '/dashboard/training/integrations' }}
      nextModule={{ title: 'Company Overview', href: '/dashboard/training/company' }}
    >
      <Section id="cor" title="COR Certification">
        <p>
          West Central Contracting is <strong>100% COR (Certificate of Recognition) certified</strong>. COR is
          Alberta&rsquo;s safety standard that proves we meet or exceed OHS requirements.
        </p>
        <p>What COR means for daily operations:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>All employees must complete safety orientation before starting work</li>
          <li>Regular safety meetings are held and documented</li>
          <li>Hazard assessments are completed for every new job site</li>
          <li>Incident reports must be filed within 24 hours</li>
          <li>Annual audits verify our safety management system is maintained</li>
        </ul>
        <Warning>COR certification is required for many government and commercial contracts. Losing it would disqualify us from a significant portion of our work. Safety compliance is everyone&rsquo;s responsibility.</Warning>
      </Section>

      <Section id="isnetworld" title="ISNetworld & ComplyWorks">
        <p>We maintain memberships with two contractor management platforms:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong>ISNetworld</strong> — Used by major oil &amp; gas and industrial clients to verify contractor safety qualifications. Our profile must stay current with: insurance certificates, safety stats (TRIR, LTIR), training records, and program documentation.
          </li>
          <li>
            <strong>ComplyWorks</strong> — Similar platform used by other major operators. Tracks the same qualifications and requires regular updates.
          </li>
        </ul>
        <p>Both badges appear in the website footer, signaling to potential clients that we meet their contractor requirements.</p>
        <Tip>If a client asks &ldquo;Are you on ISNetworld?&rdquo; the answer is yes. Our company ID and current status are maintained by the admin team.</Tip>
      </Section>

      <Section id="ppe" title="PPE Requirements">
        <p>All WCC employees and site visitors must wear appropriate PPE:</p>
        <div className="border border-gray-200 rounded-lg overflow-hidden my-4">
          <table className="w-full text-sm">
            <thead><tr className="bg-gray-50 border-b border-gray-200">
              <th className="text-left px-4 py-2 text-xs font-semibold text-gray-500">Location</th>
              <th className="text-left px-4 py-2 text-xs font-semibold text-gray-500">Required PPE</th>
            </tr></thead>
            <tbody>
              {[
                ['Office', 'None required'],
                ['Yard / Pit', 'Hard hat, steel-toed boots, high-visibility vest, safety glasses'],
                ['Active Job Site', 'Hard hat, steel-toed boots, high-visibility vest, safety glasses, hearing protection (if applicable)'],
                ['Crushing Operations', 'All standard + hearing protection + respiratory protection'],
                ['H2S Areas', 'All standard + H2S monitor + escape-rated respiratory protection'],
              ].map(([loc, ppe]) => (
                <tr key={loc} className="border-b border-gray-100 last:border-0">
                  <td className="px-4 py-2 font-medium text-gray-800">{loc}</td>
                  <td className="px-4 py-2 text-gray-600">{ppe}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section id="incidents" title="Incident Reporting">
        <p>All incidents must be reported, no matter how minor:</p>
        <Step number={1} title="Secure the Scene">
          Ensure everyone is safe. Administer first aid if needed. Call 911 for emergencies.
        </Step>
        <Step number={2} title="Report Immediately">
          Notify your supervisor and the safety coordinator within 1 hour.
        </Step>
        <Step number={3} title="Document">
          Complete an incident report form within 24 hours. Include: what happened, when, where, who was involved, and any witnesses.
        </Step>
        <Step number={4} title="Investigation">
          The safety team investigates root causes and implements corrective actions.
        </Step>
        <p>Types of reportable incidents: injuries, near-misses, property damage, environmental spills, equipment failures.</p>
        <Warning>Near-misses are just as important to report as actual incidents. They reveal hazards before someone gets hurt. No one will be penalized for reporting a near-miss.</Warning>
      </Section>

      <Section id="certifications" title="Required Certifications">
        <p>All field employees must hold these minimum certifications:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>H2S Alive</strong> — Required for any oil &amp; gas or pipeline work</li>
          <li><strong>Standard First Aid &amp; CPR</strong> — Basic emergency response</li>
          <li><strong>WHMIS 2015</strong> — Hazardous materials handling</li>
          <li><strong>Ground Disturbance Level II</strong> — Required for excavation work</li>
        </ul>
        <p>Additional certifications depending on role:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Valid driver&rsquo;s license (Class 1 or 3 for drivers)</li>
          <li>Heavy equipment operator certification</li>
          <li>Confined space entry</li>
          <li>Fall protection</li>
        </ul>
        <p>Track all certification expiry dates through the <strong>Team page</strong> Certifications tab.</p>
      </Section>
    </TrainingGuide>
  );
}
