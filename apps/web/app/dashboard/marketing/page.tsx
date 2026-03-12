'use client';

import { useState } from 'react';
import {
  BarChart3, TrendingUp, TrendingDown, Eye, MousePointer, DollarSign,
  Search, Globe, Target, ArrowUpRight, ArrowDownRight, Calendar,
  Pause, Play, Settings, ExternalLink, Users, Clock, Megaphone,
} from 'lucide-react';
import StatusBadge from '@/components/dashboard/StatusBadge';

type Tab = 'overview' | 'analytics' | 'adwords' | 'keywords';

// Mock Google Analytics data
const analyticsOverview = {
  visitors: { value: '3,247', change: '+18.3%', up: true },
  pageViews: { value: '8,912', change: '+12.7%', up: true },
  bounceRate: { value: '42.1%', change: '-3.2%', up: true },
  avgSession: { value: '2m 34s', change: '+8.1%', up: true },
  conversions: { value: '47', change: '+24.5%', up: true },
  conversionRate: { value: '1.45%', change: '+0.3%', up: true },
};

const topPages = [
  { page: '/', title: 'Homepage', views: 2340, unique: 1890, avgTime: '1:42' },
  { page: '/services', title: 'Services', views: 1256, unique: 1034, avgTime: '2:18' },
  { page: '/services/aggregate-sales', title: 'Aggregate Sales', views: 987, unique: 812, avgTime: '3:05' },
  { page: '/quote', title: 'Get a Quote', views: 645, unique: 598, avgTime: '4:12' },
  { page: '/contact', title: 'Contact', views: 534, unique: 467, avgTime: '1:55' },
  { page: '/about', title: 'About Us', views: 423, unique: 389, avgTime: '2:30' },
  { page: '/projects', title: 'Projects', views: 312, unique: 278, avgTime: '1:48' },
  { page: '/hub', title: 'Business Hub', views: 289, unique: 245, avgTime: '2:02' },
];

const trafficSources = [
  { source: 'Google Search', sessions: 1456, percentage: 44.8, color: 'bg-blue-500' },
  { source: 'Direct', sessions: 823, percentage: 25.3, color: 'bg-green-500' },
  { source: 'Google Ads', sessions: 412, percentage: 12.7, color: 'bg-yellow-500' },
  { source: 'Facebook', sessions: 234, percentage: 7.2, color: 'bg-indigo-500' },
  { source: 'Referral', sessions: 198, percentage: 6.1, color: 'bg-purple-500' },
  { source: 'Other', sessions: 124, percentage: 3.8, color: 'bg-gray-400' },
];

// Mock Google Ads data
const adCampaigns = [
  {
    id: 'C-001', name: 'Gravel Delivery — Hinton & Edson', status: 'active' as const,
    budget: 45, spent: 38.20, impressions: 12450, clicks: 342, ctr: 2.75,
    conversions: 18, cpa: 2.12, roas: 8.4,
  },
  {
    id: 'C-002', name: 'Trucking Services — Western AB', status: 'active' as const,
    budget: 35, spent: 29.50, impressions: 8920, clicks: 198, ctr: 2.22,
    conversions: 9, cpa: 3.28, roas: 6.2,
  },
  {
    id: 'C-003', name: 'Aggregate Sales — Crush & Fill', status: 'active' as const,
    budget: 30, spent: 24.80, impressions: 6780, clicks: 156, ctr: 2.30,
    conversions: 12, cpa: 2.07, roas: 9.1,
  },
  {
    id: 'C-004', name: 'Equipment Rental — Jasper Region', status: 'paused' as const,
    budget: 25, spent: 0, impressions: 0, clicks: 0, ctr: 0,
    conversions: 0, cpa: 0, roas: 0,
  },
  {
    id: 'C-005', name: 'Landscaping Materials — Spring 2026', status: 'active' as const,
    budget: 20, spent: 16.40, impressions: 4560, clicks: 134, ctr: 2.94,
    conversions: 7, cpa: 2.34, roas: 7.8,
  },
];

