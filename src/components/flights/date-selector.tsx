"use client";

import { addDays, differenceInDays, format } from "date-fns";
import { useState } from "react";
import { type DateRange } from "react-day-picker";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface DateSelectorProps {
  /**
   * Callback when a date or date range is selected
   */
  onSelect: (date: Date | DateRange | undefined) => void;
  /**
   * Title displayed at the top of the selector
   */
  title?: string;
  /**
   * Currently selected date (for single mode)
   */
  selectedDate?: Date | null;
  /**
   * Currently selected date range (for range mode)
   */
  selectedRange?: DateRange | null;
  /**
   * Selection mode: single date or date range
   */
  mode?: "single" | "range";
  /**
   * Minimum selectable date
   */
  minDate?: Date;
  /**
   * Maximum selectable date
   */
  maxDate?: Date;
  /**
   * Trigger element for the dropdown
   */
  children: React.ReactNode;
  /**
   * Control dropdown open state
   */
  open?: boolean;
  /**
   * Callback when dropdown open state changes
   */
  onOpenChange?: (open: boolean) => void;
  /**
   * Function to disable specific dates
   */
  disabled?: (date: Date) => boolean;
}

/**
 * DateSelector component for selecting single dates or date ranges
 * Displays a calendar with multiple months for better UX
 * Similar to CitySelector pattern with dropdown menu
 */
