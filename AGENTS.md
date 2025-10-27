<!-- OPENSPEC:START -->

# OpenSpec Instructions

These instructions are for AI assistants working in this project.

Always open `@/openspec/AGENTS.md` when the request:

- Mentions planning or proposals (words like proposal, spec, change, plan)
- Introduces new capabilities, breaking changes, architecture shifts, or big performance/security work
- Sounds ambiguous and you need the authoritative spec before coding

Use `@/openspec/AGENTS.md` to learn:

- How to create and apply change proposals
- Spec format and conventions
- Project structure and guidelines

Keep this managed block so 'openspec update' can refresh the instructions.

<!-- OPENSPEC:END -->

## Project-Specific Workflow

**CRITICAL:** All feature changes in this project MUST follow the **6-Phase Development Workflow** defined in `openspec/project.md`.

### Workflow Overview

1. **Requirements Analysis** - Read requirements docs, clarify scope
2. **API/Action Design** - Analyze current APIs, decide reuse vs new, document design
3. **Update API Specification** - Maintain OpenAPI spec or JSDoc comments
4. **Test Design** - Write test plan BEFORE implementation
5. **Implementation** - Follow order: schema → types → API → UI
6. **Testing & Documentation** - Unit → Integration → E2E tests, update docs

### Mandatory Gates

**Before Implementation (Phase 5):**

- [ ] Requirements documents reviewed and referenced
- [ ] API design documented with reuse decision explained
- [ ] Test plan written in `tasks.md`
- [ ] User approval received for proposal

**Before Completion:**

- [ ] All tests passing (unit + E2E)
- [ ] Test coverage ≥ 70% for new code
- [ ] API and user documentation updated
- [ ] Workflow validation checklist completed

### AI Assistant Requirements

1. **Always read** `openspec/project.md` → "Development Workflow" section before creating proposals
2. **Structure tasks.md** to follow the 6-phase workflow explicitly
3. **Never skip phases** - each phase must complete before moving to next
4. **Document decisions** - especially API reuse vs new creation rationale
5. **Test-first approach** - test plan must be written before implementation tasks

For complete workflow details, see `openspec/project.md` → "Development Workflow" section.
