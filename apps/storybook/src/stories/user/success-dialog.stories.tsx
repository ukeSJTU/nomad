import type { Meta, StoryObj } from "@storybook/react";
import { SuccessDialog } from "@ukesjtu/nomad-ui/components/user";
import { fn } from "storybook/test";

const meta = {
  title: "User/SuccessDialog",
  component: SuccessDialog,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof SuccessDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Open: Story = {
  args: {
    open: true,
    onOpenChange: fn(),
  },
};

export const Closed: Story = {
  args: {
    open: false,
    onOpenChange: fn(),
  },
};
