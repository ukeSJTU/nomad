## MODIFIED Requirements

### Requirement: Layered Backend Architecture

The backend SHALL organize code into a presentation layer (`src/app/api/**`), a business logic layer (`src/lib/services/**`), and a data access layer (`src/lib/repositories/**`) with dependencies flowing only downward. The data access layer SHALL rely on ORM primitives housed under `src/orm/db/**` and `src/orm/schema/**`, and other layers SHALL NOT import ORM primitives directly.

#### Scenario: API Routes Use Services

- **WHEN** an API route handles a request
- **THEN** it SHALL delegate business operations to the service layer without performing direct database access
- **AND** it SHALL keep HTTP concerns (authentication, response shaping) within the presentation layer.

#### Scenario: Services Use Repositories

- **WHEN** a service needs to read or write persisted data
- **THEN** it SHALL call repository functions under `src/lib/repositories/**`
- **AND** it SHALL avoid importing database clients or schema modules directly.

#### Scenario: ORM Primitives Are Isolated

- **WHEN** a module needs database tables, enums, or client configuration
- **THEN** it SHALL import them from `@/orm/schema/**` or `@/orm/db/**`
- **AND** only repository modules under `src/lib/repositories/**` SHALL import ORM primitives directly.
