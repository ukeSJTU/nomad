"use client";

import { addDays, differenceInDays, format, startOfDay } from "date-fns";
import { fromZonedTime, toZonedTime } from "date-fns-tz";
import { Calendar as CalendarIcon } from "lucide-react";
import { useState } from "react";
import { type DateRange } from "react-day-picker";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

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
  const tripDuration =
    departureDate && returnDate
      ? differenceInDays(returnDate, departureDate)
      : 0;

  const handleDateSelect = (date: Date | DateRange | undefined) => {
    if (tripType === "round-trip") {
      const range = date as DateRange | undefined;
      if (range?.from) {
        onDepartureDateChange(range.from);
      }
      if (range?.to) {
        onReturnDateChange(range.to);
        setCalendarOpen(false);
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
      <div className="flex gap-2 items-center">
        <DropdownMenu
          open={calendarOpen && activeField === "departure"}
          onOpenChange={open => {
            if (activeField === "departure") {
              setCalendarOpen(open);
            }
          }}
        >
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "flex-1 justify-start text-left font-normal",
                !departureDate && "text-muted-foreground"
              )}
              onClick={handleDepartureClick}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {departureDate ? (
                format(departureDate, "yyyy-MM-dd")
              ) : (
                <span>选择出发日期</span>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-auto p-0" align="start">
            {tripType === "round-trip" ? (
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
            ) : (
              <Calendar
                mode="single"
                defaultMonth={departureDate || new Date()}
                selected={departureDate || undefined}
                onSelect={handleDateSelect}
                numberOfMonths={2}
                disabled={getDisabledDates}
                className="rounded-lg"
              />
            )}
          </DropdownMenuContent>
        </DropdownMenu>

        {tripType === "round-trip" ? (
          <div className="flex items-center gap-2 flex-1">
            <span className="text-muted-foreground">-</span>
            <Button
              variant="outline"
              className={cn(
                "flex-1 justify-start text-left font-normal",
                !returnDate && "text-muted-foreground"
              )}
              onClick={handleReturnClick}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {returnDate ? (
                format(returnDate, "yyyy-MM-dd")
              ) : (
                <span>选择返程日期</span>
              )}
            </Button>
            {tripDuration > 0 && (
              <span className="text-sm text-muted-foreground whitespace-nowrap">
                {tripDuration}天
              </span>
            )}
          </div>
        ) : (
          <Button
            variant="outline"
            onClick={handleAddReturnDate}
            className="flex-1"
          >
            + 添加返程日期
          </Button>
        )}
      </div>
    </div>
  );
}
