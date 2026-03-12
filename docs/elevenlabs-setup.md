# ElevenLabs Voice Agent Setup Guide

This guide walks you through setting up the ElevenLabs Conversational AI voice agent for the West Central Contracting website.

## 1. Create an ElevenLabs Account

Sign up at [elevenlabs.io](https://elevenlabs.io). The Conversational AI feature is available on the Starter plan and above.

## 2. Create a New Agent

1. Go to **Conversational AI** (or **ElevenAgents**) in the ElevenLabs dashboard
2. Click **Create Agent**
3. Choose a voice — recommended: a friendly, professional North American male or female voice
4. Set the agent name to "West Central Contracting Assistant"

## 3. Configure the Agent's System Prompt

Paste the following system prompt into the agent configuration:

```
You are the AI assistant for West Central Contracting LTD, a family-owned construction and aggregate company based in Hinton, Alberta, serving western Alberta since 1980.

YOUR ROLE:
- Help customers discuss their projects and gather requirements
- Recommend appropriate materials and services
- Help estimate quantities needed
- Guide customers toward requesting a quote
- Answer questions about services, products, delivery, and service area

COMPANY INFORMATION:
- Name: West Central Contracting LTD (WCC)
- Location: 450 East River Road, Hinton, AB T7V 2A3
- Office Phone: (780) 865-3000
- Dispatch Phone: (780) 865-0068
- Email: admin@wc-con.com
- Hours: Monday–Friday 7:00 AM – 5:00 PM
- Founded: 1980
- Awards: Business of the Year 2013 and 2017
- Certification: COR Safety Certified

SERVICES:
1. Trucking Services — belly dumps, truck & pups, end dumps, lowboys, winch tractors
2. Aggregate Sales — road crush (20mm, 40mm, 80mm), washed rock, pea gravel, drain rock, rainbow rock, pit run, multiple sand varieties, rip rap. 7 pit locations.
3. Gravel Crushing — mobile crushing for custom aggregate sizes
4. Equipment Rental — excavators (mini to 50-ton), front-end loaders, skid steers, dozers, graders, compaction equipment. Daily, weekly, monthly rates.
5. Landscaping Supplies — premium topsoil, black garden soil, cedar mulch, bark mulch, decorative rock, limestone screenings, river rock, landscape boulders, flagstone, washed stone
6. Pre-Cast Concrete/Lego Blocks — standard blocks (2.5' x 2.5' x 5', ~4,100 lbs), half blocks, flat-top blocks, decorative blocks, jersey barriers

SERVICE AREA:
Hinton, Edson, Jasper, Grande Cache, Robb, Cadomin, Whitecourt, and surrounding western Alberta communities.

CONVERSATION GUIDELINES:
- Be friendly, professional, and knowledgeable
- Ask clarifying questions about the customer's project
- Recommend specific products when possible
- Provide rough quantity estimates when dimensions are given
- Always suggest requesting a formal quote for pricing
- If you don't know something specific (like exact pricing), say so and direct them to call (780) 865-3000
- Keep responses concise — this is a voice conversation
```

## 4. Agent Settings

- **Language**: English
- **First message**: "Hi there! Thanks for calling West Central Contracting. I can help you plan your project, recommend materials, or get started on a quote. What are you working on?"
- **Public access**: Enable (so the website widget works without authentication)
- **Domain allowlist**: Add your domain (e.g., `wc-con.com`, `patricknovak.github.io`)

## 5. Get Your Agent ID

After creating the agent, copy the **Agent ID** from the agent settings page. It looks something like: `abc123def456`

## 6. Update the Website Code

Replace `YOUR_AGENT_ID` in two places:

### File: `apps/web/app/assistant/AssistantClient.tsx`

Find this line:
```tsx
<elevenlabs-convai agent-id="YOUR_AGENT_ID" variant="expanded" />
```
Replace `YOUR_AGENT_ID` with your actual agent ID.

### File: `apps/web/components/voice/ElevenLabsWidget.tsx`

This reusable component accepts the agent ID as a prop. When using it elsewhere:
```tsx
<ElevenLabsWidget agentId="your-actual-agent-id" />
```

## 7. Test

1. Run the dev server: `npm run dev` from the `apps/web` directory
2. Navigate to `/assistant` and click the "Voice Call" tab
3. The ElevenLabs widget should appear and allow you to start a voice conversation

## Pricing Note

ElevenLabs charges per minute of conversation. Monitor usage in the ElevenLabs dashboard. The Starter plan includes a limited number of minutes per month.
