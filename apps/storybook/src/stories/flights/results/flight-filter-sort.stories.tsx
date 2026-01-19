import {
  type AirlineOption,
  FlightFilterSort,
  type FlightFilters,
  type SortOption,
} from "@nomad/ui/components/flights/results";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

const meta = {
  title: "Flights/Results/FlightFilterSort",
  component: FlightFilterSort,
  parameters: {
    layout: "padded",
  },
  argTypes: {
    filters: {
      control: "object",
      description: "Current filter values",
    },
    sortOption: {
      control: "select",
      options: [
        "price-asc",
        "price-desc",
        "duration-asc",
        "duration-desc",
        "departure-asc",
        "departure-desc",
      ],
      description: "Current sort option",
    },
    airlines: {
      control: "object",
      description: "Available airlines to filter",
    },
  },
} satisfies Meta<typeof FlightFilterSort>;

export default meta;
type Story = StoryObj<typeof meta>;

// Mock airlines data
const mockAirlines: AirlineOption[] = [
  { id: "airline-1", name: "中国东方航空", iataCode: "MU" },
  { id: "airline-2", name: "中国南方航空", iataCode: "CZ" },
  { id: "airline-3", name: "中国国际航空", iataCode: "CA" },
  { id: "airline-4", name: "春秋航空", iataCode: "9C" },
  { id: "airline-5", name: "吉祥航空", iataCode: "HO" },
];

// Interactive wrapper component
function InteractiveFlightFilterSort({
  initialFilters,
  initialSortOption,
  airlines,
}: {
  initialFilters?: FlightFilters;
  initialSortOption?: SortOption;
  airlines: AirlineOption[];
}) {
  const [filters, setFilters] = useState<FlightFilters>(
    initialFilters || {
      airlines: [],
      seatClasses: [],
      departureTimeRanges: [],
      arrivalTimeRanges: [],
    }
  );
  const [sortOption, setSortOption] = useState<SortOption>(
    initialSortOption || "price-asc"
  );

  return (
    <div className="w-full max-w-7xl">
      <FlightFilterSort
        filters={filters}
        sortOption={sortOption}
        airlines={airlines}
        onFiltersChange={setFilters}
        onSortChange={setSortOption}
      />
      <div className="mt-6 p-4 border rounded-lg bg-muted/50">
        <h3 className="text-sm font-semibold mb-2">当前过滤条件:</h3>
        <pre className="text-xs overflow-auto">
          {JSON.stringify({ filters, sortOption }, null, 2)}
        </pre>
      </div>
    </div>
  );
}

// Default state - no filters applied
export const Default: Story = {
  render: () => <InteractiveFlightFilterSort airlines={mockAirlines} />,
};

// With airlines selected
export const WithAirlinesSelected: Story = {
  render: () => (
    <InteractiveFlightFilterSort
      airlines={mockAirlines}
      initialFilters={{
        airlines: ["airline-1", "airline-2"],
        seatClasses: [],
        departureTimeRanges: [],
        arrivalTimeRanges: [],
      }}
    />
  ),
};

// With seat classes selected
export const WithSeatClassesSelected: Story = {
  render: () => (
    <InteractiveFlightFilterSort
      airlines={mockAirlines}
      initialFilters={{
        airlines: [],
        seatClasses: ["ECONOMY", "BUSINESS"],
        departureTimeRanges: [],
        arrivalTimeRanges: [],
      }}
    />
  ),
};

// With time ranges selected
export const WithTimeRangesSelected: Story = {
  render: () => (
    <InteractiveFlightFilterSort
      airlines={mockAirlines}
      initialFilters={{
        airlines: [],
        seatClasses: [],
        departureTimeRanges: ["0-6", "6-12"],
        arrivalTimeRanges: ["18-24"],
      }}
    />
  ),
};

// With all filters applied
export const WithAllFiltersApplied: Story = {
  render: () => (
    <InteractiveFlightFilterSort
      airlines={mockAirlines}
      initialFilters={{
        airlines: ["airline-1", "airline-3"],
        seatClasses: ["ECONOMY"],
        departureTimeRanges: ["6-12", "12-18"],
        arrivalTimeRanges: ["18-24"],
      }}
    />
  ),
};

// Sorted by price descending
export const SortedByPriceDesc: Story = {
  render: () => (
    <InteractiveFlightFilterSort
      airlines={mockAirlines}
      initialSortOption="price-desc"
    />
  ),
};

// Sorted by duration ascending
export const SortedByDurationAsc: Story = {
  render: () => (
    <InteractiveFlightFilterSort
      airlines={mockAirlines}
      initialSortOption="duration-asc"
    />
  ),
};

// Sorted by departure time descending
export const SortedByDepartureDesc: Story = {
  render: () => (
    <InteractiveFlightFilterSort
      airlines={mockAirlines}
      initialSortOption="departure-desc"
    />
  ),
};

// With few airlines (edge case)
export const WithFewAirlines: Story = {
  render: () => (
    <InteractiveFlightFilterSort
      airlines={[
        { id: "airline-1", name: "中国东方航空", iataCode: "MU" },
        { id: "airline-2", name: "中国南方航空", iataCode: "CZ" },
      ]}
    />
  ),
};

// With many airlines
export const WithManyAirlines: Story = {
  render: () => (
    <InteractiveFlightFilterSort
      airlines={[
        ...mockAirlines,
        { id: "airline-6", name: "厦门航空", iataCode: "MF" },
        { id: "airline-7", name: "四川航空", iataCode: "3U" },
        { id: "airline-8", name: "海南航空", iataCode: "HU" },
        { id: "airline-9", name: "深圳航空", iataCode: "ZH" },
        { id: "airline-10", name: "山东航空", iataCode: "SC" },
      ]}
    />
  ),
};
