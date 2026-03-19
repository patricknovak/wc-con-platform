/**
 * PDF Generator Service
 * Generates professional PDF documents (quotes, invoices, proposals)
 */

/**
 * Line item in a quote or invoice
 */
export interface LineItem {
  description: string;
  quantity: number;
  unitPrice: number;
  amount?: number;
}

/**
 * Customer information
 */
export interface CustomerInfo {
  name: string;
  email?: string;
  phone?: string;
  address?: string;
}

/**
 * Quote data for PDF generation
 */
export interface QuoteData {
  quoteNumber: string;
  date: Date;
  expiryDate?: Date;
  customer: CustomerInfo;
  items: LineItem[];
  subtotal: number;
  tax: number;
  total: number;
  terms?: string;
  notes?: string;
}

/**
 * Generate a professional quote PDF
 * @param quote Quote data to generate PDF from
 * @returns HTML string that can be converted to PDF
 */
export function generateQuotePDF(quote: QuoteData): string {
  const itemsHtml = quote.items
    .map((item, index) => {
      const amount = item.amount || item.quantity * item.unitPrice;
      return `
      <tr>
        <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;">
          <strong>${escapeHtml(item.description)}</strong>
        </td>
        <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; text-align: center; width: 80px;">
          ${item.quantity}
        </td>
        <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; text-align: right; width: 100px;">
          $${item.unitPrice.toFixed(2)}
        </td>
        <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; text-align: right; width: 120px; font-weight: 600;">
          $${amount.toFixed(2)}
        </td>
      </tr>`;
    })
    .join('');

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Quote ${escapeHtml(quote.quoteNumber)}</title>
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      color: #333;
      line-height: 1.6;
      margin: 0;
      padding: 20px;
    }
    .container {
      max-width: 800px;
      margin: 0 auto;
      background: white;
      padding: 40px;
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: start;
      margin-bottom: 40px;
      border-bottom: 3px solid #1e40af;
      padding-bottom: 20px;
    }
    .company-info h1 {
      margin: 0;
      color: #1e40af;
      font-size: 28px;
      font-weight: bold;
    }
    .company-info p {
      margin: 5px 0;
      color: #666;
      font-size: 13px;
    }
    .quote-info {
      text-align: right;
    }
    .quote-info-item {
      margin: 5px 0;
    }
    .quote-info-label {
      font-weight: 600;
      color: #1e40af;
    }
    .quote-info-value {
      margin-left: 10px;
    }
    .section {
      margin-bottom: 30px;
    }
    .section-title {
      font-size: 13px;
      font-weight: 700;
      color: #374151;
      text-transform: uppercase;
      margin-bottom: 15px;
      padding-bottom: 8px;
      border-bottom: 2px solid #e5e7eb;
    }
    .customer-info {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 30px;
      margin-bottom: 30px;
    }
    .customer-block h3 {
      margin: 0 0 10px 0;
      color: #1f2937;
      font-size: 13px;
      font-weight: 600;
    }
    .customer-block p {
      margin: 3px 0;
      font-size: 13px;
      color: #666;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 20px;
    }
    th {
      background: #f3f4f6;
      padding: 12px;
      text-align: left;
      font-weight: 600;
      font-size: 13px;
      color: #374151;
      border-bottom: 2px solid #e5e7eb;
    }
    .totals {
      display: flex;
      justify-content: flex-end;
      margin: 30px 0;
    }
    .totals-box {
      width: 300px;
    }
    .total-row {
      display: flex;
      justify-content: space-between;
      padding: 8px 0;
      font-size: 14px;
    }
    .total-row.subtotal {
      border-bottom: 1px solid #e5e7eb;
    }
    .total-row.tax {
      border-bottom: 2px solid #e5e7eb;
    }
    .total-row.grand-total {
      font-weight: 700;
      font-size: 16px;
      color: #1e40af;
      padding: 12px 0;
    }
    .total-label {
      flex: 1;
    }
    .total-amount {
      text-align: right;
      width: 100px;
      font-weight: 600;
    }
    .terms {
      background: #f9fafb;
      padding: 15px;
      border-radius: 6px;
      font-size: 12px;
      color: #666;
      margin-bottom: 20px;
    }
    .terms-title {
      font-weight: 600;
      color: #374151;
      margin-bottom: 8px;
    }
    .footer {
      margin-top: 40px;
      padding-top: 20px;
      border-top: 1px solid #e5e7eb;
      text-align: center;
      font-size: 11px;
      color: #999;
    }
    .page-break {
      page-break-after: always;
    }
  </style>
