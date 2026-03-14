'use client';

import Link from 'next/link';
import {
  ChevronRight,
  Truck,
  Pickaxe,
  Hammer,
  Wrench,
  Trees,
  Zap,
  MapPin,
  Clock,
  Phone,
  Star,
  TrendingUp,
  Droplets,
  CheckCircle,
  HardHat,
} from 'lucide-react';

const services = [
  { name: 'Trucking Services', icon: Truck, href: '/services', available: true },
  { name: 'Aggregate Sales', icon: Pickaxe, href: '/services/aggregate-sales', available: true },
  { name: 'Gravel Crushing', icon: Hammer, href: '/services/aggregate-sales', available: true },
  { name: 'Equipment Rental', icon: Wrench, href: '/services/equipment-rental', available: true },
  { name: 'Landscaping Supplies', icon: Trees, href: '/services/landscaping-supplies', available: false },
  { name: 'Concrete Products', icon: Zap, href: '/services/concrete', available: false },
  { name: 'Environmental Remediation', icon: Droplets, href: '/services/remediation', available: true },
];

export default function DraytonValleyServiceAreaPage() {
  return (
    <div className="bg-white">
      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="container-wide section-padding py-4">
          <div className="flex items-center text-sm text-gray-600">
            <Link href="/" className="hover:text-brand-red">Home</Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            <Link href="/service-areas" className="hover:text-brand-red">Service Areas</Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            <span className="text-brand-charcoal font-semibold">Drayton Valley</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-brand-charcoal via-gray-800 to-brand-charcoal text-white">
        <div className="container-wide">
          <div className="flex items-center text-brand-red font-semibold mb-3">
            <MapPin className="w-5 h-5 mr-2" />
            2.5 Hours Southeast of Hinton
          </div>
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">
            Aggregate &amp; Trucking Services in Drayton Valley
          </h1>
          <p className="text-lg text-gray-200 max-w-2xl mb-8">
            West Central Contracting delivers quality aggregates, trucking, and
            environmental services to Drayton Valley and Brazeau County.
            Supporting the region&apos;s oil &amp; gas operations, municipal
            infrastructure, and construction projects since 1980.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/quote"
              className="btn-primary inline-flex items-center justify-center px-8 py-3 font-semibold rounded-lg"
            >
              Request a Quote
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding">
        <div className="container-wide">
          <h2 className="font-heading text-3xl font-bold text-brand-charcoal mb-8">
            Available Services in Drayton Valley
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => {
              const IconComponent = service.icon;
              return (
                <Link key={service.name} href={service.href} className="group">
                  <div className="flex items-center p-6 rounded-lg border-2 border-gray-200 hover:border-brand-red hover:shadow-lg transition-all">
                    <IconComponent className="w-10 h-10 text-brand-red mr-4 flex-shrink-0" />
                    <div>
                      <h3 className="font-heading text-lg font-bold text-brand-charcoal group-hover:text-brand-red transition-colors">
                        {service.name}
                      </h3>
                      <p className={`text-sm font-semibold ${service.available ? 'text-brand-red' : 'text-gray-400'}`}>
                        {service.available ? 'Available' : 'Contact for availability'}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Delivery Info */}
      <section className="section-padding bg-gray-50">
        <div className="container-wide">
          <h2 className="font-heading text-3xl font-bold text-brand-charcoal mb-8">
            Delivery Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg border border-gray-200">
              <MapPin className="w-8 h-8 text-brand-red mb-4" />
              <h3 className="font-heading text-xl font-bold text-brand-charcoal mb-2">
                2.5 Hr from Hinton
              </h3>
              <p className="text-gray-700">
                Located southeast via Highway 16 and Highway 22, Drayton Valley
                is part of our expanding service territory in Brazeau County.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg border border-gray-200">
              <Clock className="w-8 h-8 text-brand-red mb-4" />
              <h3 className="font-heading text-xl font-bold text-brand-charcoal mb-2">
                Advance Scheduling
              </h3>
              <p className="text-gray-700">
                Deliveries to Drayton Valley are coordinated in advance for
                optimal logistics. Contact dispatch to schedule your delivery
                window.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg border border-gray-200">
              <TrendingUp className="w-8 h-8 text-brand-red mb-4" />
              <h3 className="font-heading text-xl font-bold text-brand-charcoal mb-2">
                Competitive Bulk Pricing
              </h3>
              <p className="text-gray-700">
                We offer competitive bulk pricing for large construction, oil
                &amp; gas, and municipal projects in the Drayton Valley area.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Oil & Gas Context */}
      <section className="section-padding">
        <div className="container-wide">
          <h2 className="font-heading text-3xl font-bold text-brand-charcoal mb-8">
            Supporting Drayton Valley&apos;s Oil &amp; Gas Sector
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-4 text-gray-700">
              <p>
                Drayton Valley and Brazeau County are at the heart of
                Alberta&apos;s oil and gas activity, with significant drilling,
                production, and pipeline operations throughout the region. West
                Central Contracting has decades of experience supporting energy
                sector projects with aggregate supply, heavy hauling, and
                environmental remediation services.
              </p>
              <p>
                From lease site preparation and access road construction to
                pipeline right-of-way work and wellsite reclamation, our team
                understands the unique demands of oil and gas operations. We are
                COR Certified, ISNetworld compliant, and registered with
                ComplyWorks to meet industry safety and compliance requirements.
              </p>
              <div className="space-y-2 mt-6">
                {[
                  'Lease site preparation and construction',
                  'Access road building and maintenance',
                  'Pipeline ROW aggregate supply',
                  'Wellsite reclamation and remediation',
                  'Contaminated soil removal and transport',
                  'Ongoing aggregate supply contracts',
                ].map((item) => (
                  <div key={item} className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-brand-red mr-3 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-6">
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <HardHat className="w-8 h-8 text-brand-red mb-3" />
                <h3 className="font-heading text-lg font-bold text-brand-charcoal mb-2">
                  Municipal &amp; Infrastructure
                </h3>
                <p className="text-gray-700 text-sm">
                  We supply aggregates for Brazeau County road projects, Town of
                  Drayton Valley infrastructure upgrades, and regional municipal
                  construction programs.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <Truck className="w-8 h-8 text-brand-red mb-3" />
                <h3 className="font-heading text-lg font-bold text-brand-charcoal mb-2">
                  Heavy Hauling Capability
                </h3>
                <p className="text-gray-700 text-sm">
                  Our fleet includes belly dumps, end dumps, truck &amp; pups,
                  and lowbeds to handle any hauling requirement for Drayton
                  Valley projects.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <Droplets className="w-8 h-8 text-brand-red mb-3" />
                <h3 className="font-heading text-lg font-bold text-brand-charcoal mb-2">
                  Environmental Services
                </h3>
                <p className="text-gray-700 text-sm">
                  Full environmental remediation services including lease
                  reclamation, contaminated soil removal, and pipeline ROW
                  restoration for Drayton Valley operators.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Local Projects */}
      <section className="section-padding bg-gray-50">
        <div className="container-wide">
          <h2 className="font-heading text-3xl font-bold text-brand-charcoal mb-8">
            Serving Drayton Valley &amp; Brazeau County
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg border-l-4 border-brand-red shadow-md">
              <Star className="w-6 h-6 text-brand-red mb-3" />
              <p className="text-gray-700 italic mb-4">
                &ldquo;We brought in West Central Contracting for a large
                Brazeau County road project. Even at the distance, their pricing
                was competitive and the material quality matched their
                reputation. They have become our go-to supplier for the
                region.&rdquo;
              </p>
              <p className="font-semibold text-brand-charcoal">
                Brazeau County Project Coordinator
              </p>
            </div>
            <div>
              <h3 className="font-heading text-xl font-bold text-brand-charcoal mb-4">
                Local Project Highlights
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-brand-red mr-3 mt-1 font-bold">&bull;</span>
                  Brazeau County road construction and upgrade projects
                </li>
                <li className="flex items-start">
                  <span className="text-brand-red mr-3 mt-1 font-bold">&bull;</span>
                  Oil and gas lease site preparation and access roads
                </li>
                <li className="flex items-start">
                  <span className="text-brand-red mr-3 mt-1 font-bold">&bull;</span>
                  Municipal infrastructure development in Drayton Valley
                </li>
                <li className="flex items-start">
                  <span className="text-brand-red mr-3 mt-1 font-bold">&bull;</span>
                  Commercial and industrial construction aggregate supply
                </li>
                <li className="flex items-start">
                  <span className="text-brand-red mr-3 mt-1 font-bold">&bull;</span>
                  Pipeline corridor aggregate and trucking services
                </li>
                <li className="flex items-start">
                  <span className="text-brand-red mr-3 mt-1 font-bold">&bull;</span>
                  Wellsite remediation and reclamation projects
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-brand-red text-white">
        <div className="container-wide text-center">
          <h2 className="font-heading text-3xl font-bold mb-4">
            Need Aggregate or Trucking in Drayton Valley?
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto text-red-100">
            From oil and gas site work to Brazeau County construction, we
            deliver quality aggregates and services to the Drayton Valley area.
            Get a quote today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/quote"
              className="inline-flex items-center px-8 py-3 bg-white text-brand-red font-semibold rounded-lg hover:bg-gray-100 transition-colors"
            >
              Request a Quote
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center px-8 py-3 bg-red-700 text-white font-semibold rounded-lg hover:bg-red-800 transition-colors border-2 border-red-600"
            >
              Contact Us
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
