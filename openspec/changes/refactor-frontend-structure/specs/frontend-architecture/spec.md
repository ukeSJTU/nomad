## ADDED Requirements

### Requirement: Site Route Grouping

The frontend SHALL organize non-docs routes under `src/app/(site)` with nested groups for marketing, auth, and signed-in product surfaces.

#### Scenario: Marketing and legal pages

- **WHEN** landing or legal pages are implemented
- **THEN** they SHALL live under `src/app/(site)/(marketing)/**`
- **AND** they SHALL use the shared site layout provided by the `(site)` group.

#### Scenario: Auth pages

- **WHEN** implementing sign-in or sign-up flows
- **THEN** the pages SHALL live under `src/app/(site)/(auth)/**`
- **AND** they SHALL inherit the shared site layout.

#### Scenario: Application pages

- **WHEN** implementing signed-in product routes
- **THEN** they SHALL live under `src/app/(site)/(app)/**`
- **AND** they MAY override layouts within that group for feature-specific shells.

### Requirement: Feature Collocation

Feature routes and shared view helpers SHALL be colocated by domain within the `(site)/(app)` group.

#### Scenario: Flights search and booking

- **WHEN** building `/flights` search/results or booking flows
- **THEN** the pages SHALL reside under `src/app/(site)/(app)/flights/**`
- **AND** booking step layouts SHALL be colocated within that folder.

#### Scenario: Orders detail

- **WHEN** implementing order detail pages
- **THEN** they SHALL reside under `src/app/(site)/(app)/orders/**`
- **AND** they SHALL use shared sidebar shell helpers under `src/app/(site)/(app)/_components/**` when a sidebar is required.

#### Scenario: Account and home surfaces

- **WHEN** implementing `/home/**` account management pages
- **THEN** the routes SHALL live under `src/app/(site)/(app)/home/**`
- **AND** the user home sidebar layout SHALL be colocated within that folder.

### Requirement: Documentation Utilities Isolation

Documentation rendering helpers SHALL live outside the business logic `src/lib/**` tree.

#### Scenario: Fumadocs helpers location

- **WHEN** Fumadocs sources, layout options, or LLM helper modules are imported
- **THEN** they SHALL reside under `src/fumadocs/**`
- **AND** documentation routes SHALL import them from that location instead of `@/lib/**`.

### Requirement: Shared Styling and Dev Controls

Global frontend styles and the development user switcher SHALL be provided by the `(site)` layout so marketing, auth, and application routes share the same base styling.

#### Scenario: Site layout loads globals

- **WHEN** rendering any `(site)` route
- **THEN** the `(site)` layout SHALL import the shared `globals.css`
- **AND** it SHALL render the development-only user switcher when `NODE_ENV` is `development`.
