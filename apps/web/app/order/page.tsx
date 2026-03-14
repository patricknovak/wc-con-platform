'use client';

import Link from 'next/link';
import {
  ChevronRight,
  Truck,
  Package,
  MapPin,
  Phone,
  CheckCircle,
  DollarSign,
  Layers,
  Mountain,
  Droplets,
  TreePine,
  Gem,
  Shield,
  Calculator,
} from 'lucide-react';

/* SEO metadata for "order aggregate online hinton" —
   set via layout.tsx or generateMetadata in a parent route segment:
   title: "Order Aggregates Online | Hinton AB | West Central Contracting"
   description: "Order road crush, gravel, sand, topsoil and landscaping materials
   online from West Central Contracting in Hinton, AB. Bulk aggregate delivery
   across western Alberta since 1980."
*/

const materials = [
  {
    name: 'Road Crush (3/4")',
    description:
      'Fine crushed aggregate ideal for driveways, walkways, and compacting base layers. Excellent drainage and stability.',
    sizes: '3/4" minus',
    priceFrom: 18,
    minOrder: '10 tonnes',
    icon: Mountain,
  },
  {
    name: 'Road Crush (1.5")',
    description:
      'Medium crushed rock for road base, parking lots, and heavy-traffic surfaces. Angular profile locks tight under compaction.',
    sizes: '1.5" minus',
    priceFrom: 16,
    minOrder: '10 tonnes',
    icon: Mountain,
  },
  {
    name: 'Road Crush (2.5")',
    description:
      'Coarse crushed aggregate for deep base fill, road subgrade, and heavy industrial site pad foundations. Maximum load-bearing capacity.',
    sizes: '2.5" minus',
    priceFrom: 14,
    minOrder: '10 tonnes',
    icon: Mountain,
  },
  {
    name: 'Pit Run Gravel',
    description:
      'Unprocessed natural gravel straight from the pit. Cost-effective for fill, backfill, and rough grading applications.',
    sizes: 'Mixed natural',
    priceFrom: 12,
    minOrder: '10 tonnes',
    icon: Layers,
  },
  {
    name: 'Washed Rock',
    description:
      'Clean, washed aggregate for landscaping, drainage systems, and decorative applications. Available in multiple sizes.',
    sizes: '1/2" to 2"',
    priceFrom: 24,
    minOrder: '5 tonnes',
    icon: Droplets,
  },
  {
    name: 'Sand',
    description:
      'Screened sand for concrete mixing, pipe bedding, paving stone installation, and general construction applications.',
    sizes: 'Fine & coarse',
    priceFrom: 15,
    minOrder: '5 tonnes',
    icon: Layers,
  },
  {
    name: 'Topsoil',
    description:
      'Rich, screened topsoil for lawns, gardens, raised beds, and landscaping projects. Promotes healthy plant growth.',
    sizes: 'Screened',
    priceFrom: 25,
    minOrder: '5 cubic yards',
    icon: TreePine,
  },
  {
    name: 'Mulch',
    description:
      'Natural wood mulch for garden beds, pathways, and playground surfaces. Retains moisture and suppresses weeds.',
    sizes: 'Standard chip',
    priceFrom: 30,
    minOrder: '5 cubic yards',
    icon: TreePine,
  },
  {
    name: 'Decorative Stone',
    description:
      'Rainbow rock, river rock, and specialty decorative stone for premium landscaping, water features, and accent areas.',
    sizes: 'Various',
    priceFrom: 35,
    minOrder: '3 tonnes',
    icon: Gem,
  },
  {
    name: 'Rip Rap',
    description:
      'Large angular rock for shoreline protection, slope stabilization, culvert armoring, and erosion control projects.',
    sizes: '6" to 24"',
    priceFrom: 22,
    minOrder: '10 tonnes',
    icon: Shield,
  },
];

