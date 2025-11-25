/**
 * Database types for authentication and user management tables.
 *
 * These types are automatically inferred from the Drizzle schema definitions.
 * They represent the structure of data as it exists in the database.
 *
 * @module types/database/auth
 */

import type { InferInsertModel, InferSelectModel } from "drizzle-orm";

import type { account, session, user, verification } from "@/db/schema";

// ============================================================================
// User Types
// ============================================================================

/**
 * User record as returned from database SELECT queries.
 * Includes all fields with their database types.
 */
export type User = InferSelectModel<typeof user>;

/**
 * User data for INSERT operations.
 * Optional fields and defaults are handled by Drizzle.
 */
export type NewUser = InferInsertModel<typeof user>;

/**
 * User gender enum type derived from the user table.
 */
export type UserGender = User["gender"];

// ============================================================================
// Session Types
// ============================================================================

/**
 * Session record as returned from database SELECT queries.
 */
export type Session = InferSelectModel<typeof session>;

/**
 * Session data for INSERT operations.
 */
export type NewSession = InferInsertModel<typeof session>;

// ============================================================================
// Account Types
// ============================================================================

/**
 * OAuth account record as returned from database SELECT queries.
 * Used for third-party authentication providers.
 */
export type Account = InferSelectModel<typeof account>;

/**
 * Account data for INSERT operations.
 */
export type NewAccount = InferInsertModel<typeof account>;

// ============================================================================
// Verification Types
// ============================================================================

/**
 * Verification record as returned from database SELECT queries.
 * Used for email/phone verification codes.
 */
export type Verification = InferSelectModel<typeof verification>;

/**
 * Verification data for INSERT operations.
 */
export type NewVerification = InferInsertModel<typeof verification>;
