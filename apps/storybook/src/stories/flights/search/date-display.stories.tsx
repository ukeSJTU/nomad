import { DateDisplay } from "@nomad/ui/components/flights/search";
import type { Meta, StoryObj } from "@storybook/react";

const mockGetRelativeDateLabel = (date: Date, today: Date): string => {
  const daysDiff = Math.floor(
    (date.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  );
  if (daysDiff === 0) return "今天";
  if (daysDiff === 1) return "明天";
  if (daysDiff === 2) return "后天";
  return "";
};

const mockGetWeekdayLabel = (date: Date): string => {
  const weekdays = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
  return weekdays[date.getDay()];
};

const meta: Meta<typeof DateDisplay> = {
  title: "Flights/Search/DateDisplay",
  component: DateDisplay,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    date: new Date(),
    today: new Date(),
    getRelativeDateLabel: mockGetRelativeDateLabel,
    getWeekdayLabel: mockGetWeekdayLabel,
  },
};

export const NoDate: Story = {
  args: {
    date: null,
    today: new Date(),
    placeholder: "选择日期",
    getRelativeDateLabel: mockGetRelativeDateLabel,
    getWeekdayLabel: mockGetWeekdayLabel,
  },
};

export const Today: Story = {
  args: {
    date: new Date(),
    today: new Date(),
    getRelativeDateLabel: mockGetRelativeDateLabel,
    getWeekdayLabel: mockGetWeekdayLabel,
  },
};

export const Tomorrow: Story = {
  args: {
    date: new Date(Date.now() + 24 * 60 * 60 * 1000),
    today: new Date(),
    getRelativeDateLabel: mockGetRelativeDateLabel,
    getWeekdayLabel: mockGetWeekdayLabel,
  },
};

export const FutureDate: Story = {
  args: {
    date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    today: new Date(),
    getRelativeDateLabel: mockGetRelativeDateLabel,
    getWeekdayLabel: mockGetWeekdayLabel,
  },
};

export const RightAligned: Story = {
  args: {
    date: new Date(),
    today: new Date(),
    align: "right",
    getRelativeDateLabel: mockGetRelativeDateLabel,
    getWeekdayLabel: mockGetWeekdayLabel,
  },
};
