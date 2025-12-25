/**
 * Auth Event Types
 *
 * Type definitions for the authentication event system.
 * Used for decoupled handling of auth-related side effects (emails, logging, etc.).
 */

import type { User } from "@/types/db";

/**
 * Map of all authentication events and their payload types
 */
export type AuthEventMap = {
  "sign-up": { user: User; ip?: string; userAgent?: string };
  "sign-in": { user: User; method: string; ip?: string; userAgent?: string };
  "email-verified": { user: User };
  "phone-verified": { user: User };
  "password-changed": { user: User };
  "password-reset-requested": { email: string; ip?: string };
  "account-linked": { user: User; provider: string };
  "account-unlinked": { user: User; provider: string };
  emailUpdated: { userId?: string; email: string; userName?: string | null };
  phoneNumberUpdated: {
    userId?: string;
    phoneNumber: string;
    userEmail?: string | null;
    userName?: string | null;
  };
};

/**
 * Union of all event keys
 */
export type AuthEventKey = keyof AuthEventMap;

/**
 * Event handler function type
 */
export type AuthEventHandler<K extends AuthEventKey> = (
  payload: AuthEventMap[K]
) => Promise<void> | void;
