'use client';

import Link from 'next/link';
import {
  ChevronRight,
  MapPin,
  Truck,
  TreePine,
  Shield,
  Clock,
  CheckCircle,
  Phone,
  ArrowRight,
  Mountain,
  Wrench,
  CalendarDays,
  Package,
  HardHat,
} from 'lucide-react';

const recoveryServices = [
  {
    title: 'Aggregate Supply for Reconstruction',
    description:
      'Road crush, fill, bedding materials, and specialty aggregates for campground reconstruction, road rebuilding, and infrastructure restoration throughout the Jasper corridor. Sourced from 7 local pit locations.',
    icon: Mountain,
  },
  {
    title: 'Trucking to Jasper Corridor',
    description:
      'Full fleet of belly dumps, end dumps, and flatdecks for efficient material delivery along Highway 16 and throughout Jasper National Park. Just 30 minutes from our Hinton base.',
    icon: Truck,
  },
  {
    title: 'Equipment Rental',
    description:
      'Excavators, loaders, dozers, and graders available for site preparation, demolition, and reconstruction projects in the recovery zone. Well-maintained fleet ready for immediate mobilization.',
    icon: Wrench,
  },
  {
    title: 'Site Preparation',
    description:
      'Comprehensive site work including clearing, grading, foundation preparation, and utility corridor construction for new builds, rebuilds, and campground restoration.',
    icon: HardHat,
  },
  {
    title: 'Debris Removal',
    description:
      'Post-fire debris clearing, demolition waste hauling, and site cleanup services to prepare damaged areas for reconstruction and environmental restoration.',
    icon: Package,
  },
  {
    title: 'Environmental Remediation',
    description:
      'Post-fire land restoration, erosion control, slope stabilization, and revegetation support to restore Jasper\'s natural landscape and prevent further environmental damage.',
    icon: TreePine,
  },
];

const timelinePhases = [
  {
    phase: 'Campground Reconstruction',
    timeline: '2025 - 2027',
    description:
      'Wabasso, Whirlpool, and Marmot Meadows campgrounds require full reconstruction including road networks, servicing pads, drainage systems, and visitor infrastructure.',
  },
  {
    phase: 'Housing Rebuilds',
    timeline: 'Ongoing',
    description:
      'New 40-unit Connaught Drive development, 162 interim housing trailers, and private residential rebuilds requiring aggregate, site prep, and construction support.',
  },
  {
    phase: 'Trail & Road Restoration',
    timeline: '2025 - 2028',
    description:
      'Rebuilding hiking trails, day-use areas, park roads, signage, and visitor infrastructure across fire-affected zones of Jasper National Park.',
  },
  {
    phase: 'Infrastructure & Utilities',
    timeline: '2025 - 2027',
    description:
      'Water, sewer, electrical, and telecommunications infrastructure repair and replacement throughout the affected areas of town and park.',
  },
];

const stats = [
  { value: '45+', label: 'Years Experience' },
  { value: '7', label: 'Pit Locations' },
  { value: '30 min', label: 'Hinton to Jasper' },
  { value: 'COR', label: 'Certified' },
];

