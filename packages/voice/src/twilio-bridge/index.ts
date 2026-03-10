import twilio from 'twilio';

/**
 * Twilio client configuration
 */
export interface TwilioConfig {
  accountSid: string;
  authToken: string;
  phoneNumber: string;
}

/**
 * SMS notification options
 */
export interface SMSOptions {
  to: string;
  message: string;
  from?: string;
}

/**
 * TwiML response for call forwarding
 */
export interface TwiMLResponse {
  twiml: string;
  contentType: string;
}

let twilioClient: ReturnType<typeof twilio> | null = null;

/**
 * Gets or initializes the Twilio client
 */
function getTwilioClient(): ReturnType<typeof twilio> {
  if (!twilioClient) {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;

    if (!accountSid || !authToken) {
      throw new Error(
        'TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN environment variables are required'
      );
    }

    twilioClient = twilio(accountSid, authToken);
  }
  return twilioClient;
}

/**
 * Generates TwiML to forward incoming calls to ElevenLabs
 *
 * @param elevenLabsEndpoint - The ElevenLabs endpoint to forward to
 * @returns {TwiMLResponse} TwiML XML and content type
 * @example
 * ```typescript
 * const twiml = generateTwiMLForForwarding('sip:your-agent@api.elevenlabs.io');
 * // Returns TwiML that forwards calls to ElevenLabs
 * ```
 */
export function generateTwiMLForForwarding(elevenLabsEndpoint: string): TwiMLResponse {
  // Escape the endpoint for XML
  const escapedEndpoint = elevenLabsEndpoint.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  const twiml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Say voice="alice" language="en-US">Thanks for calling West Central Contracting. Please hold while we connect you.</Say>
  <Dial timeout="15" record="record-from-answer" recordingStatusCallback="/api/voice-webhook">
    <SIP>${escapedEndpoint}</SIP>
  </Dial>
  <Say voice="alice" language="en-US">We were unable to connect your call. Please try again later.</Say>
  <Hangup />
</Response>`;

  return {
    twiml,
    contentType: 'application/xml',
  };
}

/**
 * Sends an SMS notification via Twilio
 *
 * @param to - Recipient phone number
 * @param message - Message text
 * @param from - Sender phone number (defaults to configured number)
 * @returns {Promise<{sid: string, status: string}>} Message SID and status
 * @throws {Error} If SMS fails to send
 * @example
 * ```typescript
 * await sendSMSNotification('403-555-0123', 'Your quote is ready');
 * ```
 */
export async function sendSMSNotification(
  to: string,
  message: string,
  from?: string
): Promise<{ sid: string; status: string }> {
  const client = getTwilioClient();
  const fromNumber = from || process.env.TWILIO_PHONE_NUMBER;

  if (!fromNumber) {
    throw new Error('TWILIO_PHONE_NUMBER environment variable is required');
  }

  try {
    const msg = await client.messages.create({
      body: message,
      from: fromNumber,
      to: formatPhoneNumber(to),
    });

    return {
      sid: msg.sid,
      status: msg.status,
    };
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to send SMS: ${error.message}`);
    }
    throw error;
  }
}

/**
 * Formats and normalizes a phone number to E.164 format
 *
 * @param phone - Phone number in various formats
 * @returns {string} Normalized phone number in E.164 format
 * @example
 * ```typescript
 * formatPhoneNumber('403-555-0123') // Returns '+14035550123'
 * formatPhoneNumber('(403) 555-0123') // Returns '+14035550123'
 * formatPhoneNumber('4035550123') // Returns '+14035550123'
 * formatPhoneNumber('+1 403 555 0123') // Returns '+14035550123'
 * ```
 */
export function formatPhoneNumber(phone: string): string {
  // Remove all non-digit characters
  const digits = phone.replace(/\D/g, '');

  // If it doesn't start with 1 (or 11 for international), assume Canada (1)
  if (!digits.startsWith('1')) {
    if (digits.length === 10) {
      // Assume Canadian/US number if 10 digits
      return `+1${digits}`;
    }
    if (digits.length === 7) {
      // Assume local call within Alberta
      return `+1780${digits}`;
    }
  }

  // Format with + prefix
  if (digits.startsWith('1')) {
    return `+${digits}`;
  }

  // Default: add +1 prefix and assume North American
  return `+1${digits}`;
}

/**
 * Validates a phone number format
 *
 * @param phone - Phone number to validate
 * @returns {boolean} True if phone number is valid
 */
export function isValidPhoneNumber(phone: string): boolean {
  const normalized = formatPhoneNumber(phone);
  // Check E.164 format: +[1-9]\d{1,14}
  const e164Regex = /^\+[1-9]\d{1,14}$/;
  return e164Regex.test(normalized);
}

/**
 * Resets the Twilio client (useful for testing)
 */
export function resetTwilioClient(): void {
  twilioClient = null;
}
