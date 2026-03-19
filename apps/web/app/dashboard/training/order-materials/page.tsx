'use client';

import { ShoppingCart } from 'lucide-react';
import TrainingGuide, { Section, Tip, Warning, Step } from '@/components/dashboard/TrainingGuide';

const SECTIONS = [
  { id: 'catalog', title: 'Materials Catalog' },
  { id: 'products', title: 'Product List & Pricing' },
  { id: 'delivery-zones', title: 'Delivery Zone Surcharges' },
  { id: 'bulk', title: 'Bulk & Contractor Pricing' },
  { id: 'pickup', title: 'Yard Pickup Option' },
];

export default function OrderMaterialsTraining() {
  return (
    <TrainingGuide
      title="Order Materials & Pricing"
      description="The materials catalog, delivery zones, pricing tiers, and contractor accounts."
      icon={ShoppingCart}
      difficulty="beginner"
      estimatedMinutes={6}
      lastUpdated="2026-03-19"
      sections={SECTIONS}
      prevModule={{ title: 'Quote Form & Calculator', href: '/dashboard/training/quotes-calculator' }}
      nextModule={{ title: 'Customer Tools', href: '/dashboard/training/customer-tools' }}
    >
      <Section id="catalog" title="Materials Catalog">
        <p>
          The Order Materials page at <code className="bg-gray-100 px-1 rounded">/order</code> is our product catalog.
          It displays all available materials with starting prices, specs, and minimum order quantities.
        </p>
        <p>Each product card includes:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Material name and icon</li>
          <li>Size specifications (e.g., &ldquo;3/4&rdquo; minus&rdquo;, &ldquo;2&rdquo; minus&rdquo;)</li>
          <li>Starting price per tonne</li>
          <li>Minimum order quantity</li>
          <li>&ldquo;Request Quote&rdquo; button (links to quote form with material pre-filled)</li>
        </ul>
      </Section>

      <Section id="products" title="Product List & Pricing">
        <p>Our catalog includes <strong>10 products</strong>:</p>
        <div className="border border-gray-200 rounded-lg overflow-hidden my-4">
          <table className="w-full text-sm">
            <thead><tr className="bg-gray-50 border-b border-gray-200">
              <th className="text-left px-4 py-2 text-xs font-semibold text-gray-500">Material</th>
              <th className="text-left px-4 py-2 text-xs font-semibold text-gray-500">Specs</th>
              <th className="text-left px-4 py-2 text-xs font-semibold text-gray-500">Common Uses</th>
            </tr></thead>
            <tbody>
              {[
                ['Road Crush (3/4")', '3/4" minus', 'Driveways, roads, parking lots'],
                ['Road Crush (1")', '1" minus', 'Heavy traffic roads, base layers'],
                ['Road Crush (2")', '2" minus', 'Road base, large fills'],
                ['Pit Run Gravel', 'Unprocessed', 'Fill, sub-base, drainage'],
                ['Washed Rock', '1/2" - 3/4"', 'Drainage, decorative, French drains'],
                ['Sand', 'Washed or pit', 'Concrete mix, leveling, sandboxes'],
                ['Topsoil', 'Screened', 'Lawns, gardens, landscaping'],
                ['Mulch', 'Bark or wood', 'Garden beds, playgrounds'],
                ['Decorative Stone', 'Various sizes', 'Landscaping, pathways, accents'],
                ['Rip Rap', 'Large stone', 'Erosion control, shoreline protection'],
              ].map(([name, spec, use]) => (
                <tr key={name} className="border-b border-gray-100 last:border-0">
                  <td className="px-4 py-2 font-medium text-gray-800">{name}</td>
                  <td className="px-4 py-2 text-gray-600">{spec}</td>
                  <td className="px-4 py-2 text-gray-500">{use}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Warning>Prices shown on the website are <strong>starting prices</strong>. Final quotes account for quantity, delivery distance, and current market conditions.</Warning>
      </Section>

      <Section id="delivery-zones" title="Delivery Zone Surcharges">
        <p>Delivery pricing varies by distance from our Hinton base:</p>
        <div className="border border-gray-200 rounded-lg overflow-hidden my-4">
          <table className="w-full text-sm">
            <thead><tr className="bg-gray-50 border-b border-gray-200">
              <th className="text-left px-4 py-2 text-xs font-semibold text-gray-500">Zone</th>
              <th className="text-left px-4 py-2 text-xs font-semibold text-gray-500">Surcharge</th>
            </tr></thead>
            <tbody>
              {[
                ['Hinton (local)', 'Included in base price'],
                ['Edson', '+$3.00/tonne'],
                ['Jasper', '+$4.00/tonne'],
                ['Grande Cache', '+$5.00/tonne'],
              ].map(([zone, surcharge]) => (
                <tr key={zone} className="border-b border-gray-100 last:border-0">
                  <td className="px-4 py-2 font-medium text-gray-800">{zone}</td>
                  <td className="px-4 py-2 text-gray-600">{surcharge}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Tip>For deliveries outside these standard zones, contact dispatch at <strong>(780) 865-0068</strong> for a custom delivery quote.</Tip>
      </Section>

      <Section id="bulk" title="Bulk & Contractor Pricing">
        <p>
          The order page includes a <strong>contractor account callout</strong> for regular customers who need
          recurring deliveries at volume pricing.
        </p>
        <p>Contractor accounts offer:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Volume discounts on all materials</li>
          <li>Net 30 payment terms (vs. COD for retail)</li>
          <li>Priority scheduling for deliveries</li>
          <li>Dedicated account manager (Todd Seabrook referenced)</li>
        </ul>
        <p>Customers interested in contractor accounts are directed to the contact page or dispatch line.</p>
      </Section>

      <Section id="pickup" title="Yard Pickup Option">
        <p>
          The page also mentions <strong>yard pickup</strong> as an alternative to delivery. Customers can load materials
          at our Hinton facility during business hours (Mon-Fri, 7 AM - 5 PM).
        </p>
        <p>Pickup eliminates the delivery surcharge and is ideal for customers with their own trucks.</p>
      </Section>
    </TrainingGuide>
  );
}
