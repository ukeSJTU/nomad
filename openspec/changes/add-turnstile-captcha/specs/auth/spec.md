## ADDED Requirements

### Requirement: Human Verification For Auth Actions

Every auth entry point (email/password, email OTP, phone OTP) MUST validate a Cloudflare Turnstile token before continuing.

#### Scenario: OTP Request Requires Verified Token

- **GIVEN** a user requests an email or SMS OTP
- **WHEN** the request is submitted without a valid Turnstile token
- **THEN** the server rejects the attempt and instructs the client to retry the captcha
- **AND** no OTP is issued nor rate-limit counters incremented.

#### Scenario: Password Sign-In Requires Verified Token

- **GIVEN** a user submits email/password credentials
- **WHEN** the Turnstile token validation succeeds
- **THEN** the login proceeds normally
- **AND** failures are logged with enough detail to triage (no secrets).

#### Scenario: Invalid Token Blocks Sign-In

- **GIVEN** the Turnstile validation fails (expired/invalid)
- **WHEN** any auth action is attempted
- **THEN** the API responds with a human-friendly error and prompts the UI to refresh the Turnstile widget before retrying.
