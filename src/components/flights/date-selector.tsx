"use client";

import { addDays, differenceInDays, format, startOfDay } from "date-fns";
import { fromZonedTime, toZonedTime } from "date-fns-tz";
import { useState } from "react";
import { type DateRange } from "react-day-picker";

import { Calendar } from "@/components/ui/calendar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

/**
 * Get relative date label (今天, 明天, 后天, etc.)
 */
function getRelativeDateLabel(date: Date, referenceDate: Date): string {
  const daysDiff = differenceInDays(
    startOfDay(date),
    startOfDay(referenceDate)
  );

  switch (daysDiff) {
    case 0:
      return "今天";
    case 1:
      return "明天";
    case 2:
      return "后天";
    default:
      return "";
  }
}

/**
 * Get weekday label (周一, 周二, etc.)
 */
function getWeekdayLabel(date: Date): string {
  const weekdays = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
  return weekdays[date.getDay()];
}

interface DateSelectorProps {
  tripType: "one-way" | "round-trip";
  departureDate: Date | null;
  returnDate: Date | null;
  onDepartureDateChange: (date: Date) => void;
  onReturnDateChange: (date: Date) => void;
  onTripTypeChange?: (tripType: "one-way" | "round-trip") => void;
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
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [activeField, setActiveField] = useState<"departure" | "return">(
    "departure"
  );

  const today =
    minDate ||
    (() => {
      if (timezone) {
        const nowInTimezone = toZonedTime(new Date(), timezone);
        const startOfDayInTimezone = startOfDay(nowInTimezone);
        return fromZonedTime(startOfDayInTimezone, timezone);
      } else {
        const localToday = new Date();
        localToday.setHours(0, 0, 0, 0);
        return localToday;
      }
    })();

  const maxDate = addDays(today, maxDaysInFuture);

  // Calculate trip duration (inclusive of both start and end dates)
  const tripDuration =
    departureDate && returnDate
      ? differenceInDays(returnDate, departureDate) + 1
      : 0;

