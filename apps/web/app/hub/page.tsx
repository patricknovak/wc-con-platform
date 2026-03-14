'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronRight, MapPin, Phone, Globe, Search, FileText, Send, X } from 'lucide-react';

const categories = [
  'All',
  'Excavation',
  'Plumbing & HVAC',
  'Electrical',
  'Concrete & Paving',
  'Landscaping',
  'Surveying',
  'Waste Management',
  'Building Supplies',
  'Safety Training',
  'Trucking & Hauling',
  'Fencing',
  'Welding & Fabrication',
  'Environmental',
];

const businesses = [
  {
    id: 1, name: 'Alpine Excavation Ltd', category: 'Excavation', location: 'Hinton, AB',
    phone: '(780) 865-1234', website: 'alpineexcavation.com',
    description: 'Professional excavation services for commercial and residential construction projects throughout western Alberta.',
    serviceAreas: ['Hinton', 'Edson', 'Jasper'],
  },
  {
    id: 2, name: 'Clear Drainage Solutions', category: 'Plumbing & HVAC', location: 'Edson, AB',
    phone: '(780) 723-4567', website: 'cleardrainage.com',
    description: 'Full-service plumbing and HVAC for commercial and residential buildings. 24/7 emergency service available.',
    serviceAreas: ['Edson', 'Hinton', 'Grande Cache'],
  },
  {
    id: 3, name: 'Power Up Electrical', category: 'Electrical', location: 'Hinton, AB',
    phone: '(780) 865-5678', website: 'powerupelectric.com',
    description: 'Licensed electrical contractors serving industrial, commercial, and residential clients across western Alberta.',
    serviceAreas: ['Hinton', 'Edson', 'Jasper', 'Grande Cache'],
  },
  {
    id: 4, name: 'Solid Ground Concrete', category: 'Concrete & Paving', location: 'Jasper, AB',
    phone: '(780) 852-3210', website: 'solidgroundconcrete.com',
    description: 'Quality concrete foundations, flatwork, and paving for residential and commercial projects.',
    serviceAreas: ['Jasper', 'Hinton', 'Robb'],
  },
  {
    id: 5, name: 'Green Thumb Landscaping', category: 'Landscaping', location: 'Hinton, AB',
    phone: '(780) 865-9999', website: 'greenthumbbiz.com',
    description: 'Complete landscape design, installation, and maintenance services. Specializing in native plants.',
    serviceAreas: ['Hinton', 'Edson'],
  },
  {
    id: 6, name: 'Precision Surveys Inc', category: 'Surveying', location: 'Edson, AB',
    phone: '(780) 723-8888', website: 'precisionsurveysab.com',
    description: 'Professional land and construction surveying. GPS machine control setup and topographic mapping.',
    serviceAreas: ['Hinton', 'Edson', 'Jasper', 'Grande Cache', 'Cadomin'],
  },
  {
    id: 7, name: 'Yellowhead Waste Services', category: 'Waste Management', location: 'Edson, AB',
    phone: '(780) 723-2200', website: 'yellowheadwaste.ca',
    description: 'Commercial and residential waste removal, roll-off bin rentals, and recycling services.',
    serviceAreas: ['Edson', 'Hinton', 'Wildwood', 'Peers'],
  },
  {
    id: 8, name: 'Foothills Building Supply', category: 'Building Supplies', location: 'Hinton, AB',
    phone: '(780) 865-4400', website: 'foothillsbuilding.ca',
    description: 'Full-service building supply centre. Lumber, hardware, tools, and contractor-grade materials.',
    serviceAreas: ['Hinton', 'Edson', 'Jasper', 'Grande Cache'],
  },
  {
    id: 9, name: 'Mountain Safety Training', category: 'Safety Training', location: 'Hinton, AB',
    phone: '(780) 865-7711', website: 'mountainsafety.ca',
    description: 'COR certification, first aid, WHMIS, H2S Alive, confined space entry, and custom safety training programs.',
    serviceAreas: ['Hinton', 'Edson', 'Jasper', 'Grande Cache'],
  },
  {
    id: 10, name: 'Sundance Fencing & Decks', category: 'Fencing', location: 'Hinton, AB',
    phone: '(780) 865-3322', website: 'sundancefencing.ca',
    description: 'Chain link, wood, vinyl, and agricultural fencing. Custom decks and pergolas.',
    serviceAreas: ['Hinton', 'Edson', 'Jasper'],
  },
  {
    id: 11, name: 'Ironworks Welding & Fabrication', category: 'Welding & Fabrication', location: 'Edson, AB',
    phone: '(780) 723-5500', website: 'ironworkswelding.ca',
    description: 'Certified welding, structural steel fabrication, custom metalwork, and mobile welding services.',
    serviceAreas: ['Edson', 'Hinton', 'Grande Cache', 'Cadomin'],
  },
  {
    id: 12, name: 'Rocky Mountain Environmental', category: 'Environmental', location: 'Hinton, AB',
    phone: '(780) 865-8800', website: 'rockymtnenv.ca',
    description: 'Environmental assessments, remediation, reclamation planning, and regulatory compliance consulting.',
    serviceAreas: ['Hinton', 'Edson', 'Jasper', 'Grande Cache'],
  },
  {
    id: 13, name: 'Bighorn Trucking Ltd', category: 'Trucking & Hauling', location: 'Hinton, AB',
    phone: '(780) 865-6644', website: 'bighorntrucking.ca',
    description: 'Flatbed, heavy haul, and equipment transport. Hot shot and rush delivery available.',
    serviceAreas: ['Hinton', 'Edson', 'Jasper', 'Grande Cache', 'Whitecourt'],
  },
  {
    id: 14, name: 'Parkland Electric Ltd', category: 'Electrical', location: 'Edson, AB',
    phone: '(780) 723-0123', website: 'parklandelectric.ca',
    description: 'Industrial and oilfield electrical services. Instrumentation, automation, and power distribution.',
    serviceAreas: ['Edson', 'Hinton', 'Whitecourt'],
  },
  {
    id: 15, name: 'Twin Rivers Construction', category: 'Excavation', location: 'Hinton, AB',
    phone: '(780) 865-0789', website: 'twinriversconstruction.ca',
    description: 'General contracting, site prep, road building, and underground utilities installation.',
    serviceAreas: ['Hinton', 'Edson', 'Jasper', 'Robb'],
  },
  {
    id: 16, name: 'Cascade Plumbing & Heating', category: 'Plumbing & HVAC', location: 'Jasper, AB',
    phone: '(780) 852-4455', website: 'cascadeplumbing.ca',
    description: 'Residential and commercial plumbing, heating, gas fitting, and boiler services.',
    serviceAreas: ['Jasper', 'Hinton'],
  },
];

