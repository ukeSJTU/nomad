import type { Meta, StoryObj } from "@storybook/react";
import { BoardingProcessCard } from "@ukesjtu/nomad-ui/components/flights/guide";

const meta = {
  title: "Flights/Guide/BoardingProcessCard",
  component: BoardingProcessCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof BoardingProcessCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    href: "/flights/guide/process",
  },
};

export const CustomTitle: Story = {
  args: {
    href: "/flights/guide/process",
    title: "登机指南",
    subtitle: "boarding guide",
  },
};

export const CustomLink: Story = {
  args: {
    href: "/flights/guide/checkin",
    title: "值机流程",
    subtitle: "check-in procedures",
  },
};
