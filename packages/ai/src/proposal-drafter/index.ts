import { getAnthropicClient } from '../client';

/**
 * Company profile information
 */
export interface CompanyProfile {
  name: string;
  description: string;
  yearsFounded: number;
  location: string;
  serviceAreas: string[];
  capabilities: string[];
  certifications?: string[];
  safetyRecords?: {
    year: number;
    incidents: number;
    rating: string;
  }[];
  references?: {
    clientName: string;
    project: string;
    contact: string;
  }[];
}

/**
 * Opportunity details for proposal
 */
export interface OpportunityData {
  projectName: string;
  projectDescription: string;
  clientName: string;
  contractValue: number;
  scope: string[];
  timeline: string;
  location: string;
  requirements: string[];
  deadline?: string;
}

/**
 * Sections of a drafted proposal
 */
export interface ProposalDraft {
  coverLetter: string;
  executiveSummary: string;
  approach: string;
  qualifications: string;
  safetyRecord: string;
  references: string;
  pricingOutline: string;
  fullProposal: string;
}

/**
 * Drafts a professional RFP proposal using Claude.
 * Creates a comprehensive proposal with all required sections.
 *
 * @param opportunity - The opportunity details
 * @param companyProfile - The company profile data
 * @returns {Promise<ProposalDraft>} Structured proposal draft
 * @throws {Error} If the API call fails
 */
export async function draftProposal(
  opportunity: OpportunityData,
  companyProfile: CompanyProfile
): Promise<ProposalDraft> {
  const client = getAnthropicClient();

  const capabilitiesList = companyProfile.capabilities.join(', ');
  const serviceAreasList = companyProfile.serviceAreas.join(', ');
  const scopeList = opportunity.scope.join('\n  - ');
  const requirementsList = opportunity.requirements.join('\n  - ');

  const referencesText =
    companyProfile.references && companyProfile.references.length > 0
      ? companyProfile.references
          .map(
            (ref) =>
              `${ref.clientName}: ${ref.project} (Contact: ${ref.contact})`
          )
          .join('\n')
      : 'References available upon request';

  const safetyText =
    companyProfile.safetyRecords && companyProfile.safetyRecords.length > 0
      ? companyProfile.safetyRecords
          .map(
            (record) =>
              `${record.year}: ${record.incidents} incidents, Rating: ${record.rating}`
          )
          .join('\n')
      : 'Exemplary safety record maintained';

  const prompt = `You are a professional proposal writer for ${companyProfile.name}, a leading ${companyProfile.description}.

Generate a professional RFP proposal response for the following opportunity:

PROJECT DETAILS:
Project Name: ${opportunity.projectName}
Description: ${opportunity.projectDescription}
Client: ${opportunity.clientName}
Contract Value: $${opportunity.contractValue.toLocaleString()}
Location: ${opportunity.location}
Timeline: ${opportunity.timeline}
${opportunity.deadline ? `Deadline: ${opportunity.deadline}` : ''}

PROJECT SCOPE:
  - ${scopeList}

REQUIREMENTS:
  - ${requirementsList}

COMPANY INFORMATION:
Name: ${companyProfile.name}
Founded: ${companyProfile.yearsFounded} (${new Date().getFullYear() - companyProfile.yearsFounded} years of experience)
Location: ${companyProfile.location}
Service Areas: ${serviceAreasList}
Capabilities: ${capabilitiesList}
${companyProfile.certifications ? `Certifications: ${companyProfile.certifications.join(', ')}` : ''}

SAFETY RECORD:
${safetyText}

REFERENCES:
${referencesText}

Please generate a professional proposal with these sections:

1. COVER LETTER: Professional greeting and executive overview of why we're the right fit
2. EXECUTIVE SUMMARY: 1-2 paragraph summary of our proposed approach
3. APPROACH: Detailed description of how we'll execute the project
4. QUALIFICATIONS: Why ${companyProfile.name} is qualified for this work
5. SAFETY RECORD: Our safety practices and track record
6. REFERENCES: Key client references
7. PRICING OUTLINE: High-level pricing structure (without specific numbers)

Format as JSON with keys: "coverLetter", "executiveSummary", "approach", "qualifications", "safetyRecord", "references", "pricingOutline"

Make it professional, persuasive, and tailored to this specific opportunity.`;

  try {
    const response = await client.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 3000,
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
    let parsedProposal;
    try {
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('No JSON found in response');
      }
      parsedProposal = JSON.parse(jsonMatch[0]);
    } catch {
      // Fallback if parsing fails
      parsedProposal = {
        coverLetter: `Dear ${opportunity.clientName},\n\nThank you for considering ${companyProfile.name} for ${opportunity.projectName}.`,
        executiveSummary: `${companyProfile.name} brings ${new Date().getFullYear() - companyProfile.yearsFounded} years of experience to deliver excellent results.`,
        approach: 'We will execute this project according to industry best practices and your specifications.',
        qualifications: `With expertise in ${capabilitiesList}, we are well-positioned to deliver.`,
        safetyRecord: 'We maintain an exemplary safety record and adhere to all regulations.',
        references: referencesText,
        pricingOutline: 'Detailed pricing will be provided based on project scope confirmation.',
      };
    }

    const fullProposal = [
      'COVER LETTER\n' + parsedProposal.coverLetter,
      '\n\nEXECUTIVE SUMMARY\n' + parsedProposal.executiveSummary,
      '\n\nOUR APPROACH\n' + parsedProposal.approach,
      '\n\nOUR QUALIFICATIONS\n' + parsedProposal.qualifications,
      '\n\nSAFETY RECORD\n' + parsedProposal.safetyRecord,
      '\n\nREFERENCES\n' + parsedProposal.references,
      '\n\nPRICING OUTLINE\n' + parsedProposal.pricingOutline,
    ].join('');

    return {
      coverLetter: parsedProposal.coverLetter,
      executiveSummary: parsedProposal.executiveSummary,
      approach: parsedProposal.approach,
      qualifications: parsedProposal.qualifications,
      safetyRecord: parsedProposal.safetyRecord,
      references: parsedProposal.references,
      pricingOutline: parsedProposal.pricingOutline,
      fullProposal,
    };
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Proposal drafting error: ${error.message}`);
    }
    throw error;
  }
}
