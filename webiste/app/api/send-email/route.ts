import { NextResponse } from 'next/server';

type RequestBody = {
  name?: string;
  email?: string;
  phone?: string;
  postcode?: string;
  service?: string;
  message?: string;
  isEmergency?: boolean | string;
};

function validatePayload(body: RequestBody) {
  const errors: string[] = [];

  if (!body.name || String(body.name).trim().length === 0) {
    errors.push('name is required');
  }
  if (!body.postcode || String(body.postcode).trim().length === 0) {
    errors.push('postcode is required');
  }
  if (!body.service || String(body.service).trim().length === 0) {
    errors.push('service is required');
  }
  if ((!body.email || String(body.email).trim().length === 0) && (!body.phone || String(body.phone).trim().length === 0)) {
    errors.push('either email or phone is required');
  }

  return errors;
}

/**
 * Basic HTML escaper for user-supplied values to avoid accidental injection
 */
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

    const errors = validatePayload(body);
    if (errors.length > 0) {
      return NextResponse.json({ ok: false, errors }, { status: 400 });
    }

    const BREVO_API_KEY = process.env.BREVO_API_KEY;
    const FROM_EMAIL = process.env.BREVO_FROM_EMAIL ?? 'info@tbkconstruction.co.uk';
    const FROM_NAME = process.env.BREVO_FROM_NAME ?? 'TBK Construction';
    const TO_EMAIL = process.env.BREVO_TO_EMAIL ?? 'info@tbkconstruction.co.uk';
    const TO_NAME = process.env.BREVO_TO_NAME ?? 'TBK Team';

    if (!BREVO_API_KEY) {
      return NextResponse.json({ ok: false, error: 'Mail provider not configured' }, { status: 500 });
    }

    const isEmergency = Boolean(body.isEmergency);
    const subjectPrefix = isEmergency ? '🚨 EMERGENCY' : 'New website inquiry';
    const subject = `${subjectPrefix} • ${body.service ?? 'General'} • ${body.name}`;

    const nameEsc = escapeHtml(body.name);
    const serviceEsc = escapeHtml(body.service);
    const postcodeEsc = escapeHtml(body.postcode);
    const phoneEsc = escapeHtml(body.phone ?? 'N/A');
    const emailEsc = escapeHtml(body.email ?? 'N/A');
    const messageEsc = escapeHtml(body.message ?? '-').replace(/\n/g, '<br/>');

    // Plain-text fallback (improved)
    const textContent = [
      `${subjectPrefix}`,
      '',
      `Name: ${body.name}`,
      `Service: ${body.service}`,
      `Postcode: ${body.postcode}`,
      `Phone: ${body.phone ?? 'N/A'}`,
      `Email: ${body.email ?? 'N/A'}`,
      `Emergency: ${String(body.isEmergency ?? false)}`,
      '',
      'Message:',
      `${body.message ?? '-'}`,
      '',
      'Sent from website contact form'
    ].join('\n');

    // HTML email — crafted to be modern but email-client friendly (table layout, inline CSS)
    const htmlContent = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${escapeHtml(subject)}</title>
  <style>
    /* Basic responsive and email-safe styles */
    body { margin:0; padding:0; background:#f3f4f6; -webkit-text-size-adjust:100%; -ms-text-size-adjust:100%; }
    table { border-collapse:collapse; }
    img { border:0; outline:none; text-decoration:none; -ms-interpolation-mode:bicubic; }
    .container { width:100%; max-width:600px; margin:0 auto; }
    .header { padding:24px; text-align:center; }
    .card { background:#ffffff; border-radius:10px; overflow:hidden; }
    .content { padding:24px; color:#0f172a; font-family:system-ui,-apple-system,Segoe UI,Roboto,'Helvetica Neue',Arial; line-height:1.4; }
    .label { color:#94a3b8; font-size:13px; margin-bottom:6px; }
    .value { color:#0f172a; font-weight:600; font-size:15px; margin-bottom:12px; }
    .message { background:#f8fafc; padding:12px; border-radius:8px; color:#0f172a; font-size:14px; }
    .footer { padding:18px; font-size:12px; color:#94a3b8; text-align:center; }
    .btn { display:inline-block; padding:10px 18px; background:linear-gradient(90deg,#f97316,#ef4444); color:#fff; text-decoration:none; border-radius:8px; font-weight:700; }
    .meta { font-size:13px; color:#6b7280; }
    .emergency { background: linear-gradient(90deg,#fee2e2,#fecaca); color:#b91c1c; padding:10px 14px; border-radius:8px; font-weight:700; display:inline-block; margin-bottom:12px; }
    @media (max-width:420px) {
      .content { padding:16px; }
      .header { padding:18px; }
    }
  </style>
</head>
<body>
  <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
    <tr>
      <td align="center" style="padding:28px 12px;">
        <table class="container" cellpadding="0" cellspacing="0" role="presentation">
          <tr>
            <td class="header" style="text-align:center;">
              <!-- Optionally replace with an absolute URL to your logo -->
              <img src="https://tbk-construction.vercel.app/logo.png" alt="${FROM_NAME}" width="120" style="display:block; margin:0 auto 12px; max-width:120px; height:auto;" />
              <div class="meta">TBK Construction &bull; Website Inquiry</div>
            </td>
          </tr>

          <tr>
            <td>
              <table class="card" width="100%" cellpadding="0" cellspacing="0" role="presentation">
                <tr>
                  <td class="content">
                    ${isEmergency ? `<div style="margin-bottom:12px;"><span class="emergency">🚨 EMERGENCY REQUEST</span></div>` : ''}
                    <h2 style="margin:0 0 8px; font-size:20px; color:#0f172a;">${isEmergency ? 'Immediate attention required' : 'New inquiry received'}</h2>
                    <p style="margin:0 0 16px; color:#6b7280;">A new contact form submission has been received via your website.</p>

                    <div style="display:flex; gap:18px; flex-wrap:wrap; margin-bottom:14px;">
                      <div style="min-width:160px; flex:1;">
                        <div class="label">Name</div>
                        <div class="value">${nameEsc}</div>
                      </div>

                      <div style="min-width:160px; flex:1;">
                        <div class="label">Service</div>
                        <div class="value">${serviceEsc}</div>
                      </div>
                    </div>

                    <div style="display:flex; gap:18px; flex-wrap:wrap; margin-bottom:14px;">
                      <div style="min-width:160px; flex:1;">
                        <div class="label">Postcode</div>
                        <div class="value">${postcodeEsc}</div>
                      </div>

                      <div style="min-width:160px; flex:1;">
                        <div class="label">Phone</div>
                        <div class="value">${phoneEsc}</div>
                      </div>

                      <div style="min-width:160px; flex:1;">
                        <div class="label">Email</div>
                        <div class="value">${emailEsc}</div>
                      </div>
                    </div>

                    <div style="margin-bottom:14px;">
                      <div class="label">Message</div>
                      <div class="message">${messageEsc}</div>
                    </div>

                    <div style="margin-top:18px; display:flex; gap:12px; align-items:center; flex-wrap:wrap;">
                      <a href="mailto:${emailEsc !== 'N/A' ? emailEsc : TO_EMAIL}" class="btn">Reply to sender</a>
                      <a href="mailto:${TO_EMAIL}?subject=${encodeURIComponent(subject)}" style="color:#0f172a; text-decoration:underline; font-size:14px;">Open in mailbox</a>
                    </div>

                    <hr style="border:none; border-top:1px solid #eef2f7; margin:18px 0;" />

                    <div style="font-size:12px; color:#9ca3af;">
                      Sent: <strong>${new Date().toLocaleString()}</strong><br />
                      Source: Website contact form
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td class="footer">
              <div>TBK Construction — Trusted local tradespeople</div>
              <div style="margin-top:6px;">This message was generated automatically. Please do not share your Brevo API key.</div>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

    const payload = {
      sender: { name: FROM_NAME, email: FROM_EMAIL },
      to: [{ email: TO_EMAIL, name: TO_NAME }],
      replyTo: body.email ? { email: body.email, name: body.name ?? undefined } : undefined,
      subject,
      htmlContent,
      textContent,
      headers: {
        'X-Mailer': 'TBK-Website-Brevo'
      }
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
      // return Brevo body for debugging (safe to show developer). Remove detailed body in production.
      return NextResponse.json({ ok: false, error: `Brevo error: ${text}` }, { status: resp.status });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}