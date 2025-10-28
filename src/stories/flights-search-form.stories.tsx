import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";

import {
  SearchForm,
  type SearchFormData,
} from "@/components/flights/search-form";
import type { CityData } from "@/lib/queries/cities";

// Mock city data for Storybook (reusing from city-selector stories)
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
    continent: "North America",
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
];

const meta: Meta<typeof SearchForm> = {
  title: "Flights/SearchForm",
  component: SearchForm,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default story - form without search button
export const Default: Story = {
  render: () => {
    const handleSearch = (data: SearchFormData) => {
      console.log("Search data:", data);
    };

    return (
      <div className="w-[800px]">
        <SearchForm
          showSearchButton={false}
          onSearch={handleSearch}
          cities={mockCities}
        />
      </div>
    );
  },
};

// With search button
export const WithSearchButton: Story = {
  render: () => {
    const [searchData, setSearchData] = useState<SearchFormData | null>(null);

    const handleSearch = (data: SearchFormData) => {
      setSearchData(data);
      console.log("Search data:", data);
    };

    return (
      <div className="w-[800px] space-y-4">
        <SearchForm
          showSearchButton={true}
          onSearch={handleSearch}
          cities={mockCities}
        />
        {searchData && (
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">搜索结果：</h3>
            <div className="text-sm space-y-1">
              <p>
                行程类型: {searchData.tripType === "one-way" ? "单程" : "往返"}
              </p>
              <p>
                出发城市:{" "}
                {searchData.departureCity
                  ? `${searchData.departureCity.name} (${searchData.departureCity.iataCode})`
                  : "未选择"}
              </p>
              <p>
                到达城市:{" "}
                {searchData.arrivalCity
                  ? `${searchData.arrivalCity.name} (${searchData.arrivalCity.iataCode})`
                  : "未选择"}
              </p>
              <p>
                出发日期:{" "}
                {searchData.departureDate
                  ? searchData.departureDate.toLocaleDateString("zh-CN")
                  : "未选择"}
              </p>
              <p>
                返程日期:{" "}
                {searchData.returnDate
                  ? searchData.returnDate.toLocaleDateString("zh-CN")
                  : "未选择"}
              </p>
              <p>舱位等级: {searchData.seatClass}</p>
            </div>
          </div>
        )}
      </div>
    );
  },
};
