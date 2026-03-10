import Anthropic from '@anthropic-ai/sdk';

let client: Anthropic | null = null;

/**
 * Gets or creates a singleton instance of the Anthropic client.
 * Uses ANTHROPIC_API_KEY environment variable.
 *
 * @returns {Anthropic} Initialized Anthropic client
 * @throws {Error} If ANTHROPIC_API_KEY is not set
 */
export function getAnthropicClient(): Anthropic {
  if (!client) {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      throw new Error('ANTHROPIC_API_KEY environment variable is not set');
    }
    client = new Anthropic({
      apiKey,
    });
  }
  return client;
}

/**
 * Resets the client singleton. Useful for testing.
 */
export function resetAnthropicClient(): void {
  client = null;
}
