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
  Shovel,
  Sprout,
  Truck,
  Mountain,
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
    name: 'Land Clearing',
    icon: Shovel,
    description:
      'Professional land clearing for development, lease preparation, and remediation projects. We handle everything from initial clearing through grubbing and site preparation.',
    details: [
      'Timber and brush clearing',
      'Stump removal and grubbing',
      'Debris disposal and burning',
      'Site grading and preparation',
      'Salvage timber management',
    ],
  },
  {
    name: 'Erosion Control',
    icon: Mountain,
    description:
      'Comprehensive erosion control solutions for disturbed sites, slopes, and watercourse crossings. We design and install systems that meet Alberta regulatory requirements and protect sensitive environments.',
    details: [
      'Silt fence and sediment barrier installation',
      'Slope stabilization and armouring',
      'Watercourse crossing protection',
      'Drainage channel construction',
      'Ongoing monitoring and maintenance',
    ],
  },
  {
    name: 'Revegetation',
    icon: Sprout,
    description:
      'Native seed mix application and revegetation programs tailored to western Alberta ecosystems. We restore disturbed lands to productive, self-sustaining plant communities.',
    details: [
      'Native seed mix selection and sourcing',
      'Seedbed preparation and amendment',
      'Hydroseeding and drill seeding',
      'Invasive species management',
      'Multi-year monitoring programs',
    ],
  },
];

const caseStudies = [
  {
    title: 'Multi-Well Lease Reclamation — Yellowhead County',
    description:
      'Reclaimed 12 abandoned wellsites across Yellowhead County over two seasons. Work included contaminated soil removal from three sites, terrain recontouring, topsoil replacement, and revegetation with native seed mixes. All 12 sites received reclamation certificates from Alberta Environment.',
    stats: ['12 wellsites reclaimed', '2 seasons to complete', '100% certification rate'],
  },
  {
    title: 'Pipeline ROW Restoration — Highway 16 Corridor',
    description:
      'Restored 28 km of pipeline right-of-way following a major pipeline replacement project. Scope included terrain recontouring, drainage restoration, erosion control installation, and revegetation. Work was completed on schedule with zero environmental incidents.',
    stats: ['28 km ROW restored', 'Zero environmental incidents', 'On-schedule completion'],
  },
  {
    title: 'Contaminated Soil Remediation — Industrial Site Near Edson',
    description:
      'Excavated and transported over 5,000 tonnes of hydrocarbon-contaminated soil from a former industrial facility. Constructed an on-site bioremediation cell for treatment of lower-concentration soils. Full chain of custody documentation provided for all materials.',
    stats: ['5,000+ tonnes removed', 'On-site biocell constructed', 'Full regulatory compliance'],
  },
];

const equipment = [
  'Excavators (multiple sizes from 20T to 50T)',
  'Dozers for land clearing and grading',
  'Belly dump and end dump trucks for soil hauling',
  'Rock trucks for off-road material transport',
  'Graders for fine grading and recontouring',
  'Hydroseeders for revegetation applications',
  'Skid steers for confined area work',
  'Lowbed trailers for equipment mobilization',
];

const certifications = [
  {
    name: 'COR Certified',
    description:
      'Certificate of Recognition for occupational health and safety excellence in Alberta.',
  },
  {
    name: 'ISNetworld',
    description:
      'International safety and environmental compliance verification for contractor management.',
  },
  {
    name: 'ComplyWorks',
    description:
      'Comprehensive compliance management system for safety, insurance, and regulatory requirements.',
  },
];

