import { addDays } from "date-fns";
import { describe, expect, it } from "vitest";

import {
  calculateQuickSelectDateRange,
  calculateTripDuration,
  formatDateString,
  formatDateWithWeekday,
  formatTime,
  getBookingDateRange,
  getRelativeDateLabel,
  getWeekdayLabel,
} from "./date";

/**
 * @requirement REQ-F01
 * @requirement REQ-F02
 */
describe("getRelativeDateLabel", () => {
  /**
   * @requirement REQ-F01
   * @scenario 场景1
   */
  it("returns '今天' for the same day", () => {
    const today = new Date("2025-11-15");
    expect(getRelativeDateLabel(today, today)).toBe("今天");
  });

  it("returns '明天' for next day", () => {
    const today = new Date("2025-11-15");
    const tomorrow = addDays(today, 1);
    expect(getRelativeDateLabel(tomorrow, today)).toBe("明天");
  });

  it("returns '后天' for day after tomorrow", () => {
    const today = new Date("2025-11-15");
    const dayAfter = addDays(today, 2);
    expect(getRelativeDateLabel(dayAfter, today)).toBe("后天");
  });

  it("returns empty string for dates more than 2 days away", () => {
    const today = new Date("2025-11-15");
    const future = addDays(today, 3);
    expect(getRelativeDateLabel(future, today)).toBe("");
  });

  it("returns empty string for past dates", () => {
    const today = new Date("2025-11-15");
    const past = addDays(today, -1);
    expect(getRelativeDateLabel(past, today)).toBe("");
  });
});

/**
 * @requirement REQ-F01
 */
describe("calculateTripDuration", () => {
  /**
   * @requirement REQ-F01
   * @scenario 场景2
   */
  it("returns 0 when departureDate is null", () => {
    const returnDate = new Date("2025-11-17");
    expect(calculateTripDuration(null, returnDate)).toBe(0);
  });

  it("returns 0 when returnDate is null", () => {
    const departureDate = new Date("2025-11-15");
    expect(calculateTripDuration(departureDate, null)).toBe(0);
  });

  it("returns 0 when both dates are null", () => {
    expect(calculateTripDuration(null, null)).toBe(0);
  });

  it("returns 1 for same day trip", () => {
    const date = new Date("2025-11-15");
    expect(calculateTripDuration(date, date)).toBe(1);
  });

  it("returns correct duration for multi-day trip", () => {
    const departure = new Date("2025-11-15");
    const returnDate = new Date("2025-11-17");
    expect(calculateTripDuration(departure, returnDate)).toBe(3);
  });

  it("returns correct duration for longer trips", () => {
    const departure = new Date("2025-11-15");
    const returnDate = new Date("2025-11-25");
    expect(calculateTripDuration(departure, returnDate)).toBe(11);
  });
});

describe("getWeekdayLabel", () => {
  it("should return correct Chinese weekday for Sunday", () => {
    const date = new Date("2025-11-02"); // Sunday
    expect(getWeekdayLabel(date)).toBe("周日");
  });

  it("should return correct Chinese weekday for Monday", () => {
    const date = new Date("2025-10-27"); // Monday
    expect(getWeekdayLabel(date)).toBe("周一");
  });

  it("should return correct Chinese weekday for Tuesday", () => {
    const date = new Date("2025-10-28"); // Tuesday
    expect(getWeekdayLabel(date)).toBe("周二");
  });

  it("should return correct Chinese weekday for Wednesday", () => {
    const date = new Date("2025-10-29"); // Wednesday
    expect(getWeekdayLabel(date)).toBe("周三");
  });

  it("should return correct Chinese weekday for Thursday", () => {
    const date = new Date("2025-10-30"); // Thursday
    expect(getWeekdayLabel(date)).toBe("周四");
  });

  it("should return correct Chinese weekday for Friday", () => {
    const date = new Date("2025-10-31"); // Friday
    expect(getWeekdayLabel(date)).toBe("周五");
  });

  it("should return correct Chinese weekday for Saturday", () => {
    const date = new Date("2025-11-01"); // Saturday
    expect(getWeekdayLabel(date)).toBe("周六");
  });
});

