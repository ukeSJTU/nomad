import type { Meta, StoryObj } from "@storybook/react";
import { OrderPaymentDetails } from "@ukesjtu/nomad-ui/components/flights/orders";

const meta = {
  title: "Flights/Orders/OrderPaymentDetails",
  component: OrderPaymentDetails,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof OrderPaymentDetails>;

export default meta;
type Story = StoryObj<typeof meta>;

export const OneWayWithoutServices: Story = {
  args: {
    paymentData: {
      totalAmount: "800.00",
      createdAt: "2026-01-18T10:30:00Z",
      outboundFlight: {
        depatureCityName: "北京",
        arrivalCityName: "上海",
        unitPrice: "800.00",
        passengerCount: 1,
      },
      ancillaryServices: [],
    },
  },
};

export const RoundTripWithServices: Story = {
  args: {
    paymentData: {
      totalAmount: "2,500.00",
      createdAt: "2026-01-18T10:30:00Z",
      outboundFlight: {
        depatureCityName: "北京",
        arrivalCityName: "上海",
        unitPrice: "800.00",
        passengerCount: 2,
      },
      inboundFlight: {
        depatureCityName: "上海",
        arrivalCityName: "北京",
        unitPrice: "750.00",
        passengerCount: 2,
      },
      ancillaryServices: [
        {
          name: "航空意外险",
          unitPrice: "30.00",
          quantity: 2,
        },
        {
          name: "行李托运",
          unitPrice: "70.00",
          quantity: 2,
        },
      ],
    },
  },
};

export const MultiplePassengersOneWay: Story = {
  args: {
    paymentData: {
      totalAmount: "2,400.00",
      createdAt: "2026-01-18T10:30:00Z",
      outboundFlight: {
        depatureCityName: "北京",
        arrivalCityName: "上海",
        unitPrice: "800.00",
        passengerCount: 3,
      },
      ancillaryServices: [],
    },
  },
};

export const WithManyServices: Story = {
  args: {
    paymentData: {
      totalAmount: "3,200.00",
      createdAt: "2026-01-18T10:30:00Z",
      outboundFlight: {
        depatureCityName: "北京",
        arrivalCityName: "上海",
        unitPrice: "800.00",
        passengerCount: 2,
      },
      inboundFlight: {
        depatureCityName: "上海",
        arrivalCityName: "北京",
        unitPrice: "750.00",
        passengerCount: 2,
      },
      ancillaryServices: [
        {
          name: "航空意外险",
          unitPrice: "30.00",
          quantity: 2,
        },
        {
          name: "行李托运",
          unitPrice: "70.00",
          quantity: 2,
        },
        {
          name: "机上餐食",
          unitPrice: "50.00",
          quantity: 2,
        },
        {
          name: "优先登机",
          unitPrice: "100.00",
          quantity: 2,
        },
      ],
    },
  },
};
