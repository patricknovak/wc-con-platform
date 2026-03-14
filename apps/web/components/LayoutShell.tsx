'use client';

import { usePathname } from 'next/navigation';
import { Header } from '@/components/sections/Header';
import { Footer } from '@/components/sections/Footer';
import { ChatWidget } from '@/components/chat/ChatWidget';
import { QuickQuoteWidget } from '@/components/QuickQuoteWidget';

export default function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDashboard = pathname.startsWith('/dashboard');

  if (isDashboard) {
    return <>{children}</>;
  }

  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
      <QuickQuoteWidget />
      <ChatWidget />
    </>
  );
}
