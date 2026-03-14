'use client';

import Link from 'next/link';
import {
  ChevronRight,
  Truck,
  Clock,
  Shield,
  CheckCircle,
  Phone,
  Star,
  HelpCircle,
  MapPin,
} from 'lucide-react';

const equipment = [
  {
    name: 'Belly Dumps',
    description: 'High-volume aggregate hauling with controlled discharge for road building, site prep, and large fill projects.',
  },
  {
    name: 'End Dumps',
    description: 'Versatile hauling for aggregates, soil, and debris. Ideal for confined sites and precise placement.',
  },
  {
    name: 'Truck & Pups',
    description: 'Maximum payload efficiency for long-haul aggregate delivery across western Alberta.',
  },
  {
    name: 'Lowboys',
    description: 'Heavy equipment transport for moving excavators, dozers, loaders, and oversized machinery.',
  },
  {
    name: 'Winch Tractors',
    description: 'Pipeline, oil & gas, and forestry support. Skidding, pulling, and heavy-duty site work.',
  },
];

const serviceAreas = [
  'Hinton',
  'Edson',
  'Jasper',
  'Grande Cache',
  'Whitecourt',
  'Yellowhead County',
  'Woodlands County',
  'Highway 16 corridor',
];

const faqs = [
  {
    question: 'What types of trucking equipment do you have?',
    answer:
      'Our fleet includes belly dumps, end dumps, truck & pups, lowboys, and winch tractors. This range allows us to handle everything from aggregate hauling to heavy equipment transport and pipeline support.',
  },
  {
    question: 'Do you offer hourly or project-based rates?',
    answer:
      'We offer both. Hourly rates work well for short-term or variable-scope jobs. For larger projects, we provide competitive project-based pricing. Contact us to discuss the best option for your needs.',
  },
  {
    question: 'Is your fleet insured for commercial work?',
    answer:
      'Yes. All vehicles carry comprehensive commercial insurance. We are COR Certified, ISNetworld compliant, and registered with ComplyWorks for full safety and compliance coverage.',
  },
  {
    question: 'How far do you travel for trucking jobs?',
    answer:
      'We primarily serve the Hinton-Edson-Jasper-Grande Cache-Whitecourt corridor but regularly take on projects throughout western Alberta. Contact us with your location for a quote.',
  },
];

