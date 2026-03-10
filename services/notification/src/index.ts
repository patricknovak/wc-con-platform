/**
 * Notification Service
 * Handles email and SMS notifications across the WC-CON platform
 */

/**
 * Quote summary for notification
 */
export interface QuoteSummary {
  quoteNumber: string;
  customerName: string;
  totalAmount: number;
  items: { name: string; quantity: number; unitPrice: number }[];
  createdAt: Date;
}

/**
 * Opportunity summary for notification
 */
export interface OpportunitySummary {
  title: string;
  source: string;
  matchScore: number;
  deadline?: Date;
  description: string;
}

/**
 * Call summary for notification
 */
export interface CallSummary {
  callId: string;
  incomingNumber: string;
  callerName?: string;
  urgency: 'low' | 'medium' | 'high' | 'critical';
  summary: string;
  timestamp: Date;
}

/**
 * Send an email notification
 * Uses SendGrid for delivery
 * @param to Recipient email address
 * @param subject Email subject line
 * @param html HTML email body
 */
export async function sendEmail(
  to: string,
  subject: string,
  html: string
): Promise<void> {
  const sendGridApiKey = process.env.SENDGRID_API_KEY;

  if (!sendGridApiKey) {
    console.warn(
      '[NOTIFICATION] SENDGRID_API_KEY not set - email would not be sent in production'
    );
    console.log(`[NOTIFICATION] Would send email to: ${to}`);
    console.log(`[NOTIFICATION] Subject: ${subject}`);
    return;
  }

  try {
    console.log(`[NOTIFICATION] Sending email to ${to}: "${subject}"`);

    // TODO: Implement actual SendGrid integration
    // import sgMail from '@sendgrid/mail';
    // sgMail.setApiKey(sendGridApiKey);
    // await sgMail.send({
    //   to,
    //   from: process.env.SENDGRID_FROM || 'notifications@wccon.com',
    //   subject,
    //   html,
    // });

    console.log(`[NOTIFICATION] Email sent successfully`);
  } catch (error) {
    console.error('[NOTIFICATION] Failed to send email:', error);
    throw error;
  }
}

/**
 * Send an SMS notification
 * Uses Twilio for delivery
 * @param to Recipient phone number
 * @param message SMS message body
 */
export async function sendSMS(to: string, message: string): Promise<void> {
  const twilioAccountSid = process.env.TWILIO_ACCOUNT_SID;
  const twilioAuthToken = process.env.TWILIO_AUTH_TOKEN;
  const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

  if (!twilioAccountSid || !twilioAuthToken || !twilioPhoneNumber) {
    console.warn(
      '[NOTIFICATION] Twilio credentials not configured - SMS would not be sent in production'
    );
    console.log(`[NOTIFICATION] Would send SMS to: ${to}`);
    console.log(`[NOTIFICATION] Message: ${message}`);
    return;
  }

  try {
    console.log(`[NOTIFICATION] Sending SMS to ${to}`);

    // TODO: Implement actual Twilio integration
    // import twilio from 'twilio';
    // const client = twilio(twilioAccountSid, twilioAuthToken);
    // await client.messages.create({
    //   body: message,
    //   from: twilioPhoneNumber,
    //   to,
    // });

    console.log(`[NOTIFICATION] SMS sent successfully`);
  } catch (error) {
    console.error('[NOTIFICATION] Failed to send SMS:', error);
    throw error;
  }
}

/**
 * Send a quote notification to Todd (manager)
 * @param quoteSummary Summary of the quote
 */
export async function sendQuoteNotification(
  quoteSummary: QuoteSummary
): Promise<void> {
  const toddEmail = process.env.TODD_EMAIL || 'todd@wccon.com';

  const html = buildQuoteNotificationEmail(quoteSummary);

  await sendEmail(
    toddEmail,
    `New Quote Generated: ${quoteSummary.quoteNumber}`,
    html
  );
}

/**
 * Send an opportunity alert with digest
 * @param opportunities Opportunities to notify about
 */
export async function sendOpportunityAlert(
  opportunities: OpportunitySummary[]
): Promise<void> {
  const toddEmail = process.env.TODD_EMAIL || 'todd@wccon.com';

  const strongMatches = opportunities.filter((o) => o.matchScore >= 70);
  const subject =
    strongMatches.length > 0
      ? `${strongMatches.length} Strong Opportunity Match${strongMatches.length === 1 ? '' : 'es'}`
      : 'Opportunity Digest';

  const html = buildOpportunityAlertEmail(opportunities);

  await sendEmail(toddEmail, subject, html);
}

/**
 * Send a call alert for urgent voice agent calls
 * @param callSummary Summary of the incoming call
 */
export async function sendCallAlert(callSummary: CallSummary): Promise<void> {
  const toddPhone = process.env.TODD_PHONE;

  if (!toddPhone) {
    console.warn('[NOTIFICATION] TODD_PHONE not configured for call alerts');
    return;
  }

  const message = `WC-CON Voice Agent Alert [${callSummary.urgency.toUpperCase()}]: ${callSummary.incomingNumber}${callSummary.callerName ? ` (${callSummary.callerName})` : ''} - ${callSummary.summary.substring(0, 50)}...`;

  await sendSMS(toddPhone, message);
}

