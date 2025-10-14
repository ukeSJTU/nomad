import { z } from "zod";

import { createSuccessResponseSchema, messageResponseSchema } from "./response";

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

// Set initial password response schema (using standard message format)
export const setInitialPasswordResponseSchema = createSuccessResponseSchema(
  messageResponseSchema
);

// TypeScript types
export type SetInitialPasswordRequest = z.infer<
  typeof setInitialPasswordRequestSchema
>;
export type SetInitialPasswordResponse = z.infer<
  typeof setInitialPasswordResponseSchema
>;
