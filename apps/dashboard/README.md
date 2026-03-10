# Dashboard - West Central Contracting

The admin dashboard is Todd's single pane of glass for managing all business operations. This is a Next.js 15 application built with React 19, TypeScript, and Tailwind CSS.

## Features

- **Inbox (Home)**: Dashboard overview with priority actions and recent activity
- **Quotes**: Quote pipeline management with status filtering and approval workflow
- **Opportunities**: RFP/opportunity tracking with match scores and deadline tracking
- **Business Hub**: Partner network and referral management
- **Voice Agent**: Oversight of automated call handling and lead capture
- **Intelligence**: Document analysis and AI-driven pricing insights
- **Analytics**: Business KPIs and performance metrics

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The dashboard runs on `http://localhost:3001`

### Building for Production

```bash
npm run build
npm start
```

## Project Structure

```
apps/dashboard/
├── app/
│   ├── layout.tsx          # Root layout with sidebar and top bar
│   ├── page.tsx            # Home/inbox dashboard
│   ├── globals.css         # Global styles
│   ├── quotes/
│   │   └── page.tsx        # Quote pipeline
│   ├── opportunities/
│   │   └── page.tsx        # RFP opportunities
│   ├── hub/
│   │   └── page.tsx        # Business hub management
│   ├── voice/
│   │   └── page.tsx        # Voice agent oversight
│   ├── intelligence/
│   │   └── page.tsx        # Intelligence system
│   └── analytics/
│       └── page.tsx        # Analytics and KPIs
├── components/
│   ├── Sidebar.tsx         # Navigation sidebar
│   └── StatusBadge.tsx     # Reusable status badge
├── package.json
├── tsconfig.json
├── next.config.ts
├── tailwind.config.ts
└── postcss.config.js
```

## Styling

The dashboard uses Tailwind CSS with custom brand colors:

- Primary: `#2D5016` (forest green)
- Secondary: `#D4A574` (tan)
- Accent: `#E8B047` (gold)
- Light: `#F5EFE7` (cream)

## Component Notes

All page components are client components ('use client') to enable interactivity and state management. The Sidebar component is also a client component for navigation state.

Sample data is included throughout the dashboard for demonstration purposes and should be replaced with real API calls in production.
