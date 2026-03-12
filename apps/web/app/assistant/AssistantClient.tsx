'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Bot,
  User,
  Send,
  ChevronRight,
  Phone,
  MessageCircle,
  Mic,
  MicOff,
  Volume2,
  FileText,
  Calculator,
  Truck,
  Mountain,
  Wrench,
  TreePine,
  Box,
  ArrowRight,
  Sparkles,
  Clock,
  Shield,
  CheckCircle,
} from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  WCC knowledge base                                                 */
/* ------------------------------------------------------------------ */

const WCC_KNOWLEDGE = {
  company: {
    name: 'West Central Contracting LTD',
    phone: '(780) 865-3000',
    dispatch: '(780) 865-0068',
    email: 'admin@wc-con.com',
    address: '450 East River Road, Hinton, AB T7V 2A3',
    hours: 'Monday–Friday 7:00 AM – 5:00 PM',
  },
  services: [
    {
      name: 'Trucking Services',
      slug: 'trucking-hauling',
      icon: Truck,
      keywords: ['trucking', 'hauling', 'delivery', 'transport', 'truck', 'haul', 'belly dump', 'lowboy', 'end dump', 'winch'],
      description: 'Heavy hauling with belly dumps, truck & pups, end dumps, lowboys, and winch tractors across western Alberta.',
      capabilities: ['Belly dumps', 'Truck & pups', 'End dumps', 'Lowboys', 'Winch tractors', 'Flatdecks'],
    },
    {
      name: 'Aggregate Sales',
      slug: 'aggregate-sales',
      icon: Mountain,
      keywords: ['aggregate', 'gravel', 'rock', 'sand', 'crush', 'road crush', 'pea gravel', 'drain rock', 'rainbow rock', 'washed rock', 'pit run'],
      description: 'Road crush, washed rock, pea gravel, drain rock, rainbow rock, and multiple sand varieties from 7 pit locations.',
      capabilities: ['Road Crush (20mm, 40mm, 80mm)', 'Washed Rock', 'Pea Gravel', 'Drain Rock', 'Rainbow Rock', 'Pit Run', 'Sand varieties', 'Rip Rap'],
    },
    {
      name: 'Gravel Crushing',
      slug: 'gravel-crushing',
      icon: Mountain,
      keywords: ['crushing', 'crusher', 'mobile crushing', 'custom aggregate'],
      description: 'Mobile crushing for custom aggregate sizes. Road base to decorative applications.',
      capabilities: ['Mobile crushing on-site', 'Custom aggregate sizes', 'Road base production', 'Decorative aggregate'],
    },
    {
      name: 'Equipment Rental',
      slug: 'equipment-rental',
      icon: Wrench,
      keywords: ['rental', 'rent', 'equipment', 'excavator', 'loader', 'skid steer', 'dozer', 'bobcat', 'backhoe'],
      description: 'Excavators, front-end loaders, skid steers, and dozers for your project needs.',
      capabilities: ['Excavators (mini to 50-ton)', 'Front-End Loaders', 'Skid Steers', 'Dozers', 'Graders', 'Compaction Equipment'],
    },
    {
      name: 'Landscaping Supplies',
      slug: 'landscaping-supplies',
      icon: TreePine,
      keywords: ['landscaping', 'topsoil', 'mulch', 'decorative', 'boulder', 'limestone', 'bark', 'garden', 'yard', 'lawn', 'soil'],
      description: 'Topsoil, decorative stone, mulch, boulders, limestone, and washed stone.',
      capabilities: ['Premium Topsoil', 'Cedar Mulch', 'Bark Mulch', 'Decorative Rock', 'Limestone', 'River Rock', 'Landscape Boulders', 'Flagstone'],
    },
    {
      name: 'Pre-Cast Concrete',
      slug: 'concrete',
      icon: Box,
      keywords: ['concrete', 'lego', 'block', 'barrier', 'jersey', 'precast', 'retaining wall', 'bin block'],
      description: 'Lego blocks, half blocks, flat-top variants, decorative options, and jersey barriers.',
      capabilities: ['Standard Lego Blocks (2.5\'x2.5\'x5\')', 'Half Blocks', 'Flat-Top Blocks', 'Decorative Blocks', 'Jersey Barriers'],
    },
  ],
  serviceArea: ['Hinton', 'Edson', 'Jasper', 'Grande Cache', 'Robb', 'Cadomin', 'Whitecourt'],
};

