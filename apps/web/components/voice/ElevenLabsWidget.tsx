'use client';

import { useEffect } from 'react';

interface ElevenLabsWidgetProps {
  agentId?: string;
  variant?: 'compact' | 'expanded';
}

/**
 * ElevenLabs Conversational AI voice widget.
 *
 * Uses NEXT_PUBLIC_ELEVENLABS_AGENT_ID from env by default,
 * or accepts an explicit agentId prop.
 *
 * The voice agent config (persona, greeting, data capture rules) lives in
 * packages/voice/src/config/agent-config.ts — use that as the source of
 * truth when configuring the agent in the ElevenLabs dashboard.
 *
 * Setup guide: docs/elevenlabs-setup.md
 */
export function ElevenLabsWidget({ agentId, variant = 'compact' }: ElevenLabsWidgetProps) {
  const resolvedId = agentId || process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID;

  useEffect(() => {
    if (!resolvedId) return;

    const existingScript = document.querySelector(
      'script[src*="elevenlabs/convai-widget-embed"]'
    );
    if (!existingScript) {
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/@elevenlabs/convai-widget-embed';
      script.async = true;
      script.type = 'text/javascript';
      document.body.appendChild(script);
    }
  }, [resolvedId]);

  if (!resolvedId) return null;

  return (
    // @ts-expect-error -- elevenlabs-convai is a custom web component
    <elevenlabs-convai agent-id={resolvedId} variant={variant} />
  );
}
