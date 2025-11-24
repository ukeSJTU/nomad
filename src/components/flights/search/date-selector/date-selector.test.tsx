import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { addDays, format } from "date-fns";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { DateDisplay } from "./date-display";
import { DateSelector } from "./date-selector";

describe("DateSelector", () => {
  const today = new Date("2025-11-15");
  today.setHours(0, 0, 0, 0);

  const defaultProps = {
    tripType: "one-way" as const,
    departureDate: null,
    returnDate: null,
    onDepartureDateChange: vi.fn(),
    onReturnDateChange: vi.fn(),
    minDate: today,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("One-way mode", () => {
    it("renders departure date selector", () => {
      render(<DateSelector {...defaultProps} />);

      expect(screen.getByText("出发日期")).toBeInTheDocument();
      expect(screen.getByText("选择日期")).toBeInTheDocument();
    });

    it("renders add return button", () => {
      render(<DateSelector {...defaultProps} />);

      expect(screen.getByText("+ 添加返程")).toBeInTheDocument();
    });

    it("displays selected departure date", () => {
      const departureDate = new Date("2025-11-20");

      render(<DateSelector {...defaultProps} departureDate={departureDate} />);

      expect(screen.getByText("2025-11-20")).toBeInTheDocument();
    });

    it("calls onTripTypeChange when add return is clicked", async () => {
      const user = userEvent.setup();
      const onTripTypeChange = vi.fn();

      render(
        <DateSelector {...defaultProps} onTripTypeChange={onTripTypeChange} />
      );

      await user.click(screen.getByText("+ 添加返程"));

      expect(onTripTypeChange).toHaveBeenCalledWith("round-trip");
    });
  });

  describe("Round-trip mode", () => {
    it("renders both departure and return date selectors", () => {
      render(<DateSelector {...defaultProps} tripType="round-trip" />);

      expect(screen.getByText("出发日期")).toBeInTheDocument();
      expect(screen.getByText("返回日期")).toBeInTheDocument();
    });

    it("displays both selected dates", () => {
      const departureDate = new Date("2025-11-20");
      const returnDate = new Date("2025-11-25");

      render(
        <DateSelector
          {...defaultProps}
          tripType="round-trip"
          departureDate={departureDate}
          returnDate={returnDate}
        />
      );

      expect(screen.getByText("2025-11-20")).toBeInTheDocument();
      expect(screen.getByText("2025-11-25")).toBeInTheDocument();
    });

    it("displays trip duration badge", () => {
      const departureDate = new Date("2025-11-20");
      const returnDate = new Date("2025-11-25");

      render(
        <DateSelector
          {...defaultProps}
          tripType="round-trip"
          departureDate={departureDate}
          returnDate={returnDate}
        />
      );

      expect(screen.getByText("6天")).toBeInTheDocument();
    });

    it("does not display badge for single day trip", () => {
      const date = new Date("2025-11-20");

      render(
        <DateSelector
          {...defaultProps}
          tripType="round-trip"
          departureDate={date}
          returnDate={date}
        />
      );

      expect(screen.queryByText("1天")).not.toBeInTheDocument();
    });

    it("updates active field to departure and calls departure callback", async () => {
      const today = new Date("2025-11-15");
      today.setHours(0, 0, 0, 0);

      const user = userEvent.setup();

      const onDepartureDateChange = vi.fn();
      const onReturnDateChange = vi.fn();

      const departureDate = addDays(today, 5);
      const returnDate = addDays(today, 10);

      const { rerender } = render(
        <DateSelector
          tripType="round-trip"
          departureDate={departureDate}
          returnDate={returnDate}
          onDepartureDateChange={onDepartureDateChange}
          onReturnDateChange={onReturnDateChange}
          minDate={today}
        />
      );

      const departureField = screen.getByText("出发日期").closest("div");
      await user.click(departureField!);

      const targetDate = addDays(today, 7);
      const targetDay = format(targetDate, "d");
      const dateButtons = screen.getAllByRole("button");
      const targetButton = dateButtons.find(
        btn => btn.textContent === targetDay
      );
      await user.click(targetButton!);

      expect(onDepartureDateChange).toHaveBeenCalledWith(targetDate);
      expect(onReturnDateChange).not.toHaveBeenCalled();
      rerender(
        <DateSelector
          tripType="round-trip"
          departureDate={targetDate}
          returnDate={returnDate}
          onDepartureDateChange={onDepartureDateChange}
          onReturnDateChange={onReturnDateChange}
          minDate={today}
        />
      );
      expect(
        screen.getByText(format(targetDate, "yyyy-MM-dd"))
      ).toBeInTheDocument();
    });

    it("updates active field to return and calls return callback", async () => {
      const today = new Date("2025-11-15");
      today.setHours(0, 0, 0, 0);

      const user = userEvent.setup();

      const onDepartureDateChange = vi.fn();
      const onReturnDateChange = vi.fn();

      const departureDate = addDays(today, 5);
      const returnDate = addDays(today, 10);

      const { rerender: rerender2 } = render(
        <DateSelector
          tripType="round-trip"
          departureDate={departureDate}
          returnDate={returnDate}
          onDepartureDateChange={onDepartureDateChange}
          onReturnDateChange={onReturnDateChange}
          minDate={today}
        />
      );

      const returnField = screen.getByText("返回日期").closest("div");
      await user.click(returnField!);

      const targetDate = addDays(today, 12);
      const targetDay = format(targetDate, "d");
      const dateButtons = screen.getAllByRole("button");
      const targetButton = dateButtons.find(
        btn => btn.textContent === targetDay
      );
      await user.click(targetButton!);

      expect(onReturnDateChange).toHaveBeenCalledWith(targetDate);
      expect(onDepartureDateChange).not.toHaveBeenCalled();
      rerender2(
        <DateSelector
          tripType="round-trip"
          departureDate={departureDate}
          returnDate={targetDate}
          onDepartureDateChange={onDepartureDateChange}
          onReturnDateChange={onReturnDateChange}
          minDate={today}
        />
      );
      expect(
        screen.getByText(format(targetDate, "yyyy-MM-dd"))
      ).toBeInTheDocument();
    });

    it("enforces min/max date boundaries", async () => {
      const today = new Date("2025-11-15");
      today.setHours(0, 0, 0, 0);

      const user = userEvent.setup();

      const onDepartureDateChange = vi.fn();
      const onReturnDateChange = vi.fn();

      const departureDate = today;

      render(
        <DateSelector
          tripType="round-trip"
          departureDate={departureDate}
          returnDate={null}
          onDepartureDateChange={onDepartureDateChange}
          onReturnDateChange={onReturnDateChange}
          minDate={today}
          maxDaysInFuture={2}
        />
      );

      const departureField = screen.getByText("出发日期").closest("div");
      await user.click(departureField!);

      const beforeMin = addDays(today, -1);
      const afterMax = addDays(today, 3);
      const beforeMinDay = format(beforeMin, "d");
      const afterMaxDay = format(afterMax, "d");

      const dateButtons = screen.getAllByRole("button");
      const beforeMinButton = dateButtons.find(
        btn => btn.textContent === beforeMinDay
      );
      const afterMaxButton = dateButtons.find(
        btn => btn.textContent === afterMaxDay
      );

      expect((beforeMinButton as HTMLButtonElement).disabled).toBe(true);
      expect((afterMaxButton as HTMLButtonElement).disabled).toBe(true);
    });

    it("disables selecting return date earlier than departure", async () => {
      const base = new Date("2025-11-15");
      base.setHours(0, 0, 0, 0);

      const user = userEvent.setup();

      const onDepartureDateChange = vi.fn();
      const onReturnDateChange = vi.fn();

      const departureDate = addDays(base, 10);

      render(
        <DateSelector
          tripType="round-trip"
          departureDate={departureDate}
          returnDate={null}
          onDepartureDateChange={onDepartureDateChange}
          onReturnDateChange={onReturnDateChange}
          minDate={base}
        />
      );

      const returnField = screen.getByText("返回日期").closest("div");
      await user.click(returnField!);

      const earlier = addDays(base, 5);
      const earlierDay = format(earlier, "d");
      const dateButtons = screen.getAllByRole("button");
      const earlierButton = dateButtons.find(
        btn => btn.textContent === earlierDay
      )!;

      expect((earlierButton as HTMLButtonElement).disabled).toBe(true);
    });
  });
});

describe("DateDisplay", () => {
  const today = new Date("2025-11-15");
  today.setHours(0, 0, 0, 0);

  it("renders placeholder when date is null", () => {
    render(<DateDisplay date={null} today={today} />);

    expect(screen.getByText("选择日期")).toBeInTheDocument();
  });

  it("renders custom placeholder", () => {
    render(<DateDisplay date={null} today={today} placeholder="请选择" />);

    expect(screen.getByText("请选择")).toBeInTheDocument();
  });

  it("renders date in correct format", () => {
    const date = new Date("2025-11-20");

    render(<DateDisplay date={date} today={today} />);

    expect(screen.getByText("2025-11-20")).toBeInTheDocument();
  });

  it("shows 今天 for today's date", () => {
    render(<DateDisplay date={today} today={today} />);

    expect(screen.getByText("今天")).toBeInTheDocument();
  });

  it("shows 明天 for tomorrow's date", () => {
    const tomorrow = addDays(today, 1);

    render(<DateDisplay date={tomorrow} today={today} />);

    expect(screen.getByText("明天")).toBeInTheDocument();
  });

  it("shows 后天 for day after tomorrow", () => {
    const dayAfter = addDays(today, 2);

    render(<DateDisplay date={dayAfter} today={today} />);

    expect(screen.getByText("后天")).toBeInTheDocument();
  });

  it("shows weekday for dates more than 2 days away", () => {
    const date = new Date("2025-11-20"); // Thursday

    render(<DateDisplay date={date} today={today} />);

    expect(screen.getByText("周四")).toBeInTheDocument();
  });

  it("renders in right-aligned format when align is right", () => {
    const date = new Date("2025-11-20");

    const { container } = render(
      <DateDisplay date={date} today={today} align="right" />
    );

    // The date should be the second element in right-aligned mode
    const dateText = container.querySelector(".text-base.font-medium");
    expect(dateText).toHaveTextContent("2025-11-20");
  });
});
