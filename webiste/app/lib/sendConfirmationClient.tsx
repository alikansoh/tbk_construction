export type ConfirmationPayload = {
    email: string;
    name?: string;
    service?: string;
    postcode?: string;
    isEmergency?: boolean;
  };
  
  /**
   * sendConfirmationClient
   * - posts to /api/send-confirmation which sends a thank-you email to the customer.
   */
  export async function sendConfirmationClient(payload: ConfirmationPayload): Promise<{ status: 'ok' } | { status: 'error'; error: string }> {
    try {
      const res = await fetch('/api/send-confirmation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
  
      const data = await res.json();
      if (!res.ok || data?.ok !== true) {
        return { status: 'error', error: data?.error || 'Failed to send confirmation email' };
      }
      return { status: 'ok' };
    } catch (err) {
      return { status: 'error', error: err instanceof Error ? err.message : String(err) };
    }
  }