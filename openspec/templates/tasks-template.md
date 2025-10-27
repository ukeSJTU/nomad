# Implementation Tasks Template

Use this template for all feature changes following the 6-phase workflow.

## Phase 1: Requirements Analysis

- [ ] 1.1 Read relevant requirements documents (`content/docs/requirements/`)
- [ ] 1.2 Identify affected requirement sections and IDs
- [ ] 1.3 Document requirements in `proposal.md`
- [ ] 1.4 Clarify any ambiguities with user

## Phase 2: API/Action Design

- [ ] 2.1 Review existing API routes (`src/app/api/`)
- [ ] 2.2 Review existing Server Actions (`src/app/[route]/actions.ts`)
- [ ] 2.3 Review related Drizzle schemas (`src/lib/schema/`)
- [ ] 2.4 **Decision:** Document reuse vs new endpoint/action (in `design.md`)
- [ ] 2.5 Design request/response schemas (Zod)
- [ ] 2.6 Document error codes and authentication requirements
- [ ] 2.7 Create/update API documentation (`content/docs/technical-design/backend/[feature]-api.mdx`)

## Phase 3: API Specification Update

- [ ] 3.1 Add JSDoc comments to Server Actions (params, returns, examples)
- [ ] 3.2 Update OpenAPI spec if using REST APIs
- [ ] 3.3 Plan to run `pnpm api:generate` after implementation

## Phase 4: Test Design

- [ ] 4.1 Write test scenarios based on requirements
- [ ] 4.2 Define test data fixtures (use `@faker-js/faker`)
- [ ] 4.3 Plan unit tests (business logic, utilities)
- [ ] 4.4 Plan integration tests (API + Database)
- [ ] 4.5 Plan E2E tests (user flows with Playwright)
- [ ] 4.6 Document test plan in this file before implementation

---

**🛑 CHECKPOINT: Get user approval before proceeding to Phase 5**

---

## Phase 5: Implementation

### 5.1 Database Schema (if needed)

- [ ] 5.1.1 Update Drizzle schema in `src/lib/schema/`
- [ ] 5.1.2 Run `pnpm db:generate` to generate migrations
- [ ] 5.1.3 Run `pnpm db:push` to apply schema changes

### 5.2 Type Definitions

- [ ] 5.2.1 Create/update types in `src/types/`
- [ ] 5.2.2 Define Zod schemas for validation
- [ ] 5.2.3 Export types from `src/types/index.ts`

### 5.3 API/Server Actions

- [ ] 5.3.1 Implement endpoint or Server Action
- [ ] 5.3.2 Add Zod validation for inputs
- [ ] 5.3.3 Implement error handling
- [ ] 5.3.4 Add authentication/authorization checks

### 5.4 Business Logic

- [ ] 5.4.1 Implement core functionality
- [ ] 5.4.2 Keep logic testable (pure functions when possible)
- [ ] 5.4.3 Add logging with Pino logger

### 5.5 Frontend Components (if applicable)

- [ ] 5.5.1 Create UI components in `src/components/[domain]/`
- [ ] 5.5.2 Use Shadcn/UI components from `src/components/ui/`
- [ ] 5.5.3 Connect components to Server Actions
- [ ] 5.5.4 Add form validation with React Hook Form + Zod
- [ ] 5.5.5 Export components from `src/components/[domain]/index.ts`

## Phase 6: Testing & Documentation

### 6.1 Unit Tests

- [ ] 6.1.1 Write unit tests co-located with source (`*.test.ts`)
- [ ] 6.1.2 Test business logic and utilities
- [ ] 6.1.3 Run `pnpm test` and verify passing
- [ ] 6.1.4 Check coverage: `pnpm test:coverage` (target: ≥70%)

### 6.2 Integration Tests

- [ ] 6.2.1 Test API + Database interactions
- [ ] 6.2.2 Test authentication and authorization
- [ ] 6.2.3 Test error handling

### 6.3 E2E Tests

- [ ] 6.3.1 Write Playwright tests in `tests/`
- [ ] 6.3.2 Test complete user flows
- [ ] 6.3.3 Run `pnpm e2e` and verify passing

### 6.4 Full Test Suite

- [ ] 6.4.1 Run `pnpm test:run && pnpm e2e`
- [ ] 6.4.2 All tests must pass

### 6.5 Code Quality

- [ ] 6.5.1 Run `pnpm lint` and fix issues
- [ ] 6.5.2 Run `pnpm format` to format code
- [ ] 6.5.3 Run TypeScript check: `tsc --noEmit`

### 6.6 Documentation

- [ ] 6.6.1 Update API documentation (`content/docs/technical-design/backend/`)
- [ ] 6.6.2 Update user guides (`content/docs/`)
- [ ] 6.6.3 Add inline code comments for complex logic
- [ ] 6.6.4 Run `pnpm api:generate` if OpenAPI spec changed
- [ ] 6.6.5 Update CHANGELOG.md (if applicable)

## Final Validation Checklist

Before marking change as complete:

- [ ] ✅ Requirements documents reviewed and referenced in proposal
- [ ] ✅ API design documented (reuse vs new decision explained)
- [ ] ✅ API specification updated (OpenAPI or JSDoc)
- [ ] ✅ Test plan written BEFORE implementation
- [ ] ✅ Implementation follows order: schema → types → API → UI
- [ ] ✅ Unit tests passing (`pnpm test:run`)
- [ ] ✅ E2E tests passing (`pnpm e2e`)
- [ ] ✅ Test coverage ≥ 70% for new code
- [ ] ✅ Linting passing (`pnpm lint`)
- [ ] ✅ Type checking passing (`tsc --noEmit`)
- [ ] ✅ API documentation updated
- [ ] ✅ User documentation updated
- [ ] ✅ Code reviewed (if working with team)

---

## Notes

- Replace section placeholders with actual tasks specific to your change
- Check off items as you complete them
- Add additional tasks if needed, but maintain the phase structure
- Do not skip phases or reorder them
