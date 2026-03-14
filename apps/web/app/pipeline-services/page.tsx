'use client';

import Link from 'next/link';
import {
  ChevronRight,
  Wrench,
  Truck,
  TreePine,
  Shield,
  MapPin,
  Phone,
  ArrowRight,
  CheckCircle,
  HardHat,
} from 'lucide-react';

const pipelineServices = [
  {
    title: 'Pipeline Bedding Aggregate',
    description:
      'Custom-specification aggregate for pipe bedding and backfill, screened and processed to meet exacting pipeline construction standards. Multiple pit locations ensure consistent supply throughout the project corridor.',
    icon: HardHat,
  },
  {
    title: 'Material Hauling',
    description:
      'Belly dumps, end dumps, and tandem trucks for efficient pipeline corridor material transport. Experienced operators familiar with ROW access roads and pipeline construction logistics.',
    icon: Truck,
  },
  {
    title: 'Equipment Rental',
    description:
      'Excavators, dozers, loaders, and graders available for right-of-way preparation, stripping, and construction support. Well-maintained fleet ready for pipeline-grade work.',
    icon: Wrench,
  },
  {
    title: 'Site Preparation',
    description:
      'Clearing, stripping, and grading of pipeline right-of-way. Experienced in preparing construction corridors that meet regulatory and environmental requirements.',
    icon: MapPin,
  },
  {
    title: 'Reclamation',
    description:
      'Post-construction land restoration, re-grading, topsoil replacement, and revegetation support. Ensuring pipeline corridors are returned to their natural state per regulatory standards.',
    icon: TreePine,
  },
];

const advantages = [
  {
    title: 'COR Certified',
    description:
      'Certificate of Recognition for occupational health and safety — meeting the rigorous safety standards demanded by pipeline operators.',
    icon: Shield,
  },
  {
    title: 'ISNetworld Verified',
    description:
      'Full compliance verified through ISNetworld, the industry standard for contractor safety and environmental management.',
    icon: Shield,
  },
  {
    title: '45+ Years Experience',
    description:
      'Decades of aggregate production, trucking, and construction experience in western Alberta\'s toughest terrain and conditions.',
    icon: CheckCircle,
  },
  {
    title: 'Local Knowledge',
    description:
      'Deep familiarity with Yellowhead County terrain, access roads, environmental conditions, and regulatory landscape.',
    icon: MapPin,
  },
];

const stats = [
  { value: '45+', label: 'Years in Operation' },
  { value: '7', label: 'Pit Locations' },
  { value: '2,000+', label: 'Pipeline Jobs Expected' },
  { value: 'COR', label: 'Safety Certified' },
];

