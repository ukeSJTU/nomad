import type { Meta, StoryObj } from "@storybook/react";
import { OrderPassengerInfo } from "@ukesjtu/nomad-ui/components/flights/orders";

const meta = {
  title: "Flights/Orders/OrderPassengerInfo",
  component: OrderPassengerInfo,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof OrderPassengerInfo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SinglePassenger: Story = {
  args: {
    passengers: [
      {
        name: "张三",
        idType: "id_card",
        idNumber: "110101199001011234",
      },
    ],
  },
};

export const MultiplePassengers: Story = {
  args: {
    passengers: [
      {
        name: "张三",
        idType: "id_card",
        idNumber: "110101199001011234",
      },
      {
        name: "李四",
        idType: "passport",
        idNumber: "E12345678",
      },
      {
        name: "王五",
        idType: "id_card",
        idNumber: "220101199002021234",
      },
    ],
  },
};

export const WithDifferentIdTypes: Story = {
  args: {
    passengers: [
      {
        name: "张三",
        idType: "id_card",
        idNumber: "110101199001011234",
      },
      {
        name: "John Smith",
        idType: "passport",
        idNumber: "E12345678",
      },
      {
        name: "赵六",
        idType: "other",
        idNumber: "OTHER123456",
      },
    ],
  },
};
