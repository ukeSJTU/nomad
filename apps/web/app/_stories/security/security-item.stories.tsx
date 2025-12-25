import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import SecurityItem, {
  SecurityStatus,
} from "@/components/security/security-item";

const meta = {
  title: "Security/SecurityItem",
  component: SecurityItem,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    title: {
      control: "text",
      description: "Title of the security item",
    },
    description: {
      control: "text",
      description: "Detailed description of the security item",
    },
    status: {
      control: "select",
      options: [
        "verified",
        "unverified",
        "notSet",
      ] as readonly SecurityStatus[],
      description:
        "Security status: verified (set and verified), unverified (set but not verified), notSet (not set)",
    },
    value: {
      control: "text",
      description: "Optional value to display (e.g., masked phone number)",
    },
    actionHref: {
      control: "text",
      description: "URL for the action button",
    },
    actionLabel: {
      control: "text",
      description: "Label for the action button",
    },
  },
} satisfies Meta<typeof SecurityItem>;

export default meta;
type Story = StoryObj<typeof meta>;
type StoryWithRender = Omit<StoryObj<typeof meta>, "args">;

/**
 * Default state of a security item that is not yet set up.
 * Shows an X icon and "未设置" status.
 */
export const NotSet: Story = {
  args: {
    title: "登录密码",
    description:
      "安全性高的密码以便账号更安全。建议定期更换密码，且设置一个包含数字和字母的密码，并且长度超过8位以上的密码。",
    status: "notSet",
    actionHref: "/home/security/password",
    actionLabel: "设置登录密码",
  },
  render: args => (
    <div className="w-[700px]">
      <SecurityItem {...args} />
    </div>
  ),
};

/**
 * Password security item when already set and verified.
 * Shows a check icon and "已绑定" status without a value.
 */
export const PasswordVerified: Story = {
  args: {
    title: "登录密码",
    description:
      "安全性高的密码以便账号更安全。建议定期更换密码，且设置一个包含数字和字母的密码，并且长度超过8位以上的密码。",
    status: "verified",
    actionHref: "/home/security/password",
    actionLabel: "修改",
  },
  render: args => (
    <div className="w-[700px]">
      <SecurityItem {...args} />
    </div>
  ),
};

/**
 * Phone number security item when not set.
 * Shows an X icon and "未设置" status.
 */
export const PhoneNotSet: Story = {
  args: {
    title: "绑定手机",
    description:
      "绑定手机后，您即可享受手机号登录、动态码登录、找回密码等，为了账号安全，建议您在更换手机号后第一时间更换绑定手机。",
    status: "notSet",
    actionHref: "/home/security/phone",
    actionLabel: "设置绑定手机",
  },
  render: args => (
    <div className="w-[700px]">
      <SecurityItem {...args} />
    </div>
  ),
};

/**
 * Phone number security item when set but not verified.
 * Shows an alert icon and "已设置但未验证" status with masked phone number.
 */
export const PhoneUnverified: Story = {
  args: {
    title: "绑定手机",
    description:
      "绑定手机后，您即可享受手机号登录、动态码登录、找回密码等，为了账号安全，建议您在更换手机号后第一时间更换绑定手机。",
    status: "unverified",
    value: "138****5678",
    actionHref: "/home/security/phone",
    actionLabel: "验证手机号",
  },
  render: args => (
    <div className="w-[700px]">
      <SecurityItem {...args} />
    </div>
  ),
};

/**
 * Phone number security item when verified.
 * Shows a check icon, "已绑定" status with masked phone number.
 */
export const PhoneVerified: Story = {
  args: {
    title: "绑定手机",
    description:
      "绑定手机后，您即可享受手机号登录、动态码登录、找回密码等，为了账号安全，建议您在更换手机号后第一时间更换绑定手机。",
    status: "verified",
    value: "138****5678",
    actionHref: "/home/security/phone",
    actionLabel: "修改",
  },
  render: args => (
    <div className="w-[700px]">
      <SecurityItem {...args} />
    </div>
  ),
};

