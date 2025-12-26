import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { addDays, format } from "date-fns";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { DateDisplay } from "./date-display";
import { DateSelector } from "./date-selector";

const getTestDates = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return {
    today,
    fiveDaysLater: addDays(today, 5),
    sixDaysLater: addDays(today, 6),
    sevenDaysLater: addDays(today, 7),
    tenDaysLater: addDays(today, 10),
    elevenDaysLater: addDays(today, 11),
    twelveDaysLater: addDays(today, 12),
    thirteenDaysLater: addDays(today, 13),
  };
};

describe("DateSelector", () => {
  const baseDates = getTestDates();

  const defaultProps = {
    tripType: "one-way" as const,
    departureDate: null,
    returnDate: null,
    onDepartureDateChange: vi.fn(),
    onReturnDateChange: vi.fn(),
    minDate: baseDates.today,
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
  });

  describe("User interaction scenarios - Date field selection", () => {
    /**
     * Helper function to click a date button in the calendar
     * Uses relative day number to work regardless of when tests are run
     */
    const clickDateButton = async (
      user: ReturnType<typeof userEvent.setup>,
      targetDate: Date
    ) => {
      const targetDay = format(targetDate, "d");
      const dateButtons = screen.getAllByRole("button");
      const targetButton = dateButtons.find(
        btn =>
          btn.textContent === targetDay && !(btn as HTMLButtonElement).disabled
      );
      if (!targetButton) {
        throw new Error(`Could not find date button for day ${targetDay}`);
      }
      await user.click(targetButton);
    };

    /**
     * Test Results Summary (Before Fix):
     * ====================================
     *
     * Scenario 1 (First click departure): FAILED
     *   - Expected: Update departure to selected date
     *   - Actual: Updated departure to original value
     *   - Issue: onClick handler not triggered, date not updated correctly
     *
     * Scenario 2 (First click return): FAILED
     *   - Expected: Update return to selected date
     *   - Actual: Updated return to wrong date/time
     *   - Issue: Timezone or date calculation issue
     *
     * Scenario 3 (Switch from return to departure): FAILED
     *   - Expected: Update departure to selected date
     *   - Actual: Updated departure to original value
     *   - Issue: activeField not updated when clicking departure after return
     *
     * Scenario 4 (Switch from departure to return): FAILED
     *   - Expected: Update return to selected date
     *   - Actual: Updated return to wrong date/time
     *   - Issue: activeField not updated correctly
     *
     * Scenario 5 (Multiple departure modifications): FAILED
     *   - Expected: Each update uses the newly selected date
     *   - Actual: Both updates returned original value
     *   - Issue: Persistent activeField issue
     *
     * Scenario 6 (Multiple return modifications): FAILED
     *   - Expected: Each update uses the newly selected date
     *   - Actual: Both updates returned wrong dates
     *   - Issue: Persistent activeField issue
     *
     * Scenario 7 (Alternating clicks): FAILED
     *   - Expected: Correctly alternate between departure and return updates
     *   - Actual: All updates returned wrong dates
     *   - Issue: activeField never updates correctly on user clicks
     *
     * Root Cause:
     * -----------
     * The DropdownMenuTrigger component with asChild prop prevents the onClick
     * handlers (onDepartureClick, onReturnClick) from being triggered. This means
     * activeField is never updated, causing all date selections to update the
     * wrong field or use stale date values.
     *
     * Note on Test Design:
     * --------------------
     * These tests use relative dates (e.g., "5 days from now") instead of
     * hardcoded dates (e.g., "2025-11-20"). This ensures tests remain valid
     * regardless of when they are run. For example, a test run on 2025-12-01
     * can still select dates in the future, whereas hardcoded November dates
     * would fail as they would be in the past.
     */

    // Scenario 1: First time user clicks departure date
    it("should update departure date when user clicks departure field for the first time", async () => {
      const user = userEvent.setup();
      const dates = getTestDates();

      // Setup: departure is 5 days from now, return is 10 days from now
      const initialDeparture = dates.fiveDaysLater;
      const initialReturn = dates.tenDaysLater;
      const onDepartureDateChange = vi.fn();
      const onReturnDateChange = vi.fn();

      render(
        <DateSelector
          {...defaultProps}
          tripType="round-trip"
          departureDate={initialDeparture}
          returnDate={initialReturn}
          onDepartureDateChange={onDepartureDateChange}
          onReturnDateChange={onReturnDateChange}
          minDate={dates.today}
        />
      );

      // User clicks departure date field
      const departureDateField = screen.getByText("出发日期").closest("div");
      await user.click(departureDateField!);

      // User selects a new date (7 days from now)
      const targetDate = dates.sevenDaysLater;
      await clickDateButton(user, targetDate);

      // Expected: departure date should be updated to selected date
      expect(onDepartureDateChange).toHaveBeenCalledWith(targetDate);
      // Return date should not change
      expect(onReturnDateChange).not.toHaveBeenCalled();
    });

    // Scenario 2: First time user clicks return date
    it("should update return date when user clicks return field for the first time", async () => {
      const dates = getTestDates();
      const user = userEvent.setup();
      const initialDeparture = dates.fiveDaysLater;
      const initialReturn = dates.tenDaysLater;
      const onDepartureDateChange = vi.fn();
      const onReturnDateChange = vi.fn();

      render(
        <DateSelector
          {...defaultProps}
          tripType="round-trip"
          departureDate={initialDeparture}
          returnDate={initialReturn}
          onDepartureDateChange={onDepartureDateChange}
          onReturnDateChange={onReturnDateChange}
        />
      );

      // User clicks return date field
      const returnDateField = screen.getByText("返回日期").closest("div");
      await user.click(returnDateField!);

      // User selects a new date
      await clickDateButton(user, dates.twelveDaysLater);

      // Expected: return date should be updated
      expect(onReturnDateChange).toHaveBeenCalledWith(dates.twelveDaysLater);
      // Departure date should not change
      expect(onDepartureDateChange).not.toHaveBeenCalled();
    });

    // Scenario 3: User switches from return to departure
    it("should update departure when user switches from return field to departure field", async () => {
      const dates = getTestDates();
      const user = userEvent.setup();
      const initialDeparture = dates.fiveDaysLater;
      const initialReturn = dates.tenDaysLater;
      const onDepartureDateChange = vi.fn();
      const onReturnDateChange = vi.fn();

      render(
        <DateSelector
          {...defaultProps}
          tripType="round-trip"
          departureDate={initialDeparture}
          returnDate={initialReturn}
          onDepartureDateChange={onDepartureDateChange}
          onReturnDateChange={onReturnDateChange}
        />
      );

      // Step 1: User clicks return date field first
      const returnDateField = screen.getByText("返回日期").closest("div");
      await user.click(returnDateField!);

      // Step 2: User closes calendar without selecting
      await user.keyboard("{Escape}");

      vi.clearAllMocks();

      // Step 3: User changes mind and clicks departure date field
      const departureDateField = screen.getByText("出发日期").closest("div");
      await user.click(departureDateField!);

      // Step 4: User selects a new departure date
      await clickDateButton(user, dates.sevenDaysLater);

      // Expected: departure date should be updated
      const actualDeparture = onDepartureDateChange.mock.calls[0]?.[0];
      expect(actualDeparture).toEqual(dates.sevenDaysLater);
      // Return date should not be updated
      expect(onReturnDateChange).not.toHaveBeenCalled();
    });

    // Scenario 4: User switches from departure to return
    it("should update return when user switches from departure field to return field", async () => {
      const dates = getTestDates();
      const user = userEvent.setup();
      const initialDeparture = dates.fiveDaysLater;
      const initialReturn = dates.tenDaysLater;
      const onDepartureDateChange = vi.fn();
      const onReturnDateChange = vi.fn();

      render(
        <DateSelector
          {...defaultProps}
          tripType="round-trip"
          departureDate={initialDeparture}
          returnDate={initialReturn}
          onDepartureDateChange={onDepartureDateChange}
          onReturnDateChange={onReturnDateChange}
        />
      );

      // Step 1: User clicks departure date field first
      const departureDateField = screen.getByText("出发日期").closest("div");
      await user.click(departureDateField!);

      // Step 2: User closes calendar without selecting
      await user.keyboard("{Escape}");

      vi.clearAllMocks();

      // Step 3: User changes mind and clicks return date field
      const returnDateField = screen.getByText("返回日期").closest("div");
      await user.click(returnDateField!);

      // Step 4: User selects a new return date
      await clickDateButton(user, dates.twelveDaysLater);

      // Expected: return date should be updated
      const actualReturn = onReturnDateChange.mock.calls[0]?.[0];
      expect(actualReturn).toEqual(dates.twelveDaysLater);
      // Departure date should not be updated
      expect(onDepartureDateChange).not.toHaveBeenCalled();
    });

    // Scenario 5: User modifies departure multiple times
    it("should update departure correctly when user modifies it multiple times", async () => {
      const dates = getTestDates();
      const user = userEvent.setup();
      const initialDeparture = dates.fiveDaysLater;
      const initialReturn = dates.tenDaysLater;
      const onDepartureDateChange = vi.fn();
      const onReturnDateChange = vi.fn();

      render(
        <DateSelector
          {...defaultProps}
          tripType="round-trip"
          departureDate={initialDeparture}
          returnDate={initialReturn}
          onDepartureDateChange={onDepartureDateChange}
          onReturnDateChange={onReturnDateChange}
        />
      );

      // First modification
      let departureDateField = screen.getByText("出发日期").closest("div");
      await user.click(departureDateField!);
      await clickDateButton(user, dates.sixDaysLater);

      expect(onDepartureDateChange).toHaveBeenCalledWith(dates.sixDaysLater);

      vi.clearAllMocks();

      // Second modification
      departureDateField = screen.getByText("出发日期").closest("div");
      await user.click(departureDateField!);
      await clickDateButton(user, dates.sevenDaysLater);

      expect(onDepartureDateChange).toHaveBeenCalledWith(dates.sevenDaysLater);
      // Return date should never be touched
      expect(onReturnDateChange).not.toHaveBeenCalled();
    });

    // Scenario 6: User modifies return multiple times
    it("should update return correctly when user modifies it multiple times", async () => {
      const dates = getTestDates();
      const user = userEvent.setup();
      const initialDeparture = dates.fiveDaysLater;
      const initialReturn = dates.tenDaysLater;
      const onDepartureDateChange = vi.fn();
      const onReturnDateChange = vi.fn();

      render(
        <DateSelector
          {...defaultProps}
          tripType="round-trip"
          departureDate={initialDeparture}
          returnDate={initialReturn}
          onDepartureDateChange={onDepartureDateChange}
          onReturnDateChange={onReturnDateChange}
        />
      );

      // First modification
      let returnDateField = screen.getByText("返回日期").closest("div");
      await user.click(returnDateField!);
      await clickDateButton(user, dates.elevenDaysLater);

      expect(onReturnDateChange).toHaveBeenCalledWith(dates.elevenDaysLater);

      vi.clearAllMocks();

      // Second modification
      returnDateField = screen.getByText("返回日期").closest("div");
      await user.click(returnDateField!);
      await clickDateButton(user, dates.thirteenDaysLater);

      expect(onReturnDateChange).toHaveBeenCalledWith(dates.thirteenDaysLater);
      // Departure date should never be touched
      expect(onDepartureDateChange).not.toHaveBeenCalled();
    });

    // Scenario 7: Alternating between departure and return fields
    it("should handle alternating clicks between departure and return fields", async () => {
      const dates = getTestDates();
      const user = userEvent.setup();
      const initialDeparture = dates.fiveDaysLater;
      const initialReturn = dates.tenDaysLater;
      const onDepartureDateChange = vi.fn();
      const onReturnDateChange = vi.fn();

      render(
        <DateSelector
          {...defaultProps}
          tripType="round-trip"
          departureDate={initialDeparture}
          returnDate={initialReturn}
          onDepartureDateChange={onDepartureDateChange}
          onReturnDateChange={onReturnDateChange}
        />
      );

      // Click sequence: Departure -> Return -> Departure -> Return

      // 1st: Click departure
      let departureDateField = screen.getByText("出发日期").closest("div");
      await user.click(departureDateField!);
      await clickDateButton(user, dates.sixDaysLater);
      expect(onDepartureDateChange).toHaveBeenCalledWith(dates.sixDaysLater);

      vi.clearAllMocks();

      // 2nd: Click return
      let returnDateField = screen.getByText("返回日期").closest("div");
      await user.click(returnDateField!);
      await clickDateButton(user, dates.elevenDaysLater);
      expect(onReturnDateChange).toHaveBeenCalledWith(dates.elevenDaysLater);
      expect(onDepartureDateChange).not.toHaveBeenCalled();

      vi.clearAllMocks();

      // 3rd: Click departure again
      departureDateField = screen.getByText("出发日期").closest("div");
      await user.click(departureDateField!);
      await clickDateButton(user, dates.sevenDaysLater);
      expect(onDepartureDateChange).toHaveBeenCalledWith(dates.sevenDaysLater);
      expect(onReturnDateChange).not.toHaveBeenCalled();

      vi.clearAllMocks();

      // 4th: Click return again
      returnDateField = screen.getByText("返回日期").closest("div");
      await user.click(returnDateField!);
      await clickDateButton(user, dates.twelveDaysLater);
      expect(onReturnDateChange).toHaveBeenCalledWith(dates.twelveDaysLater);
      expect(onDepartureDateChange).not.toHaveBeenCalled();
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
