'use client';

import Link from 'next/link';
import {
  ChevronRight,
  TreePine,
  Leaf,
  Sun,
  CheckCircle,
  Phone,
  Star,
  HelpCircle,
  Truck,
} from 'lucide-react';

const products = [
  {
    name: 'Topsoil',
    description: 'Rich, screened topsoil for gardens, lawns, and landscaping beds. Perfect for establishing new growth and rejuvenating tired soil.',
    seasonal: 'Spring & Summer bestseller',
  },
  {
    name: 'Landscaping Mulch',
    description: 'Quality wood mulch for garden beds, tree rings, and pathways. Suppresses weeds and retains moisture through hot summer months.',
    seasonal: 'Available year-round',
  },
  {
    name: 'Decorative Stone',
    description: 'A range of attractive stone options for borders, rock gardens, dry creek beds, and accent features around your property.',
    seasonal: 'Popular spring through fall',
  },
  {
    name: 'Rainbow Rock',
    description: 'Locally sourced colorful decorative rock that adds stunning visual interest to any landscape design.',
    seasonal: 'Limited seasonal availability',
  },
  {
    name: 'Pea Gravel',
    description: 'Smooth, rounded stones ideal for walkways, patios, garden paths, and playground surfaces.',
    seasonal: 'Available year-round',
  },
  {
    name: 'Landscaping Boulders',
    description: 'Natural boulders in various sizes for retaining walls, garden features, property borders, and accent placements.',
    seasonal: 'Available year-round',
  },
  {
    name: 'Landscaping Rock',
    description: 'Assorted rock varieties for general landscaping, ground cover, erosion control, and decorative fill areas.',
    seasonal: 'Available year-round',
  },
  {
    name: 'Fill Dirt',
    description: 'Clean fill dirt for grading, levelling, and raising garden beds. Essential for spring landscaping preparation.',
    seasonal: 'High demand spring',
  },
];

const faqs = [
  {
    question: 'What is the best material for a gravel driveway?',
    answer:
      'For driveways, we recommend road crush rather than decorative landscaping materials. Road crush compacts well and provides a durable, low-maintenance surface. For decorative borders alongside driveways, pea gravel or decorative stone works beautifully.',
  },
  {
    question: 'What materials do you recommend for garden beds?',
    answer:
      'Start with quality topsoil as your base, then top with landscaping mulch for moisture retention and weed suppression. Decorative stone borders add a polished finish. We can deliver all three materials together.',
  },
  {
    question: 'How is pricing structured for landscaping materials?',
    answer:
      'Pricing is per tonne for most materials, with delivery charges based on distance. We offer bulk discounts for larger orders. Contact us for a custom quote based on your specific material list and quantities.',
  },
  {
    question: 'Do you deliver small residential orders?',
    answer:
      'Yes, we deliver to residential properties in Hinton and surrounding areas. Minimum delivery quantities apply. For very small amounts, pickup from our yard is also available.',
  },
];

export default function LandscapingMaterialsHintonPage() {
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
              Landscaping Materials Hinton
            </span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-brand-charcoal via-gray-800 to-brand-charcoal text-white">
        <div className="container-wide">
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">
            Landscaping Materials in Hinton, AB
          </h1>
          <p className="text-lg text-gray-200 max-w-2xl">
            Premium topsoil, mulch, decorative stone, boulders, and landscaping
            rock for residential and commercial projects. Delivered to your
            property in Hinton and surrounding areas.
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
              <TreePine className="w-10 h-10 text-brand-red mb-4" />
              <h3 className="font-heading text-xl font-bold text-brand-charcoal mb-3">
                Full Selection
              </h3>
              <p className="text-gray-700">
                Everything from topsoil to boulders, all sourced and stocked
                locally for your convenience.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg border border-gray-200 hover:border-brand-red hover:shadow-lg transition-all">
              <Truck className="w-10 h-10 text-brand-red mb-4" />
              <h3 className="font-heading text-xl font-bold text-brand-charcoal mb-3">
                Local Delivery
              </h3>
              <p className="text-gray-700">
                Fast delivery to Hinton, Edson, and surrounding areas from our
                nearby yard and pit locations.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg border border-gray-200 hover:border-brand-red hover:shadow-lg transition-all">
              <Sun className="w-10 h-10 text-brand-red mb-4" />
              <h3 className="font-heading text-xl font-bold text-brand-charcoal mb-3">
                Seasonal Stock
              </h3>
              <p className="text-gray-700">
                We stock up for spring and summer landscaping season so materials
                are ready when you are.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg border border-gray-200 hover:border-brand-red hover:shadow-lg transition-all">
              <Leaf className="w-10 h-10 text-brand-red mb-4" />
              <h3 className="font-heading text-xl font-bold text-brand-charcoal mb-3">
                Expert Guidance
              </h3>
              <p className="text-gray-700">
                Not sure what you need? Our team can recommend the right materials
                for your landscaping project.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="section-padding">
        <div className="container-wide">
          <h2 className="font-heading text-3xl font-bold text-brand-charcoal mb-12">
            Landscaping Materials Available
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
                <p className="text-gray-700 text-sm mb-3">{product.description}</p>
                <span className="text-brand-red text-xs font-semibold">
                  {product.seasonal}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Area & Delivery */}
      <section className="section-padding bg-gray-50">
        <div className="container-wide">
          <h2 className="font-heading text-3xl font-bold text-brand-charcoal mb-6">
            Delivery to Hinton &amp; Area
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-4 text-gray-700">
              <p>
                We deliver landscaping materials throughout Hinton and the
                surrounding region. Whether you are a homeowner working on a
                weekend project or a landscaping company managing multiple sites,
                we have the capacity and selection to keep your projects on track.
              </p>
              <p>
                Spring and summer are our busiest seasons for landscaping
                materials. We recommend ordering early to ensure availability of
                popular items like topsoil and decorative stone.
              </p>
              <div className="space-y-2 mt-6">
                {['Hinton residential delivery', 'Edson and area', 'Jasper and Jasper National Park', 'Rural Yellowhead County', 'Commercial and municipal projects'].map((area) => (
                  <div key={area} className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-brand-red mr-3 flex-shrink-0" />
                    <span>{area}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white p-8 rounded-lg border border-gray-200">
              <h3 className="font-heading text-xl font-bold text-brand-charcoal mb-4">
                How to Order
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-brand-red mr-3 mt-1 font-bold">1.</span>
                  Browse our materials or call for recommendations
                </li>
                <li className="flex items-start">
                  <span className="text-brand-red mr-3 mt-1 font-bold">2.</span>
                  Request a quote with your material list and quantities
                </li>
                <li className="flex items-start">
                  <span className="text-brand-red mr-3 mt-1 font-bold">3.</span>
                  We confirm pricing and schedule your delivery
                </li>
                <li className="flex items-start">
                  <span className="text-brand-red mr-3 mt-1 font-bold">4.</span>
                  Materials delivered and placed at your property
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
            &ldquo;We ordered topsoil, mulch, and decorative stone for a complete
            backyard renovation. WCC delivered everything on time and the
            quality was outstanding. Our yard looks incredible.&rdquo;
          </blockquote>
          <p className="text-brand-charcoal font-semibold">
            &mdash; Hinton Homeowner
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-brand-red text-white">
        <div className="container-wide text-center">
          <h2 className="font-heading text-3xl font-bold mb-4">
            Ready to Transform Your Landscape?
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto text-red-100">
            Get a free quote on landscaping materials delivered to your Hinton
            property. Order early for spring and summer projects.
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
