'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { MessageCircle, X, Send, Phone, Bot, User, ChevronRight, Mic } from 'lucide-react';
import Link from 'next/link';

/* ------------------------------------------------------------------ */
/*  WCC knowledge base – everything the bot needs to answer questions  */
/* ------------------------------------------------------------------ */

const WCC_KNOWLEDGE = {
  company: {
    name: 'West Central Contracting LTD',
    aliases: ['WCC', 'WC-CON', 'Westlake Crushing & Contracting'],
    founded: 1980,
    phone: '(780) 865-3000',
    dispatch: '(780) 865-0068',
    email: 'admin@wc-con.com',
    address: '450 East River Road, Hinton, AB T7V 2A3',
    hours: 'Monday–Friday 7:00 AM – 5:00 PM',
    description:
      'Family-owned and operated for over 45 years, serving Hinton, Edson, Jasper, Grande Cache, Robb, Cadomin, and surrounding areas in western Alberta.',
    awards: ['Business of the Year 2013', 'Business of the Year 2017'],
    certifications: ['COR Safety Certified'],
    stats: {
      yearsInBusiness: '45+',
      unitsSold2024: '750,000+',
      gravelPits: 7,
    },
  },
  services: [
    {
      name: 'Trucking Services',
      slug: 'trucking-hauling',
      keywords: ['trucking', 'hauling', 'delivery', 'transport', 'truck', 'haul', 'belly dump', 'lowboy', 'end dump', 'winch'],
      description:
        'Heavy hauling with belly dumps, truck & pups, end dumps, lowboys, and winch tractors. We deliver aggregates, materials, and equipment across western Alberta.',
      details: 'Our fleet handles everything from small residential deliveries to large-scale commercial projects.',
    },
    {
      name: 'Aggregate Sales',
      slug: 'aggregate-sales',
      keywords: ['aggregate', 'gravel', 'rock', 'sand', 'crush', 'road crush', 'pea gravel', 'drain rock', 'rainbow rock', 'washed rock', 'pit run'],
      description:
        'Road crush, washed rock, pea gravel, drain rock, rainbow rock, and multiple sand varieties from 7 pit locations.',
      details:
        'Products include: Road Crush (20mm, 40mm, 80mm), Washed Rock (various sizes), Pea Gravel, Drain Rock, Rainbow Rock, Pit Run, Screened Sand, Fill Sand, Concrete Sand, Rip Rap.',
    },
    {
      name: 'Gravel Crushing',
      slug: 'gravel-crushing',
      keywords: ['crushing', 'crusher', 'mobile crushing', 'custom aggregate', 'custom size'],
      description:
        'State-of-the-art mobile crushing for custom aggregate sizes. Road base to decorative applications.',
      details: 'We bring our crushing equipment to your site or process materials at our pit locations.',
    },
    {
      name: 'Equipment Rental',
      slug: 'equipment-rental',
      keywords: ['rental', 'rent', 'equipment', 'excavator', 'loader', 'skid steer', 'dozer', 'bobcat', 'backhoe', 'machine'],
      description:
        'Excavators, front-end loaders, skid steers, and dozers available for your project needs.',
      details:
        'Equipment available: Excavators (mini to 50-ton), Front-End Loaders, Skid Steers/Compact Track Loaders, Dozers, Graders, Compaction Equipment. Daily, weekly, and monthly rates available. Delivery and pickup included in service area.',
    },
    {
      name: 'Landscaping Supplies',
      slug: 'landscaping-supplies',
      keywords: ['landscaping', 'topsoil', 'mulch', 'decorative', 'boulder', 'limestone', 'bark', 'garden', 'yard', 'lawn', 'soil'],
      description:
        'Topsoil, decorative stone, mulch, boulders, limestone, and washed stone for residential and commercial projects.',
      details:
        'Products include: Premium Screened Topsoil, Black Garden Soil, Cedar Mulch, Bark Mulch, Decorative Rock (multiple colors), Limestone Screenings, River Rock, Landscape Boulders, Flagstone, Washed Stone.',
    },
    {
      name: 'Pre-Cast Concrete / Lego Blocks',
      slug: 'concrete',
      keywords: ['concrete', 'lego', 'block', 'barrier', 'jersey barrier', 'precast', 'pre-cast', 'retaining wall', 'bin block'],
      description:
        'Lego blocks, half blocks, flat-top variants, decorative options, and jersey barriers for any application.',
      details:
        'Standard Lego Block: 2.5\' x 2.5\' x 5\', ~4,100 lbs. Available in full blocks, half blocks, flat-top, and decorative finishes. Jersey barriers for traffic control and site safety. Used for retaining walls, material bins, barriers, foundations, and more.',
    },
  ],
  serviceArea: [
    'Hinton',
    'Edson',
    'Jasper',
    'Grande Cache',
    'Robb',
    'Cadomin',
    'Whitecourt',
    'and surrounding western Alberta communities',
  ],
  quoteProcess:
    'You can request a quote online at our website, call us at (780) 865-3000, or email admin@wc-con.com. We typically respond within 24 hours.',
  calculator:
    'We have a free online material calculator that helps you estimate how much aggregate you need based on your project dimensions.',
};

