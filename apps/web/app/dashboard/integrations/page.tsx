'use client';

import { useState } from 'react';
import {
  Puzzle, CheckCircle, XCircle, Settings, ExternalLink,
  MessageSquare, Phone, Mail, BarChart3, FileText, Globe,
  Shield, Video, Calendar, Users, Bell, Zap, ArrowRight,
} from 'lucide-react';

interface Integration {
  id: string;
  name: string;
  description: string;
  icon: typeof MessageSquare;
  category: 'communication' | 'analytics' | 'ai' | 'operations' | 'hr';
  status: 'connected' | 'available' | 'coming_soon';
  features: string[];
}

const INTEGRATIONS: Integration[] = [
  {
    id: 'teams', name: 'Microsoft Teams',
    description: 'Get real-time notifications in Teams channels for new quotes, voice agent calls, opportunity matches, and hiring pipeline updates.',
    icon: Video, category: 'communication', status: 'available',
    features: ['Quote notifications in #quotes channel', 'Voice agent call summaries', 'Opportunity alerts for strong matches', 'New hire application notifications', 'Direct message dispatch alerts', 'Weekly digest of key metrics', 'Two-way sync with Teams'],
  },
  {
    id: 'elevenlabs', name: 'ElevenLabs Voice Agent',
    description: 'AI-powered voice receptionist that answers calls, captures leads, and routes urgent matters.',
    icon: Phone, category: 'ai', status: 'connected',
    features: ['24/7 voice receptionist (Alex)', 'Quote request data capture', 'Call transcription and intent analysis', 'Handoff to human for urgent calls', 'SMS follow-up via Twilio'],
  },
  {
    id: 'claude', name: 'Claude AI (Anthropic)',
    description: 'Powers the chatbot, quote generation, resume assessment, document processing, opportunity scoring, and proposal drafting.',
    icon: Zap, category: 'ai', status: 'connected',
    features: ['Website chatbot knowledge engine', 'Quote draft generation', 'Resume AI assessment & scoring', 'Follow-up questionnaire generation', 'Document data extraction', 'Opportunity matching & scoring', 'Proposal drafting'],
  },
  {
    id: 'twilio', name: 'Twilio',
    description: 'SMS notifications and phone call routing.',
    icon: MessageSquare, category: 'communication', status: 'connected',
    features: ['SMS dispatch alerts', 'Call forwarding from voice agent', 'Quote confirmation texts', 'Appointment reminders'],
  },
  {
    id: 'sendgrid', name: 'SendGrid',
    description: 'Transactional email for quote delivery, opportunity digests, hiring notifications.',
    icon: Mail, category: 'communication', status: 'connected',
    features: ['Quote PDF delivery emails', 'Opportunity digest emails', 'Hiring pipeline notifications', 'Customer follow-up emails'],
  },
  {
    id: 'posthog', name: 'PostHog Analytics',
    description: 'Website analytics, user behavior tracking, and conversion funnel analysis.',
    icon: BarChart3, category: 'analytics', status: 'available',
    features: ['Page view and session tracking', 'Chat widget engagement analytics', 'Quote form conversion funnel', 'Calculator usage metrics', 'Careers page application tracking'],
  },
  {
    id: 'sanity', name: 'Sanity CMS',
    description: 'Content management for blog posts, project showcases, and team profiles.',
    icon: FileText, category: 'operations', status: 'available',
    features: ['Blog post management', 'Project portfolio editing', 'Team bio management', 'Service page content updates'],
  },
  {
    id: 'outlook-calendar', name: 'Microsoft Outlook / Calendar',
    description: 'Sync interview schedules, delivery appointments, and team availability.',
    icon: Calendar, category: 'communication', status: 'coming_soon',
    features: ['Interview scheduling', 'Delivery appointment calendar', 'Team availability sync', 'Automated meeting reminders'],
  },
  {
    id: 'indeed', name: 'Indeed / Job Boards',
    description: 'Automatically post open positions to Indeed, LinkedIn, and local job boards.',
    icon: Users, category: 'hr', status: 'coming_soon',
    features: ['Auto-post positions to Indeed', 'LinkedIn job posting integration', 'Application import to hiring pipeline', 'Candidate source tracking'],
  },
  {
    id: 'quickbooks', name: 'QuickBooks',
    description: 'Accounting integration for quote-to-invoice workflow, expense tracking, and financial reporting.',
    icon: FileText, category: 'operations', status: 'coming_soon',
    features: ['Quote-to-invoice conversion', 'Customer account sync', 'Revenue reporting', 'Expense categorization'],
  },
];

const CATEGORY_LABELS: Record<string, string> = {
  communication: 'Communication', analytics: 'Analytics', ai: 'AI & Automation', operations: 'Operations', hr: 'HR & Recruiting',
};

