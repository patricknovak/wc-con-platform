'use client';

import { useState } from 'react';
import {
  MessageSquare,
  Phone,
  Globe,
  TrendingUp,
  Clock,
  Eye,
  ChevronDown,
  ChevronUp,
  Filter,
  Download,
  Bot,
  User,
} from 'lucide-react';
import StatusBadge from '@/components/StatusBadge';
import { formatDistanceToNow, format } from 'date-fns';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface Conversation {
  id: string;
  type: 'chat' | 'voice' | 'web_visit';
  source: string;
  visitorName?: string;
  visitorEmail?: string;
  visitorPhone?: string;
  startedAt: Date;
  duration?: string;
  status: 'active' | 'completed' | 'abandoned';
  intent: string;
  summary: string;
  messages?: { role: 'user' | 'assistant'; text: string }[];
  pageViews?: string[];
  convertedToQuote: boolean;
  sentiment: 'positive' | 'neutral' | 'negative';
}

/* ------------------------------------------------------------------ */
/*  Sample data                                                        */
/* ------------------------------------------------------------------ */

const CONVERSATIONS: Conversation[] = [
  {
    id: 'CONV-001',
    type: 'chat',
    source: 'Website Chat Widget',
    visitorName: 'Unknown',
    startedAt: new Date(Date.now() - 15 * 60000),
    status: 'active',
    intent: 'Quote Request',
    summary: 'Asking about road crush pricing for a driveway project in Edson. Approximately 40\'x12\' driveway. Chat assistant recommended 8-10 tons base + 4-5 tons top.',
    messages: [
      { role: 'user', text: 'Hi, I need gravel for my driveway' },
      { role: 'assistant', text: 'I can help! What are the approximate dimensions of your driveway?' },
      { role: 'user', text: 'About 40 feet long and 12 feet wide' },
      { role: 'assistant', text: 'For a 40\'x12\' driveway, you\'d need approximately 8-10 tons of base material (40mm Road Crush) and 4-5 tons of top material (20mm Road Crush). Would you like me to help you get a quote?' },
      { role: 'user', text: 'Yes please, how much would that cost delivered to Edson?' },
    ],
    convertedToQuote: false,
    sentiment: 'positive',
  },
  {
    id: 'CONV-002',
    type: 'voice',
    source: 'ElevenLabs Voice Agent',
    visitorName: 'Greg Thompson',
    visitorPhone: '(780) 555-7788',
    startedAt: new Date(Date.now() - 45 * 60000),
    duration: '4:32',
    status: 'completed',
    intent: 'Equipment Rental',
    summary: 'Greg needs a 30-ton excavator for 2 weeks starting next Monday. Working on a foundation project in Jasper. Requested quote and availability confirmation. Alex captured all details and scheduled follow-up.',
    convertedToQuote: true,
    sentiment: 'positive',
  },
  {
    id: 'CONV-003',
    type: 'chat',
    source: 'Website Chat Widget',
    visitorName: 'Unknown',
    startedAt: new Date(Date.now() - 2 * 60 * 60000),
    status: 'completed',
    intent: 'Information',
    summary: 'Visitor asked about delivery areas and whether WCC delivers to Whitecourt. Chat assistant confirmed delivery available. Visitor browsed landscaping supplies and equipment rental pages.',
    messages: [
      { role: 'user', text: 'Do you deliver to Whitecourt?' },
      { role: 'assistant', text: 'Yes! Whitecourt is within our delivery area. We deliver aggregates, landscaping supplies, and concrete products throughout western Alberta.' },
      { role: 'user', text: 'Great, thanks. I\'ll check out your landscaping supplies.' },
    ],
    pageViews: ['/services/landscaping-supplies', '/services/equipment-rental', '/calculator'],
    convertedToQuote: false,
    sentiment: 'positive',
  },
  {
    id: 'CONV-004',
    type: 'voice',
    source: 'ElevenLabs Voice Agent',
    visitorName: 'Maria Santos',
    visitorPhone: '(780) 555-3344',
    visitorEmail: 'maria@townofhinton.ca',
    startedAt: new Date(Date.now() - 4 * 60 * 60000),
    duration: '7:15',
    status: 'completed',
    intent: 'Quote Request',
    summary: 'Municipal inquiry from Town of Hinton. Maria needs pricing for 2,000T of 40mm road crush and 500T of pit run for summer road maintenance program. Large order — flagged for Todd to follow up directly. Alex captured timeline (May–August delivery windows) and scheduling requirements.',
    convertedToQuote: true,
    sentiment: 'positive',
  },
  {
    id: 'CONV-005',
    type: 'web_visit',
    source: 'Website Traffic',
    startedAt: new Date(Date.now() - 6 * 60 * 60000),
    status: 'completed',
    intent: 'Research',
    summary: 'Anonymous visitor spent 12 minutes browsing. Viewed concrete products, used the lego block calculator (30\'x5\' wall), and visited the quote page but did not submit.',
    pageViews: [
      '/services/concrete',
      '/calculator',
      '/services/concrete',
      '/quote',
    ],
    convertedToQuote: false,
    sentiment: 'neutral',
  },
  {
    id: 'CONV-006',
    type: 'chat',
    source: 'Website Chat Widget',
    visitorName: 'Unknown',
    startedAt: new Date(Date.now() - 12 * 60 * 60000),
    status: 'abandoned',
    intent: 'Unknown',
    summary: 'Visitor opened chat, asked "hello", received greeting response, then left without further interaction.',
    messages: [
      { role: 'user', text: 'hello' },
      { role: 'assistant', text: 'Hey there! I\'m the West Central Contracting assistant. I can help you learn about our services, estimate materials for your project, or get started on a quote. What can I help you with?' },
    ],
    convertedToQuote: false,
    sentiment: 'neutral',
  },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function ConversationsPage() {
  const [filter, setFilter] = useState('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered =
    filter === 'all'
      ? CONVERSATIONS
      : CONVERSATIONS.filter((c) => c.type === filter);

  const stats = {
    total: CONVERSATIONS.length,
    chats: CONVERSATIONS.filter((c) => c.type === 'chat').length,
    calls: CONVERSATIONS.filter((c) => c.type === 'voice').length,
    conversions: CONVERSATIONS.filter((c) => c.convertedToQuote).length,
    active: CONVERSATIONS.filter((c) => c.status === 'active').length,
  };

  const typeIcons: Record<string, typeof MessageSquare> = {
    chat: MessageSquare,
    voice: Phone,
    web_visit: Globe,
  };

  const typeLabels: Record<string, string> = {
    chat: 'Chat',
    voice: 'Voice Call',
    web_visit: 'Web Visit',
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Conversations</h1>
          <p className="text-gray-600 mt-1">
            Monitor chat, voice, and website interactions in real time
          </p>
        </div>
        <div className="flex gap-3">
          <button className="btn btn-outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
        {[
          { label: 'Total Today', value: stats.total, icon: MessageSquare, color: 'bg-blue-50' },
          { label: 'Chat Sessions', value: stats.chats, icon: MessageSquare, color: 'bg-green-50' },
          { label: 'Voice Calls', value: stats.calls, icon: Phone, color: 'bg-purple-50' },
          { label: 'Converted to Quote', value: stats.conversions, icon: TrendingUp, color: 'bg-yellow-50' },
          { label: 'Active Now', value: stats.active, icon: Clock, color: 'bg-red-50' },
        ].map((stat) => (
          <div key={stat.label} className="card">
            <div className={`w-8 h-8 rounded-lg ${stat.color} flex items-center justify-center mb-2`}>
              <stat.icon className="w-4 h-4 text-gray-700" />
            </div>
            <p className="text-xs text-gray-600">{stat.label}</p>
            <p className="text-xl font-bold text-gray-900 mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Filter */}
      <div className="flex gap-2 mb-6">
        {[
          { key: 'all', label: 'All' },
          { key: 'chat', label: 'Chat' },
          { key: 'voice', label: 'Voice' },
          { key: 'web_visit', label: 'Web Visits' },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === tab.key
                ? 'bg-brand-primary text-white'
                : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Conversation list */}
      <div className="space-y-3">
        {filtered.map((conv) => {
          const isExpanded = expandedId === conv.id;
          const TypeIcon = typeIcons[conv.type];

          return (
            <div key={conv.id} className="card card-hover">
              <div
                className="flex items-start gap-4 cursor-pointer"
                onClick={() => setExpandedId(isExpanded ? null : conv.id)}
              >
                {/* Type icon */}
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    conv.type === 'chat'
                      ? 'bg-green-100'
                      : conv.type === 'voice'
                      ? 'bg-purple-100'
                      : 'bg-blue-100'
                  }`}
                >
                  <TypeIcon
                    className={`w-5 h-5 ${
                      conv.type === 'chat'
                        ? 'text-green-700'
                        : conv.type === 'voice'
                        ? 'text-purple-700'
                        : 'text-blue-700'
                    }`}
                  />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-gray-900 text-sm">
                      {typeLabels[conv.type]}
                    </span>
                    <StatusBadge
                      status={
                        conv.status === 'active'
                          ? 'active'
                          : conv.status === 'completed'
                          ? 'accepted'
                          : 'expired'
                      }
                    >
                      {conv.status === 'active' ? 'Live' : conv.status}
                    </StatusBadge>
                    {conv.convertedToQuote && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                        <TrendingUp className="w-3 h-3" />
                        Quote
                      </span>
                    )}
                    <span className="text-xs text-gray-500 ml-auto">
                      {formatDistanceToNow(conv.startedAt, { addSuffix: true })}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-2">{conv.summary}</p>
                  <div className="flex gap-4 mt-2 text-xs text-gray-500">
                    {conv.visitorName && conv.visitorName !== 'Unknown' && (
                      <span>{conv.visitorName}</span>
                    )}
                    {conv.visitorPhone && <span>{conv.visitorPhone}</span>}
                    {conv.duration && <span>Duration: {conv.duration}</span>}
                    <span>Intent: {conv.intent}</span>
                  </div>
                </div>

                {isExpanded ? (
                  <ChevronUp className="w-5 h-5 text-gray-400 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                )}
              </div>

              {/* Expanded */}
              {isExpanded && (
                <div className="mt-4 pt-4 border-t border-gray-200 space-y-4">
                  {/* Chat transcript */}
                  {conv.messages && conv.messages.length > 0 && (
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-bold text-sm text-gray-900 mb-3">Transcript</h4>
                      <div className="space-y-3">
                        {conv.messages.map((msg, i) => (
                          <div
                            key={i}
                            className={`flex gap-2 ${
                              msg.role === 'user' ? '' : 'pl-4'
                            }`}
                          >
                            <div
                              className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                                msg.role === 'user' ? 'bg-gray-300' : 'bg-brand-primary'
                              }`}
                            >
                              {msg.role === 'user' ? (
                                <User className="w-3 h-3 text-white" />
                              ) : (
                                <Bot className="w-3 h-3 text-white" />
                              )}
                            </div>
                            <div className="text-sm text-gray-700">
                              <span className="font-semibold text-xs text-gray-500 uppercase">
                                {msg.role === 'user' ? 'Visitor' : 'WCC Bot'}
                              </span>
                              <p className="mt-0.5">{msg.text}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Page views */}
                  {conv.pageViews && conv.pageViews.length > 0 && (
                    <div className="bg-blue-50 rounded-lg p-4">
                      <h4 className="font-bold text-sm text-gray-900 mb-2">Pages Viewed</h4>
                      <div className="flex flex-wrap gap-2">
                        {conv.pageViews.map((page, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 bg-white text-sm text-blue-700 rounded-full border border-blue-200"
                          >
                            {page}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Contact info */}
                  {(conv.visitorEmail || conv.visitorPhone) && (
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-bold text-sm text-gray-900 mb-2">Contact Info</h4>
                      <div className="flex gap-6 text-sm text-gray-700">
                        {conv.visitorName && <span>Name: {conv.visitorName}</span>}
                        {conv.visitorEmail && <span>Email: {conv.visitorEmail}</span>}
                        {conv.visitorPhone && <span>Phone: {conv.visitorPhone}</span>}
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex gap-3 pt-2">
                    <button className="btn btn-primary text-sm">Create Quote</button>
                    <button className="btn btn-outline text-sm">Add to CRM</button>
                    <button className="btn btn-outline text-sm">Follow Up</button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