/* ------------------------------------------------------------------ */
/*  Quick-reply buttons                                                */
/* ------------------------------------------------------------------ */

interface QuickReply {
  label: string;
  message: string;
}

const INITIAL_QUICK_REPLIES: QuickReply[] = [
  { label: 'Get a Quote', message: 'I need a quote for my project' },
  { label: 'Our Services', message: 'What services do you offer?' },
  { label: 'Delivery Areas', message: 'What areas do you deliver to?' },
  { label: 'Contact Info', message: 'How can I contact you?' },
  { label: 'Material Calculator', message: 'Help me calculate how much material I need' },
  { label: 'Talk to Someone', message: "I'd like to talk to a person" },
];

/* ------------------------------------------------------------------ */
/*  Response engine                                                    */
/* ------------------------------------------------------------------ */

interface BotResponse {
  text: string;
  links?: { label: string; href: string }[];
  quickReplies?: QuickReply[];
}

function generateResponse(input: string): BotResponse {
  const lower = input.toLowerCase().trim();

  // Greeting
  if (/^(hi|hello|hey|good morning|good afternoon|howdy|yo)\b/.test(lower)) {
    return {
      text: `Hey there! I'm the West Central Contracting assistant. I can help you learn about our services, get a quote, or figure out how much material you need for your project. What can I help you with?`,
      quickReplies: INITIAL_QUICK_REPLIES,
    };
  }

  // Quote / pricing
  if (/quote|price|pricing|cost|estimate|how much|rate/.test(lower)) {
    return {
      text: `Great — I can help you get started on a quote!\n\nYou can:\n- Use our **online quote form** to submit your project details\n- Call us at **${WCC_KNOWLEDGE.company.phone}**\n- Email **${WCC_KNOWLEDGE.company.email}**\n\nOur team typically responds within 24 hours. Would you like me to help you figure out what materials and quantities you need first?`,
      links: [
        { label: 'Request a Quote', href: '/quote' },
        { label: 'Material Calculator', href: '/calculator' },
      ],
      quickReplies: [
        { label: 'Help me estimate', message: 'Help me calculate how much material I need' },
        { label: 'I know what I need', message: 'I already know what materials and quantities I need' },
      ],
    };
  }

  // Calculator / estimate / how much do I need
  if (/calculator|calculate|estimate|how much.*(need|material|gravel|rock|soil|topsoil)|figure out.*quantity/.test(lower)) {
    return {
      text: `Our **Material Calculator** can help you figure out exactly how much aggregate, topsoil, or other material you need based on your project dimensions.\n\nJust enter the length, width, and depth of your area and it will calculate the tonnage needed. It works for driveways, parking lots, landscaping, and more!`,
      links: [{ label: 'Open Material Calculator', href: '/calculator' }],
      quickReplies: [
        { label: 'Aggregate products', message: 'What types of aggregate do you sell?' },
        { label: 'Landscaping materials', message: 'Tell me about landscaping supplies' },
      ],
    };
  }

  // Services overview
  if (/services|what do you (do|offer)|what can you help|capabilities/.test(lower)) {
    const serviceList = WCC_KNOWLEDGE.services
      .map((s) => `- **${s.name}**: ${s.description}`)
      .join('\n');
    return {
      text: `We offer a full range of services for construction and landscaping:\n\n${serviceList}\n\nWould you like to learn more about any of these?`,
      links: [{ label: 'View All Services', href: '/services' }],
      quickReplies: WCC_KNOWLEDGE.services.map((s) => ({
        label: s.name.replace('Pre-Cast Concrete / Lego Blocks', 'Concrete/Lego'),
        message: `Tell me about ${s.name}`,
      })),
    };
  }

  // Individual service matching
  for (const service of WCC_KNOWLEDGE.services) {
    const matched = service.keywords.some((kw) => lower.includes(kw));
    if (matched) {
      return {
        text: `**${service.name}**\n\n${service.description}\n\n${service.details}`,
        links: [
          { label: `Learn More: ${service.name}`, href: `/services/${service.slug}` },
          { label: 'Request a Quote', href: `/quote?service=${service.slug}` },
        ],
        quickReplies: [
          { label: 'Get a Quote', message: `I need a quote for ${service.name}` },
          { label: 'Other Services', message: 'What other services do you offer?' },
          { label: 'Delivery Areas', message: 'What areas do you deliver to?' },
        ],
      };
    }
  }

  // Delivery / service area
  if (/deliver|area|location|where|service area|zone|town|city|region|jasper|edson|grande cache|hinton|whitecourt|robb|cadomin/.test(lower)) {
    return {
      text: `We serve the entire western Alberta corridor from our base in Hinton:\n\n${WCC_KNOWLEDGE.serviceArea.map((a) => `- ${a}`).join('\n')}\n\nDelivery is included for most orders within our service area. For locations outside this area, please contact us for a custom delivery quote.`,
      links: [{ label: 'Contact Us', href: '/contact' }],
      quickReplies: [
        { label: 'Get a Quote', message: 'I need a quote for my project' },
        { label: 'Our Services', message: 'What services do you offer?' },
      ],
    };
  }

  // Contact / phone / hours
  if (/contact|phone|call|email|hours|open|address|reach|find you|visit/.test(lower)) {
    return {
      text: `Here's how to reach us:\n\n**Office:** ${WCC_KNOWLEDGE.company.phone}\n**Dispatch:** ${WCC_KNOWLEDGE.company.dispatch}\n**Email:** ${WCC_KNOWLEDGE.company.email}\n**Address:** ${WCC_KNOWLEDGE.company.address}\n**Hours:** ${WCC_KNOWLEDGE.company.hours}\n\nYou can also use the voice agent on our site to speak with an AI assistant anytime!`,
      links: [
        { label: 'Contact Page', href: '/contact' },
        { label: 'AI Assistant', href: '/assistant' },
      ],
    };
  }

  // Talk to a person / human
  if (/person|human|real person|someone|speak|talk to|representative|agent|staff|employee/.test(lower)) {
    return {
      text: `Absolutely! Here are your options:\n\n**Call us now:** ${WCC_KNOWLEDGE.company.phone}\n**Dispatch line:** ${WCC_KNOWLEDGE.company.dispatch}\n**Email:** ${WCC_KNOWLEDGE.company.email}\n\nOur office is open **${WCC_KNOWLEDGE.company.hours}**.\n\nYou can also try our **Voice Assistant** — it lets you have a natural voice conversation about your project, available 24/7!`,
      links: [
        { label: 'Voice Assistant', href: '/assistant' },
        { label: 'Contact Page', href: '/contact' },
      ],
    };
  }

  // About / company / history
  if (/about|history|company|who are|family|owned|award|certif/.test(lower)) {
    return {
      text: `**${WCC_KNOWLEDGE.company.name}** has been family-owned and operated since ${WCC_KNOWLEDGE.company.founded}.\n\n${WCC_KNOWLEDGE.company.description}\n\n**By the numbers:**\n- ${WCC_KNOWLEDGE.company.stats.yearsInBusiness} years in business\n- ${WCC_KNOWLEDGE.company.stats.unitsSold2024} units sold in 2024\n- ${WCC_KNOWLEDGE.company.stats.gravelPits} gravel pit locations\n\n**Awards:** ${WCC_KNOWLEDGE.company.awards.join(', ')}\n**Certifications:** ${WCC_KNOWLEDGE.company.certifications.join(', ')}`,
      links: [{ label: 'About Us', href: '/about' }],
    };
  }

  // Project / I need help with
  if (/project|driveway|parking lot|road|foundation|retaining wall|landscap|build|construct|renovation|residential|commercial/.test(lower)) {
    return {
      text: `Sounds like you've got a project in mind! I'd love to help.\n\nTo give you the best recommendation, could you tell me:\n\n1. **What type of project?** (driveway, landscaping, retaining wall, road work, etc.)\n2. **Approximate size?** (length x width, or area)\n3. **Location?** (which town/area)\n\nOr you can use our **Material Calculator** to get an instant estimate, or try our **Voice Assistant** to talk through your project!`,
      links: [
        { label: 'Material Calculator', href: '/calculator' },
        { label: 'Request a Quote', href: '/quote' },
        { label: 'Voice Assistant', href: '/assistant' },
      ],
    };
  }

  // Voice / call agent
  if (/voice|speak|call.*agent|ai.*call|phone.*agent|eleven/.test(lower)) {
    return {
      text: `Our **AI Voice Assistant** lets you have a natural phone-style conversation about your project — available 24/7!\n\nYou can discuss your requirements, ask about materials, and get guidance on quantities and services. It's like talking to a knowledgeable team member anytime you need.`,
      links: [{ label: 'Try Voice Assistant', href: '/assistant' }],
    };
  }

  // Thank you
  if (/thank|thanks|appreciate/.test(lower)) {
    return {
      text: `You're welcome! Don't hesitate to reach out if you need anything else. You can always call us at **${WCC_KNOWLEDGE.company.phone}** or visit our quote page. Have a great day!`,
      links: [{ label: 'Request a Quote', href: '/quote' }],
    };
  }

  // Fallback
  return {
    text: `I'd be happy to help with that! While I might not have a specific answer for that question, here's what I can assist with:\n\n- Information about our **services** (aggregates, trucking, equipment rental, landscaping, concrete)\n- Help **estimating materials** for your project\n- Getting you started on a **quote**\n- **Contact information** and service areas\n\nOr you can speak with our team directly at **${WCC_KNOWLEDGE.company.phone}**.`,
    links: [
      { label: 'Our Services', href: '/services' },
      { label: 'Request a Quote', href: '/quote' },
      { label: 'Contact Us', href: '/contact' },
    ],
    quickReplies: INITIAL_QUICK_REPLIES.slice(0, 4),
  };
}