</head>
<body>
  <div class="container">
    <!-- Header -->
    <div class="header">
      <div class="company-info">
        <h1>WC-CON</h1>
        <p>Westlake Crushing & Contracting</p>
        <p>Hinton, Alberta</p>
        <p>Phone: (780) 865-6000</p>
      </div>
      <div class="quote-info">
        <div class="quote-info-item">
          <span class="quote-info-label">Quote #:</span>
          <span class="quote-info-value">${escapeHtml(quote.quoteNumber)}</span>
        </div>
        <div class="quote-info-item">
          <span class="quote-info-label">Date:</span>
          <span class="quote-info-value">${quote.date.toLocaleDateString('en-CA')}</span>
        </div>
        ${quote.expiryDate ? `
        <div class="quote-info-item">
          <span class="quote-info-label">Valid Until:</span>
          <span class="quote-info-value">${quote.expiryDate.toLocaleDateString('en-CA')}</span>
        </div>
        ` : ''}
      </div>
    </div>

    <!-- Customer Information -->
    <div class="customer-info">
      <div class="customer-block">
        <h3>BILL TO:</h3>
        <p style="font-weight: 600; color: #1f2937;">${escapeHtml(quote.customer.name)}</p>
        ${quote.customer.address ? `<p>${escapeHtml(quote.customer.address)}</p>` : ''}
        ${quote.customer.email ? `<p>${escapeHtml(quote.customer.email)}</p>` : ''}
        ${quote.customer.phone ? `<p>${escapeHtml(quote.customer.phone)}</p>` : ''}
      </div>
    </div>

    <!-- Line Items Table -->
    <div class="section">
      <table>
        <thead>
          <tr>
            <th style="flex: 1;">Description</th>
            <th style="width: 80px;">Qty</th>
            <th style="width: 100px;">Unit Price</th>
            <th style="width: 120px;">Amount</th>
          </tr>
        </thead>
        <tbody>
          ${itemsHtml}
        </tbody>
      </table>
    </div>

    <!-- Totals -->
    <div class="totals">
      <div class="totals-box">
        <div class="total-row subtotal">
          <div class="total-label">Subtotal</div>
          <div class="total-amount">$${quote.subtotal.toFixed(2)}</div>
        </div>
        <div class="total-row tax">
          <div class="total-label">Tax (GST/HST)</div>
          <div class="total-amount">$${quote.tax.toFixed(2)}</div>
        </div>
        <div class="total-row grand-total">
          <div class="total-label">TOTAL</div>
          <div class="total-amount">$${quote.total.toFixed(2)}</div>
        </div>
      </div>
    </div>

    <!-- Terms & Notes -->
    ${quote.terms ? `
    <div class="terms">
      <div class="terms-title">TERMS & CONDITIONS</div>
      <p>${escapeHtml(quote.terms)}</p>
    </div>
    ` : ''}

    ${quote.notes ? `
    <div class="section">
      <div class="section-title">Notes</div>
      <p style="font-size: 13px; color: #555;">${escapeHtml(quote.notes)}</p>
    </div>
    ` : ''}

    <!-- Footer -->
    <div class="footer">
      <p>Thank you for your business! Please contact us with any questions.</p>
      <p>This quote is valid for 30 days from the date shown above.</p>
    </div>
  </div>
