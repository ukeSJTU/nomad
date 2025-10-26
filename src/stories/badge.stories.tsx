import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Check, X } from "lucide-react";

import { Badge } from "@/components/ui/badge";

const meta = {
  title: "Shadcn/Badge",
  component: Badge,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "secondary", "destructive", "outline"],
      description: "The visual style variant of the badge",
    },
    asChild: {
      control: "boolean",
      description: "Render as a child component using Radix Slot",
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

// Variants
export const Default: Story = {
  args: {
    children: "Badge",
    variant: "default",
  },
};

export const Secondary: Story = {
  args: {
    children: "Secondary",
    variant: "secondary",
  },
};

export const Destructive: Story = {
  args: {
    children: "Destructive",
    variant: "destructive",
  },
};

export const Outline: Story = {
  args: {
    children: "Outline",
    variant: "outline",
  },
};

// With icons
export const WithIconLeft: Story = {
  args: {
    children: (
      <>
        <Check />
        Success
      </>
    ),
  },
};

export const WithIconRight: Story = {
  args: {
    children: (
      <>
        Error
        <X />
      </>
    ),
    variant: "destructive",
  },
};

// Different content
export const Number: Story = {
  args: {
    children: "99+",
    variant: "secondary",
  },
};

export const Status: Story = {
  args: {
    children: "Active",
    variant: "outline",
  },
};

