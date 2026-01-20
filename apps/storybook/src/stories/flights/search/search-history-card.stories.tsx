import type { Meta, StoryObj } from "@storybook/react";
import { SearchHistoryCard } from "@ukesjtu/nomad-ui/components/flights/search";

const meta = {
  title: "Flights/Search/SearchHistoryCard",
  component: SearchHistoryCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof SearchHistoryCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockOneWayRecord = {
  id: "1",
  departureCityIata: "PEK",
  departureCityName: "北京",
  arrivalCityIata: "SHA",
  arrivalCityName: "上海",
  tripType: "one-way" as const,
  departureDate: "2025-10-30",
  returnDate: null,
  seatClass: "economy",
  lowestPriceAtSearch: "1000.00",
  currentLowestPrice: "900.00",
  lastSearchedAt: new Date("2025-10-20"),
};

const mockRoundTripRecord = {
  id: "2",
  departureCityIata: "SHA",
  departureCityName: "上海",
  arrivalCityIata: "CAN",
  arrivalCityName: "广州",
  tripType: "round-trip" as const,
  departureDate: "2025-11-01",
  returnDate: "2025-11-05",
  seatClass: "business",
  lowestPriceAtSearch: "2000.00",
  currentLowestPrice: "2100.00",
  lastSearchedAt: new Date("2025-10-21"),
};

export const OneWayDecreased: Story = {
  args: {
    record: mockOneWayRecord,
    formattedPrice: "900",
    priceStatus: {
      label: "已降价",
      colorClass: "bg-green-100 text-green-700",
    },
    formattedDate: "2025-10-30 周四",
    onClick: () => console.log("Navigate to search page"),
  },
};

export const RoundTripIncreased: Story = {
  args: {
    record: mockRoundTripRecord,
    formattedPrice: "2,100",
    priceStatus: {
      label: "已涨价",
      colorClass: "bg-red-100 text-red-700",
    },
    formattedDate: "11-01 去  11-05 回",
    onClick: () => console.log("Navigate to search page"),
  },
};

export const PriceStable: Story = {
  args: {
    record: {
      ...mockOneWayRecord,
      currentLowestPrice: "1000.00",
    },
    formattedPrice: "1,000",
    priceStatus: {
      label: "价格稳定",
      colorClass: "bg-gray-100 text-gray-600",
    },
    formattedDate: "2025-10-30 周四",
    onClick: () => console.log("Navigate to search page"),
  },
};

export const NoPrice: Story = {
  args: {
    record: {
      ...mockOneWayRecord,
      currentLowestPrice: null,
    },
    formattedPrice: "0",
    priceStatus: null,
    formattedDate: "2025-10-30 周四",
    onClick: () => console.log("Navigate to search page"),
  },
};

export const NoPriceStatus: Story = {
  args: {
    record: mockOneWayRecord,
    formattedPrice: "900",
    priceStatus: null,
    formattedDate: "2025-10-30 周四",
    onClick: () => console.log("Navigate to search page"),
  },
};
