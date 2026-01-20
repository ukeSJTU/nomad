import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import type { CityData } from "@ukesjtu/nomad-ui/components/flights/search";
import { CityInput } from "@ukesjtu/nomad-ui/components/flights/search";
import { useState } from "react";

// Mock city data for Storybook
const mockCities: CityData[] = [
  // Domestic popular cities
  {
    iataCode: "PEK",
    name: "北京",
    timezone: "Asia/Shanghai",
    pinyinFirstLetter: "B",
    continent: null,
    isPopular: true,
    displayOrder: 1,
  },
  {
    iataCode: "SHA",
    name: "上海",
    timezone: "Asia/Shanghai",
    pinyinFirstLetter: "S",
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
  {
    iataCode: "CTU",
    name: "成都",
    timezone: "Asia/Shanghai",
    pinyinFirstLetter: "C",
    continent: null,
    isPopular: true,
    displayOrder: 5,
  },
  {
    iataCode: "HGH",
    name: "杭州",
    timezone: "Asia/Shanghai",
    pinyinFirstLetter: "H",
    continent: null,
    isPopular: true,
    displayOrder: 6,
  },
  // More domestic cities
  {
    iataCode: "XIY",
    name: "西安",
    timezone: "Asia/Shanghai",
    pinyinFirstLetter: "X",
    continent: null,
    isPopular: false,
    displayOrder: 10,
  },
  {
    iataCode: "WUH",
    name: "武汉",
    timezone: "Asia/Shanghai",
    pinyinFirstLetter: "W",
    continent: null,
    isPopular: false,
    displayOrder: 11,
  },
  {
    iataCode: "NKG",
    name: "南京",
    timezone: "Asia/Shanghai",
    pinyinFirstLetter: "N",
    continent: null,
    isPopular: false,
    displayOrder: 12,
  },
  {
    iataCode: "KMG",
    name: "昆明",
    timezone: "Asia/Shanghai",
    pinyinFirstLetter: "K",
    continent: null,
    isPopular: false,
    displayOrder: 13,
  },
  // International popular cities
  {
    iataCode: "TYO",
    name: "东京",
    timezone: "Asia/Tokyo",
    pinyinFirstLetter: null,
    continent: "Asia",
    isPopular: true,
    displayOrder: 100,
  },
  {
    iataCode: "NYC",
    name: "纽约",
    timezone: "America/New_York",
    pinyinFirstLetter: null,
    continent: "America",
    isPopular: true,
    displayOrder: 101,
  },
  {
    iataCode: "LON",
    name: "伦敦",
    timezone: "Europe/London",
    pinyinFirstLetter: null,
    continent: "Europe",
    isPopular: true,
    displayOrder: 102,
  },
  {
    iataCode: "PAR",
    name: "巴黎",
    timezone: "Europe/Paris",
    pinyinFirstLetter: null,
    continent: "Europe",
    isPopular: true,
    displayOrder: 103,
  },
  {
    iataCode: "SIN",
    name: "新加坡",
    timezone: "Asia/Singapore",
    pinyinFirstLetter: null,
    continent: "Asia",
    isPopular: true,
    displayOrder: 104,
  },
  // More international cities
  {
    iataCode: "SYD",
    name: "悉尼",
    timezone: "Australia/Sydney",
    pinyinFirstLetter: null,
    continent: "Oceania",
    isPopular: false,
    displayOrder: 200,
  },
  {
    iataCode: "DXB",
    name: "迪拜",
    timezone: "Asia/Dubai",
    pinyinFirstLetter: null,
    continent: "Asia",
    isPopular: false,
    displayOrder: 201,
  },
  {
    iataCode: "LAX",
    name: "洛杉矶",
    timezone: "America/Los_Angeles",
    pinyinFirstLetter: null,
    continent: "America",
    isPopular: false,
    displayOrder: 202,
  },
  {
    iataCode: "CAI",
    name: "开罗",
    timezone: "Africa/Cairo",
    pinyinFirstLetter: null,
    continent: "Africa",
    isPopular: false,
    displayOrder: 203,
  },
];

const meta = {
  title: "Flights/Search/CityInput",
  component: CityInput,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof CityInput>;

export default meta;
type Story = Omit<StoryObj<typeof meta>, "args">;

// Default state: no cities selected
export const Default: Story = {
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
          cities={mockCities}
        />
        <div className="mt-4 text-sm text-muted-foreground">
          <p>
            💡 Tip: Arrival selector auto-opens after selecting departure city
          </p>
        </div>
      </div>
    );
  },
};

