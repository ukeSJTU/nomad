# Implementation Tasks Template

Use this template when implementing approved change proposals (Phases 5-6 only).

**Your Role:** Implementation developer - building features following approved designs and making tests pass.

**Your Responsibilities:** Complete Phases 5-6 (Implementation, Refactoring & Documentation) and prepare for archiving.

**Already Completed by Proposal Team:** Phases 1-4 (Requirements, Design, Spec Planning, Tests)

---

## Prerequisites: Review Proposal

**Before starting implementation:**

- [ ] 0.1 Read complete proposal: `openspec show [change-name]`
- [ ] 0.2 Review `proposal.md` - understand why, what, and impact
- [ ] 0.3 Review `design.md` - understand technical decisions
- [ ] 0.4 Review `specs/` - understand requirements deltas
- [ ] 0.5 Review `tasks.md` - check completed Phases 1-4 (from `proposal-tasks-template.md`)
- [ ] 0.6 Run existing tests: `pnpm test` (should show failing tests)
- [ ] 0.7 Verify test failures are expected
- [ ] 0.8 Understand test assertions and expected behavior

**Note:** Phases 1-4 were completed by proposal team using `proposal-tasks-template.md`

---

## Phase 5: Implementation 💻

**Goal:** Make the failing tests pass by implementing the required functionality

**CRITICAL:** Follow implementation order strictly - Schema → Types → API → Logic → UI

### 5.1 Database Schema (if needed)

- [ ] 5.1.1 Review schema design in `design.md`
- [ ] 5.1.2 Update Drizzle schema in `src/lib/schema/[domain].ts`
  - [ ] Define table structure
  - [ ] Add relationships and foreign keys
  - [ ] Add indexes for performance
- [ ] 5.1.3 Generate migration: `pnpm db:generate`
- [ ] 5.1.4 Review generated SQL migration file
- [ ] 5.1.5 Apply schema changes: `pnpm db:push`
- [ ] 5.1.6 Verify in database: `pnpm db:studio`
- [ ] 5.1.7 Test rollback if needed

**Checkpoint:** Database schema matches design spec

### 5.2 Type Definitions

- [ ] 5.2.1 Create/update types in `src/types/[domain].ts`
  - [ ] Define TypeScript types/interfaces
  - [ ] Infer types from database schema where applicable
- [ ] 5.2.2 Define Zod schemas for validation
  - [ ] Request validation schemas
  - [ ] Response validation schemas
  - [ ] Nested object schemas
- [ ] 5.2.3 Export types from `src/types/index.ts`
- [ ] 5.2.4 Ensure types match database schema
- [ ] 5.2.5 Run type check: `tsc --noEmit`

**Checkpoint:** All types defined and type check passes

### 5.3 API/Server Actions

- [ ] 5.3.1 Implement endpoint in `src/app/api/[route]/route.ts` OR Server Action in `src/app/[route]/actions.ts`
- [ ] 5.3.2 Add Zod validation for inputs
  - [ ] Validate request body/params
  - [ ] Return type-safe validation errors
- [ ] 5.3.3 Implement error handling
  - [ ] Try-catch blocks for async operations
  - [ ] Return consistent error format
  - [ ] Log errors with Pino logger
- [ ] 5.3.4 Add authentication/authorization checks
  - [ ] Verify user session
  - [ ] Check permissions
- [ ] 5.3.5 Add JSDoc comments (as planned in Phase 3)
  - [ ] Document parameters
  - [ ] Document return values
  - [ ] Add usage examples
  - [ ] Document error cases
- [ ] 5.3.6 Test API manually or with unit tests

**Checkpoint:** API/Action implemented with validation and error handling

### 5.4 Business Logic

- [ ] 5.4.1 Implement core functionality
  - [ ] Keep functions pure where possible
  - [ ] Separate concerns (validation, business rules, data access)
- [ ] 5.4.2 Add data access layer (if needed)
  - [ ] Create query functions in `src/lib/queries/`
  - [ ] Use Drizzle ORM for database operations
- [ ] 5.4.3 Add utility functions (if needed)
  - [ ] Create in `src/lib/utils/`
  - [ ] Keep functions small and focused
- [ ] 5.4.4 Add inline comments for complex logic
- [ ] 5.4.5 Add logging for important operations
- [ ] 5.4.6 Run unit tests: `pnpm test`

**Checkpoint:** Core business logic implemented and unit tests passing

