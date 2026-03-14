'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ChevronRight, Calendar, MapPin, Clock, Users, ChevronLeft, ChevronDown,
  Plus, ExternalLink, Heart, Music, Trophy, Briefcase, GraduationCap, TreePine, Send, X,
} from 'lucide-react';

type EventCategory = 'all' | 'community' | 'sports' | 'arts' | 'business' | 'outdoors' | 'education' | 'fundraiser';

interface CommunityEvent {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  town: string;
  category: EventCategory;
  description: string;
  organizer: string;
  featured?: boolean;
  free?: boolean;
}

const events: CommunityEvent[] = [
  {
    id: 1, title: 'Hinton Spring Market', date: '2026-03-28', time: '9:00 AM – 3:00 PM',
    location: 'Hinton Community Centre', town: 'Hinton',
    category: 'community', description: 'Local vendors, crafts, baking, and produce. Free admission. Support local artisans and growers.',
    organizer: 'Hinton Chamber of Commerce', featured: true, free: true,
  },
  {
    id: 2, title: 'Edson Minor Hockey Fundraiser', date: '2026-03-21', time: '6:00 PM – 10:00 PM',
    location: 'Edson & District Leisure Centre', town: 'Edson',
    category: 'fundraiser', description: 'Steak dinner, silent auction, and raffle in support of Edson Minor Hockey. Tickets $50/person.',
    organizer: 'Edson Minor Hockey Association',
  },
  {
    id: 3, title: 'Jasper Dark Sky Festival', date: '2026-04-04', time: '7:00 PM – 11:00 PM',
    location: 'Jasper Planetarium & Pyramid Lake', town: 'Jasper',
    category: 'outdoors', description: 'Annual stargazing event with telescopes, expert talks, and hot chocolate. Bring warm clothing.',
    organizer: 'Jasper Planetarium', featured: true,
  },
  {
    id: 4, title: 'Business After Hours Mixer', date: '2026-03-19', time: '5:30 PM – 7:30 PM',
    location: 'Folding Mountain Brewing', town: 'Hinton',
    category: 'business', description: 'Networking mixer for local business owners and professionals. Appetizers and first drink provided.',
    organizer: 'Hinton & District Chamber of Commerce', free: true,
  },
  {
    id: 5, title: 'Grande Cache Snowshoe Race', date: '2026-03-15', time: '10:00 AM – 2:00 PM',
    location: 'Grande Cache Nordic Centre', town: 'Grande Cache',
    category: 'sports', description: '5K and 10K snowshoe races through scenic trails. All skill levels welcome. Prizes for top finishers.',
    organizer: 'Grande Cache Nordic Club',
  },
  {
    id: 6, title: 'Robb Community Pancake Breakfast', date: '2026-03-22', time: '8:00 AM – 11:00 AM',
    location: 'Robb Community Hall', town: 'Robb',
    category: 'community', description: 'All-you-can-eat pancake breakfast. Fundraiser for the Robb Community Hall renovation project.',
    organizer: 'Robb Community Association',
  },
  {
    id: 7, title: 'Hinton Youth Music Showcase', date: '2026-04-05', time: '2:00 PM – 5:00 PM',
    location: 'Hinton Centre', town: 'Hinton',
    category: 'arts', description: 'Young musicians from the region perform a variety of genres. Family-friendly event supporting arts education.',
    organizer: 'Hinton Arts Council', free: true,
  },
  {
    id: 8, title: 'Edson Trail Clean-Up Day', date: '2026-04-12', time: '9:00 AM – 12:00 PM',
    location: 'Lions Park Trailhead', town: 'Edson',
    category: 'community', description: 'Annual volunteer trail cleanup. Bags, gloves, and snacks provided. Families welcome.',
    organizer: 'Town of Edson', free: true,
  },
  {
    id: 9, title: 'First Aid & CPR Workshop', date: '2026-04-08', time: '8:30 AM – 4:30 PM',
    location: 'Hinton Fire Hall', town: 'Hinton',
    category: 'education', description: 'Standard First Aid and CPR-C certification course. Pre-registration required. $95/person.',
    organizer: 'Mountain Safety Training',
  },
  {
    id: 10, title: 'Jasper Craft Beer Festival', date: '2026-04-18', time: '1:00 PM – 8:00 PM',
    location: 'Jasper Activity Centre', town: 'Jasper',
    category: 'community', description: 'Sample craft beers from Alberta breweries. Live music, food trucks, and local vendors. 18+ event.',
    organizer: 'Tourism Jasper', featured: true,
  },
  {
    id: 11, title: 'Yellowhead County Agricultural Fair', date: '2026-04-25', time: '10:00 AM – 5:00 PM',
    location: 'Edson Exhibition Grounds', town: 'Edson',
    category: 'community', description: 'Agricultural displays, livestock shows, 4-H competitions, children\'s activities, and food vendors.',
    organizer: 'Yellowhead County Agricultural Society', featured: true,
  },
  {
    id: 12, title: 'Hinton Disc Golf Tournament', date: '2026-04-19', time: '9:00 AM – 4:00 PM',
    location: 'Beaver Boardwalk Disc Golf Course', town: 'Hinton',
    category: 'sports', description: 'Open division disc golf tournament. $25 entry. Prizes for top 3 in each division. Lunch included.',
    organizer: 'Hinton Disc Golf Club',
  },
  {
    id: 13, title: 'Cadomin Cave Tours', date: '2026-05-02', time: '10:00 AM – 3:00 PM',
    location: 'Cadomin Cave', town: 'Cadomin',
    category: 'outdoors', description: 'Guided cave tours with local geologist. Learn about the cave\'s history and formations. Helmets provided.',
    organizer: 'Cadomin Community Group', free: true,
  },
  {
    id: 14, title: 'Muscular Dystrophy Fundraiser', date: '2026-05-10', time: '6:00 PM – 11:00 PM',
    location: 'Hinton Community Centre', town: 'Hinton',
    category: 'fundraiser', description: 'Annual gala dinner and dance supporting Muscular Dystrophy Canada. Live band. Tickets $75/person.',
    organizer: 'Hinton Fire Department', featured: true,
  },
  {
    id: 15, title: 'Small Business Workshop: Digital Marketing', date: '2026-04-22', time: '1:00 PM – 4:00 PM',
    location: 'Edson Public Library', town: 'Edson',
    category: 'business', description: 'Free workshop on social media marketing, Google Business Profile, and online advertising for small businesses.',
    organizer: 'Community Futures West Yellowhead', free: true,
  },
];