// With departure city pre-selected
export const WithDepartureCity: Story = {
  render: () => {
    const [departureCity, setDepartureCity] = useState<CityData | null>(
      mockCities[0] // Beijing
    );
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
          cities={mockCities}
        />
        <div className="mt-4 text-sm text-muted-foreground">
          <p>Departure: {departureCity?.name}</p>
          <p>Arrival: Not selected</p>
        </div>
      </div>
    );
  },
};

// With arrival city pre-selected
export const WithArrivalCity: Story = {
  render: () => {
    const [departureCity, setDepartureCity] = useState<CityData | null>(null);
    const [arrivalCity, setArrivalCity] = useState<CityData | null>(
      mockCities[1] // Shanghai
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
          cities={mockCities}
        />
        <div className="mt-4 text-sm text-muted-foreground">
          <p>Departure: Not selected</p>
          <p>Arrival: {arrivalCity?.name}</p>
        </div>
      </div>
    );
  },
};

// Both cities pre-selected (domestic cities)
export const WithBothCitiesDomestic: Story = {
  render: () => {
    const [departureCity, setDepartureCity] = useState<CityData | null>(
      mockCities[0] // Beijing
    );
    const [arrivalCity, setArrivalCity] = useState<CityData | null>(
      mockCities[1] // Shanghai
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
          cities={mockCities}
        />
        <div className="mt-4 text-sm text-muted-foreground">
          <p>
            Departure: {departureCity?.name} ({departureCity?.iataCode})
          </p>
          <p>
            Arrival: {arrivalCity?.name} ({arrivalCity?.iataCode})
          </p>
          <p className="mt-2">💡 Click the swap button to exchange cities</p>
        </div>
      </div>
    );
  },
};

// Both cities pre-selected (international cities)
export const WithBothCitiesInternational: Story = {
  render: () => {
    const [departureCity, setDepartureCity] = useState<CityData | null>(
      mockCities[10] // Tokyo
    );
    const [arrivalCity, setArrivalCity] = useState<CityData | null>(
      mockCities[11] // New York
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
          cities={mockCities}
        />
        <div className="mt-4 text-sm text-muted-foreground">
          <p>
            Departure: {departureCity?.name} ({departureCity?.iataCode})
          </p>
          <p>
            Arrival: {arrivalCity?.name} ({arrivalCity?.iataCode})
          </p>
          <p className="mt-2">🌍 International flight example</p>
        </div>
      </div>
    );
  },
};

// Mixed: domestic to international
export const DomesticToInternational: Story = {
  render: () => {
    const [departureCity, setDepartureCity] = useState<CityData | null>(
      mockCities[0] // Beijing
    );
    const [arrivalCity, setArrivalCity] = useState<CityData | null>(
      mockCities[10] // Tokyo
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
          cities={mockCities}
        />
        <div className="mt-4 text-sm text-muted-foreground">
          <p>
            Departure: {departureCity?.name} ({departureCity?.iataCode}) -
            Domestic
          </p>
          <p>
            Arrival: {arrivalCity?.name} ({arrivalCity?.iataCode}) -
            International
          </p>
        </div>
      </div>
    );
  },
};

// Without swap button
export const WithoutSwapButton: Story = {
  render: () => {
    const [departureCity, setDepartureCity] = useState<CityData | null>(
      mockCities[0]
    );
    const [arrivalCity, setArrivalCity] = useState<CityData | null>(
      mockCities[1]
    );

    return (
      <div className="w-[600px]">
        <CityInput
          departureCity={departureCity}
          arrivalCity={arrivalCity}
          onDepartureCityChange={setDepartureCity}
          onArrivalCityChange={setArrivalCity}
          cities={mockCities}
        />
        <div className="mt-4 text-sm text-muted-foreground">
          <p>💡 Swap button is hidden when onSwap prop is not provided</p>
        </div>
      </div>
    );
  },
};