export function DateSelector({
  onSelect,
  title = "Select Date",
  selectedDate,
  selectedRange,
  mode = "single",
  minDate,
  maxDate,
  children,
  open,
  onOpenChange,
  disabled,
}: DateSelectorProps) {
  const [internalDateRange, setInternalDateRange] = useState<
    DateRange | undefined
  >(selectedRange || undefined);

  const handleDateSelect = (date: Date | DateRange | undefined) => {
    if (mode === "range") {
      setInternalDateRange(date as DateRange | undefined);
      // Only close and trigger callback when both dates are selected
      const range = date as DateRange | undefined;
      if (range?.from && range?.to) {
        onSelect(range);
        onOpenChange?.(false);
      }
    } else {
      onSelect(date);
      // Auto-close dropdown after single date selection
      onOpenChange?.(false);
    }
  };

  const getDisabledDates = (date: Date) => {
    // Apply custom disabled function if provided
    if (disabled && disabled(date)) {
      return true;
    }
    // Apply min/max date constraints
    if (minDate && date < minDate) {
      return true;
    }
    if (maxDate && date > maxDate) {
      return true;
    }
    return false;
  };

  return (
    <DropdownMenu open={open} onOpenChange={onOpenChange}>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent className="w-auto p-0" align="start">
        <div className="p-3">
          <DropdownMenuLabel className="px-2 py-1.5 text-xs text-muted-foreground">
            {title}
          </DropdownMenuLabel>
          {mode === "range" ? (
            <Calendar
              mode="range"
              defaultMonth={
                internalDateRange?.from || selectedDate || new Date()
              }
              selected={internalDateRange}
              onSelect={handleDateSelect}
              numberOfMonths={2}
              disabled={getDisabledDates}
              className="rounded-lg border shadow-sm"
            />
          ) : (
            <Calendar
              mode="single"
              defaultMonth={selectedDate || new Date()}
              selected={selectedDate || undefined}
              onSelect={handleDateSelect}
              numberOfMonths={2}
              disabled={getDisabledDates}
              className="rounded-lg border shadow-sm"
            />
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

interface DateInputProps {
  /**
   * Trip type: one-way or round-trip
   */
  tripType: "one-way" | "round-trip";
  /**
   * Departure date
   */
  departureDate: Date | null;
  /**
   * Return date (only for round-trip)
   */
  returnDate: Date | null;
  /**
   * Callback when departure date changes
   */
  onDepartureDateChange: (date: Date) => void;
  /**
   * Callback when return date changes
   */
  onReturnDateChange: (date: Date) => void;
  /**
   * Callback when trip type changes
   */
  onTripTypeChange?: (tripType: "one-way" | "round-trip") => void;
  /**
   * Minimum selectable date (defaults to today)
   */
  minDate?: Date;
  /**
   * Maximum days in the future that can be selected (defaults to 365)
   */
  maxDaysInFuture?: number;
  /**
   * Timezone of the departure city (for calculating "today")
   */
  timezone?: string;
}

/**
 * DateInput component for flight search form
 * Provides departure and return date selection with trip type awareness
 * Mimics CityInput pattern with auto-opening next selector
 */
export function DateInput({
  tripType,
  departureDate,
  returnDate,
  onDepartureDateChange,
  onReturnDateChange,
  onTripTypeChange,
  minDate,
  maxDaysInFuture = 365,
  timezone: _timezone, // Reserved for future timezone-aware date calculations
}: DateInputProps) {
  const [departureOpen, setDepartureOpen] = useState(false);
  const [returnOpen, setReturnOpen] = useState(false);

  // Calculate min and max dates
  // TODO: Use timezone parameter with date-fns-tz for timezone-aware calculations
  const today = minDate || new Date();
  today.setHours(0, 0, 0, 0); // Reset time to start of day
  const maxDate = addDays(today, maxDaysInFuture);

  const handleDepartureSelect = (date: Date | DateRange | undefined) => {
    if (date && !(date as DateRange).from) {
      onDepartureDateChange(date as Date);
      // Auto-open return date selector if round-trip
      if (tripType === "round-trip") {
        setReturnOpen(true);
      }
    }
  };

  const handleReturnSelect = (date: Date | DateRange | undefined) => {
    if (date && !(date as DateRange).from) {
      onReturnDateChange(date as Date);
    }
  };

  const handleAddReturnDate = () => {
    onTripTypeChange?.("round-trip");
    // Auto-open return date selector
    setTimeout(() => setReturnOpen(true), 100);
  };

  // Format date with weekday
  const formatDateWithWeekday = (date: Date | null) => {
    if (!date) return null;
    const dateStr = format(date, "yyyy-MM-dd");
    const weekday = format(date, "EEE");
    return { dateStr, weekday };
  };

  const departureDateFormatted = formatDateWithWeekday(departureDate);
  const returnDateFormatted = formatDateWithWeekday(returnDate);

  // Calculate trip duration
  const tripDuration =
    departureDate && returnDate
      ? differenceInDays(returnDate, departureDate)
      : 0;

  return (
    <div className="flex items-center gap-2">
      {/* Departure Date */}
      <div className="flex-1">
        <DateSelector
          onSelect={handleDepartureSelect}
          title="Departure/Return Date"
          selectedDate={departureDate}
          mode="single"
          minDate={today}
          maxDate={maxDate}
          open={departureOpen}
          onOpenChange={setDepartureOpen}
        >
          <Button
            variant="outline"
            className="w-full h-16 flex flex-col items-start justify-center"
          >
            <span className="text-xs text-muted-foreground">Departure</span>
            {departureDateFormatted ? (
              <div className="flex items-baseline gap-1">
                <span className="text-lg font-medium">
                  {departureDateFormatted.dateStr}
                </span>
                <span className="text-sm text-muted-foreground">
                  {departureDateFormatted.weekday}
                </span>
              </div>
            ) : (
              <span className="text-lg font-medium">Select Date</span>
            )}
          </Button>
        </DateSelector>
      </div>

      {/* Trip Duration (for round-trip) */}
      {tripType === "round-trip" && tripDuration > 0 && (
        <div className="shrink-0 text-sm text-muted-foreground">
          {tripDuration} day{tripDuration > 1 ? "s" : ""}
        </div>
      )}

      {/* Return Date or Add Return Button */}
      <div className="flex-1">
        {tripType === "round-trip" ? (
          <DateSelector
            onSelect={handleReturnSelect}
            title="Departure/Return Date"
            selectedDate={returnDate}
            mode="single"
            minDate={departureDate || today}
            maxDate={maxDate}
            open={returnOpen}
            onOpenChange={setReturnOpen}
          >
            <Button
              variant="outline"
              className="w-full h-16 flex flex-col items-start justify-center"
            >
              <span className="text-xs text-muted-foreground">Return</span>
              {returnDateFormatted ? (
                <div className="flex items-baseline gap-1">
                  <span className="text-lg font-medium">
                    {returnDateFormatted.dateStr}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {returnDateFormatted.weekday}
                  </span>
                </div>
              ) : (
                <span className="text-lg font-medium">Select Date</span>
              )}
            </Button>
          </DateSelector>
        ) : (
          <Button
            variant="outline"
            className={cn(
              "w-full h-16 flex items-center justify-center gap-2",
              "text-muted-foreground hover:text-foreground"
            )}
            onClick={handleAddReturnDate}
          >
            <span className="text-lg">+</span>
            <span>Add Return Date</span>
          </Button>
        )}
      </div>
    </div>
  );
}
