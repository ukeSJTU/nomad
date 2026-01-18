import { DestinationGuide } from "@nomad/ui/components/flights/guide";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Flights/Guide/DestinationGuide",
  component: DestinationGuide,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof DestinationGuide>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    boardingProcess: {
      href: "/flights/guide/process",
    },
    weather: {
      cityName: "北京",
      date: "2025-12-02",
      dayOfWeek: "周一",
      currentTempRange: "-3℃~5℃",
      currentWeather: "多云",
      forecasts: [
        { date: "明天 (12-03)", weather: "多云", tempRange: "-7℃~0℃" },
        { date: "后天 (12-04)", weather: "晴", tempRange: "-8℃~-2℃" },
      ],
    },
  },
};

export const Shanghai: Story = {
  args: {
    boardingProcess: {
      href: "/flights/guide/process",
      title: "乘机流程",
      subtitle: "boarding procedures",
    },
    weather: {
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
  },
};
