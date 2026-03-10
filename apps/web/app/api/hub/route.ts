import { NextRequest, NextResponse } from 'next/server';

/**
 * Hub business submission request
 */
export interface HubBusinessSubmission {
  businessName: string;
  businessType: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  companyDescription?: string;
  location?: string;
  website?: string;
  services?: string[];
  certifications?: string[];
  yearsInBusiness?: number;
}

/**
 * Hub submission response
 */
export interface HubSubmissionResponse {
  success: boolean;
  submissionId?: string;
  message?: string;
  error?: string;
}

/**
 * POST /api/hub
 *
 * Handles business submissions for the WC-CON Hub.
 * Processes vendor/contractor information for potential partnerships.
 *
 * @param request - NextRequest with HubBusinessSubmission in body
 * @returns {Promise<NextResponse>} Submission response
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    // Parse request body
    const body = (await request.json()) as HubBusinessSubmission;

    // Validate required fields
    const errors: string[] = [];

    if (!body.businessName || body.businessName.trim().length === 0) {
      errors.push('Business name is required');
    }

    if (!body.businessType || body.businessType.trim().length === 0) {
      errors.push('Business type is required');
    }

    if (!body.contactName || body.contactName.trim().length === 0) {
      errors.push('Contact name is required');
    }

    if (!body.contactEmail || !isValidEmail(body.contactEmail)) {
      errors.push('Valid contact email is required');
    }

    if (!body.contactPhone || body.contactPhone.trim().length < 10) {
      errors.push('Valid contact phone is required');
    }

    if (errors.length > 0) {
      return NextResponse.json(
        {
          success: false,
          error: errors.join('; '),
        } as HubSubmissionResponse,
        { status: 400 }
      );
    }

    // Generate submission ID
    const submissionId = `HUB-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    // TODO: Save to database
    // Example:
    // await db.hubSubmissions.create({
    //   submissionId,
    //   businessName: body.businessName,
    //   businessType: body.businessType,
    //   contactName: body.contactName,
    //   contactEmail: body.contactEmail,
    //   contactPhone: body.contactPhone,
    //   companyDescription: body.companyDescription,
    //   location: body.location,
    //   website: body.website,
    //   services: body.services || [],
    //   certifications: body.certifications || [],
    //   yearsInBusiness: body.yearsInBusiness,
    //   status: 'pending',
    //   createdAt: new Date(),
    // });

    // TODO: Send confirmation email to submitter
    // Example:
    // await emailService.sendHubSubmissionConfirmation({
    //   email: body.contactEmail,
    //   businessName: body.businessName,
    //   submissionId,
    // });

    // TODO: Send notification to hub admin team
    // Example:
    // await notificationService.sendToTeam({
    //   type: 'NEW_HUB_SUBMISSION',
    //   submissionId,
    //   business: body.businessName,
    //   contact: body.contactName,
    // });

    console.log(`New hub submission ${submissionId}:`, {
      business: body.businessName,
      type: body.businessType,
      contact: body.contactName,
    });

    // Return success response
    return NextResponse.json(
      {
        success: true,
        submissionId,
        message: `Your submission ${submissionId} has been received. We will review it shortly and contact you.`,
      } as HubSubmissionResponse,
      { status: 201 }
    );
  } catch (error) {
    console.error('Error processing hub submission:', error);

    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error occurred';

    return NextResponse.json(
      {
        success: false,
        error: `Failed to submit application: ${errorMessage}`,
      } as HubSubmissionResponse,
      { status: 500 }
    );
  }
}

/**
 * GET /api/hub
 *
 * Retrieves hub submission details.
 * (Implementation would fetch from database)
 */
export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(request.url);
    const submissionId = searchParams.get('submissionId');

    if (!submissionId) {
      return NextResponse.json(
        {
          success: false,
          error: 'Submission ID is required',
        },
        { status: 400 }
      );
    }

    // TODO: Fetch submission from database
    // Example:
    // const submission = await db.hubSubmissions.findUnique({
    //   where: { submissionId },
    // });

    return NextResponse.json(
      {
        success: true,
        submission: null,
        message: 'Submission retrieval not yet implemented',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error retrieving hub submission:', error);

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to retrieve submission',
      },
      { status: 500 }
    );
  }
}

/**
 * OPTIONS /api/hub
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

/**
 * Simple email validation
 */
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
