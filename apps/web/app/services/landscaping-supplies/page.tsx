import type { Metadata } from 'next';
import LandscapingClient from './LandscapingClient';

export const metadata: Metadata = {
  title: 'Landscaping Supplies | Topsoil, Mulch, Decorative Rock | Hinton AB',
  description:
    'Premium landscaping materials in Hinton, Edson & western Alberta. Topsoil, mulch, decorative stone, rainbow rock, pea gravel, boulders & more. Bulk delivery available.',
  openGraph: {
    title: 'Landscaping Supplies | West Central Contracting',
    description:
      'Topsoil, mulch, decorative stone, boulders and more. Delivered across western Alberta from our 7 pit locations.',
  },
  keywords: [
    'landscaping supplies Hinton',
    'topsoil delivery Alberta',
    'mulch Hinton AB',
    'decorative rock Edson',
    'landscaping materials western Alberta',
    'pea gravel Jasper',
    'rainbow rock Alberta',
    'bulk landscaping materials',
  ],
};

export default function LandscapingSuppliesPage() {
  return <LandscapingClient />;
}
