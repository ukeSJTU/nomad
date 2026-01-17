import type { CityData } from "@nomad/ui/components/flights/search";
import { FlightSearchHeader } from "@nomad/ui/components/flights/search";
import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "storybook/test";

const meta = {
  title: "Flights/FlightSearchHeader",
  component: FlightSearchHeader,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  args: {
    onTabChange: fn(),
  },
} satisfies Meta<typeof FlightSearchHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Mock cities data
 */
const mockDepartureCity: CityData = {
  iataCode: "SHA",
  name: "上海",
  timezone: "Asia/Shanghai",
  pinyinFirstLetter: "S",
  continent: null,
  isPopular: true,
  displayOrder: 1,
};

const mockArrivalCity: CityData = {
  iataCode: "PEK",
  name: "北京",
  timezone: "Asia/Shanghai",
  pinyinFirstLetter: "B",
  continent: null,
  isPopular: true,
  displayOrder: 2,
};

const mockText = {
  oneWay: "单程",
  tabSelectOutbound: "选择去程",
  tabSelectReturn: "选择返程",
  lastUpdate: "最近更新",
  priceFluctuationNotice: "机票价格变动频繁,搜索结果有效期15min。",
};

const mockRoundTripSteps = {
  outbound: 1,
  return: 2,
};

/**
 * One-way flight search header
 */
export const OneWay: Story = {
  args: {
    tripType: "one-way",
    departureCity: mockDepartureCity,
    arrivalCity: mockArrivalCity,
    formattedDepartureDate: "10月30日 周四",
    formattedLastUpdateTime: "18:11:15",
    text: mockText,
    roundTripSteps: mockRoundTripSteps,
  },
};

/**
 * Round-trip flight search header - outbound tab selected
 */
export const RoundTripOutbound: Story = {
  args: {
    tripType: "round-trip",
    departureCity: mockDepartureCity,
    arrivalCity: mockArrivalCity,
    formattedDepartureDate: "10月30日 周四",
    formattedReturnDate: "11月2日 周日",
    formattedLastUpdateTime: "18:11:15",
    activeTab: "outbound",
    text: mockText,
    roundTripSteps: mockRoundTripSteps,
  },
};

/**
 * Round-trip flight search header - return tab selected
 */
export const RoundTripReturn: Story = {
  args: {
    tripType: "round-trip",
    departureCity: mockDepartureCity,
    arrivalCity: mockArrivalCity,
    formattedDepartureDate: "10月30日 周四",
    formattedReturnDate: "11月2日 周日",
    formattedLastUpdateTime: "18:11:15",
    activeTab: "return",
    text: mockText,
    roundTripSteps: mockRoundTripSteps,
  },
};

/**
 * Round-trip with different cities
 */
export const RoundTripDifferentCities: Story = {
  args: {
    tripType: "round-trip",
    departureCity: {
      iataCode: "CAN",
      name: "广州",
      timezone: "Asia/Shanghai",
      pinyinFirstLetter: "G",
      continent: null,
      isPopular: true,
      displayOrder: 3,
    },
    arrivalCity: {
      iataCode: "SZX",
      name: "深圳",
      timezone: "Asia/Shanghai",
      pinyinFirstLetter: "S",
      continent: null,
      isPopular: true,
      displayOrder: 4,
    },
    formattedDepartureDate: "1月15日 周三",
    formattedReturnDate: "1月20日 周一",
    formattedLastUpdateTime: "09:30:45",
    activeTab: "outbound",
    text: mockText,
    roundTripSteps: mockRoundTripSteps,
  },
};

/**
 * One-way with different time
 */
export const OneWayAfternoon: Story = {
  args: {
    tripType: "one-way",
    departureCity: mockArrivalCity,
    arrivalCity: mockDepartureCity,
    formattedDepartureDate: "12月25日 周四",
    formattedLastUpdateTime: "14:22:33",
    text: mockText,
    roundTripSteps: mockRoundTripSteps,
  },
};
