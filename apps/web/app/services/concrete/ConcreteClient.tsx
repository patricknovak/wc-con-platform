'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ChevronRight,
  CheckCircle,
  Phone,
  ArrowRight,
  Loader2,
  Calculator,
  Box,
  Shield,
  Truck,
  Ruler,
} from 'lucide-react';

const products = [
  {
    name: 'Full Lego Blocks',
    dimensions: '2.5 ft × 2.5 ft × 5 ft',
    weight: '~4,200 lbs (1.9 tonnes)',
    description: 'Interlocking concrete blocks for retaining walls, bin walls, barriers, and storage bays. Stack without mortar for fast assembly and reconfiguration.',
    uses: ['Retaining walls', 'Material storage bins', 'Blast barriers', 'Temporary walls', 'Security barriers'],
    stackHeight: 'Up to 12 ft (3 courses)',
    category: 'Lego Blocks',
  },
  {
    name: 'Half Lego Blocks',
    dimensions: '2.5 ft × 2.5 ft × 2.5 ft',
    weight: '~2,100 lbs (0.95 tonnes)',
    description: 'Half-size interlocking blocks for end caps, corners, and shorter wall configurations. Compatible with full blocks.',
    uses: ['Wall end caps', 'Corner pieces', 'Step-downs', 'Shorter barriers', 'Column accents'],
    stackHeight: 'Up to 10 ft',
    category: 'Lego Blocks',
  },
  {
    name: 'Flat-Top Blocks',
    dimensions: '2.5 ft × 2.5 ft × 5 ft',
    weight: '~4,200 lbs (1.9 tonnes)',
    description: 'Smooth top blocks for finished wall caps and clean-line applications. Used as the top course on lego block walls.',
    uses: ['Wall capping', 'Bench surfaces', 'Clean-line finishes', 'Seating walls', 'Top course'],
    stackHeight: 'Top course only',
    category: 'Lego Blocks',
  },
  {
    name: 'Jersey Barriers',
    dimensions: '10 ft or 12 ft length',
    weight: '~4,000-8,000 lbs',
    description: 'Standard highway-style jersey barriers for traffic control, site security, and perimeter protection.',
    uses: ['Traffic control', 'Construction zones', 'Parking lot dividers', 'Perimeter security', 'Event barriers'],
    stackHeight: 'Single or double stack',
    category: 'Barriers',
  },
  {
    name: 'Decorative Blocks',
    dimensions: 'Various sizes',
    weight: 'Varies by design',
    description: 'Textured and colored concrete blocks for aesthetic applications. Add visual appeal to retaining walls and landscape features.',
    uses: ['Decorative retaining walls', 'Garden borders', 'Landscape features', 'Entrance walls', 'Accent pieces'],
    stackHeight: 'Per design specification',
    category: 'Decorative',
  },
  {
    name: 'Ecology Blocks',
    dimensions: '2 ft × 2 ft × 6 ft',
    weight: '~3,600 lbs (1.6 tonnes)',
    description: 'Large interlocking blocks ideal for erosion control, retaining walls, and environmental applications.',
    uses: ['Erosion control', 'Stream bank stabilization', 'Heavy retaining walls', 'Industrial containment', 'Embankment support'],
    stackHeight: 'Engineered per application',
    category: 'Specialty',
  },
];

interface WallConfig {
  length: number;
  height: number;
  blockType: 'full' | 'half';
  needsCaps: boolean;
}

interface WallEstimate {
  fullBlocks: number;
  halfBlocks: number;
  flatTopBlocks: number;
  totalWeight: number;
  courses: number;
  blocksPerCourse: number;
  deliveryLoads: number;
  tips: string[];
}