/* ------------------------------------------------------------------ */
/*  Quick replies & response engine (same logic as chat widget)        */
/* ------------------------------------------------------------------ */

interface QuickReply { label: string; message: string }
interface BotLink { label: string; href: string }

interface BotResponse {
  text: string;
  links?: BotLink[];
  quickReplies?: QuickReply[];
}

const INITIAL_QUICK_REPLIES: QuickReply[] = [
  { label: 'I have a project to discuss', message: "I have a project I'd like to discuss" },
  { label: 'Get a Quote', message: 'I need a quote for my project' },
  { label: 'What services do you offer?', message: 'What services do you offer?' },
  { label: 'Delivery areas', message: 'What areas do you deliver to?' },
  { label: 'Material calculator', message: 'Help me calculate how much material I need' },
  { label: 'Talk to someone', message: "I'd like to talk to a real person" },
];

const PROJECT_FOLLOW_UPS: QuickReply[] = [
  { label: 'Driveway / Parking Lot', message: "I'm working on a driveway or parking lot" },
  { label: 'Landscaping', message: "I need materials for a landscaping project" },
  { label: 'Retaining Wall', message: "I'm building a retaining wall" },
  { label: 'Road / Infrastructure', message: "It's a road or infrastructure project" },
  { label: 'Commercial / Industrial', message: "It's a commercial or industrial project" },
  { label: 'Something else', message: "It's something different — let me describe it" },
];

