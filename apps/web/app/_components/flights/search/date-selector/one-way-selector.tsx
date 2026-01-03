"use client";

import { Calendar } from "@nomad/ui/components/primitives/calendar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@nomad/ui/components/primitives/dropdown-menu";
import { type DateRange } from "react-day-picker";
import { type ActiveField } from "@/hooks/use-date-selector";

import { DateDisplay } from "./date-display";

export interface OneWaySelectorProps {
  departureDate: Date | null;
  today: Date;
  activeField: ActiveField;
  calendarOpen: boolean;
  onCalendarOpenChange: (open: boolean) => void;
  onAddReturnDate: () => void;
  onDateSelect: (date: Date | DateRange | undefined) => void;
  getDisabledDates: (date: Date) => boolean;
}

export function OneWaySelector({
  departureDate,
  today,
  activeField,
  calendarOpen,
  onCalendarOpenChange,
  onAddReturnDate,
  onDateSelect,
  getDisabledDates,
}: OneWaySelectorProps) {
  return (
    <div className="flex items-stretch gap-2">
      <DropdownMenu
        open={calendarOpen && activeField === "departure"}
        onOpenChange={open => {
          if (activeField === "departure") {
            onCalendarOpenChange(open);
          }
        }}
      >
        <DropdownMenuTrigger asChild>
          <div className="flex-1 border rounded-lg px-4 py-3 cursor-pointer bg-background hover:bg-accent/50 transition-colors">
            <div className="text-xs text-muted-foreground mb-1">出发日期</div>
            <div className="flex items-baseline gap-2">
              <DateDisplay date={departureDate} today={today} />
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
        onClick={onAddReturnDate}
        className="flex-1 border border-dashed rounded-lg px-4 py-3 text-sm text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-colors cursor-pointer text-left"
      >
        + 添加返程
      </button>
    </div>
  );
}