const deliveryZones = [
  {
    zone: 'Hinton & Area',
    surcharge: 'Included',
    note: 'Local delivery within 15 km of our yard',
  },
  {
    zone: 'Edson',
    surcharge: '$3/tonne',
    note: '~80 km east on Highway 16',
  },
  {
    zone: 'Jasper',
    surcharge: '$4/tonne',
    note: '~80 km west on Highway 16',
  },
  {
    zone: 'Grande Cache',
    surcharge: '$5/tonne',
    note: '~140 km north on Highway 40',
  },
];

export default function OrderPage() {
  return (
    <div className="bg-white">
      {/* Breadcrumb */}
      <div className="bg-brand-gray-light border-b border-gray-200">
        <div className="container-wide section-padding py-4">
          <div className="flex items-center text-sm text-brand-gray-mid">
            <Link href="/" className="hover:text-brand-red">
              Home
            </Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            <span className="text-brand-charcoal font-semibold">
              Order Materials
            </span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-brand-charcoal via-gray-900 to-brand-charcoal text-white min-h-[350px] flex items-center">
        <div className="container-wide">
          <div className="flex items-center gap-3 mb-4">
            <Package className="w-10 h-10 text-brand-red" />
            <h1 className="font-heading text-4xl md:text-5xl font-bold">
              Order Materials Online
            </h1>
          </div>
          <p className="text-lg text-gray-200 max-w-2xl mb-6">
            Browse our full catalog of aggregates, sand, landscaping materials,
            and specialty products. Available for pickup or delivery across
            western Alberta from our yard at 450 East River Road, Hinton, AB.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/quote"
              className="btn-primary inline-flex items-center justify-center"
            >
              Request a Custom Quote
            </Link>
            <a
              href="tel:7808653000"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors"
            >
              <Phone className="w-5 h-5" />
              (780) 865-3000
            </a>
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="section-padding">
        <div className="container-wide">
          <h2 className="font-heading text-3xl font-bold text-brand-charcoal mb-4">
            Materials Catalog
          </h2>
          <p className="text-brand-gray-mid mb-12 max-w-3xl">
            Quality aggregates and landscaping materials from West Central
            Contracting. Family-owned by Todd Seabrook and serving Hinton, Edson,
            Jasper, Grande Cache, and all of western Alberta since 1980.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {materials.map((material) => {
              const IconComponent = material.icon;
              return (
                <div
                  key={material.name}
                  className="bg-brand-cream border-2 border-gray-200 rounded-lg p-8 hover:border-brand-red transition-colors hover:shadow-lg flex flex-col"
                >
                  <div className="flex items-start justify-between mb-4">
                    <IconComponent className="w-10 h-10 text-brand-red" />
                    <span className="text-2xl font-bold text-brand-red">
                      From ${material.priceFrom}
                      <span className="text-sm font-normal text-brand-gray-mid">
                        /tonne
                      </span>
                    </span>
                  </div>
                  <h3 className="font-heading text-xl font-bold text-brand-charcoal mb-2">
                    {material.name}
                  </h3>
                  <p className="text-sm text-brand-red font-semibold mb-3">
                    Sizes: {material.sizes}
                  </p>
                  <p className="text-brand-gray-mid text-sm mb-4 flex-1">
                    {material.description}
                  </p>
                  <div className="text-xs text-brand-gray-mid mb-4">
                    Minimum order: {material.minOrder}
                  </div>
                  <Link
                    href={`/quote?material=${encodeURIComponent(material.name)}`}
                    className="btn-primary text-center w-full"
                  >
                    Request Quote
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bulk Pricing Callout */}
      <section className="section-padding bg-brand-charcoal text-white">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <DollarSign className="w-10 h-10 text-brand-red" />
                <h2 className="font-heading text-3xl font-bold">
                  Contractor Bulk Pricing
                </h2>
              </div>
              <p className="text-gray-300 text-lg mb-6">
                Ordering 10+ loads? Contractors and commercial customers receive
                volume discounts on all aggregate products. The more you order,
                the more you save.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  'Volume discounts on orders of 10+ loads',
                  'Dedicated dispatch line: (780) 865-0068',
                  'Priority scheduling for repeat customers',
                  'Net 30 terms available for qualified accounts',
                  'Custom material specs processed to your requirements',
                  'Seasonal contracts for ongoing projects',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-brand-red mt-0.5 flex-shrink-0" />
                    <span className="text-gray-200">{item}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/contact"
                className="inline-flex items-center px-8 py-3 bg-brand-red text-white font-semibold rounded-lg hover:bg-red-700 transition-colors"
              >
                Set Up a Contractor Account
              </Link>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-lg p-8">
              <h3 className="font-heading text-2xl font-bold mb-6">
                Bulk Order Benefits
              </h3>
              <div className="space-y-5">
                <div className="border-b border-gray-600 pb-4">
                  <div className="text-3xl font-bold text-brand-red">
                    10+ Loads
                  </div>
                  <p className="text-gray-400">Volume pricing unlocked</p>
                </div>
                <div className="border-b border-gray-600 pb-4">
                  <div className="text-3xl font-bold text-brand-red">
                    Same Day
                  </div>
                  <p className="text-gray-400">
                    Priority dispatch for contractors
                  </p>
                </div>
                <div className="border-b border-gray-600 pb-4">
                  <div className="text-3xl font-bold text-brand-red">
                    7 Pits
                  </div>
                  <p className="text-gray-400">Consistent supply guaranteed</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-brand-red">
                    Net 30
                  </div>
                  <p className="text-gray-400">
                    Credit terms for qualified accounts
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Delivery Zones */}
      <section className="section-padding bg-brand-gray-light">
        <div className="container-wide">
          <div className="flex items-center gap-3 mb-4">
            <Truck className="w-8 h-8 text-brand-red" />
            <h2 className="font-heading text-3xl font-bold text-brand-charcoal">
              Delivery Zones & Pricing
            </h2>
          </div>
          <p className="text-brand-gray-mid mb-8 max-w-3xl">
            We deliver throughout western Alberta from our base at 450 East
            River Road, Hinton, AB. Delivery surcharges vary by distance.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {deliveryZones.map((zone) => (
              <div
                key={zone.zone}
                className="bg-white p-6 rounded-lg border border-gray-200 hover:border-brand-red hover:shadow-lg transition-all"
              >
                <MapPin className="w-6 h-6 text-brand-red mb-3" />
                <h3 className="font-heading text-lg font-bold text-brand-charcoal mb-1">
                  {zone.zone}
                </h3>
                <p className="text-xl font-bold text-brand-red mb-2">
                  {zone.surcharge}
                </p>
                <p className="text-sm text-brand-gray-mid">{zone.note}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 bg-white p-6 rounded-lg border-l-4 border-brand-red">
            <p className="text-brand-gray-mid">
              <strong className="text-brand-charcoal">Pickup available</strong>{' '}
              at our Hinton yard during business hours (Monday&ndash;Friday,
              7 AM &ndash; 5 PM). No minimum for pickup orders. Contact us for
              delivery quotes outside listed zones.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-brand-red text-white">
        <div className="container-wide text-center">
          <h2 className="font-heading text-3xl font-bold mb-4">
            Ready to Order?
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto text-red-100">
            Use our material calculator to estimate your needs, request a quote
            online, or call our team directly. Family-owned and serving western
            Alberta since 1980.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/calculator"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-white text-brand-red font-semibold rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Calculator className="w-5 h-5" />
              Material Calculator
            </Link>
            <Link
              href="/quote"
              className="inline-flex items-center justify-center px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-red-700 transition-colors"
            >
              Request Quote
            </Link>
            <a
              href="tel:7808653000"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-red-700 transition-colors"
            >
              <Phone className="w-5 h-5" />
              (780) 865-3000
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
