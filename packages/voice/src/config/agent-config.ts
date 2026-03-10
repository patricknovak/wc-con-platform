/**
 * Handoff rules configuration
 */
export interface HandoffRules {
  alwaysTransfer: string[];
  transferIfValueAbove: number;
  transferForKeyAccounts: boolean;
}

/**
 * Business hours configuration
 */
export interface BusinessHours {
  timezone: string;
  weekday: {
    open: string;
    close: string;
  };
  saturday: {
    open: string;
    close: string;
  };
  sunday: null;
}

/**
 * Data capture configuration for different call types
 */
export interface DataCapture {
  quoteRequest: string[];
  infoRequest: string[];
}

/**
 * Voice agent configuration for ElevenLabs integration
 */
export interface VoiceAgentConfig {
  name: string;
  greeting: string;
  persona: string;
  handoffRules: HandoffRules;
  businessHours: BusinessHours;
  dataCapture: DataCapture;
}

/**
 * ElevenLabs voice agent configuration for West Central Contracting
 */
export const VOICE_AGENT_CONFIG: VoiceAgentConfig = {
  name: 'WC-CON Virtual Receptionist',
  greeting:
    'Thanks for calling West Central Contracting. My name is Alex, how can I help you today?',
  persona: `You are Alex, the virtual receptionist for West Central Contracting LTD,
a family-owned aggregate and trucking company in Hinton, Alberta, serving western Alberta since 1980.
You are friendly, professional, and knowledgeable about construction materials.
Your primary goals are: 1) Answer questions about services and products,
2) Gather information for quote requests, 3) Route urgent matters to the team.`,
  handoffRules: {
    alwaysTransfer: [
      'explicit request for human',
      'safety emergency',
      'complaint escalation',
    ],
    transferIfValueAbove: 50000,
    transferForKeyAccounts: true,
  },
  businessHours: {
    timezone: 'America/Edmonton',
    weekday: {
      open: '07:00',
      close: '17:00',
    },
    saturday: {
      open: '08:00',
      close: '12:00',
    },
    sunday: null,
  },
  dataCapture: {
    quoteRequest: [
      'callerName',
      'callerPhone',
      'callerEmail',
      'materialType',
      'quantity',
      'deliveryLocation',
      'timeline',
      'projectDescription',
    ],
    infoRequest: ['callerName', 'callerPhone', 'questionTopic'],
  },
};

/**
 * Gets the agent configuration
 */
export function getAgentConfig(): VoiceAgentConfig {
  return VOICE_AGENT_CONFIG;
}

/**
 * Checks if the agent is currently within business hours
 * @param timezone Optional timezone override
 * @returns True if current time is within business hours
 */
export function isWithinBusinessHours(timezone?: string): boolean {
  const tz = timezone || VOICE_AGENT_CONFIG.businessHours.timezone;
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: tz,
    weekday: 'long',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });

  const parts = formatter.formatToParts(new Date());
  const partMap = Object.fromEntries(parts.map((p) => [p.type, p.value]));

  const dayOfWeek = partMap.weekday;
  const time = `${partMap.hour}:${partMap.minute}`;

  const hours = VOICE_AGENT_CONFIG.businessHours;

  if (dayOfWeek === 'Saturday') {
    return hours.saturday ? time >= hours.saturday.open && time < hours.saturday.close : false;
  } else if (dayOfWeek === 'Sunday') {
    return hours.sunday ? time >= hours.sunday.open && time < hours.sunday.close : false;
  } else {
    return time >= hours.weekday.open && time < hours.weekday.close;
  }
}

/**
 * Gets the next business hours message
 */
export function getNextBusinessHoursMessage(): string {
  const hours = VOICE_AGENT_CONFIG.businessHours;
  return `We're currently closed. Our business hours are Monday-Friday ${hours.weekday.open}-${hours.weekday.close} and Saturday ${hours.saturday.open}-${hours.saturday.close}. Please call back during business hours.`;
}
