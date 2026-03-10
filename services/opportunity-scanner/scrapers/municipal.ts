/**
 * Municipal website scraper
 * Fetches RFPs and tenders from local municipal procurement pages
 */

import fetch from 'node-fetch';
import * as cheerio from 'cheerio';
import { RawOpportunity } from './types.js';

const MUNICIPAL_SOURCES = [
  {
    name: 'Town of Hinton',
    url: 'https://www.hinton.ca/tenders',
    selector: '.tender-item, [data-tender]',
  },
  {
    name: 'Yellowhead County',
    url: 'https://www.county.yellowhead.ab.ca/tenders',
    selector: '.opportunity-row, .tender, [data-tender]',
  },
  {
    name: 'Town of Edson',
    url: 'https://www.edson.ca/business/tenders',
    selector: '.tender-listing, [data-opportunity]',
  },
];

/**
 * Scrapes tender from Town of Hinton procurement page
 */
async function scrapeHinton(): Promise<RawOpportunity[]> {
  const opportunities: RawOpportunity[] = [];

  try {
    console.log('[MUNICIPAL] Fetching Town of Hinton tenders');
    const source = MUNICIPAL_SOURCES[0];

    const response = await fetch(source.url, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const html = await response.text();
    const $ = cheerio.load(html);
    const rows = $(source.selector);

    rows.each((index, row) => {
      try {
        const $row = $(row);
        const title = $row.find('.title, h3, [data-field="title"]').text().trim();
        const description = $row
          .find('.description, [data-field="description"]')
          .text()
          .trim();
        const deadlineStr = $row
          .find('.deadline, [data-field="deadline"]')
          .text()
          .trim();
        const documentUrl = $row.find('a[href*="pdf"], a[href*="document"]').attr('href');

        if (!title) return;

        let deadline: Date | undefined;
        if (deadlineStr) {
          const parsed = new Date(deadlineStr);
          if (!isNaN(parsed.getTime())) {
            deadline = parsed;
          }
        }

        opportunities.push({
          externalId: `HINTON-${index}-${Date.now()}`,
          source: 'MUNICIPAL',
          title,
          description,
          location: 'Hinton',
          deadline,
          documentUrl,
          publishedAt: new Date(),
        });
      } catch (err) {
        console.error(`[HINTON] Error parsing row:`, err);
      }
    });

    console.log(`[HINTON] Found ${opportunities.length} opportunities`);
  } catch (error) {
    console.error('[HINTON] Scrape failed:', error);
  }

  return opportunities;
}

/**
 * Scrapes tenders from Yellowhead County procurement page
 */
async function scrapeYellowheadCounty(): Promise<RawOpportunity[]> {
  const opportunities: RawOpportunity[] = [];

  try {
    console.log('[MUNICIPAL] Fetching Yellowhead County tenders');
    const source = MUNICIPAL_SOURCES[1];

    const response = await fetch(source.url, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const html = await response.text();
    const $ = cheerio.load(html);
    const rows = $(source.selector);

    rows.each((index, row) => {
      try {
        const $row = $(row);
        const title = $row.find('.title, h3, [data-field="title"]').text().trim();
        const description = $row
          .find('.description, [data-field="description"]')
          .text()
          .trim();
        const deadlineStr = $row
          .find('.deadline, [data-field="deadline"]')
          .text()
          .trim();
        const documentUrl = $row.find('a[href*="pdf"], a[href*="document"]').attr('href');
        const contactName = $row.find('.contact, [data-field="contact"]').text().trim();

        if (!title) return;

        let deadline: Date | undefined;
        if (deadlineStr) {
          const parsed = new Date(deadlineStr);
          if (!isNaN(parsed.getTime())) {
            deadline = parsed;
          }
        }

        opportunities.push({
          externalId: `YELLOWHEAD-${index}-${Date.now()}`,
          source: 'MUNICIPAL',
          title,
          description,
          location: 'Yellowhead County',
          deadline,
          documentUrl,
          contactName: contactName || undefined,
          publishedAt: new Date(),
        });
      } catch (err) {
        console.error(`[YELLOWHEAD] Error parsing row:`, err);
      }
    });

    console.log(`[YELLOWHEAD] Found ${opportunities.length} opportunities`);
  } catch (error) {
    console.error('[YELLOWHEAD] Scrape failed:', error);
  }

  return opportunities;
}

/**
 * Scrapes tenders from Town of Edson procurement page
 */
async function scrapeEdson(): Promise<RawOpportunity[]> {
  const opportunities: RawOpportunity[] = [];

  try {
    console.log('[MUNICIPAL] Fetching Town of Edson tenders');
    const source = MUNICIPAL_SOURCES[2];

    const response = await fetch(source.url, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const html = await response.text();
    const $ = cheerio.load(html);
    const rows = $(source.selector);

    rows.each((index, row) => {
      try {
        const $row = $(row);
        const title = $row.find('.title, h3, [data-field="title"]').text().trim();
        const description = $row
          .find('.description, [data-field="description"]')
          .text()
          .trim();
        const deadlineStr = $row
          .find('.deadline, [data-field="deadline"]')
          .text()
          .trim();
        const documentUrl = $row.find('a[href*="pdf"], a[href*="document"]').attr('href');

        if (!title) return;

        let deadline: Date | undefined;
        if (deadlineStr) {
          const parsed = new Date(deadlineStr);
          if (!isNaN(parsed.getTime())) {
            deadline = parsed;
          }
        }

        opportunities.push({
          externalId: `EDSON-${index}-${Date.now()}`,
          source: 'MUNICIPAL',
          title,
          description,
          location: 'Edson',
          deadline,
          documentUrl,
          publishedAt: new Date(),
        });
      } catch (err) {
        console.error(`[EDSON] Error parsing row:`, err);
      }
    });

    console.log(`[EDSON] Found ${opportunities.length} opportunities`);
  } catch (error) {
    console.error('[EDSON] Scrape failed:', error);
  }

  return opportunities;
}

/**
 * Main function to scrape all municipal sources
 * @returns Combined array of opportunities from all municipal sources
 */
export async function scrapeMunicipal(): Promise<RawOpportunity[]> {
  console.log('[MUNICIPAL] Starting municipal tender scrape');

  const [hinton, yellowhead, edson] = await Promise.all([
    scrapeHinton(),
    scrapeYellowheadCounty(),
    scrapeEdson(),
  ]);

  const allOpportunities = [...hinton, ...yellowhead, ...edson];
  console.log(
    `[MUNICIPAL] Completed scraping: ${allOpportunities.length} total opportunities`
  );

  return allOpportunities;
}
