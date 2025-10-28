import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { addDays } from "date-fns";
import { useState } from "react";
import { type DateRange } from "react-day-picker";

import { DateInput, DateSelector } from "@/components/flights/date-selector";

const meta = {
  title: "Flights/DateSelector",
  component: DateSelector,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof DateSelector>;

export default meta;
type Story = Omit<StoryObj<typeof meta>, "args">;

// DateSelector Stories

export const SingleDateSelector: Story = {
  render: () => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [open, setOpen] = useState(false);

    return (
      <div className="w-[400px]">
        <DateSelector
          mode="single"
          title="Select Departure Date"
          selectedDate={selectedDate}
          onSelect={date => setSelectedDate(date as Date)}
          open={open}
          onOpenChange={setOpen}
          minDate={new Date()}
          maxDate={addDays(new Date(), 365)}
        >
          <button
            onClick={() => setOpen(!open)}
            className="px-4 py-2 border rounded-md hover:bg-gray-100"
          >
            {selectedDate
              ? selectedDate.toLocaleDateString()
              : "Click to select date"}
          </button>
        </DateSelector>
        <div className="mt-4 text-sm text-muted-foreground">
          <p>Selected: {selectedDate?.toLocaleDateString() || "None"}</p>
        </div>
      </div>
    );
  },
};

export const RangeDateSelector: Story = {
  render: () => {
    const [selectedRange, setSelectedRange] = useState<DateRange | null>(null);
    const [open, setOpen] = useState(false);

    return (
      <div className="w-[400px]">
        <DateSelector
          mode="range"
          title="Select Date Range"
          selectedRange={selectedRange}
          onSelect={range => setSelectedRange(range as DateRange)}
          open={open}
          onOpenChange={setOpen}
          minDate={new Date()}
          maxDate={addDays(new Date(), 365)}
        >
          <button
            onClick={() => setOpen(!open)}
            className="px-4 py-2 border rounded-md hover:bg-gray-100"
          >
            {selectedRange?.from && selectedRange?.to
              ? `${selectedRange.from.toLocaleDateString()} - ${selectedRange.to.toLocaleDateString()}`
              : "Click to select date range"}
          </button>
        </DateSelector>
        <div className="mt-4 text-sm text-muted-foreground">
          <p>From: {selectedRange?.from?.toLocaleDateString() || "None"}</p>
          <p>To: {selectedRange?.to?.toLocaleDateString() || "None"}</p>
        </div>
      </div>
    );
  },
};

// DateInput Stories

