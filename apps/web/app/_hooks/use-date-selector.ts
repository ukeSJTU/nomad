"use client";

import { useCallback, useMemo, useState } from "react";
import { type DateRange } from "react-day-picker";

import { calculateTripDuration, getBookingDateRange } from "@/lib/format";

export type TripType = "one-way" | "round-trip";
export type ActiveField = "departure" | "return";

export interface UseDateSelectorOptions {
  tripType: TripType;
  departureDate: Date | null;
  returnDate: Date | null;
  onDepartureDateChange: (date: Date) => void;
  onReturnDateChange: (date: Date) => void;
  onTripTypeChange?: (tripType: TripType) => void;
  minDate?: Date;
  maxDaysInFuture?: number;
  timezone?: string;
}

export interface UseDateSelectorReturn {
  calendarOpen: boolean;
  setCalendarOpen: (open: boolean) => void;
  activeField: ActiveField;
  today: Date;
  maxDate: Date;
  tripDuration: number;
  handleDateSelect: (date: Date | DateRange | undefined) => void;
  handleDepartureClick: () => void;
  handleReturnClick: () => void;
  handleAddReturnDate: () => void;
  getDisabledDates: (date: Date) => boolean;
}

export function useDateSelector({
  tripType,
  departureDate,
  returnDate,
  onDepartureDateChange,
  onReturnDateChange,
  onTripTypeChange,
  minDate,
  maxDaysInFuture = 365,
  timezone = "Asia/Shanghai",
}: UseDateSelectorOptions): UseDateSelectorReturn {
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [activeField, setActiveField] = useState<ActiveField>("departure");

  const { today, maxDate } = useMemo(() => {
    if (minDate) {
      return {
        today: minDate,
        maxDate: new Date(
          minDate.getTime() + maxDaysInFuture * 24 * 60 * 60 * 1000
        ),
      };
    }
    const range = getBookingDateRange(timezone);
    return {
      today: range.minDate,
      maxDate: range.maxDate,
    };
  }, [minDate, maxDaysInFuture, timezone]);

  const tripDuration = useMemo(
    () => calculateTripDuration(departureDate, returnDate),
    [departureDate, returnDate]
  );

  const handleDateSelect = useCallback(
    (date: Date | DateRange | undefined) => {
      if (tripType === "round-trip") {
        const range = date as DateRange | undefined;

        if (activeField === "departure") {
          if (range?.from) {
            onDepartureDateChange(range.from);
            if (range.to && range.to.getTime() !== range.from.getTime()) {
              onReturnDateChange(range.to);
            }
          }
          setCalendarOpen(false);
          return;
        }

        const newReturnDate = range?.to ?? range?.from;

        if (!newReturnDate) {
          return;
        }

        // If no departure yet, mirror return into both
        if (!departureDate) {
          onDepartureDateChange(newReturnDate);
          onReturnDateChange(newReturnDate);
          setCalendarOpen(false);
          return;
        }

        if (newReturnDate >= departureDate) {
          onReturnDateChange(newReturnDate);
          setCalendarOpen(false);
          return;
        }

        // Swap when selecting an earlier return
        onDepartureDateChange(newReturnDate);
        onReturnDateChange(departureDate);
        setCalendarOpen(false);
      } else {
        if (date && !(date as DateRange).from) {
          if (activeField === "departure") {
            onDepartureDateChange(date as Date);
          } else {
            onReturnDateChange(date as Date);
          }
          setCalendarOpen(false);
        }
      }
    },
    [
      tripType,
      activeField,
      departureDate,
      returnDate,
      onDepartureDateChange,
      onReturnDateChange,
    ]
  );

  const handleDepartureClick = useCallback(() => {
    setActiveField("departure");
    setCalendarOpen(true);
  }, []);

  const handleReturnClick = useCallback(() => {
    setActiveField("return");
    setCalendarOpen(true);
  }, []);

  const handleAddReturnDate = useCallback(() => {
    onTripTypeChange?.("round-trip");
    setActiveField("return");
    setCalendarOpen(true);
  }, [onTripTypeChange]);

  const getDisabledDates = useCallback(
    (date: Date): boolean => {
      if (date < today || date > maxDate) {
        return true;
      }
      if (
        tripType === "one-way" &&
        activeField === "return" &&
        departureDate &&
        date < departureDate
      ) {
        return true;
      }
      if (
        tripType === "round-trip" &&
        activeField === "return" &&
        departureDate &&
        date < departureDate
      ) {
        return true;
      }
      return false;
    },
    [today, maxDate, tripType, activeField, departureDate]
  );

  return {
    calendarOpen,
    setCalendarOpen,
    activeField,
    today,
    maxDate,
    tripDuration,
    handleDateSelect,
    handleDepartureClick,
    handleReturnClick,
    handleAddReturnDate,
    getDisabledDates,
  };
}