</body>
</html>
`;

  return html;
}

/**
 * Convert HTML to PDF using Puppeteer
 * @param html HTML content to convert
 * @returns PDF buffer
 */
export async function htmlToPDF(html: string): Promise<Buffer> {
  // TODO: Implement Puppeteer integration
  // const browser = await puppeteer.launch();
  // const page = await browser.newPage();
  // await page.setContent(html);
  // const pdf = await page.pdf({ format: 'A4' });
  // await browser.close();
  // return pdf;

  console.log('[PDF] HTML to PDF conversion not yet implemented');
  console.log('[PDF] Would use Puppeteer to convert HTML to PDF');
  return Buffer.from('');
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

// ---------------------------------------------------------------------------
// Invoice PDF
// ---------------------------------------------------------------------------

/**
 * A single line item on an invoice
 */
export interface InvoiceLineItem {
  description: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  amount: number;
  ticketRef?: string;
}

/**
 * Full invoice data for PDF generation
 */
export interface InvoiceData {
  invoiceNumber: string;
  date: Date;
  dueDate: Date;
  paymentTerms: string;
  customer: CustomerInfo;
  items: InvoiceLineItem[];
  subtotal: number;
  taxRate: number;
  tax: number;
  total: number;
  amountPaid: number;
  amountDue: number;
  notes?: string;
  tickets?: string[];
}

/**
 * Generate a professional invoice PDF
 * @param invoice Invoice data to generate PDF from
 * @returns HTML string that can be converted to PDF
 */
export function generateInvoicePDF(invoice: InvoiceData): string {
  const isPaid = invoice.amountDue <= 0;
  const isOverdue = !isPaid && invoice.dueDate < new Date();

  // Group items by ticket reference
  const grouped = new Map<string, InvoiceLineItem[]>();
  for (const item of invoice.items) {
    const key = item.ticketRef || '__ungrouped__';
    if (!grouped.has(key)) {
      grouped.set(key, []);
    }
    grouped.get(key)!.push(item);
  }

  let itemsHtml = '';
  for (const [ticketRef, items] of grouped.entries()) {
    if (ticketRef !== '__ungrouped__') {
      itemsHtml += `
        <tr>
          <td colspan="5" style="padding: 10px 10px 4px; background: #f0f4ff; font-weight: 700; font-size: 12px; color: #1e40af; border-bottom: 1px solid #dbeafe;">
            Ticket: ${escapeHtml(ticketRef)}
          </td>
        </tr>`;
    }
    for (const item of items) {
      itemsHtml += `
        <tr>
          <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;">
            <strong>${escapeHtml(item.description)}</strong>
          </td>
          <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; text-align: center; width: 60px;">
            ${item.quantity}
          </td>
          <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; text-align: center; width: 60px;">
            ${escapeHtml(item.unit)}
          </td>
          <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; text-align: right; width: 100px;">
            $${item.unitPrice.toFixed(2)}
          </td>
          <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; text-align: right; width: 120px; font-weight: 600;">
            $${item.amount.toFixed(2)}
          </td>
        </tr>`;
    }
  }

  const ticketRefsHtml = invoice.tickets && invoice.tickets.length > 0
    ? `<div style="margin-bottom: 20px;">
        <div class="section-title">Referenced Tickets</div>
        <p style="font-size: 13px; color: #555;">${invoice.tickets.map(t => escapeHtml(t)).join(', ')}</p>
      </div>`
    : '';

  const watermarkCss = isPaid
    ? `
      .watermark {
        position: fixed;
        top: 35%;
        left: 15%;
        font-size: 140px;
        font-weight: 900;
        color: rgba(22, 163, 74, 0.10);
        transform: rotate(-30deg);
        z-index: 0;
        pointer-events: none;
        letter-spacing: 20px;
      }`
    : isOverdue
    ? `
      .watermark {
        position: fixed;
        top: 35%;
        left: 10%;
        font-size: 120px;
        font-weight: 900;
        color: rgba(220, 38, 38, 0.10);
        transform: rotate(-30deg);
        z-index: 0;
        pointer-events: none;
        letter-spacing: 20px;
      }`
    : `.watermark { display: none; }`;

  const watermarkText = isPaid ? 'PAID' : isOverdue ? 'OVERDUE' : '';

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Invoice ${escapeHtml(invoice.invoiceNumber)}</title>
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      color: #333;
      line-height: 1.6;
      margin: 0;
      padding: 20px;
    }
    .container {
      max-width: 800px;
      margin: 0 auto;
      background: white;
      padding: 40px;
      position: relative;
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: start;
      margin-bottom: 40px;
      border-bottom: 3px solid #1e40af;
      padding-bottom: 20px;
    }
    .company-info h1 {
      margin: 0;
      color: #1e40af;
      font-size: 28px;
      font-weight: bold;
    }
    .company-info p {
      margin: 5px 0;
      color: #666;
      font-size: 13px;
    }
    .invoice-badge {
      display: inline-block;
      background: #1e40af;
      color: white;
      font-size: 22px;
      font-weight: 800;
      padding: 6px 18px;
      border-radius: 4px;
      letter-spacing: 3px;
      margin-bottom: 12px;
    }
    .invoice-info {
      text-align: right;
    }
    .invoice-info-item {
      margin: 5px 0;
    }
    .invoice-info-label {
      font-weight: 600;
      color: #1e40af;
    }
    .invoice-info-value {
      margin-left: 10px;
    }
    .section {
      margin-bottom: 30px;
    }
    .section-title {
      font-size: 13px;
      font-weight: 700;
      color: #374151;
      text-transform: uppercase;
      margin-bottom: 15px;
      padding-bottom: 8px;
      border-bottom: 2px solid #e5e7eb;
    }
    .customer-info {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 30px;
      margin-bottom: 30px;
    }
    .customer-block h3 {
      margin: 0 0 10px 0;
      color: #1f2937;
      font-size: 13px;
      font-weight: 600;
    }
    .customer-block p {
      margin: 3px 0;
      font-size: 13px;
      color: #666;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 20px;
    }
    th {
      background: #f3f4f6;
      padding: 12px;
      text-align: left;
      font-weight: 600;
      font-size: 13px;
      color: #374151;
      border-bottom: 2px solid #e5e7eb;
    }
    .totals {
      display: flex;
      justify-content: flex-end;
      margin: 30px 0;
    }
    .totals-box {
      width: 300px;
    }
    .total-row {
      display: flex;
      justify-content: space-between;
      padding: 8px 0;
      font-size: 14px;
    }
    .total-row.subtotal {
      border-bottom: 1px solid #e5e7eb;
    }
    .total-row.tax {
      border-bottom: 1px solid #e5e7eb;
    }
    .total-row.grand-total {
      border-bottom: 2px solid #e5e7eb;
      font-weight: 700;
      font-size: 16px;
      color: #1e40af;
      padding: 12px 0;
    }
    .total-row.paid {
      color: #16a34a;
    }
    .total-row.amount-due {
      font-weight: 700;
      font-size: 18px;
      color: ${isOverdue ? '#dc2626' : '#1e40af'};
      padding: 12px 0;
    }
    .total-label {
      flex: 1;
    }
    .total-amount {
      text-align: right;
      width: 120px;
      font-weight: 600;
    }
    .payment-box {
      background: #f0f4ff;
      border: 1px solid #dbeafe;
      border-radius: 6px;
      padding: 20px;
      margin-bottom: 20px;
    }
    .payment-box h4 {
      margin: 0 0 12px 0;
      color: #1e40af;
      font-size: 14px;
    }
    .payment-box p {
      margin: 4px 0;
      font-size: 13px;
      color: #555;
    }
    .terms {
      background: #f9fafb;
      padding: 15px;
      border-radius: 6px;
      font-size: 12px;
      color: #666;
      margin-bottom: 20px;
    }
    .terms-title {
      font-weight: 600;
      color: #374151;
      margin-bottom: 8px;
    }
    .footer {
      margin-top: 40px;
      padding-top: 20px;
      border-top: 1px solid #e5e7eb;
      text-align: center;
      font-size: 11px;
      color: #999;
    }
    .page-break {
      page-break-after: always;
    }
    ${watermarkCss}
  </style>
</head>
<body>
  ${watermarkText ? `<div class="watermark">${watermarkText}</div>` : ''}
  <div class="container">
    <!-- Header -->
    <div class="header">
      <div class="company-info">
        <h1>WC-CON</h1>
        <p>Westlake Crushing &amp; Contracting Ltd</p>
        <p>450 East River Road, Hinton, AB T7V 1Y5</p>
        <p>Phone: (780) 865-6000</p>
        <p>GST #: [GST NUMBER]</p>
      </div>
      <div class="invoice-info">
        <div class="invoice-badge">INVOICE</div>
        <div class="invoice-info-item">
          <span class="invoice-info-label">Invoice #:</span>
          <span class="invoice-info-value">${escapeHtml(invoice.invoiceNumber)}</span>
        </div>
        <div class="invoice-info-item">
          <span class="invoice-info-label">Date:</span>
          <span class="invoice-info-value">${invoice.date.toLocaleDateString('en-CA')}</span>
        </div>
        <div class="invoice-info-item">
          <span class="invoice-info-label">Due Date:</span>
          <span class="invoice-info-value">${invoice.dueDate.toLocaleDateString('en-CA')}</span>
        </div>
        <div class="invoice-info-item">
          <span class="invoice-info-label">Terms:</span>
          <span class="invoice-info-value">${escapeHtml(invoice.paymentTerms)}</span>
        </div>
      </div>
    </div>

    <!-- Customer Information -->
    <div class="customer-info">
      <div class="customer-block">
        <h3>BILL TO:</h3>
        <p style="font-weight: 600; color: #1f2937;">${escapeHtml(invoice.customer.name)}</p>
        ${invoice.customer.address ? `<p>${escapeHtml(invoice.customer.address)}</p>` : ''}
        ${invoice.customer.email ? `<p>${escapeHtml(invoice.customer.email)}</p>` : ''}
        ${invoice.customer.phone ? `<p>${escapeHtml(invoice.customer.phone)}</p>` : ''}
      </div>
    </div>

    <!-- Line Items Table -->
    <div class="section">
      <table>
        <thead>
          <tr>
            <th>Description</th>
            <th style="width: 60px; text-align: center;">Qty</th>
            <th style="width: 60px; text-align: center;">Unit</th>
            <th style="width: 100px; text-align: right;">Unit Price</th>
            <th style="width: 120px; text-align: right;">Amount</th>
          </tr>
        </thead>
        <tbody>
          ${itemsHtml}
        </tbody>
      </table>
    </div>

    ${ticketRefsHtml}

    <!-- Totals -->
    <div class="totals">
      <div class="totals-box">
        <div class="total-row subtotal">
          <div class="total-label">Subtotal</div>
          <div class="total-amount">$${invoice.subtotal.toFixed(2)}</div>
        </div>
        <div class="total-row tax">
          <div class="total-label">GST (${invoice.taxRate}%)</div>
          <div class="total-amount">$${invoice.tax.toFixed(2)}</div>
        </div>
        <div class="total-row grand-total">
          <div class="total-label">TOTAL</div>
          <div class="total-amount">$${invoice.total.toFixed(2)}</div>
        </div>
        ${invoice.amountPaid > 0 ? `
        <div class="total-row paid">
          <div class="total-label">Amount Paid</div>
          <div class="total-amount">-$${invoice.amountPaid.toFixed(2)}</div>
        </div>
        ` : ''}
        <div class="total-row amount-due">
          <div class="total-label">AMOUNT DUE</div>
          <div class="total-amount">$${invoice.amountDue.toFixed(2)}</div>
        </div>
      </div>
    </div>

    <!-- Payment Instructions -->
    ${!isPaid ? `
    <div class="payment-box">
      <h4>Payment Instructions</h4>
      <p><strong>By Cheque:</strong> Make payable to <em>Westlake Crushing &amp; Contracting Ltd</em></p>
      <p><strong>By E-Transfer:</strong> Send to <em>accounting@wccon.com</em></p>
      <p style="margin-top: 8px; font-size: 12px; color: #888;">Please include invoice number <strong>${escapeHtml(invoice.invoiceNumber)}</strong> with your payment.</p>
    </div>
    ` : ''}

    <!-- Notes -->
    ${invoice.notes ? `
    <div class="terms">
      <div class="terms-title">NOTES</div>
      <p>${escapeHtml(invoice.notes)}</p>
    </div>
    ` : ''}

    <!-- Footer -->
    <div class="footer">
      <p>Thank you for your business!</p>
      <p>Westlake Crushing &amp; Contracting Ltd &mdash; 450 East River Road, Hinton, AB T7V 1Y5 &mdash; (780) 865-6000</p>
    </div>
  </div>
</body>
</html>
`;

  return html;
}

