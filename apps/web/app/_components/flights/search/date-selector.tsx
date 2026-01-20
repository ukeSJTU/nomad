"use client";

import {
  OneWaySelector,
  RoundTripSelector,
} from "@ukesjtu/nomad-ui/components/flights/search";
import { type TripType, useDateSelector } from "@/hooks/use-date-selector";
import { getRelativeDateLabel, getWeekdayLabel } from "@/lib/format/date-utils";

export interface DateSelectorProps {
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

export function DateSelector({
  tripType,
  departureDate,
  returnDate,
  onDepartureDateChange,
  onReturnDateChange,
  onTripTypeChange,
  minDate,
  maxDaysInFuture = 365,
  timezone,
}: DateSelectorProps) {
  const {
    calendarOpen,
    setCalendarOpen,
    activeField,
    today,
    tripDuration,
    handleDateSelect,
    handleDepartureClick,
    handleReturnClick,
    handleAddReturnDate,
    getDisabledDates,
  } = useDateSelector({
    tripType,
    departureDate,
    returnDate,
    onDepartureDateChange,
    onReturnDateChange,
    onTripTypeChange,
    minDate,
    maxDaysInFuture,
    timezone,
  });

  return (
    <div className="space-y-2">
      {tripType === "round-trip" ? (
        <RoundTripSelector
          departureDate={departureDate}
          returnDate={returnDate}
          today={today}
          tripDuration={tripDuration}
          calendarOpen={calendarOpen}
          onCalendarOpenChange={setCalendarOpen}
          activeField={activeField}
          onDepartureClick={handleDepartureClick}
          onReturnClick={handleReturnClick}
          onDateSelect={handleDateSelect}
          getDisabledDates={getDisabledDates}
          getRelativeDateLabel={getRelativeDateLabel}
          getWeekdayLabel={getWeekdayLabel}
        />
      ) : (
        <OneWaySelector
          departureDate={departureDate}
          today={today}
          calendarOpen={calendarOpen}
          onCalendarOpenChange={setCalendarOpen}
          onAddReturnDate={handleAddReturnDate}
          onDateSelect={handleDateSelect}
          getDisabledDates={getDisabledDates}
          getRelativeDateLabel={getRelativeDateLabel}
          getWeekdayLabel={getWeekdayLabel}
        />
      )}
    </div>
  );
}