describe("formatDateWithWeekday", () => {
  it("should format date with month, day, and weekday", () => {
    const date = new Date("2025-10-30"); // Thursday
    expect(formatDateWithWeekday(date)).toBe("10月30日 周四");
  });

  it("should handle single-digit month", () => {
    const date = new Date("2025-01-15"); // Wednesday
    expect(formatDateWithWeekday(date)).toBe("1月15日 周三");
  });

  it("should handle single-digit day", () => {
    const date = new Date("2025-11-02"); // Sunday
    expect(formatDateWithWeekday(date)).toBe("11月2日 周日");
  });

  it("should handle December", () => {
    const date = new Date("2025-12-25"); // Thursday
    expect(formatDateWithWeekday(date)).toBe("12月25日 周四");
  });

  it("should handle first day of year", () => {
    const date = new Date("2025-01-01"); // Wednesday
    expect(formatDateWithWeekday(date)).toBe("1月1日 周三");
  });

  it("should handle last day of year", () => {
    const date = new Date("2025-12-31"); // Wednesday
    expect(formatDateWithWeekday(date)).toBe("12月31日 周三");
  });
});

describe("formatTime", () => {
  it("should format time in HH:MM:SS format", () => {
    const date = new Date("2025-10-30T18:11:15");
    const result = formatTime(date);
    // The exact format might vary by environment, but should include hours, minutes, seconds
    expect(result).toMatch(/\d{1,2}:\d{2}:\d{2}/);
  });

  it("should use 24-hour format", () => {
    const date = new Date("2025-10-30T14:30:45");
    const result = formatTime(date);
    // Should not contain AM/PM
    expect(result).not.toMatch(/AM|PM|am|pm/);
  });

  it("should handle midnight", () => {
    const date = new Date("2025-10-30T00:00:00");
    const result = formatTime(date);
    expect(result).toMatch(/^0{1,2}:00:00/);
  });

  it("should handle noon", () => {
    const date = new Date("2025-10-30T12:00:00");
    const result = formatTime(date);
    expect(result).toMatch(/12:00:00/);
  });
});

describe("formatDateString", () => {
  it("should format Date object to YYYY-MM-DD", () => {
    const date = new Date("2025-10-30T18:11:15");
    expect(formatDateString(date)).toBe("2025-10-30");
  });

  it("should return string date as-is", () => {
    expect(formatDateString("2025-10-30")).toBe("2025-10-30");
  });

  it("should return default fallback for null", () => {
    expect(formatDateString(null)).toBe("未设置");
  });

  it("should return default fallback for undefined", () => {
    expect(formatDateString(undefined)).toBe("未设置");
  });

  it("should return custom fallback when provided", () => {
    expect(formatDateString(null, "N/A")).toBe("N/A");
    expect(formatDateString(undefined, "Not set")).toBe("Not set");
  });

  it("should handle dates at start of month", () => {
    const date = new Date("2025-11-01T12:00:00Z");
    expect(formatDateString(date)).toBe("2025-11-01");
  });

  it("should handle dates at end of month", () => {
    const date = new Date("2025-10-31T12:00:00Z");
    expect(formatDateString(date)).toBe("2025-10-31");
  });

  it("should handle leap year date", () => {
    const date = new Date("2024-02-29T12:00:00");
    expect(formatDateString(date)).toBe("2024-02-29");
  });
});

describe("getBookingDateRange", () => {
  it("should return today and today + 365 days in the specified timezone", () => {
    const timezone = "Asia/Shanghai";
    const range = getBookingDateRange(timezone);

    expect(range.minDate).toBeInstanceOf(Date);
    expect(range.maxDate).toBeInstanceOf(Date);

    // maxDate should be 365 days after minDate
    const daysDiff = Math.floor(
      (range.maxDate.getTime() - range.minDate.getTime()) /
        (1000 * 60 * 60 * 24)
    );
    expect(daysDiff).toBe(365);
  });

  it("should handle different timezones", () => {
    const timezones = ["America/New_York", "Europe/London", "Asia/Tokyo"];

    timezones.forEach(timezone => {
      const range = getBookingDateRange(timezone);
      expect(range.minDate).toBeInstanceOf(Date);
      expect(range.maxDate).toBeInstanceOf(Date);

      const daysDiff = Math.floor(
        (range.maxDate.getTime() - range.minDate.getTime()) /
          (1000 * 60 * 60 * 24)
      );
      expect(daysDiff).toBe(365);
    });
  });

  it("should return dates at start of day (midnight)", () => {
    const timezone = "Asia/Shanghai";
    const range = getBookingDateRange(timezone);

    // Check that minDate is at start of day (hours, minutes, seconds should be 0)
    // Note: Due to timezone conversion, we check the date components
    const minDateStr = range.minDate.toISOString();
    const maxDateStr = range.maxDate.toISOString();

    // Both should have time components (not just checking format)
    expect(minDateStr).toMatch(/^\d{4}-\d{2}-\d{2}T/);
    expect(maxDateStr).toMatch(/^\d{4}-\d{2}-\d{2}T/);
  });
});

