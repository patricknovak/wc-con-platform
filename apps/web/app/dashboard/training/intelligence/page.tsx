'use client';

import { Lightbulb } from 'lucide-react';
import TrainingGuide, { Section, Tip, Warning } from '@/components/dashboard/TrainingGuide';

const SECTIONS = [
  { id: 'overview', title: 'Intelligence System Overview' },
  { id: 'upload', title: 'Document Upload' },
  { id: 'insights', title: 'AI Insights' },
  { id: 'knowledge', title: 'Knowledge Base' },
];

export default function IntelligenceTraining() {
  return (
    <TrainingGuide
      title="Intelligence & Document Analysis"
      description="Uploading documents, AI pricing insights, demand forecasting, and knowledge base management."
      icon={Lightbulb}
      difficulty="advanced"
      estimatedMinutes={10}
      lastUpdated="2026-03-19"
      sections={SECTIONS}
      prevModule={{ title: 'Team Management', href: '/dashboard/training/team' }}
      nextModule={{ title: 'Marketing', href: '/dashboard/training/marketing' }}
    >
      <Section id="overview" title="Intelligence System Overview">
        <p>
          The Intelligence page at <code className="bg-gray-100 px-1 rounded">/dashboard/intelligence</code> is the AI
          analytics engine. It processes documents, extracts pricing data, and generates business insights.
        </p>
        <p>Summary cards show: Documents Processed (this month), Pricing Data Points in knowledge base, and Average Quote Accuracy.</p>
      </Section>

      <Section id="upload" title="Document Upload">
        <p>Upload documents using the <strong>drag-and-drop zone</strong> or file selector button. Supported documents:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Competitor price lists</li>
          <li>Supplier invoices and quotes</li>
          <li>Government rate schedules</li>
          <li>Historical pricing data</li>
          <li>RFP documents with pricing requirements</li>
        </ul>
        <p>The system processes uploaded documents and extracts structured pricing data, which feeds into the knowledge base.</p>
        <p>Recent uploads show: file name, upload timestamp, and number of items processed (e.g., &ldquo;52 items processed&rdquo;).</p>
        <Tip>Upload competitor price lists regularly. The AI compares them against our pricing to identify opportunities where we&rsquo;re overpricing or leaving money on the table.</Tip>
      </Section>

      <Section id="insights" title="AI Insights">
        <p>The system generates three types of insight cards:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong>Pricing Trends</strong> — Tracks material price movements over time.
            Example: &ldquo;Crushed stone prices up 2.3% across the region. Consider adjusting quotes accordingly.&rdquo;
          </li>
          <li>
            <strong>Seasonal Demand</strong> — Predicts upcoming demand shifts.
            Example: &ldquo;Spring equipment rentals typically increase 35% in April. Ensure fleet availability.&rdquo;
          </li>
          <li>
            <strong>Customer Segments</strong> — Identifies patterns in customer behavior.
            Example: &ldquo;Municipal leads take 40% longer to close but have 3x higher average order value.&rdquo;
          </li>
        </ul>
        <p>These insights are generated automatically from the processed documents and historical data.</p>
      </Section>

      <Section id="knowledge" title="Knowledge Base">
        <p>
          The knowledge base is the central repository of pricing data that powers the AI tools. It feeds into:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>The voice agent (accurate pricing for phone callers)</li>
          <li>The chat widget (material pricing responses)</li>
          <li>Quote accuracy scoring (benchmarking against market rates)</li>
          <li>Opportunity matching (capability and pricing alignment)</li>
        </ul>
        <p>Click <strong>&ldquo;Update Knowledge Base&rdquo;</strong> to refresh all connected systems with the latest data.</p>
        <Warning>The knowledge base affects multiple customer-facing tools. Only upload verified pricing data. Incorrect data could lead to inaccurate quotes from the voice agent or chat bot.</Warning>
      </Section>
    </TrainingGuide>
  );
}