function calculateWall(config: WallConfig): WallEstimate {
  const blockLength = config.blockType === 'full' ? 5 : 2.5; // feet
  const blockHeight = 2.5; // feet per course

  const courses = Math.ceil(config.height / blockHeight);
  const blocksPerCourse = Math.ceil(config.length / blockLength);

  // Total blocks for the wall body
  const bodyBlocks = courses * blocksPerCourse;

  // Half blocks for ends (2 per course if using full blocks and needs caps)
  const halfBlocksForEnds = config.needsCaps && config.blockType === 'full' ? courses * 2 : 0;

  // Flat top blocks for capping
  const flatTopCount = blocksPerCourse;

  // Weights
  const fullBlockWeight = config.blockType === 'full' ? 1.9 : 0.95; // tonnes
  const bodyWeight = bodyBlocks * fullBlockWeight;
  const halfWeight = halfBlocksForEnds * 0.95;
  const flatTopWeight = flatTopCount * 1.9;
  const totalWeight = bodyWeight + halfWeight + flatTopWeight;

  // Delivery estimate: ~20 tonnes per load
  const deliveryLoads = Math.ceil(totalWeight / 20);

  const tips: string[] = [];
  if (courses > 3) {
    tips.push('Walls over 3 courses (7.5 ft) may require engineered design — we can help coordinate');
  }
  if (config.length > 50) {
    tips.push('For walls over 50 ft, consider adding a corner or jog for structural stability');
  }
  tips.push('Level and compact the base before placing the first course');
  tips.push('Our delivery truck has a mounted crane for precise block placement');
  tips.push('Blocks can be repositioned and reused — ideal for temporary or evolving layouts');

  return {
    fullBlocks: config.blockType === 'full' ? bodyBlocks : 0,
    halfBlocks: config.blockType === 'half' ? bodyBlocks : halfBlocksForEnds,
    flatTopBlocks: flatTopCount,
    totalWeight: Math.round(totalWeight * 10) / 10,
    courses,
    blocksPerCourse,
    deliveryLoads,
    tips,
  };
}

const APPLICATION_GUIDES = [
  {
    title: 'Material Storage Bins',
    description: 'Create segregated storage bays for aggregate, sand, soil, and other bulk materials. Lego blocks make it easy to reconfigure bin sizes as needs change.',
    recommended: '3-sided bays, 2-3 courses high',
    image: '/images/operations/rock-pit.webp',
  },
  {
    title: 'Retaining Walls',
    description: 'Build retaining walls to hold back earth, create level building pads, or terrace slopes. No mortar needed — gravity and interlocking design provide stability.',
    recommended: 'Full blocks with flat-top cap course',
    image: '/images/operations/wash-pit.webp',
  },
  {
    title: 'Traffic & Security Barriers',
    description: 'Jersey barriers and block walls for construction zones, parking lots, event perimeters, and site security. Quick to deploy and relocate.',
    recommended: 'Jersey barriers or single-course blocks',
    image: '/images/operations/brule-hills-trucks.webp',
  },
  {
    title: 'Blast & Containment Walls',
    description: 'Industrial-grade barrier walls for oil & gas facilities, mining operations, and industrial sites requiring blast protection or containment.',
    recommended: 'Full blocks, 3+ courses, engineered design',
    image: '/images/equipment/dozer.webp',
  },
];

