'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ChevronRight,
  Wrench,
  CheckCircle,
  Phone,
  Clock,
  Shield,
  Truck,
  MessageSquare,
  ArrowRight,
  HardHat,
  Loader2,
} from 'lucide-react';

const equipment = [
  {
    name: 'Excavators',
    category: 'Earthmoving',
    sizes: ['Mini (3-5 ton)', 'Mid-size (12-15 ton)', 'Full-size (20-30 ton)'],
    idealFor: [
      'Foundation excavation',
      'Trenching & utilities',
      'Site clearing & grading',
      'Demolition work',
    ],
    image: '/images/equipment/dozer.webp',
  },
  {
    name: 'Front-End Loaders',
    category: 'Earthmoving',
    sizes: ['Compact', 'Standard', 'Large capacity'],
    idealFor: [
      'Material loading & moving',
      'Stockpile management',
      'Snow removal',
      'Site cleanup',
    ],
    image: '/images/operations/rock-pit.webp',
  },
  {
    name: 'Skid Steers',
    category: 'Compact Equipment',
    sizes: ['Standard', 'Large frame', 'Track models'],
    idealFor: [
      'Tight-space excavation',
      'Grading & leveling',
      'Material handling',
      'Attachment versatility',
    ],
    image: '/images/operations/wash-pit.webp',
  },
  {
    name: 'Dozers',
    category: 'Earthmoving',
    sizes: ['Small (D3-D5)', 'Medium (D6-D7)', 'Large (D8+)'],
    idealFor: [
      'Land clearing',
      'Road building',
      'Grading large areas',
      'Push loading',
    ],
    image: '/images/equipment/dozer.webp',
  },
  {
    name: 'Graders',
    category: 'Road Equipment',
    sizes: ['Standard motor grader'],
    idealFor: [
      'Road maintenance',
      'Ditch cutting',
      'Fine grading',
      'Shoulder maintenance',
    ],
    image: '/images/operations/truck-grader-coalspur.webp',
  },
  {
    name: 'Compaction Equipment',
    category: 'Compaction',
    sizes: ['Walk-behind', 'Ride-on roller', 'Smooth drum', 'Padfoot'],
    idealFor: [
      'Soil compaction',
      'Road base prep',
      'Trench backfill',
      'Asphalt compaction',
    ],
    image: '/images/operations/brule-hills-trucks.webp',
  },
];

const rentalBenefits = [
  {
    icon: Clock,
    title: 'Flexible Terms',
    description: 'Daily, weekly, and monthly rental periods to fit your project schedule.',
  },
  {
    icon: Shield,
    title: 'Well-Maintained Fleet',
    description: 'All equipment is regularly serviced and safety-inspected before each rental.',
  },
  {
    icon: Truck,
    title: 'Delivery Available',
    description: 'Equipment delivery and pickup throughout western Alberta. We bring it to your site.',
  },
  {
    icon: HardHat,
    title: 'Operator Support',
    description: 'Experienced operators available if you need skilled hands for your project.',
  },
];

interface ProjectRecommendation {
  equipment: string[];
  reasoning: string;
  estimatedDuration: string;
  tips: string[];
}

const PROJECT_TYPES = [
  'Residential driveway construction',
  'Land clearing for building site',
  'Basement / foundation excavation',
  'Road or access road building',
  'Landscaping & grading',
  'Utility trench / pipeline',
  'Demolition project',
  'Snow removal / winter maintenance',
  'Agricultural / farm work',
  'Other (describe below)',
];

