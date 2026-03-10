import { getAnthropicClient } from '../client';

/**
 * Represents a line item extracted from a document
 */
export interface LineItem {
  description: string;
  quantity: number;
  unit: string;
  unitPrice?: number;
  totalPrice?: number;
}

/**
 * Extracted structured data from a document
 */
export interface ExtractedData {
  documentType: 'quote' | 'rfp' | 'proposal' | 'invoice' | 'other';
  documentDate?: string;
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
  companyName?: string;
  projectName?: string;
  projectDescription?: string;
  deliveryLocation?: string;
  lineItems: LineItem[];
  subtotal?: number;
  tax?: number;
  total?: number;
  terms?: string;
  notes?: string;
  extractedOutcome?: string;
  confidence: number;
}

/**
 * Processes a document and extracts structured data using Claude.
 * Handles quotes, RFPs, proposals, and invoices.
 *
 * @param documentText - Raw text content from the document
 * @param documentType - Type of document (quote, rfp, proposal, invoice)
 * @returns {Promise<ExtractedData>} Structured extracted data
 * @throws {Error} If the API call fails
 */
export async function processDocument(
  documentText: string,
  documentType: string
): Promise<ExtractedData> {
  const client = getAnthropicClient();

  const prompt = `You are a document processing system that extracts structured data from construction and contracting documents.

Analyze the following ${documentType} document and extract all structured information.

DOCUMENT CONTENT:
${documentText}

Please extract the following information and return as JSON:

{
  "documentType": "quote|rfp|proposal|invoice|other",
  "documentDate": "YYYY-MM-DD or null",
  "customerName": "extracted customer/client name or null",
  "customerEmail": "extracted email or null",
  "customerPhone": "extracted phone or null",
  "companyName": "vendor/contractor name or null",
  "projectName": "project name or null",
  "projectDescription": "brief description or null",
  "deliveryLocation": "location or null",
  "lineItems": [
    {
      "description": "item description",
      "quantity": number,
      "unit": "unit of measure",
      "unitPrice": number or null,
      "totalPrice": number or null
    }
  ],
  "subtotal": number or null,
  "tax": number or null,
  "total": number or null,
  "terms": "payment terms or null",
  "notes": "any special notes or requirements",
  "extractedOutcome": "if this is a completed project/quote, what was the outcome",
  "confidence": 0.0-1.0 (your confidence in the extraction accuracy)
}

Be precise with numbers. If amounts are ambiguous, set to null and note in the notes field.
For lineItems, include everything that represents a billable item or cost.
Assess your confidence (0-1) on how well you extracted the data from this document.`;

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
    let extracted;
    try {
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('No JSON found in response');
      }
      extracted = JSON.parse(jsonMatch[0]);
    } catch {
      // Fallback extraction
      extracted = {
        documentType: normalizeDocumentType(documentType),
        lineItems: [],
        confidence: 0.3,
        notes: 'Extraction failed - manual review recommended',
      };
    }

    // Ensure required fields exist
    return {
      documentType: extracted.documentType || 'other',
      documentDate: extracted.documentDate || undefined,
      customerName: extracted.customerName || undefined,
      customerEmail: extracted.customerEmail || undefined,
      customerPhone: extracted.customerPhone || undefined,
      companyName: extracted.companyName || undefined,
      projectName: extracted.projectName || undefined,
      projectDescription: extracted.projectDescription || undefined,
      deliveryLocation: extracted.deliveryLocation || undefined,
      lineItems: extracted.lineItems || [],
      subtotal: extracted.subtotal || undefined,
      tax: extracted.tax || undefined,
      total: extracted.total || undefined,
      terms: extracted.terms || undefined,
      notes: extracted.notes || undefined,
      extractedOutcome: extracted.extractedOutcome || undefined,
      confidence: Math.max(0, Math.min(1, extracted.confidence || 0.5)),
    };
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Document processing error: ${error.message}`);
    }
    throw error;
  }
}

/**
 * Normalizes document type string
 */
function normalizeDocumentType(
  type: string
): 'quote' | 'rfp' | 'proposal' | 'invoice' | 'other' {
  const lower = type.toLowerCase();
  if (lower.includes('quote') || lower.includes('estimate')) return 'quote';
  if (lower.includes('rfp') || lower.includes('request')) return 'rfp';
  if (lower.includes('proposal')) return 'proposal';
  if (lower.includes('invoice') || lower.includes('bill')) return 'invoice';
  return 'other';
}