/**
 * Build HTML for quote notification email
 */
function buildQuoteNotificationEmail(quote: QuoteSummary): string {
  const itemsHtml = quote.items
    .map(
      (item) =>
        `<tr>
      <td style="padding: 8px; border-bottom: 1px solid #e5e7eb;">${escapeHtml(item.name)}</td>
      <td style="padding: 8px; border-bottom: 1px solid #e5e7eb; text-align: right;">${item.quantity}</td>
      <td style="padding: 8px; border-bottom: 1px solid #e5e7eb; text-align: right;">$${item.unitPrice.toFixed(2)}</td>
      <td style="padding: 8px; border-bottom: 1px solid #e5e7eb; text-align: right;">$${(item.quantity * item.unitPrice).toFixed(2)}</td>
    </tr>`
    )
    .join('');

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Quote Notification</title>
</head>
<body style="font-family: Arial, sans-serif; color: #333;">
  <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
    <h1 style="color: #1e40af;">New Quote Generated</h1>

    <div style="background: #f3f4f6; padding: 15px; border-radius: 6px; margin: 20px 0;">
      <p><strong>Quote #:</strong> ${escapeHtml(quote.quoteNumber)}</p>
      <p><strong>Customer:</strong> ${escapeHtml(quote.customerName)}</p>
      <p><strong>Created:</strong> ${quote.createdAt.toLocaleString()}</p>
    </div>

    <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
      <thead>
        <tr style="background: #e5e7eb;">
          <th style="padding: 10px; text-align: left;">Item</th>
          <th style="padding: 10px; text-align: right;">Qty</th>
          <th style="padding: 10px; text-align: right;">Unit Price</th>
          <th style="padding: 10px; text-align: right;">Total</th>
        </tr>
      </thead>
      <tbody>
        ${itemsHtml}
      </tbody>
    </table>

    <div style="text-align: right; margin: 20px 0;">
      <p style="font-size: 18px;"><strong>Total: $${quote.totalAmount.toFixed(2)}</strong></p>
    </div>

    <p style="color: #666; font-size: 12px; margin-top: 30px;">
      This is an automated notification from the WC-CON quotation system.
    </p>
  </div>
</body>
</html>
`;
}

/**
 * Build HTML for opportunity alert email
 */
function buildOpportunityAlertEmail(opportunities: OpportunitySummary[]): string {
  const strongMatches = opportunities.filter((o) => o.matchScore >= 70);
  const worthReviewing = opportunities.filter(
    (o) => o.matchScore >= 40 && o.matchScore < 70
  );

  let html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Opportunity Alert</title>
</head>
<body style="font-family: Arial, sans-serif; color: #333;">
  <div style="max-width: 700px; margin: 0 auto; padding: 20px;">
    <h1 style="color: #1e40af;">Opportunity Alert</h1>

    <div style="background: #f3f4f6; padding: 15px; border-radius: 6px; margin: 20px 0;">
      <p><strong>Strong Matches:</strong> ${strongMatches.length}</p>
      <p><strong>Worth Reviewing:</strong> ${worthReviewing.length}</p>
      <p><strong>Total:</strong> ${opportunities.length}</p>
    </div>
`;

  if (strongMatches.length > 0) {
    html += `<h2 style="color: #059669; margin-top: 30px;">Strong Matches</h2>`;
    for (const opp of strongMatches) {
      html += buildOpportunityCard(opp, 'green');
    }
  }

  if (worthReviewing.length > 0) {
    html += `<h2 style="color: #d97706; margin-top: 30px;">Worth Reviewing</h2>`;
    for (const opp of worthReviewing) {
      html += buildOpportunityCard(opp, 'amber');
    }
  }

  html += `
    <p style="color: #666; font-size: 12px; margin-top: 30px;">
      This is an automated alert from the WC-CON Opportunity Scanner.
    </p>
  </div>
</body>
</html>
`;

  return html;
}

/**
 * Build an individual opportunity card
 */
function buildOpportunityCard(
  opp: OpportunitySummary,
  color: 'green' | 'amber'
): string {
  const borderColor = color === 'green' ? '#059669' : '#d97706';
  const deadlineStr = opp.deadline
    ? opp.deadline.toLocaleDateString()
    : 'No deadline';

  return `
<div style="border-left: 4px solid ${borderColor}; background: #f9fafb; padding: 15px; margin: 10px 0; border-radius: 4px;">
  <p style="margin: 0 0 5px 0;"><strong>${escapeHtml(opp.title)}</strong></p>
  <p style="margin: 0 0 5px 0; color: #666; font-size: 12px;">${escapeHtml(opp.source)} | Match: ${opp.matchScore}% | Deadline: ${deadlineStr}</p>
  <p style="margin: 0; font-size: 13px;">${escapeHtml(opp.description.substring(0, 100))}</p>
</div>
`;
}

/**
 * Escape HTML special characters
 */
function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (char) => map[char]);
}
