# Proposal Tasks Template

Use this template when creating change proposals (Phases 1-4 only).

**Your Role:** Proposal author - analyzing requirements, designing APIs, planning specs, and writing tests.

**Your Responsibilities:** Complete Phases 1-4, then hand off to implementation team.

**You are NOT responsible for:** Phase 5 (Implementation), Phase 6 (Refactoring & Documentation), or archiving changes.

---

## Phase 1: Requirements Analysis 📋

**Goal:** Understand what to build based on user's request

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
- [ ] 3.5 Note: Actual spec updates will happen during implementation

**Deliverable:** Documentation update plan in `design.md`

---

## Phase 4: Test Design & Writing 🧪

**Goal:** Write tests before implementation (TDD approach)

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

## 🛑 CHECKPOINT: Proposal Review

Before submitting to implementation team:

- [ ] ✅ `proposal.md` complete with requirements and document IDs
- [ ] ✅ `design.md` complete with technical decisions and rationale
- [ ] ✅ API specification update plan documented
- [ ] ✅ Test suite written (failing tests)
- [ ] ✅ All tests fail for expected reasons
- [ ] ✅ Validate proposal: `openspec validate [change-name] --strict`
- [ ] ✅ Review proposal with user (if needed)

---

## Handoff to Implementation Team

**What you're delivering:**

1. **proposal.md** - Requirements analysis with document IDs
2. **design.md** - Technical design with rationale
3. **tasks.md** - This file with Phases 1-4 completed
4. **specs/[domain]/spec.md** - Requirements deltas
5. **Test suite** - Failing tests ready for implementation

**What implementation team will do:**

- Phase 5: Implement functionality to make tests pass (using `apply-tasks-template.md`)
- Phase 6: Refactor and update documentation (using `apply-tasks-template.md`)
- Archive: Update specifications and archive change

**Reference:** Implementation team should follow `openspec/templates/apply-tasks-template.md`

---

## Notes

- Complete ALL Phase 1-4 tasks before submission
- Document all decisions with clear rationale
- Write actual test code, not just scenarios
- Tests SHOULD fail at this stage (red phase of TDD)
- Add additional tasks if needed, but maintain phase structure
- Use TypeScript `any` or mock types temporarily if types don't exist yet
- Review existing tests in `src/**/*.test.ts` and `tests/` for patterns
