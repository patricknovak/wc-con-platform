'use client';

import { useState } from 'react';
import { MessageSquare, X, Send, CheckCircle } from 'lucide-react';

export function QuickQuoteWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    material: '',
    quantity: '',
    deliveryLocation: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch('https://formspree.io/f/mvgkjwaq', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          _subject: `WCC Quick Quote: ${formData.material}`,
        }),
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        window.location.href = `mailto:admin@wc-con.com?subject=Quick Quote Request&body=Name: ${formData.name}%0APhone: ${formData.phone}%0AMaterial: ${formData.material}%0AQuantity: ${formData.quantity}%0ADelivery: ${formData.deliveryLocation}`;
      }
    } catch {
      window.location.href = `mailto:admin@wc-con.com?subject=Quick Quote Request&body=Name: ${formData.name}%0APhone: ${formData.phone}%0AMaterial: ${formData.material}%0AQuantity: ${formData.quantity}%0ADelivery: ${formData.deliveryLocation}`;
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="fixed bottom-6 right-24 z-50">
        <div className="bg-white rounded-lg shadow-2xl border border-gray-200 p-6 w-80">
          <div className="text-center">
            <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
            <h3 className="font-heading font-bold text-brand-charcoal mb-2">Quote Requested!</h3>
            <p className="text-sm text-gray-600 mb-4">We&apos;ll get back to you within 1 business day.</p>
            <button
              onClick={() => {
                setSubmitted(false);
                setIsOpen(false);
                setFormData({ name: '', phone: '', material: '', quantity: '', deliveryLocation: '' });
              }}
              className="text-sm text-brand-red font-semibold hover:underline"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-24 z-50">
      {isOpen && (
        <div className="mb-4 bg-white rounded-lg shadow-2xl border border-gray-200 w-80 overflow-hidden">
          <div className="bg-brand-red text-white px-4 py-3 flex items-center justify-between">
            <h3 className="font-heading font-bold text-sm">Quick Quote</h3>
            <button onClick={() => setIsOpen(false)} className="hover:text-red-200">
              <X className="w-4 h-4" />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="p-4 space-y-3">
            <input
              type="text"
              placeholder="Your Name"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-brand-red"
            />
            <input
              type="tel"
              placeholder="Phone Number"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-brand-red"
            />
            <select
              required
              value={formData.material}
              onChange={(e) => setFormData({ ...formData, material: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-brand-red bg-white"
            >
              <option value="">Select Material</option>
              <option value="Road Crush">Road Crush</option>
              <option value="Pit Run Gravel">Pit Run Gravel</option>
              <option value="Washed Rock">Washed Rock</option>
              <option value="Sand">Sand</option>
              <option value="Topsoil">Topsoil</option>
              <option value="Mulch">Mulch</option>
              <option value="Decorative Stone">Decorative Stone</option>
              <option value="Rip Rap">Rip Rap</option>
              <option value="Concrete Products">Concrete Products</option>
              <option value="Other">Other</option>
            </select>
            <input
              type="text"
              placeholder="Approx. Quantity (e.g., 20 tonnes)"
              value={formData.quantity}
              onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-brand-red"
            />
            <input
              type="text"
              placeholder="Delivery Location"
              value={formData.deliveryLocation}
              onChange={(e) => setFormData({ ...formData, deliveryLocation: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-brand-red"
            />
            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-brand-red text-white py-2 rounded font-semibold text-sm hover:bg-red-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              {submitting ? 'Sending...' : 'Get Quote'}
            </button>
          </form>
        </div>
      )}

      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-brand-red text-white w-14 h-14 rounded-full shadow-lg hover:bg-red-700 transition-all hover:scale-110 flex items-center justify-center"
          aria-label="Quick Quote"
        >
          <MessageSquare className="w-6 h-6" />
        </button>
      )}
    </div>
  );
}
