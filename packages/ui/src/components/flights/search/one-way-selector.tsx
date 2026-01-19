"use client";

import { type DateRange } from "react-day-picker";

import { Calendar } from "../../primitives/calendar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../../primitives/dropdown-menu";
import { DateDisplay, type DateDisplayProps } from "./date-display";

export interface OneWaySelectorProps {
  departureDate: Date | null;
  today: Date;
  calendarOpen: boolean;
  onCalendarOpenChange: (open: boolean) => void;
  onAddReturnDate: () => void;
  onDateSelect: (date: Date | DateRange | undefined) => void;
  getDisabledDates: (date: Date) => boolean;
  getRelativeDateLabel: DateDisplayProps["getRelativeDateLabel"];
  getWeekdayLabel: DateDisplayProps["getWeekdayLabel"];
}

export function OneWaySelector({
  departureDate,
  today,
  calendarOpen,
  onCalendarOpenChange,
  onAddReturnDate,
  onDateSelect,
  getDisabledDates,
  getRelativeDateLabel,
  getWeekdayLabel,
}: OneWaySelectorProps) {
  return (
    <div className="flex items-stretch gap-2">
      <DropdownMenu open={calendarOpen} onOpenChange={onCalendarOpenChange}>
        <DropdownMenuTrigger asChild>
          <div className="flex-1 border rounded-lg px-4 py-3 cursor-pointer bg-background hover:bg-accent/50 transition-colors">
            <div className="text-xs text-muted-foreground mb-1">出发日期</div>
            <div className="flex items-baseline gap-2">
              <DateDisplay
                date={departureDate}
                today={today}
                getRelativeDateLabel={getRelativeDateLabel}
                getWeekdayLabel={getWeekdayLabel}
              />
            </div>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            defaultMonth={departureDate || new Date()}
            selected={departureDate || undefined}
            onSelect={onDateSelect}
            numberOfMonths={2}
            disabled={getDisabledDates}
            className="rounded-lg"
          />
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Add Return Date Link */}
      <button
        type="button"
        onClick={onAddReturnDate}
        className="flex-1 border border-dashed rounded-lg px-4 py-3 text-sm text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-colors cursor-pointer text-left"
      >
        + 添加返程
      </button>
    </div>
  );
}
