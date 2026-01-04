import { DatePriceSelector } from "@nomad/ui/components/flights/search/date-price-selector";
import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "storybook/test";

const meta = {
  title: "Demo/DatePriceSelector",
  component: DatePriceSelector,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  args: {
    onPrevRange: fn(),
    onNextRange: fn(),
    onSelect: fn(),
  },
} satisfies Meta<typeof DatePriceSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Helper function to create mock price data
 */
const createMockPrices = (count = 7) => {
  const baseDate = new Date(2026, 0, 15); // January 15, 2026
  return Array.from({ length: count }, (_, index) => {
    const date = new Date(baseDate);
    date.setDate(date.getDate() + index);

    // Simulate some unavailable dates (null prices)
    const lowestPrice =
      index % 5 === 0 ? null : Math.floor(500 + Math.random() * 1000);

    return {
      date: date.toISOString().split("T")[0],
      formattedDate: `${date.getMonth() + 1}/${date.getDate()}`,
      lowestPrice,
      formattedPrice: lowestPrice ? `¥${lowestPrice}` : "无",
      selected: index === 2, // Select the middle date by default
    };
  });
};

/**
 * Helper function to create mock round-trip prices
 */
const createMockRoundTripPrices = (count = 7) => {
  const baseDate = new Date(2026, 0, 15); // January 15, 2026
  const returnBaseDate = new Date(2026, 0, 20); // January 20, 2026

  return Array.from({ length: count }, (_, index) => {
    const date = new Date(baseDate);
    date.setDate(date.getDate() + index);

    const returnDate = new Date(returnBaseDate);
    returnDate.setDate(returnDate.getDate() + index);

    // Simulate some unavailable dates (null prices)
    const lowestPrice =
      index % 5 === 0 ? null : Math.floor(1200 + Math.random() * 2000);

    return {
      date: date.toISOString().split("T")[0],
      formattedDate: `${date.getMonth() + 1}/${date.getDate()}`,
      returnDate: returnDate.toISOString().split("T")[0],
      formattedReturnDate: `${returnDate.getMonth() + 1}/${returnDate.getDate()}`,
      lowestPrice,
      formattedPrice: lowestPrice ? `¥${lowestPrice}` : "无",
      selected: index === 2, // Select the middle date by default
    };
  });
};

/**
 * Default one-way flight date selector with prices
 */
export const OneWay: Story = {
  args: {
    prices: createMockPrices(),
    loading: false,
    isPending: false,
    canPrev: true,
    canNext: true,
    tripType: "one-way",
  },
};

/**
 * Round-trip flight date selector with return dates
 */
export const RoundTrip: Story = {
  args: {
    prices: createMockRoundTripPrices(),
    loading: false,
    isPending: false,
    canPrev: true,
    canNext: true,
    tripType: "round-trip",
  },
};

/**
 * Loading state showing skeletons
 */
export const Loading: Story = {
  args: {
    prices: [],
    loading: true,
    isPending: false,
    canPrev: false,
    canNext: false,
    tripType: "one-way",
  },
};

/**
 * Pending state (user clicked, waiting for response)
 */
export const Pending: Story = {
  args: {
    prices: createMockPrices(),
    loading: false,
    isPending: true,
    canPrev: true,
    canNext: true,
    tripType: "one-way",
  },
};

/**
 * All dates unavailable
 */
export const AllUnavailable: Story = {
  args: {
    prices: createMockPrices().map(price => ({
      ...price,
      lowestPrice: null,
      formattedPrice: "无",
      selected: false,
    })),
    loading: false,
    isPending: false,
    canPrev: true,
    canNext: true,
    tripType: "one-way",
  },
};

/**
 * Cannot go to previous dates
 */
export const NoPrevious: Story = {
  args: {
    prices: createMockPrices(),
    loading: false,
    isPending: false,
    canPrev: false,
    canNext: true,
    tripType: "one-way",
  },
};

/**
 * Cannot go to next dates
 */
export const NoNext: Story = {
  args: {
    prices: createMockPrices(),
    loading: false,
    isPending: false,
    canPrev: true,
    canNext: false,
    tripType: "one-way",
  },
};

/**
 * No navigation available (first and last range)
 */
export const NoNavigation: Story = {
  args: {
    prices: createMockPrices(),
    loading: false,
    isPending: false,
    canPrev: false,
    canNext: false,
    tripType: "one-way",
  },
};

/**
 * Wide range of prices
 */
export const WidePriceRange: Story = {
  args: {
    prices: [
      {
        date: "2026-01-15",
        formattedDate: "1/15",
        lowestPrice: 299,
        formattedPrice: "¥299",
        selected: false,
      },
      {
        date: "2026-01-16",
        formattedDate: "1/16",
        lowestPrice: 499,
        formattedPrice: "¥499",
        selected: false,
      },
      {
        date: "2026-01-17",
        formattedDate: "1/17",
        lowestPrice: 799,
        formattedPrice: "¥799",
        selected: true,
      },
      {
        date: "2026-01-18",
        formattedDate: "1/18",
        lowestPrice: 1299,
        formattedPrice: "¥1299",
        selected: false,
      },
      {
        date: "2026-01-19",
        formattedDate: "1/19",
        lowestPrice: 1999,
        formattedPrice: "¥1999",
        selected: false,
      },
      {
        date: "2026-01-20",
        formattedDate: "1/20",
        lowestPrice: null,
        formattedPrice: "无",
        selected: false,
      },
      {
        date: "2026-01-21",
        formattedDate: "1/21",
        lowestPrice: 599,
        formattedPrice: "¥599",
        selected: false,
      },
    ],
    loading: false,
    isPending: false,
    canPrev: true,
    canNext: true,
    tripType: "one-way",
  },
};
