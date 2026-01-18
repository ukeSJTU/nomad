import { ConfirmationNoticeCard } from "@nomad/ui/components/flights/booking/confirmation-notice-card";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof ConfirmationNoticeCard> = {
  title: "Flights/Booking/ConfirmationNoticeCard",
  component: ConfirmationNoticeCard,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ConfirmationNoticeCard>;

export const Default: Story = {
  args: {},
};

export const CustomTitle: Story = {
  args: {
    title: "注意事项",
  },
};

export const CustomNotices: Story = {
  args: {
    notices: ["请提前1小时到达车站", "携带有效身份证件", "禁止携带危险品"],
  },
};

export const EmptyNotices: Story = {
  args: {
    notices: [],
  },
};

export const SingleNotice: Story = {
  args: {
    notices: ["这是唯一的一条提示信息"],
  },
};
