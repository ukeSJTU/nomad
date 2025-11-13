import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, userEvent, within } from "storybook/test";

import PasswordSetupForm from "@/components/auth/forms/password-setup";

const meta = {
  title: "Auth/PasswordSetupForm",
  component: PasswordSetupForm,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof PasswordSetupForm>;

export default meta;
type Story = Omit<StoryObj<typeof meta>, "args">;

/**
 * 默认的密码设置表单
 * 展示基本的表单结构和密码强度指示器
 */
export const Default: Story = {
  render: () => (
    <div className="w-[400px] p-6">
      <PasswordSetupForm
        onSubmit={data => {
          console.log("Form submitted:", data);
        }}
      />
    </div>
  ),
};

/**
 * 带有已验证账号信息的表单
 * 显示用户正在为哪个账号设置密码
 */
export const WithMaskedIdentifier: Story = {
  render: () => (
    <div className="w-[400px] p-6">
      <PasswordSetupForm
        onSubmit={data => {
          console.log("Form submitted:", data);
        }}
        maskedIdentifier="138****5678"
      />
    </div>
  ),
};

/**
 * Happy Path 冒烟测试
 * 模拟用户成功填写并提交表单的完整流程
 *
 * 测试步骤：
 * 1. 填写符合要求的密码
 * 2. 填写相同的确认密码
 * 3. 验证密码强度指示器显示为"强"
 * 4. 点击提交按钮
 *
 * 注意：这只是基本的冒烟测试，详细的验证逻辑、错误状态、
 * 边界情况等测试应该在 password-setup.test.tsx 中使用 RTL 进行
 */
export const HappyPath: Story = {
  render: () => (
    <div className="w-[400px] p-6">
      <PasswordSetupForm
        onSubmit={data => {
          console.log("Form submitted:", data);
        }}
        maskedIdentifier="138****5678"
      />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 1. 找到密码输入框并填写符合要求的密码
    const passwordInput = canvas.getByPlaceholderText("请输入密码");
    await userEvent.type(passwordInput, "TestPassword123", { delay: 50 });

    // 2. 找到确认密码输入框并填写相同的密码
    const confirmPasswordInput = canvas.getByPlaceholderText("请再次输入密码");
    await userEvent.type(confirmPasswordInput, "TestPassword123", {
      delay: 50,
    });

    // 3. 验证密码强度显示为"弱"
    await expect(canvas.getByText("弱")).toBeInTheDocument();

    // 4. 验证所有必需的密码要求都已满足（显示绿色勾选）
    await expect(canvas.getByText("8-20位字符")).toHaveClass("text-green-600");
    await expect(canvas.getByText("包含至少一个大写字母")).toHaveClass(
      "text-green-600"
    );
    await expect(canvas.getByText("包含至少一个小写字母")).toHaveClass(
      "text-green-600"
    );

    // 5. 点击提交按钮
    const submitButton = canvas.getByRole("button", { name: /完成注册/i });
    await userEvent.click(submitButton);

    // 注意：实际的表单提交、API 调用、路由跳转等逻辑
    // 应该在 RTL 测试中进行 mock 和验证
  },
};

/**
 * 加载状态
 * 展示表单提交时的加载状态
 */
export const Loading: Story = {
  render: () => (
    <div className="w-[400px] p-6">
      <PasswordSetupForm
        onSubmit={data => {
          console.log("Form submitted:", data);
        }}
        isLoading={true}
        maskedIdentifier="138****5678"
      />
    </div>
  ),
};
