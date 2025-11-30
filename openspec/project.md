# Project Context

## Purpose

Nomad is a modern Online Travel Agency (OTA) built for budget-conscious, experience-focused travelers. It is an academic capstone that packages a simplified but fully integrated OTA workflow: elegant search, multi-step booking, passenger management, order operations, notifications, simulated payment, and polished documentation. The codebase showcases the full software engineering lifecycle—planning, design, implementation, testing, documentation, and deployment—so contributors can practice end-to-end engineering craft.

## Tech Stack

### Core Frameworks

- **Next.js 15.5.4 App Router** (Server Components + Server Actions) keeps UI and logic colocated while enabling server-centric mutations.
- **React 19.1.0** with Strict Mode enabled for modern concurrent features.
- **TypeScript 5** with strict mode and no-`any` discipline.

### UI & Styling

- **Shadcn/UI-inspired** component recipes live under `app/_components/ui` (buttons, fields, dialogs, etc.) and are composed in domain folders (`auth`, `flights`, `passengers`, `security`, `user`).
- **Tailwind CSS 4** and **lucide-react** icons for consistent utilities and iconography.
- **Sonner** for global toast notifications used in flows such as booking and auth.
- **Date-fns**, **currency.js**, and **nanoid** for date math, price formatting, and IDs.

### Backend & Database

- **Better Auth 1.3.27** powers phone/email OTP, GitHub OAuth, and session cookies via `nextCookies`, plus custom plugins for Cloudflare Turnstile captcha.
- **Drizzle ORM 0.44.6** with `drizzle-kit` migrations/seeding, `drizzle-query-logger`, and PostgreSQL schemas stored in `src/db/schema`.
- **Neon DB** (serverless PostgreSQL) hosts the data layer; connection logic lives in `src/db/index.ts` with SSL/ENV handling.
- **Pino 10.0.0** plus `pino-pretty` for logging; `src/infra/logging/logger.ts` configures env-sensitive formatting.

### Integrations & AI

- **Resend** for email OTP and order confirmation templates (`app/_components/emails`).
- **Alibaba Cloud SMS** for phone OTP; wrappers live in `src/infra/communications/aliyun-sms.client.ts`.
- **Cloudflare Turnstile** captcha secures sensitive Better Auth endpoints (`src/infra/auth/turnstile`, `auth` plugin config).
- **@ai-sdk/openai-compatible + ai@5.0.76** stream answers from Inkeep (API key via `INKEEP_API_KEY`) for the documentation chat endpoint (`app/api/chat/route.ts`) using `ProvideLinksToolSchema`.

### Documentation & Storybook

- **Fumadocs (core, ui, mdx, twoslash)** renders `content/docs` into `/docs`; metadata lives in `content/docs/meta.json` and `source.config.ts` defines MDX plugins (math, Shiki, twoslash).
- **Storybook 9.1.15** with `@storybook/nextjs-vite`, Chromatic, and `@vitest/storybook`; stories live inside `app/_stories/*` using `Meta` + `StoryObj`.

### Tooling & Utilities

- **pnpm 10.17.1** (required by `packageManager` + `engines`) and **Node >= 22.21.0**.
- **Biome 1.9.x**, **Husky 9.1.7**, **lint-staged 16.2.4**, and **Commitlint 20** enforce styling and Conventional Commits.
- **Vitest 3.2.4** (unit, integration, storybook projects), **Playwright 1.56.x**, **drizzle-kit**, **tsx**, and **cross-env** scripts orchestrate CI.
- `scripts/setup-dev.mjs`, `scripts/seed-test-orders.ts`, and `src/db/seed.ts` bootstrap the dev database and dummy orders; `scripts/generate-dashboard.js` supports `pnpm test:report`.
- **Playwright reports** automatically live under `playwright-report/` after `pnpm e2e`.
- **Email preview server** (`pnpm email`) and Storybook dev server (`pnpm storybook`) are part of the developer workflow.

## Architecture Overview

