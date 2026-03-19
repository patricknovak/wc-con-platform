'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Search,
  Package,
  Truck,
  CheckCircle2,
  Clock,
  FileText,
  ChevronRight,
  MapPin,
  Phone,
  AlertCircle,
} from 'lucide-react';

type OrderStage = 'quote' | 'po' | 'work_order' | 'in_progress' | 'completed' | 'invoiced' | 'paid';

interface TrackingResult {
  found: boolean;
  referenceNumber: string;
  type: 'quote' | 'po' | 'work_order' | 'invoice';
  customerName: string;
  projectName: string;
  currentStage: OrderStage;
  timeline: {
    stage: OrderStage;
    label: string;
    date?: string;
    status: 'completed' | 'current' | 'upcoming';
    details?: string;
  }[];
  deliveryAddress: string;
  materials: { description: string; quantity: number; unit: string }[];
  estimatedCompletion?: string;
  contactName?: string;
  contactPhone?: string;
  invoiceTotal?: number;
  amountDue?: number;
}

const MOCK_RESULTS: Record<string, TrackingResult> = {
  'QT-2026-0089': {
    found: true,
    referenceNumber: 'QT-2026-0089',
    type: 'quote',
    customerName: 'Apex Construction Ltd',
    projectName: 'Hwy 16 Road Resurfacing',
    currentStage: 'work_order',
    timeline: [
      { stage: 'quote', label: 'Quote Created', date: 'Mar 5, 2026', status: 'completed', details: 'QT-2026-0089 - $12,500.00' },
      { stage: 'po', label: 'PO Approved', date: 'Mar 7, 2026', status: 'completed', details: 'PO-2026-0034 - Accepted by client' },
      { stage: 'work_order', label: 'Work Scheduled', date: 'Mar 19, 2026', status: 'current', details: 'WO-2026-0042 - Assigned to Mike T.' },
      { stage: 'in_progress', label: 'Delivery In Progress', status: 'upcoming' },
      { stage: 'completed', label: 'Work Completed', status: 'upcoming' },
      { stage: 'invoiced', label: 'Invoice Sent', status: 'upcoming' },
    ],
    deliveryAddress: 'Hwy 16 & Range Rd 45, Hinton, AB',
    materials: [
      { description: 'Road Crush (3/4")', quantity: 200, unit: 'tonne' },
      { description: 'Pit Run Gravel', quantity: 150, unit: 'tonne' },
    ],
    estimatedCompletion: 'Mar 21, 2026',
    contactName: 'Mike Thompson',
    contactPhone: '(780) 865-0068',
  },
  'WO-2026-0045': {
    found: true,
    referenceNumber: 'WO-2026-0045',
    type: 'work_order',
    customerName: 'Mountain View Homes',
    projectName: 'Grande Cache Subdivision - Phase 2',
    currentStage: 'in_progress',
    timeline: [
      { stage: 'quote', label: 'Quote Created', date: 'Feb 20, 2026', status: 'completed', details: 'QT-2026-0072 - $8,200.00' },
      { stage: 'po', label: 'PO Approved', date: 'Feb 24, 2026', status: 'completed', details: 'PO-2026-0028' },
      { stage: 'work_order', label: 'Work Scheduled', date: 'Mar 15, 2026', status: 'completed', details: 'WO-2026-0045' },
      { stage: 'in_progress', label: 'Delivery In Progress', date: 'Mar 19, 2026', status: 'current', details: '3 of 5 loads delivered' },
      { stage: 'completed', label: 'Work Completed', status: 'upcoming' },
      { stage: 'invoiced', label: 'Invoice Sent', status: 'upcoming' },
    ],
    deliveryAddress: 'Grande Cache Subdivision, Lot 12-18, Grande Cache, AB',
    materials: [
      { description: 'Topsoil (Screened)', quantity: 80, unit: 'tonne' },
      { description: 'Decorative Rock', quantity: 25, unit: 'tonne' },
      { description: 'Landscaping Gravel', quantity: 40, unit: 'tonne' },
    ],
    estimatedCompletion: 'Mar 20, 2026',
    contactName: 'Dave Wilson',
    contactPhone: '(780) 865-0068',
  },
  'INV-2026-0031': {
    found: true,
    referenceNumber: 'INV-2026-0031',
    type: 'invoice',
    customerName: 'Twin Rivers Ltd',
    projectName: 'Pipeline Access Road - Edson',
    currentStage: 'invoiced',
    timeline: [
      { stage: 'quote', label: 'Quote Created', date: 'Feb 10, 2026', status: 'completed' },
      { stage: 'po', label: 'PO Approved', date: 'Feb 12, 2026', status: 'completed' },
      { stage: 'work_order', label: 'Work Scheduled', date: 'Feb 28, 2026', status: 'completed' },
      { stage: 'in_progress', label: 'Work In Progress', date: 'Mar 1-5, 2026', status: 'completed', details: '8 tickets completed' },
      { stage: 'completed', label: 'Work Completed', date: 'Mar 5, 2026', status: 'completed' },
      { stage: 'invoiced', label: 'Invoice Sent', date: 'Mar 10, 2026', status: 'current', details: 'INV-2026-0031 - Due Apr 9, 2026' },
    ],
    deliveryAddress: 'TWP Rd 534 & RR 185, Edson, AB',
    materials: [
      { description: 'Road Crush (3/4")', quantity: 450, unit: 'tonne' },
      { description: 'Pit Run', quantity: 300, unit: 'tonne' },
      { description: 'Washed Rock', quantity: 80, unit: 'tonne' },
    ],
    invoiceTotal: 38750.00,
    amountDue: 38750.00,
  },
};

