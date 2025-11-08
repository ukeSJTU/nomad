# Complete Development Tasks Template

Use this template when creating change proposals. It covers the entire 6-phase development workflow.

**Proposal Stage:** Complete Phases 1-4, document entire workflow
**Implementation Stage:** Execute Phases 5-6 following the documented plan

---

## Phase 1: Requirements Analysis 📋

**Goal:** Understand what to build based on user's request

**Responsible:** Proposal Author

- [ ] 1.1 Read user's requirements request thoroughly
- [ ] 1.2 Review existing requirements documents in `content/docs/requirements/`
- [ ] 1.3 Identify affected requirement sections and document IDs
- [ ] 1.4 Record document references in `proposal.md`
  - [ ] Functional requirements affected
  - [ ] Non-functional requirements affected
  - [ ] User stories impacted
- [ ] 1.5 List assumptions and constraints
- [ ] 1.6 Identify any ambiguities requiring clarification
- [ ] 1.7 Ask user 1-2 clarifying questions if needed

**Deliverable:** `proposal.md` with clear requirements understanding and document IDs

---

## Phase 2: API/Action Design 🎨

**Goal:** Design technical approach before coding

**Responsible:** Proposal Author

### 2.1 Analyze Existing Code

- [ ] 2.1.1 Review existing API routes in `src/app/api/`
- [ ] 2.1.2 Review existing Server Actions in `src/app/[route]/actions.ts`
- [ ] 2.1.3 Review related Drizzle schemas in `src/lib/schema/`
- [ ] 2.1.4 Review related utilities in `src/lib/queries/` and `src/lib/utils/`
- [ ] 2.1.5 Search for similar patterns: `rg "keyword" src/`

### 2.2 Design Decision

- [ ] 2.2.1 **Decision:** Reuse existing APIs vs create new
- [ ] 2.2.2 Document rationale in `design.md`
  - [ ] If reusing: explain why existing API fits
  - [ ] If new: explain why existing APIs insufficient
- [ ] 2.2.3 List pros and cons of chosen approach

### 2.3 API/Action Specification

- [ ] 2.3.1 Define request/response schemas (Zod)
- [ ] 2.3.2 Document error codes and messages
- [ ] 2.3.3 Specify authentication/authorization requirements
- [ ] 2.3.4 Define rate limiting needs (if applicable)
- [ ] 2.3.5 Document any breaking changes

### 2.4 Database Schema Design (if needed)

- [ ] 2.4.1 Plan table structure
- [ ] 2.4.2 Define relationships and foreign keys
- [ ] 2.4.3 Plan indexes for performance
- [ ] 2.4.4 Consider data migration strategy (if modifying existing tables)

**Deliverable:** `design.md` with complete technical design and rationale

---

## Phase 3: Update API Specification 📝

**Goal:** Plan API documentation updates

**Responsible:** Proposal Author

- [ ] 3.1 Identify which API documentation needs updates
  - [ ] Server Actions JSDoc comments
  - [ ] OpenAPI specs (if using REST APIs)
  - [ ] Backend API documentation in `content/docs/technical-design/backend/`
- [ ] 3.2 Plan JSDoc comment structure
  - [ ] Parameters documentation
  - [ ] Return types documentation
  - [ ] Example usage
  - [ ] Error cases
- [ ] 3.3 Plan OpenAPI spec updates (if applicable)
- [ ] 3.4 Document the planned changes in `design.md`
- [ ] 3.5 Note: Actual spec updates will happen during Phase 6

**Deliverable:** Documentation update plan in `design.md`

---

## Phase 4: Test Design & Writing 🧪

**Goal:** Write tests before implementation (TDD approach)

**Responsible:** Proposal Author

### 4.1 Test Planning

- [ ] 4.1.1 Write test scenarios based on requirements
- [ ] 4.1.2 Define test data fixtures using `@faker-js/faker`
- [ ] 4.1.3 Document test plan in this file
- [ ] 4.1.4 Organize tests: unit → integration → E2E

### 4.2 Unit Tests

- [ ] 4.2.1 Write unit tests for business logic
  - [ ] Happy path scenarios
  - [ ] Error cases
  - [ ] Edge cases
- [ ] 4.2.2 Write unit tests for utilities
- [ ] 4.2.3 Co-locate tests with source (`*.test.ts`)
- [ ] 4.2.4 Tests should fail initially (no implementation yet)

