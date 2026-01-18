import { ConfirmationBookingInfo } from "@nomad/ui/components/flights/booking";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Flights/Booking/ConfirmationBookingInfo",
  component: ConfirmationBookingInfo,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ConfirmationBookingInfo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    passengers: [
      {
        id: "1",
        name: "张三",
        identityType: "id_card",
        identityNumber: "110101199001011234",
      },
      {
        id: "2",
        name: "李四",
        identityType: "passport",
        identityNumber: "G12345678",
      },
    ],
    contactPhone: "13800138000",
    contactEmail: "test@example.com",
    ancillaryServices: [
      { name: "行李托运 20kg", price: "100" },
      { name: "机上餐食", price: "50" },
    ],
  },
};

export const SinglePassenger: Story = {
  args: {
    passengers: [
      {
        id: "1",
        name: "王五",
        identityType: "passport",
        identityNumber: "E87654321",
      },
    ],
    contactPhone: "13900139000",
    contactEmail: "wang@example.com",
  },
};

export const WithoutAncillary: Story = {
  args: {
    passengers: [
      {
        id: "1",
        name: "赵六",
        identityType: "id_card",
        identityNumber: "320101199505051234",
      },
    ],
    contactPhone: "13700137000",
    contactEmail: "zhao@example.com",
    ancillaryServices: [],
  },
};

export const WithoutContactInfo: Story = {
  args: {
    passengers: [
      {
        id: "1",
        name: "孙七",
        identityType: "other",
        identityNumber: "OTHER123456",
      },
    ],
    contactPhone: null,
    contactEmail: null,
  },
};

export const MultiplePassengersWithServices: Story = {
  args: {
    passengers: [
      {
        id: "1",
        name: "周八",
        identityType: "id_card",
        identityNumber: "440101199006061234",
      },
      {
        id: "2",
        name: "吴九",
        identityType: "passport",
        identityNumber: "G98765432",
      },
      {
        id: "3",
        name: "郑十",
        identityType: "id_card",
        identityNumber: "310101199207071234",
      },
    ],
    contactPhone: "13600136000",
    contactEmail: "contact@example.com",
    ancillaryServices: [
      { name: "行李托运 20kg", price: "100" },
      { name: "行李托运 20kg", price: "100" },
      { name: "行李托运 20kg", price: "100" },
      { name: "机上餐食", price: "50" },
      { name: "机上餐食", price: "50" },
      { name: "优先登机", price: "80" },
    ],
  },
};
