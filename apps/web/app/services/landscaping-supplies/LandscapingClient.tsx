'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ChevronRight,
  TreePine,
  CheckCircle,
  Phone,
  ArrowRight,
  Loader2,
  Calculator,
  Lightbulb,
  Truck,
  Leaf,
} from 'lucide-react';

const products = [
  {
    name: 'Topsoil',
    category: 'Soil Products',
    description: 'Rich, screened topsoil for gardens, lawns, and landscaping beds. Ideal for establishing new growth.',
    uses: ['Lawn establishment', 'Garden beds', 'Raised planters', 'Overseeding prep'],
    density: 1.1,
    image: '/images/materials/dirt.jpg',
  },
  {
    name: 'Landscaping Mulch',
    category: 'Mulch & Cover',
    description: 'Quality wood mulch for garden beds and landscaping. Suppresses weeds and retains moisture.',
    uses: ['Flower beds', 'Tree rings', 'Weed suppression', 'Pathway cover'],
    density: 0.4,
    image: '/images/materials/mulch.webp',
  },
  {
    name: 'Decorative Stone',
    category: 'Stone & Rock',
    description: 'Range of decorative stone options for premium landscape designs and accent features.',
    uses: ['Accent borders', 'Rock gardens', 'Dry creek beds', 'Decorative fill'],
    density: 1.35,
    image: '/images/operations/rock-pit.webp',
  },
  {
    name: 'Rainbow Rock',
    category: 'Stone & Rock',
    description: 'Colorful decorative rock sourced locally. A stunning focal point for any landscape.',
    uses: ['Premium landscaping', 'Feature accents', 'Color contrast', 'Xeriscaping'],
    density: 1.35,
    image: '/images/equipment/gravel-crusher-close-up.webp',
  },
  {
    name: 'Pea Gravel',
    category: 'Gravel Products',
    description: 'Smooth, rounded pea-sized stones. Comfortable underfoot and attractive in any setting.',
    uses: ['Walkways', 'Playground areas', 'Patio bases', 'Between pavers'],
    density: 1.4,
    image: '/images/operations/wash-pit.webp',
  },
  {
    name: 'Washed Rock',
    category: 'Stone & Rock',
    description: 'Clean, washed aggregates with excellent appearance for premium landscape applications.',
    uses: ['Decorative drainage', 'Aggregate finishing', 'Landscape borders', 'French drains'],
    density: 1.35,
    image: '/images/operations/brule-gravel-trucks-1.webp',
  },
  {
    name: 'Boulders & Feature Rocks',
    category: 'Stone & Rock',
    description: 'Natural boulders and large feature rocks for retaining walls, accents, and focal points.',
    uses: ['Retaining walls', 'Garden features', 'Erosion control', 'Stairways'],
    density: 1.5,
    image: '/images/operations/rock-pit.webp',
  },
  {
    name: 'Limestone',
    category: 'Stone & Rock',
    description: 'Versatile limestone for pathways, patios, and structural landscaping applications.',
    uses: ['Pathways', 'Patio construction', 'Retaining walls', 'Structural base'],
    density: 1.4,
    image: '/images/equipment/crusher.webp',
  },
];

const PROJECT_TEMPLATES = [
  {
    name: 'New Front Yard',
    icon: '🏠',
    description: 'Complete front yard renovation',
    defaults: { areas: ['lawn', 'beds', 'walkway', 'driveway-border'] },
  },
  {
    name: 'Backyard Patio',
    icon: '🪑',
    description: 'Patio with surrounding landscaping',
    defaults: { areas: ['patio-base', 'beds', 'border'] },
  },
  {
    name: 'Garden Beds',
    icon: '🌻',
    description: 'Flower or vegetable garden setup',
    defaults: { areas: ['beds', 'pathways'] },
  },
  {
    name: 'Playground Area',
    icon: '🛝',
    description: 'Safe play surface with borders',
    defaults: { areas: ['playground', 'border'] },
  },
];

interface PlannerArea {
  type: string;
  length: number;
  width: number;
  depth: number;
  material: string;
}

interface MaterialEstimate {
  material: string;
  cubicYards: number;
  tonnage: number;
}

