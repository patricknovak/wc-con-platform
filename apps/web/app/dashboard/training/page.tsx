'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  BookOpen,
  GraduationCap,
  CheckCircle2,
  Clock,
  Star,
  ChevronRight,
  Search,
  Globe,
  Monitor,
  Truck,
  FileText,
  ClipboardList,
  Ticket,
  Receipt,
  Target,
  MessageSquare,
  Building2,
  Mic2,
  UserPlus,
  Users,
  Lightbulb,
  Megaphone,
  BarChart3,
  Puzzle,
  Calculator,
  ShoppingCart,
  MapPin,
  Phone,
  Sparkles,
  Calendar,
  Briefcase,
  Shield,
  AlertTriangle,
} from 'lucide-react';
import clsx from 'clsx';

// ============================================================
// TRAINING CONTENT DATA
// All training modules are defined here. When features change,
// update the relevant module below and the training pages will
// automatically reflect the changes.
//
// LAST UPDATED: 2026-03-19
// ============================================================

interface TrainingModule {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  category: 'public-site' | 'dashboard-ops' | 'dashboard-business' | 'dashboard-admin' | 'general';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedMinutes: number;
  href: string;
  topics: string[];
  lastUpdated: string;
}

const TRAINING_MODULES: TrainingModule[] = [
  // ── Public Website ──────────────────────────
  {
    id: 'website-overview',
    title: 'Public Website Overview',
    description: 'How the customer-facing website works — navigation, pages, and how customers find us online.',
    icon: Globe,
    category: 'public-site',
    difficulty: 'beginner',
    estimatedMinutes: 10,
    href: '/dashboard/training/website',
    topics: ['Homepage', 'Service Pages', 'SEO & Schema', 'Navigation', 'Footer & Contact Info'],
    lastUpdated: '2026-03-19',
  },
  {
    id: 'quote-calculator',
    title: 'Quote Form & Material Calculator',
    description: 'How customers request quotes and use the tonnage calculator. How data flows into the dashboard.',
    icon: Calculator,
    category: 'public-site',
    difficulty: 'beginner',
    estimatedMinutes: 8,
    href: '/dashboard/training/quotes-calculator',
    topics: ['4-Step Quote Form', 'URL Pre-population', 'Calculator Formula', 'Material Densities', 'Formspree Submissions'],
    lastUpdated: '2026-03-19',
  },
  {
    id: 'order-materials',
    title: 'Order Materials & Pricing',
    description: 'The materials catalog, delivery zones, pricing tiers, and contractor accounts.',
    icon: ShoppingCart,
    category: 'public-site',
    difficulty: 'beginner',
    estimatedMinutes: 6,
    href: '/dashboard/training/order-materials',
    topics: ['10 Product Cards', 'Delivery Zone Surcharges', 'Bulk Pricing', 'Contractor Accounts'],
    lastUpdated: '2026-03-19',
  },
  {
    id: 'customer-tools',
    title: 'Customer Tools — Chat, Voice & Tracking',
    description: 'The AI chat widget, voice assistant, and order tracking system customers use.',
    icon: MessageSquare,
    category: 'public-site',
    difficulty: 'intermediate',
    estimatedMinutes: 12,
    href: '/dashboard/training/customer-tools',
    topics: ['Chat Widget', 'Quick Reply System', 'Knowledge Base', 'Voice Agent', 'Order Tracking (QT/WO/INV)'],
    lastUpdated: '2026-03-19',
  },
  {
    id: 'hub-events',
    title: 'Business Hub & Community Events',
    description: 'The local business directory, partner network, and community events calendar.',
    icon: Building2,
    category: 'public-site',
    difficulty: 'beginner',
    estimatedMinutes: 8,
    href: '/dashboard/training/hub-events',
    topics: ['16 Partner Businesses', 'Category Filtering', 'Submit a Business', 'Events Calendar', 'Event Submission'],
    lastUpdated: '2026-03-19',
  },

  // ── Dashboard Operations ────────────────────
  {
    id: 'dashboard-overview',
    title: 'Dashboard Inbox & Navigation',
    description: 'How to log in, navigate the employee portal, understand the inbox, and use the sidebar.',
    icon: Monitor,
    category: 'dashboard-ops',
    difficulty: 'beginner',
    estimatedMinutes: 8,
    href: '/dashboard/training/dashboard-overview',
    topics: ['Login Process', 'Sidebar Navigation', 'Inbox Priority Actions', 'Activity Feed', 'Quick Stats'],
    lastUpdated: '2026-03-19',
  },
  {
    id: 'quotes-management',
    title: 'Quote Pipeline Management',
    description: 'Creating, reviewing, sending, and tracking quotes through their full lifecycle.',
    icon: FileText,
    category: 'dashboard-ops',
    difficulty: 'intermediate',
    estimatedMinutes: 15,
    href: '/dashboard/training/quotes-management',
    topics: ['Quote Statuses', 'Create & Edit Quotes', 'Send to Customer', 'Track Acceptance', 'Convert to Work Order'],
    lastUpdated: '2026-03-19',
  },
  {
    id: 'work-orders',
    title: 'Work Orders & Dispatch',
    description: 'Scheduling, assigning, dispatching, and completing work orders in the field.',
    icon: ClipboardList,
    category: 'dashboard-ops',
    difficulty: 'intermediate',
    estimatedMinutes: 18,
    href: '/dashboard/training/work-orders',
    topics: ['Work Order Statuses', 'Material Lists', 'Driver Assignment', 'Priority Levels', 'Scheduling', 'Dispatch Flow'],
    lastUpdated: '2026-03-19',
  },
  {
    id: 'tickets-system',
    title: 'Tickets — Daily Driver Records',
    description: 'How drivers submit daily work records, how dispatchers review them, and the SMS ticket flow.',
    icon: Ticket,
    category: 'dashboard-ops',
    difficulty: 'intermediate',
    estimatedMinutes: 15,
    href: '/dashboard/training/tickets',
    topics: ['Ticket Submission', 'SMS-Based Tickets', 'Review & Approve', 'Dispute Resolution', 'Materials Logging', 'Invoice Generation'],
    lastUpdated: '2026-03-19',
  },
  {
    id: 'invoicing',
    title: 'Invoices & Payments',
    description: 'Generating invoices from approved tickets, sending to customers, recording payments, and aging reports.',
    icon: Receipt,
    category: 'dashboard-ops',
    difficulty: 'intermediate',
    estimatedMinutes: 15,
    href: '/dashboard/training/invoices',
    topics: ['Invoice Lifecycle', 'Payment Recording', 'Aging Report', 'GST Calculation', 'Payment Methods', 'Overdue Handling'],
    lastUpdated: '2026-03-19',
  },
  {
    id: 'fleet-management',
    title: 'Fleet & Driver Management',
    description: 'Managing trucks, trailers, heavy equipment, driver assignments, and maintenance schedules.',
    icon: Truck,
    category: 'dashboard-ops',
    difficulty: 'intermediate',
    estimatedMinutes: 12,
    href: '/dashboard/training/fleet',
    topics: ['Driver Profiles', 'Equipment Registry', 'Status Management', 'License & Safety Tracking', 'Assignment Flow'],
    lastUpdated: '2026-03-19',
  },

  // ── Dashboard Business ──────────────────────
  {
    id: 'opportunities',
    title: 'Opportunities & RFP Tracking',
    description: 'Finding, evaluating, and pursuing government and commercial RFPs and contracts.',
    icon: Target,
    category: 'dashboard-business',
    difficulty: 'advanced',
    estimatedMinutes: 10,
    href: '/dashboard/training/opportunities',
    topics: ['Match Scoring', 'RFP Sources (APC/MERX/Municipal)', 'Pipeline Stages', 'Deadline Tracking', 'Capability Tags'],
    lastUpdated: '2026-03-19',
  },
  {
    id: 'conversations-monitoring',
    title: 'Conversations & Lead Monitoring',
    description: 'Monitoring chat sessions, voice calls, and web visits to capture leads and improve service.',
    icon: MessageSquare,
    category: 'dashboard-business',
    difficulty: 'intermediate',
    estimatedMinutes: 10,
    href: '/dashboard/training/conversations',
    topics: ['Chat Transcripts', 'Voice Call Logs', 'Web Visit Tracking', 'Lead Conversion', 'CRM Integration'],
    lastUpdated: '2026-03-19',
  },
  {
    id: 'hub-management',
    title: 'Hub Partner Management',
    description: 'Approving partner businesses, managing the directory, handling quote request routing.',
    icon: Building2,
    category: 'dashboard-business',
    difficulty: 'intermediate',
    estimatedMinutes: 10,
    href: '/dashboard/training/hub-management',
    topics: ['Approve/Reject Partners', 'Feature Businesses', 'Quote Request Routing', 'Partner Categories'],
    lastUpdated: '2026-03-19',
  },
  {
    id: 'voice-agent',
    title: 'Voice Agent Administration',
    description: 'Monitoring the AI phone agent, reviewing call logs, and updating the knowledge base.',
    icon: Mic2,
    category: 'dashboard-business',
    difficulty: 'advanced',
    estimatedMinutes: 8,
    href: '/dashboard/training/voice-agent',
    topics: ['Call Log Review', 'Intent Detection', 'Transfer Rates', 'Knowledge Base Updates', 'Lead Capture'],
    lastUpdated: '2026-03-19',
  },

  // ── Dashboard Admin ─────────────────────────
  {
    id: 'hiring',
    title: 'Hiring Pipeline & AI Screening',
    description: 'Managing job applicants, AI resume scoring, automated questionnaires, and interview scheduling.',
    icon: UserPlus,
    category: 'dashboard-admin',
    difficulty: 'advanced',
    estimatedMinutes: 15,
    href: '/dashboard/training/hiring',
    topics: ['AI Scoring', 'Resume Review', 'Auto-Questionnaires', 'Interview Scheduling', 'Hiring Stages'],
    lastUpdated: '2026-03-19',
  },
  {
    id: 'team-management',
    title: 'Team, Certs & Recognition',
    description: 'Employee profiles, certification tracking, training records, and the kudos recognition system.',
    icon: Users,
    category: 'dashboard-admin',
    difficulty: 'intermediate',
    estimatedMinutes: 12,
    href: '/dashboard/training/team',
    topics: ['Employee Profiles', 'Certification Expiry', 'Training Tracker', 'Kudos & Leaderboard', 'Performance Ratings'],
    lastUpdated: '2026-03-19',
  },
  {
    id: 'intelligence',
    title: 'Intelligence & Document Analysis',
    description: 'Uploading documents, AI pricing insights, demand forecasting, and knowledge base management.',
    icon: Lightbulb,
    category: 'dashboard-admin',
    difficulty: 'advanced',
    estimatedMinutes: 10,
    href: '/dashboard/training/intelligence',
    topics: ['Document Upload', 'AI Pricing Trends', 'Seasonal Demand', 'Customer Segments', 'Knowledge Base'],
    lastUpdated: '2026-03-19',
  },
  {
    id: 'marketing',
    title: 'Marketing & Google Ads',
    description: 'Monitoring website traffic, Google Ads campaigns, keyword rankings, and conversion tracking.',
    icon: Megaphone,
    category: 'dashboard-admin',
    difficulty: 'advanced',
    estimatedMinutes: 15,
    href: '/dashboard/training/marketing',
    topics: ['Google Analytics', 'Ad Campaigns', 'Keyword Tracking', 'ROAS', 'Traffic Sources', 'Conversion Rate'],
    lastUpdated: '2026-03-19',
  },
  {
    id: 'analytics-dashboard',
    title: 'Analytics & KPIs',
    description: 'Business performance metrics, revenue tracking, win rates, and service line breakdowns.',
    icon: BarChart3,
    category: 'dashboard-admin',
    difficulty: 'intermediate',
    estimatedMinutes: 8,
    href: '/dashboard/training/analytics',
    topics: ['Revenue Tracking', 'Quote Win Rate', 'Response Time', 'Service Line Breakdown', 'Time Period Filters'],
    lastUpdated: '2026-03-19',
  },
  {
    id: 'integrations',
    title: 'Integrations & Connected Tools',
    description: 'Managing third-party integrations — Twilio, QuickBooks, ElevenLabs, and more.',
    icon: Puzzle,
    category: 'dashboard-admin',
    difficulty: 'advanced',
    estimatedMinutes: 10,
    href: '/dashboard/training/integrations',
    topics: ['Connected Services', 'Configuration', 'Status Monitoring', 'Feature Lists', 'Troubleshooting'],
    lastUpdated: '2026-03-19',
  },

  // ── General ─────────────────────────────────
  {
    id: 'safety-protocols',
    title: 'Safety & Compliance',
    description: 'COR certification, safety procedures, ISNetworld and ComplyWorks requirements.',
    icon: Shield,
    category: 'general',
    difficulty: 'beginner',
    estimatedMinutes: 10,
    href: '/dashboard/training/safety',
    topics: ['COR Certification', 'ISNetworld', 'ComplyWorks', 'PPE Requirements', 'Incident Reporting'],
    lastUpdated: '2026-03-19',
  },
  {
    id: 'company-info',
    title: 'Company Overview & Service Areas',
    description: 'WCC history, service area coverage, business hours, and key contact information.',
    icon: Briefcase,
    category: 'general',
    difficulty: 'beginner',
    estimatedMinutes: 5,
    href: '/dashboard/training/company',
    topics: ['Company History', 'Service Areas', 'Business Hours', 'Contact Directory', 'Awards'],
    lastUpdated: '2026-03-19',
  },
];

