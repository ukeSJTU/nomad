# Services Layer

This directory contains application services that orchestrate business logic across multiple domains or handle integrations with external systems.

## Guidelines

- **Cross-Domain Logic:** If a business process involves multiple domains (e.g., Booking + Payment + Notification), the orchestration logic belongs here.
- **Integrations:** Logic for interacting with third-party services (e.g., Stripe, SendGrid) should be encapsulated here or in `src/integrations` and called from here.
- **Dependencies:** Services in this layer can import from:
  - `src/domains/<domain>` (Repositories or Domain Services)
  - `src/lib`
  - `src/db`
- **Restrictions:**
  - Do NOT import from frontend code (`app/`, `components/`).
  - Do NOT import from Server Actions directly (Server Actions should call these services).
