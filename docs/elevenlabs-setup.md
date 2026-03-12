# ElevenLabs Voice Agent Setup Guide

This guide walks you through setting up the ElevenLabs Conversational AI voice agent for the West Central Contracting website.

> **Note:** The voice agent's persona, greeting, handoff rules, business hours, and data capture config are defined in `packages/voice/src/config/agent-config.ts`. Use that as the source of truth when configuring the agent in the ElevenLabs dashboard.

## 1. Create an ElevenLabs Account

Sign up at [elevenlabs.io](https://elevenlabs.io). The Conversational AI feature is available on the Starter plan and above.

## 2. Create a New Agent

1. Go to **Conversational AI** (or **ElevenAgents**) in the ElevenLabs dashboard
2. Click **Create Agent**
3. Choose a voice — recommended: a friendly, professional North American male or female voice
4. Set the agent name to **"WC-CON Virtual Receptionist"** (matching `packages/voice/src/config/agent-config.ts`)

## 3. Configure the Agent's System Prompt

The agent persona from `packages/voice/src/config/agent-config.ts` is:

> You are Alex, the virtual receptionist for West Central Contracting LTD, a family-owned aggregate and trucking company in Hinton, Alberta, serving western Alberta since 1980. You are friendly, professional, and knowledgeable about construction materials.

Paste the following **full system prompt** into the agent configuration:

```
You are Alex, the virtual receptionist for West Central Contracting LTD, a family-owned aggregate and trucking company in Hinton, Alberta, serving western Alberta since 1980. You are friendly, professional, and knowledgeable about construction materials.

YOUR PRIMARY GOALS:
1. Answer questions about services and products
2. Gather information for quote requests
3. Route urgent matters to the team
4. Help customers plan their projects

COMPANY INFORMATION:
- Name: West Central Contracting LTD (WCC, WC-CON)
- Location: 450 East River Road, Hinton, AB T7V 2A3
- Office Phone: (780) 865-3000
- Dispatch Phone: (780) 865-0068
- Email: admin@wc-con.com
- Hours: Monday–Friday 7:00 AM – 5:00 PM, Saturday 8:00 AM – 12:00 PM (Mountain Time)
- Founded: 1980 (45+ years in business)
- Awards: Business of the Year 2013 and 2017
- Certification: COR Safety Certified
- Stats: 750,000+ units sold in 2024, 7 gravel pit locations

SERVICES:
1. Trucking Services — belly dumps, truck & pups, end dumps, lowboys, winch tractors, flatdecks
2. Aggregate Sales — road crush (20mm, 40mm, 80mm), washed rock, pea gravel, drain rock, rainbow rock, pit run, screened sand, fill sand, concrete sand, rip rap. 7 pit locations.
3. Gravel Crushing — mobile crushing for custom aggregate sizes, road base to decorative
4. Equipment Rental — excavators (mini to 50-ton), front-end loaders, skid steers, dozers, graders, compaction equipment. Daily, weekly, monthly rates. Delivery included in service area.
5. Landscaping Supplies — premium screened topsoil, black garden soil, cedar mulch, bark mulch, decorative rock (multiple colors), limestone screenings, river rock, landscape boulders, flagstone, washed stone
6. Pre-Cast Concrete/Lego Blocks — standard blocks (2.5' x 2.5' x 5', ~4,100 lbs), half blocks, flat-top blocks, decorative blocks, jersey barriers. Used for retaining walls, material bins, barriers, foundations.

SERVICE AREA:
Hinton, Edson, Jasper, Grande Cache, Robb, Cadomin, Whitecourt, and surrounding western Alberta communities.

DATA TO CAPTURE FOR QUOTE REQUESTS:
- Caller name
- Phone number
- Email (if offered)
- Material type
- Quantity needed
- Delivery location
- Timeline
- Project description

DATA TO CAPTURE FOR INFO REQUESTS:
- Caller name
- Phone number
- Question topic

HANDOFF RULES:
- Always transfer if caller explicitly requests a human
- Always transfer for safety emergencies
- Always transfer for complaint escalation
- Transfer if estimated quote value exceeds $50,000
- Transfer for key/existing accounts

CONVERSATION GUIDELINES:
- Be friendly, professional, and knowledgeable — like talking to a trusted team member
- Ask clarifying questions about the customer's project
- Recommend specific products when possible
- Provide rough quantity estimates when dimensions are given (e.g., a 40'x12' driveway needs ~8-10 tons base + 4-5 tons top)
- Always suggest requesting a formal quote for exact pricing
- If you don't know something specific (like exact pricing), say so and offer to have the team follow up
- Keep responses concise — this is a voice conversation, not a written one
- If outside business hours, let them know and offer to take a message
```

## 4. Agent Settings

- **Language**: English
- **First message**: "Thanks for calling West Central Contracting. My name is Alex, how can I help you today?"
- **Public access**: Enable (so the website widget works without authentication)
- **Domain allowlist**: Add your domains:
  - `wc-con.com`
  - `patricknovak.github.io`
  - `localhost` (for development)

## 5. Get Your Agent ID

After creating the agent, copy the **Agent ID** from the agent settings page.

## 6. Configure the Environment Variable

Add your agent ID to your environment:

```bash
# In .env (or .env.local for Next.js)
NEXT_PUBLIC_ELEVENLABS_AGENT_ID="your-agent-id-here"

# Also set the server-side key for webhook processing
ELEVENLABS_AGENT_ID="your-agent-id-here"
ELEVENLABS_API_KEY="your-api-key-here"
```

The website components (`apps/web/components/voice/ElevenLabsWidget.tsx` and `apps/web/app/assistant/AssistantClient.tsx`) automatically read from `NEXT_PUBLIC_ELEVENLABS_AGENT_ID`. If the variable is not set, the voice tab shows a fallback "Call us" button instead.

## 7. Test

1. Run the dev server: `npm run dev` from the `apps/web` directory
2. Navigate to `/assistant` and click the "Voice Call" tab
3. The ElevenLabs widget should appear and allow you to start a voice conversation
4. Test the chat tab as well — it works independently without any API keys

## Architecture Notes

- **Chat Widget** (`apps/web/components/chat/ChatWidget.tsx`): Client-side knowledge-based chatbot. Works on the static GitHub Pages export without any API keys. Appears on every page as a floating bubble.
- **Voice Widget** (`apps/web/components/voice/ElevenLabsWidget.tsx`): Embeds the ElevenLabs widget. Requires the agent ID env var.
- **Backend AI chatbot** (`packages/ai/src/chatbot/index.ts`): Claude API-powered chatbot for server-side use (dashboard, API routes). Not used on the static site.
- **Voice agent config** (`packages/voice/src/config/agent-config.ts`): Source of truth for agent persona, business hours, handoff rules, and data capture fields.
- **Webhook handler** (`packages/voice/src/webhook-handler/index.ts`): Processes ElevenLabs call webhooks for intent classification, data extraction, and follow-up scheduling.

## Pricing Note

ElevenLabs charges per minute of conversation. Monitor usage in the ElevenLabs dashboard. The Starter plan includes a limited number of minutes per month.
