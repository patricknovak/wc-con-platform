import type { Metadata } from 'next';
import ConcreteClient from './ConcreteClient';

export const metadata: Metadata = {
  title: 'Pre-Cast Concrete Products | Lego Blocks, Barriers | Hinton AB',
  description:
    'Pre-cast concrete lego blocks, jersey barriers, flat-top blocks, and decorative concrete in Hinton & western Alberta. Interlocking blocks for retaining walls, storage bins & barriers.',
  openGraph: {
    title: 'Pre-Cast Concrete Products | West Central Contracting',
    description:
      'Interlocking lego blocks, jersey barriers, and decorative concrete. Crane delivery across western Alberta.',
  },
  keywords: [
    'concrete lego blocks Alberta',
    'pre-cast concrete Hinton',
    'jersey barriers Alberta',
    'interlocking concrete blocks',
    'retaining wall blocks Edson',
    'concrete barriers western Alberta',
    'lego block wall calculator',
    'pre-cast concrete products',
  ],
};

export default function ConcretePage() {
  return <ConcreteClient />;
}
