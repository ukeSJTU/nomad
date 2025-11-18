import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { OrderContactInfo } from "@/components/flights/orders";

const meta: Meta<typeof OrderContactInfo> = {
  title: "Flights/Orders/OrderContactInfo",
  component: OrderContactInfo,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof OrderContactInfo>;

/**
 * Contact with both phone and email
 */
export const Complete: Story = {
  args: {
    contactInfo: {
      contactEmail: "foobar@nomad.com",
      contactPhone: "13800001111",
    },
  },
};

/**
 * Contact with phone only
 */
export const PhoneOnly: Story = {
  args: {
    contactInfo: {
      contactPhone: "13800001111",
      contactEmail: undefined,
    },
  },
};

/**
 * Contact with email only
 */
export const EmailOnly: Story = {
  args: {
    contactInfo: {
      contactPhone: undefined,
      contactEmail: "foobar@nomad.com",
    },
  },
};

/**
 * No contact information
 */
export const Empty: Story = {
  args: {
    contactInfo: {
      contactPhone: undefined,
      contactEmail: undefined,
    },
  },
};
