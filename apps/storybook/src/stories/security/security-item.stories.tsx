import type { Meta, StoryObj } from "@storybook/react";
import { SecurityItem } from "@ukesjtu/nomad-ui/components/security";

const meta = {
  title: "Security/SecurityItem",
  component: SecurityItem,
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
} satisfies Meta<typeof SecurityItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PasswordNotSet: Story = {
  args: {
    title: "登录密码",
    description: "安全性高的密码以便账号更安全。",
    status: "notSet",
    actionHref: "/home/security/password",
    actionLabel: "设置登录密码",
  },
};

export const EmailVerified: Story = {
  args: {
    title: "邮箱地址",
    description: "用于接收重要通知和找回密码",
    status: "verified",
    value: "user@example.com",
    actionHref: "/home/security/email",
    actionLabel: "修改邮箱",
  },
};

export const EmailUnverified: Story = {
  args: {
    title: "邮箱地址",
    description: "用于接收重要通知和找回密码",
    status: "unverified",
    value: "user@example.com",
    actionHref: "/home/security/email",
    actionLabel: "验证邮箱",
  },
};

export const PhoneVerified: Story = {
  args: {
    title: "手机号码",
    description: "用于登录和接收验证码",
    status: "verified",
    value: "138****5678",
    actionHref: "/home/security/phone",
    actionLabel: "修改手机号",
  },
};

export const PhoneUnverified: Story = {
  args: {
    title: "手机号码",
    description: "用于登录和接收验证码",
    status: "unverified",
    value: "138****5678",
    actionHref: "/home/security/phone",
    actionLabel: "验证手机号",
  },
};

export const PhoneNotSet: Story = {
  args: {
    title: "手机号码",
    description: "用于登录和接收验证码",
    status: "notSet",
    actionHref: "/home/security/phone",
    actionLabel: "绑定手机号",
  },
};
