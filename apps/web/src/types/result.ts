/**
 * Standardized Result Types
 *
 * This file defines the standard result patterns used across the application layers:
 * - Service Layer: Internal business logic results
 * - Action Layer: Server Action results (consumed by UI)
 */

/**
 * Standard result type for service layer operations
 *
 * Discriminated union keeps error and success shapes distinct so callers
 * can't accidentally read missing fields.
 *
 * @template T - Type of the data returned on success
 */
export type ServiceResult<T = void> =
  | {
      success: true;
      /** Data returned on success */
      data?: T;
      /** Optional success message */
      message?: string;
      error?: undefined;
    }
  | {
      success: false;
      /** Error message on failure */
      error: string;
      /** Optional success message */
      message?: string;
      data?: undefined;
    };

/**
 * Standard result type for Server Actions
 *
 * Optimized for frontend consumption (forms, toast notifications).
 * Includes support for field-level validation errors.
 *
 * @template T - Type of the data returned on success (defaults to void)
 */
export type ActionResult<T = void> =
  | {
      success: true;
      data: T;
      error?: undefined;
      fieldErrors?: undefined;
      message?: string;
    }
  | {
      success: false;
      error: string;
      data?: undefined;
      fieldErrors?: Record<string, string[]>;
      message?: undefined;
    };
