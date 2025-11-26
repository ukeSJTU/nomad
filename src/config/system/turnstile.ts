/**
 * Cloudflare Turnstile constants for shared use across server/client helpers.
 */

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
  "/phone-number/send-otp",
  "/phone-number/verify",
  "/email-otp/send-verification-otp",
  "/email-otp/verify-email",
] as const;

export type TurnstileProtectedEndpoint =
  (typeof TURNSTILE_PROTECTED_ENDPOINTS)[number];
