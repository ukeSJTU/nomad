import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { UserInfoDisplay } from "@/components/user/user-info-display";
import type { UserInfo } from "@/types/dto";

const meta = {
  title: "User/UserInfoDisplay",
  component: UserInfoDisplay,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    onEdit: {
      action: "edit",
      description: "Callback when edit button is clicked",
    },
  },
} satisfies Meta<typeof UserInfoDisplay>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockUserData: UserInfo = {
  id: "user-123",
  name: "张三",
  nickname: "小张",
  email: "zhangsan@example.com",
  emailVerified: true,
  phoneNumber: "13800138000",
  phoneNumberVerified: true,
  gender: "male",
  birthday: "1990-01-01",
  image: null,
  createdAt: "2024-01-01T00:00:00Z",
  updatedAt: "2024-01-01T00:00:00Z",
};

/**
 * Complete user profile with all fields filled
 */
export const Complete: Story = {
  args: {
    userData: mockUserData,
    onEdit: () => {},
  },
  render: args => (
    <div className="w-[700px]">
      <UserInfoDisplay {...args} />
    </div>
  ),
};

/**
 * User profile with female gender
 */
export const FemaleUser: Story = {
  args: {
    userData: {
      ...mockUserData,
      name: "李四",
      nickname: "小李",
      gender: "female",
    },
    onEdit: () => {},
  },
  render: args => (
    <div className="w-[700px]">
      <UserInfoDisplay {...args} />
    </div>
  ),
};

/**
 * User profile with other gender
 */
export const OtherGender: Story = {
  args: {
    userData: {
      ...mockUserData,
      gender: "other",
    },
    onEdit: () => {},
  },
  render: args => (
    <div className="w-[700px]">
      <UserInfoDisplay {...args} />
    </div>
  ),
};

/**
 * Minimal user profile with only required fields
 */
export const Minimal: Story = {
  args: {
    userData: {
      ...mockUserData,
      nickname: null,
      gender: null,
      birthday: null,
    },
    onEdit: () => {},
  },
  render: args => (
    <div className="w-[700px]">
      <UserInfoDisplay {...args} />
    </div>
  ),
};

/**
 * User profile without nickname
 */
export const WithoutNickname: Story = {
  args: {
    userData: {
      ...mockUserData,
      nickname: null,
    },
    onEdit: () => {},
  },
  render: args => (
    <div className="w-[700px]">
      <UserInfoDisplay {...args} />
    </div>
  ),
};

/**
 * User profile without birthday
 */
export const WithoutBirthday: Story = {
  args: {
    userData: {
      ...mockUserData,
      birthday: null,
    },
    onEdit: () => {},
  },
  render: args => (
    <div className="w-[700px]">
      <UserInfoDisplay {...args} />
    </div>
  ),
};
