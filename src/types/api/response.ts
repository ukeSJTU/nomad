import { z } from "zod";

/**
 * API Response Format Schemas and Types
 *
 * This file defines the standard response formats for all API endpoints:
 * - Success responses
 * - Error responses
 * - Paginated responses
 *
 * All API endpoints must use one of these standard formats.
 */

// Response metadata schema
export const responseMetaSchema = z.object({
  timestamp: z.string().datetime(),
  requestId: z.string(), // Required for request tracking
});

// Error detail schema for validation errors
export const errorDetailSchema = z.object({
  field: z.string(),
  message: z.string(),
});

// Success response schema (generic)
export function createSuccessResponseSchema<T extends z.ZodTypeAny>(
  dataSchema: T
) {
  return z.object({
    success: z.literal(true),
    data: dataSchema,
    meta: responseMetaSchema,
  });
}

// Error response schema
export const errorResponseSchema = z.object({
  success: z.literal(false),
  error: z.object({
    code: z.string(),
    message: z.string(),
    details: z.array(errorDetailSchema).optional(),
  }),
  meta: responseMetaSchema,
});

// Pagination metadata schema
export const paginationMetaSchema = z.object({
  page: z.number().int().positive(),
  pageSize: z.number().int().positive(),
  totalPages: z.number().int().nonnegative(),
  totalItems: z.number().int().nonnegative(),
});

// Paginated response schema (generic)
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

// Pagination query parameters schema
export const paginationQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  pageSize: z.coerce.number().int().positive().max(100).default(20),
});

// TypeScript type inference
export type ResponseMeta = z.infer<typeof responseMetaSchema>;
export type ErrorDetail = z.infer<typeof errorDetailSchema>;
export type ErrorResponse = z.infer<typeof errorResponseSchema>;
export type PaginationMeta = z.infer<typeof paginationMetaSchema>;
export type PaginationQuery = z.infer<typeof paginationQuerySchema>;

// Generic types
export type SuccessResponse<T> = {
  success: true;
  data: T;
  meta: ResponseMeta;
};

export type PaginatedResponse<T> = {
  success: true;
  data: {
    items: T[];
    pagination: PaginationMeta;
  };
  meta: ResponseMeta;
};

// Simple message response type for operations that don't return data
export const messageResponseSchema = z.object({
  message: z.string(),
});

export type MessageResponse = z.infer<typeof messageResponseSchema>;

// Create success response schema for simple message responses
export const successMessageResponseSchema = createSuccessResponseSchema(
  messageResponseSchema
);
export type SuccessMessageResponse = z.infer<
  typeof successMessageResponseSchema
>;
