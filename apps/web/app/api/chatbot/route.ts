import { NextRequest, NextResponse } from 'next/server';
import {
  handleChatMessage,
  type Message,
  type ChatResponse,
} from '@wccon/ai';

/**
 * Request body for chatbot endpoint
 */
export interface ChatbotRequest {
  message: string;
  conversationHistory?: Message[];
}

/**
 * Response body for chatbot endpoint
 */
export interface ChatbotResponseBody {
  success: boolean;
  response?: string;
  intent?: string;
  confidence?: number;
  error?: string;
}

/**
 * POST /api/chatbot
 *
 * Handles website chatbot messages using Claude AI.
 * Processes user messages and returns AI-generated responses with intent detection.
 *
 * @param request - NextRequest with ChatbotRequest in body
 * @returns {Promise<NextResponse>} Chatbot response
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    // Parse request body
    const body = (await request.json()) as ChatbotRequest;

    // Validate required fields
    if (!body.message || typeof body.message !== 'string') {
      return NextResponse.json(
        {
          success: false,
          error: 'Message is required and must be a string',
        } as ChatbotResponseBody,
        { status: 400 }
      );
    }

    // Trim message
    const message = body.message.trim();

    if (message.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: 'Message cannot be empty',
        } as ChatbotResponseBody,
        { status: 400 }
      );
    }

    if (message.length > 5000) {
      return NextResponse.json(
        {
          success: false,
          error: 'Message is too long (max 5000 characters)',
        } as ChatbotResponseBody,
        { status: 400 }
      );
    }

    // Validate conversation history
    const conversationHistory = Array.isArray(body.conversationHistory)
      ? body.conversationHistory
      : [];

    // Limit conversation history to last 10 messages
    const limitedHistory = conversationHistory.slice(-10);

    // Call the chatbot handler
    const chatResponse: ChatResponse = await handleChatMessage(
      message,
      limitedHistory
    );

    // Return success response
    return NextResponse.json(
      {
        success: true,
        response: chatResponse.response,
        intent: chatResponse.intent,
        confidence: chatResponse.confidence,
      } as ChatbotResponseBody,
      { status: 200 }
    );
  } catch (error) {
    console.error('Error in chatbot endpoint:', error);

    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error occurred';

    return NextResponse.json(
      {
        success: false,
        error: errorMessage,
      } as ChatbotResponseBody,
      { status: 500 }
    );
  }
}

/**
 * OPTIONS /api/chatbot
 * CORS preflight handling
 */
export async function OPTIONS(): Promise<NextResponse> {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