  const handleDateSelect = (date: Date | DateRange | undefined) => {
    if (tripType === "round-trip") {
      const range = date as DateRange | undefined;

      if (activeField === "departure") {
        // User clicked departure date field
        if (range?.from) {
          onDepartureDateChange(range.from);

          // If user selected a date after current return date, clear return date and keep calendar open
          if (returnDate && range.from > returnDate) {
            onReturnDateChange(range.from);
            // Calendar stays open for return date selection
          } else if (range?.to) {
            // User selected a range
            onReturnDateChange(range.to);
            setCalendarOpen(false);
          }
        }
      } else {
        // User clicked return date field
        if (range?.from) {
          // If user selected a date before current departure date, update departure date
          if (departureDate && range.from < departureDate) {
            onDepartureDateChange(range.from);
            if (range?.to) {
              onReturnDateChange(range.to);
              setCalendarOpen(false);
            }
          } else if (range?.to) {
            // Normal case: update return date
            onReturnDateChange(range.to);
            setCalendarOpen(false);
          } else if (range?.from) {
            // User selected a single date for return
            onReturnDateChange(range.from);
            setCalendarOpen(false);
          }
        }
      }
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
  };

  const handleDepartureClick = () => {
    setActiveField("departure");
    setCalendarOpen(true);
  };

  const handleReturnClick = () => {
    setActiveField("return");
    setCalendarOpen(true);
  };

  const handleAddReturnDate = () => {
    onTripTypeChange?.("round-trip");
    setActiveField("return");
    setCalendarOpen(true);
  };

  const getDisabledDates = (date: Date): boolean => {
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
    if (tripType === "round-trip" && departureDate && date < departureDate) {
      return true;
    }
    return false;
  };

  return (
    <div className="space-y-2">
      {tripType === "round-trip" ? (
        // Round-trip: Unified container with departure and return dates
        <DropdownMenu open={calendarOpen} onOpenChange={setCalendarOpen}>
          <div className="relative flex items-stretch border rounded-lg overflow-hidden bg-background hover:bg-accent/50 transition-colors">
            {/* Departure Date Section */}
            <DropdownMenuTrigger asChild>
              <div
                className="flex-1 px-4 py-3 cursor-pointer"
                onClick={handleDepartureClick}
              >
                <div className="text-xs text-muted-foreground mb-1">
                  出发日期
                </div>
                <div className="flex items-baseline gap-2">
                  {departureDate ? (
                    <>
                      <span className="text-base font-medium">
                        {format(departureDate, "yyyy-MM-dd")}
                      </span>
                      {getRelativeDateLabel(departureDate, today) ? (
                        <span className="text-sm text-muted-foreground">
                          {getRelativeDateLabel(departureDate, today)}
                        </span>
                      ) : (
                        <span className="text-sm text-muted-foreground/60">
                          {getWeekdayLabel(departureDate)}
                        </span>
                      )}
                    </>
                  ) : (
                    <span className="text-base text-muted-foreground">
                      选择日期
                    </span>
                  )}
                </div>
              </div>
            </DropdownMenuTrigger>

            {/* Vertical Separator with Trip Duration Badge */}
            <div className="relative flex items-center">
              <div className="w-px h-full bg-border" />
              {tripDuration > 1 && (
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-primary-foreground rounded-full w-10 h-10 flex items-center justify-center text-xs font-medium shadow-sm">
                  {tripDuration}天
                </div>
              )}
            </div>

            {/* Return Date Section */}
            <DropdownMenuTrigger asChild>
              <div
                className="flex-1 px-4 py-3 cursor-pointer"
                onClick={handleReturnClick}
              >
                <div className="text-xs text-muted-foreground mb-1 text-right">
                  返回日期
                </div>
                <div className="flex items-baseline gap-2 justify-end">
                  {returnDate ? (
                    <>
                      {getRelativeDateLabel(returnDate, today) ? (
                        <span className="text-sm text-muted-foreground">
                          {getRelativeDateLabel(returnDate, today)}
                        </span>
                      ) : (
                        <span className="text-sm text-muted-foreground/60">
                          {getWeekdayLabel(returnDate)}
                        </span>
                      )}
                      <span className="text-base font-medium">
                        {format(returnDate, "yyyy-MM-dd")}
                      </span>
                    </>
                  ) : (
                    <span className="text-base text-muted-foreground">
                      选择日期
                    </span>
                  )}
                </div>
              </div>
            </DropdownMenuTrigger>
          </div>

          <DropdownMenuContent
            className="w-auto p-0"
            align="start"
            alignOffset={-16}
          >
            <Calendar
              mode="range"
              defaultMonth={departureDate || new Date()}
              selected={
                departureDate && returnDate
                  ? { from: departureDate, to: returnDate }
                  : departureDate
                    ? { from: departureDate, to: undefined }
                    : undefined
              }
              onSelect={handleDateSelect}
              numberOfMonths={2}
              disabled={getDisabledDates}
              className="rounded-lg"
            />
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        // One-way: Departure date + Add return link
        <div className="flex items-stretch gap-2">
          <DropdownMenu
            open={calendarOpen && activeField === "departure"}
            onOpenChange={open => {
              if (activeField === "departure") {
                setCalendarOpen(open);
              }
            }}
          >
            <DropdownMenuTrigger asChild>
              <div className="flex-1 border rounded-lg px-4 py-3 cursor-pointer bg-background hover:bg-accent/50 transition-colors">
                <div className="text-xs text-muted-foreground mb-1">
                  出发日期
                </div>
                <div className="flex items-baseline gap-2">
                  {departureDate ? (
                    <>
                      <span className="text-base font-medium">
                        {format(departureDate, "yyyy-MM-dd")}
                      </span>
                      {getRelativeDateLabel(departureDate, today) ? (
                        <span className="text-sm text-muted-foreground">
                          {getRelativeDateLabel(departureDate, today)}
                        </span>
                      ) : (
                        <span className="text-sm text-muted-foreground/60">
                          {getWeekdayLabel(departureDate)}
                        </span>
                      )}
                    </>
                  ) : (
                    <span className="text-base text-muted-foreground">
                      选择日期
                    </span>
                  )}
                </div>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                defaultMonth={departureDate || new Date()}
                selected={departureDate || undefined}
                onSelect={handleDateSelect}
                numberOfMonths={2}
                disabled={getDisabledDates}
                className="rounded-lg"
              />
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Add Return Date Link */}
          <button
            onClick={handleAddReturnDate}
            className="flex-1 border border-dashed rounded-lg px-4 py-3 text-sm text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-colors cursor-pointer text-left"
          >
            + 添加返程
          </button>
        </div>
      )}
    </div>
  );
}
