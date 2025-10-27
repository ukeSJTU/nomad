# Data Seed Specification

This specification defines requirements for database seeding and test data generation in the Nomad OTA platform.

## ADDED Requirements

### Requirement: Realistic Aviation Data Generation

The seed script SHALL generate realistic aviation-related data using industry-standard data sources to improve development and testing quality.

#### Scenario: Generate realistic airport data

- **WHEN** the seed script executes airport data generation
- **THEN** airports SHALL have realistic IATA codes (3-character codes like "JFK", "LAX")
- **AND** airport names SHALL match real-world aviation standards
- **AND** city and country information SHALL be geographically accurate
- **AND** timezone information SHALL be appropriate for the airport location

#### Scenario: Generate realistic airline data

- **WHEN** the seed script executes airline data generation
- **THEN** airlines SHALL have realistic IATA codes (2-character codes like "AA", "DL")
- **AND** airline names SHALL match real-world aviation industry names
- **AND** all generated airlines SHALL be distinct and recognizable

#### Scenario: Generate industry-standard flight numbers

- **WHEN** the seed script generates flight data
- **THEN** flight numbers SHALL follow industry-standard format (airline IATA code + 1-4 digits)
- **AND** flight numbers SHALL be realistic and properly formatted
- **AND** flight numbers SHALL vary appropriately across different flights

#### Scenario: Generate realistic aircraft types

- **WHEN** the seed script generates flight data
- **THEN** aircraft types SHALL be realistic commercial aircraft models (e.g., "Boeing 737", "Airbus A320")
- **AND** aircraft types SHALL vary across flights
- **AND** aircraft types SHALL match industry-standard naming conventions

### Requirement: Unique Aviation Identifiers

The seed script SHALL ensure all aviation identifiers are unique to prevent database constraint violations and maintain data integrity.

#### Scenario: Ensure unique airport IATA codes

- **WHEN** the seed script generates multiple airports
- **THEN** all airport IATA codes SHALL be unique across the generated dataset
- **AND** duplicate IATA codes SHALL be prevented through validation
- **AND** the uniqueness check SHALL retry generation if duplicates are detected

#### Scenario: Ensure unique airline IATA codes

- **WHEN** the seed script generates multiple airlines
- **THEN** all airline IATA codes SHALL be unique across the generated dataset
- **AND** duplicate IATA codes SHALL be prevented through validation
- **AND** the uniqueness check SHALL retry generation if duplicates are detected

### Requirement: Database Schema Compatibility

The seed script SHALL generate data compatible with existing database schema without requiring schema migrations.

#### Scenario: Maintain backward compatibility

- **WHEN** seed data is generated using new data sources
- **THEN** all generated data SHALL satisfy existing database constraints
- **AND** no schema changes SHALL be required
- **AND** all required fields SHALL be populated
- **AND** data types SHALL match schema definitions

#### Scenario: Preserve data structure

- **WHEN** switching from hardcoded to generated data
- **THEN** the data structure SHALL remain unchanged
- **AND** the number of records generated SHALL remain consistent (12 airports, 10 airlines, 50 flights)
- **AND** existing tests SHALL continue to work without modification
- **AND** foreign key relationships SHALL be maintained correctly

### Requirement: Maintainable Seed Code

The seed script SHALL be well-documented and maintainable using modern data generation libraries.

#### Scenario: Document data generation methods

- **WHEN** reviewing the seed script code
- **THEN** all data generation methods SHALL be documented with inline comments
- **AND** Faker.js API usage patterns SHALL be explained
- **AND** data object structures SHALL be documented
- **AND** uniqueness logic SHALL have clear explanatory comments

#### Scenario: Reduce maintenance burden

- **WHEN** maintaining the seed script over time
- **THEN** no hardcoded aviation data arrays SHALL exist in the code
- **AND** data updates SHALL be handled by library updates (Faker.js)
- **AND** adding new data types SHALL follow established patterns
- **AND** code complexity SHALL be minimized through library usage

### Requirement: Seed Script Reliability

The seed script SHALL execute reliably and provide clear feedback during execution.

#### Scenario: Successful seed execution

- **WHEN** running the seed script via `pnpm db:seed`
- **THEN** the script SHALL complete without errors
- **AND** all database tables SHALL be populated with correct record counts
- **AND** progress messages SHALL be logged for each seeding step
- **AND** a summary SHALL be displayed showing counts of seeded records

#### Scenario: Handle seeding errors gracefully

- **WHEN** an error occurs during seeding
- **THEN** the error SHALL be logged with descriptive information
- **AND** the script SHALL fail with a clear error message
- **AND** database state SHALL be consistent (all or nothing per transaction)