### 4.3 Integration Tests

- [ ] 4.3.1 Write tests for API + Database interactions
- [ ] 4.3.2 Write tests for authentication/authorization
- [ ] 4.3.3 Write tests for error handling
- [ ] 4.3.4 Tests should fail initially

### 4.4 E2E Test Skeletons

- [ ] 4.4.1 Write Playwright test structure in `tests/`
- [ ] 4.4.2 Document complete user flows
- [ ] 4.4.3 Define page object models (if needed)
- [ ] 4.4.4 Tests should fail initially

### 4.5 Test Verification

- [ ] 4.5.1 Run `pnpm test` - tests should fail for right reasons
- [ ] 4.5.2 Verify test failures match expectations
- [ ] 4.5.3 Fix any test syntax/compilation errors
- [ ] 4.5.4 Document expected test failures

**Deliverable:** Complete test suite (failing tests ready for implementation)

---

## 🛑 CHECKPOINT: Proposal Complete

**Proposal author verification before handoff:**

- [ ] ✅ `proposal.md` complete with requirements and document IDs
- [ ] ✅ `design.md` complete with technical decisions and rationale
- [ ] ✅ API specification update plan documented
- [ ] ✅ Test suite written (failing tests)
- [ ] ✅ All tests fail for expected reasons
- [ ] ✅ Validate proposal: `openspec validate [change-name] --strict`
- [ ] ✅ Review proposal with user (if needed)

**Handoff Package:**

1. `proposal.md` - Requirements analysis with document IDs
2. `design.md` - Technical design with rationale
3. `tasks.md` - This file with complete workflow
4. `specs/[domain]/spec.md` - Requirements deltas
5. Test suite - Failing tests ready for implementation

---

## Phase 5: Implementation 💻

**Goal:** Make the failing tests pass by implementing the required functionality

**Responsible:** Implementation Developer

**CRITICAL:** Follow implementation order strictly - Schema → Types → API → Logic → UI

### 5.0 Prerequisites: Review Proposal

- [ ] 5.0.1 Read complete proposal: `openspec show [change-name]`
- [ ] 5.0.2 Review `proposal.md` - understand why, what, and impact
- [ ] 5.0.3 Review `design.md` - understand technical decisions
- [ ] 5.0.4 Review `specs/` - understand requirements deltas
- [ ] 5.0.5 Review Phases 1-4 in this file
- [ ] 5.0.6 Run existing tests: `pnpm test` (should show failing tests)
- [ ] 5.0.7 Verify test failures are expected
- [ ] 5.0.8 Understand test assertions and expected behavior

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

**Responsible:** Implementation Developer

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

## 🎯 Final Validation Checklist

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

## Change Complete ✅

**Deliverables:**

1. ✅ Requirements analyzed with document IDs (`proposal.md`)
2. ✅ Technical design documented (`design.md`)
3. ✅ Tests written and passing (TDD complete)
4. ✅ Working implementation (all phases 1-6 complete)
5. ✅ Refactored, clean code
6. ✅ Complete documentation (API, requirements, user guides)
7. ✅ Production-ready code

**Next steps (archiving process):**

- Update specification with changes
- Archive change proposal
- Deploy to staging/production

---

## Notes & Best Practices

### For Proposal Authors (Phases 1-4)

- Complete ALL Phase 1-4 tasks before submission
- Document all decisions with clear rationale
- Write actual test code, not just scenarios
- Tests SHOULD fail at this stage (red phase of TDD)
- Use TypeScript `any` or mock types temporarily if types don't exist yet
- Review existing tests in `src/**/*.test.ts` and `tests/` for patterns
- Validate proposal: `openspec validate [change-name] --strict`

### For Implementation Developers (Phases 5-6)

- Follow implementation order strictly: Schema → Types → API → Logic → UI
- Run tests frequently during implementation
- Refactor continuously while keeping tests green
- Don't skip documentation - it's critical for maintenance
- Keep commits atomic and well-described
- Use feature branch and PR workflow (if applicable)

### General Guidelines

- Add additional tasks if needed, but maintain phase structure
- Document deviations from plan with rationale
- Keep this tasks file updated as source of truth
- Use checkboxes to track progress
- Reference this file in PR descriptions
