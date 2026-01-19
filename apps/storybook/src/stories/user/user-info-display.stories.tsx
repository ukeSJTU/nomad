import { UserInfoDisplay } from "@nomad/ui/components/user";
import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "storybook/test";

const meta = {
  title: "User/UserInfoDisplay",
  component: UserInfoDisplay,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    Story => (
      <div className="w-[600px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof UserInfoDisplay>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    userData: {
      nickname: "小张",
      name: "张三",
      gender: "male",
      birthday: "1990-01-01",
    },
    onEdit: fn(),
  },
};

export const WithoutOptionalFields: Story = {
  args: {
    userData: {
      name: "李四",
      nickname: null,
      gender: null,
      birthday: null,
    },
    onEdit: fn(),
  },
};

export const FemaleUser: Story = {
  args: {
    userData: {
      nickname: "小红",
      name: "王红",
      gender: "female",
      birthday: "1995-05-15",
    },
    onEdit: fn(),
  },
};

export const OtherGender: Story = {
  args: {
    userData: {
      nickname: "Alex",
      name: "Alex Chen",
      gender: "other",
      birthday: "1988-12-25",
    },
    onEdit: fn(),
  },
};
