'use client';

import Link from 'next/link';
import {
  ChevronRight,
  Shield,
  Leaf,
  CheckCircle,
  Phone,
  Star,
  HelpCircle,
  TreePine,
  Droplets,
  Flame,
  FileCheck,
  AlertTriangle,
} from 'lucide-react';

const services = [
  {
    name: 'Oil & Gas Lease Reclamation',
    icon: Droplets,
    description:
      'Complete wellsite reclamation from initial assessment through final certification. We restore oil and gas leases to meet Alberta Environment and Parks standards for reclamation certificates.',
    details: [
      'Wellsite decommissioning support',
      'Topsoil stripping and stockpiling',
      'Subsoil remediation and recontouring',
      'Revegetation and erosion control',
      'Reclamation certificate preparation',
    ],
  },
  {
    name: 'Contaminated Soil Removal',
    icon: AlertTriangle,
    description:
      'Safe excavation, transport, and disposal of contaminated soils from industrial sites. We follow all Alberta Environment regulations for handling and transporting contaminated materials.',
    details: [
      'Phase II ESA support',
      'Contaminated soil excavation',
      'Bioremediation cell construction',
      'Licensed transport to approved facilities',
      'Chain of custody documentation',
    ],
  },
  {
    name: 'Pipeline ROW Restoration',
    icon: TreePine,
    description:
      'Right-of-way restoration following pipeline construction, maintenance, or abandonment. Our team restores terrain, drainage patterns, and vegetation to pre-disturbance conditions.',
    details: [
      'Terrain recontouring',
      'Drainage restoration',
      'Topsoil replacement and grading',
      'Revegetation seeding programs',
      'Monitoring and reporting',
    ],
  },
  {
    name: 'Post-Fire Land Clearing',
    icon: Flame,
    description:
      'Debris removal, hazard tree clearing, and site stabilization following wildfire events. We help landowners and operators restore fire-damaged properties and lease sites.',
    details: [
      'Burned timber and debris removal',
      'Hazard tree assessment and felling',
      'Erosion control installation',
      'Site stabilization and grading',
      'Revegetation planning',
    ],
  },
  {
    name: 'Environmental Compliance',
    icon: FileCheck,
    description:
      'Ongoing environmental compliance support for active operations. We help clients meet regulatory requirements and maintain their environmental standing with Alberta authorities.',
    details: [
      'Environmental monitoring programs',
      'Regulatory compliance audits',
      'Spill response and cleanup',
      'Waste management planning',
      'Reporting and documentation',
    ],
  },
];

const certifications = [
  {
    name: 'COR Certified',
    description: 'Certificate of Recognition for occupational health and safety excellence in Alberta.',
  },
  {
    name: 'ISNetworld',
    description: 'International safety and environmental compliance verification for contractor management.',
  },
  {
    name: 'ComplyWorks',
    description: 'Comprehensive compliance management system for safety, insurance, and regulatory requirements.',
  },
];

const faqs = [
  {
    question: 'What types of remediation projects do you handle?',
    answer:
      'We handle oil and gas lease reclamation, contaminated soil removal, pipeline right-of-way restoration, post-fire land clearing, and ongoing environmental compliance support. Our team has extensive experience with Alberta regulatory requirements.',
  },
  {
    question: 'Are you qualified for oil and gas remediation work?',
    answer:
      'Yes. We are COR Certified, ISNetworld compliant, and registered with ComplyWorks. We have over 40 years of experience working with oil and gas operators throughout western Alberta and understand the regulatory landscape thoroughly.',
  },
  {
    question: 'What areas do you serve for remediation projects?',
    answer:
      'We serve the entire western Alberta region including Hinton, Edson, Grande Cache, Whitecourt, and surrounding Yellowhead and Woodlands counties. We regularly work on remote lease sites and pipeline corridors throughout the area.',
  },
  {
    question: 'How do I get started with a remediation project?',
    answer:
      'Contact us at (780) 865-3000 or submit a quote request online. We will discuss your project scope, visit the site if needed, and provide a detailed proposal including timeline and pricing.',
  },
];

