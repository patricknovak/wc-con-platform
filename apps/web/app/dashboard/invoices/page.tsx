'use client';

import { useState } from 'react';
import {
  Plus,
  DollarSign,
  Clock,
  AlertTriangle,
  CheckCircle2,
  Send,
  FileText,
  ChevronDown,
  ChevronUp,
  CreditCard,
  X,
} from 'lucide-react';
import clsx from 'clsx';

type InvoiceStatusFilter = 'all' | 'draft' | 'sent' | 'partially_paid' | 'paid' | 'overdue';

interface InvoiceData {
  id: string;
  customer: string;
  company: string;
  issuedDate: string;
  dueDate: string;
  paymentTerms: string;
  subtotal: number;
  tax: number;
  total: number;
  amountPaid: number;
  amountDue: number;
  status: InvoiceStatusFilter;
  ticketRefs: string[];
  payments: { date: string; amount: number; method: string; reference: string }[];
}

const fmt = (n: number) => n.toLocaleString('en-CA', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const invoices: InvoiceData[] = [
  {
    id: 'INV-2026-0031', customer: 'Mark Johnson', company: 'Twin Rivers Ltd',
    issuedDate: '2026-03-10', dueDate: '2026-04-09', paymentTerms: 'Net 30',
    subtotal: 36904.76, tax: 1845.24, total: 38750.00, amountPaid: 0, amountDue: 38750.00,
    status: 'sent', ticketRefs: ['TK-2026-0085', 'TK-2026-0086', 'TK-2026-0087', 'TK-2026-0088'],
    payments: [],
  },
  {
    id: 'INV-2026-0030', customer: 'Sarah Chen', company: 'Apex Construction',
    issuedDate: '2026-03-05', dueDate: '2026-04-04', paymentTerms: 'Net 30',
    subtotal: 11904.76, tax: 595.24, total: 12500.00, amountPaid: 5000.00, amountDue: 7500.00,
    status: 'partially_paid', ticketRefs: ['TK-2026-0080', 'TK-2026-0081'],
    payments: [{ date: '2026-03-15', amount: 5000.00, method: 'E-Transfer', reference: 'ET-20260315' }],
  },
  {
    id: 'INV-2026-0029', customer: 'James Park', company: 'Mountain View Homes',
    issuedDate: '2026-02-20', dueDate: '2026-03-22', paymentTerms: 'Net 30',
    subtotal: 14571.43, tax: 728.57, total: 15300.00, amountPaid: 15300.00, amountDue: 0,
    status: 'paid', ticketRefs: ['TK-2026-0070', 'TK-2026-0071', 'TK-2026-0072'],
    payments: [{ date: '2026-03-10', amount: 15300.00, method: 'Cheque', reference: 'CHQ #4521' }],
  },
  {
    id: 'INV-2026-0028', customer: 'Dan Morrison', company: 'CN Rail',
    issuedDate: '2026-02-01', dueDate: '2026-03-03', paymentTerms: 'Net 30',
    subtotal: 42857.14, tax: 2142.86, total: 45000.00, amountPaid: 0, amountDue: 45000.00,
    status: 'overdue', ticketRefs: ['TK-2026-0058', 'TK-2026-0059', 'TK-2026-0060', 'TK-2026-0061', 'TK-2026-0062'],
    payments: [],
  },
  {
    id: 'INV-2026-0027', customer: 'Lisa Wong', company: 'TransAlta',
    issuedDate: '2026-02-15', dueDate: '2026-03-02', paymentTerms: 'Net 15',
    subtotal: 27619.05, tax: 1380.95, total: 29000.00, amountPaid: 29000.00, amountDue: 0,
    status: 'paid', ticketRefs: ['TK-2026-0065', 'TK-2026-0066', 'TK-2026-0067'],
    payments: [{ date: '2026-02-28', amount: 29000.00, method: 'Wire', reference: 'WIRE-TA-0228' }],
  },
  {
    id: 'INV-2026-0032', customer: 'Bob Smith', company: 'Parkland Services',
    issuedDate: '2026-03-15', dueDate: '2026-04-14', paymentTerms: 'Net 30',
    subtotal: 4761.90, tax: 238.10, total: 5000.00, amountPaid: 0, amountDue: 5000.00,
    status: 'draft', ticketRefs: ['TK-2026-0094', 'TK-2026-0095'],
    payments: [],
  },
];

const statusConfig: Record<string, { label: string; bg: string; text: string }> = {
  draft: { label: 'Draft', bg: 'bg-gray-100', text: 'text-gray-700' },
  sent: { label: 'Sent', bg: 'bg-blue-100', text: 'text-blue-700' },
  partially_paid: { label: 'Partially Paid', bg: 'bg-orange-100', text: 'text-orange-700' },
  paid: { label: 'Paid', bg: 'bg-green-100', text: 'text-green-700' },
  overdue: { label: 'Overdue', bg: 'bg-red-100', text: 'text-red-700' },
};

export default function InvoicesPage() {
  const [activeFilter, setActiveFilter] = useState<InvoiceStatusFilter>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [paymentModal, setPaymentModal] = useState<string | null>(null);

  const filters: { label: string; value: InvoiceStatusFilter; count: number }[] = [
    { label: 'All', value: 'all', count: invoices.length },
    { label: 'Draft', value: 'draft', count: invoices.filter(i => i.status === 'draft').length },
    { label: 'Sent', value: 'sent', count: invoices.filter(i => i.status === 'sent').length },
    { label: 'Partially Paid', value: 'partially_paid', count: invoices.filter(i => i.status === 'partially_paid').length },
    { label: 'Paid', value: 'paid', count: invoices.filter(i => i.status === 'paid').length },
    { label: 'Overdue', value: 'overdue', count: invoices.filter(i => i.status === 'overdue').length },
  ];

  const filtered = activeFilter === 'all' ? invoices : invoices.filter(i => i.status === activeFilter);

  const totalOutstanding = invoices.filter(i => ['sent', 'partially_paid', 'overdue'].includes(i.status)).reduce((s, i) => s + i.amountDue, 0);
  const totalOverdue = invoices.filter(i => i.status === 'overdue').reduce((s, i) => s + i.amountDue, 0);
  const collectedMonth = invoices.flatMap(i => i.payments).filter(p => p.date >= '2026-03-01').reduce((s, p) => s + p.amount, 0);

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Invoices</h1>
          <p className="text-gray-600 mt-1">Generate, send, and track payment on invoices</p>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 bg-blue-700 text-white rounded-lg font-medium hover:bg-blue-800 transition-colors">
          <Plus className="w-5 h-5" />
          Create Invoice
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Total Outstanding', value: `$${fmt(totalOutstanding)}`, icon: DollarSign, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Overdue', value: `$${fmt(totalOverdue)}`, icon: AlertTriangle, color: 'text-red-600', bg: 'bg-red-50' },
          { label: 'Collected (March)', value: `$${fmt(collectedMonth)}`, icon: CheckCircle2, color: 'text-green-600', bg: 'bg-green-50' },
          { label: 'Avg Days to Pay', value: '18', icon: Clock, color: 'text-purple-600', bg: 'bg-purple-50' },
        ].map((card) => (
          <div key={card.label} className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">{card.label}</span>
              <div className={clsx('w-8 h-8 rounded-lg flex items-center justify-center', card.bg)}>
                <card.icon className={clsx('w-4 h-4', card.color)} />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">{card.value}</p>
          </div>
        ))}
      </div>

      {/* Aging Report */}
      <div className="bg-white rounded-xl border border-gray-200 p-5 mb-6">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Invoice Aging</h3>
        <div className="flex gap-3">
          {[
            { label: 'Current (0-30)', amount: totalOutstanding - totalOverdue, color: 'bg-green-500' },
            { label: '31-60 days', amount: totalOverdue * 0.3, color: 'bg-yellow-500' },
            { label: '61-90 days', amount: totalOverdue * 0.7, color: 'bg-orange-500' },
            { label: '90+ days', amount: 0, color: 'bg-red-500' },
          ].map((bucket) => (
            <div key={bucket.label} className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <div className={clsx('w-3 h-3 rounded-full', bucket.color)} />
                <span className="text-xs text-gray-600">{bucket.label}</span>
              </div>
              <p className="text-sm font-semibold text-gray-900">${fmt(bucket.amount)}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6 flex gap-2 overflow-x-auto pb-2">
        {filters.map((f) => (
          <button
            key={f.value}
            onClick={() => setActiveFilter(f.value)}
            className={clsx(
              'px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap',
              activeFilter === f.value
                ? 'bg-blue-700 text-white'
                : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
            )}
          >
            {f.label} ({f.count})
          </button>
        ))}
      </div>

      {/* Invoice List */}
      <div className="space-y-3">
        {filtered.map((inv) => {
          const isExpanded = expandedId === inv.id;
          const sc = statusConfig[inv.status];

          return (
            <div key={inv.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div
                className="p-5 cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => setExpandedId(isExpanded ? null : inv.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-gray-900">{inv.id}</span>
                        <span className={clsx('px-2 py-0.5 rounded-full text-xs font-medium', sc.bg, sc.text)}>
                          {sc.label}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">{inv.company} &middot; {inv.customer}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-8 text-sm">
                    <div className="text-right">
                      <p className="text-gray-500">Total</p>
                      <p className="font-semibold text-gray-900">${fmt(inv.total)}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-500">Due</p>
                      <p className={clsx('font-semibold', inv.amountDue > 0 ? (inv.status === 'overdue' ? 'text-red-600' : 'text-gray-900') : 'text-green-600')}>
                        ${fmt(inv.amountDue)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-500">Due Date</p>
                      <p className="text-gray-900">{inv.dueDate}</p>
                    </div>
                    {isExpanded ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
                  </div>
                </div>

                <div className="mt-2 flex gap-2">
                  {inv.ticketRefs.map(ref => (
                    <span key={ref} className="px-2 py-0.5 bg-gray-100 rounded text-xs text-gray-600">{ref}</span>
                  ))}
                </div>
              </div>

              {isExpanded && (
                <div className="border-t border-gray-100 px-5 py-4 bg-gray-50">
                  <div className="grid grid-cols-2 gap-6 mb-4">
                    <div>
                      <h4 className="text-xs text-gray-500 uppercase tracking-wide mb-2">Invoice Details</h4>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between"><span className="text-gray-600">Subtotal</span><span>${fmt(inv.subtotal)}</span></div>
                        <div className="flex justify-between"><span className="text-gray-600">GST (5%)</span><span>${fmt(inv.tax)}</span></div>
                        <div className="flex justify-between font-semibold border-t border-gray-200 pt-1"><span>Total</span><span>${fmt(inv.total)}</span></div>
                        <div className="flex justify-between text-green-600"><span>Paid</span><span>-${fmt(inv.amountPaid)}</span></div>
                        <div className="flex justify-between font-bold text-lg border-t border-gray-200 pt-1"><span>Balance Due</span><span>${fmt(inv.amountDue)}</span></div>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-xs text-gray-500 uppercase tracking-wide mb-2">Payment History</h4>
                      {inv.payments.length > 0 ? (
                        <div className="space-y-2">
                          {inv.payments.map((p, i) => (
                            <div key={i} className="flex justify-between text-sm p-2 bg-white rounded border border-gray-200">
                              <div>
                                <span className="font-medium">${fmt(p.amount)}</span>
                                <span className="text-gray-500 ml-2">{p.method}</span>
                              </div>
                              <div className="text-gray-500">{p.date} &middot; {p.reference}</div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-gray-500">No payments recorded</p>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    {inv.amountDue > 0 && (
                      <button
                        onClick={(e) => { e.stopPropagation(); setPaymentModal(inv.id); }}
                        className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700"
                      >
                        <CreditCard className="w-4 h-4" />
                        Record Payment
                      </button>
                    )}
                    {inv.status === 'draft' && (
                      <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
                        <Send className="w-4 h-4" />
                        Send Invoice
                      </button>
                    )}
                    <button className="flex items-center gap-2 px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50">
                      <FileText className="w-4 h-4" />
                      View PDF
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Payment Modal */}
      {paymentModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setPaymentModal(null)}>
          <div className="bg-white rounded-xl p-6 w-full max-w-md" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-gray-900">Record Payment</h3>
              <button onClick={() => setPaymentModal(null)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
                <input type="text" defaultValue={fmt(invoices.find(i => i.id === paymentModal)?.amountDue || 0)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                  <option>E-Transfer</option>
                  <option>Cheque</option>
                  <option>Credit Card</option>
                  <option>Cash</option>
                  <option>Wire Transfer</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Reference / Cheque #</label>
                <input type="text" placeholder="e.g., CHQ #4521" className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date Received</label>
                <input type="date" defaultValue="2026-03-19" className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
              </div>
              <button className="w-full py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors">
                Record Payment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
