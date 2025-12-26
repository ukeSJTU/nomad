/**
 * Utility functions for order components
 */

/**
 * Format time in seconds to MM:SS format
 */
export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
}

/**
 * Format flight time (HH:MM)
 */
export function formatFlightTime(datetime: Date): string {
  return new Date(datetime).toLocaleTimeString("zh-CN", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

/**
 * Format flight date (YYYY/MM/DD)
 */
export function formatFlightDate(datetime: Date): string {
  return new Date(datetime).toLocaleDateString("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
}

/**
 * Get seat class display name
 */
export function getSeatClassName(classType: string): string {
  const classNames: Record<string, string> = {
    ECONOMY: "经济舱",
    BUSINESS: "商务舱",
    FIRST: "头等舱",
  };
  return classNames[classType] || classType;
}

/**
 * Get identity type display name
 */
export function getIdentityTypeName(
  identityType: "passport" | "id_card" | "other"
): string {
  const typeNames = {
    passport: "护照",
    id_card: "身份证",
    other: "其他",
  };
  return typeNames[identityType];
}
