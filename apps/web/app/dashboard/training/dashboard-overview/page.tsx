'use client';

import { Monitor } from 'lucide-react';
import TrainingGuide, { Section, Tip, Warning, Step } from '@/components/dashboard/TrainingGuide';

const SECTIONS = [
  { id: 'login', title: 'Logging In' },
  { id: 'layout', title: 'Dashboard Layout' },
  { id: 'sidebar', title: 'Sidebar Navigation' },
  { id: 'inbox', title: 'Inbox & Priority Actions' },
  { id: 'activity', title: 'Activity Feed' },
  { id: 'stats', title: 'Quick Stats Cards' },
];

export default function DashboardOverviewTraining() {
  return (
    <TrainingGuide
      title="Dashboard Inbox & Navigation"
      description="How to log in, navigate the employee portal, understand the inbox, and use the sidebar."
      icon={Monitor}
      difficulty="beginner"
      estimatedMinutes={8}
      lastUpdated="2026-03-19"
      sections={SECTIONS}
      prevModule={{ title: 'Hub & Events', href: '/dashboard/training/hub-events' }}
      nextModule={{ title: 'Quote Pipeline', href: '/dashboard/training/quotes-management' }}
    >
      <Section id="login" title="Logging In">
        <p>
          Access the employee portal at <code className="bg-gray-100 px-1 rounded">/login</code> or via the &ldquo;Employee Login&rdquo;
          link in the website header&rsquo;s top bar.
        </p>
        <Step number={1} title="Enter Credentials">
          Use your <strong>@wc-con.com</strong> email address and password. Check &ldquo;Remember me&rdquo; to stay logged in.
        </Step>
        <Step number={2} title="Dashboard Redirect">
          On successful login, you&rsquo;ll be taken directly to the dashboard inbox.
        </Step>
        <p>If you forget your password, use the &ldquo;Forgot password?&rdquo; link on the login page.</p>
        <Warning>The login page is separate from the public website. Once logged in, you see the full dashboard with sidebar navigation — the public header and footer are hidden.</Warning>
      </Section>

      <Section id="layout" title="Dashboard Layout">
        <p>The dashboard uses a <strong>two-panel layout</strong>:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Left sidebar</strong> (fixed, 256px wide) — Navigation menu with all dashboard sections</li>
          <li><strong>Main content area</strong> (flexible width) — Shows the active page</li>
        </ul>
        <p>Above the main content is a <strong>top header bar</strong> showing:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Notification bell icon</li>
          <li>Your name and role (e.g., &ldquo;Todd Seabrook, Owner&rdquo;)</li>
          <li>Avatar with your initials</li>
        </ul>
      </Section>

      <Section id="sidebar" title="Sidebar Navigation">
        <p>The sidebar is organized into <strong>4 sections</strong>:</p>
        <p><strong>Inbox</strong> — Your main landing page with priority actions and activity feed</p>
        <p><strong>Operations</strong> — Day-to-day workflow tools:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Quotes — Create and manage customer quotes</li>
          <li>Work Orders — Schedule and dispatch jobs</li>
          <li>Tickets — Review driver daily records</li>
          <li>Invoices — Bill customers and track payments</li>
          <li>Fleet &amp; Drivers — Manage trucks, equipment, and crew</li>
        </ul>
        <p><strong>Business</strong> — Customer and growth tools:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Opportunities — RFPs and contract bids</li>
          <li>Conversations — Chat/voice/web visit monitoring</li>
          <li>Business Hub — Partner directory management</li>
          <li>Voice Agent — AI phone call monitoring</li>
        </ul>
        <p><strong>Admin</strong> — Management and analytics:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Hiring Pipeline — Job applicant management</li>
          <li>Team — Employee profiles and certifications</li>
          <li>Intelligence — AI document analysis</li>
          <li>Marketing — Google Ads and SEO</li>
          <li>Analytics — Business KPIs and reporting</li>
          <li>Integrations — Third-party tool connections</li>
        </ul>
        <p>The <strong>active page</strong> is highlighted with a tan/gold background in the sidebar. At the bottom, &ldquo;Back to Website&rdquo; returns you to the public site.</p>
      </Section>

      <Section id="inbox" title="Inbox & Priority Actions">
        <p>The inbox is your <strong>daily command center</strong>. It shows items that need your attention, sorted by urgency:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>High priority</strong> (red) — Overdue invoices, urgent quote requests, safety issues</li>
          <li><strong>Medium priority</strong> (amber) — Pending approvals, expiring quotes, upcoming deadlines</li>
          <li><strong>Low priority</strong> (blue) — Informational updates, completed items</li>
        </ul>
        <p>Each item shows a title, subtitle with context, priority badge, and timestamp.</p>
        <Tip>Check the inbox first thing each morning. High-priority items at the top need immediate action.</Tip>
      </Section>

      <Section id="activity" title="Activity Feed">
        <p>The right column of the inbox shows a <strong>chronological activity feed</strong> — a timeline of recent events across the platform:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>New quote requests received</li>
          <li>Work orders dispatched or completed</li>
          <li>Tickets submitted by drivers</li>
          <li>Payments received</li>
          <li>New applicants and conversations</li>
        </ul>
        <p>Each entry shows the event description and relative timestamp (e.g., &ldquo;12 minutes ago&rdquo;).</p>
      </Section>

      <Section id="stats" title="Quick Stats Cards">
        <p>Four summary cards at the top of the inbox show key daily metrics:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Today&rsquo;s active work orders</li>
          <li>Pending quote responses</li>
          <li>Unreviewed tickets</li>
          <li>Outstanding invoice balance</li>
        </ul>
        <p>These give you an instant snapshot of the business without drilling into each section.</p>
      </Section>
    </TrainingGuide>
  );
}
