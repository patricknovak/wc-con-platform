import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Material Calculator',
  description:
    'Calculate aggregate tonnage needed for your project using our material calculator.',
  openGraph: {
    title: 'Material Calculator | West Central Contracting',
    description: 'Estimate aggregate tonnage for your construction project.',
  },
};

export default function CalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