function getEquipmentRecommendation(
  projectType: string,
  siteSize: string,
  description: string
): ProjectRecommendation {
  const isSmall = siteSize === 'small';
  const isMedium = siteSize === 'medium';

  const recommendations: Record<string, ProjectRecommendation> = {
    'Residential driveway construction': {
      equipment: isSmall
        ? ['Skid Steer', 'Walk-behind Compactor']
        : ['Front-End Loader', 'Skid Steer', 'Ride-on Roller'],
      reasoning: `For a ${siteSize} residential driveway, you'll need equipment to excavate the subgrade, move and spread base material, and compact each layer. A ${isSmall ? 'skid steer handles excavation and grading in tight residential spaces' : 'front-end loader efficiently moves larger volumes of material while the skid steer handles fine grading'}.`,
      estimatedDuration: isSmall ? '1-2 days' : isMedium ? '2-4 days' : '3-5 days',
      tips: [
        'Compact subgrade before placing road crush base',
        'Apply base material in 6-inch lifts for proper compaction',
        'We supply road crush and pea gravel — bundle your rental with material delivery for savings',
        'Consider a 3-day rental minimum to account for prep and finishing',
      ],
    },
    'Land clearing for building site': {
      equipment: isSmall
        ? ['Mini Excavator', 'Skid Steer']
        : isMedium
          ? ['Excavator (12-15 ton)', 'Dozer (D5)', 'Skid Steer']
          : ['Excavator (20-30 ton)', 'Dozer (D6-D7)', 'Front-End Loader'],
      reasoning: `A ${siteSize} land clearing project requires ${isSmall ? 'compact equipment that can maneuver between trees. A mini excavator removes stumps while a skid steer handles brush and debris' : 'heavy equipment for efficient tree and stump removal. The dozer pushes material while the excavator handles root systems and heavy lifting'}.`,
      estimatedDuration: isSmall ? '2-3 days' : isMedium ? '1-2 weeks' : '2-4 weeks',
      tips: [
        'Check with Yellowhead County for land clearing permits',
        'Burn piles may need fire permits — check local regulations',
        'We can haul away debris with our trucking fleet',
        'Consider operator rental for dozer work if you lack experienced operators',
      ],
    },
    'Basement / foundation excavation': {
      equipment: isSmall
        ? ['Mini Excavator (3-5 ton)', 'Skid Steer']
        : ['Excavator (20-30 ton)', 'Front-End Loader', 'Compaction Equipment'],
      reasoning: `Foundation excavation requires precise digging to engineered specifications. ${isSmall ? 'A mini excavator provides the control needed for smaller footprints while the skid steer handles spoils removal' : 'A full-size excavator efficiently reaches required depths while the loader manages spoils and backfill material'}.`,
      estimatedDuration: isSmall ? '1-2 days' : isMedium ? '2-3 days' : '3-5 days',
      tips: [
        'Get your geotechnical report before excavating',
        'We supply drain rock for weeping tile systems',
        'Compact backfill in 12-inch lifts to prevent settling',
        'Consider renting a laser level for precise grade control',
      ],
    },
    'Road or access road building': {
      equipment: isSmall
        ? ['Skid Steer', 'Walk-behind Compactor']
        : isMedium
          ? ['Dozer (D5-D6)', 'Grader', 'Ride-on Roller']
          : ['Dozer (D7-D8)', 'Grader', 'Excavator', 'Ride-on Roller', 'Water Truck'],
      reasoning: `Road building requires clearing the corridor, establishing grade, placing base material, and compacting. ${isSmall ? 'For a short access road, a skid steer with grading bucket handles both clearing and material placement' : 'The dozer clears and rough-grades while the motor grader achieves precise crown and slope. A roller ensures proper compaction for load-bearing capacity'}.`,
      estimatedDuration: isSmall ? '2-4 days' : isMedium ? '1-3 weeks' : '3-8 weeks',
      tips: [
        'We supply road crush in bulk — ask about delivered pricing',
        'Proper drainage ditching prevents road failure',
        'Apply geotextile fabric on soft subgrades for long-term road stability',
        'Our trucking fleet can deliver aggregate directly to your build',
      ],
    },
  };

  const defaultRec: ProjectRecommendation = {
    equipment: isSmall
      ? ['Skid Steer', 'Mini Excavator']
      : isMedium
        ? ['Excavator (12-15 ton)', 'Skid Steer', 'Front-End Loader']
        : ['Excavator (20-30 ton)', 'Dozer', 'Front-End Loader', 'Compaction Equipment'],
    reasoning: `Based on your ${siteSize} project scope, we recommend a balanced equipment package. ${description ? `For your project involving "${description}", ` : ''}${isSmall ? 'compact equipment keeps costs down while handling most tasks' : 'full-size equipment maximizes productivity on larger sites'}. Our team can help fine-tune this recommendation.`,
    estimatedDuration: isSmall ? '1-3 days' : isMedium ? '1-2 weeks' : '2+ weeks',
    tips: [
      'Call us at (780) 865-3000 to discuss your specific project',
      'Bundle equipment rental with material delivery for the best value',
      'We offer experienced operators if you need skilled hands',
      'Weekly rates provide significant savings over daily rentals',
    ],
  };

  return recommendations[projectType] || defaultRec;
}

