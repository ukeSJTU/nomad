# Change: Move server actions into `src/app/_actions`

## Why

- Server actions currently live in `src/lib/actions`, blending presentation concerns into the library layer and crossing the layering boundary defined in backend architecture.
- Placing actions under `src/app/_actions` keeps them in the presentation layer alongside routes, making the dependency flow clearer (routes/actions → services → repositories).

## What Changes

- Create `src/app/_actions` and relocate existing server action modules from `src/lib/actions`.
- Update all imports/exports to reference the new location and keep actions as thin controllers delegating to services.
- Adjust tooling/config/docs references if any point to the old path.

## Impact

- Spec: `backend-architecture`
- Code: all server action files and their import sites (routes/components/tests)