interface PlanResult {
  areas: { label: string; material: string; cubicYards: number; tonnage: number }[];
  totals: MaterialEstimate[];
  tips: string[];
}

const AREA_TYPES: Record<string, { label: string; defaultMaterial: string; defaultDepth: number; tip: string }> = {
  lawn: { label: 'Lawn / Turf Area', defaultMaterial: 'Topsoil', defaultDepth: 4, tip: 'Apply 4" of topsoil for new lawn establishment' },
  beds: { label: 'Garden / Flower Beds', defaultMaterial: 'Landscaping Mulch', defaultDepth: 3, tip: 'Apply 3" of mulch for weed suppression' },
  walkway: { label: 'Walkway / Path', defaultMaterial: 'Pea Gravel', defaultDepth: 3, tip: 'Use landscape fabric underneath for best results' },
  'patio-base': { label: 'Patio Base', defaultMaterial: 'Washed Rock', defaultDepth: 6, tip: 'Compact base in 3" lifts for stability' },
  border: { label: 'Decorative Border', defaultMaterial: 'Rainbow Rock', defaultDepth: 3, tip: 'Use edging to keep decorative rock in place' },
  'driveway-border': { label: 'Driveway Border', defaultMaterial: 'Decorative Stone', defaultDepth: 3, tip: 'Consider a steel edge between gravel and lawn' },
  playground: { label: 'Playground Surface', defaultMaterial: 'Pea Gravel', defaultDepth: 9, tip: 'CSA recommends 9" minimum depth for fall protection' },
  pathways: { label: 'Garden Pathways', defaultMaterial: 'Pea Gravel', defaultDepth: 3, tip: 'Border with steel or plastic edging' },
};

function calculatePlan(areas: PlannerArea[]): PlanResult {
  const results = areas.map((area) => {
    const depthFeet = area.depth / 12; // inches to feet
    const cubicYards = (area.length * area.width * depthFeet) / 27;
    const product = products.find((p) => p.name === area.material);
    const density = product?.density || 1.3;
    const tonnage = cubicYards * density;
    const areaType = AREA_TYPES[area.type];

    return {
      label: areaType?.label || area.type,
      material: area.material,
      cubicYards: Math.round(cubicYards * 100) / 100,
      tonnage: Math.round(tonnage * 100) / 100,
    };
  });

  // Group by material for totals
  const materialTotals = new Map<string, MaterialEstimate>();
  for (const r of results) {
    const existing = materialTotals.get(r.material) || { material: r.material, cubicYards: 0, tonnage: 0 };
    existing.cubicYards = Math.round((existing.cubicYards + r.cubicYards) * 100) / 100;
    existing.tonnage = Math.round((existing.tonnage + r.tonnage) * 100) / 100;
    materialTotals.set(r.material, existing);
  }

  const tips = areas.map((a) => AREA_TYPES[a.type]?.tip).filter(Boolean) as string[];
  tips.push('Order 10% extra material to account for settling and irregular surfaces');
  tips.push('We offer delivery across the Hinton, Edson, and Jasper areas');

  return {
    areas: results,
    totals: Array.from(materialTotals.values()),
    tips: [...new Set(tips)],
  };
}

