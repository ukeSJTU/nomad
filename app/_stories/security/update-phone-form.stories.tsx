import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, userEvent, within } from "storybook/test";

import UpdatePhoneForm from "@/components/security/update-phone-form";
import storyLogger from "@/infra/logging/storybook-logger";

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
 * Bind mode - First-time phone number binding
 * Shows form for users who haven't set up a phone number yet
 *
 * Test steps:
 * 1. Enter phone number
 * 2. Click send OTP button
 * 3. Enter OTP code
 * 4. Submit form
 */
export const BindMode: Story = {
  render: () => (
    <div className="w-[500px] p-6">
      <UpdatePhoneForm
        currentPhoneNumber={null}
        mode="bind"
        onSubmit={data => {
          storyLogger.info("Form submitted:", data);
        }}
        onSendOtp={phoneNumber => {
          storyLogger.info("OTP sent to:", phoneNumber);
        }}
      />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 1. Enter phone number
    const phoneInput = canvas.getByPlaceholderText("请输入手机号");
    await userEvent.type(phoneInput, "13987654321", { delay: 50 });

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
 * Verify mode - Verify existing unverified phone number
 * Shows form for users who have set a phone number but haven't verified it
 * Phone input is hidden, uses current phone number
 *
 * Test steps:
 * 1. Click send OTP button
 * 2. Enter OTP code
 * 3. Submit form
 */
export const VerifyMode: Story = {
  render: () => (
    <div className="w-[500px] p-6">
      <UpdatePhoneForm
        currentPhoneNumber="13812345678"
        mode="verify"
        onSubmit={data => {
          storyLogger.info("Form submitted:", data);
        }}
        onSendOtp={phoneNumber => {
          storyLogger.info("OTP sent to:", phoneNumber);
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
 * Update mode - Change verified phone number
 * Shows form for users changing their existing verified phone number
 *
 * Test steps:
 * 1. Enter new phone number
 * 2. Click send OTP button
 * 3. Enter OTP code
 * 4. Submit form
 */
export const UpdateMode: Story = {
  render: () => (
    <div className="w-[500px] p-6">
      <UpdatePhoneForm
        currentPhoneNumber="13812345678"
        mode="update"
        onSubmit={data => {
          storyLogger.info("Form submitted:", data);
        }}
        onSendOtp={phoneNumber => {
          storyLogger.info("OTP sent to:", phoneNumber);
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
