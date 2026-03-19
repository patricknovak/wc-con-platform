'use client';

import { MessageSquare } from 'lucide-react';
import TrainingGuide, { Section, Tip, Warning, Step } from '@/components/dashboard/TrainingGuide';

const SECTIONS = [
  { id: 'chat-widget', title: 'AI Chat Widget' },
  { id: 'knowledge-base', title: 'Chat Knowledge Base' },
  { id: 'quick-replies', title: 'Quick Reply System' },
  { id: 'quick-quote', title: 'Quick Quote Widget' },
  { id: 'voice-assistant', title: 'Voice Assistant' },
  { id: 'order-tracking', title: 'Order Tracking System' },
];

export default function CustomerToolsTraining() {
  return (
    <TrainingGuide
      title="Customer Tools — Chat, Voice & Tracking"
      description="The AI chat widget, voice assistant, and order tracking system customers use."
      icon={MessageSquare}
      difficulty="intermediate"
      estimatedMinutes={12}
      lastUpdated="2026-03-19"
      sections={SECTIONS}
      prevModule={{ title: 'Order Materials', href: '/dashboard/training/order-materials' }}
      nextModule={{ title: 'Hub & Events', href: '/dashboard/training/hub-events' }}
    >
      <Section id="chat-widget" title="AI Chat Widget">
        <p>
          A floating chat button appears on the <strong>bottom-right of every public page</strong>. When clicked,
          it opens an AI-powered chat window that answers customer questions using our company knowledge base.
        </p>
        <p>The chat widget is <strong>rule-based</strong> (not a large language model) — it matches customer input against
        predefined patterns and returns curated responses. This means:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Responses are <strong>always accurate</strong> — no AI hallucination risk</li>
          <li>Information stays <strong>consistent</strong> with our actual services and pricing</li>
          <li>It can direct customers to the right page or suggest talking to a person</li>
        </ul>
        <p>The widget includes a <strong>pulsing indicator</strong> to attract attention from visitors.</p>
      </Section>

      <Section id="knowledge-base" title="Chat Knowledge Base">
        <p>The chat bot knows about:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Company Info</strong> — Name, phone numbers, email, address, business hours</li>
          <li><strong>6 Service Categories</strong> — Each with keywords, descriptions, and capabilities</li>
          <li><strong>7 Service Areas</strong> — Hinton, Edson, Jasper, Grande Cache, Whitecourt, Drayton Valley, Robb/Cadomin</li>
          <li><strong>Quote Process</strong> — How to request quotes, what info is needed</li>
          <li><strong>Calculator</strong> — What the tonnage calculator does and how to use it</li>
        </ul>
        <p>The bot matches user input to categories using <strong>keyword patterns</strong>:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Greeting words → Welcome message with quick replies</li>
          <li>&ldquo;quote&rdquo;, &ldquo;price&rdquo;, &ldquo;cost&rdquo; → Quote process info + link to <code className="bg-gray-100 px-1 rounded">/quote</code></li>
          <li>&ldquo;calculator&rdquo;, &ldquo;tonnage&rdquo;, &ldquo;estimate&rdquo; → Calculator explanation + link</li>
          <li>Service names → Specific service details + link to service page</li>
          <li>&ldquo;delivery&rdquo;, &ldquo;area&rdquo;, &ldquo;where&rdquo; → Service area coverage info</li>
          <li>&ldquo;talk to someone&rdquo;, &ldquo;person&rdquo;, &ldquo;human&rdquo; → Phone + email contact options</li>
        </ul>
        <Warning>The chat knowledge base is hardcoded in <code className="bg-amber-100 px-1 rounded">components/chat/ChatWidget.tsx</code>. If services, hours, or contact info change, update both the chat widget AND the footer/layout.</Warning>
      </Section>

      <Section id="quick-replies" title="Quick Reply System">
        <p>After the bot responds, it often shows <strong>quick reply buttons</strong> for common follow-ups:</p>
        <div className="flex flex-wrap gap-2 my-3">
          {['Get a Quote', 'Our Services', 'Delivery Areas', 'Contact Info', 'Material Calculator', 'Talk to Someone'].map((btn) => (
            <span key={btn} className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">{btn}</span>
          ))}
        </div>
        <p>These make it easy for customers to explore without typing. Each quick reply triggers a specific response chain.</p>
      </Section>

      <Section id="quick-quote" title="Quick Quote Widget">
        <p>
          Separate from the chat widget, there&rsquo;s a <strong>red floating button</strong> for quick quotes.
          This is a simplified form designed for fast mobile submissions.
        </p>
        <p><strong>Quick Quote fields:</strong></p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Name (required)</li>
          <li>Phone number (required)</li>
          <li>Material — dropdown with 10 options (Road Crush, Pit Run, Washed Rock, Sand, Topsoil, Mulch, Decorative Stone, Rip Rap, Concrete Products, Other)</li>
          <li>Approximate quantity</li>
          <li>Delivery location</li>
        </ul>
        <p>Submissions go to Formspree with the subject line &ldquo;WCC Quick Quote: [material]&rdquo;.</p>
        <Tip>The Quick Quote widget is intentionally minimal — just 5 fields. It&rsquo;s designed for customers who know what they want and just need a fast price.</Tip>
      </Section>

      <Section id="voice-assistant" title="Voice Assistant">
        <p>
          The voice assistant page at <code className="bg-gray-100 px-1 rounded">/assistant</code> provides an AI-powered
          conversational interface using <strong>ElevenLabs</strong> technology.
        </p>
        <p>Features include:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Text chat with send button</li>
          <li>Voice input (microphone button for speaking)</li>
          <li>Volume control</li>
          <li>Quick access cards for Calculator, File upload, and Quote request</li>
          <li>Full WCC knowledge base integration</li>
        </ul>
        <p>The voice agent is also accessible via phone and handles calls automatically — see the Voice Agent dashboard training module for call monitoring.</p>
      </Section>

      <Section id="order-tracking" title="Order Tracking System">
        <p>
          Customers can track their orders at <code className="bg-gray-100 px-1 rounded">/track</code> by entering a reference number.
        </p>
        <p><strong>Supported reference formats:</strong></p>
        <ul className="list-disc pl-5 space-y-1">
          <li><code className="bg-gray-100 px-1 rounded">QT-2026-XXXX</code> — Quote references</li>
          <li><code className="bg-gray-100 px-1 rounded">WO-2026-XXXX</code> — Work order references</li>
          <li><code className="bg-gray-100 px-1 rounded">INV-2026-XXXX</code> — Invoice references</li>
        </ul>
        <p><strong>The tracking page shows:</strong></p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Order header with reference number, type badge, customer and project names</li>
          <li>Estimated completion date</li>
          <li>Delivery address and contact info</li>
          <li>Full <strong>progress timeline</strong> with color-coded steps: Quote Created → PO Approved → Work Scheduled → Delivery In Progress → Completed → Invoiced → Paid</li>
          <li>Materials list with quantities</li>
          <li>Invoice details and payment methods (if applicable)</li>
        </ul>
        <p>Steps are color-coded: <span className="text-green-600 font-semibold">green</span> (completed), <span className="text-blue-600 font-semibold">blue</span> (current), <span className="text-gray-400 font-semibold">gray</span> (upcoming).</p>
        <Tip>Give customers their reference number when confirming orders. They can check status 24/7 without calling the office.</Tip>
      </Section>
    </TrainingGuide>
  );
}
