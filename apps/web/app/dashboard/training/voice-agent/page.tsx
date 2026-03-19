'use client';

import { Mic2 } from 'lucide-react';
import TrainingGuide, { Section, Tip, Warning } from '@/components/dashboard/TrainingGuide';

const SECTIONS = [
  { id: 'overview', title: 'Voice Agent Overview' },
  { id: 'call-log', title: 'Call Log & Transcripts' },
  { id: 'intents', title: 'Intent Detection' },
  { id: 'knowledge', title: 'Knowledge Base Updates' },
  { id: 'metrics', title: 'Performance Metrics' },
];

export default function VoiceAgentTraining() {
  return (
    <TrainingGuide
      title="Voice Agent Administration"
      description="Monitoring the AI phone agent, reviewing call logs, and updating the knowledge base."
      icon={Mic2}
      difficulty="advanced"
      estimatedMinutes={8}
      lastUpdated="2026-03-19"
      sections={SECTIONS}
      prevModule={{ title: 'Hub Management', href: '/dashboard/training/hub-management' }}
      nextModule={{ title: 'Hiring Pipeline', href: '/dashboard/training/hiring' }}
    >
      <Section id="overview" title="Voice Agent Overview">
        <p>
          The Voice Agent page at <code className="bg-gray-100 px-1 rounded">/dashboard/voice</code> monitors our AI phone
          agent powered by <strong>ElevenLabs</strong>. This agent handles incoming calls automatically, answering
          questions, capturing lead information, and routing complex requests to staff.
        </p>
        <p>Summary cards show: Calls Today, Average Duration, Transfer Rate, and Leads Captured.</p>
      </Section>

      <Section id="call-log" title="Call Log & Transcripts">
        <p>The call log table shows all recent calls with:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Time</strong> — When the call came in</li>
          <li><strong>Caller</strong> — Name (if identified) or phone number</li>
          <li><strong>Intent</strong> — What the caller was asking about (auto-detected)</li>
          <li><strong>Priority</strong> — High/Medium/Low based on intent and urgency</li>
          <li><strong>Duration</strong> — Call length (typically 1:30 - 5:00 minutes)</li>
          <li><strong>Status</strong> — Captured, Transferred, Dropped</li>
        </ul>
        <p>Actions per call:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Play</strong> — Listen to the call recording</li>
          <li><strong>Transcript</strong> — Read the AI-transcribed conversation</li>
          <li><strong>Quick Action (+)</strong> — Create a quote or follow-up from the call</li>
        </ul>
      </Section>

      <Section id="intents" title="Intent Detection">
        <p>The AI categorizes each call by intent:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li><span className="px-2 py-0.5 bg-green-100 text-green-700 rounded text-xs font-medium">Equipment Rental</span> — Asking about renting trucks, excavators, etc.</li>
          <li><span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs font-medium">Material Quote</span> — Requesting pricing on gravel, sand, topsoil, etc.</li>
          <li><span className="px-2 py-0.5 bg-purple-100 text-purple-700 rounded text-xs font-medium">Service Inquiry</span> — General questions about trucking, crushing, etc.</li>
          <li><span className="px-2 py-0.5 bg-yellow-100 text-yellow-800 rounded text-xs font-medium">Order Status</span> — Checking on existing deliveries or invoices</li>
          <li><span className="px-2 py-0.5 bg-red-100 text-red-700 rounded text-xs font-medium">Urgent/Emergency</span> — Time-sensitive requests, escalated to staff</li>
        </ul>
        <Tip>High-priority calls (equipment rental requests, material quotes with quantity) are the most likely to convert to revenue. Follow up within the hour.</Tip>
      </Section>

      <Section id="knowledge" title="Knowledge Base Updates">
        <p>The voice agent&rsquo;s responses are powered by a knowledge base that includes:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Current pricing for all materials</li>
          <li>Equipment availability and rates</li>
          <li>Service area coverage</li>
          <li>Business hours and contact information</li>
          <li>Common FAQ answers</li>
        </ul>
        <p>The knowledge base shows its last update time and record count (e.g., &ldquo;2 hours ago, 142 pricing records&rdquo;).</p>
        <p>Click <strong>&ldquo;Update Knowledge Base&rdquo;</strong> to push the latest pricing and availability data to the voice agent.</p>
        <Warning>Keep the knowledge base current. If prices change or equipment becomes unavailable, update the knowledge base immediately so the AI agent gives accurate information to callers.</Warning>
      </Section>

      <Section id="metrics" title="Performance Metrics">
        <p>Key metrics to monitor:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Calls per day</strong> — Volume of incoming calls handled by AI</li>
          <li><strong>Avg duration</strong> — Longer calls suggest the agent is engaging well</li>
          <li><strong>Transfer rate</strong> — % of calls needing human assistance (lower is better for routine inquiries)</li>
          <li><strong>Lead capture rate</strong> — % of calls where contact info and intent were captured</li>
          <li><strong>Resolution rate</strong> — % of calls where the customer got their answer without transfer</li>
        </ul>
      </Section>
    </TrainingGuide>
  );
}
