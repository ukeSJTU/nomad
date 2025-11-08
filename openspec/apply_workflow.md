# Implementation Workflow Guide

This document explains how to implement change proposals following the 6-phase development workflow.

## Overview

**Your Role:** Implement approved change proposals created by the proposal team.

**You are responsible for:** Phases 5-6 (Implementation, Refactoring & Documentation) and archiving changes

**You are NOT responsible for:** Phases 1-4 (these are completed in the proposal)

**Core Principles:**

- ✅ Follow the test-driven approach (make failing tests pass)
- ✅ Implement in the prescribed order (schema → types → API → logic → UI)
- ✅ Refactor continuously while keeping tests green
- ✅ Update all documentation before completing

## Your Responsibilities: Phases 5-6

### Phase 5: Implementation 💻

**Goal:** Make the failing tests pass by implementing the required functionality

**Implementation order (MUST follow):**

1. **Database Schema** (if needed)
   - Update Drizzle schema in `src/lib/schema/`
   - Run `pnpm db:generate` to generate migrations
   - Run `pnpm db:push` to apply schema changes
   - Verify schema changes in database

2. **Type Definitions**
   - Create/update types in `src/types/`
   - Define Zod schemas for validation in appropriate files
   - Ensure types match database schema
   - Export types for use across the application

3. **API/Server Actions**
   - Implement endpoints in `src/app/api/[route]/route.ts` OR
   - Implement Server Actions in `src/app/[route]/actions.ts`
   - Add Zod validation using defined schemas
   - Implement comprehensive error handling
   - Add JSDoc comments as planned in Phase 3

4. **Business Logic**
   - Implement core functionality
   - Keep logic testable and pure when possible
   - Separate concerns (validation, business rules, data access)
   - Add inline comments for complex logic

5. **Frontend Components** (if applicable)
   - Implement UI components in `src/components/[domain]/`
   - Use Shadcn/UI components from `src/components/ui/`
   - Connect to Server Actions or API endpoints
   - Implement proper loading and error states
   - Ensure accessibility standards

**Output:** All tests passing (green phase of TDD)

### Phase 6: Refactoring & Documentation ✅

**Goal:** Clean up code and ensure complete documentation

**Refactoring:**

1. **Code Quality**
   - Remove code duplication (DRY principle)
   - Simplify complex functions
   - Improve naming for clarity
   - Ensure consistent code style
   - Run `pnpm lint` and fix all issues

2. **Performance**
   - Optimize database queries
   - Add appropriate indexes
   - Implement caching where beneficial
   - Minimize re-renders in React components

3. **Type Safety**
   - Replace any `any` types with proper types
   - Ensure strict null checks
   - Run `tsc --noEmit` and fix all errors

**Documentation Updates:**

1. **API Documentation**
   - Update OpenAPI spec (run `pnpm api:generate` if using REST APIs)
   - Verify JSDoc comments are complete and accurate
   - Update `content/docs/technical-design/backend/[feature]-api.mdx`

2. **Requirements Documentation**
   - Update requirement documents using IDs from `proposal.md`
   - Mark requirements as implemented
   - Update `content/docs/requirements/functional-requirements/[module].mdx`

3. **User Documentation**
   - Update user guides in `content/docs/`
   - Add screenshots or examples if applicable
   - Update API usage examples

4. **Code Comments**
   - Ensure complex logic has explanatory comments
   - Document any workarounds or edge cases
   - Add TODO comments for future improvements (if any)

**Output:** Production-ready code with complete documentation

## Reference: Proposal Phases (Already Completed)

These phases were completed by the proposal team:

- **Phase 1:** Requirements analyzed, document IDs recorded
- **Phase 2:** API design documented in `design.md`
- **Phase 3:** API documentation updates planned
- **Phase 4:** Tests written (currently failing)

## Working with a Proposal

### Getting Started

1. **Review the proposal:**

   ```bash
   openspec show [change-name]
   ```