export default function LandscapingClient() {
  const [showPlanner, setShowPlanner] = useState(false);
  const [plannerAreas, setPlannerAreas] = useState<PlannerArea[]>([]);
  const [planResult, setPlanResult] = useState<PlanResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const addArea = (type: string) => {
    const config = AREA_TYPES[type];
    if (!config) return;
    setPlannerAreas((prev) => [
      ...prev,
      {
        type,
        length: 0,
        width: 0,
        depth: config.defaultDepth,
        material: config.defaultMaterial,
      },
    ]);
    setPlanResult(null);
  };

  const updateArea = (index: number, field: keyof PlannerArea, value: string | number) => {
    setPlannerAreas((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
    setPlanResult(null);
  };

  const removeArea = (index: number) => {
    setPlannerAreas((prev) => prev.filter((_, i) => i !== index));
    setPlanResult(null);
  };

  const applyTemplate = (template: typeof PROJECT_TEMPLATES[number]) => {
    const areas = template.defaults.areas.map((type) => {
      const config = AREA_TYPES[type];
      return {
        type,
        length: 0,
        width: 0,
        depth: config?.defaultDepth || 3,
        material: config?.defaultMaterial || 'Topsoil',
      };
    });
    setPlannerAreas(areas);
    setPlanResult(null);
    setShowPlanner(true);
  };

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    const validAreas = plannerAreas.filter((a) => a.length > 0 && a.width > 0);
    if (validAreas.length === 0) return;

    setIsCalculating(true);
    setTimeout(() => {
      setPlanResult(calculatePlan(validAreas));
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
            <span className="text-brand-charcoal font-semibold">Landscaping Supplies</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative section-padding bg-brand-charcoal text-white overflow-hidden min-h-[350px] flex items-center">
        <Image
          src="/images/materials/dirt.jpg"
          alt="Fresh topsoil for landscaping projects"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-charcoal/90 via-brand-charcoal/70 to-transparent" />
        <div className="relative container-wide">
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">Landscaping Supplies</h1>
          <p className="text-lg text-gray-200 max-w-2xl">
            Premium topsoil, mulch, decorative stone, boulders, and landscaping rock delivered
            to your project. Everything you need for residential and commercial landscapes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <button
              onClick={() => {
                setShowPlanner(true);
                document.getElementById('landscape-planner')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="btn-primary bg-white text-brand-red hover:bg-gray-100"
            >
              <Lightbulb className="w-5 h-5 mr-2" />
              Landscape Planner
            </button>
            <Link href="/calculator" className="btn-secondary border-white text-white hover:bg-white/10">
              <Calculator className="w-5 h-5 mr-2" />
              Material Calculator
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Start Templates */}
      <section className="section-padding bg-gray-50">
        <div className="container-wide">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-brand-red/10 text-brand-red px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <Lightbulb className="w-4 h-4" />
              Smart Landscape Planner
            </div>
            <h2 className="font-heading text-3xl font-bold text-brand-charcoal mb-3">
              Plan Your Landscape Project
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Choose a project template or build your own material list. We&apos;ll calculate exactly
              how much of each material you need and give you pro tips for a successful project.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {PROJECT_TEMPLATES.map((template) => (
              <button
                key={template.name}
                onClick={() => applyTemplate(template)}
                className="bg-white p-4 rounded-lg border-2 border-gray-200 hover:border-brand-red transition-colors text-left group"
              >
                <span className="text-3xl block mb-2">{template.icon}</span>
                <span className="font-heading font-bold text-brand-charcoal block group-hover:text-brand-red transition-colors">
                  {template.name}
                </span>
                <span className="text-xs text-gray-500">{template.description}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Landscape Planner Tool */}
      <section id="landscape-planner" className="section-padding">
        <div className="container-wide">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl border-2 border-gray-200 shadow-lg overflow-hidden">
              <div className="bg-brand-charcoal text-white px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <TreePine className="w-5 h-5" />
                  <span className="font-heading font-semibold">Landscape Material Planner</span>
                </div>
                <span className="text-sm text-gray-400">{plannerAreas.length} area{plannerAreas.length !== 1 ? 's' : ''}</span>
              </div>

              <form onSubmit={handleCalculate} className="p-6">
                {/* Add Area Buttons */}
                <div className="mb-6">
                  <label className="block font-heading font-semibold text-brand-charcoal mb-3">
                    Add project areas:
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(AREA_TYPES).map(([key, config]) => (
                      <button
                        key={key}
                        type="button"
                        onClick={() => addArea(key)}
                        className="text-sm px-3 py-1.5 bg-gray-100 hover:bg-brand-red hover:text-white rounded-full transition-colors border border-gray-200"
                      >
                        + {config.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Area List */}
                {plannerAreas.length === 0 ? (
                  <div className="text-center py-12 text-gray-400 border-2 border-dashed border-gray-200 rounded-lg">
                    <TreePine className="w-12 h-12 mx-auto mb-3 opacity-30" />
                    <p>Select a template above or add individual areas to start planning</p>
                  </div>
                ) : (
                  <div className="space-y-4 mb-6">
                    {plannerAreas.map((area, index) => {
                      const config = AREA_TYPES[area.type];
                      return (
                        <div
                          key={index}
                          className="bg-gray-50 rounded-lg p-4 border border-gray-200"
                        >
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="font-heading font-semibold text-brand-charcoal">
                              {config?.label || area.type}
                            </h4>
                            <button
                              type="button"
                              onClick={() => removeArea(index)}
                              className="text-gray-400 hover:text-red-500 text-sm"
                            >
                              Remove
                            </button>
                          </div>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            <div>
                              <label className="text-xs text-gray-500 block mb-1">Length (ft)</label>
                              <input
                                type="number"
                                step="0.5"
                                value={area.length || ''}
                                onChange={(e) => updateArea(index, 'length', parseFloat(e.target.value) || 0)}
                                placeholder="20"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-red"
                              />
                            </div>
                            <div>
                              <label className="text-xs text-gray-500 block mb-1">Width (ft)</label>
                              <input
                                type="number"
                                step="0.5"
                                value={area.width || ''}
                                onChange={(e) => updateArea(index, 'width', parseFloat(e.target.value) || 0)}
                                placeholder="10"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-red"
                              />
                            </div>
                            <div>
                              <label className="text-xs text-gray-500 block mb-1">Depth (inches)</label>
                              <input
                                type="number"
                                step="0.5"
                                value={area.depth || ''}
                                onChange={(e) => updateArea(index, 'depth', parseFloat(e.target.value) || 0)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-red"
                              />
                            </div>
                            <div>
                              <label className="text-xs text-gray-500 block mb-1">Material</label>
                              <select
                                value={area.material}
                                onChange={(e) => updateArea(index, 'material', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-red"
                              >
                                {products.map((p) => (
                                  <option key={p.name} value={p.name}>
                                    {p.name}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {plannerAreas.length > 0 && (
                  <button
                    type="submit"
                    disabled={isCalculating || plannerAreas.every((a) => a.length === 0 || a.width === 0)}
                    className="w-full btn-primary bg-brand-red text-white disabled:opacity-50"
                  >
                    {isCalculating ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Calculating your materials...
                      </>
                    ) : (
                      <>
                        <Calculator className="w-5 h-5 mr-2" />
                        Calculate Materials Needed
                      </>
                    )}
                  </button>
                )}
              </form>

              {/* Plan Results */}
              {planResult && (
                <div className="border-t-2 border-brand-red bg-gray-50 p-6">
                  <h3 className="font-heading text-xl font-bold text-brand-charcoal mb-4 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    Your Material Plan
                  </h3>

                  {/* Area Breakdown */}
                  <div className="bg-white rounded-lg border border-gray-200 overflow-hidden mb-4">
                    <table className="w-full text-sm">
                      <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                          <th className="text-left px-4 py-2 font-semibold text-gray-600">Area</th>
                          <th className="text-left px-4 py-2 font-semibold text-gray-600">Material</th>
                          <th className="text-right px-4 py-2 font-semibold text-gray-600">Cubic Yards</th>
                          <th className="text-right px-4 py-2 font-semibold text-gray-600">Tonnage</th>
                        </tr>
                      </thead>
                      <tbody>
                        {planResult.areas.map((area, i) => (
                          <tr key={i} className="border-b border-gray-100">
                            <td className="px-4 py-2 text-brand-charcoal">{area.label}</td>
                            <td className="px-4 py-2 text-gray-600">{area.material}</td>
                            <td className="px-4 py-2 text-right">{area.cubicYards}</td>
                            <td className="px-4 py-2 text-right font-semibold">{area.tonnage} tons</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Material Totals */}
                  <div className="bg-brand-red text-white rounded-lg p-4 mb-4">
                    <h4 className="font-heading font-semibold mb-3">Order Summary</h4>
                    <div className="space-y-2">
                      {planResult.totals.map((total) => (
                        <div key={total.material} className="flex justify-between items-center">
                          <span>{total.material}</span>
                          <span className="font-bold">
                            {total.tonnage} tons ({total.cubicYards} yd³)
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tips */}
                  <div className="bg-blue-50 rounded-lg p-4 border border-blue-200 mb-6">
                    <span className="text-sm font-semibold text-blue-800 uppercase tracking-wide">Pro Tips</span>
                    <ul className="mt-2 space-y-1">
                      {planResult.tips.map((tip) => (
                        <li key={tip} className="text-sm text-blue-900 flex items-start gap-2">
                          <span className="text-blue-500 mt-0.5">&#9679;</span>
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Link
                      href={`/quote?service=Landscaping+Supplies&material=${encodeURIComponent(planResult.totals.map((t) => `${t.material}: ${t.tonnage} tons`).join(', '))}`}
                      className="btn-primary flex-1 text-center"
                    >
                      Request Quote for All Materials
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                    <a href="tel:7808653000" className="btn-secondary flex-1 text-center">
                      <Phone className="w-4 h-4 mr-2" />
                      Call to Order
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="section-padding bg-gray-50">
        <div className="container-wide">
          <h2 className="font-heading text-3xl font-bold text-brand-charcoal mb-4">
            Our Material Selection
          </h2>
          <p className="text-gray-600 mb-12 max-w-2xl">
            All materials available for pickup at our yard or delivered to your project site
            across the Hinton, Edson, Jasper, and Grande Cache areas.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product.name}
                className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:border-brand-red transition-colors hover:shadow-lg group"
              >
                <div className="relative h-40 overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2 left-2 bg-white/90 text-xs font-semibold px-2 py-1 rounded text-brand-charcoal">
                    {product.category}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-heading text-lg font-bold text-brand-charcoal mb-1">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3">{product.description}</p>
                  <ul className="space-y-1 mb-4">
                    {product.uses.slice(0, 3).map((use) => (
                      <li key={use} className="text-xs text-gray-500 flex items-center gap-1">
                        <CheckCircle className="w-3 h-3 text-brand-red flex-shrink-0" />
                        {use}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={`/quote?material=${encodeURIComponent(product.name)}`}
                    className="text-brand-red font-semibold text-sm hover:underline inline-flex items-center gap-1"
                  >
                    Get Quote <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Delivery & Why Us */}
      <section className="section-padding">
        <div className="container-wide">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg border border-gray-200">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-brand-red/10 rounded-lg mb-4">
                <Truck className="w-6 h-6 text-brand-red" />
              </div>
              <h3 className="font-heading text-xl font-bold text-brand-charcoal mb-2">
                Fast Delivery
              </h3>
              <p className="text-gray-600 text-sm">
                Same-day and next-day delivery available for most materials. Our fleet of
                belly dumps and end dumps can handle orders of any size.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg border border-gray-200">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-brand-red/10 rounded-lg mb-4">
                <Leaf className="w-6 h-6 text-brand-red" />
              </div>
              <h3 className="font-heading text-xl font-bold text-brand-charcoal mb-2">
                Locally Sourced
              </h3>
              <p className="text-gray-600 text-sm">
                Our materials come from 7 local pit locations. Shorter haul distances mean
                fresher product and lower delivery costs for you.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg border border-gray-200">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-brand-red/10 rounded-lg mb-4">
                <Calculator className="w-6 h-6 text-brand-red" />
              </div>
              <h3 className="font-heading text-xl font-bold text-brand-charcoal mb-2">
                Right Quantities
              </h3>
              <p className="text-gray-600 text-sm">
                Use our landscape planner or material calculator to order the right amount.
                No guesswork — avoid over-ordering and wasted material.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-brand-red text-white">
        <div className="container-wide text-center">
          <h2 className="font-heading text-3xl font-bold mb-4">
            Ready to Transform Your Landscape?
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto text-red-100">
            From a bag of mulch to a full truckload of topsoil — we supply it all.
            Contact us for pricing or use our online tools to plan your project.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/calculator" className="btn-primary bg-white text-brand-red hover:bg-gray-100">
              Material Calculator
            </Link>
            <Link href="/quote?service=Landscaping+Supplies" className="btn-secondary border-white text-white hover:bg-red-700">
              Request Quote
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
