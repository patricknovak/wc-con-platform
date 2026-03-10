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
