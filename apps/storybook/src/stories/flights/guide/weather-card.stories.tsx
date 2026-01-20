import type { Meta, StoryObj } from "@storybook/react";
import { WeatherCard } from "@ukesjtu/nomad-ui/components/flights/guide";

const meta = {
  title: "Flights/Guide/WeatherCard",
  component: WeatherCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof WeatherCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockForecasts = [
  { date: "明天 (12-03)", weather: "多云", tempRange: "-7℃~0℃" },
  { date: "后天 (12-04)", weather: "晴", tempRange: "-8℃~-2℃" },
];

export const Default: Story = {
  args: {
    cityName: "北京",
    date: "2025-12-02",
    dayOfWeek: "周一",
    currentTempRange: "-3℃~5℃",
    currentWeather: "多云",
    forecasts: mockForecasts,
  },
};

export const Shanghai: Story = {
  args: {
    cityName: "上海",
    date: "2025-12-05",
    dayOfWeek: "周四",
    currentTempRange: "8℃~15℃",
    currentWeather: "阴",
    forecasts: [
      { date: "明天 (12-06)", weather: "小雨", tempRange: "6℃~12℃" },
      { date: "后天 (12-07)", weather: "阴", tempRange: "7℃~13℃" },
    ],
  },
};

export const WithViewMore: Story = {
  args: {
    cityName: "广州",
    date: "2025-12-08",
    dayOfWeek: "周日",
    currentTempRange: "18℃~25℃",
    currentWeather: "晴",
    forecasts: mockForecasts,
    viewMoreDisabled: false,
    onViewMore: () => alert("查看更多天气信息"),
  },
};

export const NoForecasts: Story = {
  args: {
    cityName: "深圳",
    date: "2025-12-10",
    dayOfWeek: "周二",
    currentTempRange: "20℃~28℃",
    currentWeather: "晴",
    forecasts: [],
  },
};
