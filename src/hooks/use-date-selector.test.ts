import { act, renderHook } from "@testing-library/react";
import { addDays } from "date-fns";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { useDateSelector } from "./use-date-selector";

describe("useDateSelector", () => {
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

  describe("initial state", () => {
    it("returns correct initial state", () => {
      const { result } = renderHook(() => useDateSelector(defaultProps));

      expect(result.current.calendarOpen).toBe(false);
      expect(result.current.activeField).toBe("departure");
      expect(result.current.tripDuration).toBe(0);
    });

    it("calculates tripDuration correctly", () => {
      const departureDate = new Date("2025-11-15");
      const returnDate = new Date("2025-11-17");

      const { result } = renderHook(() =>
        useDateSelector({
          ...defaultProps,
          departureDate,
          returnDate,
        })
      );

      expect(result.current.tripDuration).toBe(3);
    });
  });

  describe("handleDepartureClick", () => {
    it("sets activeField to departure and opens calendar", () => {
      const { result } = renderHook(() => useDateSelector(defaultProps));

      act(() => {
        result.current.handleDepartureClick();
      });

      expect(result.current.activeField).toBe("departure");
      expect(result.current.calendarOpen).toBe(true);
    });
  });

  describe("handleReturnClick", () => {
    it("sets activeField to return and opens calendar", () => {
      const { result } = renderHook(() => useDateSelector(defaultProps));

      act(() => {
        result.current.handleReturnClick();
      });

      expect(result.current.activeField).toBe("return");
      expect(result.current.calendarOpen).toBe(true);
    });
  });

  describe("handleAddReturnDate", () => {
    it("calls onTripTypeChange with round-trip", () => {
      const onTripTypeChange = vi.fn();
      const { result } = renderHook(() =>
        useDateSelector({
          ...defaultProps,
          onTripTypeChange,
        })
      );

      act(() => {
        result.current.handleAddReturnDate();
      });

      expect(onTripTypeChange).toHaveBeenCalledWith("round-trip");
      expect(result.current.activeField).toBe("return");
      expect(result.current.calendarOpen).toBe(true);
    });
  });

  describe("handleDateSelect - one-way", () => {
    it("calls onDepartureDateChange when departure field is active", () => {
      const onDepartureDateChange = vi.fn();
      const { result } = renderHook(() =>
        useDateSelector({
          ...defaultProps,
          onDepartureDateChange,
        })
      );

      const selectedDate = new Date("2025-11-20");

      act(() => {
        result.current.handleDepartureClick();
      });

      act(() => {
        result.current.handleDateSelect(selectedDate);
      });

      expect(onDepartureDateChange).toHaveBeenCalledWith(selectedDate);
      expect(result.current.calendarOpen).toBe(false);
    });

    it("calls onReturnDateChange when return field is active", () => {
      const onReturnDateChange = vi.fn();
      const { result } = renderHook(() =>
        useDateSelector({
          ...defaultProps,
          onReturnDateChange,
        })
      );

      const selectedDate = new Date("2025-11-20");

      act(() => {
        result.current.handleReturnClick();
      });

      act(() => {
        result.current.handleDateSelect(selectedDate);
      });

      expect(onReturnDateChange).toHaveBeenCalledWith(selectedDate);
      expect(result.current.calendarOpen).toBe(false);
    });
  });

  describe("handleDateSelect - round-trip", () => {
    it("updates only the active field for single selection", () => {
      const onDepartureDateChange = vi.fn();
      const onReturnDateChange = vi.fn();
      const { result } = renderHook(() =>
        useDateSelector({
          ...defaultProps,
          tripType: "round-trip",
          onDepartureDateChange,
          onReturnDateChange,
        })
      );

      const departure = new Date("2025-11-20");
      const ret = new Date("2025-11-25");

      act(() => {
        result.current.handleDepartureClick();
      });

      act(() => {
        result.current.handleDateSelect(departure);
      });

      expect(onDepartureDateChange).toHaveBeenCalledWith(departure);
      expect(onReturnDateChange).not.toHaveBeenCalled();
      expect(result.current.calendarOpen).toBe(false);

      act(() => {
        result.current.handleReturnClick();
      });

      act(() => {
        result.current.handleDateSelect(ret);
      });

      expect(onReturnDateChange).toHaveBeenCalledWith(ret);
    });

    it("handles single date selection for departure with existing return", () => {
      const onDepartureDateChange = vi.fn();
      const returnDate = new Date("2025-11-25");

      const { result } = renderHook(() =>
        useDateSelector({
          ...defaultProps,
          tripType: "round-trip",
          returnDate,
          onDepartureDateChange,
        })
      );

      const newDeparture = new Date("2025-11-20");

      act(() => {
        result.current.handleDepartureClick();
      });

      act(() => {
        result.current.handleDateSelect(newDeparture);
      });

      expect(onDepartureDateChange).toHaveBeenCalledWith(newDeparture);
      expect(result.current.calendarOpen).toBe(false);
    });

    it("prevents selecting a return date earlier than departure via disabled dates", () => {
      const onReturnDateChange = vi.fn();
      const departureDate = new Date("2025-11-25");

      const { result } = renderHook(() =>
        useDateSelector({
          ...defaultProps,
          tripType: "round-trip",
          departureDate,
          onReturnDateChange,
        })
      );

      const earlierReturn = new Date("2025-11-20");

      act(() => {
        result.current.handleReturnClick();
      });

      // Should be disabled in UI; we don't call handleDateSelect when disabled
      expect(result.current.getDisabledDates(earlierReturn)).toBe(true);
      expect(onReturnDateChange).not.toHaveBeenCalled();
    });
  });

  describe("getDisabledDates", () => {
    it("disables dates before today", () => {
      const { result } = renderHook(() => useDateSelector(defaultProps));

      const yesterday = addDays(today, -1);
      expect(result.current.getDisabledDates(yesterday)).toBe(true);
    });

    it("disables dates after maxDate", () => {
      const { result } = renderHook(() =>
        useDateSelector({
          ...defaultProps,
          maxDaysInFuture: 30,
        })
      );

      const futureDate = addDays(today, 31);
      expect(result.current.getDisabledDates(futureDate)).toBe(true);
    });

    it("allows dates within range", () => {
      const { result } = renderHook(() => useDateSelector(defaultProps));

      const validDate = addDays(today, 10);
      expect(result.current.getDisabledDates(validDate)).toBe(false);
    });

    it("disables dates before departure in round-trip mode when editing return date", () => {
      const departureDate = new Date("2025-11-20");

      const { result } = renderHook(() =>
        useDateSelector({
          ...defaultProps,
          tripType: "round-trip",
          departureDate,
        })
      );

      // Set activeField to return
      act(() => {
        result.current.handleReturnClick();
      });

      const beforeDeparture = new Date("2025-11-18");
      expect(result.current.getDisabledDates(beforeDeparture)).toBe(true);
    });

    it("allows selecting earlier departure date in round-trip mode when editing departure", () => {
      const departureDate = new Date("2025-11-25");
      const returnDate = new Date("2025-11-29");

      const { result } = renderHook(() =>
        useDateSelector({
          ...defaultProps,
          tripType: "round-trip",
          departureDate,
          returnDate,
        })
      );

      // User wants to change from 11-25 ~ 11-29 to 11-24 ~ 11-27
      // Click on departure field to edit it
      act(() => {
        result.current.handleDepartureClick();
      });

      // Check if 11-24 is available (it should be, since we're editing departure)
      const earlierDate = new Date("2025-11-24");
      expect(result.current.getDisabledDates(earlierDate)).toBe(false);
    });
  });

  describe("setCalendarOpen", () => {
    it("updates calendarOpen state", () => {
      const { result } = renderHook(() => useDateSelector(defaultProps));

      act(() => {
        result.current.setCalendarOpen(true);
      });

      expect(result.current.calendarOpen).toBe(true);

      act(() => {
        result.current.setCalendarOpen(false);
      });

      expect(result.current.calendarOpen).toBe(false);
    });
  });
});
