import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Command } from "lucide-react";

import { Kbd, KbdGroup } from "@/components/ui/kbd";

const meta = {
  title: "Shadcn/Kbd",
  component: Kbd,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Kbd>;

export default meta;
type Story = Omit<StoryObj<typeof meta>, "args">;

export const Default: Story = {
  args: {
    children: "K",
  },
};

export const WithIcon: Story = {
  render: () => (
    <Kbd>
      <Command />K
    </Kbd>
  ),
};

export const Group: Story = {
  render: () => (
    <KbdGroup>
      <Kbd>
        <Command />
      </Kbd>
      <Kbd>K</Kbd>
    </KbdGroup>
  ),
};

export const MultipleKeys: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <span className="text-sm">Press</span>
      <KbdGroup>
        <Kbd>Ctrl</Kbd>
        <Kbd>Shift</Kbd>
        <Kbd>P</Kbd>
      </KbdGroup>
      <span className="text-sm">to open command palette</span>
    </div>
  ),
};

export const MacShortcut: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <KbdGroup>
        <Kbd>
          <Command />
        </Kbd>
        <Kbd>K</Kbd>
      </KbdGroup>
    </div>
  ),
};
