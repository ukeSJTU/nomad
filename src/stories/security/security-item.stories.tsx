import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import SecurityItem from "@/components/security/security-item";

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
    isSet: {
      control: "boolean",
      description: "Whether the security item is set/configured",
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
 * Shows a warning icon and "未绑定" status.
 */
export const PasswordNotSet: Story = {
  args: {
    title: "登录密码",
    description:
      "安全性高的密码以便账号更安全。建议定期更换密码，且设置一个包含数字和字母的密码，并且长度超过8位以上的密码。",
    isSet: false,
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
 * Password security item when already set.
 * Shows a check icon and "已绑定" status without a value.
 */
export const PasswordSet: Story = {
  args: {
    title: "登录密码",
    description:
      "安全性高的密码以便账号更安全。建议定期更换密码，且设置一个包含数字和字母的密码，并且长度超过8位以上的密码。",
    isSet: true,
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
 * Phone number security item when not bound.
 * Shows a warning icon and "未绑定" status.
 */
export const PhoneNotBound: Story = {
  args: {
    title: "绑定手机",
    description:
      "绑定手机后，您即可享受手机号登录、动态码登录、找回密码等，为了账号安全，建议您在更换手机号后第一时间更换绑定手机。",
    isSet: false,
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
 * Phone number security item when bound.
 * Shows a check icon, "已绑定" status with masked phone number.
 */
export const PhoneBound: Story = {
  args: {
    title: "绑定手机",
    description:
      "绑定手机后，您即可享受手机号登录、动态码登录、找回密码等，为了账号安全，建议您在更换手机号后第一时间更换绑定手机。",
    isSet: true,
    value: "+86138****5678",
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
 * Email security item when not bound.
 * Shows a warning icon and "未绑定" status.
 */
export const EmailNotBound: Story = {
  args: {
    title: "绑定邮箱",
    description: "绑定邮箱后，您即可使用邮箱登录账号或找回密码等。",
    isSet: false,
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
 * Email security item when bound.
 * Shows a check icon, "已绑定" status with the email address.
 */
export const EmailBound: Story = {
  args: {
    title: "绑定邮箱",
    description: "绑定邮箱后，您即可使用邮箱登录账号或找回密码等。",
    isSet: true,
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
 * Demonstrates how security items look when displayed in a list.
 */
export const StackedItems: StoryWithRender = {
  render: () => (
    <div className="w-[700px] space-y-4">
      <SecurityItem
        title="登录密码"
        description="安全性高的密码以便账号更安全。建议定期更换密码，且设置一个包含数字和字母的密码，并且长度超过8位以上的密码。"
        isSet={true}
        actionHref="/home/security/password"
        actionLabel="修改"
      />
      <SecurityItem
        title="绑定手机"
        description="绑定手机后，您即可享受手机号登录、动态码登录、找回密码等，为了账号安全，建议您在更换手机号后第一时间更换绑定手机。"
        isSet={true}
        value="+86138****5678"
        actionHref="/home/security/phone"
        actionLabel="修改"
      />
      <SecurityItem
        title="绑定邮箱"
        description="绑定邮箱后，您即可使用邮箱登录账号或找回密码等。"
        isSet={false}
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
    isSet: false,
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
    isSet: false,
    actionHref: "/home/security/2fa",
    actionLabel: "立即启用",
  },
  render: args => (
    <div className="w-[700px]">
      <SecurityItem {...args} />
    </div>
  ),
};
