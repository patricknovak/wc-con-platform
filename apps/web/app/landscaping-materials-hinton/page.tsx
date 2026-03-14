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
  Snowflake,
  DollarSign,
  Flower2,
} from 'lucide-react';

const products = [
  {
    name: 'Topsoil',
    description:
      'Rich, screened topsoil for gardens, lawns, and landscaping beds. Perfect for establishing new growth and rejuvenating tired soil.',
    priceRange: '$25 - $40 per tonne',
    seasonal: 'Spring & Summer bestseller',
  },
  {
    name: 'Mulch',
    description:
      'Quality wood mulch for garden beds, tree rings, and pathways. Suppresses weeds and retains moisture through hot summer months.',
    priceRange: '$30 - $50 per tonne',
    seasonal: 'Available year-round',
  },
  {
    name: 'Decorative Stone',
    description:
      'A range of attractive stone options for borders, rock gardens, dry creek beds, and accent features around your property.',
    priceRange: '$45 - $80 per tonne',
    seasonal: 'Popular spring through fall',
  },
  {
    name: 'River Rock',
    description:
      'Naturally rounded river rock in various sizes for water features, dry creek beds, garden borders, and drainage solutions.',
    priceRange: '$50 - $90 per tonne',
    seasonal: 'High demand spring & summer',
  },
  {
    name: 'Landscaping Gravel',
    description:
      'Versatile gravel for pathways, driveways, ground cover, and general landscaping applications. Multiple sizes and colours available.',
    priceRange: '$20 - $45 per tonne',
    seasonal: 'Available year-round',
  },
  {
    name: 'Garden Soil',
    description:
      'Premium blended garden soil enriched for flower beds, vegetable gardens, and raised planters. Optimized for the Hinton growing climate.',
    priceRange: '$30 - $55 per tonne',
    seasonal: 'Peak demand May - July',
  },
];

const seasonalTips = [
  {
    season: 'Spring (April - May)',
    icon: Flower2,
    tips: [
      'Order topsoil and garden soil early before peak demand hits',
      'Apply mulch after the ground thaws to suppress weeds and retain moisture',
      'River rock and decorative stone installations work best in dry spring conditions',
      'Plan delivery access before the ground softens from snowmelt',
    ],
  },
  {
    season: 'Summer (June - August)',
    icon: Sun,
    tips: [
      'Mulch garden beds to retain moisture during hot, dry spells',
      'Top-dress lawns with screened topsoil for a lush fall finish',
      'Install gravel pathways during dry weather for best compaction',
      'Water new plantings in garden soil regularly during heat waves',
    ],
  },
  {
    season: 'Fall (September - October)',
    icon: Leaf,
    tips: [
      'Add a fresh layer of mulch before freeze-up to protect plant roots',
      'Complete gravel and stone projects before the first snowfall',
      'Amend garden beds with topsoil to prepare for next year',
      'Order bulk materials at off-peak pricing before yards close for winter',
    ],
  },
  {
    season: 'Winter (November - March)',
    icon: Snowflake,
    tips: [
      'Plan your spring landscaping project and request quotes in advance',
      'Pre-order popular materials like topsoil and river rock to secure supply',
      'Review drainage on your property to identify spring improvement areas',
      'Take advantage of off-season pricing on select materials',
    ],
  },
];