export default function JasperRecoveryPage() {
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
              Jasper Wildfire Recovery
            </span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative section-padding bg-gradient-to-br from-brand-charcoal via-gray-900 to-brand-charcoal text-white min-h-[400px] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-900/30 via-brand-charcoal/80 to-brand-charcoal/90" />
        <div className="relative container-wide">
          <div className="flex items-center gap-3 mb-4">
            <TreePine className="w-10 h-10 text-orange-400" />
            <span className="bg-orange-500/20 text-orange-300 text-sm font-semibold px-3 py-1 rounded-full">
              Recovery &amp; Rebuilding
            </span>
          </div>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Jasper Wildfire Recovery Services
          </h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-3xl mb-8">
            West Central Contracting stands ready to support the rebuilding of
            Jasper. Based just 30 minutes away in Hinton, AB, we bring 45+ years
            of aggregate, trucking, and construction experience to one of
            Canada&apos;s most important recovery efforts.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-brand-red text-white font-semibold rounded-lg hover:bg-red-700 transition-colors"
            >
              Contact Us About Recovery Projects
              <ArrowRight className="w-5 h-5" />
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

      {/* Context Section */}
      <section className="section-padding">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-heading text-3xl font-bold text-brand-charcoal mb-6">
                The 2024 Jasper Wildfire — A Community Rebuilds
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  In July 2024, a devastating wildfire swept through the town of
                  Jasper and surrounding areas of Jasper National Park, destroying
                  approximately one-third of the town&apos;s structures and causing
                  unprecedented damage to critical infrastructure, campgrounds,
                  trails, and natural habitat.
                </p>
                <p>
                  The federal government has committed{' '}
                  <strong className="text-brand-charcoal">
                    over $383 million
                  </strong>{' '}
                  to Jasper&apos;s recovery, funding the reconstruction of housing,
                  campgrounds, visitor infrastructure, and environmental
                  restoration across the national park.
                </p>
                <p>
                  As Jasper&apos;s closest major aggregate and construction supplier,
                  West Central Contracting is uniquely positioned to support
                  every phase of the recovery — from emergency site clearing
                  through full reconstruction and environmental remediation. Owner
                  Todd Seabrook and our team are committed to helping Jasper rebuild.
                </p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-brand-red to-red-700 rounded-lg p-8 text-white">
              <h3 className="font-heading text-2xl font-bold mb-6">
                Key Recovery Facts
              </h3>
              <div className="space-y-5">
                <div className="border-b border-red-400 pb-4">
                  <div className="text-3xl font-bold">$383M+</div>
                  <p className="text-red-100">Federal recovery investment</p>
                </div>
                <div className="border-b border-red-400 pb-4">
                  <div className="text-3xl font-bold">800+</div>
                  <p className="text-red-100">Structures damaged or destroyed</p>
                </div>
                <div className="border-b border-red-400 pb-4">
                  <div className="text-3xl font-bold">36,000 ha</div>
                  <p className="text-red-100">Burn area in Jasper National Park</p>
                </div>
                <div>
                  <div className="text-3xl font-bold">Multi-Year</div>
                  <p className="text-red-100">Recovery timeline through 2028+</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Advantage — 30 min */}
      <section className="section-padding bg-brand-charcoal text-white">
        <div className="container-wide text-center">
          <Clock className="w-12 h-12 text-brand-red mx-auto mb-4" />
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
            30 Minutes from Hinton to Jasper
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-6">
            Fastest response in the region. Our Hinton base at 450 East River Road
            puts us closer to Jasper than any comparable aggregate and construction
            supplier, ensuring rapid material delivery and equipment mobilization
            when recovery projects need it most.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center mt-8">
            <div className="bg-white/5 border border-white/10 rounded-lg px-6 py-4">
              <p className="text-brand-red font-bold text-lg">Local Supplier</p>
              <p className="text-gray-400 text-sm">No long-distance hauling costs</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-lg px-6 py-4">
              <p className="text-brand-red font-bold text-lg">Same-Day Delivery</p>
              <p className="text-gray-400 text-sm">Materials ready when you need them</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-lg px-6 py-4">
              <p className="text-brand-red font-bold text-lg">Highway 16 Access</p>
              <p className="text-gray-400 text-sm">Direct corridor to Jasper</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services for Recovery */}
      <section className="section-padding">
        <div className="container-wide">
          <h2 className="font-heading text-3xl font-bold text-brand-charcoal mb-4 text-center">
            Our Recovery Services
          </h2>
          <p className="text-gray-700 mb-12 text-center max-w-2xl mx-auto">
            Comprehensive capabilities to support every phase of Jasper&apos;s
            rebuilding, from raw materials to finished site work.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recoveryServices.map((service) => {
              const IconComponent = service.icon;
              return (
                <div
                  key={service.title}
                  className="bg-white p-8 rounded-lg border border-gray-200 hover:border-brand-red hover:shadow-lg transition-all"
                >
                  <IconComponent className="w-12 h-12 text-brand-red mb-4" />
                  <h3 className="font-heading text-xl font-bold text-brand-charcoal mb-3">
                    {service.title}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Recovery Timeline */}
      <section className="section-padding bg-brand-gray-light">
        <div className="container-wide">
          <div className="flex items-center gap-3 mb-4 justify-center">
            <CalendarDays className="w-8 h-8 text-brand-red" />
            <h2 className="font-heading text-3xl font-bold text-brand-charcoal text-center">
              Recovery Timeline & Projects
            </h2>
          </div>
          <p className="text-gray-700 mb-12 text-center max-w-2xl mx-auto">
            Key reconstruction phases where West Central Contracting can provide
            materials, equipment, and expertise.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {timelinePhases.map((project) => (
              <div
                key={project.phase}
                className="bg-white p-8 rounded-lg border-l-4 border-brand-red shadow-md"
              >
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-brand-red mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                      <h3 className="font-heading text-xl font-bold text-brand-charcoal">
                        {project.phase}
                      </h3>
                      <span className="bg-brand-red/10 text-brand-red text-xs font-semibold px-2 py-1 rounded">
                        {project.timeline}
                      </span>
                    </div>
                    <p className="text-gray-700 leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bulk Orders for Recovery Contractors */}
      <section className="section-padding bg-brand-charcoal text-white">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-heading text-3xl font-bold mb-6">
                Bulk Orders for Recovery Contractors
              </h2>
              <p className="text-gray-300 text-lg mb-6">
                Working on a Jasper recovery project? We offer volume pricing,
                priority scheduling, and dedicated dispatch for contractors
                supporting the rebuilding effort.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  'Volume discounts on 10+ load orders',
                  'Dedicated dispatch: (780) 865-0068',
                  'Priority scheduling for recovery projects',
                  'Net 30 credit terms for qualified contractors',
                  'Custom aggregate specs to project requirements',
                  'Consistent supply from 7 pit locations',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-brand-red mt-0.5 flex-shrink-0" />
                    <span className="text-gray-200">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/quote"
                  className="inline-flex items-center justify-center px-8 py-3 bg-brand-red text-white font-semibold rounded-lg hover:bg-red-700 transition-colors"
                >
                  Request a Bulk Quote
                </Link>
                <Link
                  href="/order"
                  className="inline-flex items-center justify-center px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors"
                >
                  Browse Materials
                </Link>
              </div>
            </div>
            <div>
              <h2 className="font-heading text-3xl font-bold mb-12 text-center">
                Why Choose WCC for Recovery
              </h2>
              <div className="grid grid-cols-2 gap-6">
                {stats.map((stat) => (
                  <div key={stat.label} className="text-center bg-white/5 border border-white/10 rounded-lg p-6">
                    <div className="text-3xl md:text-4xl font-bold text-brand-red mb-2">
                      {stat.value}
                    </div>
                    <p className="text-gray-300 font-medium text-sm">{stat.label}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 space-y-4">
                <div className="flex items-center gap-3 bg-white/5 rounded-lg p-4">
                  <Shield className="w-8 h-8 text-brand-red flex-shrink-0" />
                  <div>
                    <p className="font-semibold">COR Certified & ISNetworld</p>
                    <p className="text-sm text-gray-400">
                      Full safety and compliance credentials
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-white/5 rounded-lg p-4">
                  <MapPin className="w-8 h-8 text-brand-red flex-shrink-0" />
                  <div>
                    <p className="font-semibold">450 East River Road, Hinton</p>
                    <p className="text-sm text-gray-400">
                      Closest major supplier to Jasper
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-brand-red text-white">
        <div className="container-wide text-center">
          <h2 className="font-heading text-3xl font-bold mb-4">
            Contact Us About Jasper Recovery Projects
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto text-red-100">
            Whether you&apos;re a contractor, project manager, or government agency
            working on Jasper&apos;s recovery, we&apos;re ready to support your project
            with materials, equipment, and local expertise. Serving western
            Alberta since 1980.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/quote"
              className="inline-flex items-center justify-center px-8 py-3 bg-white text-brand-red font-semibold rounded-lg hover:bg-gray-100 transition-colors"
            >
              Request a Quote
            </Link>
            <a
              href="tel:7808653000"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-red-700 transition-colors"
            >
              <Phone className="w-5 h-5" />
              (780) 865-3000
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-red-700 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
