import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, userEvent, within } from "storybook/test";

import EmailLoginForm from "@/components/auth/forms/email-login";

const meta = {
  title: "Auth/EmailLoginForm",
  component: EmailLoginForm,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof EmailLoginForm>;

export default meta;
type Story = Omit<StoryObj<typeof meta>, "args">;

/**
 * Default email login form
 * Shows the basic form structure with email, password, and terms checkbox
 */
export const Default: Story = {
  render: () => (
    <div className="w-[400px] p-6">
      <EmailLoginForm
        onSubmit={data => {
          console.log("Form submitted:", data);
        }}
      />
    </div>
  ),
};

/**
 * Loading state
 * Shows the form in loading state during submission
 */
export const Loading: Story = {
  render: () => (
    <div className="w-[400px] p-6">
      <EmailLoginForm
        onSubmit={data => {
          console.log("Form submitted:", data);
        }}
        isLoading={true}
      />
    </div>
  ),
};

/**
 * Happy Path smoke test
 * Simulates a user successfully logging in with email and password
 *
 * Test steps:
 * 1. Enter valid email address
 * 2. Enter password
 * 3. Agree to terms
 * 4. Submit form
 *
 * Note: This is a basic smoke test for visual verification.
 * Detailed validation logic, error states, and edge cases
 * should be tested in email-login.test.tsx using RTL
 */
export const HappyPath: Story = {
  render: () => (
    <div className="w-[400px] p-6">
      <EmailLoginForm
        onSubmit={data => {
          console.log("Form submitted:", data);
        }}
      />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 1. Enter valid email address
    const emailInput = canvas.getByPlaceholderText("请输入邮箱地址");
    await userEvent.type(emailInput, "test@example.com", { delay: 50 });

    // 2. Enter password
    const passwordInput = canvas.getByPlaceholderText("请输入密码");
    await userEvent.type(passwordInput, "Password123", { delay: 50 });

    // 3. Agree to terms
    const termsCheckbox = canvas.getByRole("checkbox");
    await userEvent.click(termsCheckbox);

    // 4. Verify form is ready to submit
    const submitButton = canvas.getByRole("button", { name: /登录/i });
    await expect(submitButton).toBeEnabled();

    // 5. Submit form
    await userEvent.click(submitButton);
  },
};
