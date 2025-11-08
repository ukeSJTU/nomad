# Development Workflow Guide

This document explains how to create a proper change proposal following the 6-phase development workflow.

## Overview

**Your Role:** Create comprehensive change proposals that development teams can implement.

**You are responsible for:** Phases 1-4 (Analysis, Design, Specification, Test Writing)

**You are NOT responsible for:** Phase 5 (Implementation to make tests pass), Phase 6 (Refactoring & Documentation), or archiving changes

**Task Template:** Use `openspec/templates/unified-tasks-template.md` when creating proposals - it contains all 6 phases for complete visibility

**Core Principles:**

- ✅ Analyze requirements thoroughly before design
- ✅ Design APIs before implementation planning
- ✅ Write tests before implementation (TDD approach)
- ✅ Document all decisions with clear rationale

## Your Responsibilities: Phases 1-4

### Phase 1: Requirements Analysis 📋

**Goal:** Understand what to build based on user's request

- Analyze user's requirements request
- Cross-reference with existing requirements documents in `content/docs/requirements/`
- Identify affected requirement sections and document IDs
- Record document numbers in `proposal.md` for future documentation updates

**Output:** Clear requirements understanding with documented section references

### Phase 2: API/Action Design 🎨

**Goal:** Design technical approach before coding

- Analyze existing APIs and Server Actions
- Decide: reuse vs new (with rationale)
- Document design in `design.md`

**Output:** Technical design document

### Phase 3: Update API Specification 📝

**Goal:** Plan API documentation updates

- Identify which OpenAPI specs or JSDoc comments need updates
- Document the required changes in `design.md`
- Note: Actual spec updates happen during implementation

**Output:** Documentation update plan

### Phase 4: Test Design & Writing 🧪

**Goal:** Write tests before implementation (TDD approach)

- Write test scenarios based on requirements
- Implement unit tests, integration tests, and E2E test skeletons
- Tests should fail initially (no implementation yet)
- Document test plan in `tasks.md`

**Output:** Complete test suite (failing tests ready for implementation)

**✅ YOUR WORK ENDS HERE** - Development team takes over for Phases 5-6

## Reference: Implementation Phases (For Context Only)

You don't execute these phases, but understanding them helps create better proposals.

### Phase 5: Implementation 💻
Development team builds the feature following this order:
1. Database schema → 2. Type definitions → 3. API/Server Actions → 4. Business logic → 5. Frontend components
**Goal:** Make the tests pass by implementing the required functionality

### Phase 6: Refactoring & Documentation ✅
Development team refactors code and updates documentation after tests pass.

## Creating a Proposal

### Change Structure

When you request a feature, AI creates:

```
openspec/changes/[feature-name]/
├── proposal.md          # Why, what, impact
├── tasks.md            # Complete 6-phase workflow (based on unified-tasks-template.md)
├── design.md           # Technical decisions
└── specs/
    └── [domain]/
        └── spec.md     # Requirements deltas
```

**Note:** The `tasks.md` file now contains ALL 6 phases from the start, giving everyone visibility into the complete workflow.

### Workflow Commands

```bash
# List active changes
openspec list

# View change details
openspec show [change-name]

# Validate your proposal
openspec validate [change-name] --strict
```

### Example: Flight Search Proposal

**1. User requests:**
```
"I want to add flight search functionality"
```

**2. You create proposal structure:**
```
openspec/changes/add-flight-search/
├── proposal.md
├── design.md
├── tasks.md
└── specs/flight-search/spec.md
```

**3. Complete Phases 1-4:**

- **Phase 1:** Analyze requirements, record document IDs
- **Phase 2:** Design search API, document reuse decision
- **Phase 3:** Plan JSDoc updates for search functions
- **Phase 4:** Write failing tests for search functionality

**4. Validate and submit:**
```bash
openspec validate add-flight-search --strict
# Submit to implementation team
```

**5. Implementation team** takes over for Phases 5-6


## Proposal Quality Checklist

Before submitting your proposal, verify:

- [ ] Requirements analyzed and document IDs recorded
- [ ] API design documented (reuse vs new decision explained)
- [ ] API specification updates planned
- [ ] Tests written (unit, integration, E2E skeletons - should fail initially)
- [ ] `proposal.md` clearly explains why, what, and impact
- [ ] `design.md` includes technical decisions and rationale
- [ ] `tasks.md` created from `unified-tasks-template.md` with Phases 1-4 completed
- [ ] Proposal validated with `openspec validate --strict`

## Guidelines

### For API Changes

- Always include `design.md`
- Document reuse vs new decision clearly
- Explain any breaking changes
- Include migration considerations

### For Test Planning

- Cover happy path, error cases, and edge cases
- Specify test data using `@faker-js/faker` patterns
- Organize by: unit tests → integration tests → E2E tests

## Troubleshooting

| Problem                   | Solution                                                    |
| ------------------------- | ----------------------------------------------------------- |
| Unclear user requirements | Ask 1-2 clarifying questions before starting Phase 1       |
| Can't find relevant docs  | Search with `rg "keyword" content/docs/requirements/`       |
| Unsure about API decision | Document both options and pros/cons, let dev team decide    |
| Tests won't compile       | Use TypeScript `any` or mock types temporarily              |
| Don't know test patterns  | Review existing tests in `src/**/*.test.ts` and `tests/`    |

## Tips for Quality Proposals

### For Complex Features

- Break into smaller proposals (each < 500 lines of expected code)
- Create dependencies between proposals if needed
- Focus on one domain at a time

### For API Changes

- Always include `design.md`
- Document reuse vs new decision clearly
- Explain any breaking changes
- Include migration considerations

### For Test Planning

- Write actual test code, not just scenarios
- Tests should fail initially (red phase of TDD)
- Cover happy path, error cases, and edge cases
- Specify test data using `@faker-js/faker` patterns
- Organize by: unit tests → integration tests → E2E tests

## Enforcement

**As a proposal author, you MUST:**

1. Read `openspec/project.md` → "Development Workflow" first
2. Structure tasks using 6-phase template
3. Complete Phases 1-4 thoroughly
4. Document API decisions with rationale
5. Write actual test code (failing tests)
6. Validate proposal before submission

**🛑 CRITICAL:** Submit complete proposals covering Phases 1-4. Development teams need clear requirements, design, and tests to proceed with implementation (Phase 5).preview
pre