2. **Read all proposal documents:**
   - `proposal.md` - Understand why, what, and impact
   - `design.md` - Review technical decisions and API design
   - `tasks.md` - Review completed Phases 1-4, follow Phases 5-6 (from `unified-tasks-template.md`)
   - `specs/` - Check requirements deltas

3. **Run existing tests:**

   ```bash
   pnpm test    # Should show failing tests
   ```

4. **Verify test failures:**
   - Ensure tests fail for the right reasons
   - Understand what each test expects
   - Review test data and assertions

### Implementation Process

Follow the implementation order strictly:

**Step 1: Database (if needed)**

```bash
# Edit schema
vim src/lib/schema/[domain].ts

# Generate migration
pnpm db:generate

# Apply changes
pnpm db:push

# Verify
pnpm db:studio
```

**Step 2: Types & Validation**

```typescript
// src/types/[domain].ts
export type MyType = {...}

// src/lib/schema/[domain].ts or appropriate validation file
export const mySchema = z.object({...})
```

**Step 3: API/Server Actions**

```typescript
// Implement endpoint or action
// Add Zod validation
// Implement error handling
// Add JSDoc comments
```

**Step 4: Business Logic**

```typescript
// Implement core functionality
// Keep functions pure where possible
// Add comments for complex logic
```

**Step 5: Frontend (if applicable)**

```typescript
// Implement UI components
// Connect to backend
// Add loading/error states
```

**Step 6: Verify Tests**

```bash
pnpm test        # All tests should pass now
pnpm test:run    # Run full test suite
pnpm e2e         # Run E2E tests
```

### After Implementation

1. **Run full quality checks:**

   ```bash
   pnpm lint           # Linting
   tsc --noEmit        # Type checking
   pnpm test:run       # All unit tests
   pnpm e2e            # E2E tests
   ```

2. **Update documentation:**
   - API docs
   - Requirements docs (using IDs from proposal)
   - User guides

3. **Request code review** (if working with team)

4. **Deploy to staging** and verify

## Implementation Quality Checklist

Before marking complete, verify:

- [ ] All tests passing (`pnpm test:run` + `pnpm e2e`)
- [ ] Test coverage ≥ 70% for new code
- [ ] Database schema updated (if needed)
- [ ] Type definitions complete and exported
- [ ] API/Server Actions implemented with validation
- [ ] Business logic implemented and commented
- [ ] Frontend components implemented (if applicable)
- [ ] Code refactored (no duplication, good naming)
- [ ] Linting passing (`pnpm lint`)
- [ ] Type checking passing (`tsc --noEmit`)
- [ ] API documentation updated
- [ ] Requirements documentation updated (using IDs from proposal)
- [ ] User documentation updated
- [ ] Code reviewed (if working with team)
- [ ] Deployed to staging and verified

## Guidelines

### Following TDD

- **Red:** Tests are already written and failing (from Phase 4)
- **Green:** Write minimal code to make tests pass
- **Refactor:** Clean up code while keeping tests green
- Repeat for each component/feature

### Database Changes

- Always generate migrations with `pnpm db:generate`
- Review migration SQL before applying
- Test migrations on development database first
- Consider data migration if modifying existing tables
- Add indexes for frequently queried columns

### API Implementation

- Follow RESTful principles for API routes
- Use appropriate HTTP status codes
- Validate all inputs with Zod schemas
- Return consistent error formats
- Add rate limiting for sensitive endpoints (if applicable)

### Error Handling

- Catch and handle all potential errors
- Provide meaningful error messages
- Log errors appropriately
- Don't expose sensitive information in errors
- Use custom error types when beneficial

### Frontend Implementation

- Use Server Actions for mutations
- Implement optimistic updates where appropriate
- Add proper loading states (use Suspense boundaries)
- Add error boundaries for error handling
- Ensure accessibility (ARIA labels, keyboard navigation)
- Test across different viewports

## Troubleshooting

