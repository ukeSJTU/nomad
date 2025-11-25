## 1. Implementation

- [ ] 1.1 Move Drizzle schema from `src/lib/schema` to `src/orm/schema` and update all imports (repositories, services, actions, tests).
- [ ] 1.2 Move DB client/seed utilities from `src/lib/db` to `src/orm/db` and update imports (repositories, seeds, scripts).
- [ ] 1.3 Update repository boundaries so only repositories import from `@/orm/**`; ensure services/actions/routes consume repositories instead of schema/DB directly.
- [ ] 1.4 Adjust path aliases (tsconfig, eslint if needed) and run lint/tests to confirm the new layout.
