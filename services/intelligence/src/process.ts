/**
 * Intelligence service processor
 * Main entry point for document processing and analysis
 */

import { ingestDocument, DocumentType } from '../ingestion/index.js';
import { suggestPricing, PricingRequest } from '../pricing-engine/index.js';
import { createEmbedding, storeEmbeddedDocument } from '../embeddings/index.js';

/**
 * Main processor function
 * Handles document ingestion, analysis, and knowledge base updates
 */
export async function processIntelligence(): Promise<void> {
  console.log('='.repeat(60));
  console.log('WC-CON Intelligence Service - Processing Started');
  console.log(`Time: ${new Date().toISOString()}`);
  console.log('='.repeat(60));

  try {
    // Example: Process various document types
    console.log('\n[INTELLIGENCE] Document ingestion examples:');

    // Would process actual documents in production
    // Example processing of a quote
    console.log('  - Processing quote documents...');
    // const quote = await ingestDocument('./documents/quote-001.pdf', 'QUOTE');

    // Example RFP processing
    console.log('  - Processing RFP documents...');
    // const rfp = await ingestDocument('./documents/tender-001.pdf', 'RFP');

    // Example pricing analysis
    console.log('\n[INTELLIGENCE] Pricing analysis:');
    const pricingRequest: PricingRequest = {
      productName: 'Road Crush (1/2"-2.5")',
      quantity: 50,
      unit: 'tons',
      deliveryDistance: 35,
      customerType: 'contractor',
      notes: 'Regular customer, repeat order',
    };

    const pricingSuggestion = suggestPricing(pricingRequest);

    console.log(`  Product: ${pricingRequest.productName}`);
    console.log(`  Quantity: ${pricingRequest.quantity} ${pricingRequest.unit}`);
    console.log(`  Suggested Price: $${pricingSuggestion.unitPrice}/unit`);
    console.log(`  Total: $${pricingSuggestion.totalPrice.toFixed(2)}`);
    console.log(`  Price Range: $${pricingSuggestion.priceRange.low} - $${pricingSuggestion.priceRange.high}`);
    console.log(`  Confidence: ${pricingSuggestion.confidence}%`);

    if (pricingSuggestion.recommendedDiscount) {
      console.log(
        `  Recommended Discount: ${pricingSuggestion.recommendedDiscount}%`
      );
    }

    console.log(`  Reasoning:`);
    for (const reason of pricingSuggestion.reasoning) {
      console.log(`    - ${reason}`);
    }

    if (pricingSuggestion.flags.length > 0) {
      console.log(`  Flags:`);
      for (const flag of pricingSuggestion.flags) {
        console.log(`    - ${flag}`);
      }
    }

    // Example embedding creation
    console.log('\n[INTELLIGENCE] Embedding creation:');
    const sampleText = 'WC-CON supplies high-quality road crush and aggregate materials';
    const embedding = await createEmbedding(sampleText);
    console.log(`  Text: "${sampleText}"`);
    console.log(`  Embedding dimensions: ${embedding.length}`);
    console.log(`  First 5 dimensions: [${embedding.slice(0, 5).map((v) => v.toFixed(4)).join(', ')}]`);

    // Store embedded document
    const storedDoc = await storeEmbeddedDocument(sampleText, {
      type: 'company_description',
      createdAt: new Date().toISOString(),
    });

    console.log(`  Stored with ID: ${storedDoc.id}`);

    console.log('\n' + '='.repeat(60));
    console.log('Intelligence processing completed successfully');
    console.log('='.repeat(60));
  } catch (error) {
    console.error('[INTELLIGENCE] Processing failed:', error);
    throw error;
  }
}

// Run processing when executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  processIntelligence().catch((error) => {
    console.error('Intelligence processing failed:', error);
    process.exit(1);
  });
}

export default processIntelligence;
