import { getAnthropicClient } from '../client';

/**
 * Raw opportunity data for scoring
 */
export interface RawOpportunity {
  title: string;
  description: string;
  location: string;
  estimatedValue?: number;
  timeline?: string;
  requirements?: string[];
  contactName?: string;
  contactEmail?: string;
  source?: string;
}

/**
 * Score breakdown for an opportunity
 */
export interface ScoreBreakdown {
  serviceMatch: number;
  locationMatch: number;
  sizeMatch: number;
  timelineFit: number;
}

/**
 * Recommended action for the opportunity
 */
export type RecommendedAction = 'pursue' | 'consider' | 'pass' | 'research';

/**
 * Scored opportunity with analysis
 */
export interface OpportunityScore {
  totalScore: number;
  breakdown: ScoreBreakdown;
  summary: string;
  recommendedAction: RecommendedAction;
  keyStrengths: string[];
  concerns: string[];
}

/**
 * Scores an opportunity against company capabilities using Claude.
 * Analyzes service match, location fit, size appropriateness, and timeline compatibility.
 *
 * @param opportunity - The raw opportunity data
 * @param capabilities - List of company capability tags
 * @returns {Promise<OpportunityScore>} Scored opportunity with recommendations
 * @throws {Error} If the API call fails
 */
export async function scoreOpportunity(
  opportunity: RawOpportunity,
  capabilities: string[]
): Promise<OpportunityScore> {
  const client = getAnthropicClient();

  const capabilitiesList = capabilities.join(', ');

  const prompt = `You are an opportunity analysis system for West Central Contracting LTD.

Analyze the following opportunity and score it based on our company capabilities.

OPPORTUNITY:
Title: ${opportunity.title}
Description: ${opportunity.description}
Location: ${opportunity.location}
Estimated Value: ${opportunity.estimatedValue ? `$${opportunity.estimatedValue.toLocaleString()}` : 'Unknown'}
Timeline: ${opportunity.timeline || 'Not specified'}
${opportunity.requirements ? `Requirements: ${opportunity.requirements.join(', ')}` : ''}
Contact: ${opportunity.contactName || 'Not provided'}

OUR CAPABILITIES:
${capabilitiesList}

Please score this opportunity on these dimensions (0-max points each):

1. SERVICE MATCH (0-40): How well do our services match the opportunity requirements?
2. LOCATION MATCH (0-25): How accessible is the location from Hinton, Alberta?
3. SIZE MATCH (0-20): Is the project size appropriate for us?
4. TIMELINE FIT (0-15): Can we accommodate the timeline?

Return a JSON object with this structure:
{
  "serviceMatch": number (0-40),
  "locationMatch": number (0-25),
  "sizeMatch": number (0-20),
  "timelineFit": number (0-15),
  "summary": "One paragraph analysis of the opportunity",
  "recommendedAction": "pursue|consider|pass|research",
  "keyStrengths": ["strength 1", "strength 2"],
  "concerns": ["concern 1", "concern 2"]
}

Base your scoring on:
- Service match: relevance to our services
- Location: distance from Hinton, Alberta (western Alberta is ideal)
- Size: project value alignment with our typical projects
- Timeline: feasibility given standard project timelines
- Recommended action: pursue (excellent fit), consider (good potential), research (needs investigation), or pass (poor fit)

Be objective and realistic in your assessment.`;

  try {
    const response = await client.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 1024,
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
    let scored;
    try {
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('No JSON found in response');
      }
      scored = JSON.parse(jsonMatch[0]);
    } catch {
      // Fallback scoring
      scored = {
        serviceMatch: 15,
        locationMatch: 10,
        sizeMatch: 8,
        timelineFit: 6,
        summary: 'Unable to fully assess opportunity. Manual review recommended.',
        recommendedAction: 'research',
        keyStrengths: [],
        concerns: ['Could not extract full details from opportunity description'],
      };
    }

    const totalScore =
      (scored.serviceMatch || 0) +
      (scored.locationMatch || 0) +
      (scored.sizeMatch || 0) +
      (scored.timelineFit || 0);

    return {
      totalScore: Math.min(100, totalScore),
      breakdown: {
        serviceMatch: Math.max(0, Math.min(40, scored.serviceMatch || 0)),
        locationMatch: Math.max(0, Math.min(25, scored.locationMatch || 0)),
        sizeMatch: Math.max(0, Math.min(20, scored.sizeMatch || 0)),
        timelineFit: Math.max(0, Math.min(15, scored.timelineFit || 0)),
      },
      summary: scored.summary || 'Analysis unavailable',
      recommendedAction: normalizeAction(
        scored.recommendedAction || 'research'
      ),
      keyStrengths: scored.keyStrengths || [],
      concerns: scored.concerns || [],
    };
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Opportunity scoring error: ${error.message}`);
    }
    throw error;
  }
}

/**
 * Normalizes recommended action string
 */
function normalizeAction(action: string): RecommendedAction {
  const lower = action.toLowerCase().trim();
  if (lower.includes('pursue')) return 'pursue';
  if (lower.includes('consider')) return 'consider';
  if (lower.includes('research')) return 'research';
  if (lower.includes('pass')) return 'pass';
  return 'research';
}
