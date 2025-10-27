# Improve Seed Data Generation with Faker.js Airline Module

## Why

The current database seeding logic in `src/lib/db/seed.ts` relies heavily on hardcoded arrays for airports (12 items), airlines (10 items), and aircraft types (6 items). This approach has several drawbacks:

1. **Limited Data Diversity** - Only 12 airports and 10 airlines restrict testing scenarios and user experience in development
2. **High Maintenance Cost** - Manual updates required for airport metadata (timezone, city, country), prone to errors
3. **Unrealistic Data** - Flight numbers use simple concatenation (`${airlineCode}${randomNumber}`), lacking industry-standard formatting
4. **Poor Scalability** - Adding new airports/airlines requires extensive manual coding

Faker.js v10.0.0 (currently used in the project) introduced the `airline` module with methods that generate realistic aviation data based on real-world standards. This eliminates hardcoded data and significantly improves seed data quality.

## What Changes

- **Replace hardcoded airport data** with `faker.airline.airport()` to generate dynamic, realistic airport information
- **Replace hardcoded airline data** with `faker.airline.airline()` to generate diverse airline records
- **Improve flight number generation** using `faker.airline.flightNumber()` for industry-standard formatting
- **Replace aircraft type array** with `faker.airline.airplane()` to get realistic aircraft model names
- **Add code documentation** explaining the new Faker.js Airline module usage patterns

**Non-Breaking Changes:**

- Database schema remains unchanged
- Seed data quantity and structure unchanged (still 50 flights, 12 airports, 10 airlines, etc.)
- All generated data will still satisfy existing database constraints

## Impact

**Affected Specs:**

- **NEW**: `data-seed` - Database seeding and test data generation capability

**Affected Code:**

- `src/lib/db/seed.ts` - Primary implementation file
- No schema changes required (`src/lib/schema/` unchanged)
- No API or frontend changes

**Dependencies:**

- `@faker-js/faker` v10.0.0+ already installed (currently ^10.0.0 in package.json)
- No new dependencies required

**Benefits:**

- **Improved Data Quality** - Real-world airport/airline names increase realism
- **Enhanced Testing** - More diverse data scenarios for E2E and integration tests
- **Reduced Maintenance** - No manual airport/airline data updates needed
- **Better Developer Experience** - More interesting data in local development environments

**Risks:**

- Minimal - Changes isolated to seed script, does not affect production data generation
- Faker.js generates random data, so tests relying on specific seed data values may need updates (low probability as tests should use factories)
