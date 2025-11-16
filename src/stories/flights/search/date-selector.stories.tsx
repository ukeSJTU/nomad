import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { addDays } from "date-fns";
import { useState } from "react";

import { DateSelector } from "@/components/flights/search/date-selector";

const meta: Meta<typeof DateSelector> = {
  title: "Flights/DateSelector",
  component: DateSelector,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = Omit<StoryObj<typeof meta>, "args">;

export const OneWayTrip: Story = {
  render: () => {
    const [departureDate, setDepartureDate] = useState<Date | null>(null);
    const [returnDate, setReturnDate] = useState<Date | null>(null);
    const [tripType, setTripType] = useState<"one-way" | "round-trip">(
      "one-way"
    );

    return (
      <div className="w-[600px]">
        <DateSelector
          tripType={tripType}
          departureDate={departureDate}
          returnDate={returnDate}
          onDepartureDateChange={setDepartureDate}
          onReturnDateChange={setReturnDate}
          onTripTypeChange={setTripType}
        />
      </div>
    );
  },
};

export const RoundTrip: Story = {
  render: () => {
    const [departureDate, setDepartureDate] = useState<Date | null>(new Date());
    const [returnDate, setReturnDate] = useState<Date | null>(
      addDays(new Date(), 1)
    );
    const [tripType, setTripType] = useState<"one-way" | "round-trip">(
      "round-trip"
    );

    return (
      <div className="w-[600px]">
        <DateSelector
          tripType={tripType}
          departureDate={departureDate}
          returnDate={returnDate}
          onDepartureDateChange={setDepartureDate}
          onReturnDateChange={setReturnDate}
          onTripTypeChange={setTripType}
        />
      </div>
    );
  },
};
