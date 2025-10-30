/**
 * Date formatting and manipulation utility functions
 *
 * This module provides consistent date formatting and date range calculations
 * across the application, particularly for Chinese locale display and flight
 * search date selection.
 */

import { addDays, max, min, startOfDay } from "date-fns";
import { fromZonedTime, toZonedTime } from "date-fns-tz";

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

/**
 * Get booking date range (today to 365 days in the future) in a specific timezone
 *
 * @param timezone - IANA timezone string (e.g., "Asia/Shanghai")
 * @returns Object containing minDate (today) and maxDate (today + 365 days)
 *
 * @example
 * ```ts
 * const range = getBookingDateRange("Asia/Shanghai");
 * // { minDate: Date(2025-11-15), maxDate: Date(2026-11-15) }
 * ```
 */
export function getBookingDateRange(timezone: string): {
  minDate: Date;
  maxDate: Date;
} {
  // Get current time in UTC, then convert to the specified timezone
  const nowUTC = new Date();
  const nowInTimezone = toZonedTime(nowUTC, timezone);

  // Get start of day in the timezone
  const startOfDayInTimezone = startOfDay(nowInTimezone);

  // Convert back to UTC for consistent Date objects
  const minDate = fromZonedTime(startOfDayInTimezone, timezone);

  // Add 365 days to get max date
  const maxDate = addDays(minDate, 365);

  return { minDate, maxDate };
}

/**
 * Date range result for quick date selection
 */
export interface QuickSelectDateRange {
  /** Start date of the range */
  startDate: Date;
  /** End date of the range (inclusive) */
  endDate: Date;
  /** Array of all dates in the range */
  dates: Date[];
}

/**
 * Calculate a 7-day date range centered on the selected date for quick date selection.
 * Handles edge cases where the range would exceed the allowed booking window.
 *
 * Algorithm:
 * 1. Try to create a range of [selectedDate - 3, selectedDate + 3] (7 days total)
 * 2. If the range exceeds minDate or maxDate, shift the window to stay within bounds
 * 3. Always try to return exactly 7 dates, unless the total allowed range is < 7 days
 *
 * @param selectedDate - The date to center the range around
 * @param minDate - Minimum allowed date (typically today)
 * @param maxDate - Maximum allowed date (typically today + 365 days)
 * @returns Object containing startDate, endDate, and array of dates
 *
 * @example
 * ```ts
 * // Normal case: selected date in middle of range
 * const today = new Date('2025-11-15');
 * const maxDate = addDays(today, 365);
 * const selected = new Date('2025-11-20');
 * const range = calculateQuickSelectDateRange(selected, today, maxDate);
 * // Returns: { startDate: 2025-11-17, endDate: 2025-11-23, dates: [7 dates] }
 *
 * // Edge case: selected date near start
 * const selected2 = new Date('2025-11-16');
 * const range2 = calculateQuickSelectDateRange(selected2, today, maxDate);
 * // Returns: { startDate: 2025-11-15, endDate: 2025-11-21, dates: [7 dates] }
 * ```
 */
export function calculateQuickSelectDateRange(
  selectedDate: Date,
  minDate: Date,
  maxDate: Date
): QuickSelectDateRange {
  const WINDOW_SIZE = 7;
  const DAYS_BEFORE = 3;
  const DAYS_AFTER = 3;

  // Helper function to normalize date to start of day in UTC
  const normalizeToUTCStartOfDay = (date: Date): Date => {
    const utcDate = new Date(
      Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate())
    );
    return utcDate;
  };

  // Normalize dates to start of day in UTC for consistent comparison
  const normalizedSelected = normalizeToUTCStartOfDay(selectedDate);
  const normalizedMin = normalizeToUTCStartOfDay(minDate);
  const normalizedMax = normalizeToUTCStartOfDay(maxDate);

  // Calculate ideal range: [selectedDate - 3, selectedDate + 3]
  const idealStart = addDays(normalizedSelected, -DAYS_BEFORE);
  const idealEnd = addDays(normalizedSelected, DAYS_AFTER);

  // Clamp to allowed range
  let rangeStart = max([idealStart, normalizedMin]);
  let rangeEnd = min([idealEnd, normalizedMax]);

  // Calculate current range size
  const currentSize =
    Math.floor(
      (rangeEnd.getTime() - rangeStart.getTime()) / (1000 * 60 * 60 * 24)
    ) + 1;

  // If range is less than 7 days, try to extend it
  if (currentSize < WINDOW_SIZE) {
    const deficit = WINDOW_SIZE - currentSize;

    // Try to extend start (if end is at maxDate)
    if (rangeEnd.getTime() === normalizedMax.getTime()) {
      const newStart = addDays(rangeStart, -deficit);
      rangeStart = max([newStart, normalizedMin]);
    }
    // Try to extend end (if start is at minDate)
    else if (rangeStart.getTime() === normalizedMin.getTime()) {
      const newEnd = addDays(rangeEnd, deficit);
      rangeEnd = min([newEnd, normalizedMax]);
    }
  }

  // Generate array of dates from start to end (inclusive)
  const dates: Date[] = [];
  let currentDate = rangeStart;
  while (currentDate <= rangeEnd) {
    dates.push(currentDate);
    currentDate = addDays(currentDate, 1);
  }

  return {
    startDate: rangeStart,
    endDate: rangeEnd,
    dates,
  };
}
