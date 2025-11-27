import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { OrderPaymentDetails } from "@/components/flights/orders";
import type { OrderPaymentCardData } from "@/types/dto/orders";

const meta: Meta<typeof OrderPaymentDetails> = {
  title: "Flights/Orders/OrderPaymentDetails",
  component: OrderPaymentDetails,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof OrderPaymentDetails>;

/**
 * Helper function to create mock payment data
 */
const createMockPaymentData = (
  overrides?: Partial<OrderPaymentCardData>
): OrderPaymentCardData => ({
  createdAt: "2026-01-18T10:30:00Z",
  outboundFlight: {
    depatureCityName: "北京",
    arrivalCityName: "上海",
    unitPrice: "1280.00",
    passengerCount: 1,
  },
  ancillaryServices: [],
  baseAmount: "1280.00",
  ancillaryAmount: "0.00",
  totalAmount: "1280.00",
  ...overrides,
});

/**
 * 1. 单程1人
 */
export const OneWaySinglePassenger: Story = {
  args: {
    paymentData: createMockPaymentData(),
  },
};

/**
 * 2. 往返多人
 */
export const RoundTripMultiplePassengers: Story = {
  args: {
    paymentData: createMockPaymentData({
      outboundFlight: {
        depatureCityName: "北京",
        arrivalCityName: "上海",
        unitPrice: "1280.00",
        passengerCount: 3,
      },
      inboundFlight: {
        depatureCityName: "上海",
        arrivalCityName: "北京",
        unitPrice: "1380.00",
        passengerCount: 3,
      },
      baseAmount: "7980.00", // (1280 + 1380) × 3
      ancillaryAmount: "0.00",
      totalAmount: "7980.00",
    }),
  },
};

/**
 * 3. 单程多人有一个附加服务
 */
export const OneWayWithAncillaryService: Story = {
  args: {
    paymentData: createMockPaymentData({
      outboundFlight: {
        depatureCityName: "北京",
        arrivalCityName: "广州",
        unitPrice: "1580.00",
        passengerCount: 2,
      },
      ancillaryServices: [
        {
          name: "行李托运",
          code: "BAGGAGE_20KG",
          unitPrice: "150.00",
          quantity: 2,
        },
      ],
      baseAmount: "3160.00", // 1580 × 2
      ancillaryAmount: "300.00", // 150 × 2
      totalAmount: "3460.00", // 3160 + 300
    }),
  },
};

/**
 * 4. 往返一人有多个附加服务
 */
export const RoundTripWithMultipleAncillaries: Story = {
  args: {
    paymentData: createMockPaymentData({
      createdAt: "2026-01-18T15:20:00Z",
      outboundFlight: {
        depatureCityName: "上海",
        arrivalCityName: "成都",
        unitPrice: "980.00",
        passengerCount: 1,
      },
      inboundFlight: {
        depatureCityName: "成都",
        arrivalCityName: "上海",
        unitPrice: "1080.00",
        passengerCount: 1,
      },
      ancillaryServices: [
        {
          name: "行李托运20kg",
          code: "BAGGAGE_20KG",
          unitPrice: "150.00",
          quantity: 2,
        },
        {
          name: "机场贵宾室",
          code: "LOUNGE_ACCESS",
          unitPrice: "200.00",
          quantity: 2,
        },
        {
          name: "优先登机",
          code: "PRIORITY_BOARDING",
          unitPrice: "50.00",
          quantity: 2,
        },
      ],
      baseAmount: "2060.00", // 980 + 1080
      ancillaryAmount: "800.00", // (150 + 200 + 50) × 2
      totalAmount: "2860.00", // 2060 + 800
    }),
  },
};
