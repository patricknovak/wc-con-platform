import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Get in touch with West Central Contracting. Call (780) 865-3000 or use our contact form.',
  openGraph: {
    title: 'Contact Us | West Central Contracting',
    description: 'Phone, email, address, and hours for West Central Contracting.',
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
