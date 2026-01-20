import type { Meta, StoryObj } from "@storybook/react";
import { OrderContactInfo } from "@ukesjtu/nomad-ui/components/flights/orders";

const meta = {
  title: "Flights/Orders/OrderContactInfo",
  component: OrderContactInfo,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof OrderContactInfo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithBothPhoneAndEmail: Story = {
  args: {
    contactInfo: {
      contactPhone: "13800138000",
      contactEmail: "user@example.com",
    },
  },
};

export const PhoneOnly: Story = {
  args: {
    contactInfo: {
      contactPhone: "13800138000",
    },
  },
};

export const EmailOnly: Story = {
  args: {
    contactInfo: {
      contactEmail: "user@example.com",
    },
  },
};

export const Empty: Story = {
  args: {
    contactInfo: {},
  },
};
