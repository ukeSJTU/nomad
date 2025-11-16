/**
 * src/types/ folder contains Zod validation schemas and utilities
 *
 * All schemas are compatible with Zod v4 and align with the database schema.
 *
 * Naming conventions:
 * - Schemas: camelCase ending with "Schema" (e.g., userInfoUpdateSchema)
 * - Types: PascalCase ending with "Data" (e.g., UserInfoUpdateData)
 */

export * from "./api";
export * from "./auth";
