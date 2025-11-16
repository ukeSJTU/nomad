import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";
import { expect, userEvent, within } from "storybook/test";

import EmailOtpLoginForm from "@/components/auth/forms/email-otp-login";

const meta = {
  title: "Auth/EmailOtpLoginForm",
  component: EmailOtpLoginForm,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof EmailOtpLoginForm>;

export default meta;
type Story = Omit<StoryObj<typeof meta>, "args">;

/**
 * Default email OTP login form
 * Shows the basic form structure with email, OTP input, and terms checkbox
 */
export const Default: Story = {
  render: () => (
    <div className="w-[400px] p-6">
      <EmailOtpLoginForm
        onSubmit={data => {
          console.log("Form submitted:", data);
        }}
      />
    </div>
  ),
};

/**
 * Form with countdown timer for OTP resend
 * Demonstrates the countdown state when OTP has been sent
 */
export const WithCountdown: Story = {
  render: () => {
    const [countdown, setCountdown] = useState(60);

    return (
      <div className="w-[400px] p-6">
        <EmailOtpLoginForm
          onSubmit={data => {
            console.log("Form submitted:", data);
          }}
          onSendOtp={() => {
            console.log("OTP sent");
            setCountdown(60);
          }}
          countdown={countdown}
        />
      </div>
    );
  },
};

/**
 * Happy Path smoke test
 * Simulates a user successfully logging in with email and OTP
 *
 * Test steps:
 * 1. Enter valid email address
 * 2. Click send OTP button
 * 3. Enter OTP code
 * 4. Agree to terms
 * 5. Submit form
 *
 * Note: This is a basic smoke test for visual verification.
 * Detailed validation logic, error states, and edge cases
 * should be tested in email-otp-login.test.tsx using RTL
 */
export const HappyPath: Story = {
  render: () => (
    <div className="w-[400px] p-6">
      <EmailOtpLoginForm
        onSubmit={data => {
          console.log("Form submitted:", data);
        }}
        onSendOtp={() => {
          console.log("OTP sent");
        }}
      />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 1. Enter valid email address
    const emailInput = canvas.getByPlaceholderText("请输入邮箱地址");
    await userEvent.type(emailInput, "test@example.com", { delay: 50 });

    // 2. Click send OTP button
    const sendOtpButton = canvas.getByRole("button", { name: /发送验证码/i });
    await userEvent.click(sendOtpButton);

    // 3. Enter OTP code
    const otpInput = canvas.getByPlaceholderText("6位数字");
    await userEvent.type(otpInput, "123456", { delay: 50 });

    // 4. Agree to terms
    const termsCheckbox = canvas.getByRole("checkbox");
    await userEvent.click(termsCheckbox);

    // 5. Verify form is ready to submit
    const submitButton = canvas.getByRole("button", { name: /登录/i });
    await expect(submitButton).toBeEnabled();

    // 6. Submit form
    await userEvent.click(submitButton);
  },
};
