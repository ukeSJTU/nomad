"use client";

import { useCallback, useMemo, useState } from "react";
import { type DateRange } from "react-day-picker";

import { calculateTripDuration, getBookingDateRange } from "@/utils/date";

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
      if (!date) return;

      if (tripType === "round-trip") {
        const selectedDate = (date as DateRange).from
          ? (date as DateRange).from
          : (date as Date);

        if (activeField === "departure") {
          onDepartureDateChange(selectedDate as Date);
          setCalendarOpen(false);
        } else {
          onReturnDateChange(selectedDate as Date);
          setCalendarOpen(false);
        }
      } else {
        if ((date as DateRange).from) {
          return;
        }
        if (activeField === "departure") {
          onDepartureDateChange(date as Date);
        } else {
          onReturnDateChange(date as Date);
        }
        setCalendarOpen(false);
      }
    },
    [tripType, activeField, onDepartureDateChange, onReturnDateChange]
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
      if (date < today || date > maxDate) return true;

      if (activeField === "return" && departureDate && date < departureDate) {
        return true;
      }

      if (activeField === "departure" && returnDate && date > returnDate) {
        return true;
      }

      return false;
    },
    [today, maxDate, activeField, departureDate, returnDate]
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