// ---------------------------------------------------------------------------
// Ticket PDF
// ---------------------------------------------------------------------------

/**
 * Material entry on a ticket
 */
export interface TicketMaterial {
  material: string;
  quantity: number;
  unit: string;
}

/**
 * Full ticket data for PDF generation
 */
export interface TicketData {
  ticketNumber: string;
  date: Date;
  driverName: string;
  workOrderRef?: string;
  timeStart: string;
  timeEnd: string;
  hoursWorked: number;
  kmStart: number;
  kmEnd: number;
  kmTotal: number;
  materials: TicketMaterial[];
  equipment: string[];
  jobSiteLocation: string;
  notes?: string;
}

/**
 * Generate a printable ticket summary PDF
 * @param ticket Ticket data to generate PDF from
 * @returns HTML string that can be converted to PDF
 */
export function generateTicketPDF(ticket: TicketData): string {
  const materialsHtml = ticket.materials
    .map(
      (m) => `
      <tr>
        <td style="padding: 8px 10px; border-bottom: 1px solid #e5e7eb;">${escapeHtml(m.material)}</td>
        <td style="padding: 8px 10px; border-bottom: 1px solid #e5e7eb; text-align: center; width: 80px;">${m.quantity}</td>
        <td style="padding: 8px 10px; border-bottom: 1px solid #e5e7eb; text-align: center; width: 80px;">${escapeHtml(m.unit)}</td>
      </tr>`
    )
    .join('');

  const equipmentHtml = ticket.equipment
    .map((e) => `<li style="margin-bottom: 4px;">${escapeHtml(e)}</li>`)
    .join('');

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Ticket ${escapeHtml(ticket.ticketNumber)}</title>
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      color: #333;
      line-height: 1.6;
      margin: 0;
      padding: 20px;
    }
    .container {
      max-width: 800px;
      margin: 0 auto;
      background: white;
      padding: 40px;
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: start;
      margin-bottom: 30px;
      border-bottom: 3px solid #1e40af;
      padding-bottom: 20px;
    }
    .company-info h1 {
      margin: 0;
      color: #1e40af;
      font-size: 28px;
      font-weight: bold;
    }
    .company-info p {
      margin: 5px 0;
      color: #666;
      font-size: 13px;
    }
    .ticket-badge {
      display: inline-block;
      background: #1e40af;
      color: white;
      font-size: 18px;
      font-weight: 800;
      padding: 6px 16px;
      border-radius: 4px;
      letter-spacing: 2px;
      margin-bottom: 10px;
    }
    .ticket-info {
      text-align: right;
    }
    .ticket-info-item {
      margin: 5px 0;
    }
    .ticket-info-label {
      font-weight: 600;
      color: #1e40af;
    }
    .ticket-info-value {
      margin-left: 10px;
    }
    .details-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
      margin-bottom: 30px;
    }
    .detail-box {
      background: #f9fafb;
      border: 1px solid #e5e7eb;
      border-radius: 6px;
      padding: 16px;
    }
    .detail-box h4 {
      margin: 0 0 10px 0;
      font-size: 12px;
      font-weight: 700;
      color: #1e40af;
      text-transform: uppercase;
    }
    .detail-row {
      display: flex;
      justify-content: space-between;
      padding: 4px 0;
      font-size: 13px;
    }
    .detail-row .label {
      color: #666;
    }
    .detail-row .value {
      font-weight: 600;
      color: #1f2937;
    }
    .section {
      margin-bottom: 30px;
    }
    .section-title {
      font-size: 13px;
      font-weight: 700;
      color: #374151;
      text-transform: uppercase;
      margin-bottom: 15px;
      padding-bottom: 8px;
      border-bottom: 2px solid #e5e7eb;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 20px;
    }
    th {
      background: #f3f4f6;
      padding: 10px 12px;
      text-align: left;
      font-weight: 600;
      font-size: 13px;
      color: #374151;
      border-bottom: 2px solid #e5e7eb;
    }
    .equipment-list {
      list-style: none;
      padding: 0;
      margin: 0;
      font-size: 13px;
    }
    .location-box {
      background: #f0f4ff;
      border: 1px solid #dbeafe;
      border-radius: 6px;
      padding: 16px;
      margin-bottom: 30px;
    }
    .location-box h4 {
      margin: 0 0 6px 0;
      color: #1e40af;
      font-size: 13px;
      font-weight: 700;
    }
    .location-box p {
      margin: 0;
      font-size: 14px;
      color: #1f2937;
      font-weight: 600;
    }
    .notes-box {
      background: #f9fafb;
      border: 1px solid #e5e7eb;
      border-radius: 6px;
      padding: 16px;
      margin-bottom: 30px;
      font-size: 13px;
      color: #555;
    }
    .signature-section {
      margin-top: 60px;
      padding-top: 20px;
    }
    .signature-line {
      display: flex;
      justify-content: space-between;
      gap: 40px;
    }
    .signature-block {
      flex: 1;
    }
    .signature-block .line {
      border-bottom: 1px solid #333;
      height: 40px;
      margin-bottom: 6px;
    }
    .signature-block .caption {
      font-size: 11px;
      color: #666;
    }
    .footer {
      margin-top: 40px;
      padding-top: 20px;
      border-top: 1px solid #e5e7eb;
      text-align: center;
      font-size: 11px;
      color: #999;
    }
    .page-break {
      page-break-after: always;
    }
  </style>
