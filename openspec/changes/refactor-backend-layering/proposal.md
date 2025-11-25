# Change: Refactor backend into layered architecture

## Why

- Backend logic is mixed across controllers, services, and direct database calls, making changes risky and hard to test.
- We need a clear separation so presentation code (API routes) stays thin while reusable business logic and persistence concerns live in dedicated layers.

## What Changes

- Introduce an explicit repository layer under `src/lib/repositories` for all database access.
- Keep business logic in `src/lib/services` and route handlers in `src/app/api` as the presentation layer.
- Update imports and module structure so higher layers depend only on the next layer down.

## Impact

- Affected specs: backend-architecture
- Affected code: `src/app/api/**`, `src/lib/services/**`, `src/lib/repositories/**` (migrated from queries), callers in `src/app/**` and `src/lib/actions/**`
