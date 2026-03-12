import type { Metadata } from 'next';
import CareersClient from './CareersClient';

export const metadata: Metadata = {
  title: 'Careers',
  description:
    'Join the West Central Contracting team. View open positions and submit your resume. Family-owned since 1980, serving western Alberta.',
  openGraph: {
    title: 'Careers | West Central Contracting',
    description:
      'Join our team in Hinton, Alberta. Equipment operators, truck drivers, labourers, and more.',
  },
};

export default function CareersPage() {
  return <CareersClient />;
}
