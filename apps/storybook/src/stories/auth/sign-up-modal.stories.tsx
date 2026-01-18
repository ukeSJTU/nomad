import { SignUpModal } from "@nomad/ui/components/auth";
import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "storybook/test";

const meta = {
  title: "Auth/SignUpModal",
  component: SignUpModal,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    open: {
      control: "boolean",
      description: "Controls modal visibility",
    },
  },
  args: {
    onOpenChange: fn(),
    onAgree: fn(),
    onDisagree: fn(),
  },
} satisfies Meta<typeof SignUpModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    open: true,
  },
};

export const Closed: Story = {
  args: {
    open: false,
  },
};

export const Interactive: Story = {
  args: {
    open: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Try clicking the agreement buttons or scrolling through the terms to explore the modal behavior.",
      },
    },
  },
};
