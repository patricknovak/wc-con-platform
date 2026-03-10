/**
 * Alberta Purchasing Connection (APC) scraper
 * Fetches RFPs and tenders from the Alberta provincial purchasing system
 */

import fetch from 'node-fetch';
import * as cheerio from 'cheerio';
import { RawOpportunity } from './types.js';

const APC_BASE_URL = 'https://purchasing.alberta.ca/search';
const APC_SOURCE = 'APC' as const;

const RELEVANT_CATEGORIES = [
  'construction',
  'aggregate',
  'gravel',
  'trucking',
  'hauling',
  'excavation',
  'equipment',
  'landscaping',
  'road',
  'site preparation',
];

/**
 * Fetches and parses tender listings from Alberta Purchasing Connection
 * @returns Array of raw opportunities found on APC
 */
export async function scrapeAPC(): Promise<RawOpportunity[]> {
  const opportunities: RawOpportunity[] = [];

  try {
    console.log('[APC] Starting scrape from', APC_BASE_URL);

    const response = await fetch(APC_BASE_URL, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status} from APC`);
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    // Parse tender listing rows
    // Note: Selector paths may vary based on APC's actual HTML structure
    const rows = $('table tbody tr, .tender-item, [data-tender]');

    if (rows.length === 0) {
      console.log('[APC] No tender rows found - may need selector adjustment');
      return opportunities;
    }

    rows.each((index, row) => {
      try {
        const $row = $(row);

        // Extract fields - adjust selectors based on actual APC HTML
        const title = $row.find('.tender-title, [data-field="title"]').text().trim();
        const description = $row
          .find('.tender-description, [data-field="description"]')
          .text()
          .trim();
        const category = $row
          .find('.tender-category, [data-field="category"]')
          .text()
          .trim();
        const location = $row
          .find('.tender-location, [data-field="location"]')
          .text()
          .trim();
        const deadlineStr = $row
          .find('.tender-deadline, [data-field="deadline"]')
          .text()
          .trim();
        const documentUrl = $row
          .find('a[href*="document"], a[href*="tender"]')
          .attr('href');
        const contactName = $row
          .find('.contact-name, [data-field="contact-name"]')
          .text()
          .trim();
        const contactEmail = $row
          .find('.contact-email, [data-field="contact-email"]')
          .text()
          .trim();
        const contactPhone = $row
          .find('.contact-phone, [data-field="contact-phone"]')
          .text()
          .trim();
        const estimatedValueStr = $row
          .find('.estimated-value, [data-field="value"]')
          .text()
          .trim();

        // Skip if no title
        if (!title) {
          return;
        }

        // Check if category is relevant
        const isRelevant =
          RELEVANT_CATEGORIES.some((cat) =>
            category.toLowerCase().includes(cat)
          ) ||
          RELEVANT_CATEGORIES.some((cat) =>
            description.toLowerCase().includes(cat)
          ) ||
          RELEVANT_CATEGORIES.some((cat) => title.toLowerCase().includes(cat));

        if (!isRelevant) {
          return;
        }

        // Parse deadline date
        let deadline: Date | undefined;
        if (deadlineStr) {
          const parsed = new Date(deadlineStr);
          if (!isNaN(parsed.getTime())) {
            deadline = parsed;
          }
        }

        // Parse estimated value
        let estimatedValue: number | undefined;
        if (estimatedValueStr) {
          const match = estimatedValueStr.match(/[\d,]+/);
          if (match) {
            estimatedValue = parseInt(match[0].replace(/,/g, ''), 10);
          }
        }

        // Create opportunity record
        const externalId = `APC-${index}-${Date.now()}`;

        opportunities.push({
          externalId,
          source: APC_SOURCE,
          title,
          description,
          category,
          location,
          deadline,
          documentUrl,
          contactName: contactName || undefined,
          contactEmail: contactEmail || undefined,
          contactPhone: contactPhone || undefined,
          estimatedValue,
          publishedAt: new Date(),
        });
      } catch (err) {
        console.error(`[APC] Error parsing row ${index}:`, err);
      }
    });

    console.log(`[APC] Successfully scraped ${opportunities.length} opportunities`);
  } catch (error) {
    console.error('[APC] Scrape failed:', error);
  }

  return opportunities;
}
