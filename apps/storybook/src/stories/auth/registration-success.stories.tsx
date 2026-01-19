import { RegistrationSuccess } from "@nomad/ui/components/auth";
import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "storybook/test";

const meta = {
  title: "Auth/RegistrationSuccess",
  component: RegistrationSuccess,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    onStartBooking: fn(),
    onGoToProfile: fn(),
  },
} satisfies Meta<typeof RegistrationSuccess>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const CustomText: Story = {
  args: {
    title: "Welcome to Nomad!",
    description: "Your account has been successfully created",
  },
};

export const WithCustomClass: Story = {
  args: {
    className: "bg-gray-50 p-6 rounded-lg",
  },
};

export const LongText: Story = {
  args: {
    title: "Registration Completed Successfully!",
    description:
      "Congratulations! Your account has been successfully created and you are now ready to explore all the amazing features we have to offer. Start booking your flights today!",
  },
};
