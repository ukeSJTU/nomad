import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";
import { expect, userEvent, within } from "storybook/test";

import UpdatePhoneForm from "@/components/security/update-phone-form";

const meta = {
  title: "Security/UpdatePhoneForm",
  component: UpdatePhoneForm,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof UpdatePhoneForm>;

export default meta;
type Story = Omit<StoryObj<typeof meta>, "args">;

/**
 * Default update phone form
 * Shows the form with current phone number and fields to enter new phone and OTP
 */
export const Default: Story = {
  render: () => (
    <div className="w-[500px] p-6">
      <UpdatePhoneForm
        currentPhoneNumber="138****5678"
        onSubmit={data => {
          console.log("Form submitted:", data);
        }}
        onSendOtp={phoneNumber => {
          console.log("OTP sent to:", phoneNumber);
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
        <UpdatePhoneForm
          currentPhoneNumber="138****5678"
          onSubmit={data => {
            console.log("Form submitted:", data);
          }}
          onSendOtp={phoneNumber => {
            console.log("OTP sent to:", phoneNumber);
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
 * Simulates a user successfully updating their phone number
 *
 * Test steps:
 * 1. Enter new phone number
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
      <UpdatePhoneForm
        currentPhoneNumber="138****5678"
        onSubmit={data => {
          console.log("Form submitted:", data);
        }}
        onSendOtp={phoneNumber => {
          console.log("OTP sent to:", phoneNumber);
        }}
      />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 1. Enter new phone number
    const phoneInput = canvas.getByPlaceholderText("请输入新手机号");
    await userEvent.type(phoneInput, "13987654321", { delay: 50 });

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
