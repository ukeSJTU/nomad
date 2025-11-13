import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import EmailVerificationForm from "./email-verification";

vi.mock("@/components/security/turnstile-widget", () => ({
  TurnstileWidget: ({ onSuccess }: { onSuccess: (token: string) => void }) => (
    <button onClick={() => onSuccess("mock-token")}>Mock Turnstile</button>
  ),
}));

describe("EmailVerificationForm", () => {
  it("should show validation error for empty email", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(<EmailVerificationForm onSubmit={onSubmit} />);

    await user.type(screen.getByPlaceholderText("6位数字"), "123456");
    await user.click(screen.getByRole("checkbox"));
    await user.click(screen.getByRole("button", { name: "下一步，设置密码" }));

    await waitFor(() => {
      expect(screen.getByText("请输入邮箱地址")).toBeInTheDocument();
    });
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("should show validation error for invalid OTP", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(<EmailVerificationForm onSubmit={onSubmit} />);

    await user.type(
      screen.getByPlaceholderText("请输入邮箱地址"),
      "test@example.com"
    );
    await user.type(screen.getByPlaceholderText("6位数字"), "123");
    await user.click(screen.getByRole("checkbox"));
    await user.click(screen.getByRole("button", { name: "下一步，设置密码" }));

    await waitFor(() => {
      expect(screen.getByText("验证码必须是6位数字")).toBeInTheDocument();
    });
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("should call onSubmit with correct data when form is valid", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(<EmailVerificationForm onSubmit={onSubmit} />);

    await user.type(
      screen.getByPlaceholderText("请输入邮箱地址"),
      "test@example.com"
    );
    await user.type(screen.getByPlaceholderText("6位数字"), "123456");
    await user.click(screen.getByRole("checkbox"));
    await user.click(screen.getByRole("button", { name: "下一步，设置密码" }));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({
        email: "test@example.com",
        otp: "123456",
        agreedToTerms: true,
      });
    });
  });

  it("should call onSendOtp when send OTP button is clicked", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    const onSendOtp = vi.fn();
    render(<EmailVerificationForm onSubmit={onSubmit} onSendOtp={onSendOtp} />);

    await user.type(
      screen.getByPlaceholderText("请输入邮箱地址"),
      "test@example.com"
    );
    await user.click(screen.getByRole("button", { name: "Mock Turnstile" }));
    await user.click(screen.getByRole("button", { name: "发送验证码" }));

    await waitFor(() => {
      expect(onSendOtp).toHaveBeenCalledWith("mock-token");
    });
  });
});
