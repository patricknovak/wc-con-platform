'use client';

import { useState } from 'react';
import { Check, X, Star, FileText, Send, Eye, Clock, ArrowRight } from 'lucide-react';
import StatusBadge from '@/components/dashboard/StatusBadge';
import { formatDistanceToNow } from 'date-fns';

type HubTab = 'quote_requests' | 'pending' | 'active' | 'featured' | 'rejected';

interface Business {
  id: string;
  name: string;
  category: string;
  contact: string;
  phone: string;
  status: 'pending' | 'active' | 'featured' | 'rejected';
}

interface QuoteRequest {
  id: string;
  requesterName: string;
  requesterEmail: string;
  requesterPhone: string;
  businessName: string;
  businessId: string;
  message: string;
  status: 'new' | 'reviewed' | 'forwarded' | 'completed';
  submittedAt: Date;
}

const businesses: Business[] = [
  { id: 'BUS-001', name: 'Parkland Electric Ltd', category: 'Electrical Contractor', contact: 'Sarah Chen', phone: '(780) 723-0123', status: 'pending' },
  { id: 'BUS-002', name: 'Mountain View Equipment Rentals', category: 'Equipment Rental', contact: 'James Rodriguez', phone: '(403) 555-0456', status: 'active' },
  { id: 'BUS-003', name: 'Twin Rivers Construction', category: 'General Contractor', contact: 'Michael Thompson', phone: '(780) 865-0789', status: 'featured' },
  { id: 'BUS-004', name: 'Apex Demolition Services', category: 'Demolition', contact: 'David Brown', phone: '(780) 555-0321', status: 'rejected' },
  { id: 'BUS-005', name: 'Alpine Excavation Ltd', category: 'Excavation', contact: 'Mark Beaulieu', phone: '(780) 865-1234', status: 'featured' },
  { id: 'BUS-006', name: 'Clear Drainage Solutions', category: 'Plumbing & HVAC', contact: 'Tom Winger', phone: '(780) 723-4567', status: 'active' },
  { id: 'BUS-007', name: 'Power Up Electrical', category: 'Electrical', contact: 'Raj Patel', phone: '(780) 865-5678', status: 'active' },
  { id: 'BUS-008', name: 'Solid Ground Concrete', category: 'Concrete & Paving', contact: 'Luc Bernier', phone: '(780) 852-3210', status: 'active' },
  { id: 'BUS-009', name: 'Green Thumb Landscaping', category: 'Landscaping', contact: 'Amy Wallace', phone: '(780) 865-9999', status: 'active' },
  { id: 'BUS-010', name: 'Yellowhead Waste Services', category: 'Waste Management', contact: 'Derek Han', phone: '(780) 723-2200', status: 'active' },
  { id: 'BUS-011', name: 'Foothills Building Supply', category: 'Building Supplies', contact: 'Karen Boyd', phone: '(780) 865-4400', status: 'active' },
  { id: 'BUS-012', name: 'Mountain Safety Training', category: 'Safety Training', contact: 'Glen Fraser', phone: '(780) 865-7711', status: 'featured' },
  { id: 'BUS-013', name: 'Sundance Fencing & Decks', category: 'Fencing', contact: 'Brett Olson', phone: '(780) 865-3322', status: 'active' },
  { id: 'BUS-014', name: 'Ironworks Welding & Fabrication', category: 'Welding', contact: 'Mike Trent', phone: '(780) 723-5500', status: 'active' },
  { id: 'BUS-015', name: 'Bighorn Trucking Ltd', category: 'Trucking', contact: 'Cal Mackie', phone: '(780) 865-6644', status: 'active' },
  { id: 'BUS-016', name: 'Cascade Plumbing & Heating', category: 'Plumbing & HVAC', contact: 'Pete Lawson', phone: '(780) 852-4455', status: 'pending' },
];

