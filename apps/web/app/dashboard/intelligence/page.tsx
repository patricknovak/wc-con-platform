'use client';

import { Upload, TrendingUp, FileText } from 'lucide-react';
import { format } from 'date-fns';

interface UploadedDoc {
  id: string;
  name: string;
  uploadedAt: Date;
  itemsProcessed: number;
}

const recentUploads: UploadedDoc[] = [
  { id: 'DOC-047', name: 'Q1 2026 Pricing Update - Aggregates.pdf', uploadedAt: new Date(Date.now() - 2 * 60 * 60000), itemsProcessed: 52 },
  { id: 'DOC-046', name: 'Winter Equipment Rental Rates.pdf', uploadedAt: new Date(Date.now() - 8 * 60 * 60000), itemsProcessed: 31 },
  { id: 'DOC-045', name: 'Labor Rate Adjustments 2026.pdf', uploadedAt: new Date(Date.now() - 1 * 24 * 60 * 60000), itemsProcessed: 18 },
  { id: 'DOC-044', name: 'Bulk Material Discounting Schedule.pdf', uploadedAt: new Date(Date.now() - 3 * 24 * 60 * 60000), itemsProcessed: 27 },
];

const insights = [
  { id: 1, title: 'Pricing Trend: Crushed Stone', description: 'Average price trending up 2.3% month-over-month. Consider adjusting quotes accordingly.', icon: '📈' },
  { id: 2, title: 'Seasonal Demand: Equipment Rental', description: 'Spring equipment rentals historically see 35% higher demand. Recommend increasing rates in Q2.', icon: '🔄' },
  { id: 3, title: 'Customer Segment: Municipal Buyers', description: 'Municipal contracts show 28% longer lead times. Budget 4-6 weeks for municipal RFP responses.', icon: '🏛️' },
];

export default function IntelligencePage() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Intelligence System</h1>
        <p className="text-gray-600 mt-1">Document analysis and AI-driven pricing insights</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <p className="text-gray-600 text-sm font-medium">Documents Processed</p>
          <p className="text-3xl font-bold text-brand-primary mt-2">47</p>
          <p className="text-xs text-gray-500 mt-2">this month</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <p className="text-gray-600 text-sm font-medium">Pricing Data Points</p>
          <p className="text-3xl font-bold text-brand-secondary mt-2">1,240</p>
          <p className="text-xs text-gray-500 mt-2">in knowledge base</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <p className="text-gray-600 text-sm font-medium">Avg Quote Accuracy</p>
          <p className="text-3xl font-bold text-green-600 mt-2">92%</p>
          <p className="text-xs text-gray-500 mt-2">based on actuals</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-brand-primary transition-colors cursor-pointer">
          <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Upload Documents</h3>
          <p className="text-gray-600 mb-4">Drag and drop PDF, Word, or Excel files to add to your knowledge base</p>
          <button className="btn btn-dashboard-primary">Select Files</button>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-lg font-bold text-gray-900 mb-4">AI Insights</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {insights.map((insight) => (
            <div key={insight.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="text-3xl mb-3">{insight.icon}</div>
              <h3 className="font-semibold text-gray-900 mb-2">{insight.title}</h3>
              <p className="text-sm text-gray-600">{insight.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h2 className="text-lg font-bold text-gray-900">Recent Uploads</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {recentUploads.map((doc) => (
            <div key={doc.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3 flex-1">
                  <FileText className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">{doc.name}</p>
                    <p className="text-xs text-gray-500 mt-1">Uploaded {format(doc.uploadedAt, 'MMM d, yyyy h:mm a')}</p>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-sm font-semibold text-gray-900">{doc.itemsProcessed} items</p>
                  <p className="text-xs text-gray-500">processed</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
