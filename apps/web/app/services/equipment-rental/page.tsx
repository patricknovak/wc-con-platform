import type { Metadata } from 'next';
import EquipmentClient from './EquipmentClient';

export const metadata: Metadata = {
  title: 'Equipment Rental | Hinton & Western Alberta',
  description:
    'Rent excavators, dozers, loaders, skid steers, graders and compaction equipment in Hinton, Edson, Jasper & western Alberta. Flexible daily, weekly, monthly rates with delivery.',
  openGraph: {
    title: 'Equipment Rental | West Central Contracting',
    description:
      'Quality construction equipment rentals with delivery across western Alberta. Excavators, dozers, loaders, skid steers & more.',
  },
  keywords: [
    'equipment rental Hinton',
    'excavator rental Alberta',
    'dozer rental Edson',
    'construction equipment rental western Alberta',
    'skid steer rental Jasper',
    'heavy equipment Hinton AB',
  ],
};

export default function EquipmentRentalPage() {
  return <EquipmentClient />;
}
