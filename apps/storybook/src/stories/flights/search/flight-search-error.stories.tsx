import type { Meta, StoryObj } from "@storybook/react";
import { FlightSearchError } from "@ukesjtu/nomad-ui/components/flights/search";

const meta = {
  title: "Flights/Search/FlightSearchError",
  component: FlightSearchError,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    message: {
      control: "text",
      description: "Error message to display",
    },
    onRetry: {
      description: "Callback for retry action",
    },
  },
} satisfies Meta<typeof FlightSearchError>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default error state with standard message
 */
export const Default: Story = {
  args: {
    onRetry: () => {
      console.log("Retry clicked");
    },
  },
};

/**
 * Error without retry button
 */
export const WithoutRetry: Story = {
  args: {},
};

/**
 * Custom error message
 */
export const CustomMessage: Story = {
  args: {
    message: "网络连接失败，请检查您的网络设置后重试",
    onRetry: () => {
      console.log("Retry clicked");
    },
  },
};

/**
 * Server error message
 */
export const ServerError: Story = {
  args: {
    message: "服务器暂时无法响应，请稍后重试",
    onRetry: () => {
      console.log("Retry clicked");
    },
  },
};

/**
 * Validation error message
 */
export const ValidationError: Story = {
  args: {
    message: "搜索参数无效，请修改搜索条件后重试",
    onRetry: () => {
      console.log("Retry clicked");
    },
  },
};

/**
 * Timeout error message
 */
export const TimeoutError: Story = {
  args: {
    message: "搜索超时，请检查网络连接或稍后重试",
    onRetry: () => {
      console.log("Retry clicked");
    },
  },
};
