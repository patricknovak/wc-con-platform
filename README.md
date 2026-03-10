# WC-CON Platform

Full-stack business platform for West Central Contracting LTD.

## Architecture

- `apps/web` — Public-facing Next.js website
- `apps/dashboard` — Internal admin dashboard
- `packages/database` — Prisma schema & database client
- `packages/ai` — Claude API integrations (chatbot, quoting, proposals)
- `packages/voice` — ElevenLabs voice agent integration
- `packages/ui` — Shared UI component library
- `services/opportunity-scanner` — Automated RFP/tender scanner
- `services/intelligence` — Learning system & document processing
- `knowledge-base` — AI knowledge base content

## Getting Started

```bash
npm install
cp .env.example .env.local
# Fill in your environment variables
npm run dev
```

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS
- **Database:** PostgreSQL + Prisma + pgvector
- **AI:** Claude API (Anthropic)
- **Voice:** ElevenLabs Conversational AI + Twilio
- **CMS:** Sanity.io
- **Hosting:** Vercel
- **CI/CD:** GitHub Actions
