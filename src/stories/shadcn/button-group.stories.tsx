import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Bold, Italic, Underline } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
} from "@/components/ui/button-group";

const meta = {
  title: "Shadcn/ButtonGroup",
  component: ButtonGroup,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
      description: "The orientation of the button group",
    },
  },
} satisfies Meta<typeof ButtonGroup>;

export default meta;
type Story = Omit<StoryObj<typeof meta>, "args">;

export const Horizontal: Story = {
  render: () => (
    <ButtonGroup>
      <Button variant="outline">Left</Button>
      <Button variant="outline">Middle</Button>
      <Button variant="outline">Right</Button>
    </ButtonGroup>
  ),
};

export const Vertical: Story = {
  render: () => (
    <ButtonGroup orientation="vertical">
      <Button variant="outline">Top</Button>
      <Button variant="outline">Middle</Button>
      <Button variant="outline">Bottom</Button>
    </ButtonGroup>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <ButtonGroup>
      <Button variant="outline" size="icon">
        <Bold />
      </Button>
      <Button variant="outline" size="icon">
        <Italic />
      </Button>
      <Button variant="outline" size="icon">
        <Underline />
      </Button>
    </ButtonGroup>
  ),
};

export const WithSeparator: Story = {
  render: () => (
    <ButtonGroup>
      <Button variant="outline">Copy</Button>
      <ButtonGroupSeparator />
      <Button variant="outline">Paste</Button>
      <ButtonGroupSeparator />
      <Button variant="outline">Cut</Button>
    </ButtonGroup>
  ),
};

export const WithText: Story = {
  render: () => (
    <ButtonGroup>
      <ButtonGroupText>Format:</ButtonGroupText>
      <Button variant="outline" size="icon">
        <Bold />
      </Button>
      <Button variant="outline" size="icon">
        <Italic />
      </Button>
      <Button variant="outline" size="icon">
        <Underline />
      </Button>
    </ButtonGroup>
  ),
};

export const Mixed: Story = {
  render: () => (
    <ButtonGroup>
      <Button variant="outline">Save</Button>
      <Button variant="outline">Save As</Button>
      <ButtonGroupSeparator />
      <Button variant="outline">Export</Button>
    </ButtonGroup>
  ),
};
