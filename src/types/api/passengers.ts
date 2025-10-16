import { z } from "zod";

import {
  createPaginatedResponseSchema,
  createSuccessResponseSchema,
  messageResponseSchema,
} from "./response";

/**
 * Passenger API Schemas and Types
 *
 * Defines validation schemas and TypeScript types for passenger management API endpoints
 */

// Base passenger schema matching the database schema
export const passengerSchema = z.object({
  id: z.string().uuid(),
  chineseName: z.string().nullable(),
  englishFirstName: z.string().nullable(),
  englishLastName: z.string().nullable(),
  nationality: z.string().nullable(),
  gender: z.enum(["male", "female", "other"]).nullable(),
  dateOfBirth: z.string().nullable(), // ISO date string
  placeOfBirth: z.string().nullable(),
  phone: z.string().nullable(),
  fax: z.string().nullable(),
  email: z.string().email().nullable(),
  documentType: z.enum(["passport", "id_card", "other"]),
  documentNumber: z.string(),
  documentExpiryDate: z.string(), // ISO date string
  isDeleted: z.boolean(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

// Create passenger request schema
export const createPassengerRequestSchema = z
  .object({
    chineseName: z.string().min(1).max(100).optional(),
    englishFirstName: z.string().min(1).max(100).optional(),
    englishLastName: z.string().min(1).max(100).optional(),
    nationality: z.string().max(100).optional(),
    gender: z.enum(["male", "female", "other"]).optional(),
    dateOfBirth: z.string().date().optional(), // YYYY-MM-DD format
    placeOfBirth: z.string().max(255).optional(),
    phone: z.string().max(20).optional(),
    fax: z.string().max(20).optional(),
    email: z.string().email().max(255).optional(),
    documentType: z.enum(["passport", "id_card", "other"]),
    documentNumber: z.string().min(1).max(50),
    documentExpiryDate: z.string().date(), // YYYY-MM-DD format
  })
  .refine(
    data => data.chineseName || (data.englishFirstName && data.englishLastName),
    {
      message:
        "Either Chinese name or both English first and last names are required",
      path: ["chineseName"],
    }
  );

// Update passenger request schema (all fields optional except id)
export const updatePassengerRequestSchema = z
  .object({
    id: z.string().uuid(),
    chineseName: z.string().min(1).max(100).optional(),
    englishFirstName: z.string().min(1).max(100).optional(),
    englishLastName: z.string().min(1).max(100).optional(),
    nationality: z.string().max(100).optional(),
    gender: z.enum(["male", "female", "other"]).optional(),
    dateOfBirth: z.string().date().optional(),
    placeOfBirth: z.string().max(255).optional(),
    phone: z.string().max(20).optional(),
    fax: z.string().max(20).optional(),
    email: z.string().email().max(255).optional(),
    documentType: z.enum(["passport", "id_card", "other"]).optional(),
    documentNumber: z.string().min(1).max(50).optional(),
    documentExpiryDate: z.string().date().optional(),
  })
  .refine(
    data =>
      !data.chineseName ||
      data.chineseName ||
      (data.englishFirstName && data.englishLastName),
    {
      message:
        "Either Chinese name or both English first and last names are required",
      path: ["chineseName"],
    }
  );

// Delete passenger request schema
export const deletePassengerRequestSchema = z.object({
  id: z.string().uuid(),
});

// Batch delete passengers request schema
export const batchDeletePassengersRequestSchema = z.object({
  ids: z
    .array(z.string().uuid())
    .min(1, "At least one passenger ID is required"),
});

// List passengers query parameters schema
export const listPassengersQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  pageSize: z.coerce.number().int().positive().max(100).default(20),
  search: z.string().optional(), // Search by name or document number
  nationality: z.string().optional(),
  gender: z.enum(["male", "female", "other"]).optional(),
});

// Response schemas
export const passengerResponseSchema =
  createSuccessResponseSchema(passengerSchema);
export const passengersListResponseSchema =
  createPaginatedResponseSchema(passengerSchema);
export const deletePassengerResponseSchema = createSuccessResponseSchema(
  messageResponseSchema
);

// TypeScript types
export type Passenger = z.infer<typeof passengerSchema>;
export type CreatePassengerRequest = z.infer<
  typeof createPassengerRequestSchema
>;
export type UpdatePassengerRequest = z.infer<
  typeof updatePassengerRequestSchema
>;
export type DeletePassengerRequest = z.infer<
  typeof deletePassengerRequestSchema
>;
export type BatchDeletePassengersRequest = z.infer<
  typeof batchDeletePassengersRequestSchema
>;
export type ListPassengersQuery = z.infer<typeof listPassengersQuerySchema>;
export type PassengerResponse = z.infer<typeof passengerResponseSchema>;
export type PassengersListResponse = z.infer<
  typeof passengersListResponseSchema
>;
export type DeletePassengerResponse = z.infer<
  typeof deletePassengerResponseSchema
>;
