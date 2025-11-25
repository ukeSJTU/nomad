## 1. Implementation

- [x] 1.1 Create `src/app/_actions` and move all server action modules from `src/lib/actions/**` into it.
- [x] 1.2 Update all imports/exports to the new path; ensure routes/components/tests use `@/app/_actions`.
- [x] 1.3 Review layering: confirm actions stay thin, note any direct ORM/repository access for follow-up.
- [x] 1.4 Run validation (openspec) and targeted checks (lint/tests as feasible) to confirm the new layout.