- **App Router Layouts:** `app/(frontend)` holds the customer experience (landing page, flight booking, user home, legal pages). Nested layouts split the booking workspace: `(with-sidebar)` enables the multi-step flight workflow (`search`, `seat`, `special`, `status`, `orders/[orderId]`), while `(without-sidebar)` hosts auth pages, the user center (`home/accounts`, `home/orders`, `home/passengers`, `home/security`, `home/wallets`), and legal/error views. The landing hero lives in `app/(frontend)/page.tsx`.
- **Server Actions:** `app/_actions` exposes Server Actions such as `auth.ts`, `flight-search-history.ts`, `orders.ts`, `payments.ts`, `passengers.ts`, and `dev-tools.ts`. They validate with Zod, call domain services, and return typed `ActionResult` objects.
- **Shared Hooks & Components:** Domain-agnostic hooks (`app/_hooks`, e.g., `use-flight-search-state`, `use-otp-countdown`, `use-mobile`) keep logic reusable. Reusable UI elements live under `app/_components` (common layout pieces, domain-specific views, email templates, Fumadocs helpers, and the Shadcn-derived component library). `app/_components/common` includes `Header`, `Footer`, `DevUserSwitcher`, and `BreadcrumbNav`.
- **Storybook:** `app/_stories` mirrors `app/_components` (auth, flights, forms, security, passengers, etc.) and ensures each shared component publishes at least one Storybook story.
- **API Routes:** `app/api/auth/[...all]` delegates to Better Auth (`src/infra/auth/better-auth.plugin.ts`), `app/api/chat/route.ts` streams AI-powered answers, `app/api/cron/cancel-expiration` uses `src/infra/http/cron-auth` to authenticate and cancel expired orders, and `app/api/health/route.ts` returns a standardized `ApiResponse.success` payload validated against `src/types/api/health.ts`.
- **Domain & Service Layers:** Business logic lives under `src/domains` (auth, booking, flights, payments, passengers, notification, user, dev-tools). Cross-domain orchestrations such as `src/services/payment-workflow.service.ts` handle balance payments, email notifications, and ledger updates.
- **Integrations & Utilities:** `src/integrations` centralizes Aliyun SMS, Resend, Turnstile, and Fumadocs helpers (search, mermaid, LLM tooling). `src/lib` provides helpers for API responses, currency math, masking sensitive data, and logging.
- **Database Schema:** `src/db/schema` defines tables for flights, airports, orders, passengers, and ancillary services; seeds are seeded via `drizzle-kit` and helper scripts.
- **Documentation Layer:** `app/(docs)` contains the Fumadocs-powered docs UI, including LLM pages (`llms.mdx`/`llms-full.txt`) and shared components from `src/infra/fumadocs`. The canonical content lives in `content/docs` (MoSCoW requirements, technical design, testing strategy, appendices).

## Documentation Requirements

- `content/docs` is the single source of truth for MoSCoW-aligned requirements, technical design, testing strategy, runbooks, and contributor guides. Update the Markdown, frontmatter, and `meta.json` whenever the product behavior or architecture shifts.
- The Fumadocs site is served at `/docs`; every doc change should be reflected there, including index, introduction, requirements, technical design, and appendix pages.
- `source.config.ts` controls MDX plugins (math, KaTeX, Shiki, twoslash) and must stay in sync with docs that rely on them.
- `app/_components/fumadocs` contains doc-specific helpers (search bar, mermaid renderer, shared page actions) that must align with `content/docs` updates.

## Storybook & Component Library

- Every shared UI component exported from `app/_components` **must** publish at least one Storybook story under `app/_stories/<domain>/*.stories.tsx` using `Meta` and `StoryObj` from `@storybook/nextjs-vite`.
- Storybook should demonstrate the critical states (loading, success, error, logged-in vs logged-out) that match the documentation narratives so reviewers can interactively verify behavior.
- `@chromatic-com/storybook` is available for automated visual snapshots; keep stories tidy to avoid false positives.

## Testing Strategy

