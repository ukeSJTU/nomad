## ADDED Requirements

### Requirement: Layered Backend Architecture

The backend SHALL organize code into a presentation layer (`src/app/api/**`), a business logic layer (`src/lib/services/**`), and a data access layer (`src/lib/repositories/**`) with dependencies flowing only downward.

#### Scenario: API Routes Use Services

- **WHEN** an API route handles a request
- **THEN** it SHALL delegate business operations to the service layer without performing direct database access
- **AND** it SHALL keep HTTP concerns (authentication, response shaping) within the presentation layer.

#### Scenario: Services Use Repositories

- **WHEN** a service needs to read or write persisted data
- **THEN** it SHALL call repository functions under `src/lib/repositories/**`
- **AND** it SHALL avoid importing database clients or schema modules directly.