export default function ConcreteClient() {
  const [wallLength, setWallLength] = useState<string>('');
  const [wallHeight, setWallHeight] = useState<string>('');
  const [blockType, setBlockType] = useState<'full' | 'half'>('full');
  const [needsCaps, setNeedsCaps] = useState(true);
  const [estimate, setEstimate] = useState<WallEstimate | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    const length = parseFloat(wallLength);
    const height = parseFloat(wallHeight);
    if (!length || !height) return;

    setIsCalculating(true);
    setTimeout(() => {
      setEstimate(calculateWall({ length, height, blockType, needsCaps }));
      setIsCalculating(false);
    }, 600);
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
            <span className="text-brand-charcoal font-semibold">Pre-Cast Concrete Products</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative section-padding bg-brand-charcoal text-white overflow-hidden min-h-[350px] flex items-center">
        <Image
          src="/images/operations/wash-pit.webp"
          alt="West Central Contracting concrete operations"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-charcoal/90 via-brand-charcoal/70 to-transparent" />
        <div className="relative container-wide">
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">Pre-Cast Concrete Products</h1>
          <p className="text-lg text-gray-200 max-w-2xl">
            Interlocking lego blocks, jersey barriers, and decorative concrete for retaining walls,
            storage bins, security barriers, and more. No mortar required — stack, build, done.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <button
              onClick={() => document.getElementById('wall-calculator')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-primary bg-white text-brand-red hover:bg-gray-100"
            >
              <Calculator className="w-5 h-5 mr-2" />
              Wall Calculator
            </button>
            <Link href="/quote?service=Pre-Cast+Concrete" className="btn-secondary border-white text-white hover:bg-white/10">
              Request a Quote
            </Link>
          </div>
        </div>
      </section>

      {/* Product Catalog */}
      <section className="section-padding">
        <div className="container-wide">
          <h2 className="font-heading text-3xl font-bold text-brand-charcoal mb-12">
            Product Catalog
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {products.map((product) => (
              <div
                key={product.name}
                className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-brand-red transition-colors hover:shadow-lg"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <span className="text-xs font-semibold text-brand-red uppercase tracking-wide">
                      {product.category}
                    </span>
                    <h3 className="font-heading text-xl font-bold text-brand-charcoal">
                      {product.name}
                    </h3>
                  </div>
                  <Box className="w-8 h-8 text-gray-300 flex-shrink-0" />
                </div>

                <div className="grid grid-cols-2 gap-2 mb-3 text-sm">
                  <div className="bg-gray-50 rounded px-3 py-1.5">
                    <span className="text-gray-500 text-xs block">Dimensions</span>
                    <span className="font-semibold text-brand-charcoal">{product.dimensions}</span>
                  </div>
                  <div className="bg-gray-50 rounded px-3 py-1.5">
                    <span className="text-gray-500 text-xs block">Weight</span>
                    <span className="font-semibold text-brand-charcoal">{product.weight}</span>
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-3">{product.description}</p>

                <div className="mb-4">
                  <p className="text-xs font-semibold text-gray-500 mb-1">Common Applications:</p>
                  <div className="flex flex-wrap gap-1">
                    {product.uses.map((use) => (
                      <span
                        key={use}
                        className="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded"
                      >
                        {use}
                      </span>
                    ))}
                  </div>
                </div>

                <Link
                  href={`/quote?service=Pre-Cast+Concrete&material=${encodeURIComponent(product.name)}`}
                  className="text-brand-red font-semibold text-sm hover:underline inline-flex items-center gap-1"
                >
                  Request Quote <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Wall Calculator */}
      <section id="wall-calculator" className="section-padding bg-gray-50">
        <div className="container-wide">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 bg-brand-red/10 text-brand-red px-4 py-2 rounded-full text-sm font-semibold mb-4">
                <Ruler className="w-4 h-4" />
                Block Wall Calculator
              </div>
              <h2 className="font-heading text-3xl font-bold text-brand-charcoal mb-3">
                How Many Blocks Do You Need?
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Enter your wall dimensions and we&apos;ll calculate the number of blocks,
                total weight, and delivery requirements.
              </p>
            </div>

            <div className="bg-white rounded-xl border-2 border-gray-200 shadow-lg overflow-hidden">
              <div className="bg-brand-charcoal text-white px-6 py-4 flex items-center gap-3">
                <Box className="w-5 h-5" />
                <span className="font-heading font-semibold">Wall Configuration Calculator</span>
              </div>

              <form onSubmit={handleCalculate} className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block font-heading font-semibold text-brand-charcoal mb-2">
                      Wall Length (feet)
                    </label>
                    <input
                      type="number"
                      step="0.5"
                      value={wallLength}
                      onChange={(e) => {
                        setWallLength(e.target.value);
                        setEstimate(null);
                      }}
                      placeholder="e.g., 40"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-red"
                      required
                    />
                  </div>
                  <div>
                    <label className="block font-heading font-semibold text-brand-charcoal mb-2">
                      Wall Height (feet)
                    </label>
                    <input
                      type="number"
                      step="0.5"
                      value={wallHeight}
                      onChange={(e) => {
                        setWallHeight(e.target.value);
                        setEstimate(null);
                      }}
                      placeholder="e.g., 5"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-red"
                      required
                    />
                    <p className="text-xs text-gray-500 mt-1">Each course = 2.5 ft height</p>
                  </div>
                </div>

                <div>
                  <label className="block font-heading font-semibold text-brand-charcoal mb-2">
                    Block Type
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => { setBlockType('full'); setEstimate(null); }}
                      className={`p-4 rounded-lg border-2 text-left transition-colors ${
                        blockType === 'full'
                          ? 'border-brand-red bg-red-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <span className="font-semibold text-brand-charcoal block">Full Lego Block</span>
                      <span className="text-xs text-gray-500">2.5 × 2.5 × 5 ft (~4,200 lbs)</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => { setBlockType('half'); setEstimate(null); }}
                      className={`p-4 rounded-lg border-2 text-left transition-colors ${
                        blockType === 'half'
                          ? 'border-brand-red bg-red-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <span className="font-semibold text-brand-charcoal block">Half Lego Block</span>
                      <span className="text-xs text-gray-500">2.5 × 2.5 × 2.5 ft (~2,100 lbs)</span>
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="needsCaps"
                    checked={needsCaps}
                    onChange={(e) => { setNeedsCaps(e.target.checked); setEstimate(null); }}
                    className="w-4 h-4 text-brand-red rounded border-gray-300 focus:ring-brand-red"
                  />
                  <label htmlFor="needsCaps" className="text-brand-charcoal">
                    Include flat-top cap course for finished appearance
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isCalculating || !wallLength || !wallHeight}
                  className="w-full btn-primary bg-brand-red text-white disabled:opacity-50"
                >
                  {isCalculating ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Calculating blocks...
                    </>
                  ) : (
                    <>
                      <Calculator className="w-5 h-5 mr-2" />
                      Calculate Block Requirements
                    </>
                  )}
                </button>
              </form>

              {/* Estimate Result */}
              {estimate && (
                <div className="border-t-2 border-brand-red bg-gray-50 p-6">
                  <h3 className="font-heading text-xl font-bold text-brand-charcoal mb-4 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    Block Requirements
                  </h3>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div className="bg-white rounded-lg p-4 border border-gray-200 text-center">
                      <span className="text-2xl font-bold text-brand-charcoal block">{estimate.courses}</span>
                      <span className="text-xs text-gray-500">Courses High</span>
                    </div>
                    <div className="bg-white rounded-lg p-4 border border-gray-200 text-center">
                      <span className="text-2xl font-bold text-brand-charcoal block">{estimate.blocksPerCourse}</span>
                      <span className="text-xs text-gray-500">Blocks Per Course</span>
                    </div>
                    <div className="bg-white rounded-lg p-4 border border-gray-200 text-center">
                      <span className="text-2xl font-bold text-brand-charcoal block">{estimate.totalWeight}</span>
                      <span className="text-xs text-gray-500">Total Tonnes</span>
                    </div>
                    <div className="bg-white rounded-lg p-4 border border-gray-200 text-center">
                      <span className="text-2xl font-bold text-brand-charcoal block">{estimate.deliveryLoads}</span>
                      <span className="text-xs text-gray-500">Delivery Loads</span>
                    </div>
                  </div>

                  {/* Block Breakdown */}
                  <div className="bg-brand-red text-white rounded-lg p-4 mb-4">
                    <h4 className="font-heading font-semibold mb-3">Order Summary</h4>
                    <div className="space-y-2">
                      {estimate.fullBlocks > 0 && (
                        <div className="flex justify-between">
                          <span>Full Lego Blocks (2.5×2.5×5 ft)</span>
                          <span className="font-bold">{estimate.fullBlocks} blocks</span>
                        </div>
                      )}
                      {estimate.halfBlocks > 0 && (
                        <div className="flex justify-between">
                          <span>Half Lego Blocks (2.5×2.5×2.5 ft)</span>
                          <span className="font-bold">{estimate.halfBlocks} blocks</span>
                        </div>
                      )}
                      {needsCaps && (
                        <div className="flex justify-between">
                          <span>Flat-Top Cap Blocks</span>
                          <span className="font-bold">{estimate.flatTopBlocks} blocks</span>
                        </div>
                      )}
                      <div className="flex justify-between pt-2 border-t border-red-400">
                        <span>Estimated Total Weight</span>
                        <span className="font-bold text-lg">{estimate.totalWeight} tonnes</span>
                      </div>
                    </div>
                  </div>

                  {/* Tips */}
                  <div className="bg-blue-50 rounded-lg p-4 border border-blue-200 mb-6">
                    <span className="text-sm font-semibold text-blue-800 uppercase tracking-wide">Installation Tips</span>
                    <ul className="mt-2 space-y-1">
                      {estimate.tips.map((tip) => (
                        <li key={tip} className="text-sm text-blue-900 flex items-start gap-2">
                          <span className="text-blue-500 mt-0.5">&#9679;</span>
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Link
                      href={`/quote?service=Pre-Cast+Concrete&material=${encodeURIComponent(
                        `${estimate.fullBlocks > 0 ? `Full Lego Blocks: ${estimate.fullBlocks}` : `Half Lego Blocks: ${estimate.halfBlocks}`}${needsCaps ? `, Flat-Top Caps: ${estimate.flatTopBlocks}` : ''}`
                      )}`}
                      className="btn-primary flex-1 text-center"
                    >
                      Request Quote for This Wall
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                    <a href="tel:7808653000" className="btn-secondary flex-1 text-center">
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

      {/* Application Guides */}
      <section className="section-padding">
        <div className="container-wide">
          <h2 className="font-heading text-3xl font-bold text-brand-charcoal mb-4">
            Application Guides
          </h2>
          <p className="text-gray-600 mb-12 max-w-2xl">
            Our pre-cast concrete products serve a wide range of applications.
            Here are the most popular use cases and what we recommend.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {APPLICATION_GUIDES.map((guide) => (
              <div
                key={guide.title}
                className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow group"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={guide.image}
                    alt={guide.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <h3 className="absolute bottom-4 left-4 font-heading text-xl font-bold text-white">
                    {guide.title}
                  </h3>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 text-sm mb-3">{guide.description}</p>
                  <div className="bg-gray-50 rounded px-3 py-2 text-sm">
                    <span className="text-gray-500 text-xs block">Recommended Configuration</span>
                    <span className="font-semibold text-brand-charcoal">{guide.recommended}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Our Concrete */}
      <section className="section-padding bg-gray-50">
        <div className="container-wide">
          <h2 className="font-heading text-3xl font-bold text-brand-charcoal mb-12 text-center">
            Why Choose Our Concrete Products?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Box,
                title: 'No Mortar Needed',
                desc: 'Interlocking design means fast assembly with no wet work. Build walls in hours, not days.',
              },
              {
                icon: Shield,
                title: 'Engineered Strength',
                desc: 'High-strength concrete rated for structural applications. Tested and reliable.',
              },
              {
                icon: Truck,
                title: 'Crane Delivery',
                desc: 'Our delivery trucks have mounted cranes for precise block placement right where you need them.',
              },
              {
                icon: Ruler,
                title: 'Reconfigurable',
                desc: 'Need to change your layout? Blocks can be moved and restacked for evolving site needs.',
              },
            ].map((benefit) => {
              const IconComp = benefit.icon;
              return (
                <div key={benefit.title} className="bg-white p-6 rounded-lg border border-gray-200 text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-brand-red/10 rounded-lg mb-4">
                    <IconComp className="w-6 h-6 text-brand-red" />
                  </div>
                  <h3 className="font-heading text-lg font-bold text-brand-charcoal mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{benefit.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-brand-red text-white">
        <div className="container-wide text-center">
          <h2 className="font-heading text-3xl font-bold mb-4">
            Ready to Build?
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto text-red-100">
            From a single jersey barrier to hundreds of lego blocks — we supply
            and deliver pre-cast concrete products across western Alberta.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:7808653000" className="btn-primary bg-white text-brand-red hover:bg-gray-100">
              <Phone className="w-5 h-5 mr-2" />
              Call (780) 865-3000
            </a>
            <Link href="/quote?service=Pre-Cast+Concrete" className="btn-secondary border-white text-white hover:bg-red-700">
              Request Quote Online
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
