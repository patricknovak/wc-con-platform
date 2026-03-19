'use client';

import { UserPlus } from 'lucide-react';
import TrainingGuide, { Section, Tip, Warning, StatusTable, Step } from '@/components/dashboard/TrainingGuide';

const SECTIONS = [
  { id: 'overview', title: 'Hiring Pipeline Overview' },
  { id: 'ai-scoring', title: 'AI Resume Scoring' },
  { id: 'stages', title: 'Hiring Stages' },
  { id: 'questionnaires', title: 'Automated Questionnaires' },
  { id: 'actions', title: 'Managing Applicants' },
];

export default function HiringTraining() {
  return (
    <TrainingGuide
      title="Hiring Pipeline & AI Screening"
      description="Managing job applicants, AI resume scoring, automated questionnaires, and interview scheduling."
      icon={UserPlus}
      difficulty="advanced"
      estimatedMinutes={15}
      lastUpdated="2026-03-19"
      sections={SECTIONS}
      prevModule={{ title: 'Voice Agent', href: '/dashboard/training/voice-agent' }}
      nextModule={{ title: 'Team Management', href: '/dashboard/training/team' }}
    >
      <Section id="overview" title="Hiring Pipeline Overview">
        <p>
          The Hiring Pipeline at <code className="bg-gray-100 px-1 rounded">/dashboard/hiring</code> manages job applicants
          from initial submission through hiring. It uses <strong>AI-powered screening</strong> to score resumes and
          generate follow-up questionnaires.
        </p>
        <p>Summary cards show: Total Applicants, New/Unreviewed, In Progress, and Average AI Score.</p>
        <p>Applicants come from the Careers page at <code className="bg-gray-100 px-1 rounded">/careers</code> where open positions are listed.</p>
      </Section>

      <Section id="ai-scoring" title="AI Resume Scoring">
        <p>Every resume is automatically scored by AI on a <strong>0-100 scale</strong>:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li><span className="inline-block w-8 h-8 rounded-full bg-green-100 text-green-700 text-xs font-bold flex items-center justify-center" style={{display: 'inline-flex'}}>85+</span> <strong>Strong candidate</strong> — Skills closely match requirements</li>
          <li><span className="inline-block w-8 h-8 rounded-full bg-yellow-100 text-yellow-800 text-xs font-bold flex items-center justify-center" style={{display: 'inline-flex'}}>70-84</span> <strong>Worth considering</strong> — Some gaps but potential</li>
          <li><span className="inline-block w-8 h-8 rounded-full bg-red-100 text-red-700 text-xs font-bold flex items-center justify-center" style={{display: 'inline-flex'}}>&lt;70</span> <strong>Below threshold</strong> — Significant gaps in requirements</li>
        </ul>
        <p className="mt-3">The AI assessment includes:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Summary</strong> — One-paragraph evaluation of the candidate</li>
          <li><strong>Strengths</strong> — What makes them a good fit (certifications, experience, location)</li>
          <li><strong>Concerns</strong> — Potential gaps or risks (missing certifications, short tenure history)</li>
        </ul>
        <Warning>AI scores are a screening tool, not a final decision. Always review the full resume and assessment before rejecting a candidate. The AI may miss context that makes someone a great fit.</Warning>
      </Section>

      <Section id="stages" title="Hiring Stages">
        <StatusTable statuses={[
          { name: 'New', color: 'bg-gray-100 text-gray-700', description: 'Just received. AI scoring in progress or complete, not yet reviewed by staff.' },
          { name: 'AI Reviewed', color: 'bg-blue-100 text-blue-700', description: 'AI has scored and assessed. Ready for human review.' },
          { name: 'Questionnaire Sent', color: 'bg-purple-100 text-purple-700', description: 'Follow-up questionnaire sent to candidate. Awaiting response.' },
          { name: 'Interview', color: 'bg-yellow-100 text-yellow-800', description: 'Interview scheduled or in progress.' },
          { name: 'Offer', color: 'bg-green-100 text-green-700', description: 'Job offer extended. Awaiting acceptance.' },
          { name: 'Hired', color: 'bg-green-100 text-green-700', description: 'Offer accepted. Onboarding initiated.' },
        ]} />
      </Section>

      <Section id="questionnaires" title="Automated Questionnaires">
        <p>The AI generates <strong>5 tailored questions</strong> per applicant based on their resume and the position requirements. Examples:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>&ldquo;Describe your experience operating a Cat 320 or similar 20-tonne excavator.&rdquo;</li>
          <li>&ldquo;Your Class 1 license expires in November. What is your renewal plan?&rdquo;</li>
          <li>&ldquo;Can you describe a time you worked in challenging weather conditions?&rdquo;</li>
        </ul>
        <p>The questionnaire can be sent via email with one click. Completed responses appear in the applicant&rsquo;s expanded profile with completion dates.</p>
        <Tip>Questionnaires are most effective when sent within 24 hours of application. Fast follow-up shows candidates you&rsquo;re serious and reduces drop-off.</Tip>
      </Section>

      <Section id="actions" title="Managing Applicants">
        <p>Each applicant card expands to show the full profile. Available actions depend on the stage:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Download/View Resume</strong> — Access the uploaded resume file</li>
          <li><strong>Send Questionnaire</strong> — Email the AI-generated follow-up questions</li>
          <li><strong>Schedule Interview</strong> — Set up an in-person or phone interview</li>
          <li><strong>Add Note</strong> — Record observations or interview feedback</li>
          <li><strong>Reject</strong> — Remove from active pipeline with reason</li>
        </ul>
        <p>Current open positions include: Heavy Equipment Operator, Truck Driver, General Labourer, Crusher Operator.</p>
      </Section>
    </TrainingGuide>
  );
}