const faqs = [
  {
    question: 'What landscaping materials do you carry for Hinton homeowners?',
    answer:
      'We stock topsoil, mulch, decorative stone, river rock, landscaping gravel, garden soil, pea gravel, boulders, and fill dirt. Our materials are sourced locally and stocked at our Hinton yard for quick delivery to your property.',
  },
  {
    question: 'How much does landscaping material delivery cost in Hinton?',
    answer:
      'Delivery pricing depends on material type, quantity, and distance. Local Hinton deliveries are very affordable given our proximity. Bulk orders receive volume discounts. Call (780) 865-3000 or request a quote online for exact pricing.',
  },
  {
    question: 'What is the minimum order for residential delivery?',
    answer:
      'Our minimum delivery is typically 5-10 tonnes for residential orders in Hinton, depending on the material. For smaller quantities, pickup from our yard at 450 East River Road is available during business hours.',
  },
  {
    question: 'Which material is best for garden beds in the Hinton climate?',
    answer:
      'We recommend starting with our premium garden soil as a base, then topping with mulch for moisture retention and weed suppression. The Hinton growing season is short, so quality soil that warms quickly in spring gives your plants a head start.',
  },
  {
    question: 'Can you deliver multiple materials in one order?',
    answer:
      'Yes, we regularly deliver multiple materials to the same property. For example, topsoil for garden beds, river rock for a dry creek feature, and landscaping gravel for pathways can all be delivered together, saving on delivery costs.',
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
          <p className="text-lg text-gray-200 max-w-2xl mb-8">
            Premium topsoil, mulch, decorative stone, river rock, landscaping
            gravel, and garden soil for residential and commercial projects.
            Delivered to your property in Hinton and surrounding areas by West
            Central Contracting — family-owned since 1980.
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
            Why Choose West Central Contracting?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-lg border border-gray-200 hover:border-brand-red hover:shadow-lg transition-all">
              <TreePine className="w-10 h-10 text-brand-red mb-4" />
              <h3 className="font-heading text-xl font-bold text-brand-charcoal mb-3">
                Full Selection
              </h3>
              <p className="text-gray-700">
                Topsoil, mulch, decorative stone, river rock, landscaping gravel,
                and garden soil — all sourced and stocked locally.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg border border-gray-200 hover:border-brand-red hover:shadow-lg transition-all">
              <Truck className="w-10 h-10 text-brand-red mb-4" />
              <h3 className="font-heading text-xl font-bold text-brand-charcoal mb-3">
                Local Delivery
              </h3>
              <p className="text-gray-700">
                Fast delivery to Hinton, Edson, and surrounding areas from our
                yard at 450 East River Road, Hinton.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg border border-gray-200 hover:border-brand-red hover:shadow-lg transition-all">
              <DollarSign className="w-10 h-10 text-brand-red mb-4" />
              <h3 className="font-heading text-xl font-bold text-brand-charcoal mb-3">
                Competitive Pricing
              </h3>
              <p className="text-gray-700">
                Bulk discounts on large orders and transparent per-tonne pricing.
                No hidden fees — what we quote is what you pay.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg border border-gray-200 hover:border-brand-red hover:shadow-lg transition-all">
              <Leaf className="w-10 h-10 text-brand-red mb-4" />
              <h3 className="font-heading text-xl font-bold text-brand-charcoal mb-3">
                Expert Guidance
              </h3>
              <p className="text-gray-700">
                Not sure what you need? Our team can recommend the right materials
                for your landscaping project and Hinton&apos;s climate.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Products with Pricing */}
      <section className="section-padding">
        <div className="container-wide">
          <h2 className="font-heading text-3xl font-bold text-brand-charcoal mb-4">
            Landscaping Materials &amp; Pricing
          </h2>
          <p className="text-gray-600 mb-12 max-w-2xl">
            Pricing varies by quantity, season, and delivery distance. The ranges
            below are estimates — contact us for an exact quote on your order.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div
                key={product.name}
                className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-brand-red transition-colors hover:shadow-lg"
              >
                <h3 className="font-heading text-xl font-bold text-brand-charcoal mb-2">
                  {product.name}
                </h3>
                <p className="text-brand-red font-semibold text-sm mb-3">
                  {product.priceRange}
                </p>
                <p className="text-gray-700 text-sm mb-3">{product.description}</p>
                <span className="text-gray-500 text-xs font-semibold">
                  {product.seasonal}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Local Delivery Info */}
      <section className="section-padding bg-gray-50">
        <div className="container-wide">
          <h2 className="font-heading text-3xl font-bold text-brand-charcoal mb-6">
            Delivery to Hinton &amp; Surrounding Areas
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-4 text-gray-700">
              <p>
                We deliver landscaping materials throughout Hinton and the
                surrounding region from our yard at 450 East River Road. Whether
                you are a homeowner working on a weekend project or a landscaping
                company managing multiple sites, we have the capacity and
                selection to keep your projects on track.
              </p>
              <p>
                Spring and summer are our busiest seasons for landscaping
                materials. We recommend ordering early to ensure availability of
                popular items like topsoil, garden soil, and river rock.
              </p>
              <div className="space-y-2 mt-6">
                {[
                  'Hinton residential and commercial delivery',
                  'Edson and area (approx. 35 min)',
                  'Jasper and Jasper National Park',
                  'Rural Yellowhead County properties',
                  'Pickup available at 450 East River Road',
                ].map((area) => (
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
                  Browse our materials or call (780) 865-3000 for recommendations
                </li>
                <li className="flex items-start">
                  <span className="text-brand-red mr-3 mt-1 font-bold">2.</span>
                  Request a quote with your material list and quantities
                </li>
                <li className="flex items-start">
                  <span className="text-brand-red mr-3 mt-1 font-bold">3.</span>
                  We confirm pricing and schedule your delivery window
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

      {/* Seasonal Tips */}
      <section className="section-padding">
        <div className="container-wide">
          <h2 className="font-heading text-3xl font-bold text-brand-charcoal mb-12 text-center">
            Seasonal Landscaping Tips for Hinton
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {seasonalTips.map((item) => {
              const IconComponent = item.icon;
              return (
                <div
                  key={item.season}
                  className="bg-gray-50 border border-gray-200 rounded-lg p-8 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-center mb-4">
                    <IconComponent className="w-8 h-8 text-brand-red mr-3" />
                    <h3 className="font-heading text-xl font-bold text-brand-charcoal">
                      {item.season}
                    </h3>
                  </div>
                  <ul className="space-y-2">
                    {item.tips.map((tip) => (
                      <li key={tip} className="flex items-start text-gray-700 text-sm">
                        <CheckCircle className="w-4 h-4 text-brand-red mr-2 mt-0.5 flex-shrink-0" />
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
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
      <section className="section-padding">
        <div className="container-wide max-w-3xl text-center">
          <Star className="w-10 h-10 text-brand-red mx-auto mb-6" />
          <blockquote className="text-xl text-gray-700 italic mb-6">
            &ldquo;We ordered topsoil, river rock, and garden soil for a
            complete backyard renovation. WCC delivered everything on time and
            the quality was outstanding. Our yard looks incredible.&rdquo;
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
