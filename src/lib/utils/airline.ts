/**
 * Airline Utility Functions
 *
 * Provides helper functions for airline-related operations,
 * including logo URL generation with fallback to UI Avatars.
 */

/**
 * Get airline logo URL with fallback to UI Avatars
 *
 * If the airline has a logoUrl, return it.
 * Otherwise, generate a default avatar using UI Avatars API.
 *
 * @param airline - Airline object with iataCode, name, and optional logoUrl
 * @param size - Avatar size in pixels (default: 128)
 * @returns Logo URL (either custom or UI Avatars fallback)
 *
 * @example
 * ```typescript
 * const airline = { iataCode: "CA", name: "中国国际航空", logoUrl: null };
 * const logoUrl = getAirlineLogoUrl(airline);
 * // Returns: "https://ui-avatars.com/api/?name=CA&background=random&color=fff&size=128"
 * ```
 */
export function getAirlineLogoUrl(
  airline: {
    iataCode: string;
    name: string;
    logoUrl: string | null;
  },
  size: number = 128
): string {
  // Return custom logo if available
  if (airline.logoUrl) {
    return airline.logoUrl;
  }

  // Generate fallback using UI Avatars
  // Use IATA code as the avatar text for consistency
  const params = new URLSearchParams({
    name: airline.iataCode,
    background: "random", // Random background color based on name
    color: "fff", // White text
    size: size.toString(),
    bold: "true", // Bold text for better readability
    format: "svg", // SVG format for scalability
  });

  return `https://ui-avatars.com/api/?${params.toString()}`;
}

/**
 * Generate airline logo URL for seeding
 *
 * This function is specifically for use during database seeding.
 * It generates a UI Avatars URL if logoUrl is null.
 *
 * @param airline - Airline fixture data
 * @returns Airline data with logoUrl populated
 */
export function generateAirlineLogoForSeed(airline: {
  iataCode: string;
  name: string;
  logoUrl: string | null;
}): {
  iataCode: string;
  name: string;
  logoUrl: string;
} {
  return {
    ...airline,
    logoUrl: airline.logoUrl || getAirlineLogoUrl(airline),
  };
}
