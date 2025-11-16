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
    contactPhone: "13800138000",
    contactEmail: "user@example.com",
  },
};

/**
 * Contact with phone only
 */
export const PhoneOnly: Story = {
  args: {
    contactPhone: "13800138000",
    contactEmail: null,
  },
};

/**
 * Contact with email only
 */
export const EmailOnly: Story = {
  args: {
    contactPhone: null,
    contactEmail: "user@example.com",
  },
};

/**
 * No contact information
 */
export const Empty: Story = {
  args: {
    contactPhone: null,
    contactEmail: null,
  },
};

/**
 * International phone number
 */
export const InternationalPhone: Story = {
  args: {
    contactPhone: "+1 (555) 123-4567",
    contactEmail: "international@example.com",
  },
};

/**
 * Long email address
 */
export const LongEmail: Story = {
  args: {
    contactPhone: "13800138000",
    contactEmail: "very.long.email.address.for.testing@example-domain.com",
  },
};
