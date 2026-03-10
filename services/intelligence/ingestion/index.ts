/**
 * Document ingestion pipeline
 * Reads and extracts structured data from various document types using Claude
 */

import * as fs from 'fs/promises';
import * as path from 'path';
import Anthropic from '@anthropic-ai/sdk';

/**
 * Document types that can be ingested
 */
export type DocumentType = 'QUOTE' | 'RFP' | 'PROPOSAL' | 'SUBMISSION' | 'INVOICE';

/**
 * Extracted document data ready for storage
 */
export interface ExtractedDocument {
  type: DocumentType;
  fileName: string;
  extractedAt: Date;
  metadata: Record<string, unknown>;
  content: string;
  summary: string;
  keyFields: Record<string, unknown>;
}

const client = new Anthropic();

/**
 * Ingest a document and extract structured data
 * @param filePath Absolute path to the document file
 * @param type Type of document being ingested
 * @returns Extracted and processed document data
 */
export async function ingestDocument(
  filePath: string,
  type: DocumentType
): Promise<ExtractedDocument> {
  console.log(`[INGEST] Processing ${type} document: ${filePath}`);

  const fileName = path.basename(filePath);

  try {
    // Read file content
    const fileContent = await fs.readFile(filePath, 'utf-8');

    // Prepare extraction prompt based on document type
    const extractionPrompt = getExtractionPrompt(type);

    // Send to Claude for structured extraction
    const response = await client.messages.create({
      model: 'claude-opus-4-6',
      max_tokens: 2048,
      messages: [
        {
          role: 'user',
          content: `${extractionPrompt}\n\nDocument content:\n\n${fileContent}`,
        },
      ],
    });

    const extractedText =
      response.content[0].type === 'text' ? response.content[0].text : '';

    // Parse the extracted data
    const parsed = parseExtractionResponse(extractedText, type);

    return {
      type,
      fileName,
      extractedAt: new Date(),
      metadata: parsed.metadata,
      content: fileContent,
      summary: parsed.summary,
      keyFields: parsed.keyFields,
    };
  } catch (error) {
    console.error(`[INGEST] Error processing document:`, error);
    throw error;
  }
}

/**
 * Get the appropriate extraction prompt based on document type
 */
function getExtractionPrompt(type: DocumentType): string {
  const prompts: Record<DocumentType, string> = {
    QUOTE: `Extract the following information from this quotation:
- Quote number/ID
- Customer name
- Items/services quoted (with quantities and unit prices)
- Subtotal
- Tax
- Total
- Expiration date
- Terms & conditions
- Prepared by/contact name
- Date prepared

Return the data as a JSON object.`,

    RFP: `Extract the following information from this RFP (Request for Proposal):
- RFP title/number
- Issuing organization
- Project description
- Timeline/deadlines
- Scope of work
- Requirements/specifications
- Budget range (if stated)
- Contact person
- Submission deadline
- Evaluation criteria (if mentioned)

Return the data as a JSON object.`,

    PROPOSAL: `Extract the following information from this proposal:
- Proposal title
- Client name
- Proposed solution/services
- Deliverables
- Timeline
- Cost breakdown
- Team/resources
- Success criteria
- Terms
- Expiration date

Return the data as a JSON object.`,

    SUBMISSION: `Extract the following information from this submission document:
- Submission ID/reference
- Submitting company
- Project/tender reference
- Submitted date
- Contents/deliverables
- Key commitments
- Signature/approval status

Return the data as a JSON object.`,

    INVOICE: `Extract the following information from this invoice:
- Invoice number
- Date issued
- Due date
- Bill-to customer
- Line items (description, quantity, unit price, amount)
- Subtotal
- Tax/HST
- Total due
- Payment terms
- Account number/reference
- Notes

Return the data as a JSON object.`,
  };

  return prompts[type];
}

/**
 * Parse the Claude response and extract structured data
 */
function parseExtractionResponse(
  response: string,
  type: DocumentType
): {
  metadata: Record<string, unknown>;
  summary: string;
  keyFields: Record<string, unknown>;
} {
  try {
    // Try to extract JSON from the response
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    const jsonData = jsonMatch ? JSON.parse(jsonMatch[0]) : {};

    // Generate summary
    const summary = response.split('\n').slice(0, 3).join(' ').substring(0, 200);

    return {
      metadata: {
        documentType: type,
        extractedAt: new Date().toISOString(),
      },
      summary,
      keyFields: jsonData,
    };
  } catch (error) {
    console.warn('[INGEST] Could not parse JSON response, using raw text');

    return {
      metadata: {
        documentType: type,
        extractedAt: new Date().toISOString(),
        parseError: true,
      },
      summary: response.substring(0, 200),
      keyFields: {
        rawExtraction: response,
      },
    };
  }
}
