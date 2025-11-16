import { isProduction } from "./utils";

/**
 * Cloudflare's test site key for Turnstile CAPTCHA.
 * This key always passes validation in test/development environments.
 * @see https://developers.cloudflare.com/turnstile/reference/testing/
 */
export const TURNSTILE_TEST_SITE_KEY = "1x00000000000000000000AA" as const;

/**
 * Cloudflare's test secret key for Turnstile CAPTCHA.
 * This key always passes validation in test/development environments.
 * @see https://developers.cloudflare.com/turnstile/reference/testing/
 */
export const TURNSTILE_TEST_SECRET_KEY =
  "1x0000000000000000000000000000000AA" as const;

/**
 * List of authentication endpoints that require Turnstile CAPTCHA validation.
 * These endpoints are protected against automated attacks and abuse.
 */
export const TURNSTILE_PROTECTED_ENDPOINTS = [
  "/sign-in/email",
  "/sign-in/phone-number",
  "/sign-in/email-otp",
  "/phone-number/send-otp",
  "/phone-number/verify",
  "/email-otp/send-verification-otp",
  "/email-otp/verify-email",
] as const;

/**
 * Type for protected endpoint paths.
 */
export type TurnstileProtectedEndpoint =
  (typeof TURNSTILE_PROTECTED_ENDPOINTS)[number];

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