const stageIcons: Record<OrderStage, React.ComponentType<{ className?: string }>> = {
  quote: FileText,
  po: Package,
  work_order: Clock,
  in_progress: Truck,
  completed: CheckCircle2,
  invoiced: FileText,
  paid: CheckCircle2,
};

export default function TrackOrderPage() {
  const [searchValue, setSearchValue] = useState('');
  const [result, setResult] = useState<TrackingResult | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [searching, setSearching] = useState(false);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!searchValue.trim()) return;

    setSearching(true);
    setNotFound(false);
    setResult(null);

    // Simulate API call
    setTimeout(() => {
      const found = MOCK_RESULTS[searchValue.trim().toUpperCase()];
      if (found) {
        setResult(found);
      } else {
        setNotFound(true);
      }
      setSearching(false);
    }, 800);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-4">
            <Link href="/" className="hover:text-gray-700">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900 font-medium">Track Order</span>
          </nav>
          <h1 className="text-3xl font-bold text-gray-900">Track Your Order</h1>
          <p className="text-gray-600 mt-2">
            Enter your quote, PO, work order, or invoice number to check the status of your order.
          </p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Search Form */}
        <form onSubmit={handleSearch} className="mb-8">
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Enter reference number (e.g., QT-2026-0089, WO-2026-0045, INV-2026-0031)"
                className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl text-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>
            <button
              type="submit"
              disabled={searching}
              className="px-8 py-4 bg-blue-700 text-white rounded-xl font-semibold hover:bg-blue-800 transition-colors disabled:opacity-50"
            >
              {searching ? 'Searching...' : 'Track'}
            </button>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            Try: QT-2026-0089, WO-2026-0045, or INV-2026-0031
          </p>
        </form>

        {/* Not Found */}
        {notFound && (
          <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
            <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Order Not Found</h2>
            <p className="text-gray-600 mb-6">
              We couldn&apos;t find an order matching &ldquo;{searchValue}&rdquo;. Please check the number and try again.
            </p>
            <p className="text-sm text-gray-500">
              Need help? Call us at{' '}
              <a href="tel:7808656000" className="text-blue-700 font-medium">(780) 865-6000</a>
            </p>
          </div>
        )}

        {/* Results */}
        {result && (
          <div className="space-y-6">
            {/* Order Header Card */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h2 className="text-2xl font-bold text-gray-900">{result.referenceNumber}</h2>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium capitalize">
                      {result.type.replace('_', ' ')}
                    </span>
                  </div>
                  <p className="text-gray-600">{result.customerName}</p>
                  <p className="text-gray-500 text-sm">{result.projectName}</p>
                </div>
                {result.estimatedCompletion && (
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Est. Completion</p>
                    <p className="text-lg font-semibold text-gray-900">{result.estimatedCompletion}</p>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  {result.deliveryAddress}
                </div>
                {result.contactName && (
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    {result.contactName}: {result.contactPhone}
                  </div>
                )}
              </div>
            </div>

            {/* Progress Timeline */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Order Progress</h3>
              <div className="space-y-0">
                {result.timeline.map((step, idx) => {
                  const Icon = stageIcons[step.stage];
                  const isLast = idx === result.timeline.length - 1;

                  return (
                    <div key={step.stage} className="flex gap-4">
                      {/* Timeline connector */}
                      <div className="flex flex-col items-center">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                            step.status === 'completed'
                              ? 'bg-green-100 text-green-600'
                              : step.status === 'current'
                                ? 'bg-blue-100 text-blue-600 ring-2 ring-blue-300'
                                : 'bg-gray-100 text-gray-400'
                          }`}
                        >
                          <Icon className="w-5 h-5" />
                        </div>
                        {!isLast && (
                          <div
                            className={`w-0.5 h-12 ${
                              step.status === 'completed' ? 'bg-green-300' : 'bg-gray-200'
                            }`}
                          />
                        )}
                      </div>

                      {/* Content */}
                      <div className="pb-8">
                        <p
                          className={`font-medium ${
                            step.status === 'upcoming' ? 'text-gray-400' : 'text-gray-900'
                          }`}
                        >
                          {step.label}
                        </p>
                        {step.date && (
                          <p className="text-sm text-gray-500">{step.date}</p>
                        )}
                        {step.details && (
                          <p className="text-sm text-gray-600 mt-1">{step.details}</p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Materials */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Materials</h3>
              <div className="divide-y divide-gray-100">
                {result.materials.map((mat, idx) => (
                  <div key={idx} className="flex justify-between py-3">
                    <span className="text-gray-700">{mat.description}</span>
                    <span className="font-medium text-gray-900">
                      {mat.quantity} {mat.unit}{mat.quantity !== 1 ? 's' : ''}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Invoice info if applicable */}
            {result.invoiceTotal && (
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Invoice Details</h3>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-gray-600">Total Amount</p>
                    <p className="text-2xl font-bold text-gray-900">
                      ${result.invoiceTotal.toLocaleString('en-CA', { minimumFractionDigits: 2 })}
                    </p>
                  </div>
                  {result.amountDue !== undefined && result.amountDue > 0 && (
                    <div className="text-right">
                      <p className="text-gray-600">Amount Due</p>
                      <p className="text-2xl font-bold text-red-600">
                        ${result.amountDue.toLocaleString('en-CA', { minimumFractionDigits: 2 })}
                      </p>
                    </div>
                  )}
                </div>
                <div className="mt-4 p-4 bg-gray-50 rounded-lg text-sm text-gray-600">
                  <p className="font-medium text-gray-700 mb-1">Payment Methods:</p>
                  <p>E-Transfer: accounting@wccon.com</p>
                  <p>Cheque: Payable to Westlake Crushing & Contracting Ltd</p>
                  <p>Mail: 450 East River Road, Hinton, AB T7V 1Y5</p>
                </div>
              </div>
            )}

            {/* Contact CTA */}
            <div className="bg-blue-50 rounded-xl border border-blue-200 p-6 text-center">
              <p className="text-gray-700 mb-3">Questions about your order?</p>
              <div className="flex justify-center gap-4">
                <a
                  href="tel:7808656000"
                  className="px-6 py-3 bg-blue-700 text-white rounded-lg font-medium hover:bg-blue-800 transition-colors"
                >
                  Call (780) 865-6000
                </a>
                <Link
                  href="/contact"
                  className="px-6 py-3 bg-white text-blue-700 border border-blue-300 rounded-lg font-medium hover:bg-blue-50 transition-colors"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* No search yet - show info */}
        {!result && !notFound && !searching && (
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Track Quotes</h3>
              <p className="text-sm text-gray-600">
                Use your quote number (QT-XXXX-XXXX) to see if your quote has been approved and scheduled.
              </p>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Track Deliveries</h3>
              <p className="text-sm text-gray-600">
                Use your work order number (WO-XXXX-XXXX) to see real-time delivery progress.
              </p>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Package className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Track Invoices</h3>
              <p className="text-sm text-gray-600">
                Use your invoice number (INV-XXXX-XXXX) to view invoice details and payment status.
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
