/**
 * Daily digest generator and sender
 * Generates email digests and queues for delivery
 */

import { ScoredOpportunity, OpportunitiesByTier } from '../scrapers/types.js';
import { runScan } from './scan.js';

/**
 * Main digest command
 * Runs scan, generates digest, and queues for sending
 */
export async function generateAndSendDigest(): Promise<void> {
  console.log('\n' + '='.repeat(60));
  console.log('WC-CON Opportunity Digest - Generation Started');
  console.log(`Time: ${new Date().toISOString()}`);
  console.log('='.repeat(60));

  try {
    // Run scan to get latest opportunities
    const scanResult = await runScan();
    const { scoredOpportunities, summary } = scanResult;

    // Generate digest
    const digestHTML = generateDigest(scoredOpportunities);

    // TODO: Send via email using SendGrid API
    // const recipientEmail = process.env.DIGEST_RECIPIENT || 'todd@wccon.com';
    // await sendEmail({
    //   to: recipientEmail,
    //   subject: `WC-CON Opportunities - ${summary.strongMatches} Strong Matches`,
    //   html: digestHTML,
    // });

    console.log('\n[DIGEST] Email digest generated successfully');
    console.log(
      `[DIGEST] Would send to: ${process.env.DIGEST_RECIPIENT || 'todd@wccon.com'}`
    );
    console.log(
      `[DIGEST] Contains: ${summary.strongMatches} strong matches, ${summary.worthReviewing} to review`
    );

    // Also log the digest to stdout for inspection
    if (process.env.DEBUG) {
      console.log('\n' + '-'.repeat(60));
      console.log('DIGEST PREVIEW');
      console.log('-'.repeat(60));
      console.log(digestHTML.substring(0, 500) + '...');
      console.log('-'.repeat(60));
    }
  } catch (error) {
    console.error('[DIGEST] Failed to generate digest:', error);
    throw error;
  }
}

/**
 * Generate email digest from scored opportunities
 * Groups by tier and formats as readable HTML
 * @param opportunities Array of scored opportunities
 * @returns Formatted HTML string ready for email
 */
export function generateDigest(opportunities: ScoredOpportunity[]): string {
  // Group opportunities by tier
  const byTier = groupOpportunitiesByTier(opportunities);

  // Generate HTML
  const html = buildDigestHTML(byTier);

  return html;
}

/**
 * Group opportunities into tiers based on match score
 */
function groupOpportunitiesByTier(
  opportunities: ScoredOpportunity[]
): OpportunitiesByTier {
  const grouped: OpportunitiesByTier = {
    strong_match: [],
    worth_reviewing: [],
    low_match: [],
  };

  for (const opp of opportunities) {
    if (opp.matchScore >= 70) {
      grouped.strong_match.push(opp);
    } else if (opp.matchScore >= 40) {
      grouped.worth_reviewing.push(opp);
    } else {
      grouped.low_match.push(opp);
    }
  }

  // Sort each tier by score descending
  grouped.strong_match.sort((a, b) => b.matchScore - a.matchScore);
  grouped.worth_reviewing.sort((a, b) => b.matchScore - a.matchScore);
  grouped.low_match.sort((a, b) => b.matchScore - a.matchScore);

  return grouped;
}

/**
 * Build the HTML digest
 */