const DateInputMeta = {
  title: "Flights/DateInput",
  component: DateInput,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof DateInput>;

export { DateInputMeta };

export const OneWayTrip: StoryObj<typeof DateInput> = {
  render: () => {
    const [tripType, setTripType] = useState<"one-way" | "round-trip">(
      "one-way"
    );
    const [departureDate, setDepartureDate] = useState<Date | null>(null);
    const [returnDate, setReturnDate] = useState<Date | null>(null);

    return (
      <div className="w-[800px] space-y-4">
        <DateInput
          tripType={tripType}
          departureDate={departureDate}
          returnDate={returnDate}
          onDepartureDateChange={setDepartureDate}
          onReturnDateChange={setReturnDate}
          onTripTypeChange={setTripType}
        />
        <div className="p-4 bg-muted rounded-lg text-sm">
          <p>Trip Type: {tripType}</p>
          <p>
            Departure: {departureDate?.toLocaleDateString() || "Not selected"}
          </p>
          <p>Return: {returnDate?.toLocaleDateString() || "Not selected"}</p>
          <p className="mt-2 text-muted-foreground">
            Click "Add Return Date" to switch to round-trip
          </p>
        </div>
      </div>
    );
  },
};

export const RoundTrip: StoryObj<typeof DateInput> = {
  render: () => {
    const [tripType, setTripType] = useState<"one-way" | "round-trip">(
      "round-trip"
    );
    const [departureDate, setDepartureDate] = useState<Date | null>(null);
    const [returnDate, setReturnDate] = useState<Date | null>(null);

    return (
      <div className="w-[800px] space-y-4">
        <DateInput
          tripType={tripType}
          departureDate={departureDate}
          returnDate={returnDate}
          onDepartureDateChange={setDepartureDate}
          onReturnDateChange={setReturnDate}
          onTripTypeChange={setTripType}
        />
        <div className="p-4 bg-muted rounded-lg text-sm">
          <p>Trip Type: {tripType}</p>
          <p>
            Departure: {departureDate?.toLocaleDateString() || "Not selected"}
          </p>
          <p>Return: {returnDate?.toLocaleDateString() || "Not selected"}</p>
          <p className="mt-2 text-muted-foreground">
            Return date selector auto-opens after selecting departure date
          </p>
        </div>
      </div>
    );
  },
};

export const WithPreselectedDates: StoryObj<typeof DateInput> = {
  render: () => {
    const [tripType, setTripType] = useState<"one-way" | "round-trip">(
      "round-trip"
    );
    const [departureDate, setDepartureDate] = useState<Date | null>(
      addDays(new Date(), 7)
    );
    const [returnDate, setReturnDate] = useState<Date | null>(
      addDays(new Date(), 14)
    );

    return (
      <div className="w-[800px] space-y-4">
        <DateInput
          tripType={tripType}
          departureDate={departureDate}
          returnDate={returnDate}
          onDepartureDateChange={setDepartureDate}
          onReturnDateChange={setReturnDate}
          onTripTypeChange={setTripType}
        />
        <div className="p-4 bg-muted rounded-lg text-sm">
          <p>Trip Type: {tripType}</p>
          <p>
            Departure: {departureDate?.toLocaleDateString() || "Not selected"}
          </p>
          <p>Return: {returnDate?.toLocaleDateString() || "Not selected"}</p>
          <p className="mt-2 text-muted-foreground">
            7-day trip (departure in 7 days, return in 14 days)
          </p>
        </div>
      </div>
    );
  },
};

export const WithCustomDateRange: StoryObj<typeof DateInput> = {
  render: () => {
    const [tripType, setTripType] = useState<"one-way" | "round-trip">(
      "round-trip"
    );
    const [departureDate, setDepartureDate] = useState<Date | null>(null);
    const [returnDate, setReturnDate] = useState<Date | null>(null);

    // Custom min date: 3 days from now
    const minDate = addDays(new Date(), 3);
    // Custom max days: 180 days (6 months)
    const maxDaysInFuture = 180;

    return (
      <div className="w-[800px] space-y-4">
        <DateInput
          tripType={tripType}
          departureDate={departureDate}
          returnDate={returnDate}
          onDepartureDateChange={setDepartureDate}
          onReturnDateChange={setReturnDate}
          onTripTypeChange={setTripType}
          minDate={minDate}
          maxDaysInFuture={maxDaysInFuture}
        />
        <div className="p-4 bg-muted rounded-lg text-sm">
          <p>Trip Type: {tripType}</p>
          <p>
            Departure: {departureDate?.toLocaleDateString() || "Not selected"}
          </p>
          <p>Return: {returnDate?.toLocaleDateString() || "Not selected"}</p>
          <p className="mt-2 text-muted-foreground">
            Custom constraints: Min date is 3 days from now, max is 180 days
          </p>
        </div>
      </div>
    );
  },
};

export const InteractiveSwitching: StoryObj<typeof DateInput> = {
  render: () => {
    const [tripType, setTripType] = useState<"one-way" | "round-trip">(
      "one-way"
    );
    const [departureDate, setDepartureDate] = useState<Date | null>(
      addDays(new Date(), 5)
    );
    const [returnDate, setReturnDate] = useState<Date | null>(null);

    return (
      <div className="w-[800px] space-y-4">
        <div className="flex gap-2">
          <button
            onClick={() => setTripType("one-way")}
            className={`px-4 py-2 rounded-md ${
              tripType === "one-way"
                ? "bg-primary text-primary-foreground"
                : "bg-muted"
            }`}
          >
            One-way
          </button>
          <button
            onClick={() => setTripType("round-trip")}
            className={`px-4 py-2 rounded-md ${
              tripType === "round-trip"
                ? "bg-primary text-primary-foreground"
                : "bg-muted"
            }`}
          >
            Round-trip
          </button>
        </div>
        <DateInput
          tripType={tripType}
          departureDate={departureDate}
          returnDate={returnDate}
          onDepartureDateChange={setDepartureDate}
          onReturnDateChange={setReturnDate}
          onTripTypeChange={setTripType}
        />
        <div className="p-4 bg-muted rounded-lg text-sm">
          <p>Trip Type: {tripType}</p>
          <p>
            Departure: {departureDate?.toLocaleDateString() || "Not selected"}
          </p>
          <p>Return: {returnDate?.toLocaleDateString() || "Not selected"}</p>
          <p className="mt-2 text-muted-foreground">
            Use buttons above or "Add Return Date" to switch trip type
          </p>
        </div>
      </div>
    );
  },
};

// With timezone awareness - demonstrates timezone-aware date calculations
export const WithTimezone: Story = {
  render: () => {
    const [departureDate, setDepartureDate] = useState<Date | null>(null);
    const [returnDate, setReturnDate] = useState<Date | null>(null);
    const [selectedTimezone, setSelectedTimezone] =
      useState<string>("America/New_York");

    const timezones = [
      { label: "New York (EST/EDT)", value: "America/New_York" },
      { label: "Los Angeles (PST/PDT)", value: "America/Los_Angeles" },
      { label: "London (GMT/BST)", value: "Europe/London" },
      { label: "Tokyo (JST)", value: "Asia/Tokyo" },
      { label: "Shanghai (CST)", value: "Asia/Shanghai" },
      { label: "Sydney (AEDT)", value: "Australia/Sydney" },
    ];

    return (
      <div className="w-[600px] space-y-4">
        <div className="p-4 bg-blue-50 rounded-lg text-sm">
          <p className="font-semibold mb-2">Timezone-Aware Date Selection</p>
          <p className="text-muted-foreground">
            Select a timezone to see how "today" changes based on the departure
            city's timezone. This ensures users can't select dates that have
            already passed in their departure city.
          </p>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">
            Departure City Timezone:
          </label>
          <select
            value={selectedTimezone}
            onChange={e => setSelectedTimezone(e.target.value)}
            className="w-full p-2 border rounded-md"
          >
            {timezones.map(tz => (
              <option key={tz.value} value={tz.value}>
                {tz.label}
              </option>
            ))}
          </select>
        </div>

        <DateInput
          tripType="round-trip"
          departureDate={departureDate}
          returnDate={returnDate}
          onDepartureDateChange={setDepartureDate}
          onReturnDateChange={setReturnDate}
          timezone={selectedTimezone}
        />

        <div className="p-4 bg-muted rounded-lg text-sm space-y-2">
          <p className="font-semibold">Current Selection:</p>
          <p>
            Departure: {departureDate?.toLocaleDateString() || "Not selected"}
          </p>
          <p>Return: {returnDate?.toLocaleDateString() || "Not selected"}</p>
          <p className="mt-2 text-muted-foreground">
            Selected Timezone: {selectedTimezone}
          </p>
          <p className="text-muted-foreground text-xs">
            💡 The minimum selectable date is calculated based on "today" in the
            selected timezone, not your local timezone.
          </p>
        </div>
      </div>
    );
  },
};