export default function IntegrationsPage() {
  const [filter, setFilter] = useState('all');

  const filtered = filter === 'all' ? INTEGRATIONS : INTEGRATIONS.filter((i) => i.category === filter);

  const connected = INTEGRATIONS.filter((i) => i.status === 'connected').length;
  const available = INTEGRATIONS.filter((i) => i.status === 'available').length;
  const comingSoon = INTEGRATIONS.filter((i) => i.status === 'coming_soon').length;

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Integrations</h1>
          <p className="text-gray-600 mt-1">Connect your tools — Microsoft Teams, AI, analytics, and more</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="card flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center"><CheckCircle className="w-5 h-5 text-green-600" /></div>
          <div><p className="text-sm text-gray-600">Connected</p><p className="text-2xl font-bold text-gray-900">{connected}</p></div>
        </div>
        <div className="card flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center"><Puzzle className="w-5 h-5 text-blue-600" /></div>
          <div><p className="text-sm text-gray-600">Ready to Connect</p><p className="text-2xl font-bold text-gray-900">{available}</p></div>
        </div>
        <div className="card flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center"><Bell className="w-5 h-5 text-gray-600" /></div>
          <div><p className="text-sm text-gray-600">Coming Soon</p><p className="text-2xl font-bold text-gray-900">{comingSoon}</p></div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-8 text-white mb-8">
        <div className="flex items-start gap-6">
          <div className="w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0"><Video className="w-7 h-7" /></div>
          <div className="flex-1">
            <h2 className="text-xl font-bold mb-2">Microsoft Teams Integration</h2>
            <p className="text-indigo-100 mb-4 max-w-2xl">Get all your WCC notifications where your team already works.</p>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3 mb-6">
              {['#quotes — New quotes & status changes', '#voice-agent — Call summaries & leads', '#hiring — New applications & AI assessments', '#opportunities — Strong match alerts', '#dispatch — Urgent call notifications', '#weekly-digest — Key metrics summary'].map((channel) => (
                <div key={channel} className="flex items-center gap-2 text-sm text-indigo-100"><MessageSquare className="w-3.5 h-3.5 flex-shrink-0" />{channel}</div>
              ))}
            </div>
            <div className="flex gap-3">
              <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-indigo-700 font-semibold rounded-lg hover:bg-indigo-50 transition-colors">
                Connect Microsoft Teams<ArrowRight className="w-4 h-4" />
              </button>
              <button className="inline-flex items-center gap-2 px-5 py-2.5 border border-white/30 text-white font-semibold rounded-lg hover:bg-white/10 transition-colors">
                View Setup Guide
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-2 mb-6 flex-wrap">
        <button onClick={() => setFilter('all')} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filter === 'all' ? 'bg-brand-primary text-white' : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'}`}>All</button>
        {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
          <button key={key} onClick={() => setFilter(key)} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filter === key ? 'bg-brand-primary text-white' : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'}`}>{label}</button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {filtered.map((integration) => {
          const Icon = integration.icon;
          return (
            <div key={integration.id} className="card card-hover">
              <div className="flex items-start gap-4 mb-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  integration.status === 'connected' ? 'bg-green-100' : integration.status === 'available' ? 'bg-blue-100' : 'bg-gray-100'
                }`}>
                  <Icon className={`w-6 h-6 ${
                    integration.status === 'connected' ? 'text-green-600' : integration.status === 'available' ? 'text-blue-600' : 'text-gray-500'
                  }`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-gray-900">{integration.name}</h3>
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold ${
                      integration.status === 'connected' ? 'bg-green-100 text-green-700' : integration.status === 'available' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {integration.status === 'connected' && <CheckCircle className="w-3 h-3" />}
                      {integration.status === 'connected' ? 'Connected' : integration.status === 'available' ? 'Available' : 'Coming Soon'}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">{CATEGORY_LABELS[integration.category]}</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-4">{integration.description}</p>
              <div className="mb-4">
                <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Features</p>
                <ul className="space-y-1">
                  {integration.features.slice(0, 4).map((f) => (
                    <li key={f} className="flex items-start gap-2 text-xs text-gray-600"><CheckCircle className="w-3.5 h-3.5 text-green-500 flex-shrink-0 mt-0.5" />{f}</li>
                  ))}
                  {integration.features.length > 4 && <li className="text-xs text-gray-400">+{integration.features.length - 4} more features</li>}
                </ul>
              </div>
              <div className="flex gap-2 pt-3 border-t border-gray-100">
                {integration.status === 'connected' ? (
                  <button className="btn btn-outline text-xs"><Settings className="w-3.5 h-3.5 mr-1" />Configure</button>
                ) : integration.status === 'available' ? (
                  <button className="btn btn-dashboard-primary text-xs">Connect<ArrowRight className="w-3.5 h-3.5 ml-1" /></button>
                ) : (
                  <button className="btn btn-outline text-xs" disabled>Coming Soon</button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
