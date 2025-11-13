import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";
import { expect, userEvent, within } from "storybook/test";

import UpdateEmailForm from "@/components/security/update-email-form";

const meta = {
  title: "Security/UpdateEmailForm",
  component: UpdateEmailForm,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof UpdateEmailForm>;

export default meta;
type Story = Omit<StoryObj<typeof meta>, "args">;

/**
 * Default update email form
 * Shows the form with current email and fields to enter new email and OTP
 */
export const Default: Story = {
  render: () => (
    <div className="w-[500px] p-6">
      <UpdateEmailForm
        currentEmail="user@example.com"
        onSubmit={data => {
          console.log("Form submitted:", data);
        }}
        onSendOtp={email => {
          console.log("OTP sent to:", email);
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
      <div className="w-[500px] p-6">
        <UpdateEmailForm
          currentEmail="user@example.com"
          onSubmit={data => {
            console.log("Form submitted:", data);
          }}
          onSendOtp={email => {
            console.log("OTP sent to:", email);
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
 * Simulates a user successfully updating their email address
 *
 * Test steps:
 * 1. Enter new email address
 * 2. Click send OTP button
 * 3. Enter OTP code
 * 4. Submit form
 *
 * Note: This is a basic smoke test for visual verification.
 * Detailed validation logic, error states, and edge cases
 * should be tested using RTL
 */
export const HappyPath: Story = {
  render: () => (
    <div className="w-[500px] p-6">
      <UpdateEmailForm
        currentEmail="user@example.com"
        onSubmit={data => {
          console.log("Form submitted:", data);
        }}
        onSendOtp={email => {
          console.log("OTP sent to:", email);
        }}
      />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 1. Enter new email address
    const emailInput = canvas.getByPlaceholderText("请输入新邮箱地址");
    await userEvent.type(emailInput, "newemail@example.com", { delay: 50 });

    // 2. Click send OTP button
    const sendOtpButton = canvas.getByRole("button", { name: /发送验证码/i });
    await userEvent.click(sendOtpButton);

    // 3. Enter OTP code
    const otpInput = canvas.getByPlaceholderText("6位数字");
    await userEvent.type(otpInput, "123456", { delay: 50 });

    // 4. Verify form is ready to submit
    const submitButton = canvas.getByRole("button", { name: /确认修改/i });
    await expect(submitButton).toBeEnabled();

    // 5. Submit form
    await userEvent.click(submitButton);
  },
};