const quoteRequests: QuoteRequest[] = [
  {
    id: 'QR-001', requesterName: 'Sandra Mitchell', requesterEmail: 'sandra@mitchellhomes.ca',
    requesterPhone: '(780) 817-3344', businessName: 'Power Up Electrical', businessId: 'BUS-007',
    message: 'Looking for a quote to wire a new 2,400 sq ft home in the Mountainview subdivision in Hinton. Need full electrical, panel, and smart home pre-wire.',
    status: 'new', submittedAt: new Date(Date.now() - 2 * 60 * 60000),
  },
  {
    id: 'QR-002', requesterName: 'Dave Makenzie', requesterEmail: 'dave.mak@outlook.com',
    requesterPhone: '(780) 712-8899', businessName: 'Solid Ground Concrete', businessId: 'BUS-008',
    message: 'Need a concrete pad poured for a 24x30 shop. Also interested in a stamped concrete patio. Site is in Edson.',
    status: 'new', submittedAt: new Date(Date.now() - 5 * 60 * 60000),
  },
  {
    id: 'QR-003', requesterName: 'Yellowhead County Roads Dept', requesterEmail: 'roads@yellowheadcounty.ab.ca',
    requesterPhone: '(780) 723-4800', businessName: 'Alpine Excavation Ltd', businessId: 'BUS-005',
    message: 'Requesting quote for ditch cleaning and culvert replacement on Township Road 534. Approx 2.5 km section.',
    status: 'reviewed', submittedAt: new Date(Date.now() - 1 * 24 * 60 * 60000),
  },
  {
    id: 'QR-004', requesterName: 'Jennifer Foss', requesterEmail: 'jfoss@gmail.com',
    requesterPhone: '(780) 865-2211', businessName: 'Green Thumb Landscaping', businessId: 'BUS-009',
    message: 'Want to redesign my front yard with native plants and a rock garden. House is on Mountain Street in Hinton.',
    status: 'forwarded', submittedAt: new Date(Date.now() - 2 * 24 * 60 * 60000),
  },
  {
    id: 'QR-005', requesterName: 'Pete Ranchuk', requesterEmail: 'pranchuk@cnrl.com',
    requesterPhone: '(780) 865-5000', businessName: 'Mountain Safety Training', businessId: 'BUS-012',
    message: 'Need H2S Alive and confined space training for 12 workers. Preferred dates in April. On-site at our Hinton facility.',
    status: 'completed', submittedAt: new Date(Date.now() - 5 * 24 * 60 * 60000),
  },
];

