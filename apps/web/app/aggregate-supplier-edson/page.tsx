'use client';

import Link from 'next/link';
import {
  ChevronRight,
  Truck,
  Mountain,
  Shield,
  CheckCircle,
  Phone,
  Star,
  HelpCircle,
  Package,
} from 'lucide-react';

const products = [
  {
    name: 'Road Crush',
    description: 'Angular rock blend for compacting base layers, driveways, and road construction.',
  },
  {
    name: 'Washed Rock',
    description: 'Clean aggregates for landscaping, drainage systems, and decorative applications.',
  },
  {
    name: 'Fractured Rock',
    description: 'Maximum interlocking material for base layers, concrete, and industrial uses.',
  },
  {
    name: 'Pea Gravel',
    description: 'Smooth, rounded stones for walkways, playgrounds, and garden accents.',
  },
  {
    name: 'Drain Rock',
    description: 'Specified grades for septic systems, foundation drainage, and perimeter drains.',
  },
  {
    name: 'Sand Varieties',
    description: 'Construction sand, bedding sand, and fill sand for all project requirements.',
  },
  {
    name: 'Rainbow Rock',
    description: 'Colorful decorative rock for premium landscape designs and feature accents.',
  },
  {
    name: 'Natural Round Rock',
    description: 'Rounded stone for decorative landscaping, riprap, and aesthetic features.',
  },
];

const faqs = [
  {
    question: 'Do you deliver aggregates to Edson?',
    answer:
      'Yes. Edson is approximately 35 minutes from our Hinton-area pit locations. We deliver all aggregate products to Edson and surrounding Yellowhead County on a regular schedule.',
  },
  {
    question: 'Is bulk pricing available for large orders?',
    answer:
      'Absolutely. We offer tiered pricing for bulk orders, with significant per-tonne savings on larger quantities. Contact us with your project details for a custom bulk quote.',
  },
  {
    question: 'Can you supply custom aggregate sizes?',
    answer:
      'Yes. With our own crushing operations across 7 pit locations, we can produce custom sizes and blends to meet your project specifications. Lead times may vary for specialty orders.',
  },
  {
    question: 'What areas do you supply besides Edson?',
    answer:
      'We supply aggregates across the entire western Alberta corridor including Hinton, Jasper, Grande Cache, Whitecourt, and rural Yellowhead County. Delivery pricing varies by distance.',
  },
];

export default function AggregateSupplierEdsonPage() {
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
              Aggregate Supplier Edson
            </span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-brand-charcoal via-gray-800 to-brand-charcoal text-white">
        <div className="container-wide">
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">
            Aggregate Supplier in Edson, AB
          </h1>
          <p className="text-lg text-gray-200 max-w-2xl">
            Reliable aggregate supply from 7 pit locations, delivered to Edson in
            approximately 35 minutes. Quality materials for construction,
            landscaping, and industrial projects.
          </p>
        </div>
      </section>

      {/* Why Choose WCC */}
      <section className="section-padding bg-gray-50">
        <div className="container-wide">
          <h2 className="font-heading text-3xl font-bold text-brand-charcoal mb-12 text-center">
            Why Choose West Central Contracting?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-lg border border-gray-200 hover:border-brand-red hover:shadow-lg transition-all">
              <Mountain className="w-10 h-10 text-brand-red mb-4" />
              <h3 className="font-heading text-xl font-bold text-brand-charcoal mb-3">
                7 Pit Locations
              </h3>
              <p className="text-gray-700">
                Multiple source pits ensure consistent supply and the right
                material for every project.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg border border-gray-200 hover:border-brand-red hover:shadow-lg transition-all">
              <Truck className="w-10 h-10 text-brand-red mb-4" />
              <h3 className="font-heading text-xl font-bold text-brand-charcoal mb-3">
                35-Min to Edson
              </h3>
              <p className="text-gray-700">
                Quick delivery from our Hinton-area pits to your Edson job site
                or property.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg border border-gray-200 hover:border-brand-red hover:shadow-lg transition-all">
              <Shield className="w-10 h-10 text-brand-red mb-4" />
              <h3 className="font-heading text-xl font-bold text-brand-charcoal mb-3">
                40+ Years
              </h3>
              <p className="text-gray-700">
                Family-owned since 1980 with a proven track record of quality and
                reliability.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg border border-gray-200 hover:border-brand-red hover:shadow-lg transition-all">
              <Package className="w-10 h-10 text-brand-red mb-4" />
              <h3 className="font-heading text-xl font-bold text-brand-charcoal mb-3">
                Full Selection
              </h3>
              <p className="text-gray-700">
                From road crush to decorative stone, we stock every aggregate type
                your project requires.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="section-padding">
        <div className="container-wide">
          <h2 className="font-heading text-3xl font-bold text-brand-charcoal mb-12">
            Aggregate Products Available
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product.name}
                className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-brand-red transition-colors hover:shadow-lg"
              >
                <h3 className="font-heading text-lg font-bold text-brand-charcoal mb-2">
                  {product.name}
                </h3>
                <p className="text-gray-700 text-sm">{product.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Area */}
      <section className="section-padding bg-gray-50">
        <div className="container-wide">
          <h2 className="font-heading text-3xl font-bold text-brand-charcoal mb-6">
            Delivery to Edson &amp; Surrounding Areas
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-4 text-gray-700">
              <p>
                Edson is one of our primary service areas, located approximately
                35 minutes east of our main operations in Hinton. We make regular
                deliveries to Edson for both residential and commercial customers.
              </p>
              <p>
                Whether you need a single load for a driveway project or ongoing
                supply for a construction site, our fleet of belly dumps, end
                dumps, and truck &amp; pups can handle any volume.
              </p>
              <div className="space-y-2 mt-6">
                {['Edson town limits', 'Yellowhead County', 'Highway 16 corridor', 'Peers and Niton Junction', 'Surrounding rural properties'].map((area) => (
                  <div key={area} className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-brand-red mr-3 flex-shrink-0" />
                    <span>{area}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white p-8 rounded-lg border border-gray-200">
              <h3 className="font-heading text-xl font-bold text-brand-charcoal mb-4">
                Ordering Is Simple
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-brand-red mr-3 mt-1 font-bold">1.</span>
                  Call (780) 865-3000 or request a quote online
                </li>
                <li className="flex items-start">
                  <span className="text-brand-red mr-3 mt-1 font-bold">2.</span>
                  Specify material type, quantity, and delivery location
                </li>
                <li className="flex items-start">
                  <span className="text-brand-red mr-3 mt-1 font-bold">3.</span>
                  Receive competitive pricing with bulk discounts
                </li>
                <li className="flex items-start">
                  <span className="text-brand-red mr-3 mt-1 font-bold">4.</span>
                  Delivery scheduled at your convenience
                </li>
              </ul>
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
            &ldquo;We use WCC for all our aggregate needs on our Edson projects.
            Consistent quality, reliable delivery, and fair pricing. They are
            our go-to supplier in the region.&rdquo;
          </blockquote>
          <p className="text-brand-charcoal font-semibold">
            &mdash; Edson-Based Contractor
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-brand-red text-white">
        <div className="container-wide text-center">
          <h2 className="font-heading text-3xl font-bold mb-4">
            Ready to Order Aggregates?
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto text-red-100">
            Get competitive pricing on aggregate delivery to Edson and
            surrounding areas. Bulk discounts available.
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
