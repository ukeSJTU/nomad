"use client";

import { format } from "date-fns";

export interface DateDisplayProps {
  date: Date | null;
  today: Date;
  placeholder?: string;
  align?: "left" | "right";
  getRelativeDateLabel: (date: Date, today: Date) => string;
  getWeekdayLabel: (date: Date) => string;
}

export function DateDisplay({
  date,
  today,
  placeholder = "选择日期",
  align = "left",
  getRelativeDateLabel,
  getWeekdayLabel,
}: DateDisplayProps) {
  if (!date) {
    return (
      <span className="text-base text-muted-foreground">{placeholder}</span>
    );
  }

  const relativeLabel = getRelativeDateLabel(date, today);
  const weekdayLabel = getWeekdayLabel(date);
  const dateString = format(date, "yyyy-MM-dd");

  if (align === "right") {
    return (
      <>
        {relativeLabel ? (
          <span className="text-sm text-muted-foreground">{relativeLabel}</span>
        ) : (
          <span className="text-sm text-muted-foreground/60">
            {weekdayLabel}
          </span>
        )}
        <span className="text-base font-medium">{dateString}</span>
      </>
    );
  }

  return (
    <>
      <span className="text-base font-medium">{dateString}</span>
      {relativeLabel ? (
        <span className="text-sm text-muted-foreground">{relativeLabel}</span>
      ) : (
        <span className="text-sm text-muted-foreground/60">{weekdayLabel}</span>
      )}
    </>
  );
}
