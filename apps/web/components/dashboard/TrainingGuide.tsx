'use client';

import Link from 'next/link';
import { ArrowLeft, Clock, BookOpen, ChevronRight, AlertCircle, CheckCircle2, Lightbulb } from 'lucide-react';
import clsx from 'clsx';

// ============================================================
// Reusable Training Guide shell component.
// Wrap every training sub-page in this for consistent layout,
// navigation breadcrumbs, and table-of-contents sidebar.
// ============================================================

interface Section {
  id: string;
  title: string;
}

interface TrainingGuideProps {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedMinutes: number;
  lastUpdated: string;
  sections: Section[];
  children: React.ReactNode;
  prevModule?: { title: string; href: string };
  nextModule?: { title: string; href: string };
}

const DIFFICULTY_CONFIG = {
  beginner: { label: 'Beginner', bg: 'bg-green-100', text: 'text-green-700' },
  intermediate: { label: 'Intermediate', bg: 'bg-blue-100', text: 'text-blue-700' },
  advanced: { label: 'Advanced', bg: 'bg-purple-100', text: 'text-purple-700' },
};

export default function TrainingGuide({
  title,
  description,
  icon: Icon,
  difficulty,
  estimatedMinutes,
  lastUpdated,
  sections,
  children,
  prevModule,
  nextModule,
}: TrainingGuideProps) {
  const diff = DIFFICULTY_CONFIG[difficulty];

  return (
    <div className="p-8 max-w-6xl">
      {/* Breadcrumb */}
      <div className="mb-6">
        <Link
          href="/dashboard/training"
          className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-blue-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Training Hub
        </Link>
      </div>

      {/* Header */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
            <Icon className="w-6 h-6 text-blue-600" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
              <span className={clsx('px-2 py-0.5 rounded-full text-[10px] font-semibold', diff.bg, diff.text)}>
                {diff.label}
              </span>
            </div>
            <p className="text-gray-600 text-sm mb-3">{description}</p>
            <div className="flex items-center gap-4 text-xs text-gray-400">
              <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {estimatedMinutes} min read</span>
              <span>Updated {lastUpdated}</span>
              <span>{sections.length} sections</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-8">
        {/* Main Content */}
        <div className="flex-1 min-w-0">
          {children}

          {/* Module Navigation */}
          <div className="mt-12 flex items-center justify-between border-t border-gray-200 pt-6">
            {prevModule ? (
              <Link href={prevModule.href} className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 transition-colors">
                <ArrowLeft className="w-4 h-4" />
                <span>{prevModule.title}</span>
              </Link>
            ) : <div />}
            {nextModule ? (
              <Link href={nextModule.href} className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors">
                <span>{nextModule.title}</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            ) : <div />}
          </div>
        </div>

        {/* Table of Contents Sidebar */}
        <div className="hidden lg:block w-56 flex-shrink-0">
          <div className="sticky top-8">
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3">On this page</p>
            <nav className="space-y-1">
              {sections.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="block text-xs text-gray-500 hover:text-blue-600 py-1 transition-colors"
                >
                  {s.title}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Reusable content blocks for training pages ──────────────

export function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="mb-10 scroll-mt-8">
      <h2 className="text-lg font-bold text-gray-900 mb-3 pb-2 border-b border-gray-100">{title}</h2>
      <div className="text-sm text-gray-700 space-y-3 leading-relaxed">{children}</div>
    </section>
  );
}

export function Tip({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-3 bg-blue-50 border border-blue-100 rounded-lg p-4 my-4">
      <Lightbulb className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
      <div className="text-sm text-blue-800">{children}</div>
    </div>
  );
}

export function Warning({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-3 bg-amber-50 border border-amber-100 rounded-lg p-4 my-4">
      <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
      <div className="text-sm text-amber-800">{children}</div>
    </div>
  );
}

export function Step({ number, title, children }: { number: number; title: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-3 my-4">
      <div className="w-7 h-7 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
        {number}
      </div>
      <div>
        <p className="text-sm font-semibold text-gray-900 mb-1">{title}</p>
        <div className="text-sm text-gray-600">{children}</div>
      </div>
    </div>
  );
}

export function KeyValue({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start gap-2 py-1">
      <span className="text-xs font-semibold text-gray-500 w-32 flex-shrink-0">{label}</span>
      <span className="text-sm text-gray-800">{value}</span>
    </div>
  );
}

export function StatusTable({ statuses }: { statuses: { name: string; color: string; description: string }[] }) {
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden my-4">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-200">
            <th className="text-left px-4 py-2 text-xs font-semibold text-gray-500">Status</th>
            <th className="text-left px-4 py-2 text-xs font-semibold text-gray-500">Description</th>
          </tr>
        </thead>
        <tbody>
          {statuses.map((s) => (
            <tr key={s.name} className="border-b border-gray-100 last:border-0">
              <td className="px-4 py-2">
                <span className={clsx('px-2 py-0.5 rounded-full text-xs font-medium', s.color)}>{s.name}</span>
              </td>
              <td className="px-4 py-2 text-gray-600">{s.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
