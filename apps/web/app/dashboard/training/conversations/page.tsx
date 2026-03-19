'use client';

import { MessageSquare } from 'lucide-react';
import TrainingGuide, { Section, Tip, StatusTable } from '@/components/dashboard/TrainingGuide';

const SECTIONS = [
  { id: 'overview', title: 'Conversations Overview' },
  { id: 'types', title: 'Conversation Types' },
  { id: 'transcripts', title: 'Viewing Transcripts' },
  { id: 'leads', title: 'Lead Conversion' },
  { id: 'metrics', title: 'Key Metrics' },
];

export default function ConversationsTraining() {
  return (
    <TrainingGuide
      title="Conversations & Lead Monitoring"
      description="Monitoring chat sessions, voice calls, and web visits to capture leads and improve service."
      icon={MessageSquare}
      difficulty="intermediate"
      estimatedMinutes={10}
      lastUpdated="2026-03-19"
      sections={SECTIONS}
      prevModule={{ title: 'Opportunities', href: '/dashboard/training/opportunities' }}
      nextModule={{ title: 'Hub Management', href: '/dashboard/training/hub-management' }}
    >
      <Section id="overview" title="Conversations Overview">
        <p>
          The Conversations page at <code className="bg-gray-100 px-1 rounded">/dashboard/conversations</code> monitors
          every customer interaction across all channels in real time.
        </p>
        <p>Summary cards show: Total Today, Chat Sessions, Voice Calls, Converted to Quote, and Active Now.</p>
      </Section>

      <Section id="types" title="Conversation Types">
        <StatusTable statuses={[
          { name: 'Chat', color: 'bg-blue-100 text-blue-700', description: 'Website chat widget sessions. Text-based with quick replies.' },
          { name: 'Voice', color: 'bg-purple-100 text-purple-700', description: 'ElevenLabs AI phone agent calls. Audio with transcription.' },
          { name: 'Web Visit', color: 'bg-green-100 text-green-700', description: 'Website browsing sessions. Shows pages viewed and time on site.' },
        ]} />
        <p className="mt-3">Each conversation card shows:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Channel type icon and badge</li>
          <li>Status: <span className="text-green-600 font-semibold">Live</span> (currently active), Completed, or Abandoned</li>
          <li>Summary of the conversation intent</li>
          <li>Visitor name and contact info (if captured)</li>
          <li>Duration of the session</li>
        </ul>
      </Section>

      <Section id="transcripts" title="Viewing Transcripts">
        <p>Click any conversation to expand its full transcript:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Chat</strong> — Shows user and bot messages with timestamps</li>
          <li><strong>Voice</strong> — Shows AI-transcribed conversation with speaker labels</li>
          <li><strong>Web Visit</strong> — Shows pages viewed in order with time spent on each</li>
        </ul>
        <p>Intents are automatically categorized: Quote Request, Equipment Rental, Information, Research, etc.</p>
        <Tip>Review &ldquo;Abandoned&rdquo; conversations regularly. These are visitors who left without converting — understanding why helps improve the website and bot responses.</Tip>
      </Section>

      <Section id="leads" title="Lead Conversion">
        <p>When a conversation reveals a sales opportunity:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Create Quote</strong> — Start a quote directly from the conversation, pre-filling customer info</li>
          <li><strong>Add to CRM</strong> — Save the contact for future follow-up</li>
          <li><strong>Follow Up</strong> — Schedule a callback or send additional info</li>
        </ul>
        <p>Conversations that led to a quote show a &ldquo;Converted to Quote&rdquo; badge.</p>
      </Section>

      <Section id="metrics" title="Key Metrics">
        <p>Track these metrics to measure customer engagement:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Total conversations/day</strong> — Volume of customer interactions</li>
          <li><strong>Conversion rate</strong> — % that result in a quote request</li>
          <li><strong>Channel mix</strong> — Balance between chat, voice, and web</li>
          <li><strong>Common intents</strong> — What customers ask about most often</li>
          <li><strong>Abandoned rate</strong> — How many leave without completing their goal</li>
        </ul>
      </Section>
    </TrainingGuide>
  );
}
