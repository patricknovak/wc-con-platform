'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Mailbox,
  FileText,
  Target,
  Building2,
  Mic2,
  Lightbulb,
  BarChart3,
  MessageSquare,
  UserPlus,
  Users,
  Puzzle,
  ClipboardList,
  Ticket,
  Receipt,
  Truck,
} from 'lucide-react';
import clsx from 'clsx';

type NavSection = {
  title?: string;
  items: { href: string; label: string; icon: React.ComponentType<{ className?: string }> }[];
};

const navSections: NavSection[] = [
  {
    items: [
      { href: '/', label: 'Inbox', icon: Mailbox },
    ],
  },
  {
    title: 'Operations',
    items: [
      { href: '/quotes', label: 'Quotes', icon: FileText },
      { href: '/work-orders', label: 'Work Orders', icon: ClipboardList },
      { href: '/tickets', label: 'Tickets', icon: Ticket },
      { href: '/invoices', label: 'Invoices', icon: Receipt },
      { href: '/fleet', label: 'Fleet & Drivers', icon: Truck },
    ],
  },
  {
    title: 'Business',
    items: [
      { href: '/opportunities', label: 'Opportunities', icon: Target },
      { href: '/conversations', label: 'Conversations', icon: MessageSquare },
      { href: '/hub', label: 'Business Hub', icon: Building2 },
      { href: '/voice', label: 'Voice Agent', icon: Mic2 },
    ],
  },
  {
    title: 'Admin',
    items: [
      { href: '/hiring', label: 'Hiring Pipeline', icon: UserPlus },
      { href: '/team', label: 'Team', icon: Users },
      { href: '/intelligence', label: 'Intelligence', icon: Lightbulb },
      { href: '/analytics', label: 'Analytics', icon: BarChart3 },
      { href: '/integrations', label: 'Integrations', icon: Puzzle },
    ],
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-brand-primary text-white flex flex-col overflow-hidden border-r border-brand-primary">
      {/* Logo */}
      <div className="px-6 py-8 border-b border-brand-primary border-opacity-20">
        <h1 className="text-2xl font-bold">WC</h1>
        <p className="text-xs text-brand-secondary mt-1">Contracting</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-4 py-4 space-y-1">
        {navSections.map((section, sIdx) => (
          <div key={sIdx} className={sIdx > 0 ? 'mt-4' : ''}>
            {section.title && (
              <p className="px-4 py-1 text-[10px] font-semibold uppercase tracking-widest text-gray-400">
                {section.title}
              </p>
            )}
            {section.items.map((item) => {
              const Icon = item.icon;
              const isActive =
                pathname === item.href || pathname.startsWith(item.href + '/');

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={clsx(
                    'flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors',
                    isActive
                      ? 'bg-brand-secondary text-white'
                      : 'text-gray-100 hover:bg-brand-primary hover:bg-opacity-80'
                  )}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  <span className="text-sm font-medium">{item.label}</span>
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-4 py-6 border-t border-brand-primary border-opacity-20 text-xs text-gray-300">
        <p>v1.0.0</p>
      </div>
    </aside>
  );
}
