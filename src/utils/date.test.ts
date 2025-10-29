import { describe, expect, it } from "vitest";

import {
  formatDateString,
  formatDateWithWeekday,
  formatTime,
  getWeekdayLabel,
} from "./date";

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
