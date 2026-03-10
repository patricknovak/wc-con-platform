// Agent Configuration
export {
  VOICE_AGENT_CONFIG,
  getAgentConfig,
  isWithinBusinessHours,
  getNextBusinessHoursMessage,
  type VoiceAgentConfig,
  type HandoffRules,
  type BusinessHours,
  type DataCapture,
} from './config/agent-config';

// Webhook Handler
export {
  processCallWebhook,
  type ProcessedCall,
  type CallIntent,
  type CallPriority,
  type ExtractedCallData,
  type ElevenLabsWebhookPayload,
} from './webhook-handler';

// Twilio Bridge
export {
  generateTwiMLForForwarding,
  sendSMSNotification,
  formatPhoneNumber,
  isValidPhoneNumber,
  resetTwilioClient,
  type TwilioConfig,
  type SMSOptions,
  type TwiMLResponse,
} from './twilio-bridge';