- **Unit & Integration:** `Vitest 3.2.4` runs `pnpm test` (default), `pnpm test:unit`, `pnpm test:integration`, and `pnpm test:storybook`. Tests live co-located with implementation (e.g., `app/_components/**/*.test.tsx`, `src/domains/**/*.test.ts`).
- **Component Testing:** Use Testing Library (`@testing-library/react`, `@testing-library/jest-dom`, `@testing-library/user-event`) for interactive components.
- **End-to-End:** Playwright (`tests/e2e/landingpage.spec.ts`, `tests/e2e/legalpages.spec.ts`) covers critical user journeys. Run `pnpm e2e`, `pnpm e2e:headed`, or `pnpm e2e:debug`, and inspect reports under `playwright-report/`.
- **Comprehensive Report:** `pnpm test:report` runs coverage (`vitest --coverage`), Playwright, and generates a dashboard via `scripts/generate-dashboard.js`.
- **CI Gate:** All PRs must pass linting, unit/integration/component tests, storybook tests, and Playwright before merging into `develop`/`main`.

## Project Conventions

- **Naming:** files use kebab-case, components/types/enum names are PascalCase, functions/variables follow camelCase, constants are UPPER_SNAKE_CASE. Test files use `.test.ts[x]`.
- **Imports:** order imports as Node built-ins → external packages → `@/` aliases → relative paths. Biome organize-imports enforces ordering.
- **Types:** TypeScript strict mode is enforced; avoid `any`. `_` prefix is allowed for intentionally unused variables. Prefer Zod for runtime validation.
- **Linting & Formatting:** Biome (lint + format) with lint-staged (runs Biome on staged files) keeps formatting一致. Logger usage (Pino/console.warn/console.error) replaces scattered `console.log`.
- **Git Workflow:** Follow the simplified Git Flow described in `content/docs/contributing/git-workflow.mdx` (`develop`/`main`, `feat/*`, `fix/*`, etc.). Commit messages must follow Conventional Commits enforced by Husky + Commitlint. Pre-commit hooks run lint-staged; commit-msg hooks run commitlint.

## Domain Context

- **User/Auth:** `Better Auth` handles sign-up/in via phone, email, and GitHub OTP flows. `app/_actions/session` and `auth` domain logic provide helper hooks (`authClient.signIn/signUp/useSession`). Dev utilities (`app/_actions/dev-tools`, `src/domains/dev-tools/dev-users.service.ts`, `app/_components/common/dev-user-switcher.tsx`) ease QA by switching users through OTP magic.
- **Passengers/Profile:** CRUD for frequent flyers, masking documents/phones (`src/lib/mask-data.ts`), server-side validation with Zod, and UI components in `app/_components/passengers` support the passenger manager.
- **Flights:** Search, filter, sort, quick-date pricing, and saved search history are orchestrated through `app/_actions/flight-search-history.ts`, `src/domains/flights`, and UI components under `app/_components/flights`. Seat selection, ancillary services, and status pages live within the `(with-sidebar)` booking workspace.
- **Booking & Orders:** Multi-step flow ties flight selection to passenger info, ancillaries, payment deadlines, and confirmation. `orders.service.ts` handles seat locking, cancellations, refunds, and order number generation. Cron job (`app/api/cron/cancel-expiration`) cancels expired pending orders and releases seats. UI flows use `app/_actions/orders.ts`, the booking sidebar, and `app/(frontend)/(with-sidebar)/orders/[orderId]`.
- **Payments:** Payments are simulated through `src/services/payment-workflow.service.ts` (balance-only). It debits user balance, updates orders/payments tables, and optionally triggers confirmation emails via Resend (`src/domains/notification`). Document the lack of real gateway integration.
- **Notifications & Emails:** `src/infra/communications/resend.client.tsx` and `app/_components/emails` define OTP and order confirmation templates; `sendOrderConfirmationEmail` dispatches emails after payments.
- **Security & Infrastructure:** Turnstile, cron secret verification (`src/infra/http/cron-auth.ts`), API response helpers (`src/infra/http/api-response.ts`), and consistent response meta (`src/types/api/response.ts`) ensure predictable HTTP behavior. The health check at `/api/health` validates uptime/status.
- **Documentation & AI:** The docs chat endpoint (`app/api/chat/route.ts`) streams answers with Inkeep/AI Tools, while `content/docs` provides MoSCoW requirements, testing strategy, and architecture write-ups. `app/(docs)` exposes these pages plus LLM explorations (`llms.mdx`).