### 5.5 Frontend Components (if applicable)

- [ ] 5.5.1 Implement UI components in `src/components/[domain]/`
  - [ ] Use Shadcn/UI components from `src/components/ui/`
  - [ ] Keep components focused and composable
- [ ] 5.5.2 Connect to Server Actions or API endpoints
  - [ ] Use Server Actions for mutations
  - [ ] Handle loading states
  - [ ] Handle error states
- [ ] 5.5.3 Implement form validation
  - [ ] Use React Hook Form + Zod
  - [ ] Show validation errors to users
- [ ] 5.5.4 Add proper loading states
  - [ ] Use Suspense boundaries
  - [ ] Show skeleton loaders
- [ ] 5.5.5 Add error boundaries for error handling
- [ ] 5.5.6 Ensure accessibility
  - [ ] ARIA labels
  - [ ] Keyboard navigation
  - [ ] Focus management
- [ ] 5.5.7 Export components from `src/components/[domain]/index.ts`
- [ ] 5.5.8 Test components manually

**Checkpoint:** UI components implemented and functional

### 5.6 Verify Tests Pass

- [ ] 5.6.1 Run unit tests: `pnpm test`
- [ ] 5.6.2 Run full test suite: `pnpm test:run`
- [ ] 5.6.3 Run E2E tests: `pnpm e2e`
- [ ] 5.6.4 All tests should pass now (green phase of TDD)
- [ ] 5.6.5 Fix any failing tests
- [ ] 5.6.6 Verify test coverage: `pnpm test:coverage` (target: ≥70%)

**Checkpoint:** All tests passing with adequate coverage

---

## Phase 6: Refactoring & Documentation ✅

**Goal:** Clean up code and ensure complete documentation

### 6.1 Code Refactoring

- [ ] 6.1.1 Remove code duplication (DRY principle)
  - [ ] Extract common logic into utilities
  - [ ] Create reusable components
- [ ] 6.1.2 Simplify complex functions
  - [ ] Break down large functions
  - [ ] Extract helper functions
  - [ ] Improve readability
- [ ] 6.1.3 Improve naming for clarity
  - [ ] Use descriptive variable names
  - [ ] Use consistent naming conventions
- [ ] 6.1.4 Ensure consistent code style
  - [ ] Run `pnpm format`
  - [ ] Follow project conventions
- [ ] 6.1.5 Run linter: `pnpm lint`
- [ ] 6.1.6 Fix all linting issues: `pnpm lint --fix`
- [ ] 6.1.7 Run tests after each refactor to ensure nothing broke

**Checkpoint:** Code is clean and linter passes

### 6.2 Performance Optimization

- [ ] 6.2.1 Optimize database queries
  - [ ] Add `select` clauses to limit returned fields
  - [ ] Add `where` clauses to filter early
  - [ ] Use joins efficiently
- [ ] 6.2.2 Add database indexes (if not done in 5.1)
  - [ ] Index frequently queried columns
  - [ ] Add composite indexes for common query patterns
- [ ] 6.2.3 Implement caching where beneficial
  - [ ] Cache expensive computations
  - [ ] Use React cache for Server Components
- [ ] 6.2.4 Minimize React re-renders
  - [ ] Use `React.memo` for expensive components
  - [ ] Use `useMemo` and `useCallback` appropriately
- [ ] 6.2.5 Implement pagination for large lists
- [ ] 6.2.6 Lazy load large components

**Checkpoint:** Performance optimizations applied

### 6.3 Type Safety

- [ ] 6.3.1 Replace any `any` types with proper types
- [ ] 6.3.2 Ensure strict null checks
- [ ] 6.3.3 Add type guards where needed
- [ ] 6.3.4 Run type check: `tsc --noEmit`
- [ ] 6.3.5 Fix all type errors

**Checkpoint:** Full type safety achieved

### 6.4 API Documentation

- [ ] 6.4.1 Verify JSDoc comments are complete
  - [ ] All parameters documented
  - [ ] Return types documented
  - [ ] Examples included
  - [ ] Error cases documented
- [ ] 6.4.2 Update OpenAPI spec (if using REST APIs)
  - [ ] Run `pnpm api:generate`
- [ ] 6.4.3 Update backend API documentation
  - [ ] Update `content/docs/technical-design/backend/[feature]-api.mdx`
  - [ ] Add API usage examples
  - [ ] Document authentication requirements

