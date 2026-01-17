import { SearchHistorySection } from "@nomad/ui/components/flights/search";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Flights/Search/SearchHistorySection",
  component: SearchHistorySection,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof SearchHistorySection>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockSearchHistory = [
  {
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
  },
  {
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
  },
  {
    id: "3",
    departureCityIata: "CAN",
    departureCityName: "广州",
    arrivalCityIata: "SZX",
    arrivalCityName: "深圳",
    tripType: "one-way" as const,
    departureDate: "2025-11-10",
    returnDate: null,
    seatClass: "economy",
    lowestPriceAtSearch: "500.00",
    currentLowestPrice: "500.00",
    lastSearchedAt: new Date("2025-10-22"),
  },
];

const formatPrice = (price: string) => {
  const num = Math.round(Number.parseFloat(price));
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const formatDate = (
  date: string,
  tripType: "one-way" | "round-trip",
  returnDate?: string | null
) => {
  if (tripType === "one-way") {
    return `${date} 周四`;
  }
  const [, month, day] = date.split("-");
  const departure = `${month}-${day} 去`;

  if (returnDate) {
    const [, retMonth, retDay] = returnDate.split("-");
    const ret = `${retMonth}-${retDay} 回`;
    return `${departure}  ${ret}`;
  }

  return departure;
};

const getPriceStatus = (
  lowestPriceAtSearch: string | null,
  currentLowestPrice: string | null
) => {
  if (!lowestPriceAtSearch || !currentLowestPrice) return null;

  const original = Number.parseFloat(lowestPriceAtSearch);
  const current = Number.parseFloat(currentLowestPrice);

  if (current < original) {
    return { label: "已降价", colorClass: "bg-green-100 text-green-700" };
  } else if (current > original) {
    return { label: "已涨价", colorClass: "bg-red-100 text-red-700" };
  } else {
    return { label: "价格稳定", colorClass: "bg-gray-100 text-gray-600" };
  }
};

export const Default: Story = {
  args: {
    searchHistory: mockSearchHistory,
    formatPrice,
    formatDate,
    getPriceStatus,
    onHistoryClick: record => console.log("Navigate to:", record),
    onClearHistory: () => console.log("Clear history"),
    isClearing: false,
  },
};

export const Empty: Story = {
  args: {
    searchHistory: [],
    formatPrice,
    formatDate,
    getPriceStatus,
    onHistoryClick: record => console.log("Navigate to:", record),
    onClearHistory: () => console.log("Clear history"),
    isClearing: false,
  },
};

export const Clearing: Story = {
  args: {
    searchHistory: mockSearchHistory,
    formatPrice,
    formatDate,
    getPriceStatus,
    onHistoryClick: record => console.log("Navigate to:", record),
    onClearHistory: () => console.log("Clear history"),
    isClearing: true,
  },
};

export const SingleRecord: Story = {
  args: {
    searchHistory: [mockSearchHistory[0]],
    formatPrice,
    formatDate,
    getPriceStatus,
    onHistoryClick: record => console.log("Navigate to:", record),
    onClearHistory: () => console.log("Clear history"),
    isClearing: false,
  },
};

export const ManyRecords: Story = {
  args: {
    searchHistory: [
      ...mockSearchHistory,
      {
        id: "4",
        departureCityIata: "SZX",
        departureCityName: "深圳",
        arrivalCityIata: "HKG",
        arrivalCityName: "香港",
        tripType: "one-way" as const,
        departureDate: "2025-11-15",
        returnDate: null,
        seatClass: "economy",
        lowestPriceAtSearch: "300.00",
        currentLowestPrice: "280.00",
        lastSearchedAt: new Date("2025-10-23"),
      },
      {
        id: "5",
        departureCityIata: "HKG",
        departureCityName: "香港",
        arrivalCityIata: "TPE",
        arrivalCityName: "台北",
        tripType: "round-trip" as const,
        departureDate: "2025-12-01",
        returnDate: "2025-12-05",
        seatClass: "business",
        lowestPriceAtSearch: "3000.00",
        currentLowestPrice: "3200.00",
        lastSearchedAt: new Date("2025-10-24"),
      },
    ],
    formatPrice,
    formatDate,
    getPriceStatus,
    onHistoryClick: record => console.log("Navigate to:", record),
    onClearHistory: () => console.log("Clear history"),
    isClearing: false,
  },
};
