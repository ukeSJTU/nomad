import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { DateDisplay } from "./date-display";

const mockGetRelativeDateLabel = (date: Date, today: Date): string => {
  const daysDiff = Math.floor(
    (date.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  );
  if (daysDiff === 0) return "今天";
  if (daysDiff === 1) return "明天";
  if (daysDiff === 2) return "后天";
  return "";
};

const mockGetWeekdayLabel = (date: Date): string => {
  const weekdays = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
  return weekdays[date.getDay()];
};

describe("DateDisplay", () => {
  const today = new Date("2025-11-20");

  it("renders placeholder when date is null", () => {
    render(
      <DateDisplay
        date={null}
        today={today}
        getRelativeDateLabel={mockGetRelativeDateLabel}
        getWeekdayLabel={mockGetWeekdayLabel}
      />
    );

    expect(screen.getByText("选择日期")).toBeInTheDocument();
  });

  it("renders custom placeholder", () => {
    render(
      <DateDisplay
        date={null}
        today={today}
        placeholder="请选择"
        getRelativeDateLabel={mockGetRelativeDateLabel}
        getWeekdayLabel={mockGetWeekdayLabel}
      />
    );

    expect(screen.getByText("请选择")).toBeInTheDocument();
  });

  it("renders date with relative label (today)", () => {
    render(
      <DateDisplay
        date={today}
        today={today}
        getRelativeDateLabel={mockGetRelativeDateLabel}
        getWeekdayLabel={mockGetWeekdayLabel}
      />
    );

    expect(screen.getByText("2025-11-20")).toBeInTheDocument();
    expect(screen.getByText("今天")).toBeInTheDocument();
  });

  it("renders date with relative label (tomorrow)", () => {
    const tomorrow = new Date("2025-11-21");
    render(
      <DateDisplay
        date={tomorrow}
        today={today}
        getRelativeDateLabel={mockGetRelativeDateLabel}
        getWeekdayLabel={mockGetWeekdayLabel}
      />
    );

    expect(screen.getByText("2025-11-21")).toBeInTheDocument();
    expect(screen.getByText("明天")).toBeInTheDocument();
  });

  it("renders date with weekday when no relative label", () => {
    const futureDate = new Date("2025-11-25"); // Tuesday
    render(
      <DateDisplay
        date={futureDate}
        today={today}
        getRelativeDateLabel={mockGetRelativeDateLabel}
        getWeekdayLabel={mockGetWeekdayLabel}
      />
    );

    expect(screen.getByText("2025-11-25")).toBeInTheDocument();
    expect(screen.getByText("周二")).toBeInTheDocument();
  });

  it("renders with right alignment", () => {
    render(
      <DateDisplay
        date={today}
        today={today}
        align="right"
        getRelativeDateLabel={mockGetRelativeDateLabel}
        getWeekdayLabel={mockGetWeekdayLabel}
      />
    );

    const elements = screen
      .getAllByText(/2025-11-20|今天/)
      .map(el => el.textContent);
    expect(elements).toContain("今天");
    expect(elements).toContain("2025-11-20");
  });
});
