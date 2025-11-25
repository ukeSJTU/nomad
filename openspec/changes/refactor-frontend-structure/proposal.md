# Change: Refactor frontend route structure

## Why

- The current `(frontend)` grouping mixes marketing, auth, booking, and account flows, which makes navigation and ownership unclear.
- Frontend and docs helpers (e.g., Fumadocs) sit under `src/lib`, blurring boundaries between UI concerns and business logic.
- A domain-based layout with collocated feature helpers will make it easier to find pages, share layouts, and reason about route ownership.

## What Changes

- Introduce a `(site)` wrapper with nested `(marketing)`, `(auth)`, and `(app)` route groups for landing, auth, and signed-in product surfaces.
- Relocate feature routes so `/flights/**`, `/orders/**`, `/home/**`, and booking flows live under `(site)/(app)/**` with shared shell and sidebar helpers in `_components`.
- Move docs-specific helpers out of `src/lib` into a dedicated docs/frontend location (e.g., `src/fumadocs/**`) and update imports.
- Keep server actions in `src/app/_actions/**` while updating project/docs references to the new frontend structure.

## Impact

- Affected specs: `frontend-architecture` (new capability)
- Affected code: `src/app/(frontend)/**`, `src/app/not-found.tsx`, docs routes importing `@/lib/fumadocs/**`, `openspec/project.md`, any references to old group names or globals.css paths
