import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Bold, Italic, Underline } from "lucide-react";

import { Toggle } from "@/components/ui/toggle";

const meta = {
  title: "Shadcn/Toggle",
  component: Toggle,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "outline"],
      description: "The visual style variant of the toggle",
    },
    size: {
      control: "select",
      options: ["default", "sm", "lg"],
      description: "The size of the toggle",
    },
    disabled: {
      control: "boolean",
      description: "Whether the toggle is disabled",
    },
  },
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: <Bold />,
  },
};

export const Outline: Story = {
  args: {
    variant: "outline",
    children: <Italic />,
  },
};

export const Small: Story = {
  args: {
    size: "sm",
    children: <Bold />,
  },
};

export const Large: Story = {
  args: {
    size: "lg",
    children: <Bold />,
  },
};

export const WithText: Story = {
  args: {
    variant: "outline",
    children: (
      <>
        <Bold />
        Bold
      </>
    ),
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: <Underline />,
  },
};

export const Group: Story = {
  render: () => (
    <div className="flex gap-1">
      <Toggle variant="outline">
        <Bold />
      </Toggle>
      <Toggle variant="outline">
        <Italic />
      </Toggle>
      <Toggle variant="outline">
        <Underline />
      </Toggle>
    </div>
  ),
};

