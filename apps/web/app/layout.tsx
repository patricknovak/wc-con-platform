import type { Metadata } from 'next';
import { Inter, Montserrat } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/sections/Header';
import { Footer } from '@/components/sections/Footer';

const heading = Montserrat({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
});

const body = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'West Central Contracting | Aggregates, Trucking & Crushing | Hinton, AB',
    template: '%s | West Central Contracting',
  },
  description:
    'Family-owned since 1980. Aggregate sales, trucking, gravel crushing, equipment rental, landscaping supplies and concrete products serving Hinton, Edson, Jasper and western Alberta.',
  keywords: [
    'gravel Hinton AB',
    'aggregate delivery Edson',
    'gravel crushing western Alberta',
    'trucking contractor Jasper',
    'equipment rental Hinton',
    'landscaping supplies Alberta',
    'concrete blocks Hinton',
    'West Central Contracting',
  ],
  openGraph: {
    title: 'West Central Contracting LTD',
    description: 'Aggregates, Trucking & Crushing serving western Alberta since 1980.',
    url: 'https://wc-con.com',
    siteName: 'West Central Contracting',
    locale: 'en_CA',
    type: 'website',
    images: [
      {
        url: '/images/hero/home-hero.webp',
        width: 1200,
        height: 630,
        alt: 'West Central Contracting - Aggregates, Trucking & Crushing',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'West Central Contracting LTD',
    description: 'Aggregates, Trucking & Crushing serving western Alberta since 1980.',
    images: ['/images/hero/home-hero.webp'],
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'West Central Contracting LTD',
  alternateName: ['WC-CON', 'Westlake Crushing & Contracting'],
  description: 'Family-owned aggregate sales, trucking, gravel crushing, equipment rental, landscaping supplies, and concrete products serving western Alberta since 1980.',
  url: 'https://wc-con.com',
  telephone: '+1-780-865-3000',
  email: 'admin@wc-con.com',
  foundingDate: '1980',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '450 East River Road',
    addressLocality: 'Hinton',
    addressRegion: 'AB',
    postalCode: 'T7V 2A3',
    addressCountry: 'CA',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 53.43531,
    longitude: -117.53149,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '07:00',
      closes: '17:00',
    },
  ],
  areaServed: [
    { '@type': 'City', name: 'Hinton' },
    { '@type': 'City', name: 'Edson' },
    { '@type': 'City', name: 'Jasper' },
    { '@type': 'City', name: 'Grande Cache' },
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Services',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Trucking Services' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Aggregate Sales' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Gravel Crushing' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Equipment Rental' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Landscaping Supplies' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Pre-Cast Concrete' } },
    ],
  },
  award: ['Business of the Year 2013', 'Business of the Year 2017'],
  sameAs: [],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${heading.variable} ${body.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-body">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
