/**
 * Root type exports
 *
 * Provides centralized access to all type categories:
 * - database: Drizzle-inferred types (single source of truth)
 * - dto: Data transfer objects for UI/API consumption
 * - validations: Zod schemas for runtime validation
 * - actions: Server action result types (import directly from @/types/actions)
 * - api: API response formats
 * - common: Shared utility types
 */

export * from "./api";
export * from "./common";
export * from "./database";
export * from "./dto";
export * from "./http";
export * from "./validations";

// Note: actions/* exports are not re-exported here to avoid naming conflicts
// Import action types directly: import { ... } from "@/types/actions"
