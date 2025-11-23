import type { Meta, StoryObj } from "@storybook/nextjs-vite";
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
 * Bind mode - First-time email binding
 * Shows form for users who haven't set up an email yet
 *
 * Test steps:
 * 1. Enter email address
 * 2. Click send OTP button
 * 3. Enter OTP code
 * 4. Submit form
 */
export const BindMode: Story = {
  render: () => (
    <div className="w-[500px] p-6">
      <UpdateEmailForm
        currentEmail=""
        mode="bind"
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

    // 1. Enter email address
    const emailInput = canvas.getByPlaceholderText("请输入邮箱地址");
    await userEvent.type(emailInput, "newemail@example.com", { delay: 50 });

    // 2. Click send OTP button
    const sendOtpButton = canvas.getByRole("button", { name: /发送验证码/i });
    await userEvent.click(sendOtpButton);

    // 3. Enter OTP code
    const otpInput = canvas.getByPlaceholderText("6位数字");
    await userEvent.type(otpInput, "123456", { delay: 50 });

    // 4. Verify form is ready to submit
    const submitButton = canvas.getByRole("button", { name: /确认绑定/i });
    await expect(submitButton).toBeEnabled();

    // 5. Submit form
    await userEvent.click(submitButton);
  },
};

/**
 * Verify mode - Verify existing unverified email
 * Shows form for users who have set an email but haven't verified it
 * Email input is hidden, uses current email
 *
 * Test steps:
 * 1. Click send OTP button
 * 2. Enter OTP code
 * 3. Submit form
 */
export const VerifyMode: Story = {
  render: () => (
    <div className="w-[500px] p-6">
      <UpdateEmailForm
        currentEmail="user@example.com"
        mode="verify"
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

    // 1. Click send OTP button
    const sendOtpButton = canvas.getByRole("button", { name: /发送验证码/i });
    await userEvent.click(sendOtpButton);

    // 2. Enter OTP code
    const otpInput = canvas.getByPlaceholderText("6位数字");
    await userEvent.type(otpInput, "123456", { delay: 50 });

    // 3. Verify form is ready to submit
    const submitButton = canvas.getByRole("button", { name: /确认验证/i });
    await expect(submitButton).toBeEnabled();

    // 4. Submit form
    await userEvent.click(submitButton);
  },
};

/**
 * Update mode - Change verified email
 * Shows form for users changing their existing verified email
 *
 * Test steps:
 * 1. Enter new email address
 * 2. Click send OTP button
 * 3. Enter OTP code
 * 4. Submit form
 */
export const UpdateMode: Story = {
  render: () => (
    <div className="w-[500px] p-6">
      <UpdateEmailForm
        currentEmail="user@example.com"
        mode="update"
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
