/**
 * Shared type definitions for the opportunity scanner service
 */

export type OpportunitySource =
  | 'APC'
  | 'MERX'
  | 'CONSTRUCT_CONNECT'
  | 'MUNICIPAL'
  | 'ALBERTA_GOV';

/**
 * Raw opportunity data extracted from web sources
 */
export interface RawOpportunity {
  /** Unique identifier from the source */
  externalId: string;

  /** Source where the opportunity was found */
  source: OpportunitySource;

  /** Project or tender title */
  title: string;

  /** Full description or summary */
  description: string;

  /** Category or type (e.g., 'Road Construction', 'Landscaping') */
  category?: string;

  /** Geographic location of the project */
  location?: string;

  /** Estimated project value in CAD */
  estimatedValue?: number;

  /** Tender deadline date */
  deadline?: Date;

  /** When the opportunity was published */
  publishedAt?: Date;

  /** URL to full tender documents */
  documentUrl?: string;

  /** Contact person name */
  contactName?: string;

  /** Contact email address */
  contactEmail?: string;

  /** Contact phone number */
  contactPhone?: string;

  /** Raw HTML content (for debugging/fallback) */
  rawHtml?: string;
}

/**
 * Opportunity after scoring and matching against WC-CON capabilities
 */
export interface ScoredOpportunity extends RawOpportunity {
  /** Overall match score from 0-100 */
  matchScore: number;

  /** Breakdown of score across dimensions */
  scoreBreakdown: {
    /** How well it matches WC-CON's services (0-100) */
    serviceMatch: number;

    /** Geographic proximity score (0-100) */
    locationMatch: number;

    /** Project size alignment with WC-CON capacity (0-100) */
    sizeMatch: number;

    /** Timeline fit for execution (0-100) */
    timelineFit: number;
  };

  /** Capabilities that match this opportunity */
  capabilityTags: string[];

  /** Recommended action for sales team */
  recommendedAction: 'pursue' | 'review' | 'archive';
}

/**
 * Score tier classification
 */
export type ScoreTier = 'strong_match' | 'worth_reviewing' | 'low_match';

/**
 * Opportunity grouped by tier for digest display
 */
export interface OpportunitiesByTier {
  strong_match: ScoredOpportunity[];
  worth_reviewing: ScoredOpportunity[];
  low_match: ScoredOpportunity[];
}
