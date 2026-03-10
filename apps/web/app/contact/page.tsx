import { Metadata } from 'next';
import Image from 'next/image';
import ContactClient from './ContactClient';

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Get in touch with West Central Contracting. Call (780) 865-3000 or use our contact form.',
  openGraph: {
    title: 'Contact Us | West Central Contracting',
    description: 'Phone, email, address, and hours for West Central Contracting.',
  },
};

export default function ContactPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-brand-charcoal text-white overflow-hidden min-h-[300px] flex items-center">
        <Image
          src="/images/branding/contact-us.webp"
          alt="West Central Contracting branded pickup truck"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-charcoal/90 via-brand-charcoal/70 to-transparent" />
        <div className="relative container-wide section-padding">
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">
            Contact Us
          </h1>
          <p className="text-lg text-gray-200 max-w-2xl">
            Get in touch with our team. We&apos;re here to help with your next project.
          </p>
        </div>
      </section>
      <ContactClient />
    </>
  );
}