</head>
<body>
  <div class="container">
    <!-- Header -->
    <div class="header">
      <div class="company-info">
        <h1>WC-CON</h1>
        <p>Westlake Crushing &amp; Contracting Ltd</p>
        <p>450 East River Road, Hinton, AB T7V 1Y5</p>
        <p>Phone: (780) 865-6000</p>
      </div>
      <div class="ticket-info">
        <div class="ticket-badge">TICKET</div>
        <div class="ticket-info-item">
          <span class="ticket-info-label">Ticket #:</span>
          <span class="ticket-info-value">${escapeHtml(ticket.ticketNumber)}</span>
        </div>
        <div class="ticket-info-item">
          <span class="ticket-info-label">Date:</span>
          <span class="ticket-info-value">${ticket.date.toLocaleDateString('en-CA')}</span>
        </div>
        ${ticket.workOrderRef ? `
        <div class="ticket-info-item">
          <span class="ticket-info-label">Work Order:</span>
          <span class="ticket-info-value">${escapeHtml(ticket.workOrderRef)}</span>
        </div>
        ` : ''}
        <div class="ticket-info-item">
          <span class="ticket-info-label">Driver:</span>
          <span class="ticket-info-value">${escapeHtml(ticket.driverName)}</span>
        </div>
      </div>
    </div>

    <!-- Job Site Location -->
    <div class="location-box">
      <h4>JOB SITE LOCATION</h4>
      <p>${escapeHtml(ticket.jobSiteLocation)}</p>
    </div>

    <!-- Time & KM Details -->
    <div class="details-grid">
      <div class="detail-box">
        <h4>Time</h4>
        <div class="detail-row">
          <span class="label">Start</span>
          <span class="value">${escapeHtml(ticket.timeStart)}</span>
        </div>
        <div class="detail-row">
          <span class="label">End</span>
          <span class="value">${escapeHtml(ticket.timeEnd)}</span>
        </div>
        <div class="detail-row" style="border-top: 1px solid #e5e7eb; margin-top: 6px; padding-top: 6px;">
          <span class="label">Hours Worked</span>
          <span class="value">${ticket.hoursWorked.toFixed(1)}</span>
        </div>
      </div>
      <div class="detail-box">
        <h4>Kilometres</h4>
        <div class="detail-row">
          <span class="label">Start</span>
          <span class="value">${ticket.kmStart.toLocaleString()}</span>
        </div>
        <div class="detail-row">
          <span class="label">End</span>
          <span class="value">${ticket.kmEnd.toLocaleString()}</span>
        </div>
        <div class="detail-row" style="border-top: 1px solid #e5e7eb; margin-top: 6px; padding-top: 6px;">
          <span class="label">Total KM</span>
          <span class="value">${ticket.kmTotal.toLocaleString()}</span>
        </div>
      </div>
    </div>

    <!-- Materials -->
    ${ticket.materials.length > 0 ? `
    <div class="section">
      <div class="section-title">Materials</div>
      <table>
        <thead>
          <tr>
            <th>Material</th>
            <th style="width: 80px; text-align: center;">Quantity</th>
            <th style="width: 80px; text-align: center;">Unit</th>
          </tr>
        </thead>
        <tbody>
          ${materialsHtml}
        </tbody>
      </table>
    </div>
    ` : ''}

    <!-- Equipment -->
    ${ticket.equipment.length > 0 ? `
    <div class="section">
      <div class="section-title">Equipment Used</div>
      <ul class="equipment-list">
        ${equipmentHtml}
      </ul>
    </div>
    ` : ''}

    <!-- Notes -->
    ${ticket.notes ? `
    <div class="section">
      <div class="section-title">Notes</div>
      <div class="notes-box">${escapeHtml(ticket.notes)}</div>
    </div>
    ` : ''}

    <!-- Signature -->
    <div class="signature-section">
      <div class="signature-line">
        <div class="signature-block">
          <div class="line"></div>
          <div class="caption">Driver Signature</div>
        </div>
        <div class="signature-block">
          <div class="line"></div>
          <div class="caption">Date</div>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div class="footer">
      <p>Westlake Crushing &amp; Contracting Ltd &mdash; 450 East River Road, Hinton, AB T7V 1Y5 &mdash; (780) 865-6000</p>
    </div>
  </div>
</body>
</html>
`;

  return html;
}
