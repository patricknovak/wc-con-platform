/**
 * Intent classification for calls
 */
export type CallIntent =
  | 'QUOTE_REQUEST'
  | 'INFORMATION'
  | 'DISPATCH_URGENT'
  | 'COMPLAINT'
  | 'FOLLOW_UP'
  | 'OTHER';

/**
 * Priority level for follow-up
 */
export type CallPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';

/**
 * Extracted data from call transcript
 */
export interface ExtractedCallData {
  callerName?: string;
  callerPhone?: string;
  callerEmail?: string;
  materialType?: string;
  materialQuantity?: number;
  materialUnit?: string;
  deliveryLocation?: string;
  deliveryTimeline?: string;
  projectDescription?: string;
  questionTopic?: string;
  estimatedValue?: number;
}

/**
 * Processed call ready for database insertion
 */
export interface ProcessedCall {
  callId: string;
  callDuration: number;
  callStartTime: string;
  callEndTime: string;
  callerPhone: string;
  callTranscript: string;
  callIntent: CallIntent;
  priority: CallPriority;
  extractedData: ExtractedCallData;
  agentActions: string[];
  handoffRequested: boolean;
  handoffReason?: string;
  followUpScheduled: boolean;
  followUpDate?: string;
  notes: string;
  rawWebhookPayload: Record<string, unknown>;
}

/**
 * ElevenLabs webhook payload structure
 */
export interface ElevenLabsWebhookPayload {
  call_id: string;
  phone_number_id?: string;
  phone_number?: string;
  caller_id?: string;
  call_duration_secs?: number;
  call_start_time?: string;
  call_end_time?: string;
  transcript?: string;
  recording_url?: string;
  status?: string;
  agent_actions?: Record<string, unknown>;
  conversation?: Array<{
    role: 'user' | 'assistant';
    message: string;
  }>;
  [key: string]: unknown;
}

/**
 * Processes an ElevenLabs webhook payload and returns a structured call object
 * ready for database insertion.
 *
 * @param payload - The webhook payload from ElevenLabs
 * @returns {ProcessedCall} Structured call data
 * @throws {Error} If payload is invalid or required fields are missing
 */
export function processCallWebhook(payload: ElevenLabsWebhookPayload): ProcessedCall {
  // Validate required fields
  if (!payload.call_id) {
    throw new Error('Missing required field: call_id');
  }

  const callId = payload.call_id;
  const callDuration = payload.call_duration_secs || 0;
  const callStartTime = payload.call_start_time || new Date().toISOString();
  const callEndTime = payload.call_end_time || new Date().toISOString();
  const callerPhone = payload.caller_id || payload.phone_number || 'unknown';
  const transcript = payload.transcript || buildTranscriptFromConversation(payload.conversation);

  // Extract intent from transcript and agent actions
  const intent = classifyCallIntent(transcript, payload.agent_actions);
  const priority = determinePriority(intent, transcript);

  // Extract structured data from the call
  const extractedData = extractCallData(transcript, payload.agent_actions);

  // Determine if handoff was requested
  const { handoffRequested, handoffReason } = checkHandoffRequested(
    transcript,
    extractedData,
    payload.agent_actions
  );

  // Check if follow-up was scheduled
  const { followUpScheduled, followUpDate } = checkFollowUpScheduled(
    transcript,
    payload.agent_actions
  );

  // Get agent actions as strings
  const agentActions = formatAgentActions(payload.agent_actions);

  return {
    callId,
    callDuration,
    callStartTime,
    callEndTime,
    callerPhone,
    callTranscript: transcript,
    callIntent: intent,
    priority,
    extractedData,
    agentActions,
    handoffRequested,
    handoffReason,
    followUpScheduled,
    followUpDate,
    notes: generateCallNotes(intent, extractedData, handoffReason),
    rawWebhookPayload: payload,
  };
}

/**
 * Builds a transcript from conversation array if transcript is not provided
 */
