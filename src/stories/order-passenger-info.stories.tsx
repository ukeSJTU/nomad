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
export const SinglePassenger: Story = {
  args: {
    passengers: [
      {
        id: "passenger-1",
        orderId: "order-1",
        name: "张三",
        identityType: "id_card" as const,
        identityNumber: "110101199001011234",
        phone: "13800138000",
        createdAt: new Date(),
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
        id: "passenger-1",
        orderId: "order-1",
        name: "张三",
        identityType: "id_card" as const,
        identityNumber: "110101199001011234",
        phone: "13800138000",
        createdAt: new Date(),
      },
      {
        id: "passenger-2",
        orderId: "order-1",
        name: "李四",
        identityType: "passport" as const,
        identityNumber: "E12345678",
        phone: "13900139000",
        createdAt: new Date(),
      },
      {
        id: "passenger-3",
        orderId: "order-1",
        name: "王五",
        identityType: "id_card" as const,
        identityNumber: "110101199501011234",
        phone: null,
        createdAt: new Date(),
      },
    ],
  },
};

/**
 * Passenger with passport
 */
export const PassportPassenger: Story = {
  args: {
    passengers: [
      {
        id: "passenger-1",
        orderId: "order-1",
        name: "John Smith",
        identityType: "passport" as const,
        identityNumber: "P12345678",
        phone: "+1234567890",
        createdAt: new Date(),
      },
    ],
  },
};

/**
 * Passenger without phone number
 */
export const NoPhone: Story = {
  args: {
    passengers: [
      {
        id: "passenger-1",
        orderId: "order-1",
        name: "张三",
        identityType: "id_card" as const,
        identityNumber: "110101199001011234",
        phone: null,
        createdAt: new Date(),
      },
    ],
  },
};

/**
 * Family trip with 5 passengers
 */
export const FamilyTrip: Story = {
  args: {
    passengers: [
      {
        id: "passenger-1",
        orderId: "order-1",
        name: "张三",
        identityType: "id_card" as const,
        identityNumber: "110101197001011234",
        phone: "13800138000",
        createdAt: new Date(),
      },
      {
        id: "passenger-2",
        orderId: "order-1",
        name: "李梅",
        identityType: "id_card" as const,
        identityNumber: "110101197501011234",
        phone: "13900139000",
        createdAt: new Date(),
      },
      {
        id: "passenger-3",
        orderId: "order-1",
        name: "张小明",
        identityType: "id_card" as const,
        identityNumber: "110101200001011234",
        phone: null,
        createdAt: new Date(),
      },
      {
        id: "passenger-4",
        orderId: "order-1",
        name: "张小红",
        identityType: "id_card" as const,
        identityNumber: "110101200501011234",
        phone: null,
        createdAt: new Date(),
      },
      {
        id: "passenger-5",
        orderId: "order-1",
        name: "张小华",
        identityType: "id_card" as const,
        identityNumber: "110101201001011234",
        phone: null,
        createdAt: new Date(),
      },
    ],
  },
};
