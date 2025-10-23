import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import PhoneOtpLoginForm from "./phone-otp-login";

describe("PhoneOtpLoginForm", () => {
  it("should render all form fields correctly", () => {
    const onSubmit = vi.fn();
    render(<PhoneOtpLoginForm onSubmit={onSubmit} />);

    expect(screen.getByLabelText("手机号")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("请输入手机号")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("6位数字")).toBeInTheDocument();
    expect(screen.getByRole("checkbox")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "发送验证码" })
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "登录" })).toBeInTheDocument();
  });

  it("should show validation error for empty phone number", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(<PhoneOtpLoginForm onSubmit={onSubmit} />);

    await user.type(screen.getByPlaceholderText("6位数字"), "123456");
    await user.click(screen.getByRole("checkbox"));
    await user.click(screen.getByRole("button", { name: "登录" }));

    await waitFor(() => {
      expect(screen.getByText("请输入手机号")).toBeInTheDocument();
    });
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("should show validation error for invalid phone number", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(<PhoneOtpLoginForm onSubmit={onSubmit} />);

    await user.type(screen.getByPlaceholderText("请输入手机号"), "123");
    await user.type(screen.getByPlaceholderText("6位数字"), "123456");
    await user.click(screen.getByRole("checkbox"));
    await user.click(screen.getByRole("button", { name: "登录" }));

    await waitFor(() => {
      expect(screen.getByText("手机号码至少11位")).toBeInTheDocument();
    });
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("should show validation error for invalid OTP format", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(<PhoneOtpLoginForm onSubmit={onSubmit} />);

    await user.type(screen.getByPlaceholderText("请输入手机号"), "13800138000");
    await user.type(screen.getByPlaceholderText("6位数字"), "123");
    await user.click(screen.getByRole("checkbox"));
    await user.click(screen.getByRole("button", { name: "登录" }));

    await waitFor(() => {
      expect(screen.getByText("验证码必须是6位数字")).toBeInTheDocument();
    });
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("should show validation error when terms are not agreed", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(<PhoneOtpLoginForm onSubmit={onSubmit} />);

    await user.type(screen.getByPlaceholderText("请输入手机号"), "13800138000");
    await user.type(screen.getByPlaceholderText("6位数字"), "123456");
    await user.click(screen.getByRole("button", { name: "登录" }));

    await waitFor(() => {
      expect(screen.getByText("请同意服务协议和隐私政策")).toBeInTheDocument();
    });
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("should call onSubmit with correct data when form is valid", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(<PhoneOtpLoginForm onSubmit={onSubmit} />);

    await user.type(screen.getByPlaceholderText("请输入手机号"), "13800138000");
    await user.type(screen.getByPlaceholderText("6位数字"), "123456");
    await user.click(screen.getByRole("checkbox"));
    await user.click(screen.getByRole("button", { name: "登录" }));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({
        phoneNumber: "13800138000",
        otp: "123456",
        agreedToTerms: true,
      });
    });
  });

  it("should call onSendOtp when send OTP button is clicked with valid phone", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    const onSendOtp = vi.fn();
    render(<PhoneOtpLoginForm onSubmit={onSubmit} onSendOtp={onSendOtp} />);

    await user.type(screen.getByPlaceholderText("请输入手机号"), "13800138000");
    await user.click(screen.getByRole("button", { name: "发送验证码" }));

    await waitFor(() => {
      expect(onSendOtp).toHaveBeenCalledTimes(1);
    });
  });

  it("should not call onSendOtp when phone number is invalid", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    const onSendOtp = vi.fn();
    render(<PhoneOtpLoginForm onSubmit={onSubmit} onSendOtp={onSendOtp} />);

    await user.type(screen.getByPlaceholderText("请输入手机号"), "123");
    await user.click(screen.getByRole("button", { name: "发送验证码" }));

    await waitFor(() => {
      expect(screen.getByText("手机号码至少11位")).toBeInTheDocument();
    });
    expect(onSendOtp).not.toHaveBeenCalled();
  });

  it("should show countdown text when countdown is active", () => {
    const onSubmit = vi.fn();
    render(<PhoneOtpLoginForm onSubmit={onSubmit} countdown={60} />);

    expect(screen.getByRole("button", { name: "60s" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "60s" })).toBeDisabled();
  });

  it("should disable form when isLoading is true", () => {
    const onSubmit = vi.fn();
    render(<PhoneOtpLoginForm onSubmit={onSubmit} isLoading={true} />);

    expect(screen.getByPlaceholderText("请输入手机号")).toBeDisabled();
    expect(screen.getByRole("button", { name: "登录中..." })).toBeDisabled();
  });
});
