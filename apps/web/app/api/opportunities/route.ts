import { NextRequest, NextResponse } from 'next/server';
import {
  scoreOpportunity,
  type RawOpportunity,
  type OpportunityScore,
} from '@wccon/ai';

/**
 * Opportunity query parameters
 */
export interface OpportunityQueryParams {
  filter?: 'all' | 'pursue' | 'consider' | 'research' | 'pass';
  minScore?: number;
  limit?: number;
  offset?: number;
}

/**
 * Opportunity with score
 */
export interface ScoredOpportunity extends RawOpportunity {
  score: OpportunityScore;
  scoredAt: string;
}

/**
 * Opportunities list response
 */
export interface OpportunitiesResponse {
  success: boolean;
  opportunities?: ScoredOpportunity[];
  total?: number;
  hasMore?: boolean;
  error?: string;
}

/**
 * GET /api/opportunities
 *
 * Retrieves and scores business opportunities.
 * Returns matched opportunities from the database with AI-generated scores.
 *
 * @param request - NextRequest with query parameters
 * @returns {Promise<NextResponse>} List of opportunities with scores
 */
export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(request.url);

    // Parse query parameters
    const filter = (searchParams.get('filter') || 'all') as
      | 'all'
      | 'pursue'
      | 'consider'
      | 'research'
      | 'pass';
    const minScore = parseInt(searchParams.get('minScore') || '0');
    const limit = Math.min(parseInt(searchParams.get('limit') || '20'), 100);
    const offset = parseInt(searchParams.get('offset') || '0');

    // Validate parameters
    if (minScore < 0 || minScore > 100) {
      return NextResponse.json(
        {
          success: false,
          error: 'minScore must be between 0 and 100',
        } as OpportunitiesResponse,
        { status: 400 }
      );
    }

    // TODO: Fetch opportunities from database
    // Example:
    // const [opportunities, total] = await Promise.all([
    //   db.opportunities.findMany({
    //     where: {
    //       status: 'open',
    //       OR: [
    //         { location: { contains: 'Alberta' } },
    //         { location: { contains: 'western Canada' } },
    //       ],
    //     },
    //     take: limit,
    //     skip: offset,
    //     orderBy: { createdAt: 'desc' },
    //   }),
    //   db.opportunities.count({
    //     where: { status: 'open' },
    //   }),
    // ]);

    // Company capabilities for scoring
    const companyCapabilities = [
      'aggregate_supply',
      'trucking',
      'excavation',
      'material_delivery',
      'site_preparation',
      'equipment_rental',
      'concrete_aggregates',
      'landscape_materials',
    ];

    // TODO: Score opportunities and apply filters
    // Example:
    // const scoredOpportunities: ScoredOpportunity[] = await Promise.all(
    //   opportunities.map(async (opp) => {
    //     const score = await scoreOpportunity(
    //       {
    //         title: opp.title,
    //         description: opp.description,
    //         location: opp.location,
    //         estimatedValue: opp.estimatedValue,
    //         timeline: opp.timeline,
    //         requirements: opp.requirements,
    //         contactName: opp.contactName,
    //         contactEmail: opp.contactEmail,
    //       },
    //       companyCapabilities
    //     );
    //     return {
    //       ...opp,
    //       score,
    //       scoredAt: new Date().toISOString(),
    //     };
    //   })
    // );

    // TODO: Apply filters
    // const filtered = scoredOpportunities.filter((opp) => {
    //   if (filter !== 'all' && opp.score.recommendedAction !== filter) {
    //     return false;
    //   }
    //   if (opp.score.totalScore < minScore) {
    //     return false;
    //   }
    //   return true;
    // });

    // For now, return empty list with message
    console.log(
      'Opportunities API called with filters:',
      { filter, minScore, limit, offset }
    );

    return NextResponse.json(
      {
        success: true,
        opportunities: [],
        total: 0,
        hasMore: false,
        message: 'Opportunity scoring and retrieval not yet implemented',
      } as OpportunitiesResponse,
      { status: 200 }
    );
  } catch (error) {
    console.error('Error retrieving opportunities:', error);

    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error occurred';

    return NextResponse.json(
      {
        success: false,
        error: `Failed to retrieve opportunities: ${errorMessage}`,
      } as OpportunitiesResponse,
      { status: 500 }
    );
  }
}

/**
 * POST /api/opportunities
 *
 * Scores a single opportunity against company capabilities.
 *
 * @param request - NextRequest with RawOpportunity in body
 * @returns {Promise<NextResponse>} Scored opportunity
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    // Parse request body
    const body = (await request.json()) as RawOpportunity;

    // Validate required fields
    const errors: string[] = [];

    if (!body.title || body.title.trim().length === 0) {
      errors.push('Opportunity title is required');
    }

    if (!body.description || body.description.trim().length === 0) {
      errors.push('Opportunity description is required');
    }

    if (!body.location || body.location.trim().length === 0) {
      errors.push('Opportunity location is required');
    }

    if (errors.length > 0) {
      return NextResponse.json(
        {
          success: false,
          error: errors.join('; '),
        },
        { status: 400 }
      );
    }

    // Company capabilities for scoring
    const companyCapabilities = [
      'aggregate_supply',
      'trucking',
      'excavation',
      'material_delivery',
      'site_preparation',
      'equipment_rental',
      'concrete_aggregates',
      'landscape_materials',
    ];

    // Score the opportunity
    const score = await scoreOpportunity(
      {
        title: body.title,
        description: body.description,
        location: body.location,
        estimatedValue: body.estimatedValue,
        timeline: body.timeline,
        requirements: body.requirements,
        contactName: body.contactName,
        contactEmail: body.contactEmail,
      },
      companyCapabilities
    );

    const scoredOpportunity: ScoredOpportunity = {
      ...body,
      score,
      scoredAt: new Date().toISOString(),
    };

    console.log(`Scored opportunity "${body.title}":`, {
      totalScore: score.totalScore,
      recommendation: score.recommendedAction,
    });

    // Return scored opportunity
    return NextResponse.json(
      {
        success: true,
        opportunities: [scoredOpportunity],
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error scoring opportunity:', error);

    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error occurred';

    return NextResponse.json(
      {
        success: false,
        error: `Failed to score opportunity: ${errorMessage}`,
      },
      { status: 500 }
    );
  }
}

/**
 * OPTIONS /api/opportunities
 * CORS preflight handling
 */
export async function OPTIONS(): Promise<NextResponse> {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
