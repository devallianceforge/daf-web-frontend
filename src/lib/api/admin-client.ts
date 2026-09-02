import { getFirebaseAuth } from '@/lib/firebase';

const ADMIN_API_URL =
  process.env.NEXT_PUBLIC_ADMIN_API_URL ?? 'http://localhost:3001';

export type ApiFieldError = {
  path: string;
  message: string;
};

export class AdminApiError extends Error {
  status: number;
  details?: ApiFieldError[];

  constructor(status: number, message: string, details?: ApiFieldError[]) {
    super(message);
    this.name = 'AdminApiError';
    this.status = status;
    this.details = details;
  }
}

async function getAdminToken(): Promise<string> {
  const auth = getFirebaseAuth();
  const user = auth.currentUser;

  if (!user) {
    throw new AdminApiError(401, 'Not signed in. Please sign in again.');
  }

  return user.getIdToken();
}

export function adminApiErrorMessage(error: unknown): string {
  if (error instanceof AdminApiError) {
    if (error.details?.length) {
      const fields = error.details
        .map((detail) => `${detail.path}: ${detail.message}`)
        .join('; ');
      return `${error.message} (${fields})`;
    }
    return error.message;
  }
  if (error instanceof Error) {
    return error.message;
  }
  return 'Something went wrong. Please try again.';
}

/**
 * Authenticated fetch against the admin API. Attaches the Firebase ID token
 * as a Bearer credential. JSON bodies get a Content-Type header; FormData
 * bodies (multipart uploads) are sent as-is so the browser sets the boundary.
 */
export async function adminApiFetch(
  path: string,
  init: RequestInit = {},
): Promise<Response> {
  const token = await getAdminToken();

  const headers = new Headers(init.headers);
  headers.set('Authorization', `Bearer ${token}`);

  const isFormData =
    typeof FormData !== 'undefined' && init.body instanceof FormData;
  if (init.body != null && !isFormData) {
    headers.set('Content-Type', 'application/json');
  }

  const response = await fetch(`${ADMIN_API_URL}${path}`, {
    ...init,
    headers,
  });

  if (!response.ok) {
    let message = `Request failed (${response.status}).`;
    let details: ApiFieldError[] | undefined;

    try {
      const payload = await response.json();
      if (typeof payload?.error === 'string') {
        message = payload.error;
      }
      if (Array.isArray(payload?.details)) {
        details = payload.details;
      }
    } catch {
      // Non-JSON error body — keep the default message.
    }

    throw new AdminApiError(response.status, message, details);
  }

  return response;
}