import axios, { AxiosError } from 'axios';

/**
 * Enquiry submission helper.
 *
 * The backend runs on a free-tier host that sleeps when idle, so the first
 * request can take 30-60 s while it wakes up. To keep the form reliable we:
 *   1. warm the server up as soon as the form is shown (fire-and-forget),
 *   2. use a timeout long enough for a cold start,
 *   3. retry automatically on timeouts / 502 / 503 / 504 / network errors,
 *   4. translate failures into clear, actionable messages.
 */

const ATTEMPT_TIMEOUT_MS = 45_000;
const MAX_ATTEMPTS = 3;
const RETRY_DELAYS_MS = [3_000, 6_000];

export function warmUpBackend(enquiryUrl: string): void {
  try {
    const base = enquiryUrl.replace(/\/api\/public\/enquiry\/?$/, '');
    // no-cors: we only need the request to reach the server and wake it
    fetch(`${base}/api/public/health`, { method: 'GET', mode: 'no-cors', cache: 'no-store' }).catch(() => {});
  } catch {
    /* best effort */
  }
}

export interface FieldErrors {
  [field: string]: string;
}

export class EnquiryError extends Error {
  retryable: boolean;
  fieldErrors?: FieldErrors;
  constructor(message: string, retryable = false, fieldErrors?: FieldErrors) {
    super(message);
    this.retryable = retryable;
    this.fieldErrors = fieldErrors;
  }
}

function isTransient(err: AxiosError): boolean {
  if (err.code === 'ECONNABORTED' || err.code === 'ETIMEDOUT') return true;
  if (!err.response) return true; // network / CORS / DNS
  return [502, 503, 504].includes(err.response.status);
}

function toEnquiryError(err: unknown): EnquiryError {
  if (!axios.isAxiosError(err)) {
    return new EnquiryError('Something unexpected went wrong. Please try again.', true);
  }
  const status = err.response?.status;
  const data = err.response?.data as { message?: string; data?: unknown } | undefined;

  if (status === 400 || status === 422) {
    const fe = (data?.data && typeof data.data === 'object' ? data.data : undefined) as FieldErrors | undefined;
    const detail = fe ? Object.values(fe).filter(Boolean).join(' ') : '';
    return new EnquiryError(
      detail || data?.message || 'Some of the details look incorrect. Please check the form and try again.',
      false,
      fe,
    );
  }
  if (status === 429) {
    return new EnquiryError('You have sent several enquiries in a short time. Please wait a few minutes and try again.');
  }
  if (status === 404) {
    return new EnquiryError('This enquiry form is not configured correctly. Please email us directly and we will help.');
  }
  if (status && status >= 500 && ![502, 503, 504].includes(status)) {
    return new EnquiryError('Our server hit an error while saving your enquiry. Please try again shortly or email us directly.', true);
  }
  if (isTransient(err)) {
    return new EnquiryError(
      'Our server is taking longer than usual to respond. Your enquiry may not have been sent. Please try again in a minute, or email us directly.',
      true,
    );
  }
  return new EnquiryError(data?.message || 'We could not submit your enquiry. Please try again.', true);
}

export async function submitEnquiry<T = unknown>(
  url: string,
  payload: Record<string, unknown>,
  onRetry?: (attempt: number) => void,
): Promise<T> {
  let lastErr: unknown;
  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    try {
      const res = await axios.post(url, payload, {
        timeout: ATTEMPT_TIMEOUT_MS,
        headers: { 'Content-Type': 'application/json' },
      });
      return res.data as T;
    } catch (err) {
      lastErr = err;
      // Only retry transient failures. A timeout may have actually saved the
      // ticket, so retries are limited to a couple of attempts.
      if (!axios.isAxiosError(err) || !isTransient(err) || attempt === MAX_ATTEMPTS) break;
      onRetry?.(attempt + 1);
      await new Promise(r => setTimeout(r, RETRY_DELAYS_MS[attempt - 1] ?? 5_000));
    }
  }
  throw toEnquiryError(lastErr);
}