| Problem                  | Solution                                                       |
| ------------------------ | -------------------------------------------------------------- |
| Tests still failing      | Review test expectations, check implementation logic           |
| Type errors              | Update type definitions, ensure consistency with schema        |
| Database migration fails | Check SQL syntax, verify schema changes, rollback if needed    |
| Linting errors           | Run `pnpm lint --fix`, manually fix remaining issues           |
| E2E tests flaky          | Add proper waits, check for race conditions, review selectors  |
| Can't find proposal docs | Run `openspec show [change-name]` to locate proposal directory |
| Unclear design decision  | Check `design.md`, ask proposal author for clarification       |

## Tips for Quality Implementation

### Code Organization

- Keep files small and focused (< 300 lines)
- Use barrel exports (`index.ts`) for cleaner imports
- Co-locate tests with source files (`*.test.ts`)
- Group related functionality in modules

### Performance Considerations

- Use `React.memo` for expensive components
- Implement proper pagination for large lists
- Use database indexes for frequently queried fields
- Cache expensive computations
- Lazy load large components

### Security Best Practices

- Validate all user inputs
- Sanitize data before database operations
- Use parameterized queries (Drizzle handles this)
- Implement proper authentication checks
- Don't trust client-side validation alone

### Testing

- Run tests frequently during implementation
- Fix failing tests immediately
- Don't commit code with failing tests
- Add tests for edge cases discovered during implementation
- Ensure E2E tests cover critical user flows

## Enforcement

**As an implementation developer, you MUST:**

1. Read the complete proposal before starting
2. Review all 6 phases in `tasks.md` (from `unified-tasks-template.md`)
3. Follow the implementation order strictly (Phases 5-6)
4. Make all tests pass before refactoring
5. Run quality checks before requesting review
6. Update all documentation using proposal's document IDs

**🛑 CRITICAL:** Do not skip the implementation order. Schema → Types → API → Logic → UI ensures proper dependency management and reduces errors.

## Workflow Commands

```bash
# View proposal details
openspec show [change-name]

# List all active changes
openspec list

# Validate implementation completeness
openspec validate [change-name] --strict

# Development commands
pnpm db:generate        # Generate database migration
pnpm db:push           # Apply database changes
pnpm db:studio         # View database
pnpm test              # Run tests in watch mode
pnpm test:run          # Run all tests once
pnpm e2e               # Run E2E tests
pnpm lint              # Run linter
pnpm lint --fix        # Fix linting issues
tsc --noEmit          # Type check
```

## Example Implementation Flow

### 1. Start with Proposal Review

```bash
openspec show add-flight-search
cd openspec/changes/add-flight-search
cat proposal.md design.md tasks.md
```

### 2. Run Tests (Should Fail)

```bash
pnpm test
# Expected: Tests for flight search fail
```

### 3. Implement in Order

**Database:**

```typescript
// src/lib/schema/flights.ts
export const flights = pgTable("flights", {
  // ... schema definition
});
```

**Types:**

```typescript
// src/types/flight.ts
export type Flight = typeof flights.$inferSelect;
export type NewFlight = typeof flights.$inferInsert;
```

**API:**

```typescript
// src/app/api/flights/search/route.ts
export async function POST(request: Request) {
  // Implement search endpoint
}
```

**Logic:**

```typescript
// src/lib/queries/flights.ts
export async function searchFlights(params: SearchParams) {
  // Implement search logic
}
```

**UI:**

```typescript
// src/components/flights/flight-search.tsx
export function FlightSearch() {
  // Implement search UI
}
```

### 4. Verify Tests Pass

```bash
pnpm test:run   # All tests green
pnpm e2e        # E2E tests pass
```

### 5. Refactor & Document

- Clean up code
- Update documentation
- Run quality checks

## Summary

The implementation workflow (Phases 5-6) transforms a well-designed proposal into production-ready code by:

1. **Following TDD** - Making failing tests pass through careful implementation
2. **Maintaining order** - Building from foundation (schema) to surface (UI)
3. **Ensuring quality** - Refactoring and documenting before completion
4. **Closing the loop** - Archiving changes to update the specification

This systematic approach ensures consistent, high-quality implementations across the entire project.
