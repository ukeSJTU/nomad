/**
 * HTTP related type definitions
 */

/**
 * Fetch options that can be passed to API calls
 * Commonly used for adding custom headers like Turnstile tokens
 */
export type FetchOptions = {
  headers?: Record<string, string>;
};
