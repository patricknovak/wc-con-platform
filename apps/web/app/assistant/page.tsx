import type { Metadata } from 'next';
import AssistantClient from './AssistantClient';

export const metadata: Metadata = {
  title: 'AI Project Assistant',
  description:
    'Chat or speak with our AI assistant to discuss your project, get material estimates, and receive a custom quote. Available 24/7.',
  openGraph: {
    title: 'AI Project Assistant | West Central Contracting',
    description:
      'Chat or speak with our AI assistant to scope your project and get a quote.',
  },
};

export default function AssistantPage() {
  return <AssistantClient />;
}
