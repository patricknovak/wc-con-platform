'use client';

import Link from 'next/link';
import {
  ChevronRight,
  Truck,
  Clock,
  MapPin,
  CheckCircle,
  Phone,
  Star,
  HelpCircle,
} from 'lucide-react';

const products = [
  {
    name: 'Road Crush',
    size: '1/2" - 2.5"',
    description: 'Angular rock blend for compacting base layers. Ideal for driveways, roads, and parking lots.',
  },
  {
    name: 'Washed Rock',
    size: 'Various sizes',
    description: 'Clean, washed aggregates for landscaping, drainage, and decorative applications.',
  },
  {
    name: 'Pea Gravel',
    size: 'Uniform small',
    description: 'Smooth, rounded stones perfect for walkways, playgrounds, and garden paths.',
  },
  {
    name: 'Drain Rock',
    size: 'Specified grades',
    description: 'Clean rock for drainage layers, septic systems, and foundation perimeter drains.',
  },
];

const faqs = [
  {
    question: 'How quickly can I get gravel delivered in Hinton?',
    answer:
      'We offer same-day delivery for most orders placed before noon, depending on material availability. Our pit locations near Hinton allow us to load and deliver within hours for urgent projects.',
  },
  {
    question: 'What is the minimum order for gravel delivery?',
    answer:
      'Our minimum delivery is typically 10 tonnes for local Hinton deliveries. For smaller quantities, pickup from our pit locations is available. Contact us for details on your specific needs.',
  },
  {
    question: 'How is gravel delivery priced?',
    answer:
      'Pricing is based on material type, quantity, and delivery distance. We offer competitive bulk pricing for larger orders. Call (780) 865-3000 or request a quote online for an accurate estimate.',
  },
  {
    question: 'Which gravel is best for my driveway?',
    answer:
      'Road crush is our most popular driveway material. It compacts well, provides excellent drainage, and creates a durable, long-lasting surface. We recommend 4-6 inches of depth for most residential driveways.',
  },
];

export default function GravelDeliveryHintonPage() {
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
              Gravel Delivery Hinton
            </span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-brand-charcoal via-gray-800 to-brand-charcoal text-white">
        <div className="container-wide">
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">
            Gravel Delivery in Hinton, AB
          </h1>
          <p className="text-lg text-gray-200 max-w-2xl">
            Fast, reliable gravel delivery from our local pit locations. Same-day
            availability for residential and commercial projects throughout Hinton
            and surrounding areas.
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
              <Clock className="w-10 h-10 text-brand-red mb-4" />
              <h3 className="font-heading text-xl font-bold text-brand-charcoal mb-3">
                Same-Day Delivery
              </h3>
              <p className="text-gray-700">
                Orders placed before noon can often be delivered the same day from
                our nearby pit locations.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg border border-gray-200 hover:border-brand-red hover:shadow-lg transition-all">
              <MapPin className="w-10 h-10 text-brand-red mb-4" />
              <h3 className="font-heading text-xl font-bold text-brand-charcoal mb-3">
                Local Pit Locations
              </h3>
              <p className="text-gray-700">
                With 7 pit locations in the region, we maintain consistent supply
                and short delivery times for Hinton customers.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg border border-gray-200 hover:border-brand-red hover:shadow-lg transition-all">
              <Truck className="w-10 h-10 text-brand-red mb-4" />
              <h3 className="font-heading text-xl font-bold text-brand-charcoal mb-3">
                Full Fleet
              </h3>
              <p className="text-gray-700">
                Belly dumps, end dumps, and truck & pups ensure we have the right
                equipment for any delivery size.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="section-padding">
        <div className="container-wide">
          <h2 className="font-heading text-3xl font-bold text-brand-charcoal mb-12">
            Gravel Products Available for Delivery
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {products.map((product) => (
              <div
                key={product.name}
                className="bg-white border-2 border-gray-200 rounded-lg p-8 hover:border-brand-red transition-colors hover:shadow-lg"
              >
                <h3 className="font-heading text-2xl font-bold text-brand-charcoal mb-2">
                  {product.name}
                </h3>
                <p className="text-brand-red font-semibold mb-3">
                  Size: {product.size}
                </p>
                <p className="text-gray-700">{product.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Area */}
      <section className="section-padding bg-gray-50">
        <div className="container-wide">
          <h2 className="font-heading text-3xl font-bold text-brand-charcoal mb-6">
            Hinton Delivery Area
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-4 text-gray-700">
              <p>
                We deliver gravel throughout Hinton and the surrounding region,
                including Edson, Jasper, Grande Cache, and Whitecourt. Our
                centrally located pit operations mean shorter haul distances and
                faster turnaround for local customers.
              </p>
              <div className="space-y-2">
                {['Hinton town limits', 'Rural Yellowhead County', 'Highway 16 corridor', 'Edson (approx. 35 min)', 'Jasper and Jasper National Park area'].map((area) => (
                  <div key={area} className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-brand-red mr-3 flex-shrink-0" />
                    <span>{area}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white p-8 rounded-lg border border-gray-200">
              <h3 className="font-heading text-xl font-bold text-brand-charcoal mb-4">
                Delivery Details
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-brand-red mr-3 mt-1 font-bold">1.</span>
                  Request a quote online or call (780) 865-3000
                </li>
                <li className="flex items-start">
                  <span className="text-brand-red mr-3 mt-1 font-bold">2.</span>
                  We confirm material, quantity, and delivery window
                </li>
                <li className="flex items-start">
                  <span className="text-brand-red mr-3 mt-1 font-bold">3.</span>
                  Gravel is loaded and delivered to your site
                </li>
                <li className="flex items-start">
                  <span className="text-brand-red mr-3 mt-1 font-bold">4.</span>
                  Placement as directed or stockpiled on-site
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
            &ldquo;WCC delivered 40 tonnes of road crush for our acreage driveway.
            They showed up on time, placed it exactly where we needed it, and the
            quality was excellent. Best gravel supplier in the Hinton area.&rdquo;
          </blockquote>
          <p className="text-brand-charcoal font-semibold">
            &mdash; Local Hinton Homeowner
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-brand-red text-white">
        <div className="container-wide text-center">
          <h2 className="font-heading text-3xl font-bold mb-4">
            Need Gravel Delivered in Hinton?
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto text-red-100">
            Get a free quote on gravel delivery for your project. Same-day
            delivery available for most materials.
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
