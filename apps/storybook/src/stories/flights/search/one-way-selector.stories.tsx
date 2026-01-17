import { OneWaySelector } from "@nomad/ui/components/flights/search";
import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

const mockGetRelativeDateLabel = (date: Date, today: Date): string => {
  const daysDiff = Math.floor(
    (date.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  );
  if (daysDiff === 0) return "今天";
  if (daysDiff === 1) return "明天";
  if (daysDiff === 2) return "后天";
  return "";
};

const mockGetWeekdayLabel = (date: Date): string => {
  const weekdays = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
  return weekdays[date.getDay()];
};

const meta: Meta<typeof OneWaySelector> = {
  title: "Flights/Search/OneWaySelector",
  component: OneWaySelector,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [departureDate, setDepartureDate] = useState<Date | null>(null);
    const [calendarOpen, setCalendarOpen] = useState(false);

    return (
      <div className="w-[600px]">
        <OneWaySelector
          departureDate={departureDate}
          today={new Date()}
          calendarOpen={calendarOpen}
          onCalendarOpenChange={setCalendarOpen}
          onAddReturnDate={() => console.log("Add return date")}
          onDateSelect={date => {
            if (date && !(date as any).from) {
              setDepartureDate(date as Date);
              setCalendarOpen(false);
            }
          }}
          getDisabledDates={date => date < new Date()}
          getRelativeDateLabel={mockGetRelativeDateLabel}
          getWeekdayLabel={mockGetWeekdayLabel}
        />
      </div>
    );
  },
};

export const WithSelectedDate: Story = {
  render: () => {
    const [departureDate, setDepartureDate] = useState<Date | null>(
      new Date(Date.now() + 5 * 24 * 60 * 60 * 1000)
    );
    const [calendarOpen, setCalendarOpen] = useState(false);

    return (
      <div className="w-[600px]">
        <OneWaySelector
          departureDate={departureDate}
          today={new Date()}
          calendarOpen={calendarOpen}
          onCalendarOpenChange={setCalendarOpen}
          onAddReturnDate={() => console.log("Add return date")}
          onDateSelect={date => {
            if (date && !(date as any).from) {
              setDepartureDate(date as Date);
              setCalendarOpen(false);
            }
          }}
          getDisabledDates={date => date < new Date()}
          getRelativeDateLabel={mockGetRelativeDateLabel}
          getWeekdayLabel={mockGetWeekdayLabel}
        />
      </div>
    );
  },
};
