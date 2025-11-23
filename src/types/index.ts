/**
 * Root type exports
 *
 * Provides centralized access to all type categories:
 * - database: Drizzle-inferred types (single source of truth)
 * - dto: Data transfer objects for UI/API consumption (includes query result schemas)
 * - validations: Zod schemas for runtime validation
 * - api: API response formats
 * - common: Shared utility types (ActionResult, etc.)
 */

export * from "./api";
export * from "./common";
export * from "./database";
export * from "./dto";
export * from "./http";
export * from "./validations";