function buildTranscriptFromConversation(
  conversation?: Array<{ role: 'user' | 'assistant'; message: string }>
): string {
  if (!conversation || conversation.length === 0) {
    return '';
  }

  return conversation
    .map((msg) => {
      const speaker = msg.role === 'user' ? 'Caller' : 'Agent';
      return `${speaker}: ${msg.message}`;
    })
    .join('\n');
}

/**
 * Classifies the call intent based on transcript and agent actions
 */
function classifyCallIntent(
  transcript: string,
  agentActions?: Record<string, unknown>
): CallIntent {
  const lowerTranscript = transcript.toLowerCase();

  // Check for explicit intent indicators
  if (lowerTranscript.includes('quote') || lowerTranscript.includes('pricing')) {
    return 'QUOTE_REQUEST';
  }

  if (lowerTranscript.includes('emergency') || lowerTranscript.includes('urgent')) {
    return 'DISPATCH_URGENT';
  }

  if (
    lowerTranscript.includes('complaint') ||
    lowerTranscript.includes('unhappy') ||
    lowerTranscript.includes('problem with')
  ) {
    return 'COMPLAINT';
  }

  if (lowerTranscript.includes('follow up') || lowerTranscript.includes('following up')) {
    return 'FOLLOW_UP';
  }

  // Check for information requests
  if (
    lowerTranscript.includes('what') ||
    lowerTranscript.includes('how') ||
    lowerTranscript.includes('information') ||
    lowerTranscript.includes('can you') ||
    lowerTranscript.includes('do you offer')
  ) {
    return 'INFORMATION';
  }

  return 'OTHER';
}

/**
 * Determines priority level based on intent and transcript content
 */
function determinePriority(intent: CallIntent, transcript: string): CallPriority {
  if (intent === 'DISPATCH_URGENT') {
    return 'URGENT';
  }

  if (intent === 'COMPLAINT') {
    return 'HIGH';
  }

  if (intent === 'QUOTE_REQUEST') {
    // Check for large value indicators
    const match = transcript.match(/\$?\d+,?\d*,?\d*/);
    if (match) {
      const value = parseInt(match[0].replace(/\$|,/g, ''));
      if (value > 50000) {
        return 'HIGH';
      }
    }
    return 'MEDIUM';
  }

  if (intent === 'FOLLOW_UP') {
    return 'MEDIUM';
  }

  return 'LOW';
}

/**
 * Extracts structured data from the call transcript
 */
function extractCallData(
  transcript: string,
  agentActions?: Record<string, unknown>
): ExtractedCallData {
  const data: ExtractedCallData = {};

  // Try to extract data from agent actions first
  if (agentActions && typeof agentActions === 'object') {
    const actions = agentActions as Record<string, unknown>;
    if (actions.caller_name) data.callerName = String(actions.caller_name);
    if (actions.caller_email) data.callerEmail = String(actions.caller_email);
    if (actions.material_type) data.materialType = String(actions.material_type);
    if (actions.delivery_location) data.deliveryLocation = String(actions.delivery_location);
  }

  // Extract from transcript using simple pattern matching
  const lines = transcript.split('\n');
  for (const line of lines) {
    const lower = line.toLowerCase();

    // Try to find email
    const emailMatch = line.match(/[\w\.-]+@[\w\.-]+\.\w+/);
    if (emailMatch) data.callerEmail = emailMatch[0];

    // Try to find phone
    const phoneMatch = line.match(/\(?(\d{3})\)?[\s\.-]?(\d{3})[\s\.-]?(\d{4})/);
    if (phoneMatch) {
      data.callerPhone = line.substring(phoneMatch.index || 0, (phoneMatch.index || 0) + phoneMatch[0].length);
    }

    // Try to find quantities
    if (lower.includes('tonnes') || lower.includes('tons')) {
      const quantityMatch = line.match(/(\d+(?:[.,]\d+)?)\s*(?:tonnes?|tons?)/i);
      if (quantityMatch) {
        data.materialQuantity = parseFloat(quantityMatch[1].replace(',', '.'));
        data.materialUnit = 'tonnes';
      }
    }
  }

  return data;
}

