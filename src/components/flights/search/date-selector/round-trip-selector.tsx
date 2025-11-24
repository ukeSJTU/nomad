"use client";

import React from "react";
import { type DateRange } from "react-day-picker";

import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverAnchor,
  PopoverContent,
} from "@/components/ui/popover";
import { type ActiveField } from "@/hooks/use-date-selector";

import { DateDisplay } from "./date-display";

export interface RoundTripSelectorProps {
  departureDate: Date | null;
  returnDate: Date | null;
  today: Date;
  tripDuration: number;
  calendarOpen: boolean;
  onCalendarOpenChange: (open: boolean) => void;
  onDepartureClick: () => void;
  onReturnClick: () => void;
  onDateSelect: (date: Date | DateRange | undefined) => void;
  getDisabledDates: (date: Date) => boolean;
  activeField: ActiveField;
}

export function RoundTripSelector({
  departureDate,
  returnDate,
  today,
  tripDuration,
  calendarOpen,
  onCalendarOpenChange,
  onDepartureClick,
  onReturnClick,
  onDateSelect,
  getDisabledDates,
  activeField,
}: RoundTripSelectorProps) {
  return (
    <Popover open={calendarOpen} onOpenChange={onCalendarOpenChange}>
      <PopoverAnchor asChild>
        <div className="relative flex items-stretch border rounded-lg overflow-hidden bg-background hover:bg-accent/50 transition-colors">
          <div
            className={`flex-1 px-4 py-3 cursor-pointer ${
              activeField === "departure" ? "ring-2 ring-primary" : ""
            }`}
            onClick={onDepartureClick}
          >
            <div className="text-xs text-muted-foreground mb-1">出发日期</div>
            <div className="flex items-baseline gap-2">
              <DateDisplay date={departureDate} today={today} />
            </div>
          </div>

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

          <div
            className={`flex-1 px-4 py-3 cursor-pointer ${
              activeField === "return" ? "ring-2 ring-primary" : ""
            }`}
            onClick={onReturnClick}
          >
            <div
              className="text-xs text-muted-foreground mb-1 text-right"
              onClick={onReturnClick}
              onClickCapture={onReturnClick}
              role="button"
              aria-label="返回日期选择"
            >
              返回日期
            </div>
            <div className="flex items-baseline gap-2 justify-end">
              <DateDisplay date={returnDate} today={today} align="right" />
            </div>
          </div>
        </div>
      </PopoverAnchor>

      <PopoverContent
        className="w-auto p-0"
        align="start"
        sideOffset={8}
        forceMount
        onClickCapture={e => {
          const target = e.target as HTMLElement;
          const button = target.closest(
            "button[data-day]"
          ) as HTMLButtonElement | null;
          if (button && button.dataset.day) {
            const selected = new Date(button.dataset.day);
            onDateSelect(selected);
          }
        }}
      >
        <Calendar
          mode="single"
          defaultMonth={
            (activeField === "departure" ? departureDate : returnDate) ||
            departureDate ||
            new Date()
          }
          selected={
            (activeField === "departure" ? departureDate : returnDate) ||
            undefined
          }
          onSelect={onDateSelect}
          numberOfMonths={2}
          disabled={getDisabledDates}
          className="rounded-lg"
        />
      </PopoverContent>
    </Popover>
  );
}
