import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Label } from "@/components/ui/label";

const meta = {
  title: "Shadcn/Label",
  component: Label,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Label>;

export default meta;
type Story = Omit<StoryObj<typeof meta>, "args">;

export const Default: Story = {
  args: {
    children: "Label",
  },
};

export const ForInput: Story = {
  args: {
    htmlFor: "email",
    children: "Email Address",
  },
};

export const Required: Story = {
  args: {
    children: (
      <>
        Username
        <span className="text-destructive">*</span>
      </>
    ),
  },
};
