import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { FlightSearchHistoryCard } from "@/components/flights/search/search-history";
import type { SearchHistoryRecord } from "@/types/dto";

const meta = {
  title: "Flights/Search/FlightSearchHistoryCard",
  component: FlightSearchHistoryCard,
  parameters: {
    layout: "centered",
    nextjs: {
      appDirectory: true,
    },
  },
  tags: ["autodocs"],
  argTypes: {
    record: {
      description: "Search history record data",
    },
    onClick: {
      description: "Optional click handler",
      action: "clicked",
    },
  },
} satisfies Meta<typeof FlightSearchHistoryCard>;

export default meta;
type Story = StoryObj<typeof meta>;
type StoryWithRender = Omit<StoryObj<typeof meta>, "args">;

// Mock data for stories
const baseRecord: SearchHistoryRecord = {
  id: "1",
  departureCityIata: "SHA",
  departureCityName: "上海",
  arrivalCityIata: "BJS",
  arrivalCityName: "北京",
  tripType: "one-way",
  departureDate: "2025-10-30", // Thursday
  returnDate: null,
  seatClass: "economy",
  lowestPriceAtSearch: "1200.00",
  currentLowestPrice: "1200.00",
  lastSearchedAt: new Date("2025-10-30T10:00:00Z"),
};

// Default one-way flight (shows "2025-10-30 周四")
export const OneWayFlight: Story = {
  args: {
    record: baseRecord,
    onClick: () => console.log("Clicked: One-way flight to Beijing"),
  },
};

// Round-trip flight (shows "10-30 去  11-02 回" and left-right arrow icon)
export const RoundTripFlight: Story = {
  args: {
    record: {
      ...baseRecord,
      id: "2",
      tripType: "round-trip",
      departureDate: "2025-10-30",
      returnDate: "2025-11-02",
      lowestPriceAtSearch: "2400.00",
      currentLowestPrice: "2400.00",
    },
    onClick: () => console.log("Clicked: Round-trip flight"),
  },
};

// Price decreased
export const PriceDecreased: Story = {
  args: {
    record: {
      ...baseRecord,
      id: "3",
      lowestPriceAtSearch: "1500.00",
      currentLowestPrice: "1200.00",
    },
    onClick: () => console.log("Clicked: Price decreased flight"),
  },
};

// Price increased
export const PriceIncreased: Story = {
  args: {
    record: {
      ...baseRecord,
      id: "4",
      lowestPriceAtSearch: "1200.00",
      currentLowestPrice: "1500.00",
    },
    onClick: () => console.log("Clicked: Price increased flight"),
  },
};

// Different route
export const DifferentRoute: Story = {
  args: {
    record: {
      ...baseRecord,
      id: "5",
      departureCityName: "深圳",
      arrivalCityName: "成都",
      departureCityIata: "SZX",
      arrivalCityIata: "CTU",
    },
    onClick: () => console.log("Clicked: Different route flight"),
  },
};

// Business class
export const BusinessClass: Story = {
  args: {
    record: {
      ...baseRecord,
      id: "6",
      seatClass: "business",
      lowestPriceAtSearch: "3500.00",
      currentLowestPrice: "3200.00",
    },
    onClick: () => console.log("Clicked: Business class flight"),
  },
};

// First class
export const FirstClass: Story = {
  args: {
    record: {
      ...baseRecord,
      id: "7",
      seatClass: "first",
      lowestPriceAtSearch: "8000.00",
      currentLowestPrice: "8000.00",
    },
    onClick: () => console.log("Clicked: First class flight"),
  },
};

// No price data
export const NoPriceData: Story = {
  args: {
    record: {
      ...baseRecord,
      id: "8",
      lowestPriceAtSearch: null,
      currentLowestPrice: null,
    },
    onClick: () => console.log("Clicked: No price data flight"),
  },
};

// Long city names
export const LongCityNames: Story = {
  args: {
    record: {
      ...baseRecord,
      id: "9",
      departureCityName: "乌鲁木齐",
      arrivalCityName: "哈尔滨",
      departureCityIata: "URC",
      arrivalCityIata: "HRB",
    },
    onClick: () => console.log("Clicked: Long city names flight"),
  },
};

// Multiple cards in a list
export const MultipleCards: StoryWithRender = {
  render: () => (
    <div className="w-full max-w-4xl space-y-3 p-4">
      <FlightSearchHistoryCard
        record={{
          ...baseRecord,
          id: "1",
          lowestPriceAtSearch: "1500.00",
          currentLowestPrice: "1200.00",
        }}
        onClick={() => console.log("Clicked: Card 1")}
      />
      <FlightSearchHistoryCard
        record={{
          ...baseRecord,
          id: "2",
          departureCityName: "北京",
          arrivalCityName: "广州",
          departureCityIata: "BJS",
          arrivalCityIata: "CAN",
          tripType: "round-trip",
          returnDate: "2025-11-10",
          lowestPriceAtSearch: "2400.00",
          currentLowestPrice: "2600.00",
        }}
        onClick={() => console.log("Clicked: Card 2")}
      />
      <FlightSearchHistoryCard
        record={{
          ...baseRecord,
          id: "3",
          departureCityName: "深圳",
          arrivalCityName: "成都",
          departureCityIata: "SZX",
          arrivalCityIata: "CTU",
          seatClass: "business",
          lowestPriceAtSearch: "3200.00",
          currentLowestPrice: "3200.00",
        }}
        onClick={() => console.log("Clicked: Card 3")}
      />
    </div>
  ),
};
