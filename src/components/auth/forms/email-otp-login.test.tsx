import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import EmailOtpLoginForm from "./email-otp-login";

describe("EmailOtpLoginForm", () => {
  it("should render all form fields correctly", () => {
    const onSubmit = vi.fn();
    render(<EmailOtpLoginForm onSubmit={onSubmit} />);

    expect(screen.getByLabelText("邮箱地址")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("请输入邮箱地址")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("6位数字")).toBeInTheDocument();
    expect(screen.getByRole("checkbox")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "发送验证码" })
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "登录" })).toBeInTheDocument();
  });

  it("should show validation error for empty email", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(<EmailOtpLoginForm onSubmit={onSubmit} />);

    await user.type(screen.getByPlaceholderText("6位数字"), "123456");
    await user.click(screen.getByRole("checkbox"));
    await user.click(screen.getByRole("button", { name: "登录" }));

    await waitFor(() => {
      expect(screen.getByText("请输入邮箱地址")).toBeInTheDocument();
    });
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("should show validation error for invalid email format", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(<EmailOtpLoginForm onSubmit={onSubmit} />);

    await user.type(
      screen.getByPlaceholderText("请输入邮箱地址"),
      "invalid-email"
    );
    await user.type(screen.getByPlaceholderText("6位数字"), "123456");
    await user.click(screen.getByRole("checkbox"));
    await user.click(screen.getByRole("button", { name: "登录" }));

    await waitFor(() => {
      expect(screen.getByText("请输入有效的邮箱地址")).toBeInTheDocument();
    });
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("should show validation error for invalid OTP", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(<EmailOtpLoginForm onSubmit={onSubmit} />);

    await user.type(
      screen.getByPlaceholderText("请输入邮箱地址"),
      "test@example.com"
    );
    await user.type(screen.getByPlaceholderText("6位数字"), "123");
    await user.click(screen.getByRole("checkbox"));
    await user.click(screen.getByRole("button", { name: "登录" }));

    await waitFor(() => {
      expect(screen.getByText("验证码必须是6位数字")).toBeInTheDocument();
    });
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("should call onSubmit with correct data when form is valid", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(<EmailOtpLoginForm onSubmit={onSubmit} />);

    await user.type(
      screen.getByPlaceholderText("请输入邮箱地址"),
      "test@example.com"
    );
    await user.type(screen.getByPlaceholderText("6位数字"), "123456");
    await user.click(screen.getByRole("checkbox"));
    await user.click(screen.getByRole("button", { name: "登录" }));

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
    render(<EmailOtpLoginForm onSubmit={onSubmit} onSendOtp={onSendOtp} />);

    await user.type(
      screen.getByPlaceholderText("请输入邮箱地址"),
      "test@example.com"
    );
    await user.click(screen.getByRole("button", { name: "发送验证码" }));

    await waitFor(() => {
      expect(onSendOtp).toHaveBeenCalledTimes(1);
    });
  });

  it("should show countdown when countdown is active", () => {
    const onSubmit = vi.fn();
    render(<EmailOtpLoginForm onSubmit={onSubmit} countdown={60} />);

    expect(screen.getByRole("button", { name: "60s" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "60s" })).toBeDisabled();
  });
});
