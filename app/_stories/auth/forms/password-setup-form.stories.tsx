import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, userEvent, within } from "storybook/test";

import PasswordSetupForm from "@/components/auth/forms/password-setup";

const meta = {
  title: "Auth/Forms/PasswordSetupForm",
  component: PasswordSetupForm,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof PasswordSetupForm>;

export default meta;
type Story = Omit<StoryObj<typeof meta>, "args">;

/**
 * Default password setup form
 * Displays the basic form structure and password strength indicator
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
 * Form with verified account information
 * Shows which account the user is setting the password for
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
 * Happy Path smoke test
 * Simulates a user successfully filling and submitting the form
 *
 * Test steps:
 * 1. Enter a password that meets the requirements
 * 2. Enter the same confirm password
 * 3. Verify the password strength indicator is "strong"
 * 4. Click the submit button
 *
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

    // 1. Enter a password that meets the requirements
    const passwordInput = canvas.getByPlaceholderText("请输入密码");
    await userEvent.type(passwordInput, "zXc1ftzuio!@#", { delay: 50 });

    // 2. Enter the same confirm password
    const confirmPasswordInput = canvas.getByPlaceholderText("请再次输入密码");
    await userEvent.type(confirmPasswordInput, "zXc1ftzuio!@#", {
      delay: 50,
    });

    // 3. Verify the password strength indicator is "强"
    await expect(canvas.getByText("强")).toBeInTheDocument();

    // 4. Verify that the password requirements are met (green checkmarks)
    await expect(canvas.getByText("8-20位字符")).toHaveClass("text-chart-5");
    await expect(canvas.getByText("包含至少一个小写字母")).toHaveClass(
      "text-chart-5"
    );

    // 5. Click the submit button
    const submitButton = canvas.getByRole("button", { name: /完成注册/i });
    await userEvent.click(submitButton);
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
