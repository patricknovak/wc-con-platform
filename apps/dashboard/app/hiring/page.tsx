'use client';

import { useState } from 'react';
import {
  Users,
  FileText,
  Star,
  Clock,
  CheckCircle,
  XCircle,
  MessageSquare,
  ChevronDown,
  ChevronUp,
  Send,
  Brain,
  Eye,
  Download,
  Filter,
} from 'lucide-react';
import StatusBadge from '@/components/StatusBadge';
import { formatDistanceToNow } from 'date-fns';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface Applicant {
  id: string;
  name: string;
  email: string;
  phone: string;
  position: string;
  department: string;
  appliedAt: Date;
  resumeFile: string;
  coverLetterFile?: string;
  status: 'new' | 'ai_reviewed' | 'questionnaire_sent' | 'interview' | 'offer' | 'hired' | 'rejected';
  aiScore: number;
  aiSummary: string;
  aiStrengths: string[];
  aiConcerns: string[];
  questionnaire?: {
    questions: string[];
    sentAt?: Date;
    completedAt?: Date;
  };
  notes: string;
}

/* ------------------------------------------------------------------ */
/*  Sample data                                                        */
/* ------------------------------------------------------------------ */

const APPLICANTS: Applicant[] = [
  {
    id: 'APP-001',
    name: 'Mike Henderson',
    email: 'mike.h@email.com',
    phone: '(780) 555-2341',
    position: 'Heavy Equipment Operator',
    department: 'Operations',
    appliedAt: new Date(Date.now() - 2 * 60 * 60000),
    resumeFile: 'mike_henderson_resume.pdf',
    coverLetterFile: 'mike_henderson_cover.pdf',
    status: 'ai_reviewed',
    aiScore: 87,
    aiSummary: 'Strong candidate with 8 years operating excavators and loaders in Alberta. COR certified. Previous experience at Ledcor and PCL. References from 2 former supervisors.',
    aiStrengths: [
      '8 years heavy equipment experience',
      'COR safety certification current',
      'Class 3 licence with air brake endorsement',
      'Experience with both excavators and loaders',
      'Strong references from major contractors',
    ],
    aiConcerns: [
      'No crusher operation experience mentioned',
      'Based in Edson — 45 min commute to Hinton',
    ],
    questionnaire: {
      questions: [
        'You mentioned experience with Cat 330 excavators. Have you operated any models in the 50-ton range?',
        'Your resume shows a 6-month gap in 2024. Could you tell us about that period?',
        'How familiar are you with GPS machine control systems?',
        'What is your availability for seasonal overtime (May–October)?',
        'Do you have experience operating in mountainous terrain (grades >15%)?',
      ],
    },
    notes: '',
  },
  {
    id: 'APP-002',
    name: 'Sarah Blackwood',
    email: 'sarah.b@email.com',
    phone: '(780) 555-8812',
    position: 'Truck Driver — Class 1 / Class 3',
    department: 'Transportation',
    appliedAt: new Date(Date.now() - 8 * 60 * 60000),
    resumeFile: 'sarah_blackwood_resume.pdf',
    status: 'questionnaire_sent',
    aiScore: 92,
    aiSummary: 'Excellent candidate. 12 years Class 1 driving with belly dump and end dump experience across western Alberta. Clean abstract, mountain driving experience. Currently at Pembina Pipeline — looking for local work closer to Hinton.',
    aiStrengths: [
      '12 years Class 1 commercial driving',
      'Belly dump and end dump experience specifically',
      'Clean driver abstract — no incidents',
      'Mountain driving certified',
      'Lives in Hinton — no commute',
      'Currently employed — stable work history',
    ],
    aiConcerns: [
      'May require higher salary to leave current position',
    ],
    questionnaire: {
      questions: [
        'What is your experience with tandem/tridem configurations?',
        'Can you describe your pre-trip inspection routine?',
        'What hours/schedule flexibility can you offer during peak season?',
        'What is your target salary range?',
        'When would you be available to start?',
      ],
      sentAt: new Date(Date.now() - 4 * 60 * 60000),
    },
    notes: 'Top candidate. Fast-track if questionnaire responses are strong.',
  },
  {
    id: 'APP-003',
    name: 'Jordan Peters',
    email: 'jordan.p@email.com',
    phone: '(780) 555-4490',
    position: 'General Labourer',
    department: 'Operations',
    appliedAt: new Date(Date.now() - 24 * 60 * 60000),
    resumeFile: 'jordan_peters_resume.pdf',
    coverLetterFile: 'jordan_peters_cover.pdf',
    status: 'new',
    aiScore: 64,
    aiSummary: 'Entry-level candidate, recently graduated from NAIT trades program. No direct construction experience but shows strong work ethic through cover letter. Part-time warehouse experience at Rona.',
    aiStrengths: [
      'NAIT trades foundation certificate',
      'Enthusiastic cover letter — mentions WCC specifically',
      'Valid Class 5 licence',
      'First Aid certified',
      'Lives in Hinton',
    ],
    aiConcerns: [
      'No construction or aggregate experience',
      'Limited work history (part-time only)',
      'May need significant on-the-job training',
    ],
    notes: '',
  },
  {
    id: 'APP-004',
    name: 'Dave Makenzie',
    email: 'dave.m@email.com',
    phone: '(780) 555-1122',
    position: 'Crusher Operator',
    department: 'Operations',
    appliedAt: new Date(Date.now() - 3 * 24 * 60 * 60000),
    resumeFile: 'dave_makenzie_resume.pdf',
    status: 'interview',
    aiScore: 95,
    aiSummary: 'Outstanding candidate for crusher operator role. 15 years operating jaw and cone crushers across Alberta and BC. Intimate knowledge of aggregate specs and quality control. Previously operated WCC-style mobile plants at Burnco.',
    aiStrengths: [
      '15 years direct crusher operation experience',
      'Jaw, cone, AND impact crusher expertise',
      'Aggregate quality control knowledge',
      'Basic welding and mechanical maintenance',
      'Previous Burnco experience — similar operations to WCC',
      'Willing to work at remote pit locations',
    ],
    aiConcerns: [],
    questionnaire: {
      questions: [
        'What production targets have you typically achieved (tons/hour)?',
        'Describe your approach to quality control sampling.',
        'What is your experience with screening and washing equipment?',
        'Are you comfortable working independently at remote sites for multi-day stretches?',
        'Salary expectations?',
      ],
      sentAt: new Date(Date.now() - 2 * 24 * 60 * 60000),
      completedAt: new Date(Date.now() - 1 * 24 * 60 * 60000),
    },
    notes: 'Interview scheduled for Thursday 2:00 PM. Todd + Patrick.',
  },
];

