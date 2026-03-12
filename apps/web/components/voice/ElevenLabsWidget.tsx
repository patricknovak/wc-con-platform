'use client';

import { useEffect } from 'react';

interface ElevenLabsWidgetProps {
  agentId: string;
  variant?: 'compact' | 'expanded';
}

/**
 * ElevenLabs Conversational AI voice widget.
 *
 * This component embeds the ElevenLabs (ElevenAgents) widget that lets
 * visitors have a natural voice conversation with an AI agent.
 *
 * To configure:
 * 1. Create an agent at https://elevenlabs.io/app/conversational-ai
 * 2. Set the agent's system prompt with WCC knowledge (see docs/elevenlabs-agent-prompt.md)
 * 3. Replace the agentId prop with your agent's ID
 * 4. Set the agent to "Public" or configure domain allowlisting
 */
export function ElevenLabsWidget({ agentId, variant = 'compact' }: ElevenLabsWidgetProps) {
  useEffect(() => {
    // Load the ElevenLabs widget script if not already present
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
  }, []);

  return (
    // @ts-expect-error -- elevenlabs-convai is a custom web component
    <elevenlabs-convai agent-id={agentId} variant={variant} />
  );
}