export default function HubPage() {
  const [activeTab, setActiveTab] = useState<HubTab>('quote_requests');

  const tabs: { label: string; value: HubTab; count?: number }[] = [
    { label: 'Quote Requests', value: 'quote_requests', count: quoteRequests.filter(q => q.status === 'new').length },
    { label: 'Pending Approval', value: 'pending' },
    { label: 'Active', value: 'active' },
    { label: 'Featured', value: 'featured' },
    { label: 'Rejected', value: 'rejected' },
  ];

  const filteredBusinesses = businesses.filter((b) => b.status === activeTab);

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Business Hub</h1>
        <p className="text-gray-600 mt-1">Manage partner network, referrals, and quote requests</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <p className="text-gray-600 text-sm font-medium">Quote Requests</p>
          <p className="text-3xl font-bold text-blue-600 mt-2">{quoteRequests.filter(q => q.status === 'new').length}</p>
          <p className="text-xs text-gray-500 mt-1">new this week</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <p className="text-gray-600 text-sm font-medium">Active Partners</p>
          <p className="text-3xl font-bold text-brand-primary mt-2">{businesses.filter((b) => b.status === 'active').length}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <p className="text-gray-600 text-sm font-medium">Featured</p>
          <p className="text-3xl font-bold text-brand-secondary mt-2">{businesses.filter((b) => b.status === 'featured').length}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <p className="text-gray-600 text-sm font-medium">Pending Review</p>
          <p className="text-3xl font-bold text-yellow-600 mt-2">{businesses.filter((b) => b.status === 'pending').length}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <p className="text-gray-600 text-sm font-medium">Referrals This Month</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">18</p>
        </div>
      </div>

      <div className="mb-6 flex gap-2 overflow-x-auto pb-2 border-b border-gray-200">
        {tabs.map((tab) => (
          <button key={tab.value} onClick={() => setActiveTab(tab.value)}
            className={`px-4 py-3 whitespace-nowrap font-medium transition-colors border-b-2 flex items-center gap-2 ${
              activeTab === tab.value ? 'border-brand-primary text-brand-primary' : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}>
            {tab.label}
            {tab.count !== undefined && tab.count > 0 && (
              <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">{tab.count}</span>
            )}
          </button>
        ))}
      </div>

      {/* Quote Requests Tab */}
      {activeTab === 'quote_requests' && (
        <div className="space-y-4">
          {quoteRequests.map((request) => (
            <div key={request.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <h3 className="font-bold text-gray-900">{request.requesterName}</h3>
                  <StatusBadge status={
                    request.status === 'new' ? 'pending' :
                    request.status === 'reviewed' ? 'sent' :
                    request.status === 'forwarded' ? 'active' : 'accepted'
                  }>
                    {request.status}
                  </StatusBadge>
                </div>
                <span className="text-xs text-gray-500 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {formatDistanceToNow(request.submittedAt, { addSuffix: true })}
                </span>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <FileText className="w-4 h-4 text-brand-primary" />
                  <span className="text-sm font-semibold text-gray-700">Quote for: {request.businessName}</span>
                </div>
                <p className="text-sm text-gray-700">{request.message}</p>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex gap-4 text-sm text-gray-600">
                  <span>{request.requesterEmail}</span>
                  <span>{request.requesterPhone}</span>
                </div>
                <div className="flex gap-2">
                  {request.status === 'new' && (
                    <>
                      <button className="btn btn-outline text-sm flex items-center gap-2">
                        <Eye className="w-4 h-4" />Review
                      </button>
                      <button className="btn btn-dashboard-primary text-sm flex items-center gap-2">
                        <Send className="w-4 h-4" />Forward to Business
                      </button>
                    </>
                  )}
                  {request.status === 'reviewed' && (
                    <button className="btn btn-dashboard-primary text-sm flex items-center gap-2">
                      <Send className="w-4 h-4" />Forward to Business
                    </button>
                  )}
                  {request.status === 'forwarded' && (
                    <button className="btn btn-outline text-sm flex items-center gap-2">
                      <ArrowRight className="w-4 h-4" />Follow Up
                    </button>
                  )}
                  {request.status === 'completed' && (
                    <span className="text-sm text-green-600 font-medium flex items-center gap-1">
                      <Check className="w-4 h-4" />Completed
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Business Tabs */}
      {activeTab !== 'quote_requests' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBusinesses.map((business) => (
            <div key={business.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="mb-4 pb-4 border-b border-gray-200">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-bold text-gray-900">{business.name}</h3>
                  {business.status === 'featured' && <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />}
                </div>
                <p className="text-sm text-gray-600">{business.category}</p>
              </div>
              <div className="mb-6 space-y-2">
                <div><p className="text-xs text-gray-500 uppercase">Contact</p><p className="text-sm font-medium text-gray-900">{business.contact}</p></div>
                <div><p className="text-xs text-gray-500 uppercase">Phone</p><p className="text-sm font-medium text-gray-900">{business.phone}</p></div>
              </div>
              <div className="mb-6">
                <StatusBadge status={business.status === 'featured' ? 'accepted' : business.status === 'rejected' ? 'rejected' : business.status}>
                  {business.status === 'pending' ? 'Pending' : business.status === 'active' ? 'Active' : business.status === 'featured' ? 'Featured' : 'Rejected'}
                </StatusBadge>
              </div>
              {business.status === 'pending' && (
                <div className="flex gap-2">
                  <button className="flex-1 btn btn-dashboard-primary flex items-center justify-center gap-2 text-sm"><Check className="w-4 h-4" />Approve</button>
                  <button className="flex-1 btn btn-outline flex items-center justify-center gap-2 text-sm"><X className="w-4 h-4" />Reject</button>
                </div>
              )}
              {business.status === 'active' && <button className="w-full btn btn-outline flex items-center justify-center gap-2 text-sm"><Star className="w-4 h-4" />Feature</button>}
              {business.status === 'featured' && <button className="w-full btn btn-outline text-sm">View Profile</button>}
              {business.status === 'rejected' && <button className="w-full btn btn-outline text-sm">Review Again</button>}
            </div>
          ))}
        </div>
      )}

      {activeTab !== 'quote_requests' && filteredBusinesses.length === 0 && (
        <div className="text-center py-12"><p className="text-gray-600">No businesses in this category</p></div>
      )}
    </div>
  );
}