const CATEGORIES = [
  { key: 'all', label: 'All Modules', count: TRAINING_MODULES.length },
  { key: 'public-site', label: 'Public Website', count: TRAINING_MODULES.filter(m => m.category === 'public-site').length },
  { key: 'dashboard-ops', label: 'Operations', count: TRAINING_MODULES.filter(m => m.category === 'dashboard-ops').length },
  { key: 'dashboard-business', label: 'Business', count: TRAINING_MODULES.filter(m => m.category === 'dashboard-business').length },
  { key: 'dashboard-admin', label: 'Admin', count: TRAINING_MODULES.filter(m => m.category === 'dashboard-admin').length },
  { key: 'general', label: 'General', count: TRAINING_MODULES.filter(m => m.category === 'general').length },
];

const DIFFICULTY_CONFIG = {
  beginner: { label: 'Beginner', bg: 'bg-green-100', text: 'text-green-700' },
  intermediate: { label: 'Intermediate', bg: 'bg-blue-100', text: 'text-blue-700' },
  advanced: { label: 'Advanced', bg: 'bg-purple-100', text: 'text-purple-700' },
};

export default function TrainingHub() {
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState<string | null>(null);

  const filtered = TRAINING_MODULES.filter(m => {
    if (filter !== 'all' && m.category !== filter) return false;
    if (difficultyFilter && m.difficulty !== difficultyFilter) return false;
    if (search) {
      const q = search.toLowerCase();
      return (
        m.title.toLowerCase().includes(q) ||
        m.description.toLowerCase().includes(q) ||
        m.topics.some(t => t.toLowerCase().includes(q))
      );
    }
    return true;
  });

  const totalMinutes = TRAINING_MODULES.reduce((sum, m) => sum + m.estimatedMinutes, 0);
  const totalHours = Math.floor(totalMinutes / 60);
  const remainingMin = totalMinutes % 60;

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
            <GraduationCap className="w-6 h-6 text-amber-700" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Training & Features</h1>
            <p className="text-gray-600 mt-0.5">Learn how every part of the WCC platform works</p>
          </div>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-blue-600" />
            </div>
          </div>
          <p className="text-sm text-gray-600 font-medium">Training Modules</p>
          <p className="text-3xl font-bold text-gray-900">{TRAINING_MODULES.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center">
              <Clock className="w-5 h-5 text-green-600" />
            </div>
          </div>
          <p className="text-sm text-gray-600 font-medium">Total Training Time</p>
          <p className="text-3xl font-bold text-gray-900">{totalHours}h {remainingMin}m</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center">
              <Star className="w-5 h-5 text-purple-600" />
            </div>
          </div>
          <p className="text-sm text-gray-600 font-medium">Beginner Modules</p>
          <p className="text-3xl font-bold text-gray-900">{TRAINING_MODULES.filter(m => m.difficulty === 'beginner').length}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-amber-600" />
            </div>
          </div>
          <p className="text-sm text-gray-600 font-medium">Last Updated</p>
          <p className="text-3xl font-bold text-gray-900">Today</p>
        </div>
      </div>

      {/* Quick Start Guide */}
      <div className="bg-gradient-to-r from-brand-primary to-green-800 rounded-xl p-6 mb-8 text-white">
        <h2 className="text-xl font-bold mb-2">New Employee? Start Here</h2>
        <p className="text-green-100 mb-4 text-sm">Complete these modules in order for a solid foundation on how WCC operates.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {['company-info', 'safety-protocols', 'website-overview', 'dashboard-overview'].map((id, idx) => {
            const mod = TRAINING_MODULES.find(m => m.id === id)!;
            return (
              <Link key={id} href={mod.href} className="bg-white/10 hover:bg-white/20 rounded-lg p-3 transition-colors block">
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs font-bold">{idx + 1}</span>
                  <span className="text-sm font-semibold">{mod.title}</span>
                </div>
                <p className="text-xs text-green-200">{mod.estimatedMinutes} min read</p>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search modules, topics..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="flex gap-2">
          {(['beginner', 'intermediate', 'advanced'] as const).map((d) => {
            const cfg = DIFFICULTY_CONFIG[d];
            return (
              <button
                key={d}
                onClick={() => setDifficultyFilter(difficultyFilter === d ? null : d)}
                className={clsx(
                  'px-3 py-2 rounded-lg text-xs font-medium border transition-colors',
                  difficultyFilter === d
                    ? `${cfg.bg} ${cfg.text} border-current`
                    : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                )}
              >
                {cfg.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-6">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setFilter(cat.key)}
            className={clsx(
              'px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors border',
              filter === cat.key
                ? 'bg-blue-700 text-white border-blue-700'
                : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
            )}
          >
            {cat.label} ({cat.count})
          </button>
        ))}
      </div>

      {/* Module Grid */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
          <Search className="w-10 h-10 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500 text-sm">No modules match your search. Try different keywords.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((mod) => {
            const Icon = mod.icon;
            const diff = DIFFICULTY_CONFIG[mod.difficulty];
            return (
              <Link
                key={mod.id}
                href={mod.href}
                className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md hover:border-gray-300 transition-all group block"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center group-hover:bg-blue-50 transition-colors">
                    <Icon className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition-colors" />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={clsx('px-2 py-0.5 rounded-full text-[10px] font-semibold', diff.bg, diff.text)}>
                      {diff.label}
                    </span>
                  </div>
                </div>
                <h3 className="text-sm font-bold text-gray-900 mb-1 group-hover:text-blue-700 transition-colors">{mod.title}</h3>
                <p className="text-xs text-gray-500 mb-3 line-clamp-2">{mod.description}</p>
                <div className="flex flex-wrap gap-1 mb-3">
                  {mod.topics.slice(0, 3).map((t) => (
                    <span key={t} className="px-2 py-0.5 bg-gray-100 rounded text-[10px] text-gray-600">{t}</span>
                  ))}
                  {mod.topics.length > 3 && (
                    <span className="px-2 py-0.5 bg-gray-100 rounded text-[10px] text-gray-500">+{mod.topics.length - 3}</span>
                  )}
                </div>
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{mod.estimatedMinutes} min</span>
                  </div>
                  <div className="flex items-center gap-1 text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="font-medium">Read Guide</span>
                    <ChevronRight className="w-3 h-3" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}

      {/* Changelog / Version Note */}
      <div className="mt-12 bg-gray-50 rounded-xl border border-gray-200 p-6">
        <div className="flex items-center gap-2 mb-3">
          <AlertTriangle className="w-4 h-4 text-amber-500" />
          <h3 className="text-sm font-bold text-gray-900">Platform Changelog</h3>
        </div>
        <div className="space-y-3 text-sm">
          <div className="flex gap-3">
            <span className="text-xs text-gray-400 whitespace-nowrap font-mono">2026-03-19</span>
            <div>
              <p className="text-gray-700 font-medium">Training Portal Launched</p>
              <p className="text-gray-500 text-xs">Initial 24 training modules covering all platform features. Covers public website, dashboard operations, business tools, and admin functions.</p>
            </div>
          </div>
          <div className="flex gap-3">
            <span className="text-xs text-gray-400 whitespace-nowrap font-mono">2026-03-19</span>
            <div>
              <p className="text-gray-700 font-medium">Fleet Management Added</p>
              <p className="text-gray-500 text-xs">New fleet dashboard with 6 drivers, 10 equipment units, driver/equipment status tracking, assignment flow.</p>
            </div>
          </div>
          <div className="flex gap-3">
            <span className="text-xs text-gray-400 whitespace-nowrap font-mono">2026-03-19</span>
            <div>
              <p className="text-gray-700 font-medium">Full Work Order Lifecycle</p>
              <p className="text-gray-500 text-xs">Complete pipeline: Quote &rarr; Work Order &rarr; Ticket &rarr; Invoice &rarr; Payment. All dashboard pages operational.</p>
            </div>
          </div>
          <div className="flex gap-3">
            <span className="text-xs text-gray-400 whitespace-nowrap font-mono">2026-03-19</span>
            <div>
              <p className="text-gray-700 font-medium">AI Features Deployed</p>
              <p className="text-gray-500 text-xs">AI chat widget, voice agent (ElevenLabs), intelligence document analysis, AI-powered hiring screening all live.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