const faqs = [
  {
    question: 'What types of remediation projects do you handle?',
    answer:
      'We handle oil and gas lease reclamation, contaminated soil removal, pipeline right-of-way restoration, land clearing, erosion control, and revegetation. Our team has extensive experience with Alberta Environment and Parks regulatory requirements across all project types.',
  },
  {
    question: 'Are you qualified for oil and gas remediation work?',
    answer:
      'Yes. We are COR Certified, ISNetworld compliant, and registered with ComplyWorks. We have over 40 years of experience working with oil and gas operators throughout western Alberta and understand the regulatory landscape thoroughly.',
  },
  {
    question: 'What equipment do you have available for remediation projects?',
    answer:
      'We maintain a full fleet of excavators (20T to 50T), dozers, graders, belly dumps, end dumps, rock trucks, skid steers, hydroseeders, and lowbed trailers. Having our own equipment means we can mobilize quickly and control costs for our clients.',
  },
  {
    question: 'Do you comply with Alberta Environment regulations?',
    answer:
      'Absolutely. All our remediation work is performed in full compliance with Alberta Environment and Parks regulations, including the Environmental Protection and Enhancement Act (EPEA) and Alberta Energy Regulator (AER) directives. We provide complete documentation for regulatory submissions.',
  },
  {
    question: 'How do I get started with a remediation project?',
    answer:
      'Contact us at (780) 865-3000 or submit a quote request online. We will discuss your project scope, visit the site if needed, and provide a detailed proposal including timeline, equipment plan, and pricing.',
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
          <p className="text-lg text-gray-200 max-w-2xl mb-8">
            Comprehensive environmental remediation and reclamation services for
            oil &amp; gas, pipeline, and industrial clients across western
            Alberta. From lease reclamation and contaminated soil removal to
            land clearing, erosion control, and revegetation — COR Certified,
            ISNetworld compliant, and backed by 40+ years of experience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/quote"
              className="btn-primary inline-flex items-center justify-center px-8 py-3 font-semibold rounded-lg"
            >
              Request a Quote
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors"
            >
              Contact Us
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
                meeting all Alberta Environment and Parks standards.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg border border-gray-200 hover:border-brand-red hover:shadow-lg transition-all">
              <TreePine className="w-10 h-10 text-brand-red mb-4" />
              <h3 className="font-heading text-xl font-bold text-brand-charcoal mb-3">
                Local Knowledge
              </h3>
              <p className="text-gray-700">
                Deep understanding of western Alberta terrain, soil conditions,
                and native vegetation patterns for effective reclamation.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg border border-gray-200 hover:border-brand-red hover:shadow-lg transition-all">
              <FileCheck className="w-10 h-10 text-brand-red mb-4" />
              <h3 className="font-heading text-xl font-bold text-brand-charcoal mb-3">
                Full Documentation
              </h3>
              <p className="text-gray-700">
                Complete project documentation, reporting, and compliance
                records for regulatory submissions and reclamation certificates.
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
                          <li
                            key={detail}
                            className="flex items-start text-sm text-gray-700"
                          >
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

      {/* Alberta Environment Compliance */}
      <section className="section-padding bg-gray-50">
        <div className="container-wide">
          <h2 className="font-heading text-3xl font-bold text-brand-charcoal mb-8">
            Alberta Environment Regulatory Compliance
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-4 text-gray-700">
              <p>
                All our remediation work is performed in strict compliance with
                Alberta&apos;s environmental regulatory framework. We work
                within the requirements of the Environmental Protection and
                Enhancement Act (EPEA), Alberta Energy Regulator (AER)
                directives, and Alberta Environment and Parks guidelines.
              </p>
              <p>
                Our team maintains current knowledge of evolving regulations and
                best practices. We handle all documentation, reporting, and
                regulatory submissions on behalf of our clients, ensuring a
                smooth path to reclamation certification.
              </p>
              <div className="space-y-2 mt-6">
                {[
                  'EPEA compliance for all remediation activities',
                  'AER Directive 001 compliance for contaminated sites',
                  'Alberta Tier 1 and Tier 2 soil guidelines',
                  'Reclamation certificate application preparation',
                  'Environmental site assessment support',
                  'Spill response and emergency cleanup capability',
                ].map((item) => (
                  <div key={item} className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-brand-red mr-3 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-heading text-xl font-bold text-brand-charcoal mb-6">
                Certifications &amp; Compliance
              </h3>
              <div className="space-y-4">
                {certifications.map((cert) => (
                  <div
                    key={cert.name}
                    className="bg-white p-6 rounded-lg border-l-4 border-brand-red shadow-md"
                  >
                    <Shield className="w-6 h-6 text-brand-red mb-2" />
                    <h4 className="font-heading text-lg font-bold text-brand-charcoal mb-2">
                      {cert.name}
                    </h4>
                    <p className="text-gray-700 text-sm">{cert.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Equipment */}
      <section className="section-padding">
        <div className="container-wide">
          <h2 className="font-heading text-3xl font-bold text-brand-charcoal mb-8">
            Equipment Available for Remediation Work
          </h2>
          <p className="text-gray-700 mb-8 max-w-3xl">
            We maintain a comprehensive fleet of heavy equipment for remediation
            and reclamation projects. Owning our own equipment means faster
            mobilization, better cost control, and the ability to scale up
            quickly for large or multi-site projects.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {equipment.map((item) => (
              <div
                key={item}
                className="flex items-start bg-gray-50 p-4 rounded-lg border border-gray-200"
              >
                <Truck className="w-5 h-5 text-brand-red mr-3 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700 text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="section-padding bg-gray-50">
        <div className="container-wide">
          <h2 className="font-heading text-3xl font-bold text-brand-charcoal mb-12 text-center">
            Project Case Studies
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {caseStudies.map((study) => (
              <div
                key={study.title}
                className="bg-white rounded-lg border-2 border-gray-200 p-8 hover:border-brand-red hover:shadow-lg transition-all"
              >
                <h3 className="font-heading text-lg font-bold text-brand-charcoal mb-4">
                  {study.title}
                </h3>
                <p className="text-gray-700 text-sm mb-6">{study.description}</p>
                <div className="border-t border-gray-200 pt-4 space-y-2">
                  {study.stats.map((stat) => (
                    <div key={stat} className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-brand-red mr-2 flex-shrink-0" />
                      <span className="text-sm font-semibold text-brand-charcoal">
                        {stat}
                      </span>
                    </div>
                  ))}
                </div>
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
                western Alberta region. Our base in Hinton at 450 East River
                Road provides efficient access to oil and gas lease sites,
                pipeline corridors, and industrial properties throughout the
                area.
              </p>
              <p>
                With our own fleet of trucks and heavy equipment, we can
                mobilize quickly to any site in the region. Our aggregate
                operations also allow us to supply remediation projects with
                clean fill, topsoil, and other reclamation materials from our
                own sources.
              </p>
              <div className="space-y-2 mt-6">
                {[
                  'Hinton and surrounding area',
                  'Edson and Yellowhead County',
                  'Grande Cache and Greenview County',
                  'Whitecourt and Woodlands County',
                  'Drayton Valley and Brazeau County',
                  'Jasper area and Highway 16 corridor',
                  'Remote lease sites and pipeline ROWs',
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
                  Equipment mobilization and site preparation
                </li>
                <li className="flex items-start">
                  <span className="text-brand-red mr-3 mt-1 font-bold">4.</span>
                  Remediation execution and quality control
                </li>
                <li className="flex items-start">
                  <span className="text-brand-red mr-3 mt-1 font-bold">5.</span>
                  Revegetation and erosion control installation
                </li>
                <li className="flex items-start">
                  <span className="text-brand-red mr-3 mt-1 font-bold">6.</span>
                  Monitoring, documentation, and regulatory submissions
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
          <div
            className="space-y-6"
            itemScope
            itemType="https://schema.org/FAQPage"
          >
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
            &ldquo;WCC handled the full reclamation of three lease sites for
            us. Their work was thorough, documentation was excellent, and we
            received our reclamation certificates without issue. A trusted
            partner for environmental work in western Alberta.&rdquo;
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
            We provide detailed proposals, competitive pricing, and full
            regulatory compliance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/quote"
              className="inline-flex items-center px-8 py-3 bg-white text-brand-red font-semibold rounded-lg hover:bg-gray-100 transition-colors"
            >
              Request a Quote
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center px-8 py-3 bg-red-700 text-white font-semibold rounded-lg hover:bg-red-800 transition-colors border-2 border-red-600"
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
