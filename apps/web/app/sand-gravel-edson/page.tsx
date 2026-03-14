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
} from 'lucide-react';

const sandProducts = [
  {
    name: 'Construction Sand',
    description: 'Clean, graded sand for concrete production, mortar mixing, and general construction applications.',
    applications: ['Concrete production', 'Mortar applications', 'Masonry work', 'Stucco base'],
  },
  {
    name: 'Bedding Sand',
    description: 'Fine, uniform sand for pipe bedding, paver base, and utility trench backfill.',
    applications: ['Pipe bedding', 'Paver base layer', 'Utility trenches', 'Levelling base'],
  },
  {
    name: 'Fill Sand',
    description: 'Economical sand for backfill, grading, and general site preparation.',
    applications: ['Backfill', 'Site grading', 'Landscaping base', 'Drainage layers'],
  },
];

const gravelProducts = [
  {
    name: 'Road Crush',
    description: 'Angular rock blend in multiple sizes for road base, driveways, and parking areas.',
    applications: ['Road construction', 'Driveways', 'Parking lots', 'Site pads'],
  },
  {
    name: 'Pea Gravel',
    description: 'Smooth, rounded stones for walkways, landscaping accents, and playground surfaces.',
    applications: ['Walkways', 'Landscaping', 'Playgrounds', 'Garden paths'],
  },
  {
    name: 'Drain Rock',
    description: 'Clean, sized rock for drainage applications, septic systems, and foundation protection.',
    applications: ['Septic systems', 'Foundation drains', 'French drains', 'Perimeter drainage'],
  },
];

const faqs = [
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
    question: 'Can I place custom orders for specific aggregate blends?',
    answer:
      'Yes. With our own crushing operations at 7 pit locations, we can produce custom aggregate blends to meet your project specifications. Custom orders may require additional lead time.',
  },
  {
    question: 'Do you supply both residential and industrial customers?',
    answer:
      'Absolutely. We serve everyone from homeowners needing a few tonnes of sand for a backyard project to industrial operations requiring thousands of tonnes of aggregate for construction sites.',
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
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">
            Sand &amp; Gravel in Edson, AB
          </h1>
          <p className="text-lg text-gray-200 max-w-2xl">
            Quality construction sand, bedding sand, and gravel varieties for
            industrial and residential applications. Delivered to Edson from our
            nearby pit operations.
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
              <Building2 className="w-10 h-10 text-brand-red mb-4" />
              <h3 className="font-heading text-xl font-bold text-brand-charcoal mb-3">
                Industrial Grade
              </h3>
              <p className="text-gray-700">
                Sand and gravel produced to meet construction and industrial
                specifications for demanding applications.
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
            <div className="bg-white p-8 rounded-lg border border-gray-200 hover:border-brand-red hover:shadow-lg transition-all">
              <Layers className="w-10 h-10 text-brand-red mb-4" />
              <h3 className="font-heading text-xl font-bold text-brand-charcoal mb-3">
                Wide Variety
              </h3>
              <p className="text-gray-700">
                Multiple sand types and gravel varieties to cover every
                construction and landscaping need.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sand Products */}
      <section className="section-padding">
        <div className="container-wide">
          <h2 className="font-heading text-3xl font-bold text-brand-charcoal mb-12">
            Sand Products
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
            Gravel Products
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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

      {/* Service Area */}
      <section className="section-padding">
        <div className="container-wide">
          <h2 className="font-heading text-3xl font-bold text-brand-charcoal mb-6">
            Delivery to Edson &amp; Area
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-4 text-gray-700">
              <p>
                Edson is approximately 35 minutes from our Hinton-area pit
                locations, making regular deliveries efficient and cost-effective.
                We deliver sand and gravel to construction sites, residential
                properties, and industrial operations throughout the Edson area.
              </p>
              <p>
                Our fleet of belly dumps, end dumps, and truck &amp; pups can
                handle any order size, from a single load for a homeowner to
                ongoing supply for a major construction project.
              </p>
              <div className="space-y-2 mt-6">
                {['Regular delivery schedule to Edson', 'Bulk pricing for large orders', '1-2 day turnaround on most orders', 'Custom aggregate blends available', 'Gradation reports on request'].map((item) => (
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
                  Receive a competitive quote including delivery
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
            &ldquo;We have been ordering sand and gravel from WCC for our Edson
            projects for years. The quality is always consistent and delivery is
            dependable. They are our preferred supplier in the region.&rdquo;
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
            Get competitive pricing on sand and gravel delivery to Edson.
            Industrial and residential orders welcome.
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