export default function PipelineServicesPage() {
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
            <span className="text-brand-charcoal font-semibold">
              Pipeline Services
            </span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative section-padding bg-gradient-to-br from-brand-charcoal via-gray-900 to-brand-charcoal text-white min-h-[400px] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-brand-charcoal/95 via-brand-charcoal/80 to-transparent" />
        <div className="relative container-wide">
          <div className="flex items-center gap-3 mb-4">
            <Wrench className="w-10 h-10 text-brand-red" />
            <span className="bg-brand-red/20 text-red-300 text-sm font-semibold px-3 py-1 rounded-full">
              Pipeline Construction Support
            </span>
          </div>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Pipeline Construction
            <br />
            Support Services
          </h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-3xl mb-8">
            Aggregate supply, material hauling, equipment, and site services for
            pipeline construction in the Yellowhead corridor. Based in Yellowhead
            County — at the heart of pipeline activity.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-brand-red text-white font-semibold rounded-lg hover:bg-red-700 transition-colors"
            >
              Discuss Your Pipeline Project
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href="tel:(780)865-3000"
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
                Yellowhead Mainline — A Generational Opportunity
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  The Yellowhead Mainline Natural Gas Pipeline represents one of
                  western Alberta&apos;s most significant infrastructure projects,
                  with construction expected to begin in 2026. This major
                  pipeline project will create over{' '}
                  <strong className="text-brand-charcoal">
                    2,000 direct jobs
                  </strong>{' '}
                  and generate substantial demand for aggregate materials, trucking
                  services, and construction support throughout the Yellowhead
                  corridor.
                </p>
                <p>
                  West Central Contracting is strategically positioned to serve as
                  a key local supplier for this project. With 7 pit locations,
                  a full trucking fleet, and decades of experience working in the
                  region, we offer pipeline contractors reliable, high-quality
                  materials and services right where they need them.
                </p>
                <p>
                  From custom-spec pipe bedding aggregate to ROW preparation and
                  post-construction reclamation, we provide end-to-end support
                  for pipeline construction operations.
                </p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-brand-charcoal to-gray-800 rounded-lg p-8 text-white">
              <h3 className="font-heading text-2xl font-bold mb-6">
                Project Snapshot
              </h3>
              <div className="space-y-5">
                <div className="border-b border-gray-600 pb-4">
                  <div className="text-3xl font-bold text-brand-red">2026</div>
                  <p className="text-gray-300">Construction start</p>
                </div>
                <div className="border-b border-gray-600 pb-4">
                  <div className="text-3xl font-bold text-brand-red">2,000+</div>
                  <p className="text-gray-300">Direct jobs created</p>
                </div>
                <div className="border-b border-gray-600 pb-4">
                  <div className="text-3xl font-bold text-brand-red">
                    Yellowhead
                  </div>
                  <p className="text-gray-300">Corridor through our region</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-brand-red">
                    Natural Gas
                  </div>
                  <p className="text-gray-300">Mainline pipeline</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Location Advantage */}
      <section className="section-padding bg-brand-charcoal text-white">
        <div className="container-wide text-center">
          <MapPin className="w-12 h-12 text-brand-red mx-auto mb-4" />
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
            Based in Yellowhead County — At the Heart of Pipeline Activity
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Our Hinton, AB headquarters and 7 pit locations across the region put
            us right in the pipeline construction corridor. No long hauls for
            materials. No mobilization delays. Local supply, local knowledge,
            local accountability.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding">
        <div className="container-wide">
          <h2 className="font-heading text-3xl font-bold text-brand-charcoal mb-4 text-center">
            Pipeline Support Services
          </h2>
          <p className="text-gray-700 mb-12 text-center max-w-2xl mx-auto">
            End-to-end capabilities for pipeline construction, from aggregate
            production and hauling through site restoration.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pipelineServices.map((service) => {
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

      {/* Why Choose Us */}
      <section className="section-padding bg-gray-50">
        <div className="container-wide">
          <h2 className="font-heading text-3xl font-bold text-brand-charcoal mb-4 text-center">
            Why Choose West Central Contracting
          </h2>
          <p className="text-gray-700 mb-12 text-center max-w-2xl mx-auto">
            Pipeline operators and contractors choose us for our safety record,
            compliance, and deep local expertise.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {advantages.map((advantage) => {
              const IconComponent = advantage.icon;
              return (
                <div
                  key={advantage.title}
                  className="bg-white p-8 rounded-lg border-l-4 border-brand-red shadow-md flex items-start gap-4"
                >
                  <IconComponent className="w-10 h-10 text-brand-red flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-heading text-xl font-bold text-brand-charcoal mb-2">
                      {advantage.title}
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {advantage.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="section-padding bg-brand-charcoal text-white">
        <div className="container-wide">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-brand-red mb-2">
                  {stat.value}
                </div>
                <p className="text-gray-300 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-brand-red text-white">
        <div className="container-wide text-center">
          <h2 className="font-heading text-3xl font-bold mb-4">
            Ready to Discuss Pipeline Support?
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto text-red-100">
            Whether you&apos;re a pipeline operator, prime contractor, or
            subcontractor, contact us to discuss how West Central Contracting can
            support your Yellowhead corridor operations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/quote"
              className="inline-flex items-center justify-center px-8 py-3 bg-white text-brand-red font-semibold rounded-lg hover:bg-gray-100 transition-colors"
            >
              Request a Quote
            </Link>
            <a
              href="tel:(780)865-3000"
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
