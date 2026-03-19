'use client';

import { Users } from 'lucide-react';
import TrainingGuide, { Section, Tip, Warning } from '@/components/dashboard/TrainingGuide';

const SECTIONS = [
  { id: 'overview', title: 'Team Page Overview' },
  { id: 'directory', title: 'Team Directory' },
  { id: 'certifications', title: 'Certification Tracking' },
  { id: 'recognition', title: 'Recognition & Kudos' },
  { id: 'training-tracker', title: 'Training Records' },
];

export default function TeamTraining() {
  return (
    <TrainingGuide
      title="Team, Certs & Recognition"
      description="Employee profiles, certification tracking, training records, and the kudos recognition system."
      icon={Users}
      difficulty="intermediate"
      estimatedMinutes={12}
      lastUpdated="2026-03-19"
      sections={SECTIONS}
      prevModule={{ title: 'Hiring Pipeline', href: '/dashboard/training/hiring' }}
      nextModule={{ title: 'Intelligence', href: '/dashboard/training/intelligence' }}
    >
      <Section id="overview" title="Team Page Overview">
        <p>
          The Team page at <code className="bg-gray-100 px-1 rounded">/dashboard/team</code> is the employee management hub.
          It has <strong>3 tabs</strong>: Team Directory, Certifications, and Recognition Board.
        </p>
        <p>Summary stats: Team Size, Active employees, Certs Expiring Soon, Safety Incidents (this month), and Total Kudos given.</p>
      </Section>

      <Section id="directory" title="Team Directory">
        <p>Each employee card shows:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Avatar initials, name, and status badge (Active, On Leave, etc.)</li>
          <li>Role, department, and tenure (years with company)</li>
          <li>Quick stats: kudos received, certifications held, performance rating (stars)</li>
        </ul>
        <p>Click to expand and see the full profile:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Certifications</strong> — Each cert with status (Current/Expiring/Expired) and dates</li>
          <li><strong>Training completed</strong> — Course names and completion dates</li>
          <li><strong>Upcoming trainings</strong> — Scheduled courses not yet completed</li>
          <li><strong>Contact info</strong> — Phone, email, emergency contact</li>
          <li><strong>Milestones</strong> — Work anniversaries, awards, achievements</li>
          <li><strong>Latest Kudos</strong> — Recent recognition received</li>
        </ul>
        <p>Current team spans 5 departments: Management, Operations, Transportation, Administration, and Field Operations.</p>
      </Section>

      <Section id="certifications" title="Certification Tracking">
        <p>The Certifications tab provides a comprehensive view of all employee certifications:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Expiring Soon alert</strong> — Yellow banner showing certs due within 60 days</li>
          <li><strong>Full certifications table</strong> — All certs across all employees with status, issue date, and expiry</li>
        </ul>
        <p>Certification statuses:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li><span className="px-2 py-0.5 bg-green-100 text-green-700 rounded text-xs font-medium">Current</span> — Valid, no action needed</li>
          <li><span className="px-2 py-0.5 bg-yellow-100 text-yellow-800 rounded text-xs font-medium">Expiring</span> — Due within 60 days, schedule renewal</li>
          <li><span className="px-2 py-0.5 bg-red-100 text-red-700 rounded text-xs font-medium">Expired</span> — Past due, employee cannot perform related work until renewed</li>
        </ul>
        <Warning>Expired certifications are a <strong>compliance risk</strong>. Employees with expired certs (H2S, First Aid, COR) cannot be assigned to jobs requiring those certifications. Monitor this tab weekly.</Warning>
      </Section>

      <Section id="recognition" title="Recognition & Kudos">
        <p>The Recognition Board tab has two sections:</p>
        <p><strong>Kudos Leaderboard</strong> — Ranked list of employees by total kudos received. Top 3 get medal icons (gold, silver, bronze). Shows kudos count and latest recognition.</p>
        <p><strong>Recent Kudos</strong> — Feed of recent kudos given, showing who gave it, who received it, and the message.</p>
        <p>Use the <strong>&ldquo;Give Kudos&rdquo;</strong> button to recognize team members for:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Going above and beyond on a job</li>
          <li>Safety-first behavior</li>
          <li>Helping colleagues</li>
          <li>Customer compliments</li>
          <li>Milestones and achievements</li>
        </ul>
        <Tip>Regular kudos improve team morale and retention. Try to give at least one recognition per week. It costs nothing and means a lot.</Tip>
      </Section>

      <Section id="training-tracker" title="Training Records">
        <p>Each employee&rsquo;s profile tracks both completed and upcoming training:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Completed training</strong> — Course name, completion date, certification earned</li>
          <li><strong>Upcoming training</strong> — Scheduled courses, dates, location</li>
        </ul>
        <p>Common training types: H2S Alive, First Aid & CPR, WHMIS, Ground Disturbance, Heavy Equipment Operation, Defensive Driving, COR Safety Orientation.</p>
      </Section>
    </TrainingGuide>
  );
}
