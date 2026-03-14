'use client';

import Link from 'next/link';
import {
  ChevronRight,
  Truck,
  Building2,
  Home,
  CheckCircle,
  Phone,
  Star,
  HelpCircle,
  Layers,
  MapPin,
  DollarSign,
  Clock,
} from 'lucide-react';

const sandProducts = [
  {
    name: 'Construction Sand',
    description:
      'Clean, graded sand for concrete production, mortar mixing, and general construction applications.',
    applications: ['Concrete production', 'Mortar applications', 'Masonry work', 'Stucco base'],
  },
  {
    name: 'Bedding Sand',
    description:
      'Fine, uniform sand for pipe bedding, paver base, and utility trench backfill.',
    applications: ['Pipe bedding', 'Paver base layer', 'Utility trenches', 'Levelling base'],
  },
  {
    name: 'Fill Sand',
    description:
      'Economical sand for backfill, grading, and general site preparation.',
    applications: ['Backfill', 'Site grading', 'Landscaping base', 'Drainage layers'],
  },
];

const gravelProducts = [
  {
    name: 'Pit Run',
    description:
      'Unprocessed natural aggregate straight from the pit. Cost-effective for large fill projects, temporary roads, and base layers.',
    applications: ['Large fill projects', 'Temporary access roads', 'Sub-base material', 'Cost-effective bulk fill'],
  },
  {
    name: 'Road Crush',
    description:
      'Angular rock blend in multiple sizes for road base, driveways, and parking areas. Compacts well for a durable surface.',
    applications: ['Road construction', 'Driveways', 'Parking lots', 'Site pads'],
  },
  {
    name: 'Washed Rock',
    description:
      'Clean, washed aggregates free of fines. Ideal for drainage applications, landscaping features, and decorative use.',
    applications: ['Drainage systems', 'Landscaping features', 'Decorative applications', 'Septic fields'],
  },
  {
    name: 'Drain Rock',
    description:
      'Clean, sized rock for drainage applications, septic systems, and foundation protection.',
    applications: ['Septic systems', 'Foundation drains', 'French drains', 'Perimeter drainage'],
  },
];

const faqs = [
  {
    question: 'How far is delivery from Hinton to Edson?',
    answer:
      'Edson is approximately 35 minutes from our Hinton-area pit locations via Highway 16. This short haul distance keeps delivery costs competitive and turnaround times fast for Edson customers.',
  },
  {
    question: 'What aggregate specifications do you meet?',
    answer:
      'Our aggregates are produced to meet Alberta Transportation specifications and common construction standards. We can provide gradation reports and quality documentation for project requirements.',
  },
  {
    question: 'What is your delivery schedule to Edson?',
    answer:
      'We make regular deliveries to Edson throughout the week. For most orders, we can deliver within 1-2 business days. Same-day delivery may be available for urgent orders depending on fleet availability.',
  },
  {
    question: 'Do you offer competitive pricing for Edson deliveries?',
    answer:
      'Yes. Because our pit locations are only 35 minutes from Edson, our delivery costs are lower than suppliers hauling from further away. We offer bulk discounts on large orders and competitive per-tonne pricing for all materials.',
  },
  {
    question: 'Do you supply both residential and industrial customers in Edson?',
    answer:
      'Absolutely. We serve everyone from homeowners needing a few tonnes of sand for a backyard project to industrial operations requiring thousands of tonnes of aggregate for construction sites. No job is too small or too large.',
  },
];

