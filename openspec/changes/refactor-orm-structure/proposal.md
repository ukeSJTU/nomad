# Change: Move ORM primitives to `src/orm`

## Why

- The current `src/lib/db` and `src/lib/schema` placement makes ORM primitives look like part of the service layer, causing confusion about dependencies.
- We want a clearer layering boundary so only repositories touch Drizzle schema/DB, aligning with the backend architecture spec.
- Renaming the folder to `orm` avoids the “server” vs “service” ambiguity and signals its purpose.

## What Changes

- Create a dedicated `src/orm/` root that contains `db/` (Drizzle client/seed config) and `schema/` (tables/enums/types).
- Update repositories to import from `@/orm/...` and ensure services/actions/routes depend on repositories only.
- Adjust path aliases, tests, and seeds to the new locations.

## Impact

- Spec: `backend-architecture`
- Code: Drizzle schema files, DB client/seed utilities, repository imports, any tests/actions/routes importing schema/DB directly
