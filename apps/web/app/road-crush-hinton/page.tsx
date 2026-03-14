'use client';

import Link from 'next/link';
import {
  ChevronRight,
  Truck,
  Layers,
  CheckCircle,
  Phone,
  Star,
  HelpCircle,
  Ruler,
} from 'lucide-react';

const uses = [
  {
    name: 'Driveways',
    description: 'Create durable, well-draining driveway surfaces that compact firmly and resist rutting in all weather conditions.',
  },
  {
    name: 'Parking Lots',
    description: 'Economical and effective base material for commercial and industrial parking areas with heavy traffic.',
  },
  {
    name: 'Road Construction',
    description: 'Industry-standard road base material for municipal, county, and private road building projects.',
  },
  {
    name: 'Site Pads',
    description: 'Level, stable base preparation for buildings, shops, equipment yards, and industrial staging areas.',
  },
  {
    name: 'Lease Roads',
    description: 'Oil & gas lease road construction and maintenance throughout the western Alberta energy corridor.',
  },
  {
    name: 'Subdivision Development',
    description: 'Base material for new subdivision road networks, utility corridors, and lot preparation.',
  },
];

const sizes = [
  { size: '1/2"', use: 'Fine finish layer, tight compaction, top dressing' },
  { size: '3/4"', use: 'Standard road surface, driveways, parking areas' },
  { size: '1.5"', use: 'Heavy-duty base layer, industrial applications' },
  { size: '2.5"', use: 'Deep base fill, road subgrade, site pad foundation' },
];

const faqs = [
  {
    question: 'How much road crush do I need for my driveway?',
    answer:
      'A typical residential driveway (3m x 20m) requires approximately 15-20 tonnes of road crush at a 4-6 inch depth. Use our material calculator or call us for an exact estimate based on your driveway dimensions.',
  },
  {
    question: 'What is the compaction rate of road crush?',
    answer:
      'Road crush typically compacts 20-25% from loose placement. We recommend ordering approximately 25% more than the calculated volume to account for compaction and achieve the desired finished depth.',
  },
  {
    question: 'Can you deliver road crush the same day?',
    answer:
      'Yes, same-day delivery is often available for road crush orders placed before noon. Road crush is our most commonly stocked material, so availability is rarely an issue.',
  },
  {
    question: 'What size of road crush should I use?',
    answer:
      'For most driveways and parking areas, we recommend 3/4" road crush as a surface layer over a 1.5" or 2.5" base. Our team can advise on the best combination for your specific application.',
  },
];