export default function RemediationPage() {
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
            <Link href="/services" className="hover:text-brand-red">
              Services
            </Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            <span className="text-brand-charcoal font-semibold">
              Remediation
            </span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-brand-charcoal via-gray-800 to-brand-charcoal text-white">
        <div className="container-wide">
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">
            Environmental Remediation Services
          </h1>
          <p className="text-lg text-gray-200 max-w-2xl">
            Comprehensive environmental remediation and reclamation services for
            oil &amp; gas, pipeline, and industrial clients across western Alberta.
            COR Certified, ISNetworld compliant, and backed by 40+ years of
            experience.
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
              <Shield className="w-10 h-10 text-brand-red mb-4" />
              <h3 className="font-heading text-xl font-bold text-brand-charcoal mb-3">
                Fully Certified
              </h3>
              <p className="text-gray-700">
                COR, ISNetworld, and ComplyWorks certified for all safety and
                environmental compliance requirements.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg border border-gray-200 hover:border-brand-red hover:shadow-lg transition-all">
              <Leaf className="w-10 h-10 text-brand-red mb-4" />
              <h3 className="font-heading text-xl font-bold text-brand-charcoal mb-3">
                Environmental Focus
              </h3>
              <p className="text-gray-700">
                Committed to restoring disturbed lands to productive use while
                meeting all Alberta regulatory standards.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg border border-gray-200 hover:border-brand-red hover:shadow-lg transition-all">
              <TreePine className="w-10 h-10 text-brand-red mb-4" />
              <h3 className="font-heading text-xl font-bold text-brand-charcoal mb-3">
                Local Knowledge
              </h3>
              <p className="text-gray-700">
                Deep understanding of western Alberta terrain, soil conditions,
                and vegetation patterns for effective reclamation.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg border border-gray-200 hover:border-brand-red hover:shadow-lg transition-all">
              <FileCheck className="w-10 h-10 text-brand-red mb-4" />
              <h3 className="font-heading text-xl font-bold text-brand-charcoal mb-3">
                Full Documentation
              </h3>
              <p className="text-gray-700">
                Complete project documentation, reporting, and compliance records
                for regulatory submissions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="section-padding">
        <div className="container-wide">
          <h2 className="font-heading text-3xl font-bold text-brand-charcoal mb-12">
            Our Remediation Services
          </h2>
          <div className="space-y-8">
            {services.map((service) => {
              const IconComponent = service.icon;
              return (
                <div
                  key={service.name}
                  className="bg-white border-2 border-gray-200 rounded-lg p-8 hover:border-brand-red transition-colors hover:shadow-lg"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                      <div className="flex items-center mb-4">
                        <IconComponent className="w-8 h-8 text-brand-red mr-4" />
                        <h3 className="font-heading text-2xl font-bold text-brand-charcoal">
                          {service.name}
                        </h3>
                      </div>
                      <p className="text-gray-700">{service.description}</p>
                    </div>
                    <div>
                      <h4 className="font-heading font-semibold text-brand-charcoal mb-3">
                        Key Activities:
                      </h4>
                      <ul className="space-y-2">
                        {service.details.map((detail) => (
                          <li key={detail} className="flex items-start text-sm text-gray-700">
                            <CheckCircle className="w-4 h-4 text-brand-red mr-2 mt-0.5 flex-shrink-0" />
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="section-padding bg-gray-50">
        <div className="container-wide">
          <h2 className="font-heading text-3xl font-bold text-brand-charcoal mb-12 text-center">
            Certifications &amp; Compliance
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {certifications.map((cert) => (
              <div
                key={cert.name}
                className="bg-white p-8 rounded-lg border-l-4 border-brand-red shadow-md"
              >
                <Shield className="w-8 h-8 text-brand-red mb-4" />
                <h3 className="font-heading text-xl font-bold text-brand-charcoal mb-3">
                  {cert.name}
                </h3>
                <p className="text-gray-700">{cert.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Area */}
      <section className="section-padding">
        <div className="container-wide">
          <h2 className="font-heading text-3xl font-bold text-brand-charcoal mb-6">
            Service Area
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-4 text-gray-700">
              <p>
                We perform environmental remediation projects across the entire
                western Alberta region. Our base in Hinton provides efficient
                access to oil and gas lease sites, pipeline corridors, and
                industrial properties throughout the area.
              </p>
              <p>
                With our own fleet of trucks and heavy equipment, we can mobilize
                quickly to any site in the region. Our aggregate operations also
                allow us to supply remediation projects with clean fill, topsoil,
                and other reclamation materials from our own sources.
              </p>
              <div className="space-y-2 mt-6">
                {['Hinton and surrounding area', 'Edson and Yellowhead County', 'Grande Cache and Greenview County', 'Whitecourt and Woodlands County', 'Jasper area and Highway 16 corridor', 'Remote lease sites and pipeline ROWs'].map((area) => (
                  <div key={area} className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-brand-red mr-3 flex-shrink-0" />
                    <span>{area}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white p-8 rounded-lg border border-gray-200">
              <h3 className="font-heading text-xl font-bold text-brand-charcoal mb-4">
                Project Process
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-brand-red mr-3 mt-1 font-bold">1.</span>
                  Initial consultation and site assessment
                </li>
                <li className="flex items-start">
                  <span className="text-brand-red mr-3 mt-1 font-bold">2.</span>
                  Detailed scope of work and project proposal
                </li>
                <li className="flex items-start">
                  <span className="text-brand-red mr-3 mt-1 font-bold">3.</span>
                  Mobilization and remediation execution
                </li>
                <li className="flex items-start">
                  <span className="text-brand-red mr-3 mt-1 font-bold">4.</span>
                  Revegetation and monitoring
                </li>
                <li className="flex items-start">
                  <span className="text-brand-red mr-3 mt-1 font-bold">5.</span>
                  Documentation and regulatory submissions
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
            &ldquo;WCC handled the full reclamation of three lease sites for us.
            Their work was thorough, documentation was excellent, and we received
            our reclamation certificates without issue. A trusted partner for
            environmental work.&rdquo;
          </blockquote>
          <p className="text-brand-charcoal font-semibold">
            &mdash; Western Alberta Energy Producer
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-brand-red text-white">
        <div className="container-wide text-center">
          <h2 className="font-heading text-3xl font-bold mb-4">
            Need Environmental Remediation Services?
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto text-red-100">
            Contact our team to discuss your remediation or reclamation project.
            We provide detailed proposals and competitive pricing.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center px-8 py-3 bg-white text-brand-red font-semibold rounded-lg hover:bg-gray-100 transition-colors"
            >
              Contact Us
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
