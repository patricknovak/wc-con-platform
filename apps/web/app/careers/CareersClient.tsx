'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ChevronRight,
  Briefcase,
  MapPin,
  Clock,
  Shield,
  Heart,
  Users,
  TrendingUp,
  Upload,
  CheckCircle,
  FileText,
  Send,
  Truck,
  HardHat,
  Wrench,
} from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Open positions                                                     */
/* ------------------------------------------------------------------ */

interface Position {
  id: string;
  title: string;
  department: string;
  type: 'Full-time' | 'Part-time' | 'Seasonal' | 'Contract';
  location: string;
  description: string;
  requirements: string[];
  niceToHave?: string[];
  icon: typeof Truck;
}

const OPEN_POSITIONS: Position[] = [
  {
    id: 'heavy-equipment-operator',
    title: 'Heavy Equipment Operator',
    department: 'Operations',
    type: 'Full-time',
    location: 'Hinton, AB',
    description:
      'Operate excavators, loaders, dozers, and graders on aggregate and construction sites across western Alberta. Work with a supportive team on varied and interesting projects.',
    requirements: [
      'Valid Class 5 driver\'s licence (Class 3 an asset)',
      '2+ years operating heavy equipment',
      'Experience with excavators, loaders, or dozers',
      'Ability to perform daily equipment inspections',
      'Strong safety awareness and commitment',
    ],
    niceToHave: [
      'COR safety training',
      'First Aid certification',
      'Gravel crushing experience',
    ],
    icon: HardHat,
  },
  {
    id: 'truck-driver',
    title: 'Truck Driver — Class 1 / Class 3',
    department: 'Transportation',
    type: 'Full-time',
    location: 'Hinton, AB',
    description:
      'Drive belly dumps, end dumps, truck & pups, and other heavy vehicles delivering aggregates and materials throughout western Alberta.',
    requirements: [
      'Valid Class 1 or Class 3 driver\'s licence',
      'Clean driver\'s abstract',
      '1+ years commercial driving experience',
      'Experience with belly dumps or end dumps preferred',
      'Ability to perform pre-trip inspections',
    ],
    niceToHave: [
      'Air brake endorsement',
      'Tandem/tridem experience',
      'Mountain driving experience',
    ],
    icon: Truck,
  },
  {
    id: 'general-labourer',
    title: 'General Labourer',
    department: 'Operations',
    type: 'Full-time',
    location: 'Hinton, AB',
    description:
      'Support our operations team with site preparation, material handling, equipment maintenance, and general construction tasks. Great entry point into the industry.',
    requirements: [
      'Physically fit — able to lift 50+ lbs',
      'Reliable transportation to Hinton',
      'Willingness to work outdoors in all weather',
      'Strong work ethic and positive attitude',
      'Valid driver\'s licence',
    ],
    niceToHave: [
      'Construction or aggregate experience',
      'Equipment operating basics',
      'First Aid certification',
    ],
    icon: Wrench,
  },
  {
    id: 'crusher-operator',
    title: 'Crusher Operator',
    department: 'Operations',
    type: 'Seasonal',
    location: 'Hinton, AB (various pit locations)',
    description:
      'Operate and maintain mobile crushing equipment to produce custom aggregate products. Ensure consistent quality and production targets.',
    requirements: [
      '2+ years crusher operation experience',
      'Knowledge of aggregate specifications and quality control',
      'Mechanical aptitude for basic maintenance',
      'Ability to work independently at remote pit locations',
      'Strong safety commitment',
    ],
    niceToHave: [
      'Experience with jaw, cone, or impact crushers',
      'Screening and washing equipment experience',
      'Welding basics',
    ],
    icon: HardHat,
  },
];

/* ------------------------------------------------------------------ */
/*  Benefits                                                           */
/* ------------------------------------------------------------------ */

