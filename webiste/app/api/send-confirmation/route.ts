import { NextResponse } from 'next/server';

type RequestBody = {
  email?: string;
  name?: string;
  service?: string;
  postcode?: string;
  isEmergency?: boolean | string;
};

function escapeHtml(input?: string) {
  if (!input) return '';
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export async function POST(request: Request) {
  try {
    const body: RequestBody = await request.json();

    if (!body.email || typeof body.email !== 'string' || body.email.trim().length === 0) {
      return NextResponse.json({ ok: false, error: 'recipient email required' }, { status: 400 });
    }

    const BREVO_API_KEY = process.env.BREVO_API_KEY;
    const FROM_EMAIL = process.env.BREVO_FROM_EMAIL ?? 'info@tbkconstruction.co.uk';
    const FROM_NAME = process.env.BREVO_FROM_NAME ?? 'TBK Construction';

    if (!BREVO_API_KEY) {
      return NextResponse.json({ ok: false, error: 'Mail provider not configured' }, { status: 500 });
    }

    const nameEsc = escapeHtml(body.name ?? 'Valued Customer');
    const serviceEsc = escapeHtml(body.service ?? 'your request');
    const postcodeEsc = escapeHtml(body.postcode ?? '');
    const isEmergency = Boolean(body.isEmergency);

    const subject = `Thanks for contacting TBK Construction${isEmergency ? ' — Emergency request received' : ''}`;

    const htmlContent = `<!doctype html>
<html lang="en">
  <head><meta charset="utf-8" /></head>
  <body style="margin:0;padding:0;font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial;color:#0f172a;background:#f7fafc;">
                  <img src="https://tbk-construction.vercel.app/logo.png" alt="${FROM_NAME}" width="120" style="display:block; margin:0 auto 12px; max-width:120px; height:auto;" />

    <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
      <tr>
        <td align="center" style="padding:24px;">
          <table width="600" style="max-width:600px;background:#ffffff;border-radius:12px;overflow:hidden;" cellpadding="0" cellspacing="0" role="presentation">
            <tr>
              <td style="padding:20px 24px;text-align:center;background:linear-gradient(90deg,#f97316,#ef4444);color:#fff;">
                <h1 style="margin:0;font-size:20px;">Thank you, ${nameEsc}!</h1>
              </td>
            </tr>
            <tr>
              <td style="padding:20px 24px;color:#0f172a;">
                <p style="margin:0 0 10px;">Thanks for contacting TBK Construction. We have received your request regarding <strong>${serviceEsc}</strong>${postcodeEsc ? ` (postcode: ${postcodeEsc})` : ''}.</p>
                <p style="margin:0 0 10px;">${isEmergency ? 'We marked this as an emergency and will prioritise your request.' : 'We will reply to you as soon as possible.'}</p>

                <div style="margin:16px 0;">
                  <a href="tel:07340170864" style="display:inline-block;padding:10px 14px;background:linear-gradient(90deg,#f97316,#ef4444);color:#fff;text-decoration:none;border-radius:8px;font-weight:700;">Call us: 07340 170864</a>
                </div>

                <p style="margin:12px 0 0;color:#6b7280;font-size:13px;">If you provided additional details we will include them in our reply. You don't need to reply to this message.</p>
              </td>
            </tr>

            <tr>
              <td style="padding:14px 24px;background:#f8fafc;color:#6b7280;font-size:12px;text-align:center;">
                TBK Construction — Trusted local tradespeople
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;

    const textContent = `Thank you ${body.name ?? 'Customer'},\n\nWe received your request regarding ${body.service ?? 'your request'}${body.postcode ? ` (postcode: ${body.postcode})` : ''}.\n\n${isEmergency ? 'We marked this as an emergency and will prioritise your request.' : 'We will reply to you as soon as possible.'}\n\nCall us: 07340 170864\n\n— TBK Construction`;

    const payload = {
      sender: { name: FROM_NAME, email: FROM_EMAIL },
      to: [{ email: body.email }],
      subject,
      htmlContent,
      textContent,
      headers: { 'X-Mailer': 'TBK-Website-Confirmation' }
    };

    const resp = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': BREVO_API_KEY,
      },
      body: JSON.stringify(payload),
    });

    if (!resp.ok) {
      const text = await resp.text();
      return NextResponse.json({ ok: false, error: `Brevo error: ${text}` }, { status: resp.status });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}