/**
 * Checks if a handoff to a human was requested
 */
function checkHandoffRequested(
  transcript: string,
  extractedData: ExtractedCallData,
  agentActions?: Record<string, unknown>
): { handoffRequested: boolean; handoffReason?: string } {
  const lowerTranscript = transcript.toLowerCase();

  if (
    lowerTranscript.includes('speak to someone') ||
    lowerTranscript.includes('human') ||
    lowerTranscript.includes('representative')
  ) {
    return {
      handoffRequested: true,
      handoffReason: 'Caller requested to speak with human',
    };
  }

  if (
    lowerTranscript.includes('emergency') ||
    lowerTranscript.includes('urgent') ||
    lowerTranscript.includes('safety')
  ) {
    return {
      handoffRequested: true,
      handoffReason: 'Emergency or safety issue detected',
    };
  }

  if (agentActions && typeof agentActions === 'object') {
    const actions = agentActions as Record<string, unknown>;
    if (actions.transfer_requested || actions.handoff_requested) {
      return {
        handoffRequested: true,
        handoffReason: 'Agent initiated handoff',
      };
    }
  }

  // Check for high-value quote that should be handled by sales
  if (extractedData.estimatedValue && extractedData.estimatedValue > 50000) {
    return {
      handoffRequested: true,
      handoffReason: 'High-value quote requires sales team',
    };
  }

  return { handoffRequested: false };
}

/**
 * Checks if a follow-up was scheduled
 */
function checkFollowUpScheduled(
  transcript: string,
  agentActions?: Record<string, unknown>
): { followUpScheduled: boolean; followUpDate?: string } {
  const lowerTranscript = transcript.toLowerCase();

  if (
    lowerTranscript.includes('call you back') ||
    lowerTranscript.includes('follow up') ||
    lowerTranscript.includes('i\'ll reach out')
  ) {
    // Try to extract date if mentioned
    const dateMatch = transcript.match(
      /(?:tomorrow|next week|monday|tuesday|wednesday|thursday|friday|saturday|sunday|\d{1,2}\/\d{1,2})/i
    );
    return {
      followUpScheduled: true,
      followUpDate: dateMatch ? dateMatch[0] : undefined,
    };
  }

  if (agentActions && typeof agentActions === 'object') {
    const actions = agentActions as Record<string, unknown>;
    if (actions.follow_up_scheduled) {
      return {
        followUpScheduled: true,
        followUpDate: String(actions.follow_up_date || ''),
      };
    }
  }

  return { followUpScheduled: false };
}

/**
 * Formats agent actions for storage
 */
function formatAgentActions(agentActions?: Record<string, unknown>): string[] {
  if (!agentActions) return [];

  const actions: string[] = [];
  for (const [key, value] of Object.entries(agentActions)) {
    if (value) {
      actions.push(`${key}: ${JSON.stringify(value)}`);
    }
  }
  return actions;
}

/**
 * Generates human-readable call notes
 */
function generateCallNotes(
  intent: CallIntent,
  extractedData: ExtractedCallData,
  handoffReason?: string
): string {
  const notes: string[] = [];

  notes.push(`Call Intent: ${intent}`);

  if (extractedData.callerName) {
    notes.push(`Caller: ${extractedData.callerName}`);
  }

  if (extractedData.materialType) {
    notes.push(`Material: ${extractedData.materialType}`);
    if (extractedData.materialQuantity) {
      notes.push(`Quantity: ${extractedData.materialQuantity} ${extractedData.materialUnit || 'units'}`);
    }
  }

  if (extractedData.deliveryLocation) {
    notes.push(`Delivery: ${extractedData.deliveryLocation}`);
  }

  if (extractedData.deliveryTimeline) {
    notes.push(`Timeline: ${extractedData.deliveryTimeline}`);
  }

  if (handoffReason) {
    notes.push(`Handoff Reason: ${handoffReason}`);
  }

  return notes.join(' | ');
}
