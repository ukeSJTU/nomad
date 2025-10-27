import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Slider } from "@/components/ui/slider";

const meta = {
  title: "Shadcn/Slider",
  component: Slider,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    defaultValue: {
      control: "object",
      description: "The default value of the slider",
    },
    min: {
      control: "number",
      description: "The minimum value",
    },
    max: {
      control: "number",
      description: "The maximum value",
    },
    step: {
      control: "number",
      description: "The step increment",
    },
    disabled: {
      control: "boolean",
      description: "Whether the slider is disabled",
    },
  },
} satisfies Meta<typeof Slider>;

export default meta;
type Story = Omit<StoryObj<typeof meta>, "args">;

export const Default: Story = {
  args: {
    defaultValue: [50],
    max: 100,
    step: 1,
    className: "w-[300px]",
  },
};

export const Range: Story = {
  args: {
    defaultValue: [25, 75],
    max: 100,
    step: 1,
    className: "w-[300px]",
  },
};

export const WithStep: Story = {
  args: {
    defaultValue: [50],
    max: 100,
    step: 10,
    className: "w-[300px]",
  },
};

export const Disabled: Story = {
  args: {
    defaultValue: [50],
    max: 100,
    step: 1,
    disabled: true,
    className: "w-[300px]",
  },
};
