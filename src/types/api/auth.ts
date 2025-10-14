import { z } from "zod";

import { messageResponseSchema, responseMetaSchema } from "./response";

/**
 * Authentication API validation schemas
 */

// Set initial password request schema
export const setInitialPasswordRequestSchema = z.object({
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(128, "Password must not exceed 128 characters"),
});

// Set initial password response schema (explicit definition for OpenAPI generation)
export const setInitialPasswordResponseSchema = z.object({
  success: z.literal(true),
  data: messageResponseSchema,
  meta: responseMetaSchema,
});

// TypeScript types
export type SetInitialPasswordRequest = z.infer<
  typeof setInitialPasswordRequestSchema
>;
export type SetInitialPasswordResponse = z.infer<
  typeof setInitialPasswordResponseSchema
>;