function generateResponse(input: string): BotResponse {
  const lower = input.toLowerCase().trim();

  if (/^(hi|hello|hey|good morning|good afternoon|howdy)\b/.test(lower)) {
    return {
      text: "Welcome to West Central Contracting! I'm here to help you plan your project, estimate materials, and put together a quote. Tell me about what you're working on, or pick an option below to get started.",
      quickReplies: INITIAL_QUICK_REPLIES,
    };
  }

  if (/project.*discuss|have a project|working on|planning|need help with a project/.test(lower)) {
    return {
      text: "Great — I'd love to help you plan your project! To give you the best recommendations, what type of project are you working on?",
      quickReplies: PROJECT_FOLLOW_UPS,
    };
  }

  if (/driveway|parking lot|parking pad/.test(lower)) {
    return {
      text: "**Driveway / Parking Lot Projects**\n\nHere's what we typically recommend:\n\n**Base Layer:** Road Crush (40mm or 80mm) — provides solid structural support\n**Top Layer:** Road Crush (20mm) or Washed Rock — smooth finished surface\n**Depth:** Usually 6–8\" total (4\" base + 2–4\" top)\n\nFor a standard 2-car driveway (~40' x 12'), you'd need approximately:\n- 8–10 tons of base material\n- 4–5 tons of top material\n\nWant me to help you calculate exact quantities? Use our **Material Calculator** with your specific dimensions!",
      links: [
        { label: 'Material Calculator', href: '/calculator' },
        { label: 'Request a Quote', href: '/quote?service=aggregate-sales' },
      ],
      quickReplies: [
        { label: 'Calculate my quantities', message: 'Help me calculate how much material I need' },
        { label: 'Get a quote', message: 'I need a quote for a driveway project' },
        { label: 'What about delivery?', message: 'How does delivery work?' },
      ],
    };
  }

  if (/landscap/.test(lower)) {
    return {
      text: "**Landscaping Projects**\n\nWe've got everything you need:\n\n**Soil & Mulch:** Premium Topsoil, Black Garden Soil, Cedar Mulch, Bark Mulch\n**Decorative Stone:** Rainbow Rock, River Rock, Limestone Screenings, Washed Stone\n**Hardscape:** Landscape Boulders, Flagstone, Decorative Lego Blocks\n\nWhat specific materials are you looking for? I can help estimate quantities based on your area.",
      links: [
        { label: 'Landscaping Supplies', href: '/services/landscaping-supplies' },
        { label: 'Material Calculator', href: '/calculator' },
      ],
      quickReplies: [
        { label: 'Topsoil/mulch', message: 'I need topsoil or mulch' },
        { label: 'Decorative stone', message: 'I need decorative rock or stone' },
        { label: 'Boulders', message: 'I need landscape boulders' },
        { label: 'Calculate amounts', message: 'Help me calculate how much material I need' },
      ],
    };
  }

  if (/retaining wall|wall.*block|lego.*wall/.test(lower)) {
    return {
      text: "**Retaining Wall Projects**\n\nOur Lego Blocks are perfect for retaining walls:\n\n**Standard Block:** 2.5' x 2.5' x 5' (~4,100 lbs)\n**Half Block:** 2.5' x 2.5' x 2.5'\n**Flat-Top Block:** For finished wall caps\n\nFor a typical retaining wall:\n- A 20' long x 5' high wall needs approximately 8 standard blocks\n- Each block interlocks without mortar for fast installation\n- Great for material bins, barriers, and foundations too\n\nWant me to help calculate how many blocks you need?",
      links: [
        { label: 'Concrete Products', href: '/services/concrete' },
        { label: 'Request a Quote', href: '/quote?service=concrete-products' },
      ],
      quickReplies: [
        { label: 'Calculate blocks needed', message: 'Help me calculate how many lego blocks I need for my wall' },
        { label: 'Get a quote', message: 'I need a quote for lego blocks' },
        { label: 'Delivery info', message: 'How do you deliver lego blocks?' },
      ],
    };
  }

  if (/road|infrastructure|municipal|county/.test(lower)) {
    return {
      text: "**Road & Infrastructure Projects**\n\nWe're western Alberta's go-to for road construction materials:\n\n**Road Base:** Road Crush in 20mm, 40mm, and 80mm\n**Surface Material:** Washed Rock, Pit Run\n**Crushing:** On-site mobile crushing for custom specs\n**Trucking:** Full fleet of belly dumps, end dumps, and truck & pups\n\nWe've served municipal, county, and provincial projects for over 45 years. What are the specifics of your project?",
      links: [
        { label: 'Aggregate Sales', href: '/services/aggregate-sales' },
        { label: 'Trucking Services', href: '/services/trucking-hauling' },
        { label: 'Request a Quote', href: '/quote' },
      ],
      quickReplies: [
        { label: 'Get a quote', message: 'I need a quote for road materials' },
        { label: 'Crushing services', message: 'Tell me about gravel crushing' },
        { label: 'Trucking fleet', message: 'What trucks do you have?' },
      ],
    };
  }

  if (/commercial|industrial|site prep|development/.test(lower)) {
    return {
      text: "**Commercial & Industrial Projects**\n\nWe handle large-scale projects with our full suite of services:\n\n- **Aggregate supply** from 7 pit locations\n- **Mobile crushing** for custom specs\n- **Full trucking fleet** for efficient delivery\n- **Equipment rental** for site work\n- **Concrete blocks** for barriers, bins, and walls\n\nFor large projects, we can provide volume pricing and dedicated scheduling. What's the scope of your project?",
      links: [
        { label: 'All Services', href: '/services' },
        { label: 'Request a Quote', href: '/quote' },
      ],
      quickReplies: [
        { label: 'Get a quote', message: 'I need a quote for a large project' },
        { label: 'Equipment rental', message: 'I need to rent equipment' },
        { label: 'Volume pricing', message: 'Do you offer volume discounts?' },
      ],
    };
  }

  if (/something different|describe|other|custom|unique/.test(lower)) {
    return {
      text: "No problem — we work on all kinds of projects! Go ahead and describe what you're working on, and I'll recommend the right materials and services. Include details like:\n\n- **What you're building** (foundation, walkway, fill, drainage, etc.)\n- **Approximate dimensions** if you know them\n- **Location** (so we can confirm delivery)\n\nDon't worry if you're not sure about the specifics — that's what we're here for!",
    };
  }

  if (/quote|price|pricing|cost|estimate|how much|rate/.test(lower)) {
    return {
      text: "Let's get you a quote! You have a few options:\n\n**1. Online Quote Form** — fill out your project details and we'll get back within 24 hours\n**2. Call us** — speak with our team at (780) 865-3000\n**3. Email** — send details to admin@wc-con.com\n\nWould you like help figuring out quantities first, or are you ready to submit a quote request?",
      links: [
        { label: 'Request a Quote', href: '/quote' },
        { label: 'Material Calculator', href: '/calculator' },
      ],
      quickReplies: [
        { label: 'Help me estimate first', message: 'Help me calculate how much material I need' },
        { label: 'Ready to quote', message: 'I already know what I need — take me to the quote form' },
      ],
    };
  }

  if (/volume discount|volume pricing|bulk|large order|large quantity/.test(lower)) {
    return {
      text: "We absolutely offer competitive pricing on large orders! For volume quotes, it's best to speak directly with our team so we can give you the best rate based on:\n\n- Material type and quantity\n- Delivery distance\n- Project timeline\n- Repeat order potential\n\nCall us at **(780) 865-3000** or submit a quote request and mention it's a volume order.",
      links: [
        { label: 'Request a Quote', href: '/quote' },
        { label: 'Contact Us', href: '/contact' },
      ],
    };
  }

  if (/delivery|deliver|how.*deliver|shipping|transport|pickup|pick up/.test(lower)) {
    return {
      text: "**Delivery Information**\n\nWe deliver throughout western Alberta from our Hinton base:\n\n**Service Area:** Hinton, Edson, Jasper, Grande Cache, Robb, Cadomin, Whitecourt, and surrounding areas\n\n**Our Fleet:** Belly dumps, end dumps, truck & pups, lowboys, and flatdecks — we have the right truck for any load\n\n**Pickup:** You're welcome to pick up materials at any of our 7 pit locations\n\nDelivery costs depend on distance and load size. We'll include delivery pricing in your quote!",
      links: [
        { label: 'Trucking Services', href: '/services/trucking-hauling' },
        { label: 'Request a Quote', href: '/quote' },
      ],
    };
  }

  if (/calculator|calculate|how much.*(need|material|gravel|rock|soil|topsoil)/.test(lower)) {
    return {
      text: "Our **Material Calculator** makes it easy to figure out quantities:\n\n1. Enter your area dimensions (length x width)\n2. Set the depth you need\n3. Get instant tonnage estimates\n\nIt works for aggregates, topsoil, mulch, and more. Once you have your quantities, you can go straight to a quote request!",
      links: [
        { label: 'Open Calculator', href: '/calculator' },
        { label: 'Request a Quote', href: '/quote' },
      ],
    };
  }

  if (/topsoil|soil|garden soil|mulch|cedar|bark/.test(lower)) {
    return {
      text: "**Topsoil & Mulch**\n\n**Premium Screened Topsoil** — Perfect for gardens, lawns, and raised beds\n**Black Garden Soil** — Rich, nutrient-dense blend for flower beds\n**Cedar Mulch** — Natural pest deterrent, long-lasting\n**Bark Mulch** — Affordable ground cover for large areas\n\nA typical lawn project needs about 4\" of topsoil. For a 1,000 sq ft area, that's roughly 12 cubic yards (~18 tons).\n\nWant an exact estimate?",
      links: [
        { label: 'Landscaping Supplies', href: '/services/landscaping-supplies' },
        { label: 'Material Calculator', href: '/calculator' },
      ],
    };
  }

  if (/decorative|rainbow|river rock|limestone|washed stone/.test(lower)) {
    return {
      text: "**Decorative Stone**\n\n**Rainbow Rock** — Colorful mix, great for garden beds and borders\n**River Rock** — Smooth, natural look for water features and paths\n**Limestone Screenings** — Compact surface for walkways and patios\n**Washed Stone** — Clean finish for drainage and decorative use\n\nMost decorative applications need 2–3\" depth. I can help you calculate the exact amount!",
      links: [
        { label: 'Landscaping Supplies', href: '/services/landscaping-supplies' },
        { label: 'Material Calculator', href: '/calculator' },
      ],
    };
  }

  if (/services|what do you (do|offer)|what can you help/.test(lower)) {
    const serviceList = WCC_KNOWLEDGE.services
      .map((s) => `- **${s.name}**: ${s.description}`)
      .join('\n');
    return {
      text: `We offer a complete range of services:\n\n${serviceList}\n\nWhich service interests you?`,
      links: [{ label: 'View All Services', href: '/services' }],
      quickReplies: WCC_KNOWLEDGE.services.map((s) => ({
        label: s.name.replace('Pre-Cast Concrete', 'Concrete'),
        message: `Tell me about ${s.name}`,
      })),
    };
  }

  // Individual service matching
  for (const service of WCC_KNOWLEDGE.services) {
    const matched = service.keywords.some((kw) => lower.includes(kw));
    if (matched) {
      return {
        text: `**${service.name}**\n\n${service.description}\n\n**What we offer:**\n${service.capabilities.map((c) => `- ${c}`).join('\n')}`,
        links: [
          { label: `Learn More`, href: `/services/${service.slug}` },
          { label: 'Request a Quote', href: `/quote?service=${service.slug}` },
        ],
        quickReplies: [
          { label: 'Get a quote', message: `I need a quote for ${service.name}` },
          { label: 'Other services', message: 'What other services do you offer?' },
        ],
      };
    }
  }

  if (/deliver.*area|area|where|service area|zone|town|city|region|jasper|edson|grande cache|hinton|whitecourt|robb|cadomin/.test(lower)) {
    return {
      text: `We serve the entire western Alberta corridor:\n\n${WCC_KNOWLEDGE.serviceArea.map((a) => `- ${a}`).join('\n')}\n- And surrounding communities\n\nDelivery included for most orders within our service area.`,
      links: [{ label: 'Contact Us', href: '/contact' }],
    };
  }

  if (/contact|phone|call|email|hours|open|address|reach/.test(lower)) {
    return {
      text: `**Contact Us:**\n\n**Office:** ${WCC_KNOWLEDGE.company.phone}\n**Dispatch:** ${WCC_KNOWLEDGE.company.dispatch}\n**Email:** ${WCC_KNOWLEDGE.company.email}\n**Address:** ${WCC_KNOWLEDGE.company.address}\n**Hours:** ${WCC_KNOWLEDGE.company.hours}`,
      links: [{ label: 'Contact Page', href: '/contact' }],
    };
  }

  if (/person|human|real person|someone|speak|talk to|representative/.test(lower)) {
    return {
      text: `Of course! Reach our team directly:\n\n**Call:** ${WCC_KNOWLEDGE.company.phone}\n**Dispatch:** ${WCC_KNOWLEDGE.company.dispatch}\n**Email:** ${WCC_KNOWLEDGE.company.email}\n\nOffice hours: ${WCC_KNOWLEDGE.company.hours}`,
      links: [{ label: 'Contact Page', href: '/contact' }],
    };
  }

  if (/thank|thanks|appreciate/.test(lower)) {
    return {
      text: "You're welcome! If you need anything else, I'm here to help. Good luck with your project!",
      links: [{ label: 'Request a Quote', href: '/quote' }],
    };
  }

  return {
    text: "I'd be happy to help! I can assist with:\n\n- **Project planning** — describe what you're building and I'll recommend materials\n- **Material estimates** — calculate quantities for your area\n- **Service information** — learn about our full range of services\n- **Getting a quote** — I'll help you get started\n\nTell me about your project, or pick an option below!",
    quickReplies: INITIAL_QUICK_REPLIES.slice(0, 4),
  };
}

