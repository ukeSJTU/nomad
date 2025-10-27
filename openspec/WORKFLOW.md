# Development Workflow Guide

This document explains how the 6-phase development workflow integrates with OpenSpec.

## Quick Start

When you want to add a feature, modify APIs, or make architectural changes:

1. **Tell the AI assistant:** "Create a proposal for [feature]"
2. **AI will follow the 6-phase workflow** defined in `openspec/project.md`
3. **Review and approve** the proposal before implementation
4. **AI implements** following the structured tasks
5. **Verify completion** using the validation checklist
6. **Archive the change** when deployed

## The 6-Phase Workflow

### Phase 1: Requirements Analysis 📋

**What happens:**

- AI reads relevant requirements documents in `content/docs/requirements/`
- Identifies affected requirement sections
- Documents them in `proposal.md`

**Output:** Clear understanding of what needs to be built

### Phase 2: API/Action Design 🎨

**What happens:**

- AI analyzes existing APIs and Server Actions
- Makes "reuse vs new" decision with rationale
- Documents API design in `design.md` and technical docs

**Output:** Technical design document with API specifications

### Phase 3: Update API Specification 📝

**What happens:**

- AI adds JSDoc comments or updates OpenAPI spec
- Ensures API documentation is up-to-date

**Output:** API documentation ready for implementation

### Phase 4: Test Design 🧪

**What happens:**

- AI writes test scenarios based on requirements
- Plans unit, integration, and E2E tests
- Documents test plan in `tasks.md` BEFORE implementation

**Output:** Complete test plan

**🛑 CHECKPOINT:** AI waits for your approval before implementation

### Phase 5: Implementation 💻

**What happens (in this order):**

1. Database schema updates
2. Type definitions and Zod schemas
3. API/Server Actions implementation
4. Business logic
5. Frontend components

**Output:** Working code

### Phase 6: Testing & Documentation ✅

**What happens:**

1. Write and run unit tests
2. Write and run integration tests
3. Write and run E2E tests
4. Update all documentation
5. Validate with checklist

**Output:** Tested, documented, production-ready code

## How It Works with OpenSpec

### Creating a Change Proposal

**You say:** "I want to add two-factor authentication"

**AI does:**

1. **Checks context:**

   ```bash
   openspec list              # Active changes
   openspec list --specs      # Existing capabilities
   ```

2. **Creates change directory:**

   ```
   openspec/changes/add-two-factor-auth/
   ├── proposal.md           # Why, what, impact
   ├── tasks.md             # From template, 6 phases
   ├── design.md            # Technical decisions
   └── specs/
       └── auth/
           └── spec.md      # Requirements deltas
   ```

3. **Structures `tasks.md` using template:**
   - Uses `openspec/templates/tasks-template.md`
   - Customizes for specific feature
   - Maintains 6-phase structure

4. **Validates:**

   ```bash
   openspec validate add-two-factor-auth --strict
   ```

5. **Presents to you for approval**

### During Implementation

**AI tracks progress:**

- Uses TODO management tool
- Updates checkboxes in `tasks.md`
- Completes phases sequentially
- Cannot skip to Phase 5 without completing Phases 1-4

**You can check progress:**

```bash
openspec show add-two-factor-auth
```

### After Deployment

**Archive the change:**

```bash
openspec archive add-two-factor-auth
```

This moves the change to `archive/` and updates `specs/` with implemented requirements.

## Enforcement Mechanisms

### In `openspec/project.md`

- Defines the 6-phase workflow
- Explains each phase in detail
- Provides validation checklist

### In `AGENTS.md`

- References the workflow
- Sets mandatory gates
- Lists AI assistant requirements

### In `templates/tasks-template.md`

- Provides structured task template
- Ensures consistency across changes
- Includes checkpoint before implementation

### AI Assistant Behavior

AI assistants reading these files will:

1. ✅ **Always read** `openspec/project.md` → "Development Workflow" section first
2. ✅ **Structure tasks.md** using the 6-phase template
3. ✅ **Never skip phases** - each must complete before next
4. ✅ **Document API decisions** - reuse vs new with rationale
5. ✅ **Write test plans first** - before implementation
6. ✅ **Wait for approval** - before Phase 5 (Implementation)

## Example Flow

### 1. User Request

```
"I want to add flight search functionality"
```

### 2. AI Creates Proposal

