import { NextRequest, NextResponse } from 'next/server';
import {
  processCallWebhook,
  type ElevenLabsWebhookPayload,
} from '@wccon/voice';

/**
 * POST /api/voice-webhook
 *
 * Webhook endpoint for ElevenLabs voice agent calls.
 * Receives call data and processes it for database storage and follow-up.
 *
 * @param request - NextRequest with webhook payload in body
 * @returns {Promise<NextResponse>} 200 OK response
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    // Parse the webhook payload
    const payload = (await request.json()) as ElevenLabsWebhookPayload;

    // Process the webhook
    const processedCall = processCallWebhook(payload);

    // TODO: Save to database
    // Example:
    // await db.calls.create({
    //   callId: processedCall.callId,
    //   callDuration: processedCall.callDuration,
    //   callStartTime: processedCall.callStartTime,
    //   callEndTime: processedCall.callEndTime,
    //   callerPhone: processedCall.callerPhone,
    //   callTranscript: processedCall.callTranscript,
    //   callIntent: processedCall.callIntent,
    //   priority: processedCall.priority,
    //   extractedData: processedCall.extractedData,
    //   agentActions: processedCall.agentActions,
    //   handoffRequested: processedCall.handoffRequested,
    //   handoffReason: processedCall.handoffReason,
    //   followUpScheduled: processedCall.followUpScheduled,
    //   followUpDate: processedCall.followUpDate,
    //   notes: processedCall.notes,
    // });

    // TODO: Send notifications if needed
    // If handoff was requested, notify sales team
    // if (processedCall.handoffRequested) {
    //   await notificationService.sendToTeam({
    //     type: 'CALL_HANDOFF',
    //     priority: processedCall.priority,
    //     data: processedCall,
    //   });
    // }

    // TODO: Create quote/opportunity records if applicable
    // if (processedCall.callIntent === 'QUOTE_REQUEST' && processedCall.extractedData) {
    //   await db.quoteRequests.create({
    //     source: 'voice_call',
    //     callId: processedCall.callId,
    //     customerName: processedCall.extractedData.callerName,
    //     customerPhone: processedCall.callerPhone,
    //     customerEmail: processedCall.extractedData.callerEmail,
    //     materialType: processedCall.extractedData.materialType,
    //     estimatedQuantity: processedCall.extractedData.materialQuantity,
    //     deliveryLocation: processedCall.extractedData.deliveryLocation,
    //     projectDescription: processedCall.extractedData.projectDescription,
    //     priority: processedCall.priority,
    //   });
    // }

    console.log(`Processed call ${processedCall.callId}:`, {
      intent: processedCall.callIntent,
      priority: processedCall.priority,
      handoffRequested: processedCall.handoffRequested,
      notes: processedCall.notes,
    });

    // Return success response
    return NextResponse.json(
      {
        success: true,
        callId: processedCall.callId,
        intent: processedCall.callIntent,
        priority: processedCall.priority,
        message: 'Call processed successfully',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing voice webhook:', error);

    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error';

    return NextResponse.json(
      {
        success: false,
        error: errorMessage,
      },
      { status: 400 }
    );
  }
}

/**
 * OPTIONS /api/voice-webhook
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
