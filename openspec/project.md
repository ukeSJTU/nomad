# Project Context

## Purpose

Nomad is a modern Online Travel Agency (OTA) platform designed to provide a **clean, intuitive, price-transparent, and distraction-free flight booking experience**. This project serves as a Software Engineering course final project, aiming to implement a simplified version of mainstream OTA platforms (like Ctrip, Expedia) while practicing the full software engineering lifecycle including requirements analysis, system design, project planning, team collaboration, and version control.

**Core Goals:**

- Deliver a functional OTA web platform with core features: user management, flight search and booking, order management
- Practice complete software engineering processes from requirements to deployment
- Build a well-structured, code-standard-compliant, fully-documented software product
- Create a seamless booking experience for budget-conscious young travelers

## Tech Stack

### Core Framework

- **Next.js 15.5.4** - Full-stack React framework with App Router, Server Components, Server Actions, and Turbopack
- **React 19.1.0** - UI library with latest concurrent features
- **TypeScript 5** - Type-safe JavaScript with strict mode enabled

### Frontend

- **Shadcn/UI** - Radix UI-based reusable component library (code-owned, not npm-installed)
- **Tailwind CSS 4** - Utility-first CSS framework
- **Lucide React** - Modern icon library
- **next-themes** - Dark/light mode support
- **React Hook Form** - Form state management with Zod validation
- **TanStack Table** - Data table with sorting, filtering, pagination

### Backend & Database

- **PostgreSQL** - Primary relational database
- **Drizzle ORM 0.44.6** - TypeScript-first ORM with `drizzle-kit` for migrations
- **Neon DB** - Serverless PostgreSQL hosting with database branching
- **Better Auth 1.3.27** - Modern authentication solution with Email OTP and Phone Number plugins
- **Zod 4.1.12** - TypeScript-first schema validation

### External Services

- **Resend** - Email delivery service with React Email components
- **Alibaba Cloud SMS** - SMS verification service
- **Vercel** - Hosting and deployment platform

### Development Tools

- **pnpm 10.17.1** - Fast, disk-efficient package manager (required >=10.0.0)
- **Node.js >=20.15.0** - JavaScript runtime
- **ESLint 9** - Code linting with TypeScript plugin
- **Prettier 3.6.2** - Code formatting
- **Husky 9.1.7** - Git hooks management
- **lint-staged 16.2.4** - Run linters on staged files
- **Commitlint** - Conventional Commits enforcement

### Testing

- **Vitest 3.2.4** - Unit testing framework with v8 coverage
- **Testing Library** - React component testing (@testing-library/react, jest-dom, user-event)
- **Playwright 1.56.0** - End-to-end testing
- **jsdom 25.0.1** - DOM environment simulation

### Documentation

- **Fumadocs** - Next.js-based documentation framework (fumadocs-ui, fumadocs-core, fumadocs-mdx)
- **Mermaid 11.12.0** - Diagram and flowchart rendering
- **Shiki 3.13.0** - Code syntax highlighting

### Utilities

- **date-fns 4.1.0** - Date manipulation
- **nanoid 5.1.6** - Unique ID generation
- **pino 10.0.0** - High-performance logging
- **@faker-js/faker 10.0.0** - Test data generation

## Project Conventions

### Code Style

**Naming Conventions:**
| Type | Convention | Example |
|------|-----------|---------|
| Files | kebab-case | `user-profile.tsx` |
| Variables/Functions | camelCase | `userName`, `handleSubmit()` |
| Constants | UPPER_SNAKE_CASE | `API_BASE_URL` |
| Types/Interfaces | PascalCase | `UserProfile`, `ApiResponse` |
| Components | PascalCase | `UserProfile`, `SignUpForm` |
| Test Files | `*.test.ts` | `utils.test.ts` |

**Import Order (enforced by `simple-import-sort` plugin):**

1. Node.js built-in modules
2. External dependencies (React, Next.js, etc.)
3. Internal modules using `@/` alias
4. Relative imports and styles

**Path Aliases:**

- Use `@/` for all internal imports (maps to `./src/*`)
- Avoid relative imports like `../../../components`

**TypeScript Rules:**

- Strict mode enabled
- Avoid `any` type (warn level)
- Unused variables with `_` prefix are allowed
- Use Zod for runtime validation

**ESLint Rules:**

- No unused imports
- Organize imports automatically
- No `console.log` (use `console.warn`/`console.error` or logger)
- Prefer `const` over `let`, no `var`
- Use object shorthand and template literals
- No duplicate imports

**Formatting:**

- Prettier enforced via lint-staged on pre-commit
- 2-space indentation (check `.prettierrc` if exists)

### Architecture Patterns

