/**
 * Date formatting utilities for UI components
 *
 * These utilities are used by date selector components to format dates
 * for display in Chinese locale.
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
 * Get relative date label (今天, 明天, 后天, etc.)
 *
 * @param date - The date to check
 * @param referenceDate - The reference date (typically today)
 * @returns Relative label or empty string if more than 2 days away
 *
 * @example
 * ```ts
 * const today = new Date('2025-11-15');
 * getRelativeDateLabel(today, today); // "今天"
 * getRelativeDateLabel(addDays(today, 1), today); // "明天"
 * getRelativeDateLabel(addDays(today, 2), today); // "后天"
 * getRelativeDateLabel(addDays(today, 3), today); // ""
 * ```
 */
export function getRelativeDateLabel(date: Date, referenceDate: Date): string {
  // Normalize both dates to start of day for accurate comparison
  const normalizedDate = new Date(date);
  normalizedDate.setHours(0, 0, 0, 0);

  const normalizedRef = new Date(referenceDate);
  normalizedRef.setHours(0, 0, 0, 0);

  const daysDiff = Math.floor(
    (normalizedDate.getTime() - normalizedRef.getTime()) / (1000 * 60 * 60 * 24)
  );

  switch (daysDiff) {
    case 0:
      return "今天";
    case 1:
      return "明天";
    case 2:
      return "后天";
    default:
      return "";
  }
}
