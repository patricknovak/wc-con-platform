import Link from 'next/link';
import Image from 'next/image';
import { Truck, Mountain, HardHat, Shovel, TreePine, Box, Phone, ArrowRight, Shield, Award, Clock, Users } from 'lucide-react';

const services = [
  {
    title: 'Trucking Services',
    description: 'Heavy hauling with belly dumps, truck & pups, end dumps, lowboys, and winch tractors across western Alberta.',
    icon: Truck,
    href: '/services/trucking-hauling',
    image: '/images/operations/brule-hills-trucks.webp',
  },
  {
    title: 'Aggregate Sales',
    description: 'Road crush, washed rock, pea gravel, drain rock, rainbow rock, and multiple sand varieties from 7 pit locations.',
    icon: Mountain,
    href: '/services/aggregate-sales',
    image: '/images/operations/rock-pit.webp',
  },
  {
    title: 'Gravel Crushing',
    description: 'State-of-the-art mobile crushing for custom aggregate sizes. Road base to decorative applications.',
    icon: HardHat,
    href: '/services/gravel-crushing',
    image: '/images/equipment/crusher.webp',
  },
  {
    title: 'Equipment Rental',
    description: 'Excavators, front-end loaders, skid steers, and dozers available for your project needs.',
    icon: Shovel,
    href: '/services/equipment-rental',
    image: '/images/equipment/dozer.webp',
  },
  {
    title: 'Landscaping Supplies',
    description: 'Topsoil, decorative stone, mulch, boulders, limestone, and washed stone for residential and commercial projects.',
    icon: TreePine,
    href: '/services/landscaping-supplies',
    image: '/images/materials/dirt.jpg',
  },
  {
    title: 'Pre-Cast Concrete',
    description: 'Lego blocks, half blocks, flat-top variants, decorative options, and jersey barriers for any application.',
    icon: Box,
    href: '/services/concrete',
    image: '/images/operations/wash-pit.webp',
  },
];

const stats = [
  { value: '45+', label: 'Years in Business', icon: Clock },
  { value: '750K+', label: 'Units Sold in 2024', icon: Mountain },
  { value: '7', label: 'Gravel Pit Locations', icon: HardHat },
  { value: '100%', label: 'COR Safety Certified', icon: Shield },
];

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-brand-charcoal text-white overflow-hidden min-h-[600px] flex items-center">
        <Image
          src="/images/hero/home-hero.webp"
          alt="West Central Contracting truck and grader with mountain backdrop"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-charcoal/90 via-brand-charcoal/70 to-transparent" />
        <div className="relative container-wide section-padding py-24 lg:py-32">
          <div className="max-w-3xl">
            <p className="text-brand-red font-semibold text-sm uppercase tracking-wider mb-4">
              Serving Western Alberta Since 1980
            </p>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Aggregates, Trucking &amp; Crushing You Can{' '}
              <span className="text-brand-red">Count On</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-200 mb-8 max-w-2xl">
              Family-owned and operated for over 45 years. Delivering quality materials
              and reliable service to Hinton, Edson, Jasper, Grande Cache, and surrounding areas.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/quote" className="btn-primary text-lg px-8 py-4">
                Get a Free Quote
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link href="/calculator" className="btn-secondary text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-brand-charcoal">
                Material Calculator
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-brand-red text-white">
        <div className="container-wide px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <stat.icon className="h-8 w-8 mx-auto mb-2 opacity-80" />
                <p className="font-heading text-3xl sm:text-4xl font-bold">{stat.value}</p>
                <p className="text-sm opacity-90 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding bg-white">
        <div className="container-wide">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-brand-charcoal mb-4">
              Our Services
            </h2>
            <p className="text-brand-gray-mid text-lg max-w-2xl mx-auto">
              From raw aggregates to finished concrete products, we provide everything
              your construction or landscaping project needs.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <Link
                key={service.title}
                href={service.href}
                className="group rounded-xl border border-brand-gray-light hover:border-brand-red hover:shadow-lg transition-all duration-300 overflow-hidden"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <service.icon className="absolute bottom-3 right-3 h-8 w-8 text-white/80" />
                </div>
                <div className="p-6">
                  <h3 className="font-heading text-xl font-bold text-brand-charcoal mb-2">
                    {service.title}
                  </h3>
                  <p className="text-brand-gray-mid leading-relaxed">{service.description}</p>
                  <span className="inline-flex items-center mt-4 text-brand-red font-semibold text-sm group-hover:gap-2 transition-all">
                    Learn More <ArrowRight className="ml-1 h-4 w-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="section-padding bg-brand-cream">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto text-center">
            <Award className="h-12 w-12 text-accent-gold mx-auto mb-6" />
            <blockquote className="font-heading text-2xl sm:text-3xl font-medium text-brand-charcoal leading-relaxed mb-6">
              &ldquo;Professional yet personal approach. Equipment is top notch and well
              maintained. Drivers are detail driven and safe.&rdquo;
            </blockquote>
            <div>
              <p className="font-semibold text-brand-charcoal">Tom Eidt</p>
              <p className="text-brand-gray-mid">Construction Inspector, Canadian Natural Resources</p>
            </div>
            <Image
              src="/images/partners/cnrl-logo.webp"
              alt="Canadian Natural Resources"
              width={120}
              height={40}
              className="mx-auto mt-4 opacity-60"
            />
          </div>
        </div>
      </section>

      {/* Service Area */}
      <section className="section-padding bg-white">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-brand-charcoal mb-4">
                Serving Western Alberta
              </h2>
              <p className="text-brand-gray-mid text-lg mb-6">
                From our home base in Hinton, we deliver materials and services across
                the entire western Alberta corridor.
              </p>
              <ul className="space-y-3">
                {['Hinton', 'Edson', 'Jasper', 'Grande Cache', 'Robb', 'Cadomin', 'Surrounding Areas'].map(
                  (area) => (
                    <li key={area} className="flex items-center gap-3">
                      <div className="h-2 w-2 rounded-full bg-brand-red" />
                      <span className="text-brand-charcoal font-medium">{area}</span>
                    </li>
                  )
                )}
              </ul>
            </div>
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
              <Image
                src="/images/services/gallery-banner.webp"
                alt="Mountain range with gravel truck on western Alberta road"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-8">
                <h3 className="font-heading text-2xl font-bold text-white mb-2">Business Hub</h3>
                <p className="text-gray-200 mb-4">
                  Discover trusted local businesses in the Hinton area through our community directory.
                </p>
                <Link href="/hub" className="btn-primary self-start">
                  Explore the Hub
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative text-white section-padding overflow-hidden">
        <Image
          src="/images/branding/pickup-logo-view.webp"
          alt="West Central Contracting branded truck"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-brand-charcoal/80" />
        <div className="relative container-wide text-center">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-8">
            Call us anytime or use our online tools to get an instant estimate.
            Our team is ready to help with your next project.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:7808653000" className="btn-primary text-lg px-8 py-4">
              <Phone className="mr-2 h-5 w-5" />
              (780) 865-3000
            </a>
            <Link href="/quote" className="btn-secondary border-white text-white hover:bg-white hover:text-brand-charcoal text-lg px-8 py-4">
              Request a Quote Online
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
