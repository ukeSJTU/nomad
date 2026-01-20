import type { Meta, StoryObj } from "@storybook/react";
import { RoundTripSelector } from "@ukesjtu/nomad-ui/components/flights/search";
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

const meta: Meta<typeof RoundTripSelector> = {
  title: "Flights/Search/RoundTripSelector",
  component: RoundTripSelector,
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
    const [returnDate, setReturnDate] = useState<Date | null>(null);
    const [calendarOpen, setCalendarOpen] = useState(false);
    const [activeField, setActiveField] = useState<"departure" | "return">(
      "departure"
    );

    const tripDuration =
      departureDate && returnDate
        ? Math.floor(
            (returnDate.getTime() - departureDate.getTime()) /
              (1000 * 60 * 60 * 24)
          ) + 1
        : 0;

    return (
      <div className="w-[600px]">
        <RoundTripSelector
          departureDate={departureDate}
          returnDate={returnDate}
          today={new Date()}
          tripDuration={tripDuration}
          calendarOpen={calendarOpen}
          onCalendarOpenChange={setCalendarOpen}
          activeField={activeField}
          onDepartureClick={() => {
            setActiveField("departure");
            setCalendarOpen(true);
          }}
          onReturnClick={() => {
            setActiveField("return");
            setCalendarOpen(true);
          }}
          onDateSelect={date => {
            const range = date as any;
            if (range?.from) {
              setDepartureDate(range.from);
              if (range.to) {
                setReturnDate(range.to);
              }
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

export const WithSelectedDates: Story = {
  render: () => {
    const [departureDate, setDepartureDate] = useState<Date | null>(
      new Date(Date.now() + 5 * 24 * 60 * 60 * 1000)
    );
    const [returnDate, setReturnDate] = useState<Date | null>(
      new Date(Date.now() + 10 * 24 * 60 * 60 * 1000)
    );
    const [calendarOpen, setCalendarOpen] = useState(false);
    const [activeField, setActiveField] = useState<"departure" | "return">(
      "departure"
    );

    const tripDuration =
      departureDate && returnDate
        ? Math.floor(
            (returnDate.getTime() - departureDate.getTime()) /
              (1000 * 60 * 60 * 24)
          ) + 1
        : 0;

    return (
      <div className="w-[600px]">
        <RoundTripSelector
          departureDate={departureDate}
          returnDate={returnDate}
          today={new Date()}
          tripDuration={tripDuration}
          calendarOpen={calendarOpen}
          onCalendarOpenChange={setCalendarOpen}
          activeField={activeField}
          onDepartureClick={() => {
            setActiveField("departure");
            setCalendarOpen(true);
          }}
          onReturnClick={() => {
            setActiveField("return");
            setCalendarOpen(true);
          }}
          onDateSelect={date => {
            const range = date as any;
            if (range?.from) {
              setDepartureDate(range.from);
              if (range.to) {
                setReturnDate(range.to);
              }
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
