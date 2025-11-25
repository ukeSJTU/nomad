## 1. Implementation

- [x] 1.1 Move Drizzle schema from `src/lib/schema` to `src/orm/schema` and update all imports (repositories, services, actions, tests).
- [x] 1.2 Move DB client/seed utilities from `src/lib/db` to `src/orm/db` and update imports (repositories, seeds, scripts).
- [x] 1.3 Document/prefer repository boundaries with ORM primitives under `@/orm/**`; ensure imports point to the new root.
- [ ] 1.4 Adjust path aliases (tsconfig, eslint if needed) and run lint/tests to confirm the new layout.
