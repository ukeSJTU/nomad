import { zodResolver } from "@hookform/resolvers/zod";
import {
  VerificationForm,
  type VerificationFormData,
} from "@nomad/ui/components/auth";
import { Form } from "@nomad/ui/components/primitives/form";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { expect, userEvent, within } from "storybook/test";
import { z } from "zod";

import storyLogger from "@/infra/logging/storybook-logger";

// Schemas for validation
const phoneSchema = z.object({
  contact: z.string().regex(/^1[3-9]\d{9}$/, "手机号格式不正确"),
  otp: z.string().length(6, "验证码必须是6位数字"),
  agreedToTerms: z.boolean().refine(val => val === true, {
    message: "请同意服务协议和隐私政策",
  }),
});

const emailSchema = z.object({
  contact: z.string().email("邮箱格式不正确"),
  otp: z.string().length(6, "验证码必须是6位数字"),
  agreedToTerms: z.boolean().refine(val => val === true, {
    message: "请同意服务协议和隐私政策",
  }),
});

// Wrapper component for stories
function VerificationFormWrapper({
  mode,
  countdown: initialCountdown = 0,
  isLoading = false,
}: {
  mode: "phone" | "email";
  countdown?: number;
  isLoading?: boolean;
}) {
  const [countdown, setCountdown] = useState(initialCountdown);
  const schema = mode === "phone" ? phoneSchema : emailSchema;

  const form = useForm<VerificationFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      contact: "",
      otp: "",
      agreedToTerms: false,
    },
  });

  const handleSendOtp = () => {
    storyLogger.info("OTP sent for", mode);
    setCountdown(60);
  };

  const handleSubmit = (data: VerificationFormData) => {
    storyLogger.info("Form submitted:", data);
  };

  return (
    <div className="w-[400px] p-6">
      <Form {...form}>
        <VerificationForm
          mode={mode}
          control={form.control}
          errors={form.formState.errors}
          onSubmit={form.handleSubmit(handleSubmit)}
          onSendOtp={handleSendOtp}
          countdown={countdown}
          isLoading={isLoading}
        />
      </Form>
    </div>
  );
}

const meta = {
  title: "Auth/Forms/VerificationForm",
  component: VerificationForm,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof VerificationForm>;

export default meta;
type Story = Omit<StoryObj<typeof meta>, "args">;

/**
 * Phone verification form
 * Shows the form configured for phone number verification
 */
export const PhoneMode: Story = {
  render: () => <VerificationFormWrapper mode="phone" />,
};

/**
 * Email verification form
 * Shows the form configured for email verification
 */
export const EmailMode: Story = {
  render: () => <VerificationFormWrapper mode="email" />,
};

/**
 * Form with countdown timer for OTP resend
 * Demonstrates the countdown state when OTP has been sent
 */
export const WithCountdown: Story = {
  render: () => <VerificationFormWrapper mode="phone" countdown={60} />,
};

/**
 * Form in loading state
 * Shows disabled inputs and loading button text
 */
export const Loading: Story = {
  render: () => <VerificationFormWrapper mode="phone" isLoading />,
};

/**
 * Happy Path smoke test - Phone
 * Simulates a user successfully completing the phone verification flow
 */
export const PhoneHappyPath: Story = {
  render: () => <VerificationFormWrapper mode="phone" />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 1. Enter valid phone number
    const phoneInput = canvas.getByPlaceholderText("请输入手机号");
    await userEvent.type(phoneInput, "13812345678", { delay: 50 });

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
    const submitButton = canvas.getByRole("button", { name: /下一步/i });
    await expect(submitButton).toBeEnabled();

    // 6. Submit form
    await userEvent.click(submitButton);
  },
};

/**
 * Happy Path smoke test - Email
 * Simulates a user successfully completing the email verification flow
 */
export const EmailHappyPath: Story = {
  render: () => <VerificationFormWrapper mode="email" />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 1. Enter valid email
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
    const submitButton = canvas.getByRole("button", { name: /下一步/i });
    await expect(submitButton).toBeEnabled();

    // 6. Submit form
    await userEvent.click(submitButton);
  },
};
