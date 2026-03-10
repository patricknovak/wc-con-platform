import { getAnthropicClient } from '../client';

/**
 * Represents a single line item in a quote
 */
export interface QuoteItem {
  productName: string;
  quantity: number;
  unit: string;
  unitPrice?: number;
  description?: string;
}

/**
 * Quote request details
 */
export interface QuoteRequest {
  customerName: string;
  customerEmail?: string;
  customerPhone?: string;
  items: QuoteItem[];
  deliveryLocation: string;
  deliveryDate?: string;
  projectDescription?: string;
  specialRequirements?: string;
}

/**
 * Structured sections of a generated quote
 */
export interface QuoteDraft {
  greeting: string;
  itemBreakdown: string;
  deliveryNotes: string;
  terms: string;
  total: string;
  fullQuote: string;
}

/**
 * Generates a professional quote draft using Claude.
 * Creates a well-formatted quote with greeting, itemized breakdown, delivery notes, and terms.
 *
 * @param quoteRequest - The quote request with customer and item details
 * @returns {Promise<QuoteDraft>} Structured quote draft with all sections
 * @throws {Error} If the API call fails
 */
export async function generateQuoteDraft(
  quoteRequest: QuoteRequest
): Promise<QuoteDraft> {
  const client = getAnthropicClient();

  const itemsDescription = quoteRequest.items
    .map(
      (item) =>
        `- ${item.productName}: ${item.quantity} ${item.unit}${
          item.unitPrice ? ` @ $${item.unitPrice.toFixed(2)}/${item.unit}` : ''
        }${item.description ? ` (${item.description})` : ''}`
    )
    .join('\n');

  const prompt = `You are a professional quote generator for West Central Contracting LTD, an aggregate and trucking company in Hinton, Alberta.

Generate a professional quote for the following request:

Customer: ${quoteRequest.customerName}
Email: ${quoteRequest.customerEmail || 'Not provided'}
Phone: ${quoteRequest.customerPhone || 'Not provided'}
Delivery Location: ${quoteRequest.deliveryLocation}
Delivery Date: ${quoteRequest.deliveryDate || 'As soon as possible'}

Items Requested:
${itemsDescription}

Project Description: ${quoteRequest.projectDescription || 'General order'}

Special Requirements: ${quoteRequest.specialRequirements || 'None'}

Please generate a professional quote with the following sections:

1. GREETING: A warm, professional greeting to the customer
2. ITEM BREAKDOWN: A detailed itemized list with descriptions
3. DELIVERY NOTES: Information about delivery, timeline, and logistics
4. TERMS: Standard business terms and conditions
5. TOTAL: A summary with total cost (use estimated pricing if not provided)

Format the response as a JSON object with these exact keys: "greeting", "itemBreakdown", "deliveryNotes", "terms", "total"

Make it professional, clear, and appropriate for a construction materials company.`;

  try {
    const response = await client.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 2048,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    });

    const content =
      response.content[0].type === 'text' ? response.content[0].text : '';

    // Parse the JSON response
    let parsedQuote;
    try {
      // Extract JSON from the response (might have markdown code blocks)
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('No JSON found in response');
      }
      parsedQuote = JSON.parse(jsonMatch[0]);
    } catch {
      // Fallback if JSON parsing fails
      parsedQuote = {
        greeting: 'Thank you for your interest in West Central Contracting.',
        itemBreakdown: itemsDescription,
        deliveryNotes: `Delivery to ${quoteRequest.deliveryLocation}`,
        terms: 'Standard business terms apply. Payment terms are Net 30.',
        total: 'Price upon request',
      };
    }

    const fullQuote = [
      parsedQuote.greeting,
      '\n\nITEM BREAKDOWN:\n' + parsedQuote.itemBreakdown,
      '\n\nDELIVERY INFORMATION:\n' + parsedQuote.deliveryNotes,
      '\n\nTERMS & CONDITIONS:\n' + parsedQuote.terms,
      '\n\nTOTAL:\n' + parsedQuote.total,
    ].join('');

    return {
      greeting: parsedQuote.greeting,
      itemBreakdown: parsedQuote.itemBreakdown,
      deliveryNotes: parsedQuote.deliveryNotes,
      terms: parsedQuote.terms,
      total: parsedQuote.total,
      fullQuote,
    };
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Quote generation error: ${error.message}`);
    }
    throw error;
  }
}
