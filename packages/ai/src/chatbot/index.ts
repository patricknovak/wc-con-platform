import { getAnthropicClient } from '../client';

/**
 * Represents a message in the conversation history
 */
export interface Message {
  role: 'user' | 'assistant';
  content: string;
}

/**
 * Extracted intent from user message
 */
export type ChatIntent = 'quote_request' | 'info_request' | 'dispatch' | 'general';

/**
 * Response from the chatbot handler
 */
export interface ChatResponse {
  response: string;
  intent: ChatIntent;
  confidence: number;
}

/**
 * Handles a chat message and generates a response using Claude.
 * Analyzes the message to extract user intent and provides appropriate responses.
 *
 * @param message - The user's message
 * @param conversationHistory - Previous messages in the conversation
 * @returns {Promise<ChatResponse>} The assistant response with detected intent
 * @throws {Error} If the API call fails
 */
export async function handleChatMessage(
  message: string,
  conversationHistory: Message[] = []
): Promise<ChatResponse> {
  const client = getAnthropicClient();

  const systemPrompt = `You are Alex, the virtual assistant for West Central Contracting LTD, a family-owned aggregate and trucking company in Hinton, Alberta, serving western Alberta since 1980.

You are friendly, professional, and knowledgeable about construction materials and contracting services.

Company Information:
- Location: Hinton, Alberta
- Services: Aggregate supply, trucking, excavation, material delivery
- Delivery Areas: Western Alberta
- Business Hours: Monday-Friday 7 AM - 5 PM, Saturday 8 AM - 12 PM (Mountain Time)

Your responsibilities:
1. Answer questions about our services, products, and capabilities
2. Help customers with quote requests by gathering necessary information
3. Provide information about delivery areas and timelines
4. Direct urgent matters to the appropriate team member
5. Be professional but warm and approachable

When responding, be concise and helpful. If you need more information to help the customer, politely ask clarifying questions.`;

  const messages = [
    ...conversationHistory.map((msg) => ({
      role: msg.role as 'user' | 'assistant',
      content: msg.content,
    })),
    {
      role: 'user' as const,
      content: message,
    },
  ];

  try {
    const response = await client.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 1024,
      system: systemPrompt,
      messages,
    });

    const assistantMessage =
      response.content[0].type === 'text' ? response.content[0].text : '';

    // Extract intent from the message and response
    const intent = detectIntent(message, assistantMessage);
    const confidence = calculateConfidence(message, assistantMessage, intent);

    return {
      response: assistantMessage,
      intent,
      confidence,
    };
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Chatbot error: ${error.message}`);
    }
    throw error;
  }
}

/**
 * Detects the user's intent from the message and response
 */
function detectIntent(userMessage: string, assistantResponse: string): ChatIntent {
  const lowerMessage = userMessage.toLowerCase();
  const lowerResponse = assistantResponse.toLowerCase();

  // Quote request intent
  if (
    lowerMessage.includes('quote') ||
    lowerMessage.includes('pricing') ||
    lowerMessage.includes('cost') ||
    lowerMessage.includes('how much') ||
    lowerMessage.includes('estimate')
  ) {
    return 'quote_request';
  }

  // Dispatch/urgent intent
  if (
    lowerMessage.includes('emergency') ||
    lowerMessage.includes('urgent') ||
    lowerMessage.includes('asap') ||
    lowerMessage.includes('right now')
  ) {
    return 'dispatch';
  }

  // Information request
  if (
    lowerMessage.includes('what') ||
    lowerMessage.includes('how') ||
    lowerMessage.includes('can you') ||
    lowerMessage.includes('do you') ||
    lowerMessage.includes('information') ||
    lowerMessage.includes('tell me')
  ) {
    return 'info_request';
  }

  return 'general';
}

/**
 * Calculates confidence level for the detected intent (0-1)
 */
function calculateConfidence(
  userMessage: string,
  assistantResponse: string,
  intent: ChatIntent
): number {
  const lowerMessage = userMessage.toLowerCase();

  let confidence = 0.5;

  // Increase confidence for explicit intent markers
  switch (intent) {
    case 'quote_request':
      if (
        lowerMessage.includes('quote') ||
        lowerMessage.includes('pricing')
      ) {
        confidence = 0.95;
      } else if (
        lowerMessage.includes('cost') ||
        lowerMessage.includes('price')
      ) {
        confidence = 0.85;
      } else {
        confidence = 0.7;
      }
      break;

    case 'dispatch':
      confidence = 0.9;
      break;

    case 'info_request':
      if (lowerMessage.length > 20) {
        confidence = 0.8;
      }
      break;

    case 'general':
      confidence = 0.6;
      break;
  }

  return confidence;
}
