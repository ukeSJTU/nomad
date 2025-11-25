import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { OrderPassengerInfo } from "@/components/flights/orders";

const meta: Meta<typeof OrderPassengerInfo> = {
  title: "Flights/Orders/OrderPassengerInfo",
  component: OrderPassengerInfo,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof OrderPassengerInfo>;

/**
 * Single passenger with ID card
 */
export const SinglePassengerIDCard: Story = {
  args: {
    passengers: [
      {
        name: "张三",
        idType: "id_card",
        idNumber: "310115199001011234",
      },
    ],
  },
};

/**
 * Single passenger with passport
 */
export const SinglePassengerPassport: Story = {
  args: {
    passengers: [
      {
        name: "John Smith",
        idType: "passport",
        idNumber: "E12345678",
      },
    ],
  },
};

/**
 * Multiple passengers with different identity types
 */
export const MultiplePassengers: Story = {
  args: {
    passengers: [
      {
        name: "张三",
        idType: "id_card",
        idNumber: "310115199001011234",
      },
      {
        name: "李四",
        idType: "passport",
        idNumber: "P87654321",
      },
      {
        name: "王五",
        idType: "id_card",
        idNumber: "310115199501011234",
      },
      {
        name: "Maria Garcia",
        idType: "passport",
        idNumber: "A98765432",
      },
    ],
  },
};
