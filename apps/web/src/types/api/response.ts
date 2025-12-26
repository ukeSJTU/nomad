import { z } from "zod";

/**
 * API Response Format Schemas and Types
 *
 * This file defines the standard response formats for all API endpoints.
 *
 * Response Format Standards:
 * - All responses include a `success` boolean indicator
 * - All responses include a `meta` object with timestamp and requestId
 * - Success responses include a `data` field
 * - Error responses include an `error` object with code, message, and optional details
 * - Paginated responses include pagination metadata
 *
 * Naming conventions:
 * - Schemas: camelCase ending with "Schema" (e.g., responseMetaSchema)
 * - Types: PascalCase (e.g., ResponseMeta)
 * - Factory functions: camelCase starting with "create" (e.g., createSuccessResponseSchema)
 *
 * All API endpoints must use one of these standard formats for consistency.
 */

// ============================================================================
// Core Response Schemas
// ============================================================================

/**
 * Response metadata schema
 *
 * Included in all API responses for tracking and debugging purposes.
 *
 * @property timestamp - ISO 8601 datetime string of when the response was generated
 * @property requestId - Unique identifier for request tracking and debugging
 */
export const responseMetaSchema = z.object({
  timestamp: z.string().datetime(),
  requestId: z.string(),
});

/**
 * Error detail schema for validation errors
 *
 * Used to provide field-specific error information in validation failures.
 *
 * @property field - Name of the field that failed validation
 * @property message - Human-readable error message for the field
 */
export const errorDetailSchema = z.object({
  field: z.string(),
  message: z.string(),
});

// ============================================================================
// Success Response Schemas
// ============================================================================

/**
 * Factory function to create a success response schema
 *
 * Creates a standardized success response schema with the provided data schema.
 * This ensures all success responses follow the same structure.
 *
 * @template T - Zod schema type for the response data
 * @param dataSchema - Zod schema defining the structure of the response data
 * @returns Zod schema for a success response with the given data type
 *
 * @example
 * ```typescript
 * const userSchema = z.object({ id: z.string(), name: z.string() });
 * const userResponseSchema = createSuccessResponseSchema(userSchema);
 * // Result: { success: true, data: { id: string, name: string }, meta: {...} }
 * ```
 */
export function createSuccessResponseSchema<T extends z.ZodTypeAny>(
  dataSchema: T
) {
  return z.object({
    success: z.literal(true),
    data: dataSchema,
    meta: responseMetaSchema,
  });
}

/**
 * Error response schema
 *
 * Standard format for all error responses from API endpoints.
 *
 * @property success - Always false for error responses
 * @property error - Error information object
 * @property error.code - Machine-readable error code (e.g., "VALIDATION_ERROR", "NOT_FOUND")
 * @property error.message - Human-readable error message
 * @property error.details - Optional array of field-specific validation errors
 * @property meta - Response metadata (timestamp, requestId)
 */
export const errorResponseSchema = z.object({
  success: z.literal(false),
  error: z.object({
    code: z.string(),
    message: z.string(),
    details: z.array(errorDetailSchema).optional(),
  }),
  meta: responseMetaSchema,
});

// ============================================================================
// Pagination Schemas
// ============================================================================

/**
 * Pagination metadata schema
 *
 * Provides information about the current page and total available items.
 *
 * @property page - Current page number (1-indexed)
 * @property pageSize - Number of items per page
 * @property totalPages - Total number of pages available
 * @property totalItems - Total number of items across all pages
 */
export const paginationMetaSchema = z.object({
  page: z.number().int().positive(),
  pageSize: z.number().int().positive(),
  totalPages: z.number().int().nonnegative(),
  totalItems: z.number().int().nonnegative(),
});

/**
 * Factory function to create a paginated response schema
 *
 * Creates a standardized paginated response schema with the provided item schema.
 * This ensures all paginated responses follow the same structure.
 *
 * @template T - Zod schema type for individual items
 * @param itemSchema - Zod schema defining the structure of each item
 * @returns Zod schema for a paginated response with the given item type
 *
 * @example
 * ```typescript
 * const userSchema = z.object({ id: z.string(), name: z.string() });
 * const usersListSchema = createPaginatedResponseSchema(userSchema);
 * // Result: { success: true, data: { items: [...], pagination: {...} }, meta: {...} }
 * ```
 */
export function createPaginatedResponseSchema<T extends z.ZodTypeAny>(
  itemSchema: T
) {
  return z.object({
    success: z.literal(true),
    data: z.object({
      items: z.array(itemSchema),
      pagination: paginationMetaSchema,
    }),
    meta: responseMetaSchema,
  });
}

/**
 * Pagination query parameters schema
 *
 * Standard query parameters for paginated endpoints.
 * Uses coercion to convert string query params to numbers.
 *
 * @property page - Page number to retrieve (default: 1, min: 1)
 * @property pageSize - Number of items per page (default: 20, min: 1, max: 100)
 */
export const paginationQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  pageSize: z.coerce.number().int().positive().max(100).default(20),
});

// ============================================================================
// Message Response Schemas
// ============================================================================

/**
 * Simple message response schema
 *
 * Used for operations that don't return specific data but need to confirm success.
 *
 * @property message - Human-readable success message
 */
export const messageResponseSchema = z.object({
  message: z.string(),
});

/**
 * Success message response schema
 *
 * Combines messageResponseSchema with the standard success response format.
 * Useful for operations like delete, update, etc. that don't return data.
 */
export const successMessageResponseSchema = createSuccessResponseSchema(
  messageResponseSchema
);

// ============================================================================
// TypeScript Type Exports
// ============================================================================

/**
 * Inferred TypeScript types from Zod schemas
 * These types are automatically generated and should not be manually modified
 */
export type ResponseMeta = z.infer<typeof responseMetaSchema>;
export type ErrorDetail = z.infer<typeof errorDetailSchema>;
export type ErrorResponse = z.infer<typeof errorResponseSchema>;
export type PaginationMeta = z.infer<typeof paginationMetaSchema>;
export type PaginationQuery = z.infer<typeof paginationQuerySchema>;
export type MessageResponse = z.infer<typeof messageResponseSchema>;
export type SuccessMessageResponse = z.infer<
  typeof successMessageResponseSchema
>;

/**
 * Generic success response type
 *
 * Use this type when you need a success response with custom data type.
 *
 * @template T - Type of the response data
 */
export type SuccessResponse<T> = {
  success: true;
  data: T;
  meta: ResponseMeta;
};

/**
 * Generic paginated response type
 *
 * Use this type when you need a paginated response with custom item type.
 *
 * @template T - Type of individual items in the response
 */
export type PaginatedResponse<T> = {
  success: true;
  data: {
    items: T[];
    pagination: PaginationMeta;
  };
  meta: ResponseMeta;
};
