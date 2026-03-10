/**
 * Capability matching engine
 * Scores opportunities against WC-CON's capabilities and service area
 */

import {
  RawOpportunity,
  ScoredOpportunity,
} from '../scrapers/types.js';

/**
 * WC-CON service capabilities
 */
const WCCON_CAPABILITIES = [
  'gravel crushing',
  'aggregate supply',
  'trucking',
  'hauling',
  'equipment rental',
  'excavation',
  'site preparation',
  'road construction',
  'landscaping',
  'concrete supply',
  'demolition',
  'waste management',
];

/**
 * Primary service area (home base and core markets)
 */
const PRIMARY_SERVICE_AREA = [
  'Hinton',
  'Edson',
  'Jasper',
  'Grande Cache',
  'Robb',
  'Cadomin',
];

/**
 * Approximate distances from Hinton (km) - used for service area scoring
 */
const DISTANCE_FROM_HINTON: Record<string, number> = {
  Hinton: 0,
  Edson: 80,
  Jasper: 80,
  'Grande Cache': 150,
  Robb: 60,
  Cadomin: 90,
  Whitecourt: 100,
  Drayton Valley: 180,
  'Fox Creek': 120,
};

/**
 * Maximum economical service radius (km)
 */
const MAX_SERVICE_RADIUS = 150;

/**
 * Score a single opportunity against WC-CON's profile
 * @param opportunity Raw opportunity to score
 * @returns Scored opportunity with breakdown and recommendation
 */
export function matchOpportunity(opportunity: RawOpportunity): ScoredOpportunity {
  // Calculate dimension scores
  const serviceMatch = scoreServiceMatch(opportunity);
  const locationMatch = scoreLocationMatch(opportunity);
  const sizeMatch = scoreSizeMatch(opportunity);
  const timelineFit = scoreTimelineFit(opportunity);

  // Calculate weighted overall score
  const matchScore = Math.round(
    serviceMatch * 0.4 +
    locationMatch * 0.25 +
    sizeMatch * 0.2 +
    timelineFit * 0.15
  );

  // Extract capability tags
  const capabilityTags = extractCapabilityTags(opportunity);

  // Determine recommendation
  let recommendedAction: 'pursue' | 'review' | 'archive';
  if (matchScore >= 70) {
    recommendedAction = 'pursue';
  } else if (matchScore >= 40) {
    recommendedAction = 'review';
  } else {
    recommendedAction = 'archive';
  }

  return {
    ...opportunity,
    matchScore,
    scoreBreakdown: {
      serviceMatch,
      locationMatch,
      sizeMatch,
      timelineFit,
    },
    capabilityTags,
    recommendedAction,
  };
}

/**
 * Score how well the opportunity matches WC-CON's service offerings (0-100)
 */
function scoreServiceMatch(opportunity: RawOpportunity): number {
  const text = `${opportunity.title} ${opportunity.description} ${opportunity.category || ''}`.toLowerCase();

  let score = 0;
  let matchCount = 0;

  // Check for capability matches
  for (const capability of WCCON_CAPABILITIES) {
    if (text.includes(capability.toLowerCase())) {
      score += 20;
      matchCount++;
    }
  }

  // Check for specific product matches
  const productKeywords = [
    'gravel',
    'aggregate',
    'rock',
    'sand',
    'stone',
    'crush',
    'truck',
    'excavat',
    'loader',
    'dozer',
    'site prep',
  ];

  for (const keyword of productKeywords) {
    if (text.includes(keyword)) {
      score += 10;
    }
  }

  // Cap at 100
  return Math.min(score, 100);
}

/**
 * Score geographic suitability (0-100)
 */
function scoreLocationMatch(opportunity: RawOpportunity): number {
  const location = opportunity.location?.toLowerCase() || '';

  // Check for primary service area match
  for (const area of PRIMARY_SERVICE_AREA) {
    if (location.includes(area.toLowerCase())) {
      return 100; // Perfect match
    }
  }

  // Check if location is in secondary area (within 150km)
  for (const [city, distance] of Object.entries(DISTANCE_FROM_HINTON)) {
    if (location.includes(city.toLowerCase()) && distance <= MAX_SERVICE_RADIUS) {
      return 75; // Good match but not primary area
    }
  }

  // Check for Alberta mention
  if (location.includes('alberta') || location.includes('ab')) {
    return 40; // Possible but distance unknown
  }

  // Unknown or out of area
  return 0;
}

/**
 * Score project size alignment with WC-CON capacity (0-100)
 */
function scoreSizeMatch(opportunity: RawOpportunity): number {
  // WC-CON can handle projects from small maintenance to large construction
  // Estimated value range: ideal $50K-$500K, capable up to $2M

  if (!opportunity.estimatedValue) {
    return 50; // No value data - neutral scoring
  }

  const value = opportunity.estimatedValue;

  if (value >= 50000 && value <= 500000) {
    return 100; // Sweet spot
  } else if (value >= 25000 && value <= 1000000) {
    return 80; // Still good
  } else if (value >= 10000 && value <= 2000000) {
    return 60; // Possible but not ideal
  } else if (value > 2000000) {
    return 30; // Large but possibly out of scope
  } else {
    return 40; // Very small or unclear
  }
}

/**
 * Score timeline fit for execution (0-100)
 * Considers deadline vs current date
 */
function scoreTimelineFit(opportunity: RawOpportunity): number {
  if (!opportunity.deadline) {
    return 50; // No deadline - neutral
  }

  const now = new Date();
  const daysUntilDeadline = Math.floor(
    (opportunity.deadline.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
  );

  // Need at least 7 days to submit
  if (daysUntilDeadline < 7) {
    return 20; // Not enough time
  }

  // 7-14 days: tight but doable
  if (daysUntilDeadline < 14) {
    return 60;
  }

  // 14-30 days: good timeline
  if (daysUntilDeadline < 30) {
    return 90;
  }

  // 30+ days: plenty of time
  return 100;
}

/**
 * Extract relevant capability tags from opportunity text
 */
function extractCapabilityTags(opportunity: RawOpportunity): string[] {
  const text = `${opportunity.title} ${opportunity.description} ${opportunity.category || ''}`.toLowerCase();
  const tags: string[] = [];

  const tagMap: Record<string, string[]> = {
    'gravel_crushing': ['crush', 'crushing', 'mobile crusher'],
    'aggregate_supply': ['aggregate', 'gravel', 'rock', 'sand'],
    'trucking': ['truck', 'haul', 'delivery', 'transport'],
    'equipment_rental': ['excavat', 'loader', 'dozer', 'rental', 'rent'],
    'site_prep': ['site prep', 'site preparation', 'clear', 'excavat'],
    'road_work': ['road', 'highway', 'asphalt', 'paving'],
    'landscaping': ['landscape', 'topsoil', 'decorative'],
    'concrete': ['concrete', 'cement', 'blocks', 'lego blocks'],
  };

  for (const [tag, keywords] of Object.entries(tagMap)) {
    if (keywords.some((kw) => text.includes(kw))) {
      tags.push(tag);
    }
  }

  return tags;
}