const topKeywords = [
  { keyword: 'gravel delivery hinton', impressions: 3200, clicks: 145, ctr: 4.53, cpc: 1.82, position: 2.1, conversions: 8 },
  { keyword: 'aggregate supplier edson', impressions: 1890, clicks: 89, ctr: 4.71, cpc: 2.15, position: 1.8, conversions: 5 },
  { keyword: 'trucking western alberta', impressions: 2450, clicks: 78, ctr: 3.18, cpc: 2.45, position: 3.2, conversions: 4 },
  { keyword: 'road crush hinton', impressions: 1240, clicks: 67, ctr: 5.40, cpc: 1.65, position: 1.5, conversions: 6 },
  { keyword: 'gravel pit near me', impressions: 4500, clicks: 112, ctr: 2.49, cpc: 1.92, position: 4.1, conversions: 3 },
  { keyword: 'sand and gravel edson ab', impressions: 980, clicks: 52, ctr: 5.31, cpc: 1.78, position: 1.9, conversions: 4 },
  { keyword: 'construction materials jasper', impressions: 1120, clicks: 41, ctr: 3.66, cpc: 2.30, position: 2.8, conversions: 2 },
  { keyword: 'bulk gravel delivery alberta', impressions: 2800, clicks: 65, ctr: 2.32, cpc: 2.55, position: 5.3, conversions: 2 },
  { keyword: 'landscaping materials hinton', impressions: 890, clicks: 48, ctr: 5.39, cpc: 1.45, position: 2.0, conversions: 3 },
  { keyword: 'fill dirt for sale hinton', impressions: 670, clicks: 38, ctr: 5.67, cpc: 1.35, position: 1.4, conversions: 3 },
];

const weeklyTraffic = [
  { day: 'Mon', visitors: 482 },
  { day: 'Tue', visitors: 521 },
  { day: 'Wed', visitors: 498 },
  { day: 'Thu', visitors: 534 },
  { day: 'Fri', visitors: 467 },
  { day: 'Sat', visitors: 389 },
  { day: 'Sun', visitors: 356 },
];

