"use client";

import { Badge } from "@nomad/ui/components/primitives/badge";
import { Calendar } from "@nomad/ui/components/primitives/calendar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@nomad/ui/components/primitives/dropdown-menu";
import { type DateRange } from "react-day-picker";
import { type ActiveField } from "@/hooks/use-date-selector";

import { DateDisplay } from "./date-display";

export interface RoundTripSelectorProps {
  departureDate: Date | null;
  returnDate: Date | null;
  today: Date;
  tripDuration: number;
  calendarOpen: boolean;
  onCalendarOpenChange: (open: boolean) => void;
  activeField: ActiveField;
  onDepartureClick: () => void;
  onReturnClick: () => void;
  onDateSelect: (date: Date | DateRange | undefined) => void;
  getDisabledDates: (date: Date) => boolean;
}

export function RoundTripSelector({
  departureDate,
  returnDate,
  today,
  tripDuration,
  calendarOpen,
  onCalendarOpenChange,
  activeField,
  onDepartureClick,
  onReturnClick,
  onDateSelect,
  getDisabledDates,
}: RoundTripSelectorProps) {
  return (
    <DropdownMenu open={calendarOpen} onOpenChange={onCalendarOpenChange}>
      <div className="relative flex items-stretch border rounded-lg overflow-hidden bg-background hover:bg-accent/50 transition-colors">
        {/* Departure Date Section */}
        <DropdownMenuTrigger
          asChild
          onPointerDown={() => onDepartureClick()}
          onKeyDown={event => {
            if (event.key === "Enter" || event.key === " ") {
              onDepartureClick();
            }
          }}
        >
          <div className="flex-1 px-4 py-3 cursor-pointer">
            <div className="text-xs text-muted-foreground mb-1">出发日期</div>
            <div className="flex items-baseline gap-2">
              <DateDisplay date={departureDate} today={today} />
            </div>
          </div>
        </DropdownMenuTrigger>

        {/* Vertical Separator with Trip Duration Badge */}
        <div className="relative flex items-center">
          <div className="w-px h-full bg-border" />
          {tripDuration > 1 && (
            <Badge
              variant="secondary"
              className="absolute flex items-center justify-center text-xs font-medium left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            >
              {tripDuration}天
            </Badge>
          )}
        </div>

        {/* Return Date Section */}
        <DropdownMenuTrigger
          asChild
          onPointerDown={() => onReturnClick()}
          onKeyDown={event => {
            if (event.key === "Enter" || event.key === " ") {
              onReturnClick();
            }
          }}
        >
          <div className="flex-1 px-4 py-3 cursor-pointer">
            <div className="text-xs text-muted-foreground mb-1 text-right">
              返回日期
            </div>
            <div className="flex items-baseline gap-2 justify-end">
              <DateDisplay date={returnDate} today={today} align="right" />
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
            activeField === "departure"
              ? undefined
              : departureDate && returnDate
                ? { from: departureDate, to: returnDate }
                : departureDate
                  ? { from: departureDate, to: undefined }
                  : undefined
          }
          onSelect={onDateSelect}
          numberOfMonths={2}
          disabled={getDisabledDates}
          className="rounded-lg"
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
