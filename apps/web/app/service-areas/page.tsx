'use client';

import Link from 'next/link';
import {
  ChevronRight,
  MapPin,
  Truck,
  Phone,
  Clock,
  ArrowRight,
} from 'lucide-react';

const serviceAreas = [
  {
    name: 'Hinton',
    slug: 'hinton',
    distance: 'Home Base',
    description: 'Our headquarters since 1980. All services available with same-day delivery.',
    highlight: '7 pit locations nearby',
  },
  {
    name: 'Edson',
    slug: 'edson',
    distance: '35 min east',
    description: 'Regular delivery runs serving Yellowhead County construction and municipal projects.',
    highlight: 'All services available',
  },
  {
    name: 'Jasper',
    slug: 'jasper',
    distance: '30 min west',
    description: 'Aggregate delivery for construction, tourism infrastructure, and wildfire recovery.',
    highlight: 'Parks Canada projects',
  },
  {
    name: 'Grande Cache',
    slug: 'grande-cache',
    distance: '1 hr north',
    description: 'Aggregate and trucking services supporting mining and municipal projects.',
    highlight: 'Mining industry support',
  },
  {
    name: 'Whitecourt',
    slug: 'whitecourt',
    distance: '2 hr east',
    description: 'Aggregate delivery for oil & gas and municipal projects in Woodlands County.',
    highlight: 'Expansion market',
  },
  {
    name: 'Drayton Valley',
    slug: 'drayton-valley',
    distance: '2.5 hr southeast',
    description: 'Aggregate supply for Brazeau County construction and oil & gas support.',
    highlight: 'Expansion market',
  },
];

export default function ServiceAreasPage() {
  return (
    <div className="bg-white">
      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="container-wide section-padding py-4">
          <div className="flex items-center text-sm text-gray-600">
            <Link href="/" className="hover:text-brand-red">
              Home
            </Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            <span className="text-brand-charcoal font-semibold">Service Areas</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="section-padding bg-brand-charcoal text-white">
        <div className="container-wide">
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">
            Service Areas — Western Alberta
          </h1>
          <p className="text-lg text-gray-200 max-w-2xl">
            From our home base in Hinton, West Central Contracting delivers quality
            aggregates, trucking, and construction services across western Alberta.
            Family-owned since 1980, we know this region inside and out.
          </p>
        </div>
      </section>

      {/* Area Cards Grid */}
      <section className="section-padding">
        <div className="container-wide">
          <h2 className="font-heading text-3xl font-bold text-brand-charcoal mb-4">
            Communities We Serve
          </h2>
          <p className="text-gray-700 mb-12 max-w-2xl">
            We provide reliable aggregate delivery and contracting services to communities
            throughout the Yellowhead corridor and beyond. All distances measured from our
            Hinton headquarters.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {serviceAreas.map((area) => (
              <Link
                key={area.slug}
                href={`/service-areas/${area.slug}`}
                className="group"
              >
                <div className="h-full rounded-lg border-2 border-gray-200 p-8 hover:border-brand-red hover:shadow-lg transition-all">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center">
                      <MapPin className="w-5 h-5 text-brand-red mr-2" />
                      <h3 className="font-heading text-2xl font-bold text-brand-charcoal group-hover:text-brand-red transition-colors">
                        {area.name}
                      </h3>
                    </div>
                  </div>
                  <div className="flex items-center text-sm text-brand-red font-semibold mb-3">
                    <Clock className="w-4 h-4 mr-1" />
                    {area.distance}
                  </div>
                  <p className="text-gray-700 mb-4">{area.description}</p>
                  <p className="text-sm font-semibold text-brand-charcoal mb-4">
                    {area.highlight}
                  </p>
                  <div className="inline-flex items-center text-brand-red font-semibold group-hover:translate-x-2 transition-transform">
                    View Details
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Coverage Map Description */}
      <section className="section-padding bg-gray-50">
        <div className="container-wide">
          <h2 className="font-heading text-3xl font-bold text-brand-charcoal mb-8 text-center">
            Our Coverage Area
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="font-heading text-xl font-bold text-brand-charcoal mb-4">
                Yellowhead Corridor
              </h3>
              <p className="text-gray-700 mb-4">
                Our primary service corridor follows Highway 16 from Jasper National Park
                through Hinton and Edson, extending east toward Whitecourt and south to
                Drayton Valley. This route allows us to efficiently serve communities along
                the Yellowhead Highway.
              </p>
              <h3 className="font-heading text-xl font-bold text-brand-charcoal mb-4">
                Northern Reach
              </h3>
              <p className="text-gray-700">
                We serve Grande Cache and surrounding areas via Highway 40, supporting
                mining operations, municipal infrastructure, and residential construction
                projects throughout the region.
              </p>
            </div>
            <div>
              <h3 className="font-heading text-xl font-bold text-brand-charcoal mb-4">
                Delivery Capabilities
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start text-gray-700">
                  <Truck className="w-5 h-5 text-brand-red mr-3 mt-0.5 flex-shrink-0" />
                  Same-day delivery available within Hinton and surrounding area
                </li>
                <li className="flex items-start text-gray-700">
                  <Truck className="w-5 h-5 text-brand-red mr-3 mt-0.5 flex-shrink-0" />
                  Next-day delivery for Edson, Jasper, and Grande Cache
                </li>
                <li className="flex items-start text-gray-700">
                  <Truck className="w-5 h-5 text-brand-red mr-3 mt-0.5 flex-shrink-0" />
                  Scheduled deliveries to Whitecourt and Drayton Valley
                </li>
                <li className="flex items-start text-gray-700">
                  <Truck className="w-5 h-5 text-brand-red mr-3 mt-0.5 flex-shrink-0" />
                  Custom delivery arrangements for large-scale projects
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-brand-red text-white">
        <div className="container-wide text-center">
          <h2 className="font-heading text-3xl font-bold mb-4">
            Need a Delivery Quote?
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto text-red-100">
            Contact our dispatch team for delivery pricing to your area. We offer
            competitive rates and flexible scheduling for all project sizes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/quote"
              className="inline-flex items-center px-8 py-3 bg-white text-brand-red font-semibold rounded-lg hover:bg-gray-100 transition-colors"
            >
              Request a Quote
            </Link>
            <a
              href="tel:7808653000"
              className="inline-flex items-center px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-red-700 transition-colors"
            >
              <Phone className="w-5 h-5 mr-2" />
              (780) 865-3000
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
