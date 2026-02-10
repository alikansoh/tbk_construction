export type SendEmailPayload = {
    name: string;
    email?: string;
    phone?: string;
    postcode: string;
    service: string;
    message?: string;
    isEmergency?: boolean;
  };
  
  /**
   * sendEmailBrevoClient
   * - Client-side helper that posts to the server API route /api/send-email
   * - Keeps Brevo API key server-side
   */
  export async function sendEmailBrevoClient(payload: SendEmailPayload): Promise<{ status: 'ok' } | { status: 'error'; error: string }> {
    try {
      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
  
      const data = await res.json();
  
      if (!res.ok || data?.ok !== true) {
        return { status: 'error', error: data?.error || (Array.isArray(data?.errors) ? data.errors.join(', ') : 'Unknown error') };
      }
  
      return { status: 'ok' };
    } catch (err) {
      return { status: 'error', error: err instanceof Error ? err.message : String(err) };
    }
  }