import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { OneWaySelector } from "./one-way-selector";

const mockGetRelativeDateLabel = () => "";
const mockGetWeekdayLabel = () => "周一";

describe("OneWaySelector", () => {
  const today = new Date("2025-11-20");
  const departureDate = new Date("2025-11-25");

  const defaultProps = {
    departureDate: null,
    today,
    calendarOpen: false,
    onCalendarOpenChange: vi.fn(),
    onAddReturnDate: vi.fn(),
    onDateSelect: vi.fn(),
    getDisabledDates: vi.fn(() => false),
    getRelativeDateLabel: mockGetRelativeDateLabel,
    getWeekdayLabel: mockGetWeekdayLabel,
  };

  it("renders departure date section", () => {
    render(<OneWaySelector {...defaultProps} />);

    expect(screen.getByText("出发日期")).toBeInTheDocument();
    expect(screen.getByText("选择日期")).toBeInTheDocument();
  });

  it("renders add return button", () => {
    render(<OneWaySelector {...defaultProps} />);

    expect(screen.getByText("+ 添加返程")).toBeInTheDocument();
  });

  it("displays selected departure date", () => {
    render(<OneWaySelector {...defaultProps} departureDate={departureDate} />);

    expect(screen.getByText("2025-11-25")).toBeInTheDocument();
  });

  it("calls onAddReturnDate when button is clicked", async () => {
    const user = userEvent.setup();
    const onAddReturnDate = vi.fn();

    render(
      <OneWaySelector {...defaultProps} onAddReturnDate={onAddReturnDate} />
    );

    await user.click(screen.getByText("+ 添加返程"));

    expect(onAddReturnDate).toHaveBeenCalledTimes(1);
  });

  it("calls onCalendarOpenChange when open state changes", async () => {
    const user = userEvent.setup();
    const onCalendarOpenChange = vi.fn();

    render(
      <OneWaySelector
        {...defaultProps}
        onCalendarOpenChange={onCalendarOpenChange}
        departureDate={departureDate}
      />
    );

    const trigger = screen.getByText("出发日期").closest("div");
    if (trigger) {
      await user.click(trigger);
    }

    expect(onCalendarOpenChange).toHaveBeenCalled();
  });
});
