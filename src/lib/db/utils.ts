import { createHash } from "crypto";

/**
 * Generate a deterministic UUID from a string
 * This is useful for creating consistent test data IDs
 *
 * @param str - Input string (e.g., testId + suffix)
 * @returns UUID v4-formatted string
 */
export function generateUUIDFromString(str: string): string {
  const hash = createHash("md5").update(str).digest("hex");
  return `${hash.slice(0, 8)}-${hash.slice(8, 12)}-${hash.slice(12, 16)}-${hash.slice(16, 20)}-${hash.slice(20, 32)}`;
}
