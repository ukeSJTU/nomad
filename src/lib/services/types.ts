/**
 * Common types for service layer
 *
 * This file contains shared type definitions used across all service layer functions.
 */

/**
 * Standard result type for service operations
 *
 * This type provides a consistent interface for all service layer functions,
 * making error handling and success checking uniform across the application.
 *
 * @template T - The type of data returned on success
 *
 * @example
 * ```typescript
 * // Success case
 * const result: ServiceResult<User> = {
 *   success: true,
 *   data: user,
 *   message: "User created successfully"
 * };
 *
 * // Error case
 * const result: ServiceResult<User> = {
 *   success: false,
 *   error: "User not found"
 * };
 * ```
 */
export interface ServiceResult<T = void> {
  /** Whether the operation succeeded */
  success: boolean;
  /** Data returned on success */
  data?: T;
  /** Error message on failure */
  error?: string;
  /** Optional success message */
  message?: string;
}
