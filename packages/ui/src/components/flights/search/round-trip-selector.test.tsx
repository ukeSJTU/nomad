import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { RoundTripSelector } from "./round-trip-selector";

const mockGetRelativeDateLabel = () => "";
const mockGetWeekdayLabel = () => "周一";

describe("RoundTripSelector", () => {
  const today = new Date("2025-11-20");
  const departureDate = new Date("2025-11-25");
  const returnDate = new Date("2025-11-30");

  const defaultProps = {
    departureDate: null,
    returnDate: null,
    today,
    tripDuration: 0,
    calendarOpen: false,
    onCalendarOpenChange: vi.fn(),
    activeField: "departure" as const,
    onDepartureClick: vi.fn(),
    onReturnClick: vi.fn(),
    onDateSelect: vi.fn(),
    getDisabledDates: vi.fn(() => false),
    getRelativeDateLabel: mockGetRelativeDateLabel,
    getWeekdayLabel: mockGetWeekdayLabel,
  };

  it("renders both departure and return date sections", () => {
    render(<RoundTripSelector {...defaultProps} />);

    expect(screen.getByText("出发日期")).toBeInTheDocument();
    expect(screen.getByText("返回日期")).toBeInTheDocument();
  });

  it("displays selected dates", () => {
    render(
      <RoundTripSelector
        {...defaultProps}
        departureDate={departureDate}
        returnDate={returnDate}
      />
    );

    expect(screen.getByText("2025-11-25")).toBeInTheDocument();
    expect(screen.getByText("2025-11-30")).toBeInTheDocument();
  });

  it("displays trip duration badge when duration > 1", () => {
    render(
      <RoundTripSelector
        {...defaultProps}
        departureDate={departureDate}
        returnDate={returnDate}
        tripDuration={6}
      />
    );

    expect(screen.getByText("6天")).toBeInTheDocument();
  });

  it("does not display badge for single day trip", () => {
    render(
      <RoundTripSelector
        {...defaultProps}
        departureDate={departureDate}
        returnDate={departureDate}
        tripDuration={1}
      />
    );

    expect(screen.queryByText("1天")).not.toBeInTheDocument();
  });

  it("calls onDepartureClick when departure section is clicked", async () => {
    const user = userEvent.setup();
    const onDepartureClick = vi.fn();

    render(
      <RoundTripSelector
        {...defaultProps}
        onDepartureClick={onDepartureClick}
        departureDate={departureDate}
      />
    );

    const departureSection = screen.getByText("出发日期").closest("div");
    if (departureSection) {
      await user.click(departureSection);
    }

    expect(onDepartureClick).toHaveBeenCalled();
  });

  it("calls onReturnClick when return section is clicked", async () => {
    const user = userEvent.setup();
    const onReturnClick = vi.fn();

    render(
      <RoundTripSelector
        {...defaultProps}
        onReturnClick={onReturnClick}
        returnDate={returnDate}
      />
    );

    const returnSection = screen.getByText("返回日期").closest("div");
    if (returnSection) {
      await user.click(returnSection);
    }

    expect(onReturnClick).toHaveBeenCalled();
  });

  it("calls onCalendarOpenChange when open state changes", async () => {
    const user = userEvent.setup();
    const onCalendarOpenChange = vi.fn();

    render(
      <RoundTripSelector
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
