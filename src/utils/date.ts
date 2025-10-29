/**
 * Date formatting utility functions
 *
 * This module provides consistent date formatting across the application,
 * particularly for Chinese locale display.
 */

/**
 * Chinese weekday labels
 */
const WEEKDAYS_ZH = [
  "周日",
  "周一",
  "周二",
  "周三",
  "周四",
  "周五",
  "周六",
] as const;

/**
 * Get Chinese weekday label for a given date
 *
 * @param date - The date to get the weekday for
 * @returns Chinese weekday label (e.g., "周一", "周二")
 *
 * @example
 * ```ts
 * const date = new Date('2025-10-30'); // Thursday
 * getWeekdayLabel(date); // "周四"
 * ```
 */
export function getWeekdayLabel(date: Date): string {
  return WEEKDAYS_ZH[date.getDay()];
}

/**
 * Format date with Chinese month, day, and weekday
 *
 * @param date - The date to format
 * @returns Formatted string in format "M月D日 周X" (e.g., "10月30日 周四")
 *
 * @example
 * ```ts
 * const date = new Date('2025-10-30');
 * formatDateWithWeekday(date); // "10月30日 周四"
 * ```
 */
export function formatDateWithWeekday(date: Date): string {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const weekday = getWeekdayLabel(date);
  return `${month}月${day}日 ${weekday}`;
}

/**
 * Format time in HH:MM:SS format (24-hour)
 *
 * @param date - The date to format
 * @returns Time string in HH:MM:SS format (e.g., "18:11:15")
 *
 * @example
 * ```ts
 * const date = new Date('2025-10-30T18:11:15');
 * formatTime(date); // "18:11:15"
 * ```
 */
export function formatTime(date: Date): string {
  return date.toLocaleTimeString("zh-CN", { hour12: false });
}

/**
 * Format date to YYYY-MM-DD string
 *
 * @param date - The date to format (can be Date, string, or null/undefined)
 * @returns Date string in YYYY-MM-DD format, or fallback text
 *
 * @example
 * ```ts
 * formatDateString(new Date('2025-10-30')); // "2025-10-30"
 * formatDateString('2025-10-30'); // "2025-10-30"
 * formatDateString(null); // "未设置"
 * formatDateString(null, 'N/A'); // "N/A"
 * ```
 */
export function formatDateString(
  date?: Date | string | null,
  fallback: string = "未设置"
): string {
  if (!date) return fallback;
  if (typeof date === "string") return date;
  return date.toISOString().split("T")[0];
}
