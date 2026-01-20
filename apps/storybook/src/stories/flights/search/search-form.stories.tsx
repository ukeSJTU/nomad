import type { Meta, StoryObj } from "@storybook/react";
import type { CityData } from "@ukesjtu/nomad-ui/components/flights/search";
import { SearchForm } from "@ukesjtu/nomad-ui/components/flights/search";
import { fn } from "storybook/test";

const meta = {
  title: "Flights/SearchForm",
  component: SearchForm,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  args: {
    onTripTypeChange: fn(),
    onDepartureCityChange: fn(),
    onArrivalCityChange: fn(),
    onDepartureDateChange: fn(),
    onReturnDateChange: fn(),
    onSeatClassChange: fn(),
    onSwap: fn(),
    onSearch: fn(),
  },
} satisfies Meta<typeof SearchForm>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Mock cities data
 */
const mockCities: CityData[] = [
  {
    iataCode: "SHA",
    name: "上海",
    timezone: "Asia/Shanghai",
    pinyinFirstLetter: "S",
    continent: null,
    isPopular: true,
    displayOrder: 1,
  },
  {
    iataCode: "PEK",
    name: "北京",
    timezone: "Asia/Shanghai",
    pinyinFirstLetter: "B",
    continent: null,
    isPopular: true,
    displayOrder: 2,
  },
  {
    iataCode: "CAN",
    name: "广州",
    timezone: "Asia/Shanghai",
    pinyinFirstLetter: "G",
    continent: null,
    isPopular: true,
    displayOrder: 3,
  },
  {
    iataCode: "SZX",
    name: "深圳",
    timezone: "Asia/Shanghai",
    pinyinFirstLetter: "S",
    continent: null,
    isPopular: true,
    displayOrder: 4,
  },
];

/**
 * Empty form - default state
 */
export const Empty: Story = {
  args: {
    tripType: "one-way",
    departureCity: null,
    arrivalCity: null,
    departureDate: null,
    returnDate: null,
    seatClass: "any",
    cities: mockCities,
    showSearchButton: false,
    cityInputSlot: <div className="p-4 border rounded">City Input Slot</div>,
    dateSelectorSlot: (
      <div className="p-4 border rounded">Date Selector Slot</div>
    ),
  },
};

/**
 * One-way trip with selected cities and date
 */
export const OneWay: Story = {
  args: {
    tripType: "one-way",
    departureCity: mockCities[0],
    arrivalCity: mockCities[1],
    departureDate: new Date("2026-02-15"),
    returnDate: null,
    seatClass: "economy",
    cities: mockCities,
    showSearchButton: false,
    cityInputSlot: (
      <div className="p-4 border rounded">
        <div>上海 → 北京</div>
      </div>
    ),
    dateSelectorSlot: (
      <div className="p-4 border rounded">
        <div>2026-02-15</div>
      </div>
    ),
  },
};

/**
 * Round-trip with all fields filled
 */
export const RoundTrip: Story = {
  args: {
    tripType: "round-trip",
    departureCity: mockCities[0],
    arrivalCity: mockCities[2],
    departureDate: new Date("2026-02-15"),
    returnDate: new Date("2026-02-22"),
    seatClass: "business",
    cities: mockCities,
    showSearchButton: false,
    cityInputSlot: (
      <div className="p-4 border rounded">
        <div>上海 → 广州</div>
      </div>
    ),
    dateSelectorSlot: (
      <div className="p-4 border rounded">
        <div>去程: 2026-02-15</div>
        <div>返程: 2026-02-22</div>
      </div>
    ),
  },
};

/**
 * With search button displayed
 */
export const WithSearchButton: Story = {
  args: {
    tripType: "one-way",
    departureCity: mockCities[0],
    arrivalCity: mockCities[1],
    departureDate: new Date("2026-02-15"),
    returnDate: null,
    seatClass: "any",
    cities: mockCities,
    showSearchButton: true,
    cityInputSlot: (
      <div className="p-4 border rounded">
        <div>上海 → 北京</div>
      </div>
    ),
    dateSelectorSlot: (
      <div className="p-4 border rounded">
        <div>2026-02-15</div>
      </div>
    ),
  },
};

/**
 * First class selection
 */
export const FirstClass: Story = {
  args: {
    tripType: "round-trip",
    departureCity: mockCities[0],
    arrivalCity: mockCities[3],
    departureDate: new Date("2026-03-01"),
    returnDate: new Date("2026-03-10"),
    seatClass: "first",
    cities: mockCities,
    showSearchButton: true,
    cityInputSlot: (
      <div className="p-4 border rounded">
        <div>上海 → 深圳</div>
      </div>
    ),
    dateSelectorSlot: (
      <div className="p-4 border rounded">
        <div>去程: 2026-03-01</div>
        <div>返程: 2026-03-10</div>
      </div>
    ),
  },
};
