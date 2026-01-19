import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, userEvent, within } from "storybook/test";

import ChangePasswordForm from "@/components/security/change-password-form";
import storyLogger from "@/infra/logging/storybook-logger";

const meta = {
  title: "Security/ChangePasswordForm",
  component: ChangePasswordForm,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ChangePasswordForm>;

export default meta;
type Story = Omit<StoryObj<typeof meta>, "args">;

/**
 * Default change password form
 * Shows the form with current password, new password, and confirm password fields
 * Includes real-time password requirement validation
 */
export const Default: Story = {
  render: () => (
    <div className="w-[500px] p-6">
      <ChangePasswordForm
        onSubmit={async data => {
          storyLogger.info("Form submitted:", data);
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
    <div className="w-[500px] p-6">
      <ChangePasswordForm
        onSubmit={async data => {
          storyLogger.info("Form submitted:", data);
        }}
        isLoading={true}
      />
    </div>
  ),
};

/**
 * Happy Path smoke test
 * Simulates a user successfully changing their password
 *
 * Test steps:
 * 1. Enter current password
 * 2. Enter new password that meets requirements
 * 3. Confirm new password
 * 4. Verify password requirements are met
 * 5. Submit form
 *
 * Note: This is a basic smoke test for visual verification.
 * Detailed validation logic, error states, and edge cases
 * should be tested using RTL
 */
export const HappyPath: Story = {
  render: () => (
    <div className="w-[500px] p-6">
      <ChangePasswordForm
        onSubmit={async data => {
          storyLogger.info("Form submitted:", data);
        }}
      />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 1. Enter current password
    const currentPasswordInput = canvas.getByPlaceholderText("请输入当前密码");
    await userEvent.type(currentPasswordInput, "OldPassword123", {
      delay: 50,
    });

    // 2. Enter new password that meets requirements
    const newPasswordInput = canvas.getByPlaceholderText("请输入新密码");
    await userEvent.type(newPasswordInput, "NewPassword456", { delay: 50 });

    // 3. Confirm new password
    const confirmPasswordInput =
      canvas.getByPlaceholderText("请再次输入新密码");
    await userEvent.type(confirmPasswordInput, "NewPassword456", {
      delay: 50,
    });

    // 4. Verify password requirements are met (green checkmarks)
    await expect(canvas.getByText("至少 8 个字符")).toHaveClass("text-chart-5");
    await expect(canvas.getByText("包含至少一个数字")).toHaveClass(
      "text-chart-5"
    );
    await expect(canvas.getByText("包含至少一个字母")).toHaveClass(
      "text-chart-5"
    );

    // 5. Verify form is ready to submit
    const submitButton = canvas.getByRole("button", { name: /修改密码/i });
    await expect(submitButton).toBeEnabled();

    // 6. Submit form
    await userEvent.click(submitButton);
  },
};