export default function SandGravelEdsonPage() {
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
              Sand &amp; Gravel Edson
            </span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-brand-charcoal via-gray-800 to-brand-charcoal text-white">
        <div className="container-wide">
          <div className="flex items-center text-brand-red font-semibold mb-3">
            <MapPin className="w-5 h-5 mr-2" />
            35 Minutes from Hinton via Highway 16
          </div>
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">
            Sand &amp; Gravel in Edson, AB
          </h1>
          <p className="text-lg text-gray-200 max-w-2xl mb-8">
            Quality construction sand, pit run, road crush, and washed rock for
            industrial and residential applications. Delivered to Edson from our
            nearby pit operations at competitive prices.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/order"
              className="btn-primary inline-flex items-center justify-center px-8 py-3 font-semibold rounded-lg"
            >
              Order Materials
            </Link>
            <Link
              href="/quote"
              className="inline-flex items-center justify-center px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors"
            >
              Get a Free Quote
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose WCC */}
      <section className="section-padding bg-gray-50">
        <div className="container-wide">
          <h2 className="font-heading text-3xl font-bold text-brand-charcoal mb-12 text-center">
            Why Choose West Central Contracting for Edson Delivery?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-lg border border-gray-200 hover:border-brand-red hover:shadow-lg transition-all">
              <Clock className="w-10 h-10 text-brand-red mb-4" />
              <h3 className="font-heading text-xl font-bold text-brand-charcoal mb-3">
                35-Min Delivery
              </h3>
              <p className="text-gray-700">
                Our Hinton-area pit locations are just 35 minutes from Edson,
                meaning fast turnaround and lower hauling costs.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg border border-gray-200 hover:border-brand-red hover:shadow-lg transition-all">
              <DollarSign className="w-10 h-10 text-brand-red mb-4" />
              <h3 className="font-heading text-xl font-bold text-brand-charcoal mb-3">
                Competitive Pricing
              </h3>
              <p className="text-gray-700">
                Short haul distances from our 7 pit locations mean lower
                delivery costs passed directly to Edson customers.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg border border-gray-200 hover:border-brand-red hover:shadow-lg transition-all">
              <Building2 className="w-10 h-10 text-brand-red mb-4" />
              <h3 className="font-heading text-xl font-bold text-brand-charcoal mb-3">
                Industrial Grade
              </h3>
              <p className="text-gray-700">
                Sand and gravel produced to Alberta Transportation specs for
                demanding construction and infrastructure projects.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg border border-gray-200 hover:border-brand-red hover:shadow-lg transition-all">
              <Home className="w-10 h-10 text-brand-red mb-4" />
              <h3 className="font-heading text-xl font-bold text-brand-charcoal mb-3">
                Residential Friendly
              </h3>
              <p className="text-gray-700">
                We happily serve homeowners and small projects with the same
                quality materials and professional delivery.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sand Products */}
      <section className="section-padding">
        <div className="container-wide">
          <h2 className="font-heading text-3xl font-bold text-brand-charcoal mb-12">
            Sand Products for Edson
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {sandProducts.map((product) => (
              <div
                key={product.name}
                className="bg-white border-2 border-gray-200 rounded-lg p-8 hover:border-brand-red transition-colors hover:shadow-lg"
              >
                <h3 className="font-heading text-xl font-bold text-brand-charcoal mb-3">
                  {product.name}
                </h3>
                <p className="text-gray-700 mb-4">{product.description}</p>
                <ul className="space-y-2">
                  {product.applications.map((app) => (
                    <li key={app} className="text-gray-700 flex items-start text-sm">
                      <span className="text-brand-red mr-2 mt-0.5">&#8226;</span>
                      {app}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gravel Products */}
      <section className="section-padding bg-gray-50">
        <div className="container-wide">
          <h2 className="font-heading text-3xl font-bold text-brand-charcoal mb-12">
            Gravel Products for Edson
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {gravelProducts.map((product) => (
              <div
                key={product.name}
                className="bg-white border-2 border-gray-200 rounded-lg p-8 hover:border-brand-red transition-colors hover:shadow-lg"
              >
                <h3 className="font-heading text-xl font-bold text-brand-charcoal mb-3">
                  {product.name}
                </h3>
                <p className="text-gray-700 mb-4">{product.description}</p>
                <ul className="space-y-2">
                  {product.applications.map((app) => (
                    <li key={app} className="text-gray-700 flex items-start text-sm">
                      <span className="text-brand-red mr-2 mt-0.5">&#8226;</span>
                      {app}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Construction & Residential Applications */}
      <section className="section-padding">
        <div className="container-wide">
          <h2 className="font-heading text-3xl font-bold text-brand-charcoal mb-8">
            Construction &amp; Residential Applications
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="font-heading text-xl font-bold text-brand-charcoal mb-4">
                Commercial &amp; Industrial
              </h3>
              <div className="space-y-3">
                {[
                  'Road construction and municipal infrastructure',
                  'Oil and gas site preparation and access roads',
                  'Commercial building foundations and site pads',
                  'Utility and pipeline trench backfill',
                  'Parking lot construction and maintenance',
                  'Industrial yard surfacing and drainage',
                ].map((item) => (
                  <div key={item} className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-brand-red mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-heading text-xl font-bold text-brand-charcoal mb-4">
                Residential
              </h3>
              <div className="space-y-3">
                {[
                  'Driveways and acreage roads',
                  'Landscaping and garden projects',
                  'Septic system installation and repair',
                  'Foundation drainage and perimeter protection',
                  'Walkways, patios, and outdoor living spaces',
                  'Backyard regrading and levelling',
                ].map((item) => (
                  <div key={item} className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-brand-red mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Delivery Info */}
      <section className="section-padding bg-gray-50">
        <div className="container-wide">
          <h2 className="font-heading text-3xl font-bold text-brand-charcoal mb-6">
            Delivery to Edson &amp; Area
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-4 text-gray-700">
              <p>
                Edson is approximately 35 minutes from our Hinton-area pit
                locations via Highway 16, making regular deliveries efficient
                and cost-effective. We deliver sand and gravel to construction
                sites, residential properties, and industrial operations
                throughout the Edson area.
              </p>
              <p>
                Our fleet of belly dumps, end dumps, and truck &amp; pups can
                handle any order size, from a single load for a homeowner to
                ongoing supply for a major construction project. With 7 pit
                locations and our own crushing operations, we maintain consistent
                supply even during peak construction season.
              </p>
              <div className="space-y-2 mt-6">
                {[
                  'Regular delivery schedule to Edson',
                  'Bulk pricing for large orders',
                  '1-2 day turnaround on most orders',
                  'Custom aggregate blends available',
                  'Gradation reports on request',
                  'Same-day delivery for urgent needs (when available)',
                ].map((item) => (
                  <div key={item} className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-brand-red mr-3 flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white p-8 rounded-lg border border-gray-200">
              <h3 className="font-heading text-xl font-bold text-brand-charcoal mb-4">
                Order Process
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-brand-red mr-3 mt-1 font-bold">1.</span>
                  Contact us with your material and quantity needs
                </li>
                <li className="flex items-start">
                  <span className="text-brand-red mr-3 mt-1 font-bold">2.</span>
                  Receive a competitive quote including delivery to Edson
                </li>
                <li className="flex items-start">
                  <span className="text-brand-red mr-3 mt-1 font-bold">3.</span>
                  Confirm your order and delivery schedule
                </li>
                <li className="flex items-start">
                  <span className="text-brand-red mr-3 mt-1 font-bold">4.</span>
                  Sand and gravel delivered to your Edson location
                </li>
              </ul>
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">
                  <strong className="text-brand-charcoal">Delivery from Hinton:</strong>{' '}
                  ~35 min via Hwy 16. Our proximity means lower costs and faster
                  service than suppliers hauling from further away.
                </p>
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
                <div
                  itemScope
                  itemProp="acceptedAnswer"
                  itemType="https://schema.org/Answer"
                >
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
            &ldquo;We have been ordering sand and gravel from WCC for our Edson
            projects for years. The quality is always consistent, delivery is
            dependable, and their pricing beats anyone else in the region. They
            are our preferred supplier.&rdquo;
          </blockquote>
          <p className="text-brand-charcoal font-semibold">
            &mdash; Edson General Contractor
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-brand-red text-white">
        <div className="container-wide text-center">
          <h2 className="font-heading text-3xl font-bold mb-4">
            Need Sand or Gravel in Edson?
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto text-red-100">
            Get competitive pricing on sand and gravel delivery to Edson — just
            35 minutes from our pit operations. Industrial and residential
            orders welcome.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/order"
              className="inline-flex items-center px-8 py-3 bg-white text-brand-red font-semibold rounded-lg hover:bg-gray-100 transition-colors"
            >
              Order Materials
            </Link>
            <Link
              href="/quote"
              className="inline-flex items-center px-8 py-3 bg-red-700 text-white font-semibold rounded-lg hover:bg-red-800 transition-colors border-2 border-red-600"
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
