export const TURNSTILE_TEST_SITE_KEY = "1x00000000000000000000AA";
export const TURNSTILE_TEST_SECRET_KEY = "1x0000000000000000000000000000000AA";

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
 * Returns the server-side secret key used to validate Cloudflare Turnstile tokens.
 * Falls back to Cloudflare's documented test key when running outside production
 * so local development and automated tests can proceed without extra setup.
 */
export function getTurnstileSecretKey(): string {
  if (process.env.TURNSTILE_SECRET_KEY) {
    return process.env.TURNSTILE_SECRET_KEY;
  }

  if (process.env.NODE_ENV === "production") {
    throw new Error("TURNSTILE_SECRET_KEY must be configured in production.");
  }

  return TURNSTILE_TEST_SECRET_KEY;
}

/**
 * Returns the public site key exposed to the browser.
 * Prefers NEXT_PUBLIC_TURNSTILE_SITE_KEY, then TURNSTILE_SITE_KEY (for backwards compatibility),
 * and finally the Cloudflare test key when not running in production.
 */
export function getTurnstileSiteKey(): string {
  const explicitSiteKey =
    process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ??
    process.env.TURNSTILE_SITE_KEY;

  if (explicitSiteKey) {
    return explicitSiteKey;
  }

  if (process.env.NODE_ENV === "production") {
    return "";
  }

  return TURNSTILE_TEST_SITE_KEY;
}