/* ------------------------------------------------------------------ */
/*  Message types                                                      */
/* ------------------------------------------------------------------ */

interface Message {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  links?: { label: string; href: string }[];
  quickReplies?: QuickReply[];
  timestamp: Date;
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([
        {
          id: 'welcome',
          role: 'assistant',
          text: "Hi there! I'm the West Central Contracting assistant. I can help you learn about our services, estimate materials for your project, or get started on a quote. What can I help you with today?",
          quickReplies: INITIAL_QUICK_REPLIES,
          timestamp: new Date(),
        },
      ]);
    }
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open, messages.length]);

  const sendMessage = useCallback(
    (text: string) => {
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

      // Simulate a brief thinking delay
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
    },
    []
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <>
      {/* Floating button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-50 bg-brand-red text-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg hover:bg-brand-red-dark transition-all duration-300 hover:scale-110 group"
          aria-label="Open chat assistant"
        >
          <MessageCircle className="h-7 w-7" />
          {/* Pulse indicator */}
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-accent-green rounded-full border-2 border-white animate-pulse" />
        </button>
      )}

      {/* Chat window */}
      {open && (
        <div className="fixed bottom-6 right-6 z-50 w-[400px] max-w-[calc(100vw-2rem)] h-[600px] max-h-[calc(100vh-6rem)] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-brand-charcoal text-white px-5 py-4 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-brand-red rounded-full flex items-center justify-center">
                <Bot className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-sm">WCC Assistant</h3>
                <p className="text-xs text-gray-400 flex items-center gap-1">
                  <span className="w-2 h-2 bg-accent-green rounded-full inline-block" />
                  Online — Ask me anything
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Link
                href="/assistant"
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                title="Open full assistant with voice"
              >
                <Mic className="h-4 w-4" />
              </Link>
              <button
                onClick={() => setOpen(false)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                aria-label="Close chat"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 bg-gray-50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.role === 'assistant' && (
                  <div className="w-7 h-7 rounded-full bg-brand-red flex items-center justify-center flex-shrink-0 mt-1">
                    <Bot className="h-3.5 w-3.5 text-white" />
                  </div>
                )}
                <div className={`max-w-[80%] space-y-2`}>
                  <div
                    className={`px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
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

                  {/* Links */}
                  {msg.links && msg.links.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
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

                  {/* Quick replies */}
                  {msg.quickReplies && msg.quickReplies.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
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
                  <div className="w-7 h-7 rounded-full bg-brand-charcoal flex items-center justify-center flex-shrink-0 mt-1">
                    <User className="h-3.5 w-3.5 text-white" />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-2 justify-start">
                <div className="w-7 h-7 rounded-full bg-brand-red flex items-center justify-center flex-shrink-0">
                  <Bot className="h-3.5 w-3.5 text-white" />
                </div>
                <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-md px-4 py-3 shadow-sm">
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

          {/* Voice CTA */}
          <div className="px-4 py-2 bg-brand-cream border-t border-gray-200 flex-shrink-0">
            <Link
              href="/assistant"
              className="flex items-center gap-2 text-xs text-brand-gray-mid hover:text-brand-red transition-colors"
            >
              <Phone className="h-3.5 w-3.5" />
              <span>
                Prefer to talk? Try our <strong className="text-brand-red">Voice Assistant</strong>
              </span>
              <ChevronRight className="h-3 w-3 ml-auto" />
            </Link>
          </div>

          {/* Input */}
          <form
            onSubmit={handleSubmit}
            className="px-4 py-3 bg-white border-t border-gray-200 flex gap-2 flex-shrink-0"
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-transparent"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="w-10 h-10 rounded-full bg-brand-red text-white flex items-center justify-center hover:bg-brand-red-dark transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              aria-label="Send message"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
