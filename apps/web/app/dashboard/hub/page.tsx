'use client';

import { useState } from 'react';
import { Check, X, Star } from 'lucide-react';
import StatusBadge from '@/components/dashboard/StatusBadge';

type HubTab = 'pending' | 'active' | 'featured' | 'rejected';

interface Business {
  id: string;
  name: string;
  category: string;
  contact: string;
  phone: string;
  status: 'pending' | 'active' | 'featured' | 'rejected';
}

const businesses: Business[] = [
  { id: 'BUS-001', name: 'Parkland Electric Ltd', category: 'Electrical Contractor', contact: 'Sarah Chen', phone: '(780) 555-0123', status: 'pending' },
  { id: 'BUS-002', name: 'Mountain View Equipment Rentals', category: 'Equipment Rental', contact: 'James Rodriguez', phone: '(403) 555-0456', status: 'active' },
  { id: 'BUS-003', name: 'Twin Rivers Construction', category: 'General Contractor', contact: 'Michael Thompson', phone: '(780) 555-0789', status: 'featured' },
  { id: 'BUS-004', name: 'Apex Demolition Services', category: 'Demolition', contact: 'David Brown', phone: '(780) 555-0321', status: 'rejected' },
];

export default function HubPage() {
  const [activeTab, setActiveTab] = useState<HubTab>('pending');

  const tabs: { label: string; value: HubTab }[] = [
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
        <p className="text-gray-600 mt-1">Manage partner network and referrals</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
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
          <p className="text-3xl font-bold text-gray-900 mt-2">12</p>
        </div>
      </div>

      <div className="mb-6 flex gap-2 overflow-x-auto pb-2 border-b border-gray-200">
        {tabs.map((tab) => (
          <button key={tab.value} onClick={() => setActiveTab(tab.value)}
            className={`px-4 py-3 whitespace-nowrap font-medium transition-colors border-b-2 ${
              activeTab === tab.value ? 'border-brand-primary text-brand-primary' : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}>
            {tab.label}
          </button>
        ))}
      </div>

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

      {filteredBusinesses.length === 0 && (
        <div className="text-center py-12"><p className="text-gray-600">No businesses in this category</p></div>
      )}
    </div>
  );
}