/* ------------------------------------------------------------------ */
/*  Message type                                                       */
/* ------------------------------------------------------------------ */

interface Message {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  links?: BotLink[];
  quickReplies?: QuickReply[];
  timestamp: Date;
}

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */

export default function AssistantClient() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [activeTab, setActiveTab] = useState<'chat' | 'voice'>('chat');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: 'welcome',
          role: 'assistant',
          text: "Welcome to the West Central Contracting Project Assistant! I'm here to help you scope your project, estimate materials, and put together a quote.\n\nTell me about your project, or choose an option below to get started.",
          quickReplies: INITIAL_QUICK_REPLIES,
          timestamp: new Date(),
        },
      ]);
    }
  }, [messages.length]);

  useEffect(() => {
    if (activeTab === 'chat') {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [activeTab]);

  // Load ElevenLabs widget script when voice tab is active
  useEffect(() => {
    if (activeTab === 'voice') {
      const existing = document.querySelector('script[src*="elevenlabs/convai-widget-embed"]');
      if (!existing) {
        const script = document.createElement('script');
        script.src = 'https://unpkg.com/@elevenlabs/convai-widget-embed';
        script.async = true;
        script.type = 'text/javascript';
        document.body.appendChild(script);
      }
    }
  }, [activeTab]);

  const sendMessage = useCallback((text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      text: text.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const response = generateResponse(text);
      const botMsg: Message = {
        id: `bot-${Date.now()}`,
        role: 'assistant',
        text: response.text,
        links: response.links,
        quickReplies: response.quickReplies,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 600 + Math.random() * 800);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="container-wide section-padding py-4">
          <div className="flex items-center text-sm text-gray-600">
            <Link href="/" className="hover:text-brand-red">Home</Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            <span className="text-brand-charcoal font-semibold">AI Project Assistant</span>
          </div>
        </div>
      </div>

      {/* Hero */}
      <section className="section-padding bg-gradient-to-br from-brand-charcoal via-gray-800 to-brand-charcoal text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-brand-red rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent-blue rounded-full blur-3xl" />
        </div>
        <div className="relative container-wide">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-brand-red rounded-xl flex items-center justify-center">
                <Sparkles className="h-6 w-6" />
              </div>
              <span className="text-brand-red font-semibold text-sm uppercase tracking-wider">
                AI-Powered
              </span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">
              Project Assistant
            </h1>
            <p className="text-lg text-gray-300 max-w-2xl mb-6">
              Chat or speak with our AI assistant to discuss your project, get material
              recommendations, estimate quantities, and start your quote — all in one place.
            </p>
            <div className="flex flex-wrap gap-6 text-sm text-gray-400">
              <span className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-brand-red" />
                Available 24/7
              </span>
              <span className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-brand-red" />
                No sign-up required
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-brand-red" />
                Instant responses
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="section-padding">
        <div className="container-wide">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Chat / Voice panel */}
            <div className="lg:col-span-2">
              {/* Tab switcher */}
              <div className="flex border-b border-gray-200 mb-0">
                <button
                  onClick={() => setActiveTab('chat')}
                  className={`flex items-center gap-2 px-6 py-3 font-semibold text-sm border-b-2 transition-colors ${
                    activeTab === 'chat'
                      ? 'border-brand-red text-brand-red'
                      : 'border-transparent text-gray-500 hover:text-brand-charcoal'
                  }`}
                >
                  <MessageCircle className="h-4 w-4" />
                  Chat
                </button>
                <button
                  onClick={() => setActiveTab('voice')}
                  className={`flex items-center gap-2 px-6 py-3 font-semibold text-sm border-b-2 transition-colors ${
                    activeTab === 'voice'
                      ? 'border-brand-red text-brand-red'
                      : 'border-transparent text-gray-500 hover:text-brand-charcoal'
                  }`}
                >
                  <Phone className="h-4 w-4" />
                  Voice Call
                </button>
              </div>

              {/* Chat panel */}
              {activeTab === 'chat' && (
                <div className="border border-gray-200 border-t-0 rounded-b-xl overflow-hidden bg-white">
                  {/* Messages area */}
                  <div className="h-[500px] overflow-y-auto px-6 py-6 space-y-5 bg-gray-50">
                    {messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        {msg.role === 'assistant' && (
                          <div className="w-9 h-9 rounded-full bg-brand-red flex items-center justify-center flex-shrink-0 mt-1">
                            <Bot className="h-4 w-4 text-white" />
                          </div>
                        )}
                        <div className="max-w-[75%] space-y-2">
                          <div
                            className={`px-5 py-3.5 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                              msg.role === 'user'
                                ? 'bg-brand-red text-white rounded-br-md'
                                : 'bg-white text-brand-charcoal border border-gray-200 rounded-bl-md shadow-sm'
                            }`}
                            dangerouslySetInnerHTML={{
                              __html: msg.text
                                .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                                .replace(/\n/g, '<br />'),
                            }}
                          />
                          {msg.links && msg.links.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                              {msg.links.map((link) => (
                                <Link
                                  key={link.href}
                                  href={link.href}
                                  className="inline-flex items-center gap-1 px-3 py-1.5 bg-white border border-brand-red text-brand-red text-xs font-semibold rounded-full hover:bg-brand-red hover:text-white transition-colors"
                                >
                                  {link.label}
                                  <ChevronRight className="h-3 w-3" />
                                </Link>
                              ))}
                            </div>
                          )}
                          {msg.quickReplies && msg.quickReplies.length > 0 && (
                            <div className="flex flex-wrap gap-2 pt-1">
                              {msg.quickReplies.map((qr) => (
                                <button
                                  key={qr.label}
                                  onClick={() => sendMessage(qr.message)}
                                  className="px-3 py-1.5 bg-gray-100 text-brand-charcoal text-xs font-medium rounded-full hover:bg-brand-cream border border-gray-200 transition-colors"
                                >
                                  {qr.label}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                        {msg.role === 'user' && (
                          <div className="w-9 h-9 rounded-full bg-brand-charcoal flex items-center justify-center flex-shrink-0 mt-1">
                            <User className="h-4 w-4 text-white" />
                          </div>
                        )}
                      </div>
                    ))}

                    {isTyping && (
                      <div className="flex gap-3 justify-start">
                        <div className="w-9 h-9 rounded-full bg-brand-red flex items-center justify-center flex-shrink-0">
                          <Bot className="h-4 w-4 text-white" />
                        </div>
                        <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-md px-5 py-3.5 shadow-sm">
                          <div className="flex gap-1.5">
                            <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                            <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                            <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                          </div>
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Input */}
                  <form
                    onSubmit={handleSubmit}
                    className="px-6 py-4 bg-white border-t border-gray-200 flex gap-3"
                  >
                    <input
                      ref={inputRef}
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Describe your project or ask a question..."
                      className="flex-1 px-5 py-3 text-sm bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-transparent"
                    />
                    <button
                      type="submit"
                      disabled={!input.trim()}
                      className="w-12 h-12 rounded-full bg-brand-red text-white flex items-center justify-center hover:bg-brand-red-dark transition-colors disabled:opacity-40"
                      aria-label="Send message"
                    >
                      <Send className="h-5 w-5" />
                    </button>
                  </form>
                </div>
              )}

              {/* Voice panel */}
              {activeTab === 'voice' && (
                <div className="border border-gray-200 border-t-0 rounded-b-xl overflow-hidden bg-white">
                  <div className="h-[560px] flex flex-col items-center justify-center px-8 py-12 text-center bg-gradient-to-b from-gray-50 to-white">
                    {/* Animated voice visualization */}
                    <div className="relative mb-8">
                      <div className="w-32 h-32 rounded-full bg-brand-red/10 flex items-center justify-center">
                        <div className="w-24 h-24 rounded-full bg-brand-red/20 flex items-center justify-center animate-pulse">
                          <div className="w-16 h-16 rounded-full bg-brand-red flex items-center justify-center">
                            <Phone className="h-8 w-8 text-white" />
                          </div>
                        </div>
                      </div>
                    </div>

                    <h2 className="font-heading text-2xl font-bold text-brand-charcoal mb-3">
                      Voice Assistant
                    </h2>
                    <p className="text-gray-600 max-w-md mb-8 leading-relaxed">
                      Have a natural voice conversation with our AI assistant. Discuss your
                      project requirements, ask about materials and services, and get guidance
                      on your next steps — just like talking to a team member.
                    </p>

                    <div className="space-y-4 w-full max-w-sm">
                      {/* ElevenLabs widget placeholder -- replace agent-id with your real ID */}
                      <div className="bg-brand-cream rounded-xl p-6 border border-gray-200">
                        <div className="flex items-center gap-3 mb-4">
                          <Volume2 className="h-5 w-5 text-brand-red" />
                          <span className="font-semibold text-brand-charcoal text-sm">
                            ElevenLabs Voice Agent
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 mb-4">
                          Click the microphone button below to start a voice conversation.
                          The agent knows everything about our services, products, and service area.
                        </p>
                        {/*
                          Set NEXT_PUBLIC_ELEVENLABS_AGENT_ID in your .env file,
                          or replace the fallback below with your agent ID.
                          Create your agent at: https://elevenlabs.io/app/conversational-ai
                          See the setup guide in docs/elevenlabs-setup.md
                        */}
                        {process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID ? (
                          // @ts-expect-error -- elevenlabs-convai is a custom web component
                          <elevenlabs-convai
                            agent-id={process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID}
                            variant="expanded"
                          />
                        ) : (
                          <div className="text-center py-4">
                            <p className="text-sm text-gray-500 mb-3">
                              Voice agent not yet configured.
                            </p>
                            <a
                              href="tel:7808653000"
                              className="inline-flex items-center gap-2 px-4 py-2 bg-brand-red text-white text-sm font-semibold rounded-lg hover:bg-brand-red-dark transition-colors"
                            >
                              <Phone className="h-4 w-4" />
                              Call (780) 865-3000
                            </a>
                          </div>
                        )}
                      </div>

                      <div className="text-xs text-gray-400">
                        Voice conversations are powered by ElevenLabs AI.
                        <br />
                        You can also call us directly at{' '}
                        <a href="tel:7808653000" className="text-brand-red font-semibold hover:underline">
                          (780) 865-3000
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick actions */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="font-heading text-lg font-bold text-brand-charcoal mb-4">
                  Quick Actions
                </h3>
                <div className="space-y-3">
                  <Link
                    href="/quote"
                    className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:border-brand-red hover:bg-brand-cream transition-colors group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-brand-red/10 flex items-center justify-center group-hover:bg-brand-red/20 transition-colors">
                      <FileText className="h-5 w-5 text-brand-red" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-brand-charcoal">Request a Quote</p>
                      <p className="text-xs text-gray-500">Submit project details</p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-gray-400 ml-auto" />
                  </Link>

                  <Link
                    href="/calculator"
                    className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:border-brand-red hover:bg-brand-cream transition-colors group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-accent-blue/10 flex items-center justify-center group-hover:bg-accent-blue/20 transition-colors">
                      <Calculator className="h-5 w-5 text-accent-blue" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-brand-charcoal">Material Calculator</p>
                      <p className="text-xs text-gray-500">Estimate quantities</p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-gray-400 ml-auto" />
                  </Link>

                  <a
                    href="tel:7808653000"
                    className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:border-brand-red hover:bg-brand-cream transition-colors group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-accent-green/10 flex items-center justify-center group-hover:bg-accent-green/20 transition-colors">
                      <Phone className="h-5 w-5 text-accent-green" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-brand-charcoal">Call Us</p>
                      <p className="text-xs text-gray-500">(780) 865-3000</p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-gray-400 ml-auto" />
                  </a>
                </div>
              </div>

              {/* Services list */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="font-heading text-lg font-bold text-brand-charcoal mb-4">
                  Our Services
                </h3>
                <div className="space-y-2">
                  {WCC_KNOWLEDGE.services.map((service) => {
                    const Icon = service.icon;
                    return (
                      <Link
                        key={service.slug}
                        href={`/services/${service.slug}`}
                        className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-brand-cream transition-colors group"
                      >
                        <Icon className="h-4 w-4 text-brand-red" />
                        <span className="text-sm text-brand-charcoal group-hover:text-brand-red transition-colors">
                          {service.name}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* How it works */}
              <div className="bg-brand-cream rounded-xl p-6">
                <h3 className="font-heading text-lg font-bold text-brand-charcoal mb-4">
                  How It Works
                </h3>
                <ol className="space-y-4">
                  {[
                    { step: '1', title: 'Describe Your Project', desc: 'Tell the assistant what you are building or what materials you need.' },
                    { step: '2', title: 'Get Recommendations', desc: 'Receive material suggestions and quantity estimates.' },
                    { step: '3', title: 'Request a Quote', desc: 'Submit your details and our team follows up within 24 hours.' },
                  ].map((item) => (
                    <li key={item.step} className="flex gap-3">
                      <div className="w-7 h-7 rounded-full bg-brand-red text-white flex items-center justify-center text-xs font-bold flex-shrink-0">
                        {item.step}
                      </div>
                      <div>
                        <p className="font-semibold text-sm text-brand-charcoal">{item.title}</p>
                        <p className="text-xs text-gray-600 mt-0.5">{item.desc}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-brand-charcoal text-white">
        <div className="container-wide text-center">
          <h2 className="font-heading text-3xl font-bold mb-4">
            Prefer to Talk to a Person?
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-8">
            Our team is available Monday–Friday, 7 AM – 5 PM. We are happy to discuss
            your project over the phone or in person at our Hinton office.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:7808653000" className="btn-primary text-lg px-8 py-4">
              <Phone className="mr-2 h-5 w-5" />
              (780) 865-3000
            </a>
            <Link href="/contact" className="btn-secondary border-white text-white hover:bg-white hover:text-brand-charcoal text-lg px-8 py-4">
              Contact Page
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