export default function MarketingDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>('overview');

  const totalBudget = adCampaigns.reduce((sum, c) => sum + c.budget, 0);
  const totalSpent = adCampaigns.reduce((sum, c) => sum + c.spent, 0);
  const totalConversions = adCampaigns.reduce((sum, c) => sum + c.conversions, 0);
  const totalClicks = adCampaigns.reduce((sum, c) => sum + c.clicks, 0);
  const maxVisitors = Math.max(...weeklyTraffic.map(d => d.visitors));

  const tabs: { label: string; value: Tab; icon: React.ElementType }[] = [
    { label: 'Overview', value: 'overview', icon: BarChart3 },
    { label: 'Google Analytics', value: 'analytics', icon: Globe },
    { label: 'Google Ads', value: 'adwords', icon: Megaphone },
    { label: 'Keywords', value: 'keywords', icon: Search },
  ];

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Marketing</h1>
          <p className="text-gray-600 mt-1">Google Analytics, Ads performance, and keyword tracking</p>
        </div>
        <div className="flex gap-3">
          <div className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-600">
            <Calendar className="w-4 h-4" />
            Last 30 Days
          </div>
          <button className="btn btn-dashboard-primary flex items-center gap-2">
            <ExternalLink className="w-4 h-4" />
            Open Google Ads
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                activeTab === tab.value
                  ? 'bg-brand-primary text-white'
                  : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: 'Website Visitors', value: analyticsOverview.visitors.value, change: analyticsOverview.visitors.change, up: true, icon: Users, color: 'bg-blue-50' },
              { label: 'Ad Clicks', value: totalClicks.toLocaleString(), change: '+15.2%', up: true, icon: MousePointer, color: 'bg-green-50' },
              { label: 'Conversions', value: totalConversions.toString(), change: '+24.5%', up: true, icon: Target, color: 'bg-yellow-50' },
              { label: 'Ad Spend', value: `$${totalSpent.toFixed(0)}/$${totalBudget}`, change: '71% of budget', up: true, icon: DollarSign, color: 'bg-purple-50' },
            ].map((metric) => (
              <div key={metric.label} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className={`w-10 h-10 rounded-lg ${metric.color} flex items-center justify-center mb-3`}>
                  <metric.icon className="w-5 h-5 text-gray-700" />
                </div>
                <p className="text-sm text-gray-600 font-medium">{metric.label}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{metric.value}</p>
                <div className="flex items-center gap-1 mt-2">
                  {metric.up ? (
                    <ArrowUpRight className="w-4 h-4 text-green-500" />
                  ) : (
                    <ArrowDownRight className="w-4 h-4 text-red-500" />
                  )}
                  <span className={`text-sm font-medium ${metric.up ? 'text-green-600' : 'text-red-600'}`}>
                    {metric.change}
                  </span>
                  <span className="text-xs text-gray-500 ml-1">vs last period</span>
                </div>
              </div>
            ))}
          </div>

          {/* Traffic Chart + Sources */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="font-bold text-gray-900 mb-4">Weekly Traffic</h3>
              <div className="flex items-end gap-3 h-48">
                {weeklyTraffic.map((day) => (
                  <div key={day.day} className="flex-1 flex flex-col items-center gap-2">
                    <span className="text-xs text-gray-500 font-medium">{day.visitors}</span>
                    <div
                      className="w-full bg-brand-primary rounded-t-md transition-all"
                      style={{ height: `${(day.visitors / maxVisitors) * 140}px` }}
                    />
                    <span className="text-xs text-gray-600 font-medium">{day.day}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="font-bold text-gray-900 mb-4">Traffic Sources</h3>
              <div className="space-y-3">
                {trafficSources.map((source) => (
                  <div key={source.source}>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-gray-700 font-medium">{source.source}</span>
                      <span className="text-gray-500">{source.percentage}%</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div className={`${source.color} h-2 rounded-full`} style={{ width: `${source.percentage}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Top Campaigns Summary */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="font-bold text-gray-900 mb-4">Active Ad Campaigns</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {adCampaigns.filter(c => c.status === 'active').slice(0, 3).map((campaign) => (
                <div key={campaign.id} className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 text-sm mb-2">{campaign.name}</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div><span className="text-gray-500">Clicks:</span> <span className="font-medium">{campaign.clicks}</span></div>
                    <div><span className="text-gray-500">Conv:</span> <span className="font-medium">{campaign.conversions}</span></div>
                    <div><span className="text-gray-500">Spent:</span> <span className="font-medium">${campaign.spent}</span></div>
                    <div><span className="text-gray-500">ROAS:</span> <span className="font-medium text-green-600">{campaign.roas}x</span></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Google Analytics Tab */}
      {activeTab === 'analytics' && (
        <div className="space-y-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {Object.entries(analyticsOverview).map(([key, data]) => {
              const labels: Record<string, string> = {
                visitors: 'Visitors', pageViews: 'Page Views', bounceRate: 'Bounce Rate',
                avgSession: 'Avg. Session', conversions: 'Conversions', conversionRate: 'Conv. Rate',
              };
              return (
                <div key={key} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                  <p className="text-xs text-gray-500 font-medium">{labels[key]}</p>
                  <p className="text-xl font-bold text-gray-900 mt-1">{data.value}</p>
                  <div className="flex items-center gap-1 mt-1">
                    {data.up ? <ArrowUpRight className="w-3 h-3 text-green-500" /> : <ArrowDownRight className="w-3 h-3 text-red-500" />}
                    <span className={`text-xs font-medium ${data.up ? 'text-green-600' : 'text-red-600'}`}>{data.change}</span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="font-bold text-gray-900 mb-4">Top Pages</h3>
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600 uppercase">Page</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-gray-600 uppercase">Views</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-gray-600 uppercase">Unique</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-gray-600 uppercase">Avg. Time</th>
                </tr>
              </thead>
              <tbody>
                {topPages.map((page) => (
                  <tr key={page.page} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <p className="text-sm font-medium text-gray-900">{page.title}</p>
                      <p className="text-xs text-gray-500">{page.page}</p>
                    </td>
                    <td className="px-4 py-3 text-sm text-right font-medium text-gray-900">{page.views.toLocaleString()}</td>
                    <td className="px-4 py-3 text-sm text-right text-gray-600">{page.unique.toLocaleString()}</td>
                    <td className="px-4 py-3 text-sm text-right text-gray-600">{page.avgTime}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="font-bold text-gray-900 mb-4">Traffic Sources</h3>
            <div className="space-y-4">
              {trafficSources.map((source) => (
                <div key={source.source} className="flex items-center gap-4">
                  <div className={`w-3 h-3 rounded-full ${source.color} flex-shrink-0`} />
                  <span className="text-sm font-medium text-gray-900 w-40">{source.source}</span>
                  <div className="flex-1 bg-gray-100 rounded-full h-3">
                    <div className={`${source.color} h-3 rounded-full`} style={{ width: `${source.percentage}%` }} />
                  </div>
                  <span className="text-sm text-gray-600 w-24 text-right">{source.sessions.toLocaleString()} sessions</span>
                  <span className="text-sm font-medium text-gray-900 w-16 text-right">{source.percentage}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Google Ads Tab */}
      {activeTab === 'adwords' && (
        <div className="space-y-8">
          {/* Budget Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <p className="text-sm text-gray-600 font-medium">Daily Budget</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">${totalBudget}/day</p>
              <p className="text-xs text-gray-500 mt-1">${(totalBudget * 30).toLocaleString()}/mo projected</p>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <p className="text-sm text-gray-600 font-medium">Spent Today</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">${totalSpent.toFixed(2)}</p>
              <div className="w-full bg-gray-100 rounded-full h-2 mt-2">
                <div className="bg-brand-primary h-2 rounded-full" style={{ width: `${(totalSpent / totalBudget) * 100}%` }} />
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <p className="text-sm text-gray-600 font-medium">Total Clicks</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{totalClicks}</p>
              <p className="text-xs text-green-600 font-medium mt-1">+15.2% vs last week</p>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <p className="text-sm text-gray-600 font-medium">Total Conversions</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{totalConversions}</p>
              <p className="text-xs text-green-600 font-medium mt-1">Avg CPA: ${(totalSpent / totalConversions).toFixed(2)}</p>
            </div>
          </div>

          {/* Campaigns Table */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-900">Campaigns</h3>
              <button className="btn btn-dashboard-primary text-sm flex items-center gap-2">
                <Megaphone className="w-4 h-4" />
                New Campaign
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600 uppercase">Campaign</th>
                    <th className="text-center px-4 py-3 text-xs font-semibold text-gray-600 uppercase">Status</th>
                    <th className="text-right px-4 py-3 text-xs font-semibold text-gray-600 uppercase">Budget</th>
                    <th className="text-right px-4 py-3 text-xs font-semibold text-gray-600 uppercase">Spent</th>
                    <th className="text-right px-4 py-3 text-xs font-semibold text-gray-600 uppercase">Impr.</th>
                    <th className="text-right px-4 py-3 text-xs font-semibold text-gray-600 uppercase">Clicks</th>
                    <th className="text-right px-4 py-3 text-xs font-semibold text-gray-600 uppercase">CTR</th>
                    <th className="text-right px-4 py-3 text-xs font-semibold text-gray-600 uppercase">Conv.</th>
                    <th className="text-right px-4 py-3 text-xs font-semibold text-gray-600 uppercase">ROAS</th>
                    <th className="text-center px-4 py-3 text-xs font-semibold text-gray-600 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {adCampaigns.map((campaign) => (
                    <tr key={campaign.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <p className="text-sm font-medium text-gray-900">{campaign.name}</p>
                        <p className="text-xs text-gray-500">{campaign.id}</p>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <StatusBadge status={campaign.status === 'active' ? 'active' : 'pending'}>
                          {campaign.status}
                        </StatusBadge>
                      </td>
                      <td className="px-4 py-3 text-sm text-right text-gray-900">${campaign.budget}/day</td>
                      <td className="px-4 py-3 text-sm text-right text-gray-900">${campaign.spent.toFixed(2)}</td>
                      <td className="px-4 py-3 text-sm text-right text-gray-600">{campaign.impressions.toLocaleString()}</td>
                      <td className="px-4 py-3 text-sm text-right font-medium text-gray-900">{campaign.clicks}</td>
                      <td className="px-4 py-3 text-sm text-right text-gray-600">{campaign.ctr}%</td>
                      <td className="px-4 py-3 text-sm text-right font-medium text-green-600">{campaign.conversions}</td>
                      <td className="px-4 py-3 text-sm text-right font-medium text-gray-900">{campaign.roas > 0 ? `${campaign.roas}x` : '—'}</td>
                      <td className="px-4 py-3 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button className="p-1 hover:bg-gray-100 rounded" title={campaign.status === 'active' ? 'Pause' : 'Resume'}>
                            {campaign.status === 'active' ? <Pause className="w-4 h-4 text-gray-500" /> : <Play className="w-4 h-4 text-green-500" />}
                          </button>
                          <button className="p-1 hover:bg-gray-100 rounded" title="Settings">
                            <Settings className="w-4 h-4 text-gray-500" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Keywords Tab */}
      {activeTab === 'keywords' && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <p className="text-sm text-gray-600 font-medium">Tracked Keywords</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{topKeywords.length}</p>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <p className="text-sm text-gray-600 font-medium">Avg. Position</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {(topKeywords.reduce((sum, k) => sum + k.position, 0) / topKeywords.length).toFixed(1)}
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <p className="text-sm text-gray-600 font-medium">Total Keyword Clicks</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {topKeywords.reduce((sum, k) => sum + k.clicks, 0).toLocaleString()}
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="font-bold text-gray-900 mb-4">Keyword Performance</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600 uppercase">Keyword</th>
                    <th className="text-right px-4 py-3 text-xs font-semibold text-gray-600 uppercase">Impr.</th>
                    <th className="text-right px-4 py-3 text-xs font-semibold text-gray-600 uppercase">Clicks</th>
                    <th className="text-right px-4 py-3 text-xs font-semibold text-gray-600 uppercase">CTR</th>
                    <th className="text-right px-4 py-3 text-xs font-semibold text-gray-600 uppercase">CPC</th>
                    <th className="text-right px-4 py-3 text-xs font-semibold text-gray-600 uppercase">Avg. Pos</th>
                    <th className="text-right px-4 py-3 text-xs font-semibold text-gray-600 uppercase">Conv.</th>
                  </tr>
                </thead>
                <tbody>
                  {topKeywords.map((kw) => (
                    <tr key={kw.keyword} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <Search className="w-4 h-4 text-gray-400" />
                          <span className="text-sm font-medium text-gray-900">{kw.keyword}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-right text-gray-600">{kw.impressions.toLocaleString()}</td>
                      <td className="px-4 py-3 text-sm text-right font-medium text-gray-900">{kw.clicks}</td>
                      <td className="px-4 py-3 text-sm text-right text-gray-600">{kw.ctr}%</td>
                      <td className="px-4 py-3 text-sm text-right text-gray-600">${kw.cpc.toFixed(2)}</td>
                      <td className="px-4 py-3 text-sm text-right">
                        <span className={`font-medium ${kw.position <= 3 ? 'text-green-600' : kw.position <= 5 ? 'text-yellow-600' : 'text-red-600'}`}>
                          {kw.position.toFixed(1)}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-right font-medium text-green-600">{kw.conversions}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
