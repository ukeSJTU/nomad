/**
 * Common shared types used across multiple layers
 *
 * Contains utility types that are used in actions, DTOs, and components.
 * Single source of truth for cross-cutting type definitions.
 */

/**
 * Generic action result type for server actions and client operations.
 * Standardizes success/error responses across the application.
 *
 * @template T - Type of the data returned on success (defaults to void)
 *
 * Success case:
 * - success: true
 * - data: T (the result data)
 * - error: undefined
 * - fieldErrors: undefined
 *
 * Failure case:
 * - success: false
 * - error: string (general error message)
 * - data: undefined
 * - fieldErrors: optional field-specific validation errors
 */
export type ActionResult<T = void> =
  | {
      success: true;
      data: T;
      error?: undefined;
      fieldErrors?: undefined;
    }
  | {
      success: false;
      error: string;
      data?: undefined;
      fieldErrors?: Record<string, string[]>;
    };