```markdown
# proposal.md

## Why

Users need to search for flights by route, date, and passenger count.

## What Changes

- Add flight search API endpoint
- Add search filters (price, time, airline)
- Add search results UI component

## Impact

- New spec: flight-search
- Affected code: src/app/api/flights/, src/components/flights/
```

### 3. AI Structures Tasks (6 Phases)

```markdown
# tasks.md

## Phase 1: Requirements Analysis

- [x] 1.1 Read flight module requirements
- [x] 1.2 Document search requirements
      ...

## Phase 2: API/Action Design

- [x] 2.1 Review existing flight APIs
- [x] 2.2 **Decision:** Create new /api/flights/search endpoint
- [x] 2.3 Design search schema (Zod)
      ...

## Phase 3: API Specification

- [ ] 3.1 Add JSDoc to searchFlights action
      ...

## Phase 4: Test Design

- [ ] 4.1 Test: Search by route succeeds
- [ ] 4.2 Test: Invalid date returns error
      ...

## Phase 5: Implementation

- [ ] 5.1.1 Add flights table schema (already exists)
- [ ] 5.2.1 Create FlightSearchParams type
      ...

## Phase 6: Testing & Documentation

- [ ] 6.1.1 Write search API unit tests
- [ ] 6.3.1 Write E2E test for search flow
      ...
```

### 4. User Approval

```
"Looks good, proceed with implementation"
```

### 5. AI Implements

- Follows tasks sequentially
- Marks completed: `- [x]`
- Updates you on progress

### 6. Validation

AI runs checklist:

- ✅ Tests passing
- ✅ Coverage ≥ 70%
- ✅ Docs updated
- ✅ Lint passing

### 7. Archive After Deployment

```bash
openspec archive add-flight-search
```

## Benefits

### For You (Developer)

- ✅ **Consistent process** - Every change follows same structure
- ✅ **Clear progress** - Know exactly what phase you're in
- ✅ **Quality gates** - Tests and docs required before completion
- ✅ **Approval control** - AI waits for your go-ahead before coding

### For AI Assistants

- ✅ **Clear instructions** - Knows exactly what to do
- ✅ **No ambiguity** - Workflow is explicit and ordered
- ✅ **Validation** - Can check work at each phase
- ✅ **Consistency** - Every change uses same pattern

### For the Project

- ✅ **Test coverage** - Tests planned before coding
- ✅ **Documentation** - Always kept in sync
- ✅ **API design** - Thoughtful decisions documented
- ✅ **Traceability** - Requirements → Design → Code → Tests

## Tips

### For Complex Features

Break into smaller changes:

- Each change should be < 500 lines
- Complete one change before starting next
- Archive frequently

### For Simple Bug Fixes

Skip the proposal process:

- Fix directly if restoring intended behavior
- No breaking changes
- Update tests if needed

### For API Changes

Always include `design.md`:

- Document reuse vs new decision
- Explain breaking changes
- Include migration plan if needed

### For Questions

If AI needs clarification:

- AI will ask 1-2 questions before scaffolding
- Provide clear answers
- AI will update proposal accordingly

## Commands Reference

```bash
# See active changes
openspec list

# See existing capabilities
openspec list --specs

# View change details
openspec show add-flight-search

# Validate proposal
openspec validate add-flight-search --strict

# Archive completed change
openspec archive add-flight-search

# Search for text
rg "Requirement:" openspec/specs
```

## Troubleshooting

### AI Skipped a Phase

**Problem:** AI jumped to implementation without test plan

**Solution:**

- Remind AI: "Please complete Phase 4 (Test Design) first"
- AI will write test plan before continuing

### Missing Design Document

**Problem:** API change has no `design.md`

**Solution:**

- Tell AI: "Create design.md explaining the API decision"
- AI will document reuse vs new rationale

### Tests Not Written

**Problem:** Implementation done but no tests

**Solution:**

- Refer to Phase 6 checklist
- AI will write unit, integration, and E2E tests

### Unclear Requirements

**Problem:** AI is making assumptions

**Solution:**

- AI should ask clarifying questions in Phase 1
- Provide clear requirements documents
- Update proposal with clarifications

## Summary

The 6-phase workflow ensures:

1. **Requirements** are understood before design
2. **Design** is documented before coding
3. **Tests** are planned before implementation
4. **Implementation** follows best practices
5. **Testing** validates correctness
6. **Documentation** stays current

This integrated approach keeps OpenSpec specs, code, and AI assistants in perfect sync! 🎯
