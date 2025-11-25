# Context

- Backend logic currently mixes request handling, business rules, and Drizzle calls across API routes, services, and query helpers.
- We need a consistent layering model that is easy to extend and test: Presentation → Services → Repositories.

# Goals / Non-Goals

- Goals: formalize layer boundaries, move database access into repositories, keep business logic reusable in services, and keep presentation handlers thin.
- Non-Goals: change functional behavior, redesign database schema, or add new endpoints.

# Decisions

- Layers: `src/app/api/**` (presentation), `src/lib/services/**` (business), `src/lib/repositories/**` (data access). Each layer depends only on the layer directly beneath it.
- Structure: repositories organized by domain (e.g., `repositories/orders`, `repositories/passengers`); services mirror that domain structure.
- Contracts: repositories return domain DTOs or raw records as needed; services orchestrate validation/transactions and surface `ServiceResult` objects.
- Error handling: repositories throw or return structured results; services translate to user-facing messages; presentation handlers handle HTTP concerns.

# Risks / Trade-offs

- Large refactor touches many imports; risk of missed path updates → mitigate with targeted searches and type checks.
- Services that bundle business and persistence may need incremental extraction; avoid rewriting behavior and favor mechanical moves.

# Migration Plan

- Move existing query helpers into `src/lib/repositories` with matching exports.
- Extract direct `db` usage from services into repositories while preserving logic and return shapes.
- Update presentation/action callers to use services (or repositories when no business logic exists).
- Validate with `openspec validate refactor-backend-layering --strict` and run spot checks or tests as time allows.
