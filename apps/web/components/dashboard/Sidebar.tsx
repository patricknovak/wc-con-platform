'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Mail,
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
  Megaphone,
  ArrowLeft,
  ClipboardList,
  Ticket,
  Receipt,
  Truck,
  GraduationCap,
} from 'lucide-react';
import clsx from 'clsx';

const PREFIX = '/dashboard';

type NavSection = {
  title?: string;
  items: { href: string; label: string; icon: React.ComponentType<{ className?: string }> }[];
};

const navSections: NavSection[] = [
  {
    items: [
      { href: `${PREFIX}`, label: 'Inbox', icon: Mail },
    ],
  },
  {
    title: 'Operations',
    items: [
      { href: `${PREFIX}/quotes`, label: 'Quotes', icon: FileText },
      { href: `${PREFIX}/work-orders`, label: 'Work Orders', icon: ClipboardList },
      { href: `${PREFIX}/tickets`, label: 'Tickets', icon: Ticket },
      { href: `${PREFIX}/invoices`, label: 'Invoices', icon: Receipt },
      { href: `${PREFIX}/fleet`, label: 'Fleet & Drivers', icon: Truck },
    ],
  },
  {
    title: 'Business',
    items: [
      { href: `${PREFIX}/opportunities`, label: 'Opportunities', icon: Target },
      { href: `${PREFIX}/conversations`, label: 'Conversations', icon: MessageSquare },
      { href: `${PREFIX}/hub`, label: 'Business Hub', icon: Building2 },
      { href: `${PREFIX}/voice`, label: 'Voice Agent', icon: Mic2 },
    ],
  },
  {
    title: 'Admin',
    items: [
      { href: `${PREFIX}/hiring`, label: 'Hiring Pipeline', icon: UserPlus },
      { href: `${PREFIX}/team`, label: 'Team', icon: Users },
      { href: `${PREFIX}/intelligence`, label: 'Intelligence', icon: Lightbulb },
      { href: `${PREFIX}/marketing`, label: 'Marketing', icon: Megaphone },
      { href: `${PREFIX}/analytics`, label: 'Analytics', icon: BarChart3 },
      { href: `${PREFIX}/integrations`, label: 'Integrations', icon: Puzzle },
    ],
  },
  {
    title: 'Training',
    items: [
      { href: `${PREFIX}/training`, label: 'Training & Features', icon: GraduationCap },
    ],
  },
];

export default function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-brand-primary text-white flex flex-col overflow-hidden border-r border-brand-primary flex-shrink-0">
      {/* Logo */}
      <div className="px-6 py-8 border-b border-white/10">
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
                item.href === PREFIX
                  ? pathname === PREFIX || pathname === `${PREFIX}/`
                  : pathname.startsWith(item.href + '/') || pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={clsx(
                    'flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors',
                    isActive
                      ? 'bg-brand-secondary text-white'
                      : 'text-gray-100 hover:bg-white/10'
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

      {/* Back to website */}
      <div className="px-4 py-4 border-t border-white/10">
        <Link
          href="/"
          className="flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Website
        </Link>
      </div>
    </aside>
  );
}
