import "server-only";

import {
  TURNSTILE_PROTECTED_ENDPOINTS,
  TURNSTILE_TEST_SECRET_KEY,
  TURNSTILE_TEST_SITE_KEY,
  type TurnstileProtectedEndpoint,
} from "@/config/system";

export {
  TURNSTILE_PROTECTED_ENDPOINTS,
  TURNSTILE_TEST_SECRET_KEY,
  TURNSTILE_TEST_SITE_KEY,
};
export type { TurnstileProtectedEndpoint };

/**
 * Returns the server-side secret key used to validate Cloudflare Turnstile tokens.
 * Falls back to Cloudflare's documented test key when running outside production
 * so local development and automated tests can proceed without extra setup.
 *
 * @throws {Error} When TURNSTILE_SECRET_KEY is not configured in production environment
 * @returns The Turnstile secret key for server-side validation
 */
export function getTurnstileSecretKey(): string {
  const secretKey = process.env.TURNSTILE_SECRET_KEY;

  if (secretKey) {
    return secretKey;
  }

  if (process.env.NODE_ENV === "production") {
    throw new Error(
      "TURNSTILE_SECRET_KEY must be configured in production environment. " +
        "Please set this environment variable with your Cloudflare Turnstile secret key."
    );
  }

  return TURNSTILE_TEST_SECRET_KEY;
}