export default function RoadCrushHintonPage() {
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
              Road Crush Hinton
            </span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-brand-charcoal via-gray-800 to-brand-charcoal text-white">
        <div className="container-wide">
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">
            Road Crush Supply in Hinton, AB
          </h1>
          <p className="text-lg text-gray-200 max-w-2xl">
            Premium road base material in sizes from 1/2&quot; to 2.5&quot;. Bulk
            supply for driveways, parking lots, road construction, and site pads
            throughout the Hinton region.
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
              <Layers className="w-10 h-10 text-brand-red mb-4" />
              <h3 className="font-heading text-xl font-bold text-brand-charcoal mb-3">
                Multiple Sizes
              </h3>
              <p className="text-gray-700">
                Road crush from 1/2&quot; to 2.5&quot; produced at our own
                crushing operations for consistent quality.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg border border-gray-200 hover:border-brand-red hover:shadow-lg transition-all">
              <Truck className="w-10 h-10 text-brand-red mb-4" />
              <h3 className="font-heading text-xl font-bold text-brand-charcoal mb-3">
                Bulk Supply
              </h3>
              <p className="text-gray-700">
                From a single truckload to thousands of tonnes, we have the
                capacity for any project scale.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg border border-gray-200 hover:border-brand-red hover:shadow-lg transition-all">
              <Ruler className="w-10 h-10 text-brand-red mb-4" />
              <h3 className="font-heading text-xl font-bold text-brand-charcoal mb-3">
                Expert Advice
              </h3>
              <p className="text-gray-700">
                40+ years of experience means we can recommend the right size and
                quantity for your specific application.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Size Guide */}
      <section className="section-padding">
        <div className="container-wide">
          <h2 className="font-heading text-3xl font-bold text-brand-charcoal mb-12">
            Road Crush Size Guide
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sizes.map((item) => (
              <div
                key={item.size}
                className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-brand-red transition-colors hover:shadow-lg flex items-start"
              >
                <div className="bg-brand-red text-white font-bold rounded-lg w-16 h-16 flex items-center justify-center mr-6 flex-shrink-0 text-lg">
                  {item.size}
                </div>
                <div>
                  <h3 className="font-heading text-lg font-bold text-brand-charcoal mb-1">
                    {item.size} Road Crush
                  </h3>
                  <p className="text-gray-700">{item.use}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Common Uses */}
      <section className="section-padding bg-gray-50">
        <div className="container-wide">
          <h2 className="font-heading text-3xl font-bold text-brand-charcoal mb-12">
            Common Applications
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {uses.map((item) => (
              <div
                key={item.name}
                className="bg-white p-8 rounded-lg border border-gray-200 hover:border-brand-red hover:shadow-lg transition-all"
              >
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
      <section className="section-padding">
        <div className="container-wide">
          <h2 className="font-heading text-3xl font-bold text-brand-charcoal mb-6">
            Delivery Throughout the Hinton Region
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-4 text-gray-700">
              <p>
                Road crush is our highest-volume product, and we maintain large
                stockpiles at our pit locations near Hinton for fast turnaround.
                Delivery is available throughout Hinton, Edson, and the
                surrounding Yellowhead County.
              </p>
              <div className="space-y-2">
                {['Same-day delivery available', 'Bulk pricing for large orders', 'Belly dump and end dump delivery', 'Placement and spreading services', 'Material calculator available online'].map((item) => (
                  <div key={item} className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-brand-red mr-3 flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-brand-red to-red-700 rounded-lg p-8 text-white">
              <h3 className="font-heading text-2xl font-bold mb-6">
                Quick Estimate
              </h3>
              <div className="space-y-4">
                <div className="border-b border-red-400 pb-4">
                  <div className="text-sm text-red-100">Single car driveway</div>
                  <div className="text-xl font-bold">~15-20 tonnes</div>
                </div>
                <div className="border-b border-red-400 pb-4">
                  <div className="text-sm text-red-100">Double car driveway</div>
                  <div className="text-xl font-bold">~25-35 tonnes</div>
                </div>
                <div className="border-b border-red-400 pb-4">
                  <div className="text-sm text-red-100">Small parking lot</div>
                  <div className="text-xl font-bold">~50-100 tonnes</div>
                </div>
                <div>
                  <div className="text-sm text-red-100">Acreage driveway (100m)</div>
                  <div className="text-xl font-bold">~60-80 tonnes</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-gray-50">
        <div className="container-wide max-w-4xl">
          <h2 className="font-heading text-3xl font-bold text-brand-charcoal mb-12 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6" itemScope itemType="https://schema.org/FAQPage">
            {faqs.map((faq) => (
              <div
                key={faq.question}
                className="bg-white rounded-lg p-6 border border-gray-200"
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
      <section className="section-padding">
        <div className="container-wide max-w-3xl text-center">
          <Star className="w-10 h-10 text-brand-red mx-auto mb-6" />
          <blockquote className="text-xl text-gray-700 italic mb-6">
            &ldquo;We needed 200 tonnes of road crush for a county road project
            near Hinton. WCC had it loaded and delivered in two days. The
            quality was consistent and it compacted beautifully.&rdquo;
          </blockquote>
          <p className="text-brand-charcoal font-semibold">
            &mdash; Yellowhead County Road Contractor
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-brand-red text-white">
        <div className="container-wide text-center">
          <h2 className="font-heading text-3xl font-bold mb-4">
            Need Road Crush in Hinton?
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto text-red-100">
            Get a free quote on road crush delivery. Use our material calculator
            for an instant estimate or call us directly.
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