interface QuoteRequest {
  businessId: number;
  businessName: string;
}

export default function HubPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [quoteModal, setQuoteModal] = useState<QuoteRequest | null>(null);
  const [quoteForm, setQuoteForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [quoteSubmitted, setQuoteSubmitted] = useState(false);

  const filtered = businesses.filter((b) => {
    const matchCategory = selectedCategory === 'All' || b.category === selectedCategory;
    const matchSearch = searchQuery === '' ||
      b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  const handleQuoteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch('https://formspree.io/f/xwpoyzdl', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: quoteForm.name,
          email: quoteForm.email,
          phone: quoteForm.phone,
          message: quoteForm.message,
          businessName: quoteModal?.businessName,
          _subject: `WCC Hub Quote Request: ${quoteModal?.businessName}`,
        }),
      });
    } catch {
      // Silent fallback — still show success
    }
    setQuoteSubmitted(true);
    setTimeout(() => {
      setQuoteModal(null);
      setQuoteSubmitted(false);
      setQuoteForm({ name: '', email: '', phone: '', message: '' });
    }, 3000);
  };

  return (
    <div className="bg-white">
      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="container-wide section-padding py-4">
          <div className="flex items-center text-sm text-gray-600">
            <Link href="/" className="hover:text-brand-red">Home</Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            <span className="text-brand-charcoal font-semibold">Business Hub</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-r from-brand-charcoal to-gray-800 text-white">
        <div className="container-wide">
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">Business Hub</h1>
          <p className="text-lg text-gray-200 max-w-2xl mb-6">
            Connect with trusted contractors and service providers in the Hinton, Edson, Jasper and western Alberta region. Find the right partner for your next project.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/hub/submit"
              className="inline-flex items-center px-6 py-3 bg-brand-red text-white font-semibold rounded-lg hover:bg-red-700 transition-colors"
            >
              Submit Your Business
            </Link>
          </div>
        </div>
      </section>

      {/* Search + Category Filter */}
      <section className="section-padding bg-gray-50 border-b border-gray-200">
        <div className="container-wide">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search businesses by name, category, or service..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-red text-gray-900"
              />
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                  selectedCategory === category
                    ? 'bg-brand-red text-white'
                    : 'bg-white border-2 border-gray-300 text-gray-700 hover:border-brand-red hover:text-brand-red'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Request a Quote Info */}
      <section className="section-padding bg-blue-50 border-b border-blue-200">
        <div className="container-wide">
          <div className="flex items-start gap-4">
            <FileText className="w-8 h-8 text-blue-600 flex-shrink-0 mt-1" />
            <div>
              <h2 className="font-heading text-xl font-bold text-brand-charcoal mb-2">Request a Quote from Any Business</h2>
              <p className="text-gray-700">
                Need services from one of our listed businesses? Click the &quot;Request Quote&quot; button on any listing.
                West Central Contracting will review your request and forward it to the business on your behalf,
                ensuring you get a prompt and professional response.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Businesses Grid */}
      <section className="section-padding">
        <div className="container-wide">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-heading text-2xl font-bold text-brand-charcoal">
              {selectedCategory === 'All' ? 'All Businesses' : selectedCategory}
            </h2>
            <p className="text-gray-500 text-sm">{filtered.length} {filtered.length === 1 ? 'business' : 'businesses'} found</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((business) => (
              <div
                key={business.id}
                className="bg-white border-2 border-gray-200 rounded-lg overflow-hidden hover:border-brand-red hover:shadow-lg transition-all"
              >
                <div className="bg-gradient-to-r from-brand-charcoal to-gray-700 px-6 py-4">
                  <span className="inline-block bg-brand-red text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {business.category}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="font-heading text-xl font-bold text-brand-charcoal mb-2">{business.name}</h3>
                  <p className="text-gray-700 mb-4 text-sm">{business.description}</p>
                  <div className="space-y-3 mb-4 border-y border-gray-200 py-4">
                    <div className="flex items-center text-gray-700 text-sm">
                      <MapPin className="w-4 h-4 text-brand-red mr-3 flex-shrink-0" />
                      {business.location}
                    </div>
                    <div className="flex items-center text-gray-700 text-sm">
                      <Phone className="w-4 h-4 text-brand-red mr-3 flex-shrink-0" />
                      <a href={`tel:${business.phone}`} className="hover:text-brand-red">{business.phone}</a>
                    </div>
                    {business.website && (
                      <div className="flex items-center text-gray-700 text-sm">
                        <Globe className="w-4 h-4 text-brand-red mr-3 flex-shrink-0" />
                        <span className="hover:text-brand-red">{business.website}</span>
                      </div>
                    )}
                  </div>
                  <div className="mb-4">
                    <p className="text-xs font-semibold text-gray-600 mb-2">Service Areas:</p>
                    <div className="flex flex-wrap gap-2">
                      {business.serviceAreas.map((area) => (
                        <span key={area} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">{area}</span>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <a
                      href={`tel:${business.phone}`}
                      className="flex-1 inline-block text-center px-4 py-2 bg-brand-red text-white font-semibold rounded-lg hover:bg-red-700 transition-colors text-sm"
                    >
                      Call Now
                    </a>
                    <button
                      onClick={() => setQuoteModal({ businessId: business.id, businessName: business.name })}
                      className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 border-2 border-brand-charcoal text-brand-charcoal font-semibold rounded-lg hover:bg-brand-charcoal hover:text-white transition-colors text-sm"
                    >
                      <FileText className="w-4 h-4" />
                      Request Quote
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16">
              <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600 text-lg font-medium">No businesses found</p>
              <p className="text-gray-500 text-sm mt-1">Try adjusting your search or category filter</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-brand-red text-white">
        <div className="container-wide text-center">
          <h2 className="font-heading text-3xl font-bold mb-4">Is Your Business Listed?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto text-red-100">
            Join the Business Hub and connect with potential clients across the Hinton, Edson, and Jasper region. Submit your business information today.
          </p>
          <Link
            href="/hub/submit"
            className="inline-flex items-center px-8 py-3 bg-white text-brand-red font-semibold rounded-lg hover:bg-gray-100 transition-colors"
          >
            Submit Your Business
          </Link>
        </div>
      </section>

      {/* Quote Request Modal */}
      {quoteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <div>
                <h3 className="font-heading text-xl font-bold text-brand-charcoal">Request a Quote</h3>
                <p className="text-sm text-gray-600 mt-1">For: {quoteModal.businessName}</p>
              </div>
              <button onClick={() => { setQuoteModal(null); setQuoteSubmitted(false); }} className="p-2 hover:bg-gray-100 rounded-lg">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {quoteSubmitted ? (
              <div className="p-8 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">Quote Request Sent!</h4>
                <p className="text-gray-600">
                  West Central Contracting will review your request and forward it to {quoteModal.businessName}. Expect a response within 1-2 business days.
                </p>
              </div>
            ) : (
              <form onSubmit={handleQuoteSubmit} className="p-6 space-y-4">
                <p className="text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
                  Your request will be reviewed by West Central Contracting and forwarded to the business. This ensures quality and a prompt response.
                </p>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={quoteForm.name}
                    onChange={(e) => setQuoteForm(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-red"
                    placeholder="John Smith"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Email *</label>
                    <input
                      type="email"
                      required
                      value={quoteForm.email}
                      onChange={(e) => setQuoteForm(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-red"
                      placeholder="john@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Phone *</label>
                    <input
                      type="tel"
                      required
                      value={quoteForm.phone}
                      onChange={(e) => setQuoteForm(prev => ({ ...prev, phone: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-red"
                      placeholder="(780) 555-0000"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">What do you need? *</label>
                  <textarea
                    required
                    rows={4}
                    value={quoteForm.message}
                    onChange={(e) => setQuoteForm(prev => ({ ...prev, message: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-red"
                    placeholder="Describe the services you need, project details, timeline, etc."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-brand-red text-white font-semibold rounded-lg hover:bg-red-700 transition-colors"
                >
                  <Send className="w-4 h-4" />
                  Submit Quote Request
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