export default function EquipmentClient() {
  const [showAdvisor, setShowAdvisor] = useState(false);
  const [projectType, setProjectType] = useState('');
  const [siteSize, setSiteSize] = useState('medium');
  const [description, setDescription] = useState('');
  const [recommendation, setRecommendation] = useState<ProjectRecommendation | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleGetRecommendation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectType) return;

    setIsAnalyzing(true);
    // Simulate brief analysis delay for UX
    setTimeout(() => {
      const rec = getEquipmentRecommendation(projectType, siteSize, description);
      setRecommendation(rec);
      setIsAnalyzing(false);
    }, 800);
  };

  return (
    <div className="bg-white">
      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="container-wide section-padding py-4">
          <div className="flex items-center text-sm text-gray-600">
            <Link href="/services" className="hover:text-brand-red">
              Services
            </Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            <span className="text-brand-charcoal font-semibold">Equipment Rental</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative section-padding bg-brand-charcoal text-white overflow-hidden min-h-[350px] flex items-center">
        <Image
          src="/images/equipment/dozer.webp"
          alt="West Central Contracting dozer on job site"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-charcoal/90 via-brand-charcoal/70 to-transparent" />
        <div className="relative container-wide">
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">Equipment Rental</h1>
          <p className="text-lg text-gray-200 max-w-2xl">
            Quality construction equipment for any project size. From compact excavators
            to heavy dozers, rent the right machine with flexible terms and delivery across
            western Alberta.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <button
              onClick={() => {
                setShowAdvisor(true);
                document.getElementById('ai-advisor')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="btn-primary bg-white text-brand-red hover:bg-gray-100"
            >
              <MessageSquare className="w-5 h-5 mr-2" />
              Equipment Advisor
            </button>
            <Link href="/quote?service=Equipment+Rental" className="btn-secondary border-white text-white hover:bg-white/10">
              Request a Quote
            </Link>
          </div>
        </div>
      </section>

      {/* AI Equipment Advisor */}
      <section id="ai-advisor" className="section-padding bg-gradient-to-b from-gray-50 to-white">
        <div className="container-wide">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 bg-brand-red/10 text-brand-red px-4 py-2 rounded-full text-sm font-semibold mb-4">
                <MessageSquare className="w-4 h-4" />
                Smart Equipment Advisor
              </div>
              <h2 className="font-heading text-3xl font-bold text-brand-charcoal mb-3">
                Not Sure What You Need?
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Tell us about your project and we&apos;ll recommend the right equipment package,
                estimated rental duration, and pro tips to save time and money.
              </p>
            </div>

            <div className="bg-white rounded-xl border-2 border-gray-200 shadow-lg overflow-hidden">
              <div className="bg-brand-charcoal text-white px-6 py-4 flex items-center gap-3">
                <Wrench className="w-5 h-5" />
                <span className="font-heading font-semibold">Project Equipment Advisor</span>
              </div>

              <form onSubmit={handleGetRecommendation} className="p-6 space-y-6">
                <div>
                  <label className="block font-heading font-semibold text-brand-charcoal mb-2">
                    What type of project?
                  </label>
                  <select
                    value={projectType}
                    onChange={(e) => {
                      setProjectType(e.target.value);
                      setRecommendation(null);
                    }}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-red"
                    required
                  >
                    <option value="">Select your project type...</option>
                    {PROJECT_TYPES.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-heading font-semibold text-brand-charcoal mb-2">
                    Project size
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { value: 'small', label: 'Small', desc: 'Residential / under 1 acre' },
                      { value: 'medium', label: 'Medium', desc: '1-10 acres' },
                      { value: 'large', label: 'Large', desc: '10+ acres / commercial' },
                    ].map((size) => (
                      <button
                        key={size.value}
                        type="button"
                        onClick={() => {
                          setSiteSize(size.value);
                          setRecommendation(null);
                        }}
                        className={`p-3 rounded-lg border-2 text-left transition-colors ${
                          siteSize === size.value
                            ? 'border-brand-red bg-red-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <span className="font-semibold text-brand-charcoal block">{size.label}</span>
                        <span className="text-xs text-gray-500">{size.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block font-heading font-semibold text-brand-charcoal mb-2">
                    Additional details <span className="font-normal text-gray-500">(optional)</span>
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="e.g., Building a 200ft gravel access road to a cabin site, need to clear some trees first..."
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-red resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={!projectType || isAnalyzing}
                  className="w-full btn-primary bg-brand-red text-white disabled:opacity-50"
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Analyzing your project...
                    </>
                  ) : (
                    <>
                      <Wrench className="w-5 h-5 mr-2" />
                      Get Equipment Recommendation
                    </>
                  )}
                </button>
              </form>

              {/* Recommendation Result */}
              {recommendation && (
                <div className="border-t-2 border-brand-red bg-gray-50 p-6">
                  <h3 className="font-heading text-xl font-bold text-brand-charcoal mb-4 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    Recommended Equipment Package
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="bg-white rounded-lg p-4 border border-gray-200">
                      <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Equipment Needed</span>
                      <ul className="mt-2 space-y-1">
                        {recommendation.equipment.map((item) => (
                          <li key={item} className="flex items-center gap-2 text-brand-charcoal font-semibold">
                            <CheckCircle className="w-4 h-4 text-brand-red flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-white rounded-lg p-4 border border-gray-200">
                      <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Estimated Duration</span>
                      <p className="mt-2 text-2xl font-bold text-brand-charcoal">{recommendation.estimatedDuration}</p>
                      <p className="text-sm text-gray-500 mt-1">Rental period recommendation</p>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg p-4 border border-gray-200 mb-4">
                    <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Our Analysis</span>
                    <p className="mt-2 text-gray-700">{recommendation.reasoning}</p>
                  </div>

                  <div className="bg-blue-50 rounded-lg p-4 border border-blue-200 mb-6">
                    <span className="text-sm font-semibold text-blue-800 uppercase tracking-wide">Pro Tips</span>
                    <ul className="mt-2 space-y-2">
                      {recommendation.tips.map((tip) => (
                        <li key={tip} className="text-sm text-blue-900 flex items-start gap-2">
                          <span className="text-blue-500 mt-0.5">&#9679;</span>
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Link
                      href={`/quote?service=Equipment+Rental&material=${encodeURIComponent(recommendation.equipment.join(', '))}`}
                      className="btn-primary flex-1 text-center"
                    >
                      Request Quote for This Package
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                    <a
                      href="tel:7808653000"
                      className="btn-secondary flex-1 text-center"
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      Call to Discuss
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Equipment Fleet */}
      <section className="section-padding">
        <div className="container-wide">
          <h2 className="font-heading text-3xl font-bold text-brand-charcoal mb-12">
            Our Rental Fleet
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {equipment.map((item) => (
              <div
                key={item.name}
                className="bg-white border-2 border-gray-200 rounded-lg overflow-hidden hover:border-brand-red transition-colors hover:shadow-lg group"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-brand-red text-white text-xs font-semibold px-3 py-1 rounded-full">
                    {item.category}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-heading text-xl font-bold text-brand-charcoal mb-2">
                    {item.name}
                  </h3>
                  <div className="mb-3">
                    <p className="text-sm font-semibold text-gray-500 mb-1">Available Sizes:</p>
                    <p className="text-sm text-gray-700">{item.sizes.join(' | ')}</p>
                  </div>
                  <div className="mb-4">
                    <p className="text-sm font-semibold text-gray-500 mb-1">Ideal For:</p>
                    <ul className="space-y-1">
                      {item.idealFor.slice(0, 3).map((use) => (
                        <li key={use} className="text-sm text-gray-700 flex items-center gap-1">
                          <CheckCircle className="w-3 h-3 text-brand-red flex-shrink-0" />
                          {use}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Link
                    href={`/quote?service=Equipment+Rental&material=${encodeURIComponent(item.name)}`}
                    className="text-brand-red font-semibold text-sm hover:underline inline-flex items-center gap-1"
                  >
                    Get Rental Quote <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Rent From Us */}
      <section className="section-padding bg-gray-50">
        <div className="container-wide">
          <h2 className="font-heading text-3xl font-bold text-brand-charcoal mb-12 text-center">
            Why Rent From West Central?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {rentalBenefits.map((benefit) => {
              const IconComp = benefit.icon;
              return (
                <div key={benefit.title} className="bg-white p-6 rounded-lg border border-gray-200 text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-brand-red/10 rounded-lg mb-4">
                    <IconComp className="w-6 h-6 text-brand-red" />
                  </div>
                  <h3 className="font-heading text-lg font-bold text-brand-charcoal mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="section-padding">
        <div className="container-wide">
          <div className="bg-brand-charcoal rounded-xl p-8 md:p-12 text-white">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="font-heading text-3xl font-bold mb-4">Equipment Delivery Area</h2>
                <p className="text-gray-300 mb-6">
                  We deliver and pick up equipment across western Alberta. Our fleet
                  of lowboys and transport trailers can handle any piece of equipment.
                </p>
                <ul className="space-y-2 text-gray-200">
                  {['Hinton & surrounding area', 'Edson & Yellowhead County', 'Jasper & Jasper National Park', 'Grande Cache', 'Robb, Cadomin & Foothills', 'Custom delivery available'].map((area) => (
                    <li key={area} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-brand-red flex-shrink-0" />
                      {area}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative h-64 rounded-lg overflow-hidden">
                <Image
                  src="/images/operations/brule-hills-trucks.webp"
                  alt="West Central Contracting equipment transport"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-brand-red text-white">
        <div className="container-wide text-center">
          <h2 className="font-heading text-3xl font-bold mb-4">
            Ready to Rent?
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto text-red-100">
            Call us to check availability or use our online quote form. Same-day
            rental available on most equipment.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:7808653000" className="btn-primary bg-white text-brand-red hover:bg-gray-100">
              <Phone className="w-5 h-5 mr-2" />
              Call (780) 865-3000
            </a>
            <Link href="/quote?service=Equipment+Rental" className="btn-secondary border-white text-white hover:bg-red-700">
              Request Quote Online
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