const categoryConfig: Record<EventCategory, { label: string; icon: React.ElementType; color: string }> = {
  all: { label: 'All Events', icon: Calendar, color: 'bg-gray-500' },
  community: { label: 'Community', icon: Users, color: 'bg-blue-500' },
  sports: { label: 'Sports', icon: Trophy, color: 'bg-green-500' },
  arts: { label: 'Arts & Culture', icon: Music, color: 'bg-purple-500' },
  business: { label: 'Business', icon: Briefcase, color: 'bg-indigo-500' },
  outdoors: { label: 'Outdoors', icon: TreePine, color: 'bg-emerald-500' },
  education: { label: 'Education', icon: GraduationCap, color: 'bg-yellow-500' },
  fundraiser: { label: 'Fundraiser', icon: Heart, color: 'bg-red-500' },
};

const towns = ['All', 'Hinton', 'Edson', 'Jasper', 'Grande Cache', 'Robb', 'Cadomin'];

function formatEventDate(dateStr: string) {
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('en-CA', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
}

function isUpcoming(dateStr: string) {
  return new Date(dateStr + 'T23:59:59') >= new Date();
}

export default function EventsPage() {
  const [selectedCategory, setSelectedCategory] = useState<EventCategory>('all');
  const [selectedTown, setSelectedTown] = useState('All');
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [submitForm, setSubmitForm] = useState({ title: '', date: '', time: '', location: '', town: '', category: '', description: '', organizer: '', email: '' });
  const [submitted, setSubmitted] = useState(false);

  const filtered = events
    .filter(e => isUpcoming(e.date))
    .filter(e => selectedCategory === 'all' || e.category === selectedCategory)
    .filter(e => selectedTown === 'All' || e.town === selectedTown)
    .sort((a, b) => a.date.localeCompare(b.date));

  const featuredEvents = events.filter(e => e.featured && isUpcoming(e.date)).sort((a, b) => a.date.localeCompare(b.date));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch('https://formspree.io/f/xbloyrap', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...submitForm,
          _subject: `WCC Event Submission: ${submitForm.title}`,
        }),
      });
    } catch {
      // Silent fallback
    }
    setSubmitted(true);
    setTimeout(() => {
      setShowSubmitModal(false);
      setSubmitted(false);
      setSubmitForm({ title: '', date: '', time: '', location: '', town: '', category: '', description: '', organizer: '', email: '' });
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
            <span className="text-brand-charcoal font-semibold">Events</span>
          </div>
        </div>
      </div>

      {/* Hero */}
      <section className="section-padding bg-gradient-to-r from-brand-charcoal to-gray-800 text-white">
        <div className="container-wide">
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">Community Events</h1>
          <p className="text-lg text-gray-200 max-w-2xl mb-6">
            Discover what&apos;s happening in the Hinton, Edson, Jasper, and western Alberta region.
            From community gatherings to outdoor adventures — get involved and support your neighbours.
          </p>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => setShowSubmitModal(true)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-brand-red text-white font-semibold rounded-lg hover:bg-red-700 transition-colors"
            >
              <Plus className="w-5 h-5" />
              Submit an Event
            </button>
          </div>
        </div>
      </section>

      {/* Featured Events */}
      {featuredEvents.length > 0 && (
        <section className="section-padding bg-yellow-50 border-b border-yellow-200">
          <div className="container-wide">
            <h2 className="font-heading text-2xl font-bold text-brand-charcoal mb-6 flex items-center gap-2">
              <Calendar className="w-6 h-6 text-brand-red" />
              Featured Events
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredEvents.slice(0, 3).map((event) => {
                const catConfig = categoryConfig[event.category];
                const CatIcon = catConfig.icon;
                return (
                  <div key={event.id} className="bg-white rounded-xl border-2 border-yellow-300 shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                    <div className={`${catConfig.color} px-6 py-3 text-white flex items-center gap-2`}>
                      <CatIcon className="w-4 h-4" />
                      <span className="text-sm font-semibold">{catConfig.label}</span>
                    </div>
                    <div className="p-6">
                      <h3 className="font-heading text-lg font-bold text-brand-charcoal mb-2">{event.title}</h3>
                      <p className="text-sm text-gray-600 mb-4">{event.description}</p>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2 text-gray-700">
                          <Calendar className="w-4 h-4 text-brand-red flex-shrink-0" />
                          {formatEventDate(event.date)}
                        </div>
                        <div className="flex items-center gap-2 text-gray-700">
                          <Clock className="w-4 h-4 text-brand-red flex-shrink-0" />
                          {event.time}
                        </div>
                        <div className="flex items-center gap-2 text-gray-700">
                          <MapPin className="w-4 h-4 text-brand-red flex-shrink-0" />
                          {event.location}, {event.town}
                        </div>
                      </div>
                      {event.free && (
                        <span className="inline-block mt-3 px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">FREE</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Filters */}
      <section className="section-padding bg-gray-50 border-b border-gray-200">
        <div className="container-wide">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Filter by Town</label>
              <div className="flex flex-wrap gap-2">
                {towns.map((town) => (
                  <button
                    key={town}
                    onClick={() => setSelectedTown(town)}
                    className={`px-3 py-1.5 rounded-full text-sm font-semibold transition-colors ${
                      selectedTown === town
                        ? 'bg-brand-charcoal text-white'
                        : 'bg-white border border-gray-300 text-gray-700 hover:border-brand-red hover:text-brand-red'
                    }`}
                  >
                    {town}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Filter by Category</label>
            <div className="flex flex-wrap gap-2">
              {(Object.entries(categoryConfig) as [EventCategory, typeof categoryConfig[EventCategory]][]).map(([key, config]) => {
                const Icon = config.icon;
                return (
                  <button
                    key={key}
                    onClick={() => setSelectedCategory(key)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-semibold transition-colors ${
                      selectedCategory === key
                        ? 'bg-brand-red text-white'
                        : 'bg-white border border-gray-300 text-gray-700 hover:border-brand-red hover:text-brand-red'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {config.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Events List */}
      <section className="section-padding">
        <div className="container-wide">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-heading text-2xl font-bold text-brand-charcoal">Upcoming Events</h2>
            <p className="text-gray-500 text-sm">{filtered.length} {filtered.length === 1 ? 'event' : 'events'} found</p>
          </div>
          <div className="space-y-4">
            {filtered.map((event) => {
              const catConfig = categoryConfig[event.category];
              const CatIcon = catConfig.icon;
              return (
                <div key={event.id} className="bg-white border-2 border-gray-200 rounded-lg overflow-hidden hover:border-brand-red hover:shadow-md transition-all">
                  <div className="flex flex-col md:flex-row">
                    {/* Date Column */}
                    <div className="md:w-32 flex-shrink-0 bg-gray-50 p-4 flex flex-col items-center justify-center text-center border-r border-gray-200">
                      <span className="text-sm text-gray-500 font-medium">
                        {new Date(event.date + 'T00:00:00').toLocaleDateString('en-CA', { month: 'short' })}
                      </span>
                      <span className="text-3xl font-bold text-brand-charcoal">
                        {new Date(event.date + 'T00:00:00').getDate()}
                      </span>
                      <span className="text-xs text-gray-500">
                        {new Date(event.date + 'T00:00:00').toLocaleDateString('en-CA', { weekday: 'short' })}
                      </span>
                    </div>
                    {/* Content */}
                    <div className="flex-1 p-6">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold text-white ${catConfig.color}`}>
                              <CatIcon className="w-3 h-3" />
                              {catConfig.label}
                            </span>
                            {event.free && (
                              <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-bold rounded-full">FREE</span>
                            )}
                          </div>
                          <h3 className="font-heading text-lg font-bold text-brand-charcoal">{event.title}</h3>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{event.description}</p>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                        <span className="flex items-center gap-1"><Clock className="w-4 h-4 text-gray-400" />{event.time}</span>
                        <span className="flex items-center gap-1"><MapPin className="w-4 h-4 text-gray-400" />{event.location}, {event.town}</span>
                        <span className="flex items-center gap-1"><Users className="w-4 h-4 text-gray-400" />{event.organizer}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16">
              <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600 text-lg font-medium">No upcoming events found</p>
              <p className="text-gray-500 text-sm mt-1">Try adjusting your filters or check back soon</p>
            </div>
          )}
        </div>
      </section>

      {/* Submit Event CTA */}
      <section className="section-padding bg-brand-red text-white">
        <div className="container-wide text-center">
          <h2 className="font-heading text-3xl font-bold mb-4">Have an Event to Share?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto text-red-100">
            Help grow our community calendar! Submit your event and we&apos;ll review it and add it to the listings.
            Events are automatically published after approval.
          </p>
          <button
            onClick={() => setShowSubmitModal(true)}
            className="inline-flex items-center gap-2 px-8 py-3 bg-white text-brand-red font-semibold rounded-lg hover:bg-gray-100 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Submit an Event
          </button>
        </div>
      </section>

      {/* Submit Event Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h3 className="font-heading text-xl font-bold text-brand-charcoal">Submit an Event</h3>
              <button onClick={() => { setShowSubmitModal(false); setSubmitted(false); }} className="p-2 hover:bg-gray-100 rounded-lg">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {submitted ? (
              <div className="p-8 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">Event Submitted!</h4>
                <p className="text-gray-600">
                  Thank you! Our team will review your event and publish it to the calendar within 1-2 business days.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Event Title *</label>
                  <input type="text" required value={submitForm.title}
                    onChange={(e) => setSubmitForm(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-red"
                    placeholder="Annual Community BBQ" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Date *</label>
                    <input type="date" required value={submitForm.date}
                      onChange={(e) => setSubmitForm(prev => ({ ...prev, date: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-red" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Time *</label>
                    <input type="text" required value={submitForm.time}
                      onChange={(e) => setSubmitForm(prev => ({ ...prev, time: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-red"
                      placeholder="2:00 PM – 5:00 PM" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Location *</label>
                    <input type="text" required value={submitForm.location}
                      onChange={(e) => setSubmitForm(prev => ({ ...prev, location: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-red"
                      placeholder="Hinton Community Centre" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Town *</label>
                    <select required value={submitForm.town}
                      onChange={(e) => setSubmitForm(prev => ({ ...prev, town: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-red">
                      <option value="">Select town</option>
                      {towns.filter(t => t !== 'All').map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Category *</label>
                  <select required value={submitForm.category}
                    onChange={(e) => setSubmitForm(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-red">
                    <option value="">Select category</option>
                    {Object.entries(categoryConfig).filter(([k]) => k !== 'all').map(([key, config]) => (
                      <option key={key} value={key}>{config.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Description *</label>
                  <textarea required rows={3} value={submitForm.description}
                    onChange={(e) => setSubmitForm(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-red"
                    placeholder="Tell people about the event..." />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Organizer *</label>
                    <input type="text" required value={submitForm.organizer}
                      onChange={(e) => setSubmitForm(prev => ({ ...prev, organizer: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-red"
                      placeholder="Organization name" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Contact Email *</label>
                    <input type="email" required value={submitForm.email}
                      onChange={(e) => setSubmitForm(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-red"
                      placeholder="events@org.com" />
                  </div>
                </div>
                <button type="submit"
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-brand-red text-white font-semibold rounded-lg hover:bg-red-700 transition-colors">
                  <Send className="w-4 h-4" />
                  Submit Event for Review
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