## Important Constraints

- Node.js >= 22.21.0 and pnpm >= 10.0.0; `packageManager` enforces pnpm@10.17.1.
- Always run `pnpm install` followed by `pnpm run setup:dev` to populate env files, configure Better Auth, and seed data before dev/testing.
- TypeScript strict mode is non-negotiable; avoid `any` and rely on Zod for runtime checking.
- PostgreSQL is the only supported database (hosted on Neon); leverage branching for isolation. Schema migrations/seeding use `drizzle-kit`.
- Deployments go through Vercel; design code for serverless limits (no long-running background loops). Always use HTTPS in prod.
- Authentication requires Better Auth configuration: `captcha` with Turnstile (site and secret keys), `phoneNumber` (Aliyun SMS or console simulator via `ENABLE_ALIYUN_SMS`), `emailOTP` (Resend or console via `ENABLE_RESEND`), and `github` social provider.
- Cron endpoints require `CRON_SECRET`; requests must include `Authorization: Bearer <CRON_SECRET>` and are protected by `src/infra/http/cron-auth.ts`.
- Mask sensitive data before logging (use `src/lib/mask-data.ts` for documents/phone/email).
- Payment processing currently supports **balance payment only**; document that there is no real payment gateway and continue to simulate notifications.
- UI/docs/comments primary language is Chinese; keep user-facing copy and docs in Chinese with English technical notes as needed.
- Documentation updates (requirements/design/testing/deployment) must land in `content/docs` and be surfaced in the Fumadocs sidebar (`meta.json`).
- Storybook stories, docs, and UI components must stay in sync; an updated component should update both `app/_components` and `app/_stories`.

## Performance Constraints

- Landing, search, and booking pages should render within ~3 seconds on average network conditions.
- Server Actions and API routes should respond within 2 seconds; avoid heavy synchronous work.
- Database queries must use indexes, limit results, and use Drizzle features to prevent N+1 issues. Dev builds log SQL via `EnhancedQueryLogger`.

## External Dependencies

- **Vercel** — hosting + Server Actions runtime.
- **Neon DB** — serverless PostgreSQL with branching support for each Git branch.
- **Better Auth** — centralized auth/token management, OTP, GitHub OAuth, rate limiting.
- **Alibaba Cloud SMS** — production OTP channel (toggle via `ENABLE_ALIYUN_SMS`).
- **Resend** — transactional emails (verification + order confirmation).
- **Cloudflare Turnstile** — captcha for auth endpoints.
- **GitHub OAuth** — social login provider.
- **@ai-sdk/openai-compatible + ai** — powered the Inkeep documentation assistant.
- **Fumadocs** — documentation rendering for `content/docs` and `/docs` site.
- **Storybook + Chromatic** — UI catalog and visual regression.
- **Vitest** — unit/integration/component testing.
- **Playwright** — end-to-end suites (`tests/e2e`).
- **Pino** — structured logging; `logger.ts` exposes consistent log levels.
- **Drizzle ORM + drizzle-kit** — schema definitions, migrations, seeds.
- **Resend, Aliyun SMS, Cloudflare Turnstile, Inkeep** — third-party services whose availability/quotas must be monitored.

## Monitoring & Logging

- Use `src/infra/logging/logger.ts` to capture structured logs; dev uses `pino-pretty`, production streams to stdout with ISO timestamps.
- API responses follow the schema in `src/types/api/response.ts`, so every route (`app/api/health`, cron APIs, Server Actions that expose REST endpoints) returns consistent metadata and request IDs.
- Track cron health via `/api/health` and protect cancellation jobs with `CRON_SECRET`.