export default function TruckingWesternAlbertaPage() {
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
              Trucking Western Alberta
            </span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-brand-charcoal via-gray-800 to-brand-charcoal text-white">
        <div className="container-wide">
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">
            Trucking Services in Western Alberta
          </h1>
          <p className="text-lg text-gray-200 max-w-2xl">
            Full-service trucking fleet serving the Hinton, Edson, Jasper, Grande
            Cache, and Whitecourt corridor. Belly dumps, end dumps, lowboys, and
            more for construction, oil &amp; gas, and forestry.
          </p>
        </div>
      </section>

      {/* Why Choose WCC */}
      <section className="section-padding bg-gray-50">
        <div className="container-wide">
          <h2 className="font-heading text-3xl font-bold text-brand-charcoal mb-12 text-center">
            Why Choose West Central Contracting?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg border border-gray-200 hover:border-brand-red hover:shadow-lg transition-all">
              <Truck className="w-10 h-10 text-brand-red mb-4" />
              <h3 className="font-heading text-xl font-bold text-brand-charcoal mb-3">
                Diverse Fleet
              </h3>
              <p className="text-gray-700">
                From belly dumps to lowboys and winch tractors, we have the right
                equipment for any hauling challenge.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg border border-gray-200 hover:border-brand-red hover:shadow-lg transition-all">
              <Shield className="w-10 h-10 text-brand-red mb-4" />
              <h3 className="font-heading text-xl font-bold text-brand-charcoal mb-3">
                Fully Certified
              </h3>
              <p className="text-gray-700">
                COR Certified, ISNetworld compliant, and ComplyWorks registered.
                Full insurance coverage on every vehicle.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg border border-gray-200 hover:border-brand-red hover:shadow-lg transition-all">
              <Clock className="w-10 h-10 text-brand-red mb-4" />
              <h3 className="font-heading text-xl font-bold text-brand-charcoal mb-3">
                Reliable Scheduling
              </h3>
              <p className="text-gray-700">
                40+ years of dependable service. We show up on time and get the
                job done right, every time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Equipment */}
      <section className="section-padding">
        <div className="container-wide">
          <h2 className="font-heading text-3xl font-bold text-brand-charcoal mb-12">
            Our Trucking Equipment
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {equipment.map((item) => (
              <div
                key={item.name}
                className="bg-white border-2 border-gray-200 rounded-lg p-8 hover:border-brand-red transition-colors hover:shadow-lg"
              >
                <Truck className="w-8 h-8 text-brand-red mb-4" />
                <h3 className="font-heading text-xl font-bold text-brand-charcoal mb-3">
                  {item.name}
                </h3>
                <p className="text-gray-700">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Area */}
      <section className="section-padding bg-gray-50">
        <div className="container-wide">
          <h2 className="font-heading text-3xl font-bold text-brand-charcoal mb-6">
            Service Coverage Area
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-4 text-gray-700">
              <p>
                Our trucking operations cover the entire western Alberta corridor.
                Based in Hinton, we serve construction sites, oil &amp; gas
                operations, forestry projects, and municipal contracts throughout
                the region.
              </p>
              <p>
                Whether you need aggregate hauled from our pits, equipment moved
                between sites, or dedicated trucking support for a long-term
                project, our fleet and experienced operators are ready.
              </p>
              <div className="grid grid-cols-2 gap-2 mt-6">
                {serviceAreas.map((area) => (
                  <div key={area} className="flex items-center">
                    <MapPin className="w-4 h-4 text-brand-red mr-2 flex-shrink-0" />
                    <span className="text-sm">{area}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white p-8 rounded-lg border border-gray-200">
              <h3 className="font-heading text-xl font-bold text-brand-charcoal mb-4">
                Industries We Serve
              </h3>
              <div className="space-y-3">
                {['Construction & road building', 'Oil & gas operations', 'Forestry & logging', 'Municipal & government', 'Residential projects', 'Pipeline & utility'].map((industry) => (
                  <div key={industry} className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-brand-red mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{industry}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding">
        <div className="container-wide max-w-4xl">
          <h2 className="font-heading text-3xl font-bold text-brand-charcoal mb-12 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6" itemScope itemType="https://schema.org/FAQPage">
            {faqs.map((faq) => (
              <div
                key={faq.question}
                className="bg-gray-50 rounded-lg p-6 border border-gray-200"
                itemScope
                itemProp="mainEntity"
                itemType="https://schema.org/Question"
              >
                <h3
                  className="font-heading text-lg font-bold text-brand-charcoal mb-3 flex items-start"
                  itemProp="name"
                >
                  <HelpCircle className="w-5 h-5 text-brand-red mr-3 mt-1 flex-shrink-0" />
                  {faq.question}
                </h3>
                <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                  <p className="text-gray-700 ml-8" itemProp="text">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="section-padding bg-gray-50">
        <div className="container-wide max-w-3xl text-center">
          <Star className="w-10 h-10 text-brand-red mx-auto mb-6" />
          <blockquote className="text-xl text-gray-700 italic mb-6">
            &ldquo;WCC has been our trucking partner on multiple pipeline projects.
            Their equipment is well-maintained, operators are professional, and
            they always deliver on schedule. Highly recommend.&rdquo;
          </blockquote>
          <p className="text-brand-charcoal font-semibold">
            &mdash; Western Alberta Pipeline Contractor
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-brand-red text-white">
        <div className="container-wide text-center">
          <h2 className="font-heading text-3xl font-bold mb-4">
            Need Trucking Services?
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto text-red-100">
            Get a quote for trucking services across western Alberta. Hourly and
            project-based rates available.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/quote"
              className="inline-flex items-center px-8 py-3 bg-white text-brand-red font-semibold rounded-lg hover:bg-gray-100 transition-colors"
            >
              Get a Quote
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
