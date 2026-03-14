'use client';

import Link from 'next/link';
import {
  ChevronRight,
  Truck,
  Pickaxe,
  Hammer,
  Wrench,
  Trees,
  Zap,
  MapPin,
  Clock,
  Phone,
  Star,
  ShieldCheck,
} from 'lucide-react';

const services = [
  { name: 'Trucking Services', icon: Truck, href: '/services/trucking' },
  { name: 'Aggregate Sales', icon: Pickaxe, href: '/services/aggregate-sales' },
  { name: 'Gravel Crushing', icon: Hammer, href: '/services/gravel-crushing' },
  { name: 'Equipment Rental', icon: Wrench, href: '/services/equipment-rental' },
  { name: 'Landscaping Supplies', icon: Trees, href: '/services/landscaping-supplies' },
  { name: 'Concrete Products', icon: Zap, href: '/services/concrete' },
];

export default function JasperServiceAreaPage() {
  return (
    <div className="bg-white">
      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="container-wide section-padding py-4">
          <div className="flex items-center text-sm text-gray-600">
            <Link href="/" className="hover:text-brand-red">Home</Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            <Link href="/service-areas" className="hover:text-brand-red">Service Areas</Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            <span className="text-brand-charcoal font-semibold">Jasper</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="section-padding bg-brand-charcoal text-white">
        <div className="container-wide">
          <div className="flex items-center text-brand-red font-semibold mb-3">
            <MapPin className="w-5 h-5 mr-2" />
            30 Minutes West of Hinton
          </div>
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">
            Aggregate Delivery &amp; Construction Services in Jasper, AB
          </h1>
          <p className="text-lg text-gray-200 max-w-2xl">
            Supporting Jasper&apos;s construction needs, tourism infrastructure, and
            wildfire recovery efforts. As the closest major aggregate supplier,
            West Central Contracting is proud to serve the Jasper community and
            Parks Canada projects.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding">
        <div className="container-wide">
          <h2 className="font-heading text-3xl font-bold text-brand-charcoal mb-8">
            Available Services in Jasper
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => {
              const IconComponent = service.icon;
              return (
                <Link key={service.name} href={service.href} className="group">
                  <div className="flex items-center p-6 rounded-lg border-2 border-gray-200 hover:border-brand-red hover:shadow-lg transition-all">
                    <IconComponent className="w-10 h-10 text-brand-red mr-4 flex-shrink-0" />
                    <div>
                      <h3 className="font-heading text-lg font-bold text-brand-charcoal group-hover:text-brand-red transition-colors">
                        {service.name}
                      </h3>
                      <p className="text-sm text-brand-red font-semibold">Available</p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Delivery Info */}
      <section className="section-padding bg-gray-50">
        <div className="container-wide">
          <h2 className="font-heading text-3xl font-bold text-brand-charcoal mb-8">
            Delivery Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg border border-gray-200">
              <MapPin className="w-8 h-8 text-brand-red mb-4" />
              <h3 className="font-heading text-xl font-bold text-brand-charcoal mb-2">30 Min from Hinton</h3>
              <p className="text-gray-700">
                Our proximity to Jasper via Highway 16 means fast, cost-effective
                delivery of aggregates and materials for all project types.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg border border-gray-200">
              <Clock className="w-8 h-8 text-brand-red mb-4" />
              <h3 className="font-heading text-xl font-bold text-brand-charcoal mb-2">Next-Day Delivery</h3>
              <p className="text-gray-700">
                Standard next-day delivery for Jasper projects. Same-day available
                for urgent construction and recovery needs upon request.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg border border-gray-200">
              <ShieldCheck className="w-8 h-8 text-brand-red mb-4" />
              <h3 className="font-heading text-xl font-bold text-brand-charcoal mb-2">Parks Compliant</h3>
              <p className="text-gray-700">
                Experienced working within Parks Canada requirements and environmental
                guidelines for projects within Jasper National Park.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Local Projects */}
      <section className="section-padding">
        <div className="container-wide">
          <h2 className="font-heading text-3xl font-bold text-brand-charcoal mb-8">
            Supporting Jasper&apos;s Growth &amp; Recovery
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg border-l-4 border-brand-red shadow-md">
              <Star className="w-6 h-6 text-brand-red mb-3" />
              <p className="text-gray-700 italic mb-4">
                &ldquo;When Jasper needed materials for recovery and rebuilding,
                West Central Contracting stepped up. Their proximity and reliability
                made them an essential partner in our restoration efforts.&rdquo;
              </p>
              <p className="font-semibold text-brand-charcoal">Jasper Construction Coordinator</p>
            </div>
            <div>
              <h3 className="font-heading text-xl font-bold text-brand-charcoal mb-4">
                Local Project Highlights
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-brand-red mr-3 mt-1 font-bold">&bull;</span>
                  Wildfire recovery and rebuilding support for the Jasper community
                </li>
                <li className="flex items-start">
                  <span className="text-brand-red mr-3 mt-1 font-bold">&bull;</span>
                  Parks Canada infrastructure and trail construction projects
                </li>
                <li className="flex items-start">
                  <span className="text-brand-red mr-3 mt-1 font-bold">&bull;</span>
                  Tourism facility construction and renovation
                </li>
                <li className="flex items-start">
                  <span className="text-brand-red mr-3 mt-1 font-bold">&bull;</span>
                  Municipal road maintenance and utility infrastructure
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-brand-red text-white">
        <div className="container-wide text-center">
          <h2 className="font-heading text-3xl font-bold mb-4">
            Need Materials Delivered to Jasper?
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto text-red-100">
            Whether it is a Parks Canada project, tourism build, or wildfire recovery
            work, we are ready to deliver. Contact us for a quote today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/quote"
              className="inline-flex items-center px-8 py-3 bg-white text-brand-red font-semibold rounded-lg hover:bg-gray-100 transition-colors"
            >
              Request a Quote
            </Link>
            <a
              href="tel:7808653000"
              className="inline-flex items-center px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-red-700 transition-colors"
            >
              <Phone className="w-5 h-5 mr-2" />
              (780) 865-3000
            </a>
            <a
              href="tel:7808650068"
              className="inline-flex items-center px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-red-700 transition-colors"
            >
              <Phone className="w-5 h-5 mr-2" />
              Dispatch: (780) 865-0068
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