function buildDigestHTML(byTier: OpportunitiesByTier): string {
  const now = new Date();
  const dateStr = now.toLocaleDateString('en-CA', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  let html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>WC-CON Opportunity Digest</title>
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      max-width: 900px;
      margin: 0 auto;
      padding: 20px;
      background-color: #f5f5f5;
      color: #333;
    }
    .header {
      background: linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%);
      color: white;
      padding: 30px;
      border-radius: 8px;
      margin-bottom: 30px;
    }
    .header h1 {
      margin: 0 0 10px 0;
      font-size: 28px;
    }
    .header p {
      margin: 0;
      opacity: 0.95;
    }
    .summary {
      background: white;
      padding: 20px;
      border-radius: 8px;
      margin-bottom: 30px;
      border-left: 4px solid #1e40af;
    }
    .summary h2 {
      margin: 0 0 15px 0;
      font-size: 18px;
      color: #1e40af;
    }
    .summary-stats {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 15px;
    }
    .stat {
      text-align: center;
      padding: 15px;
      background: #f9fafb;
      border-radius: 6px;
    }
    .stat-number {
      font-size: 28px;
      font-weight: bold;
      color: #1e40af;
    }
    .stat-label {
      font-size: 12px;
      color: #666;
      margin-top: 5px;
    }
    .tier {
      margin-bottom: 30px;
    }
    .tier-header {
      display: flex;
      align-items: center;
      margin-bottom: 15px;
      padding-bottom: 10px;
      border-bottom: 2px solid #e5e7eb;
    }
    .tier-title {
      font-size: 18px;
      font-weight: 600;
      flex: 1;
    }
    .tier-count {
      background: #e5e7eb;
      color: #374151;
      padding: 4px 12px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 500;
    }
    .strong-match .tier-title {
      color: #059669;
    }
    .strong-match .tier-count {
      background: #d1fae5;
      color: #047857;
    }
    .worth-reviewing .tier-title {
      color: #d97706;
    }
    .worth-reviewing .tier-count {
      background: #fef3c7;
      color: #b45309;
    }
    .low-match .tier-title {
      color: #6b7280;
    }
    .opportunity {
      background: white;
      padding: 20px;
      margin-bottom: 15px;
      border-radius: 6px;
      border-left: 4px solid #e5e7eb;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    }
    .strong-match .opportunity {
      border-left-color: #059669;
    }
    .worth-reviewing .opportunity {
      border-left-color: #d97706;
    }
    .low-match .opportunity {
      border-left-color: #9ca3af;
    }
    .opp-header {
      display: flex;
      justify-content: space-between;
      align-items: start;
      margin-bottom: 10px;
    }
    .opp-title {
      font-size: 16px;
      font-weight: 600;
      color: #1f2937;
      flex: 1;
      margin-right: 10px;
    }
    .opp-score {
      background: #e5e7eb;
      color: #1f2937;
      padding: 6px 12px;
      border-radius: 4px;
      font-size: 13px;
      font-weight: 600;
      white-space: nowrap;
    }
    .strong-match .opp-score {
      background: #d1fae5;
      color: #047857;
    }
    .worth-reviewing .opp-score {
      background: #fef3c7;
      color: #b45309;
    }
    .opp-meta {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 10px;
      margin-bottom: 10px;
      font-size: 13px;
      color: #666;
    }
    .opp-meta-item {
      display: flex;
      align-items: center;
    }
    .opp-meta-label {
      font-weight: 500;
      margin-right: 5px;
    }
    .opp-description {
      font-size: 13px;
      line-height: 1.5;
      color: #555;
      margin-bottom: 10px;
    }
    .opp-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 10px;
      border-top: 1px solid #e5e7eb;
      font-size: 12px;
    }
    .opp-tags {
      display: flex;
      gap: 5px;
      flex-wrap: wrap;
    }
    .tag {
      background: #f3f4f6;
      color: #374151;
      padding: 2px 8px;
      border-radius: 3px;
      font-size: 11px;
    }
    .opp-action {
      font-weight: 600;
      padding: 4px 8px;
      border-radius: 3px;
    }
    .pursue {
      background: #d1fae5;
      color: #047857;
    }
    .review {
      background: #fef3c7;
      color: #b45309;
    }
    .archive {
      background: #f3f4f6;
      color: #6b7280;
    }
    .empty-state {
      background: white;
      padding: 30px;
      text-align: center;
      border-radius: 6px;
      color: #999;
    }
    .footer {
      background: #f3f4f6;
      padding: 20px;
      border-radius: 6px;
      margin-top: 30px;
      font-size: 12px;
      color: #666;
      text-align: center;
    }
    a {
      color: #1e40af;
      text-decoration: none;
    }
    a:hover {
      text-decoration: underline;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>WC-CON Opportunity Digest</h1>
    <p>${dateStr}</p>
  </div>

  <div class="summary">
    <h2>Daily Summary</h2>
    <div class="summary-stats">
      <div class="stat">
        <div class="stat-number">${byTier.strong_match.length}</div>
        <div class="stat-label">Strong Matches</div>
      </div>
      <div class="stat">
        <div class="stat-number">${byTier.worth_reviewing.length}</div>
        <div class="stat-label">Worth Reviewing</div>
      </div>
      <div class="stat">
        <div class="stat-number">${byTier.strong_match.length + byTier.worth_reviewing.length + byTier.low_match.length}</div>
        <div class="stat-label">Total Opportunities</div>
      </div>
    </div>
  </div>
`;

  // Strong matches
  if (byTier.strong_match.length > 0) {
    html += buildTierSection(
      byTier.strong_match,
      'Strong Matches',
      'strong-match'
    );
  }

  // Worth reviewing
  if (byTier.worth_reviewing.length > 0) {
    html += buildTierSection(
      byTier.worth_reviewing,
      'Worth Reviewing',
      'worth-reviewing'
    );
  }

  // Low match (optional - only show if < 20)
  if (byTier.low_match.length > 0 && byTier.low_match.length <= 20) {
    html += buildTierSection(
      byTier.low_match,
      'Low Match Opportunities',
      'low-match'
    );
  }

  // Footer
  html += `
  <div class="footer">
    <p>This digest was auto-generated by the WC-CON Opportunity Scanner.</p>
    <p>For questions or to adjust filtering, contact your system administrator.</p>
  </div>

</body>
</html>
`;

  return html;
}

/**
 * Build HTML for a tier section
 */
function buildTierSection(
  opportunities: ScoredOpportunity[],
  title: string,
  tierClass: string
): string {
  let html = `
  <div class="tier ${tierClass}">
    <div class="tier-header">
      <div class="tier-title">${title}</div>
      <div class="tier-count">${opportunities.length} opportunity${opportunities.length === 1 ? '' : 'ies'}</div>
    </div>
`;

  for (const opp of opportunities) {
    const deadlineStr = opp.deadline
      ? formatDeadline(opp.deadline)
      : 'No deadline';
    const locationDisplay = opp.location || 'Unknown location';
    const valueDisplay = opp.estimatedValue
      ? `$${formatCurrency(opp.estimatedValue)}`
      : 'Value TBD';

    html += `
    <div class="opportunity">
      <div class="opp-header">
        <div class="opp-title">${escapeHtml(opp.title)}</div>
        <div class="opp-score">${opp.matchScore}%</div>
      </div>
      <div class="opp-meta">
        <div class="opp-meta-item">
          <span class="opp-meta-label">Location:</span> ${escapeHtml(locationDisplay)}
        </div>
        <div class="opp-meta-item">
          <span class="opp-meta-label">Deadline:</span> ${deadlineStr}
        </div>
        <div class="opp-meta-item">
          <span class="opp-meta-label">Value:</span> ${valueDisplay}
        </div>
      </div>
      <div class="opp-description">${escapeHtml(truncateText(opp.description, 200))}</div>
      <div class="opp-footer">
        <div class="opp-tags">
          ${opp.capabilityTags.map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join('')}
        </div>
        <div class="opp-action ${opp.recommendedAction}">${opp.recommendedAction.toUpperCase()}</div>
      </div>
    </div>
`;
  }

  html += `</div>`;
  return html;
}

/**
 * Format deadline as relative time (e.g., "in 5 days")
 */
function formatDeadline(date: Date): string {
  const now = new Date();
  const daysUntil = Math.floor(
    (date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (daysUntil < 0) {
    return 'EXPIRED';
  } else if (daysUntil === 0) {
    return 'Today';
  } else if (daysUntil === 1) {
    return 'Tomorrow';
  } else if (daysUntil <= 7) {
    return `in ${daysUntil} days`;
  } else {
    return date.toLocaleDateString('en-CA');
  }
}

/**
 * Format currency for display
 */
function formatCurrency(value: number): string {
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1)}M`;
  } else if (value >= 1000) {
    return `${(value / 1000).toFixed(0)}K`;
  }
  return value.toString();
}

/**
 * Truncate text to a maximum length
 */
function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) {
    return text;
  }
  return text.substring(0, maxLength) + '...';
}

/**
 * Escape HTML special characters
 */
function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (char) => map[char]);
}

// Run digest generation when executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  generateAndSendDigest().catch((error) => {
    console.error('Digest generation failed:', error);
    process.exit(1);
  });
}

export default generateAndSendDigest;