/**
 * Email security item when not set.
 * Shows an X icon and "未设置" status.
 */
export const EmailNotSet: Story = {
  args: {
    title: "绑定邮箱",
    description: "绑定邮箱后，您即可使用邮箱登录账号或找回密码等。",
    status: "notSet",
    actionHref: "/home/security/email",
    actionLabel: "设置绑定邮箱",
  },
  render: args => (
    <div className="w-[700px]">
      <SecurityItem {...args} />
    </div>
  ),
};

/**
 * Email security item when set but not verified.
 * Shows an alert icon and "已设置但未验证" status with the email address.
 */
export const EmailUnverified: Story = {
  args: {
    title: "绑定邮箱",
    description: "绑定邮箱后，您即可使用邮箱登录账号或找回密码等。",
    status: "unverified",
    value: "user@example.com",
    actionHref: "/home/security/email",
    actionLabel: "验证邮箱",
  },
  render: args => (
    <div className="w-[700px]">
      <SecurityItem {...args} />
    </div>
  ),
};

/**
 * Email security item when verified.
 * Shows a check icon, "已绑定" status with the email address.
 */
export const EmailVerified: Story = {
  args: {
    title: "绑定邮箱",
    description: "绑定邮箱后，您即可使用邮箱登录账号或找回密码等。",
    status: "verified",
    value: "user@example.com",
    actionHref: "/home/security/email",
    actionLabel: "修改",
  },
  render: args => (
    <div className="w-[700px]">
      <SecurityItem {...args} />
    </div>
  ),
};

/**
 * Multiple security items stacked together.
 * Demonstrates how security items look when displayed in a list with different statuses.
 */
export const StackedItems: StoryWithRender = {
  render: () => (
    <div className="w-[700px] space-y-4">
      <SecurityItem
        title="登录密码"
        description="安全性高的密码以便账号更安全。建议定期更换密码，且设置一个包含数字和字母的密码，并且长度超过8位以上的密码。"
        status="verified"
        actionHref="/home/security/password"
        actionLabel="修改"
      />
      <SecurityItem
        title="绑定手机"
        description="绑定手机后，您即可享受手机号登录、动态码登录、找回密码等，为了账号安全，建议您在更换手机号后第一时间更换绑定手机。"
        status="unverified"
        value="138****5678"
        actionHref="/home/security/phone"
        actionLabel="验证手机号"
      />
      <SecurityItem
        title="绑定邮箱"
        description="绑定邮箱后，您即可使用邮箱登录账号或找回密码等。"
        status="notSet"
        actionHref="/home/security/email"
        actionLabel="设置绑定邮箱"
      />
    </div>
  ),
};

/**
 * Long description example.
 * Tests how the component handles longer descriptive text.
 */
export const LongDescription: Story = {
  args: {
    title: "账号安全设置",
    description:
      "这是一个非常长的描述文本，用于测试组件在处理大量文本时的表现。安全性高的密码以便账号更安全。建议定期更换密码，且设置一个包含数字和字母的密码，并且长度超过8位以上的密码。同时，请确保您的密码不易被猜测，避免使用生日、电话号码等个人信息作为密码。",
    status: "notSet",
    actionHref: "/home/security",
    actionLabel: "立即设置",
  },
  render: args => (
    <div className="w-[700px]">
      <SecurityItem {...args} />
    </div>
  ),
};

/**
 * Custom action labels.
 * Demonstrates different action button labels.
 */
export const CustomActionLabel: Story = {
  args: {
    title: "双因素认证",
    description: "启用双因素认证可以大大提高账号安全性。",
    status: "notSet",
    actionHref: "/home/security/2fa",
    actionLabel: "立即启用",
  },
  render: args => (
    <div className="w-[700px]">
      <SecurityItem {...args} />
    </div>
  ),
};