**Full-Stack Integration:**

- Next.js App Router with Server Components for data fetching
- Server Actions for mutations (no separate API layer for simple CRUD)
- Client Components only when interactivity is needed

**End-to-End Type Safety Chain:**

```
Drizzle Schema → TypeScript Types → Zod Validation → React Components
```

**Directory Structure:**

```
src/
├── app/                    # Next.js App Router pages
│   ├── (docs)/            # Documentation routes
│   ├── (frontend)/        # Main app routes
│   ├── api/               # API routes (auth, chat, health)
│   ├── layout.tsx
│   └── page.tsx
├── components/            # React components
│   ├── ui/               # Shadcn/UI components (DO NOT modify manually)
│   ├── common/           # Shared components
│   └── [domain]/         # Domain-specific components (auth, passengers, etc.)
│       ├── forms/
│       └── index.ts      # Export barrel
├── hooks/                # React hooks
├── lib/                  # Core configurations
│   ├── db/              # Database config
│   ├── schema/          # Drizzle schemas
│   ├── auth/            # Authentication
│   └── utils.ts
├── types/               # TypeScript type definitions
│   ├── api.ts
│   ├── auth.ts
│   └── index.ts
└── utils/               # Utility functions
    └── logger.ts        # Pino logger
```

**Key Architectural Decisions:**

- **Server Components by default** - Use Client Components only for interactivity
- **Server Actions for mutations** - Simplifies data flow, maintains type safety
- **Drizzle ORM** - Lightweight, SQL-like syntax, excellent TypeScript integration
- **Neon DB branching** - Each Git branch can have its own database instance
- **Shadcn/UI copy-paste approach** - Full control over components, minimal bundle size

**Data Flow Example (User Registration):**

1. User fills Shadcn/UI + Tailwind CSS form
2. Client triggers `registerUserAction` Server Action
3. Server validates with Zod → Better Auth processes → Alibaba SMS sends code
4. Better Auth + Drizzle Adapter stores user in Neon DB
5. Server returns result → Client updates UI

### Testing Strategy

**Unit Testing (Vitest):**

- Test files: `*.test.ts` co-located with source files
- Run: `pnpm test` (watch mode) or `pnpm test:run` (CI mode)
- Coverage: `pnpm test:coverage` (v8 provider)
- UI: `pnpm test:ui` for interactive testing

**Component Testing:**

- Use Testing Library for React components
- Test user interactions, not implementation details
- Co-locate tests with components

**E2E Testing (Playwright):**

- Tests in `tests/` directory
- Run: `pnpm e2e` (headless) or `pnpm e2e:ui` (interactive)
- Debug: `pnpm e2e:debug`
- Reports: `pnpm e2e:report`

**Test Report:**

- `pnpm test:report` - Generates comprehensive test dashboard with unit + E2E coverage

**Best Practices:**

- Small, focused tests (one logical unit per test)
- Use test data generators (@faker-js/faker)
- Run tests before committing
- Maintain >70% code coverage for critical paths

### Git Workflow

**Branching Strategy (Simplified Git Flow):**

**Main Branches:**

- `main` - Production code, protected, requires PR + 1 reviewer + passing CI
- `develop` - Development main branch, protected, requires PR + CI

**Temporary Branches:**
| Type | Naming | Example | Source → Target |
|------|--------|---------|-----------------|
| Feature | `feat/description` | `feat/user-authentication` | `develop` → `develop` |
| Fix | `fix/description` | `fix/login-button-styling` | `develop` → `develop` |
| Hotfix | `hotfix/description` | `hotfix/critical-security-patch` | `main` → `main` + `develop` |
| Docs | `docs/description` | `docs/update-readme` | `develop` → `develop` |
| Refactor | `refactor/description` | `refactor/auth-module` | `develop` → `develop` |
| Test | `test/description` | `test/add-unit-tests` | `develop` → `develop` |
| Chore | `chore/description` | `chore/update-dependencies` | `develop` → `develop` |

**Commit Message Convention (Conventional Commits):**

Format: `<type>(<scope>): <subject>`

**Types:**

- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation
- `style` - Code formatting (not CSS)
- `refactor` - Code refactoring
- `test` - Tests
- `chore` - Build/tooling changes

**Scope (optional):** `auth`, `ui`, `api`, `db`, `utils`, `config`, `deps`

**Subject Rules:**

- Use imperative mood (add, fix, update - NOT added, fixed, updated)
- Lowercase first letter
- No period at end
- Max 100 characters

**Examples:**

```bash
feat(auth): add phone number login
fix(search): correct date range validation
docs: update git workflow guide
chore(deps): update dependencies
```

**Git Hooks (Husky):**

