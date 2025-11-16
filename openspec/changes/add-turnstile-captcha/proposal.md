## Why

- Recent auth penetration tests highlighted that Nomad's OTP and password flows are missing bot protection, making brute-force credential stuffing and OTP spam trivial.
- Cloudflare Turnstile is already approved by the security checklist, and Better Auth exposes a first-party plugin that keeps the integration surface small.
- Shipping a consistent human-verification step across every auth flow reduces abuse without requiring product rework.

## What Changes

- Wire up Better Auth's Turnstile plugin so every email/password, email OTP, and phone OTP entry point validates a Turnstile token server-side before processing the request.
- Expose the Cloudflare Turnstile site key to client auth screens (sign-in, sign-up, OTP request) and render the Turnstile widget so users can complete the challenge.
- Extend the auth UI + error handling to block submissions when the Turnstile token is missing or invalid and to guide users to retry the challenge.
- Document the new `TURNSTILE_SITE_KEY`/`TURNSTILE_SECRET_KEY` configuration requirements.

## Impact

- Requires Cloudflare Turnstile credentials in every environment; local developers will need sandbox keys.
- Adds a network call to Cloudflare during auth flows; minimal latency impact expected but must be monitored.
- Slightly more complex auth UI due to the extra widget, but still within existing layout constraints.
