import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";

import UnifiedLoginForm from "@/components/auth/forms/unified-login";

const meta = {
  title: "Auth/Forms/UnifiedLoginForm",
  component: UnifiedLoginForm,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof UnifiedLoginForm>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default password login form
 * Shows the basic form structure with email, password, and terms checkbox
 */
export const PasswordLogin: Story = {
  args: {
    onPasswordSubmit: fn(),
    onOtpSubmit: fn(),
    onSendOtp: fn(),
    initialLoginMethod: "password",
    isLoading: false,
  },
};

/**
 * Default otp login form
 * Shows the basic form structure with email, password, and terms checkbox
 */
export const OtpLogin: Story = {
  args: {
    onPasswordSubmit: fn(),
    onOtpSubmit: fn(),
    onSendOtp: fn(),
    initialLoginMethod: "otp",
    isLoading: false,
  },
};
