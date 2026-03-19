'use client';

import { Globe } from 'lucide-react';
import TrainingGuide, { Section, Tip, Warning, Step, KeyValue, StatusTable } from '@/components/dashboard/TrainingGuide';

const SECTIONS = [
  { id: 'overview', title: 'Website Overview' },
  { id: 'navigation', title: 'Navigation & Menu Structure' },
  { id: 'homepage', title: 'Homepage Sections' },
  { id: 'service-pages', title: 'Service Pages' },
  { id: 'service-areas', title: 'Service Area Pages' },
  { id: 'seo', title: 'SEO & Search Visibility' },
  { id: 'footer', title: 'Footer & Contact Info' },
];

export default function WebsiteTraining() {
  return (
    <TrainingGuide
      title="Public Website Overview"
      description="How the customer-facing website works — navigation, pages, and how customers find us online."
      icon={Globe}
      difficulty="beginner"
      estimatedMinutes={10}
      lastUpdated="2026-03-19"
      sections={SECTIONS}
      nextModule={{ title: 'Quote Form & Calculator', href: '/dashboard/training/quotes-calculator' }}
    >
      <Section id="overview" title="Website Overview">
        <p>
          The WCC public website is the primary way customers find us, learn about our services, request quotes,
          and order materials. It runs on <strong>Next.js 15</strong> and is hosted on <strong>GitHub Pages</strong> as
          a fully static site — meaning every page is pre-built for fast loading.
        </p>
        <p>The website serves several purposes:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Marketing</strong> — Showcases our 7 service lines and 45+ year history</li>
          <li><strong>Lead Generation</strong> — Quote forms, material calculator, and AI chat convert visitors into customers</li>
          <li><strong>Self-Service</strong> — Customers can estimate tonnage, track orders, and browse materials</li>
          <li><strong>Community</strong> — Business Hub directory and events calendar build local relationships</li>
          <li><strong>Recruiting</strong> — Careers page with job listings feeds into our hiring pipeline</li>
        </ul>
        <Tip>The website auto-deploys whenever changes are pushed to the main branch on GitHub. Changes typically go live within 2-3 minutes.</Tip>
      </Section>

      <Section id="navigation" title="Navigation & Menu Structure">
        <p>The main navigation bar is <strong>sticky</strong> (stays at the top when scrolling) and has two parts:</p>
        <p><strong>Top Bar (dark strip):</strong></p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Office phone: <strong>(780) 865-3000</strong></li>
          <li>Dispatch line: <strong>(780) 865-0068</strong></li>
          <li>Employee Login link (goes to <code className="bg-gray-100 px-1 rounded">/login</code>)</li>
        </ul>
        <p><strong>Main Navigation Links:</strong></p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Services</strong> — Dropdown with 7 services (Trucking, Aggregates, Crushing, Equipment, Landscaping, Concrete, Remediation)</li>
          <li><strong>Order Materials</strong> — Product catalog with pricing</li>
          <li><strong>Projects</strong> — Portfolio of completed work</li>
          <li><strong>Calculator</strong> — Tonnage estimator</li>
          <li><strong>Jasper Recovery</strong> — Dedicated page for Jasper wildfire recovery services</li>
          <li><strong>Business Hub</strong> — Local partner directory</li>
          <li><strong>Events</strong> — Community events calendar</li>
          <li><strong>About / Careers / Blog / Contact</strong></li>
          <li><strong>Get a Quote</strong> — Red call-to-action button</li>
        </ul>
        <p>On mobile, the menu collapses into a hamburger icon with a slide-out drawer.</p>
      </Section>

      <Section id="homepage" title="Homepage Sections">
        <p>The homepage is structured to guide visitors toward requesting a quote. Each section serves a purpose:</p>
        <Step number={1} title="Hero Banner">
          Large headline: &ldquo;Aggregates, Trucking &amp; Crushing You Can Count On&rdquo; with &ldquo;Serving Western Alberta since 1980&rdquo; tagline. Two buttons: <strong>Get a Free Quote</strong> and <strong>Material Calculator</strong>.
        </Step>
        <Step number={2} title="Stats Bar">
          Four key metrics displayed prominently: <strong>45+ Years</strong>, <strong>750K+ units sold 2024</strong>, <strong>7 pit locations</strong>, <strong>100% COR certified</strong>.
        </Step>
        <Step number={3} title="Service Cards">
          Six clickable cards showing our core services with brief descriptions. Each links to its full service detail page.
        </Step>
        <Step number={4} title="Testimonial">
          Customer testimonial from Canadian Natural Resources reinforcing trust.
        </Step>
        <Step number={5} title="Business Hub & AI Assistant Promos">
          Sections promoting the local partner directory and the AI voice/chat assistant.
        </Step>
        <Step number={6} title="Call to Action">
          Final conversion push with quote request and contact options.
        </Step>
      </Section>

      <Section id="service-pages" title="Service Pages">
        <p>We have <strong>7 dedicated service pages</strong>, each with SEO-optimized content:</p>
        <div className="border border-gray-200 rounded-lg overflow-hidden my-4">
          <table className="w-full text-sm">
            <thead><tr className="bg-gray-50 border-b border-gray-200">
              <th className="text-left px-4 py-2 text-xs font-semibold text-gray-500">Service</th>
              <th className="text-left px-4 py-2 text-xs font-semibold text-gray-500">URL Path</th>
            </tr></thead>
            <tbody>
              {[
                ['Trucking & Hauling', '/services/trucking-hauling'],
                ['Aggregate Sales', '/services/aggregate-sales'],
                ['Gravel Crushing', '/services/gravel-crushing'],
                ['Equipment Rental', '/services/equipment-rental'],
                ['Landscaping Supplies', '/services/landscaping-supplies'],
                ['Pre-Cast Concrete', '/services/concrete'],
                ['Environmental Remediation', '/services/remediation'],
              ].map(([name, path]) => (
                <tr key={path} className="border-b border-gray-100 last:border-0">
                  <td className="px-4 py-2 font-medium text-gray-800">{name}</td>
                  <td className="px-4 py-2 text-gray-500 font-mono text-xs">{path}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>Each page includes capabilities, equipment used, and a call-to-action to request a quote for that service.</p>
        <p>We also have <strong>SEO landing pages</strong> targeting specific search terms:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li><code className="bg-gray-100 px-1 rounded">/gravel-delivery-hinton</code> — &ldquo;gravel delivery Hinton&rdquo;</li>
          <li><code className="bg-gray-100 px-1 rounded">/road-crush-hinton</code> — &ldquo;road crush Hinton&rdquo;</li>
          <li><code className="bg-gray-100 px-1 rounded">/sand-gravel-edson</code> — &ldquo;sand and gravel Edson&rdquo;</li>
          <li><code className="bg-gray-100 px-1 rounded">/aggregate-supplier-edson</code> — &ldquo;aggregate supplier Edson&rdquo;</li>
          <li><code className="bg-gray-100 px-1 rounded">/landscaping-materials-hinton</code> — landscaping supply searches</li>
          <li><code className="bg-gray-100 px-1 rounded">/pipeline-services</code> — pipeline and oilfield work</li>
        </ul>
      </Section>

      <Section id="service-areas" title="Service Area Pages">
        <p>We have <strong>6 location-specific pages</strong> to capture &ldquo;near me&rdquo; searches:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Hinton</strong> — Home base, all services available</li>
          <li><strong>Edson</strong> — Full service, ~80 km east</li>
          <li><strong>Jasper</strong> — Parks Canada work, recovery services</li>
          <li><strong>Grande Cache</strong> — Northern coverage</li>
          <li><strong>Whitecourt</strong> — Eastern expansion area</li>
          <li><strong>Drayton Valley</strong> — Southern reach</li>
        </ul>
        <p>Each page lists the specific services available in that area with local context.</p>
      </Section>

      <Section id="seo" title="SEO & Search Visibility">
        <p>The website includes several features to rank well in Google:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>JSON-LD Schema</strong> — Structured data telling Google we&rsquo;re a LocalBusiness in Hinton, AB with specific services, hours, and contact info</li>
          <li><strong>Meta Tags</strong> — Every page has optimized title, description, and keywords</li>
          <li><strong>Open Graph</strong> — Social sharing cards with proper images when links are shared on Facebook/LinkedIn</li>
          <li><strong>Keyword-Targeted Pages</strong> — SEO landing pages target high-value search terms like &ldquo;gravel delivery Hinton&rdquo;</li>
          <li><strong>Fast Loading</strong> — Static export means instant page loads, which Google rewards</li>
        </ul>
        <Tip>When customers search &ldquo;gravel near me&rdquo; or &ldquo;trucking company Hinton&rdquo;, our service area pages and SEO landing pages help us appear in results.</Tip>
      </Section>

      <Section id="footer" title="Footer & Contact Info">
        <p>The footer appears on every public page and contains:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Company description and logo</li>
          <li>All 7 service links</li>
          <li>5 company/about links</li>
          <li>6 service area links</li>
          <li>4 tool links (Calculator, Quote, Hub, Opportunities)</li>
          <li>Business hours: <strong>Mon-Fri 7:00 AM - 5:00 PM</strong>, Sat by appointment</li>
          <li>Contact: <strong>(780) 865-3000</strong>, <strong>admin@wc-con.com</strong></li>
          <li>Address: <strong>450 East River Road, Hinton, AB T7V 2A3</strong></li>
          <li>Certifications: COR Certified, ISNetworld, ComplyWorks</li>
        </ul>
        <Warning>If any contact information changes (phone, address, hours), the footer must be updated in <code className="bg-amber-100 px-1 rounded">components/sections/Footer.tsx</code> AND the JSON-LD schema in <code className="bg-amber-100 px-1 rounded">app/layout.tsx</code>.</Warning>
      </Section>
    </TrainingGuide>
  );
}