const BENEFITS = [
  { icon: TrendingUp, title: 'Competitive Pay', desc: 'Industry-leading wages with performance bonuses and overtime opportunities' },
  { icon: Shield, title: 'Safety First', desc: 'COR certified. We invest in training, equipment, and procedures to keep you safe' },
  { icon: Heart, title: 'Benefits Package', desc: 'Extended health, dental, and vision coverage for you and your family' },
  { icon: Users, title: 'Family Culture', desc: 'Family-owned for 45+ years. We treat our team like family — because they are' },
  { icon: HardHat, title: 'Training & Growth', desc: 'Paid training, certifications, and equipment licensing. Grow your career with us' },
  { icon: Clock, title: 'Work-Life Balance', desc: 'Consistent schedules, local work, and time off to enjoy the beautiful Rockies' },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function CareersClient() {
  const [selectedPosition, setSelectedPosition] = useState<string | null>(null);
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    position: '',
    coverLetter: '',
  });
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [coverLetterFile, setCoverLetterFile] = useState<File | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const applicationRef = useRef<HTMLDivElement>(null);

  const handleApply = (positionId: string) => {
    setSelectedPosition(positionId);
    const position = OPEN_POSITIONS.find((p) => p.id === positionId);
    setFormData((prev) => ({ ...prev, position: position?.title || '' }));
    setTimeout(() => {
      applicationRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('submitting');

    try {
      const response = await fetch('https://formspree.io/f/xeoqkwrb', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          position: formData.position,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          coverLetter: formData.coverLetter || '(Not provided)',
          resumeFileName: resumeFile?.name || '(Not uploaded)',
          _subject: `WCC Job Application: ${formData.position} — ${formData.name}`,
        }),
      });

      if (!response.ok) {
        // Fallback to mailto
        const subject = `Job Application: ${formData.position} — ${formData.name}`;
        const body = [`POSITION: ${formData.position}`, '', `Name: ${formData.name}`, `Email: ${formData.email}`, `Phone: ${formData.phone}`, '', `COVER LETTER:`, formData.coverLetter || '(See attached file)'].join('\n');
        window.open(`mailto:careers@wc-con.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`, '_blank');
      }
    } catch {
      const subject = `Job Application: ${formData.position} — ${formData.name}`;
      const body = [`POSITION: ${formData.position}`, '', `Name: ${formData.name}`, `Email: ${formData.email}`, `Phone: ${formData.phone}`].join('\n');
      window.open(`mailto:careers@wc-con.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`, '_blank');
    }

    setFormState('success');
  };

  return (
    <div className="bg-white">
      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="container-wide section-padding py-4">
          <div className="flex items-center text-sm text-gray-600">
            <Link href="/" className="hover:text-brand-red">Home</Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            <span className="text-brand-charcoal font-semibold">Careers</span>
          </div>
        </div>
      </div>

      {/* Hero */}
      <section className="relative section-padding bg-brand-charcoal text-white overflow-hidden min-h-[400px] flex items-center">
        <Image
          src="/images/operations/brule-hills-trucks.webp"
          alt="West Central Contracting trucks and equipment in the field"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-charcoal/90 via-brand-charcoal/70 to-transparent" />
        <div className="relative container-wide">
          <div className="max-w-3xl">
            <p className="text-brand-red font-semibold text-sm uppercase tracking-wider mb-3">
              Join Our Team
            </p>
            <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">
              Build Your Career in Western Alberta
            </h1>
            <p className="text-lg text-gray-200 max-w-2xl mb-6">
              Family-owned since 1980 — we are looking for skilled, dedicated people to join
              our growing team. Great pay, benefits, and the chance to work in one of Alberta's
              most beautiful regions.
            </p>
            <a href="#positions" className="btn-primary text-lg px-8 py-4">
              View Open Positions
              <ChevronRight className="ml-2 h-5 w-5" />
            </a>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="section-padding bg-brand-cream">
        <div className="container-wide">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl font-bold text-brand-charcoal mb-4">
              Why Work With Us
            </h2>
            <p className="text-brand-gray-mid text-lg max-w-2xl mx-auto">
              We invest in our people because they are the foundation of everything we do.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {BENEFITS.map((benefit) => (
              <div key={benefit.title} className="bg-white rounded-xl p-6 border border-gray-200">
                <benefit.icon className="h-8 w-8 text-brand-red mb-4" />
                <h3 className="font-heading text-lg font-bold text-brand-charcoal mb-2">
                  {benefit.title}
                </h3>
                <p className="text-brand-gray-mid text-sm leading-relaxed">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section id="positions" className="section-padding">
        <div className="container-wide">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl font-bold text-brand-charcoal mb-4">
              Open Positions
            </h2>
            <p className="text-brand-gray-mid text-lg max-w-2xl mx-auto">
              Don't see the right fit? We're always looking for great people —{' '}
              <a href="#apply" className="text-brand-red font-semibold hover:underline">
                send us your resume
              </a>{' '}
              and we'll keep you in mind.
            </p>
          </div>

          <div className="space-y-6">
            {OPEN_POSITIONS.map((position) => {
              const Icon = position.icon;
              const isExpanded = selectedPosition === position.id;
              return (
                <div
                  key={position.id}
                  className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:border-brand-red transition-colors"
                >
                  <div className="p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-brand-red/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="h-6 w-6 text-brand-red" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-heading text-xl font-bold text-brand-charcoal">
                          {position.title}
                        </h3>
                        <div className="flex flex-wrap gap-3 mt-2">
                          <span className="inline-flex items-center gap-1 text-sm text-brand-gray-mid">
                            <Briefcase className="h-3.5 w-3.5" />
                            {position.department}
                          </span>
                          <span className="inline-flex items-center gap-1 text-sm text-brand-gray-mid">
                            <Clock className="h-3.5 w-3.5" />
                            {position.type}
                          </span>
                          <span className="inline-flex items-center gap-1 text-sm text-brand-gray-mid">
                            <MapPin className="h-3.5 w-3.5" />
                            {position.location}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <button
                          onClick={() => setSelectedPosition(isExpanded ? null : position.id)}
                          className="btn-secondary text-sm px-4 py-2"
                        >
                          {isExpanded ? 'Less Info' : 'Details'}
                        </button>
                        <button
                          onClick={() => handleApply(position.id)}
                          className="btn-primary text-sm px-4 py-2"
                        >
                          Apply Now
                        </button>
                      </div>
                    </div>

                    {isExpanded && (
                      <div className="mt-6 pt-6 border-t border-gray-200">
                        <p className="text-brand-gray-mid leading-relaxed mb-4">
                          {position.description}
                        </p>
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="font-semibold text-brand-charcoal mb-2">Requirements</h4>
                            <ul className="space-y-1.5">
                              {position.requirements.map((req) => (
                                <li key={req} className="flex items-start gap-2 text-sm text-brand-gray-mid">
                                  <CheckCircle className="h-4 w-4 text-accent-green flex-shrink-0 mt-0.5" />
                                  {req}
                                </li>
                              ))}
                            </ul>
                          </div>
                          {position.niceToHave && (
                            <div>
                              <h4 className="font-semibold text-brand-charcoal mb-2">Nice to Have</h4>
                              <ul className="space-y-1.5">
                                {position.niceToHave.map((item) => (
                                  <li key={item} className="flex items-start gap-2 text-sm text-brand-gray-mid">
                                    <TrendingUp className="h-4 w-4 text-accent-gold flex-shrink-0 mt-0.5" />
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section id="apply" className="section-padding bg-gray-50" ref={applicationRef}>
        <div className="container-wide max-w-3xl">
          <div className="text-center mb-10">
            <h2 className="font-heading text-3xl font-bold text-brand-charcoal mb-4">
              Apply Now
            </h2>
            <p className="text-brand-gray-mid text-lg">
              Submit your application below. Upload your resume and cover letter,
              and our team will review your submission.
            </p>
          </div>

          {formState === 'success' ? (
            <div className="bg-white rounded-xl border-2 border-green-200 p-12 text-center">
              <div className="mb-4 inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="font-heading text-2xl font-bold text-green-700 mb-3">
                Application Submitted!
              </h3>
              <p className="text-gray-600 mb-2">
                Thank you for your interest in joining West Central Contracting.
              </p>
              <p className="text-gray-500 text-sm mb-8">
                Please check your email client and attach your resume/cover letter files
                to the draft email. Our team will review your application and be in touch.
              </p>
              <button
                onClick={() => {
                  setFormState('idle');
                  setFormData({ name: '', email: '', phone: '', position: '', coverLetter: '' });
                  setResumeFile(null);
                  setCoverLetterFile(null);
                  setSelectedPosition(null);
                }}
                className="btn-primary"
              >
                Submit Another Application
              </button>
            </div>
          ) : (
            <form ref={formRef} onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-200 p-8 space-y-6">
              {/* Position */}
              <div>
                <label className="block font-heading font-semibold text-brand-charcoal mb-2">
                  Position Applying For *
                </label>
                <select
                  name="position"
                  value={formData.position}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-transparent"
                >
                  <option value="">Select a position</option>
                  {OPEN_POSITIONS.map((p) => (
                    <option key={p.id} value={p.title}>{p.title} ({p.type})</option>
                  ))}
                  <option value="General Application">General Application (No specific position)</option>
                </select>
              </div>

              {/* Name & Email */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-heading font-semibold text-brand-charcoal mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="John Doe"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block font-heading font-semibold text-brand-charcoal mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="john@example.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-transparent"
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="block font-heading font-semibold text-brand-charcoal mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  placeholder="(780) 555-1234"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-transparent"
                />
              </div>

              {/* Resume upload */}
              <div>
                <label className="block font-heading font-semibold text-brand-charcoal mb-2">
                  Resume *
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-brand-red transition-colors">
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => setResumeFile(e.target.files?.[0] || null)}
                    className="hidden"
                    id="resume-upload"
                  />
                  <label htmlFor="resume-upload" className="cursor-pointer">
                    {resumeFile ? (
                      <div className="flex items-center justify-center gap-2 text-accent-green">
                        <FileText className="h-5 w-5" />
                        <span className="font-semibold">{resumeFile.name}</span>
                      </div>
                    ) : (
                      <>
                        <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-600">
                          <span className="text-brand-red font-semibold">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-gray-400 mt-1">PDF, DOC, or DOCX (max 10MB)</p>
                      </>
                    )}
                  </label>
                </div>
              </div>

              {/* Cover letter upload */}
              <div>
                <label className="block font-heading font-semibold text-brand-charcoal mb-2">
                  Cover Letter (optional)
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-brand-red transition-colors">
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => setCoverLetterFile(e.target.files?.[0] || null)}
                    className="hidden"
                    id="cover-letter-upload"
                  />
                  <label htmlFor="cover-letter-upload" className="cursor-pointer">
                    {coverLetterFile ? (
                      <div className="flex items-center justify-center gap-2 text-accent-green">
                        <FileText className="h-5 w-5" />
                        <span className="font-semibold">{coverLetterFile.name}</span>
                      </div>
                    ) : (
                      <>
                        <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-600">
                          <span className="text-brand-red font-semibold">Click to upload</span> or type below
                        </p>
                      </>
                    )}
                  </label>
                </div>
                <textarea
                  name="coverLetter"
                  value={formData.coverLetter}
                  onChange={handleInputChange}
                  rows={4}
                  placeholder="Or type your cover letter here..."
                  className="w-full mt-3 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-transparent text-sm"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={formState === 'submitting' || !formData.name || !formData.email || !formData.phone || !formData.position}
                className="btn-primary w-full text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {formState === 'submitting' ? (
                  'Submitting...'
                ) : (
                  <>
                    <Send className="mr-2 h-5 w-5" />
                    Submit Application
                  </>
                )}
              </button>

              <p className="text-xs text-gray-400 text-center">
                Your information is sent directly to our hiring team. We review all
                applications and respond within 5 business days.
              </p>
            </form>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-brand-charcoal text-white">
        <div className="container-wide text-center">
          <h2 className="font-heading text-3xl font-bold mb-4">
            Questions About Working With Us?
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-8">
            Feel free to call or email. We're happy to chat about what it's like
            to work at West Central Contracting.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="mailto:careers@wc-con.com" className="btn-primary text-lg px-8 py-4">
              careers@wc-con.com
            </a>
            <a href="tel:7808653000" className="btn-secondary border-white text-white hover:bg-white hover:text-brand-charcoal text-lg px-8 py-4">
              (780) 865-3000
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
