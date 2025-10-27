# 6-Phase Workflow Quick Reference

## Phase Overview

```
Phase 1: Requirements Analysis 📋
    ↓
Phase 2: API/Action Design 🎨
    ↓
Phase 3: Update API Spec 📝
    ↓
Phase 4: Test Design 🧪
    ↓
🛑 CHECKPOINT: User Approval Required
    ↓
Phase 5: Implementation 💻
    ↓
Phase 6: Testing & Documentation ✅
```

## Phase 1: Requirements Analysis

**Input:** Feature request
**Actions:**

- Read `content/docs/requirements/functional-requirements/[module].mdx`
- Identify affected requirements
- Clarify ambiguities

**Output:** Requirements documented in `proposal.md`

## Phase 2: API/Action Design

**Input:** Requirements understanding
**Actions:**

- Check existing APIs (`src/app/api/`)
- Check Server Actions (`src/app/[route]/actions.ts`)
- Decide: Reuse existing vs Create new
- Document in `design.md`

**Output:** Technical design with API specs

## Phase 3: Update API Specification

**Input:** API design
**Actions:**

- Add JSDoc comments
- Update OpenAPI spec (if REST)
- Document schemas (Zod)

**Output:** API documentation

## Phase 4: Test Design

**Input:** API design
**Actions:**

- Write test scenarios
- Plan unit tests
- Plan integration tests
- Plan E2E tests

**Output:** Test plan in `tasks.md`

**🛑 STOP:** Wait for user approval before Phase 5

## Phase 5: Implementation

**Input:** Approved design + test plan
**Order:**

1. Database schema (`src/lib/schema/`)
2. Types (`src/types/`)
3. API/Server Actions
4. Business logic
5. Frontend components

**Output:** Working code

## Phase 6: Testing & Documentation

**Input:** Implementation
**Actions (in order):**

1. Unit tests (`*.test.ts`)
2. Integration tests
3. E2E tests (`tests/`)
4. Update API docs
5. Update user docs

**Output:** Tested, documented code

## Validation Checklist

Before completing:

- [ ] Requirements referenced in proposal
- [ ] API design documented
- [ ] Test plan written before implementation
- [ ] All tests passing
- [ ] Coverage ≥ 70%
- [ ] Docs updated

## Commands

```bash
# List active changes
openspec list

# Validate change
openspec validate [change-id] --strict

# Archive after deployment
openspec archive [change-id]
```

## When to Skip Proposal

✅ Skip for:

- Bug fixes (restoring intended behavior)
- Typos, formatting
- Non-breaking dependency updates

❌ Create proposal for:

- New features
- Breaking changes
- Architecture changes
- Performance optimizations (changing behavior)

## Key Files

- `openspec/project.md` - Full workflow documentation
- `openspec/WORKFLOW.md` - Detailed guide with examples
- `openspec/templates/tasks-template.md` - Task structure
- `AGENTS.md` - AI assistant instructions

## Implementation Order

Always follow this sequence in Phase 5:

```
Schema → Types → API → Logic → UI
```

## Test Order

Always follow this sequence in Phase 6:

```
Unit → Integration → E2E → Documentation
```

## Remember

- **Never skip phases**
- **Document API decisions**
- **Test plan before coding**
- **Get approval before Phase 5**
- **Update docs in Phase 6**
