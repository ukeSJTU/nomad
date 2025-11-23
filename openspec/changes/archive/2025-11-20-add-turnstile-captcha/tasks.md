1. [ ] Update runtime configuration to accept `TURNSTILE_SITE_KEY` and `TURNSTILE_SECRET_KEY`, document defaults, and surface the site key to auth UIs via existing config utilities.
2. [ ] Render the Cloudflare Turnstile widget (or fallback copy) across all sign-in/sign-up/OTP request forms and plumb the token through form submissions.
3. [ ] Enable Better Auth's Turnstile plugin so server-side auth flows reject requests without a verified token and emit actionable errors/telemetry.
4. [ ] Add integration/unit coverage (e.g., `src/lib/auth.test.ts` or route tests) proving the auth layer blocks missing/invalid captcha tokens and manual QA notes for the widget path.
