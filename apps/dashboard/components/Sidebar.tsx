'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  MailBox,
  FileText,
  Target,
  Building2,
  Mic2,
  Lightbulb,
  BarChart3,
} from 'lucide-react';
import clsx from 'clsx';

const navItems = [
  { href: '/', label: 'Inbox', icon: MailBox },
  { href: '/quotes', label: 'Quotes', icon: FileText },
  { href: '/opportunities', label: 'Opportunities', icon: Target },
  { href: '/hub', label: 'Business Hub', icon: Building2 },
  { href: '/voice', label: 'Voice Agent', icon: Mic2 },
  { href: '/intelligence', label: 'Intelligence', icon: Lightbulb },
  { href: '/analytics', label: 'Analytics', icon: BarChart3 },
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
      <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            pathname === item.href || pathname.startsWith(item.href + '/');

          return (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                'flex items-center gap-3 px-4 py-3 rounded-lg transition-colors',
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
      </nav>

      {/* Footer */}
      <div className="px-4 py-6 border-t border-brand-primary border-opacity-20 text-xs text-gray-300">
        <p>v1.0.0</p>
      </div>
    </aside>
  );
}
