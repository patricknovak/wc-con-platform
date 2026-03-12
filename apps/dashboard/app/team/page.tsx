'use client';

import { useState } from 'react';
import {
  Users,
  Award,
  Calendar,
  Heart,
  Shield,
  TrendingUp,
  Clock,
  Star,
  MessageSquare,
  Gift,
  CheckCircle,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  Plus,
} from 'lucide-react';
import StatusBadge from '@/components/StatusBadge';
import { format, formatDistanceToNow, differenceInDays } from 'date-fns';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface TeamMember {
  id: string;
  name: string;
  role: string;
  department: string;
  startDate: Date;
  email: string;
  phone: string;
  status: 'active' | 'on_leave' | 'training';
  certifications: { name: string; expiresAt?: Date; status: 'current' | 'expiring' | 'expired' }[];
  kudos: number;
  recentKudos?: string;
  safetyIncidents: number;
  trainings: { name: string; completedAt: Date }[];
  upcomingTrainings?: string[];
  performanceRating?: number;
  milestones: string[];
}

/* ------------------------------------------------------------------ */
/*  Sample data                                                        */
/* ------------------------------------------------------------------ */

const TEAM: TeamMember[] = [
  {
    id: 'EMP-001',
    name: 'Todd Novak',
    role: 'Owner / General Manager',
    department: 'Management',
    startDate: new Date('1995-06-01'),
    email: 'todd@wc-con.com',
    phone: '(780) 865-3000',
    status: 'active',
    certifications: [
      { name: 'COR Safety Auditor', status: 'current', expiresAt: new Date('2027-03-15') },
      { name: 'Class 1 Driver\'s Licence', status: 'current' },
    ],
    kudos: 14,
    safetyIncidents: 0,
    trainings: [
      { name: 'Leadership Workshop', completedAt: new Date('2025-11-15') },
    ],
    performanceRating: 5,
    milestones: ['30 years at WCC', 'Business of the Year 2017'],
  },
  {
    id: 'EMP-002',
    name: 'Kyle Richardson',
    role: 'Operations Supervisor',
    department: 'Operations',
    startDate: new Date('2015-04-12'),
    email: 'kyle@wc-con.com',
    phone: '(780) 865-0068',
    status: 'active',
    certifications: [
      { name: 'COR Safety', status: 'current', expiresAt: new Date('2026-09-01') },
      { name: 'First Aid / CPR', status: 'expiring', expiresAt: new Date('2026-04-30') },
      { name: 'WHMIS', status: 'current', expiresAt: new Date('2027-01-15') },
      { name: 'Class 3 Driver\'s Licence', status: 'current' },
    ],
    kudos: 8,
    recentKudos: 'Great job coordinating the Jasper road project last week — zero delays!',
    safetyIncidents: 0,
    trainings: [
      { name: 'Excavator Advanced Ops', completedAt: new Date('2025-08-20') },
      { name: 'GPS Machine Control', completedAt: new Date('2025-10-05') },
    ],
    upcomingTrainings: ['First Aid Renewal (April 2026)'],
    performanceRating: 4.5,
    milestones: ['10 years at WCC (2025)'],
  },
  {
    id: 'EMP-003',
    name: 'James Whitebear',
    role: 'Heavy Equipment Operator',
    department: 'Operations',
    startDate: new Date('2019-07-08'),
    email: 'james@wc-con.com',
    phone: '(780) 555-4455',
    status: 'active',
    certifications: [
      { name: 'COR Safety', status: 'current', expiresAt: new Date('2026-07-08') },
      { name: 'First Aid / CPR', status: 'current', expiresAt: new Date('2027-03-01') },
      { name: 'Class 5 Driver\'s Licence', status: 'current' },
    ],
    kudos: 6,
    recentKudos: 'Excellent work on the Grande Cache site — ahead of schedule.',
    safetyIncidents: 0,
    trainings: [
      { name: 'Dozer Operations', completedAt: new Date('2025-05-12') },
    ],
    upcomingTrainings: ['Crusher Operations Cross-Training (Spring 2026)'],
    performanceRating: 4,
    milestones: [],
  },
  {
    id: 'EMP-004',
    name: 'Brandon Flett',
    role: 'Truck Driver — Class 1',
    department: 'Transportation',
    startDate: new Date('2021-03-15'),
    email: 'brandon@wc-con.com',
    phone: '(780) 555-6677',
    status: 'active',
    certifications: [
      { name: 'Class 1 Driver\'s Licence', status: 'current' },
      { name: 'Air Brake Endorsement', status: 'current' },
      { name: 'COR Safety', status: 'expiring', expiresAt: new Date('2026-04-15') },
      { name: 'Mountain Driving', status: 'current' },
    ],
    kudos: 5,
    safetyIncidents: 0,
    trainings: [
      { name: 'Defensive Driving', completedAt: new Date('2025-09-10') },
    ],
    upcomingTrainings: ['COR Safety Renewal (April 2026)'],
    performanceRating: 4,
    milestones: ['5 years at WCC (2026)'],
  },
  {
    id: 'EMP-005',
    name: 'Ashley Drummond',
    role: 'Office Administrator',
    department: 'Administration',
    startDate: new Date('2022-09-01'),
    email: 'ashley@wc-con.com',
    phone: '(780) 865-3000',
    status: 'training',
    certifications: [
      { name: 'WHMIS', status: 'current', expiresAt: new Date('2027-09-01') },
    ],
    kudos: 7,
    recentKudos: 'Streamlined the quote workflow — saving everyone time!',
    safetyIncidents: 0,
    trainings: [
      { name: 'QuickBooks Advanced', completedAt: new Date('2025-12-01') },
      { name: 'CRM Training', completedAt: new Date('2025-11-15') },
    ],
    upcomingTrainings: ['Sage Accounting (In Progress)'],
    performanceRating: 4.5,
    milestones: [],
  },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function TeamPage() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [view, setView] = useState<'team' | 'certifications' | 'recognition'>('team');

  const expiringCerts = TEAM.flatMap((m) =>
    m.certifications
      .filter((c) => c.expiresAt && differenceInDays(c.expiresAt, new Date()) < 90)
      .map((c) => ({ ...c, memberName: m.name, memberId: m.id }))
  );

  const totalKudos = TEAM.reduce((sum, m) => sum + m.kudos, 0);

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Team</h1>
          <p className="text-gray-600 mt-1">
            Employee profiles, certifications, training, and recognition
          </p>
        </div>
        <div className="flex gap-3">
          <button className="btn btn-outline">
            <Gift className="w-4 h-4 mr-2" />
            Give Kudos
          </button>
          <button className="btn btn-primary">
            <Plus className="w-4 h-4 mr-2" />
            Add Team Member
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
        {[
          { label: 'Team Size', value: TEAM.length, icon: Users, color: 'bg-blue-50' },
          { label: 'Active', value: TEAM.filter((m) => m.status === 'active').length, icon: CheckCircle, color: 'bg-green-50' },
          { label: 'Certs Expiring Soon', value: expiringCerts.length, icon: AlertCircle, color: 'bg-yellow-50' },
          { label: 'Safety Incidents', value: 0, icon: Shield, color: 'bg-green-50' },
          { label: 'Total Kudos', value: totalKudos, icon: Star, color: 'bg-purple-50' },
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

      {/* View tabs */}
      <div className="flex gap-2 mb-6">
        {[
          { key: 'team', label: 'Team Directory' },
          { key: 'certifications', label: 'Certifications' },
          { key: 'recognition', label: 'Recognition Board' },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setView(tab.key as typeof view)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              view === tab.key
                ? 'bg-brand-primary text-white'
                : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Team Directory */}
      {view === 'team' && (
        <div className="space-y-3">
          {TEAM.map((member) => {
            const isExpanded = expandedId === member.id;
            const tenure = Math.round(
              (Date.now() - member.startDate.getTime()) / (365.25 * 24 * 60 * 60000)
            );

            return (
              <div key={member.id} className="card card-hover">
                <div
                  className="flex items-center gap-4 cursor-pointer"
                  onClick={() => setExpandedId(isExpanded ? null : member.id)}
                >
                  {/* Avatar */}
                  <div className="w-12 h-12 rounded-full bg-brand-primary text-white flex items-center justify-center font-bold text-lg flex-shrink-0">
                    {member.name.split(' ').map((n) => n[0]).join('')}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-gray-900">{member.name}</h3>
                      <StatusBadge
                        status={
                          member.status === 'active' ? 'active' : member.status === 'training' ? 'sent' : 'pending'
                        }
                      >
                        {member.status === 'on_leave' ? 'On Leave' : member.status}
                      </StatusBadge>
                    </div>
                    <p className="text-sm text-gray-600">
                      {member.role} — {member.department}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {tenure} {tenure === 1 ? 'year' : 'years'} at WCC — Started{' '}
                      {format(member.startDate, 'MMM yyyy')}
                    </p>
                  </div>

                  {/* Quick stats */}
                  <div className="flex items-center gap-4 text-sm text-gray-500 flex-shrink-0">
                    <span className="flex items-center gap-1" title="Kudos">
                      <Star className="w-4 h-4 text-yellow-500" />
                      {member.kudos}
                    </span>
                    <span className="flex items-center gap-1" title="Certifications">
                      <Shield className="w-4 h-4 text-green-500" />
                      {member.certifications.length}
                    </span>
                    {member.performanceRating && (
                      <span className="flex items-center gap-1" title="Performance">
                        <TrendingUp className="w-4 h-4 text-blue-500" />
                        {member.performanceRating}/5
                      </span>
                    )}
                  </div>

                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                </div>

                {isExpanded && (
                  <div className="mt-6 pt-6 border-t border-gray-200 space-y-4">
                    <div className="grid md:grid-cols-3 gap-4">
                      {/* Certifications */}
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-bold text-sm text-gray-900 mb-3 flex items-center gap-2">
                          <Shield className="w-4 h-4 text-green-600" />
                          Certifications
                        </h4>
                        <ul className="space-y-2">
                          {member.certifications.map((cert) => (
                            <li key={cert.name} className="flex items-center gap-2 text-sm">
                              <span
                                className={`w-2 h-2 rounded-full flex-shrink-0 ${
                                  cert.status === 'current'
                                    ? 'bg-green-500'
                                    : cert.status === 'expiring'
                                    ? 'bg-yellow-500'
                                    : 'bg-red-500'
                                }`}
                              />
                              <span className="text-gray-700">{cert.name}</span>
                              {cert.expiresAt && (
                                <span className="text-xs text-gray-400 ml-auto">
                                  {format(cert.expiresAt, 'MMM yyyy')}
                                </span>
                              )}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Training */}
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-bold text-sm text-gray-900 mb-3 flex items-center gap-2">
                          <Award className="w-4 h-4 text-blue-600" />
                          Training
                        </h4>
                        <ul className="space-y-2">
                          {member.trainings.map((t) => (
                            <li key={t.name} className="text-sm text-gray-700">
                              <span className="font-medium">{t.name}</span>
                              <span className="text-xs text-gray-400 block">
                                Completed {format(t.completedAt, 'MMM yyyy')}
                              </span>
                            </li>
                          ))}
                        </ul>
                        {member.upcomingTrainings && member.upcomingTrainings.length > 0 && (
                          <div className="mt-3 pt-3 border-t border-gray-200">
                            <p className="text-xs font-semibold text-yellow-700 mb-1">Upcoming</p>
                            {member.upcomingTrainings.map((t) => (
                              <p key={t} className="text-xs text-gray-600">{t}</p>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Contact & Milestones */}
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-bold text-sm text-gray-900 mb-3">Contact</h4>
                        <p className="text-sm text-gray-700">{member.email}</p>
                        <p className="text-sm text-gray-700">{member.phone}</p>
                        {member.milestones.length > 0 && (
                          <div className="mt-3 pt-3 border-t border-gray-200">
                            <p className="text-xs font-semibold text-purple-700 mb-1">Milestones</p>
                            {member.milestones.map((m) => (
                              <p key={m} className="text-xs text-gray-600 flex items-center gap-1">
                                <Award className="w-3 h-3 text-yellow-500" />
                                {m}
                              </p>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {member.recentKudos && (
                      <div className="bg-yellow-50 rounded-lg p-4 flex items-start gap-3">
                        <Star className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-semibold text-gray-900">Latest Kudos</p>
                          <p className="text-sm text-gray-700 mt-1">{member.recentKudos}</p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Certifications View */}
      {view === 'certifications' && (
        <div className="space-y-4">
          {expiringCerts.length > 0 && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-5 mb-6">
              <h3 className="font-bold text-yellow-800 mb-3 flex items-center gap-2">
                <AlertCircle className="w-5 h-5" />
                Certifications Expiring Within 90 Days
              </h3>
              <div className="space-y-2">
                {expiringCerts.map((cert, i) => (
                  <div key={i} className="flex items-center justify-between bg-white rounded-lg p-3 border border-yellow-200">
                    <div>
                      <p className="font-semibold text-sm text-gray-900">{cert.memberName}</p>
                      <p className="text-sm text-gray-600">{cert.name}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-yellow-700">
                        Expires {cert.expiresAt ? format(cert.expiresAt, 'MMM d, yyyy') : 'N/A'}
                      </p>
                      <p className="text-xs text-gray-500">
                        {cert.expiresAt ? `${differenceInDays(cert.expiresAt, new Date())} days remaining` : ''}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="card">
            <h3 className="font-bold text-gray-900 mb-4">All Certifications</h3>
            <table className="w-full">
              <thead>
                <tr className="table-head">
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600 uppercase">Employee</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600 uppercase">Certification</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600 uppercase">Status</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600 uppercase">Expires</th>
                </tr>
              </thead>
              <tbody>
                {TEAM.flatMap((m) =>
                  m.certifications.map((c, i) => (
                    <tr key={`${m.id}-${i}`} className="table-row">
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">{m.name}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">{c.name}</td>
                      <td className="px-4 py-3">
                        <StatusBadge
                          status={
                            c.status === 'current' ? 'active' : c.status === 'expiring' ? 'pending' : 'expired'
                          }
                        >
                          {c.status}
                        </StatusBadge>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-500">
                        {c.expiresAt ? format(c.expiresAt, 'MMM d, yyyy') : 'N/A'}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Recognition Board */}
      {view === 'recognition' && (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl p-8 text-center">
            <Star className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Team Recognition Board</h2>
            <p className="text-gray-600 mb-6">
              Celebrate your team's wins — kudos, milestones, and achievements
            </p>
            <button className="btn btn-primary">
              <Gift className="w-4 h-4 mr-2" />
              Give Kudos to a Team Member
            </button>
          </div>

          {/* Kudos leaderboard */}
          <div className="card">
            <h3 className="font-bold text-gray-900 mb-4">Kudos Leaderboard</h3>
            <div className="space-y-3">
              {[...TEAM].sort((a, b) => b.kudos - a.kudos).map((member, i) => (
                <div key={member.id} className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50">
                  <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                    i === 0 ? 'bg-yellow-100 text-yellow-800' :
                    i === 1 ? 'bg-gray-100 text-gray-800' :
                    i === 2 ? 'bg-orange-100 text-orange-800' :
                    'bg-gray-50 text-gray-600'
                  }`}>
                    {i + 1}
                  </span>
                  <div className="w-10 h-10 rounded-full bg-brand-primary text-white flex items-center justify-center font-bold text-sm">
                    {member.name.split(' ').map((n) => n[0]).join('')}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900 text-sm">{member.name}</p>
                    <p className="text-xs text-gray-500">{member.role}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span className="font-bold text-gray-900">{member.kudos}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent kudos */}
          <div className="card">
            <h3 className="font-bold text-gray-900 mb-4">Recent Kudos</h3>
            <div className="space-y-4">
              {TEAM.filter((m) => m.recentKudos).map((member) => (
                <div key={member.id} className="flex gap-4 p-4 bg-yellow-50 rounded-lg">
                  <Star className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{member.name}</p>
                    <p className="text-sm text-gray-700 mt-1">{member.recentKudos}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