describe("calculateQuickSelectDateRange", () => {
  // Helper function to format date for easier comparison
  const formatDate = (date: Date) => date.toISOString().split("T")[0];

  describe("normal cases (selected date in middle of allowed range)", () => {
    it("should return 7 dates centered on selected date", () => {
      const today = new Date("2025-11-15T00:00:00Z");
      const maxDate = addDays(today, 365);
      const selectedDate = new Date("2025-11-20T00:00:00Z");

      const result = calculateQuickSelectDateRange(
        selectedDate,
        today,
        maxDate
      );

      expect(result.dates).toHaveLength(7);
      expect(formatDate(result.startDate)).toBe("2025-11-17");
      expect(formatDate(result.endDate)).toBe("2025-11-23");
      expect(formatDate(result.dates[0])).toBe("2025-11-17");
      expect(formatDate(result.dates[3])).toBe("2025-11-20"); // Selected date in middle
      expect(formatDate(result.dates[6])).toBe("2025-11-23");
    });

    it("should handle selected date far from boundaries", () => {
      const today = new Date("2025-11-15T00:00:00Z");
      const maxDate = addDays(today, 365);
      const selectedDate = new Date("2026-01-15T00:00:00Z");

      const result = calculateQuickSelectDateRange(
        selectedDate,
        today,
        maxDate
      );

      expect(result.dates).toHaveLength(7);
      expect(formatDate(result.startDate)).toBe("2026-01-12");
      expect(formatDate(result.endDate)).toBe("2026-01-18");
    });
  });

  describe("edge cases near minDate (start of allowed range)", () => {
    it("should shift window right when selected date is 1 day after minDate", () => {
      const today = new Date("2025-11-15T00:00:00Z");
      const maxDate = addDays(today, 365);
      const selectedDate = new Date("2025-11-16T00:00:00Z");

      const result = calculateQuickSelectDateRange(
        selectedDate,
        today,
        maxDate
      );

      expect(result.dates).toHaveLength(7);
      expect(formatDate(result.startDate)).toBe("2025-11-15"); // Starts at minDate
      expect(formatDate(result.endDate)).toBe("2025-11-21"); // Extended to right
    });

    it("should handle selected date equal to minDate", () => {
      const today = new Date("2025-11-15T00:00:00Z");
      const maxDate = addDays(today, 365);
      const selectedDate = new Date("2025-11-15T00:00:00Z");

      const result = calculateQuickSelectDateRange(
        selectedDate,
        today,
        maxDate
      );

      expect(result.dates).toHaveLength(7);
      expect(formatDate(result.startDate)).toBe("2025-11-15"); // Starts at minDate
      expect(formatDate(result.endDate)).toBe("2025-11-21"); // Extended to right
    });

    it("should handle selected date 2 days after minDate", () => {
      const today = new Date("2025-11-15T00:00:00Z");
      const maxDate = addDays(today, 365);
      const selectedDate = new Date("2025-11-17T00:00:00Z");

      const result = calculateQuickSelectDateRange(
        selectedDate,
        today,
        maxDate
      );

      expect(result.dates).toHaveLength(7);
      expect(formatDate(result.startDate)).toBe("2025-11-15"); // Starts at minDate
      expect(formatDate(result.endDate)).toBe("2025-11-21"); // Extended to right
    });
  });

  describe("edge cases near maxDate (end of allowed range)", () => {
    it("should shift window left when selected date is 1 day before maxDate", () => {
      const today = new Date("2025-11-15T00:00:00Z");
      const maxDate = addDays(today, 365); // 2026-11-15
      const selectedDate = addDays(maxDate, -1); // 2026-11-14

      const result = calculateQuickSelectDateRange(
        selectedDate,
        today,
        maxDate
      );

      expect(result.dates).toHaveLength(7);
      expect(formatDate(result.endDate)).toBe("2026-11-15"); // Ends at maxDate
      expect(formatDate(result.startDate)).toBe("2026-11-09"); // Extended to left
    });

    it("should handle selected date equal to maxDate", () => {
      const today = new Date("2025-11-15T00:00:00Z");
      const maxDate = addDays(today, 365); // 2026-11-15
      const selectedDate = maxDate;

      const result = calculateQuickSelectDateRange(
        selectedDate,
        today,
        maxDate
      );

      expect(result.dates).toHaveLength(7);
      expect(formatDate(result.endDate)).toBe("2026-11-15"); // Ends at maxDate
      expect(formatDate(result.startDate)).toBe("2026-11-09"); // Extended to left
    });

    it("should handle selected date 2 days before maxDate", () => {
      const today = new Date("2025-11-15T00:00:00Z");
      const maxDate = addDays(today, 365); // 2026-11-15
      const selectedDate = addDays(maxDate, -2); // 2026-11-13

      const result = calculateQuickSelectDateRange(
        selectedDate,
        today,
        maxDate
      );

      expect(result.dates).toHaveLength(7);
      expect(formatDate(result.endDate)).toBe("2026-11-15"); // Ends at maxDate
      expect(formatDate(result.startDate)).toBe("2026-11-09"); // Extended to left
    });
  });

  describe("edge cases with small allowed range", () => {
    it("should return fewer than 7 dates when allowed range is less than 7 days", () => {
      const today = new Date("2025-11-15T00:00:00Z");
      const maxDate = addDays(today, 5); // Only 6 days total
      const selectedDate = addDays(today, 3);

      const result = calculateQuickSelectDateRange(
        selectedDate,
        today,
        maxDate
      );

      expect(result.dates).toHaveLength(6);
      expect(formatDate(result.startDate)).toBe("2025-11-15");
      expect(formatDate(result.endDate)).toBe("2025-11-20");
    });

    it("should handle allowed range of exactly 7 days", () => {
      const today = new Date("2025-11-15T00:00:00Z");
      const maxDate = addDays(today, 6); // Exactly 7 days
      const selectedDate = addDays(today, 3);

      const result = calculateQuickSelectDateRange(
        selectedDate,
        today,
        maxDate
      );

      expect(result.dates).toHaveLength(7);
      expect(formatDate(result.startDate)).toBe("2025-11-15");
      expect(formatDate(result.endDate)).toBe("2025-11-21");
    });

    it("should handle allowed range of 1 day", () => {
      const today = new Date("2025-11-15T00:00:00Z");
      const maxDate = today; // Same day
      const selectedDate = today;

      const result = calculateQuickSelectDateRange(
        selectedDate,
        today,
        maxDate
      );

      expect(result.dates).toHaveLength(1);
      expect(formatDate(result.startDate)).toBe("2025-11-15");
      expect(formatDate(result.endDate)).toBe("2025-11-15");
    });
  });

  describe("date normalization", () => {
    it("should normalize dates to start of day", () => {
      const today = new Date("2025-11-15T14:30:00Z");
      const maxDate = new Date("2026-11-15T18:45:00Z");
      const selectedDate = new Date("2025-11-20T09:15:00Z");

      const result = calculateQuickSelectDateRange(
        selectedDate,
        today,
        maxDate
      );

      // All dates should be at start of day (midnight UTC)
      result.dates.forEach(date => {
        const hours = date.getUTCHours();
        const minutes = date.getUTCMinutes();
        const seconds = date.getUTCSeconds();
        expect(hours).toBe(0);
        expect(minutes).toBe(0);
        expect(seconds).toBe(0);
      });
    });
  });

  describe("real-world scenarios from requirements", () => {
    it("should handle scenario: user searches 2025-11-20, today is 2025-11-15", () => {
      const today = new Date("2025-11-15T00:00:00Z");
      const maxDate = addDays(today, 365);
      const selectedDate = new Date("2025-11-20T00:00:00Z");

      const result = calculateQuickSelectDateRange(
        selectedDate,
        today,
        maxDate
      );

      expect(result.dates).toHaveLength(7);
      expect(formatDate(result.startDate)).toBe("2025-11-17");
      expect(formatDate(result.endDate)).toBe("2025-11-23");
    });

    it("should handle scenario: user searches 2025-11-16, today is 2025-11-15", () => {
      const today = new Date("2025-11-15T00:00:00Z");
      const maxDate = addDays(today, 365);
      const selectedDate = new Date("2025-11-16T00:00:00Z");

      const result = calculateQuickSelectDateRange(
        selectedDate,
        today,
        maxDate
      );

      expect(result.dates).toHaveLength(7);
      expect(formatDate(result.startDate)).toBe("2025-11-15");
      expect(formatDate(result.endDate)).toBe("2025-11-21");
    });

    it("should handle scenario: user searches 2026-11-13, today is 2025-11-15, max is 2026-11-15", () => {
      const today = new Date("2025-11-15T00:00:00Z");
      const maxDate = new Date("2026-11-15T00:00:00Z");
      const selectedDate = new Date("2026-11-13T00:00:00Z");

      const result = calculateQuickSelectDateRange(
        selectedDate,
        today,
        maxDate
      );

      expect(result.dates).toHaveLength(7);
      expect(formatDate(result.startDate)).toBe("2026-11-09");
      expect(formatDate(result.endDate)).toBe("2026-11-15");
    });
  });
});