const STATUS_LABELS: Record<string, string> = {
  new: 'New',
  ai_reviewed: 'AI Reviewed',
  questionnaire_sent: 'Questionnaire Sent',
  interview: 'Interview',
  offer: 'Offer',
  hired: 'Hired',
  rejected: 'Rejected',
};

const STATUS_MAP: Record<string, string> = {
  new: 'pending',
  ai_reviewed: 'sent',
  questionnaire_sent: 'sent',
  interview: 'active',
  offer: 'accepted',
  hired: 'accepted',
  rejected: 'rejected',
};

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function HiringPage() {
  const [filter, setFilter] = useState('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered = filter === 'all' ? APPLICANTS : APPLICANTS.filter((a) => a.status === filter);

  const stats = {
    total: APPLICANTS.length,
    new: APPLICANTS.filter((a) => a.status === 'new').length,
    inProgress: APPLICANTS.filter((a) =>
      ['ai_reviewed', 'questionnaire_sent', 'interview', 'offer'].includes(a.status)
    ).length,
    avgScore: Math.round(APPLICANTS.reduce((sum, a) => sum + a.aiScore, 0) / APPLICANTS.length),
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Hiring Pipeline</h1>
          <p className="text-gray-600 mt-1">
            AI-powered resume screening and automated follow-up questionnaires
          </p>
        </div>
        <div className="flex gap-3">
          <button className="btn btn-outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </button>
          <button className="btn btn-primary">
            <Users className="w-4 h-4 mr-2" />
            Post New Position
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {[
          { label: 'Total Applicants', value: stats.total, icon: Users, color: 'bg-blue-50' },
          { label: 'New / Unreviewed', value: stats.new, icon: FileText, color: 'bg-yellow-50' },
          { label: 'In Progress', value: stats.inProgress, icon: Clock, color: 'bg-green-50' },
          { label: 'Avg AI Score', value: `${stats.avgScore}/100`, icon: Brain, color: 'bg-purple-50' },
        ].map((stat) => (
          <div key={stat.label} className="card">
            <div className={`w-10 h-10 rounded-lg ${stat.color} flex items-center justify-center mb-3`}>
              <stat.icon className="w-5 h-5 text-gray-700" />
            </div>
            <p className="text-sm text-gray-600">{stat.label}</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {[
          { key: 'all', label: 'All' },
          { key: 'new', label: 'New' },
          { key: 'ai_reviewed', label: 'AI Reviewed' },
          { key: 'questionnaire_sent', label: 'Questionnaire Sent' },
          { key: 'interview', label: 'Interview' },
          { key: 'offer', label: 'Offer' },
          { key: 'hired', label: 'Hired' },
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

      {/* Applicant list */}
      <div className="space-y-4">
        {filtered.map((applicant) => {
          const isExpanded = expandedId === applicant.id;
          return (
            <div key={applicant.id} className="card card-hover">
              {/* Header row */}
              <div
                className="flex items-center gap-4 cursor-pointer"
                onClick={() => setExpandedId(isExpanded ? null : applicant.id)}
              >
                {/* Score circle */}
                <div
                  className={`w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-white ${
                    applicant.aiScore >= 85
                      ? 'bg-brand-success'
                      : applicant.aiScore >= 70
                      ? 'bg-brand-warning'
                      : 'bg-brand-info'
                  }`}
                >
                  {applicant.aiScore}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-gray-900">{applicant.name}</h3>
                    <StatusBadge status={STATUS_MAP[applicant.status] as any}>
                      {STATUS_LABELS[applicant.status]}
                    </StatusBadge>
                  </div>
                  <p className="text-sm text-gray-600">
                    {applicant.position} — {applicant.department}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Applied {formatDistanceToNow(applicant.appliedAt, { addSuffix: true })}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button className="p-2 rounded-lg hover:bg-gray-100" title="View resume">
                    <Eye className="w-4 h-4 text-gray-600" />
                  </button>
                  <button className="p-2 rounded-lg hover:bg-gray-100" title="Download resume">
                    <Download className="w-4 h-4 text-gray-600" />
                  </button>
                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                </div>
              </div>

              {/* Expanded details */}
              {isExpanded && (
                <div className="mt-6 pt-6 border-t border-gray-200 space-y-6">
                  {/* AI Assessment */}
                  <div className="bg-purple-50 rounded-lg p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <Brain className="w-5 h-5 text-purple-600" />
                      <h4 className="font-bold text-gray-900">AI Assessment</h4>
                    </div>
                    <p className="text-sm text-gray-700 mb-4">{applicant.aiSummary}</p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-semibold text-sm text-green-700 mb-2">Strengths</h5>
                        <ul className="space-y-1">
                          {applicant.aiStrengths.map((s) => (
                            <li key={s} className="flex items-start gap-2 text-sm text-gray-700">
                              <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                              {s}
                            </li>
                          ))}
                        </ul>
                      </div>
                      {applicant.aiConcerns.length > 0 && (
                        <div>
                          <h5 className="font-semibold text-sm text-amber-700 mb-2">Concerns</h5>
                          <ul className="space-y-1">
                            {applicant.aiConcerns.map((c) => (
                              <li key={c} className="flex items-start gap-2 text-sm text-gray-700">
                                <XCircle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                                {c}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Questionnaire */}
                  {applicant.questionnaire && (
                    <div className="bg-blue-50 rounded-lg p-5">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <MessageSquare className="w-5 h-5 text-blue-600" />
                          <h4 className="font-bold text-gray-900">Follow-Up Questionnaire</h4>
                        </div>
                        {applicant.questionnaire.sentAt ? (
                          <span className="text-xs text-blue-600 font-medium">
                            Sent {formatDistanceToNow(applicant.questionnaire.sentAt, { addSuffix: true })}
                            {applicant.questionnaire.completedAt && ' — Completed'}
                          </span>
                        ) : (
                          <button className="btn btn-primary text-xs px-3 py-1.5">
                            <Send className="w-3 h-3 mr-1" />
                            Send Questionnaire
                          </button>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 mb-3">
                        AI-generated questions based on the applicant's resume and position requirements:
                      </p>
                      <ol className="space-y-2">
                        {applicant.questionnaire.questions.map((q, i) => (
                          <li key={i} className="flex gap-2 text-sm text-gray-700">
                            <span className="font-mono text-blue-600 font-bold flex-shrink-0">{i + 1}.</span>
                            {q}
                          </li>
                        ))}
                      </ol>
                    </div>
                  )}

                  {/* Contact & Files */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h5 className="font-semibold text-sm text-gray-900 mb-2">Contact</h5>
                      <p className="text-sm text-gray-700">{applicant.email}</p>
                      <p className="text-sm text-gray-700">{applicant.phone}</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h5 className="font-semibold text-sm text-gray-900 mb-2">Files</h5>
                      <p className="text-sm text-blue-600 hover:underline cursor-pointer">
                        {applicant.resumeFile}
                      </p>
                      {applicant.coverLetterFile && (
                        <p className="text-sm text-blue-600 hover:underline cursor-pointer">
                          {applicant.coverLetterFile}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Notes */}
                  {applicant.notes && (
                    <div className="bg-yellow-50 rounded-lg p-4">
                      <h5 className="font-semibold text-sm text-gray-900 mb-1">Notes</h5>
                      <p className="text-sm text-gray-700">{applicant.notes}</p>
                    </div>
                  )}

                  {/* Action buttons */}
                  <div className="flex gap-3 pt-2">
                    <button className="btn btn-primary">
                      <Send className="w-4 h-4 mr-2" />
                      Send Questionnaire
                    </button>
                    <button className="btn btn-secondary">
                      Schedule Interview
                    </button>
                    <button className="btn btn-outline">
                      Add Note
                    </button>
                    <button className="btn btn-outline text-brand-danger border-brand-danger hover:bg-red-50 ml-auto">
                      Reject
                    </button>
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
