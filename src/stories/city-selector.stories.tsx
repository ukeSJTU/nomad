import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";

import { CityInput, CitySelector } from "@/components/flights/city-selector";
import { Button } from "@/components/ui/button";
import type { CityData } from "@/lib/queries/cities";

// Mock city data for Storybook
const mockCities: CityData[] = [
  // Domestic popular cities
  {
    iataCode: "PEK",
    name: "北京",
    pinyinFirstLetter: "B",
    continent: null,
    isPopular: true,
    displayOrder: 1,
  },
  {
    iataCode: "SHA",
    name: "上海",
    pinyinFirstLetter: "S",
    continent: null,
    isPopular: true,
    displayOrder: 2,
  },
  {
    iataCode: "CAN",
    name: "广州",
    pinyinFirstLetter: "G",
    continent: null,
    isPopular: true,
    displayOrder: 3,
  },
  {
    iataCode: "SZX",
    name: "深圳",
    pinyinFirstLetter: "S",
    continent: null,
    isPopular: true,
    displayOrder: 4,
  },
  {
    iataCode: "CTU",
    name: "成都",
    pinyinFirstLetter: "C",
    continent: null,
    isPopular: true,
    displayOrder: 5,
  },
  {
    iataCode: "HGH",
    name: "杭州",
    pinyinFirstLetter: "H",
    continent: null,
    isPopular: true,
    displayOrder: 6,
  },
  // More domestic cities
  {
    iataCode: "XIY",
    name: "西安",
    pinyinFirstLetter: "X",
    continent: null,
    isPopular: false,
    displayOrder: 10,
  },
  {
    iataCode: "WUH",
    name: "武汉",
    pinyinFirstLetter: "W",
    continent: null,
    isPopular: false,
    displayOrder: 11,
  },
  {
    iataCode: "NKG",
    name: "南京",
    pinyinFirstLetter: "N",
    continent: null,
    isPopular: false,
    displayOrder: 12,
  },
  {
    iataCode: "KMG",
    name: "昆明",
    pinyinFirstLetter: "K",
    continent: null,
    isPopular: false,
    displayOrder: 13,
  },
  // International popular cities
  {
    iataCode: "TYO",
    name: "东京",
    pinyinFirstLetter: null,
    continent: "Asia",
    isPopular: true,
    displayOrder: 100,
  },
  {
    iataCode: "NYC",
    name: "纽约",
    pinyinFirstLetter: null,
    continent: "America",
    isPopular: true,
    displayOrder: 101,
  },
  {
    iataCode: "LON",
    name: "伦敦",
    pinyinFirstLetter: null,
    continent: "Europe",
    isPopular: true,
    displayOrder: 102,
  },
  {
    iataCode: "PAR",
    name: "巴黎",
    pinyinFirstLetter: null,
    continent: "Europe",
    isPopular: true,
    displayOrder: 103,
  },
  {
    iataCode: "SIN",
    name: "新加坡",
    pinyinFirstLetter: null,
    continent: "Asia",
    isPopular: true,
    displayOrder: 104,
  },
  // More international cities
  {
    iataCode: "SYD",
    name: "悉尼",
    pinyinFirstLetter: null,
    continent: "Oceania",
    isPopular: false,
    displayOrder: 200,
  },
  {
    iataCode: "DXB",
    name: "迪拜",
    pinyinFirstLetter: null,
    continent: "Asia",
    isPopular: false,
    displayOrder: 201,
  },
  {
    iataCode: "LAX",
    name: "洛杉矶",
    pinyinFirstLetter: null,
    continent: "America",
    isPopular: false,
    displayOrder: 202,
  },
  {
    iataCode: "CAI",
    name: "开罗",
    pinyinFirstLetter: null,
    continent: "Africa",
    isPopular: false,
    displayOrder: 203,
  },
];

// Create a promise that resolves with mock data
const mockCitiesPromise = Promise.resolve(mockCities);

const meta = {
  title: "Flights/CitySelector",
  component: CitySelector,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof CitySelector>;

export default meta;
type Story = Omit<StoryObj<typeof meta>, "args">;

// Story with controlled state
export const Default: Story = {
  render: () => {
    const [selectedCity, setSelectedCity] = useState<CityData | null>(null);

    return (
      <CitySelector
        onSelect={setSelectedCity}
        title="选择城市"
        selectedCity={selectedCity}
        citiesPromise={mockCitiesPromise}
      >
        <Button>
          {selectedCity
            ? `${selectedCity.name} (${selectedCity.iataCode})`
            : "选择城市"}
        </Button>
      </CitySelector>
    );
  },
};

// Story with pre-selected city
export const WithSelectedCity: Story = {
  render: () => {
    const [selectedCity, setSelectedCity] = useState<CityData | null>(
      mockCities[0]
    );

    return (
      <CitySelector
        onSelect={setSelectedCity}
        title="选择出发城市"
        selectedCity={selectedCity}
        citiesPromise={mockCitiesPromise}
      >
        <Button>
          {selectedCity
            ? `${selectedCity.name} (${selectedCity.iataCode})`
            : "选择城市"}
        </Button>
      </CitySelector>
    );
  },
};

// Story showing CityInput component
export const CityInputExample: Story = {
  render: () => {
    const [departureCity, setDepartureCity] = useState<CityData | null>(null);
    const [arrivalCity, setArrivalCity] = useState<CityData | null>(null);

    const handleSwap = () => {
      const temp = departureCity;
      setDepartureCity(arrivalCity);
      setArrivalCity(temp);
    };

    return (
      <div className="w-[600px]">
        <CityInput
          departureCity={departureCity}
          arrivalCity={arrivalCity}
          onDepartureCityChange={setDepartureCity}
          onArrivalCityChange={setArrivalCity}
          onSwap={handleSwap}
          citiesPromise={mockCitiesPromise}
        />
      </div>
    );
  },
};

// Story with pre-filled cities
export const CityInputWithCities: Story = {
  render: () => {
    const [departureCity, setDepartureCity] = useState<CityData | null>(
      mockCities[0]
    );
    const [arrivalCity, setArrivalCity] = useState<CityData | null>(
      mockCities[9]
    );

    const handleSwap = () => {
      const temp = departureCity;
      setDepartureCity(arrivalCity);
      setArrivalCity(temp);
    };

    return (
      <div className="w-[600px]">
        <CityInput
          departureCity={departureCity}
          arrivalCity={arrivalCity}
          onDepartureCityChange={setDepartureCity}
          onArrivalCityChange={setArrivalCity}
          onSwap={handleSwap}
          citiesPromise={mockCitiesPromise}
        />
      </div>
    );
  },
};
