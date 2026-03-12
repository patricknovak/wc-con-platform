'use client';

import { useState } from 'react';
import { Plus, Eye, Check, Send } from 'lucide-react';
import StatusBadge from '@/components/dashboard/StatusBadge';
import { format } from 'date-fns';

type QuoteStatus = 'all' | 'draft' | 'pending' | 'sent' | 'accepted' | 'expired';

const quotes = [
  { id: 'QT-2024-156', customer: 'Apex Construction', total: '$12,500', status: 'sent' as const, created: new Date('2024-02-28') },
  { id: 'QT-2024-155', customer: 'Twin Rivers Ltd', total: '$8,750', status: 'accepted' as const, created: new Date('2024-02-27') },
  { id: 'QT-2024-154', customer: 'Mountain View Construction', total: '$15,300', status: 'draft' as const, created: new Date('2024-02-28') },
  { id: 'QT-2024-153', customer: 'Jasper Equipment Rentals', total: '$5,200', status: 'pending' as const, created: new Date('2024-02-25') },
  { id: 'QT-2024-152', customer: 'Parkland Services Inc', total: '$3,100', status: 'expired' as const, created: new Date('2024-01-15') },
];

export default function QuotesPage() {
  const [activeFilter, setActiveFilter] = useState<QuoteStatus>('all');

  const filters: { label: string; value: QuoteStatus }[] = [
    { label: 'All', value: 'all' },
    { label: 'Draft', value: 'draft' },
    { label: 'Pending Review', value: 'pending' },
    { label: 'Sent', value: 'sent' },
    { label: 'Accepted', value: 'accepted' },
    { label: 'Expired', value: 'expired' },
  ];

  const filteredQuotes = activeFilter === 'all' ? quotes : quotes.filter((q) => q.status === activeFilter);

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Quote Pipeline</h1>
          <p className="text-gray-600 mt-1">Manage and track all quotes</p>
        </div>
        <button className="btn btn-dashboard-primary flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Create Quote
        </button>
      </div>

      <div className="mb-6 flex gap-2 overflow-x-auto pb-2">
        {filters.map((filter) => (
          <button
            key={filter.value}
            onClick={() => setActiveFilter(filter.value)}
            className={`px-4 py-2 rounded-lg whitespace-nowrap font-medium transition-colors ${
              activeFilter === filter.value ? 'bg-brand-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="table-head">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Quote #</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Customer</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Total</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Created</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredQuotes.map((quote) => (
              <tr key={quote.id} className="table-row">
                <td className="px-6 py-4 text-sm font-semibold text-gray-900">{quote.id}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{quote.customer}</td>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{quote.total}</td>
                <td className="px-6 py-4 text-sm">
                  <StatusBadge status={quote.status}>
                    {quote.status.charAt(0).toUpperCase() + quote.status.slice(1)}
                  </StatusBadge>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">{format(quote.created, 'MMM d, yyyy')}</td>
                <td className="px-6 py-4 text-sm">
                  <div className="flex items-center gap-2">
                    <button className="p-2 text-gray-600 hover:text-brand-primary transition-colors rounded-lg hover:bg-gray-100">
                      <Eye className="w-4 h-4" />
                    </button>
                    {quote.status === 'draft' && (
                      <button className="p-2 text-gray-600 hover:text-brand-primary transition-colors rounded-lg hover:bg-gray-100">
                        <Check className="w-4 h-4" />
                      </button>
                    )}
                    {(quote.status === 'draft' || quote.status === 'pending') && (
                      <button className="p-2 text-gray-600 hover:text-brand-primary transition-colors rounded-lg hover:bg-gray-100">
                        <Send className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 grid grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 text-center">
          <p className="text-2xl font-bold text-brand-primary">{quotes.filter((q) => q.status === 'draft').length}</p>
          <p className="text-sm text-gray-600 mt-1">Drafts</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 text-center">
          <p className="text-2xl font-bold text-yellow-600">{quotes.filter((q) => q.status === 'sent').length}</p>
          <p className="text-sm text-gray-600 mt-1">Awaiting Response</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 text-center">
          <p className="text-2xl font-bold text-green-600">{quotes.filter((q) => q.status === 'accepted').length}</p>
          <p className="text-sm text-gray-600 mt-1">Accepted</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 text-center">
          <p className="text-2xl font-bold text-red-600">{quotes.filter((q) => q.status === 'expired').length}</p>
          <p className="text-sm text-gray-600 mt-1">Expired</p>
        </div>
      </div>
    </div>
  );
}
