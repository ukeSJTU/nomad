/**
 * Generic action result type for client-side operations.
 * Standardizes success/error responses across the application.
 *
 * @template T - Type of the data returned on success (defaults to void)
 *
 * Success case:
 * - success: true
 * - data: T (the result data)
 * - error: undefined
 *
 * Failure case:
 * - success: false
 * - error: string (general error message)
 * - data: undefined
 */
export type ActionResult<T = void> =
  | {
      success: true;
      data: T;
      error?: undefined;
    }
  | {
      success: false;
      error: string;
      data?: undefined;
    };
