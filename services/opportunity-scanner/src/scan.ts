/**
 * Main opportunity scanner orchestrator
 * Runs all scrapers, scores results, and prepares for storage/notification
 */

import { scrapeAPC } from '../scrapers/apc.js';
import { scrapeMunicipal } from '../scrapers/municipal.js';
import { matchOpportunity } from './matcher.js';
import { RawOpportunity, ScoredOpportunity } from '../scrapers/types.js';

/**
 * Main scan function
 * Orchestrates the complete scan-match-score pipeline
 */
export async function runScan(): Promise<{
  rawOpportunities: RawOpportunity[];
  scoredOpportunities: ScoredOpportunity[];
  summary: ScanSummary;
}> {
  console.log('='.repeat(60));
  console.log('WC-CON Opportunity Scanner - Scan Run Started');
  console.log(`Time: ${new Date().toISOString()}`);
  console.log('='.repeat(60));

  const startTime = Date.now();
  const allRawOpportunities: RawOpportunity[] = [];

  try {
    // Run all scrapers
    console.log('\n[SCAN] Running all scrapers...\n');

    const [apcOpportunities, municipalOpportunities] = await Promise.all([
      scrapeAPC(),
      scrapeMunicipal(),
    ]);

    allRawOpportunities.push(...apcOpportunities, ...municipalOpportunities);

    console.log(
      `\n[SCAN] Total raw opportunities collected: ${allRawOpportunities.length}`
    );

    // Deduplicate by title + source
    const uniqueOpportunities = deduplicateOpportunities(allRawOpportunities);
    console.log(`[SCAN] After deduplication: ${uniqueOpportunities.length}`);

    // Score all opportunities
    console.log('\n[SCAN] Scoring opportunities...');
    const scoredOpportunities = uniqueOpportunities.map(matchOpportunity);

    // Generate summary
    const summary = generateSummary(scoredOpportunities);

    // Log summary
    console.log('\n' + '='.repeat(60));
    console.log('SCAN SUMMARY');
    console.log('='.repeat(60));
    console.log(`Total opportunities found: ${scoredOpportunities.length}`);
    console.log(`  - Strong matches (70+): ${summary.strongMatches}`);
    console.log(`  - Worth reviewing (40-69): ${summary.worthReviewing}`);
    console.log(`  - Low matches (<40): ${summary.lowMatches}`);
    console.log(`\nTop opportunities:`);

    const top5 = scoredOpportunities
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, 5);

    for (let i = 0; i < top5.length; i++) {
      const opp = top5[i];
      console.log(
        `  ${i + 1}. ${opp.title.substring(0, 50)} (${opp.matchScore}% - ${opp.source})`
      );
    }

    const elapsedMs = Date.now() - startTime;
    console.log(`\nScan completed in ${elapsedMs}ms`);
    console.log('='.repeat(60));

    // TODO: Save scored opportunities to database
    // await saveOpportunitiesToDB(scoredOpportunities);

    return {
      rawOpportunities: uniqueOpportunities,
      scoredOpportunities,
      summary,
    };
  } catch (error) {
    console.error('[SCAN] Fatal error during scan:', error);
    throw error;
  }
}

/**
 * Remove duplicate opportunities based on title and source
 */
function deduplicateOpportunities(
  opportunities: RawOpportunity[]
): RawOpportunity[] {
  const seen = new Set<string>();
  const unique: RawOpportunity[] = [];

  for (const opp of opportunities) {
    const key = `${opp.source}|${opp.title.toLowerCase()}`;

    if (!seen.has(key)) {
      seen.add(key);
      unique.push(opp);
    }
  }

  return unique;
}

/**
 * Generate summary statistics
 */
function generateSummary(opportunities: ScoredOpportunity[]): ScanSummary {
  let strongMatches = 0;
  let worthReviewing = 0;
  let lowMatches = 0;

  for (const opp of opportunities) {
    if (opp.matchScore >= 70) {
      strongMatches++;
    } else if (opp.matchScore >= 40) {
      worthReviewing++;
    } else {
      lowMatches++;
    }
  }

  return {
    totalOpportunities: opportunities.length,
    strongMatches,
    worthReviewing,
    lowMatches,
    scannedAt: new Date(),
  };
}

/**
 * Summary statistics from a scan run
 */
interface ScanSummary {
  totalOpportunities: number;
  strongMatches: number;
  worthReviewing: number;
  lowMatches: number;
  scannedAt: Date;
}

// Run scan when executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  runScan().catch((error) => {
    console.error('Scan failed:', error);
    process.exit(1);
  });
}

export default runScan;
