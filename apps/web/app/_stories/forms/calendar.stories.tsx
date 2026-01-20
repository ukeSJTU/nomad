import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Calendar } from "@ukesjtu/nomad-ui/components/primitives/calendar";
import { useState } from "react";
import type { DateRange } from "react-day-picker";

// Wrapper component for single date selection
function SingleCalendar() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <div className="p-4">
      <Calendar mode="single" selected={date} onSelect={setDate} />
    </div>
  );
}

// Wrapper component for range selection
function RangeCalendar() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(2024, 0, 20),
    to: new Date(2024, 0, 25),
  });

  return (
    <div className="p-4">
      <Calendar
        mode="range"
        selected={dateRange}
        onSelect={setDateRange}
        numberOfMonths={2}
      />
    </div>
  );
}

// Wrapper component for multiple date selection
function MultipleCalendar() {
  const [dates, setDates] = useState<Date[] | undefined>([
    new Date(2024, 0, 10),
    new Date(2024, 0, 15),
    new Date(2024, 0, 20),
  ]);

  return (
    <div className="p-4">
      <Calendar mode="multiple" selected={dates} onSelect={setDates} />
    </div>
  );
}

// Wrapper component with disabled dates
function CalendarWithDisabledDates() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  const disabledDays = [
    { from: new Date(2024, 0, 1), to: new Date(2024, 0, 5) },
    new Date(2024, 0, 15),
    { dayOfWeek: [0, 6] }, // Disable weekends
  ];

  return (
    <div className="p-4">
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        disabled={disabledDays}
      />
    </div>
  );
}

// Wrapper component with dropdown navigation
function CalendarWithDropdown() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <div className="p-4">
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        captionLayout="dropdown"
        startMonth={new Date(2020, 0)}
        endMonth={new Date(2030, 11)}
      />
    </div>
  );
}

const meta = {
  title: "Forms/Calendar",
  component: Calendar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Calendar>;

export default meta;
type Story = Omit<StoryObj<typeof meta>, "args">;

// Single date selection
export const SingleDate: Story = {
  render: () => <SingleCalendar />,
};

// Range selection with two months
export const RangeSelection: Story = {
  render: () => <RangeCalendar />,
};

// Multiple dates selection
export const MultipleDates: Story = {
  render: () => <MultipleCalendar />,
};

// With disabled dates
export const WithDisabledDates: Story = {
  render: () => <CalendarWithDisabledDates />,
};

// With dropdown navigation
export const WithDropdownNavigation: Story = {
  render: () => <CalendarWithDropdown />,
};

// Static calendar (no selection)
export const Static: Story = {
  render: () => (
    <div className="p-4">
      <Calendar mode="single" />
    </div>
  ),
};

// Default calendar with basic props
export const Default: Story = {
  render: () => (
    <div className="p-4">
      <Calendar mode="single" showOutsideDays={true} />
    </div>
  ),
};

// Calendar with custom button variant
export const WithGhostButtons: Story = {
  render: () => {
    const [date, setDate] = useState<Date | undefined>(new Date());
    return (
      <div className="p-4">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          buttonVariant="ghost"
        />
      </div>
    );
  },
};
