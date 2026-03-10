import { NextRequest, NextResponse } from 'next/server';
import {
  generateQuoteDraft,
  type QuoteItem,
  type QuoteRequest,
  type QuoteDraft,
} from '@wccon/ai';

/**
 * Quote form submission request
 */
export interface QuoteFormRequest {
  customerName: string;
  customerEmail?: string;
  customerPhone?: string;
  items: QuoteItem[];
  deliveryLocation: string;
  deliveryDate?: string;
  projectDescription?: string;
  specialRequirements?: string;
}

/**
 * Quote submission response
 */
export interface QuoteSubmissionResponse {
  success: boolean;
  quoteId?: string;
  quoteDraft?: QuoteDraft;
  message?: string;
  error?: string;
}

/**
 * POST /api/quotes
 *
 * Handles quote requests by generating AI-assisted quote drafts.
 * Processes customer information and item details to create professional quotes.
 *
 * @param request - NextRequest with QuoteFormRequest in body
 * @returns {Promise<NextResponse>} Quote submission response
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    // Parse request body
    const body = (await request.json()) as QuoteFormRequest;

    // Validate required fields
    const errors: string[] = [];

    if (!body.customerName || body.customerName.trim().length === 0) {
      errors.push('Customer name is required');
    }

    if (!body.deliveryLocation || body.deliveryLocation.trim().length === 0) {
      errors.push('Delivery location is required');
    }

    if (!Array.isArray(body.items) || body.items.length === 0) {
      errors.push('At least one item is required');
    }

    if (errors.length > 0) {
      return NextResponse.json(
        {
          success: false,
          error: errors.join('; '),
        } as QuoteSubmissionResponse,
        { status: 400 }
      );
    }

    // Validate items
    for (let i = 0; i < body.items.length; i++) {
      const item = body.items[i];
      if (!item.productName || !item.quantity || !item.unit) {
        errors.push(
          `Item ${i + 1} is missing required fields (productName, quantity, unit)`
        );
      }
    }

    if (errors.length > 0) {
      return NextResponse.json(
        {
          success: false,
          error: errors.join('; '),
        } as QuoteSubmissionResponse,
        { status: 400 }
      );
    }

    // Build quote request
    const quoteRequest: QuoteRequest = {
      customerName: body.customerName.trim(),
      customerEmail: body.customerEmail?.trim(),
      customerPhone: body.customerPhone?.trim(),
      items: body.items,
      deliveryLocation: body.deliveryLocation.trim(),
      deliveryDate: body.deliveryDate?.trim(),
      projectDescription: body.projectDescription?.trim(),
      specialRequirements: body.specialRequirements?.trim(),
    };

    // Generate quote draft using AI
    const quoteDraft: QuoteDraft = await generateQuoteDraft(quoteRequest);

    // Generate quote ID (would be database generated in production)
    const quoteId = `QUOTE-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    // TODO: Save quote to database
    // Example:
    // const savedQuote = await db.quotes.create({
    //   quoteId,
    //   customerName: quoteRequest.customerName,
    //   customerEmail: quoteRequest.customerEmail,
    //   customerPhone: quoteRequest.customerPhone,
    //   items: quoteRequest.items,
    //   deliveryLocation: quoteRequest.deliveryLocation,
    //   deliveryDate: quoteRequest.deliveryDate,
    //   projectDescription: quoteRequest.projectDescription,
    //   quoteDraft: quoteDraft.fullQuote,
    //   status: 'draft',
    //   createdAt: new Date(),
    // });

    // TODO: Send email notification to customer and sales team
    // Example:
    // await Promise.all([
    //   emailService.sendQuoteDraft(quoteRequest.customerEmail, {
    //     customerName: quoteRequest.customerName,
    //     quoteId,
    //     quote: quoteDraft.fullQuote,
    //   }),
    //   notificationService.sendToTeam({
    //     type: 'NEW_QUOTE_REQUEST',
    //     quoteId,
    //     customer: quoteRequest.customerName,
    //     items: quoteRequest.items,
    //     priority: 'medium',
    //   }),
    // ]);

    console.log(`Generated quote ${quoteId} for ${quoteRequest.customerName}`, {
      itemCount: quoteRequest.items.length,
      deliveryLocation: quoteRequest.deliveryLocation,
    });

    // Return success response
    return NextResponse.json(
      {
        success: true,
        quoteId,
        quoteDraft,
        message: `Quote ${quoteId} generated successfully. A copy has been sent to your email.`,
      } as QuoteSubmissionResponse,
      { status: 201 }
    );
  } catch (error) {
    console.error('Error processing quote request:', error);

    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error occurred';

    return NextResponse.json(
      {
        success: false,
        error: `Failed to generate quote: ${errorMessage}`,
      } as QuoteSubmissionResponse,
      { status: 500 }
    );
  }
}

/**
 * GET /api/quotes
 *
 * Retrieves quotes based on query parameters.
 * (Implementation would fetch from database)
 */
export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(request.url);
    const customerId = searchParams.get('customerId');
    const quoteId = searchParams.get('quoteId');

    // TODO: Fetch quotes from database
    // Example:
    // const quotes = await db.quotes.findMany({
    //   where: {
    //     ...(customerId && { customerId }),
    //     ...(quoteId && { quoteId }),
    //   },
    //   orderBy: { createdAt: 'desc' },
    // });

    return NextResponse.json(
      {
        success: true,
        quotes: [],
        message: 'Quote retrieval not yet implemented',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error retrieving quotes:', error);

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to retrieve quotes',
      },
      { status: 500 }
    );
  }
}

/**
 * OPTIONS /api/quotes
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