- **pre-commit:** lint-staged (ESLint + Prettier on staged files)
- **commit-msg:** commitlint validates commit message format

**Development Workflow:**

1. Create feature branch from `develop`
2. Make commits following convention
3. Push and create PR to `develop`
4. Wait for CI checks and code review
5. Merge after approval, delete branch

**Pull Request Guidelines:**

- PR title follows commit convention
- Description explains changes and reasoning
- Include screenshots for UI changes
- Link related issues
- Keep PR size < 500 lines when possible
- All tests must pass
- At least 1 approval required

## Domain Context

**OTA (Online Travel Agency) Platform:**
Nomad is a flight booking platform targeting budget-conscious young travelers who value:

- Clean, distraction-free interfaces
- Price transparency
- Efficient booking processes
- Trust and reliability

**Core Business Flows:**

1. **User Registration/Login** - Phone/Email + OTP, GitHub OAuth
2. **Profile Management** - Personal info, frequent passengers (CRUD)
3. **Flight Search** - Search, filter, sort by price/time/airline
4. **Booking** - Select flight, passenger info, payment
5. **Order Management** - View orders, details, cancellation/refunds

**Key Domain Entities:**

- **User** - Authenticated user with profile
- **Passenger** - Traveler information (can be self or others)
- **Flight** - Flight schedule with airline, route, price
- **Order** - Booking record linking user, flight, passengers, payment
- **Payment** - Transaction record (simulated for now)

**Business Rules:**

- Users must be authenticated to book flights
- Each order requires at least one passenger
- Passenger info must match ID/passport
- Payments are simulated (no real payment gateway yet)

## Important Constraints

### Technical Constraints

- **Node.js Version:** Must use >= 20.15.0
- **Package Manager:** Must use pnpm >= 10.0.0 (enforced by `packageManager` field)
- **TypeScript Strict Mode:** Enabled, avoid `any` types
- **Database:** PostgreSQL only (via Neon DB)
- **Deployment:** Vercel platform (serverless architecture)
- **HTTPS Only:** All production traffic must use HTTPS

### Security Constraints

- **Password Storage:** Must be encrypted (handled by Better Auth)
- **Sensitive Data:** Must mask phone numbers, ID numbers in logs and UI
- **Input Validation:** All user inputs must be validated server-side with Zod
- **API Authentication:** Protected routes must validate JWT tokens
- **XSS/SQL Injection:** Prevent via input validation and ORM parameterized queries

### Business Constraints

- **Course Project:** This is an educational project, not production-ready
- **Simplified Features:** Implements core OTA features only
- **Simulated Payments:** No real payment gateway integration (simulated flow)
- **Chinese Language Support:** Primary language is Chinese (UI, docs, comments)

### Development Constraints

- **Git Workflow:** Must follow branching strategy and commit conventions
- **Code Review:** All changes require PR review before merging
- **CI/CD:** All PRs must pass automated tests (unit + E2E)
- **Documentation:** Code must be well-commented, features documented in Fumadocs

### Performance Constraints

- **Page Load:** Should load within 3 seconds on average connection
- **Server Response:** API responses should be < 2 seconds
- **Database Queries:** Optimize with indexes, avoid N+1 queries

## External Dependencies

### Cloud Services

- **Vercel** - Frontend hosting, serverless functions, automatic deployments
- **Neon DB** - Serverless PostgreSQL hosting with database branching feature
- **Resend** - Transactional email delivery (verification, notifications)
- **Alibaba Cloud SMS** - SMS verification codes for phone authentication

### Third-Party Libraries

- **Better Auth** - Authentication/authorization with multi-provider support
- **Drizzle ORM** - Database queries and schema management
- **Shadcn/UI + Radix UI** - Accessible component primitives
- **React Hook Form** - Form state management
- **Zod** - Schema validation for forms and API

### Development Services

- **GitHub** - Code repository and OAuth provider
- **GitHub Actions** - CI/CD workflows for automated testing and deployment
- **Fumadocs** - Documentation site generation from MDX files

### API Integrations

- **OpenAI-compatible API** - AI chat assistance (via `@ai-sdk/openai-compatible`)
- Note: Flight data is currently simulated/seeded, no real flight API integration yet

### Monitoring & Logging

- **Pino** - Structured logging with pretty printing in development
- Console logs should use `pino` logger, not raw `console.log`

### Critical External Dependencies to Monitor

1. **Neon DB availability** - Single point of failure for data layer
2. **Vercel deployment** - Platform dependency for hosting
3. **Resend API limits** - Email sending quotas
4. **Alibaba SMS quotas** - SMS verification limits
5. **GitHub OAuth** - Third-party login dependency