**Checkpoint:** API documentation complete and accurate

### 6.5 Requirements Documentation

- [ ] 6.5.1 Use document IDs from `proposal.md`
- [ ] 6.5.2 Update requirement documents
  - [ ] Mark requirements as implemented
  - [ ] Update functional requirements in `content/docs/requirements/functional-requirements/[module].mdx`
  - [ ] Update non-functional requirements if applicable
- [ ] 6.5.3 Verify all referenced requirements are addressed

**Checkpoint:** Requirements documentation updated

### 6.6 User Documentation

- [ ] 6.6.1 Update user guides in `content/docs/`
- [ ] 6.6.2 Add screenshots or examples if applicable
- [ ] 6.6.3 Update feature documentation
- [ ] 6.6.4 Add usage examples
- [ ] 6.6.5 Update any affected tutorials or getting started guides

**Checkpoint:** User documentation complete

### 6.7 Code Comments

- [ ] 6.7.1 Ensure complex logic has explanatory comments
- [ ] 6.7.2 Document any workarounds or edge cases
- [ ] 6.7.3 Add TODO comments for future improvements (if any)
- [ ] 6.7.4 Remove obsolete comments
- [ ] 6.7.5 Ensure comments are clear and concise

**Checkpoint:** Code is well-commented

### 6.8 Final Quality Checks

- [ ] 6.8.1 Run full test suite: `pnpm test:run && pnpm e2e`
- [ ] 6.8.2 Run linter: `pnpm lint`
- [ ] 6.8.3 Run type check: `tsc --noEmit`
- [ ] 6.8.4 Run format check: `pnpm format:check`
- [ ] 6.8.5 Check test coverage: `pnpm test:coverage` (≥70%)
- [ ] 6.8.6 Verify no console errors or warnings
- [ ] 6.8.7 Test in development environment
- [ ] 6.8.8 Request code review (if working with team)

**Checkpoint:** All quality checks passing

---

## Final Validation Checklist

Before marking implementation as complete:

### Code Quality
- [ ] ✅ All tests passing (`pnpm test:run` + `pnpm e2e`)
- [ ] ✅ Test coverage ≥ 70% for new code
- [ ] ✅ Linting passing (`pnpm lint`)
- [ ] ✅ Type checking passing (`tsc --noEmit`)
- [ ] ✅ Code formatted (`pnpm format`)
- [ ] ✅ No code duplication
- [ ] ✅ Good naming conventions followed
- [ ] ✅ Complex logic well-commented

### Implementation
- [ ] ✅ Database schema updated (if needed)
- [ ] ✅ Type definitions complete and exported
- [ ] ✅ API/Server Actions implemented with validation
- [ ] ✅ Business logic implemented and tested
- [ ] ✅ Frontend components implemented (if applicable)
- [ ] ✅ Error handling comprehensive
- [ ] ✅ Authentication/authorization implemented

### Performance & Security
- [ ] ✅ Database queries optimized
- [ ] ✅ Indexes added for performance
- [ ] ✅ Input validation complete
- [ ] ✅ Error messages don't expose sensitive info
- [ ] ✅ Authentication checks in place
- [ ] ✅ No security vulnerabilities

### Documentation
- [ ] ✅ API documentation updated (JSDoc/OpenAPI)
- [ ] ✅ Requirements documentation updated (using IDs from proposal)
- [ ] ✅ User documentation updated
- [ ] ✅ Code comments added for complex logic
- [ ] ✅ CHANGELOG.md updated (if applicable)

### Deployment Readiness
- [ ] ✅ Code reviewed (if working with team)
- [ ] ✅ Tested in development environment
- [ ] ✅ Ready for staging deployment
- [ ] ✅ Migration plan ready (if schema changes)

---

## Implementation Complete

**You have delivered:**

1. ✅ Working implementation (all tests passing)
2. ✅ Refactored, clean code
3. ✅ Complete documentation (API, requirements, user guides)
4. ✅ Production-ready code

**Next steps (handled by archiving process):**

- Update specification with changes
- Archive change proposal
- Deploy to staging/production

---

## Notes

- Follow implementation order strictly: Schema → Types → API → Logic → UI
- Run tests frequently during implementation
- Refactor continuously while keeping tests green
- Don't skip documentation - it's critical for maintenance
- Add additional tasks if needed, but maintain phase structure
- Keep commits atomic and well-described
- Use feature branch and PR workflow (if applicable)
