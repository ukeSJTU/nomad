import { isProduction } from "@/config/env";
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

  if (isProduction()) {
    throw new Error(
      "TURNSTILE_SECRET_KEY must be configured in production environment. " +
        "Please set this environment variable with your Cloudflare Turnstile secret key."
    );
  }

  return TURNSTILE_TEST_SECRET_KEY;
}

/**
 * Returns the public site key exposed to the browser.
 * Prefers NEXT_PUBLIC_TURNSTILE_SITE_KEY, then TURNSTILE_SITE_KEY (for backwards compatibility),
 * and finally the Cloudflare test key when not running in production.
 *
 * @throws {Error} When no site key is configured in production environment
 * @returns The Turnstile site key for client-side validation
 */
export function getTurnstileSiteKey(): string {
  const siteKey =
    process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ??
    process.env.TURNSTILE_SITE_KEY;

  if (siteKey) {
    return siteKey;
  }

  if (isProduction()) {
    throw new Error(
      "NEXT_PUBLIC_TURNSTILE_SITE_KEY must be configured in production environment. " +
        "Please set this environment variable with your Cloudflare Turnstile site key."
    );
  }

  return TURNSTILE_TEST_SITE_KEY;
}
