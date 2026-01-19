import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { OtpInput } from "./otp-input";

describe("OtpInput", () => {
  const defaultProps = {
    value: "",
    onChange: vi.fn(),
    onSendOtp: vi.fn(),
    countdown: 0,
    hasSent: false,
  };

  it("renders with default props", () => {
    render(<OtpInput {...defaultProps} />);

    const input = screen.getByPlaceholderText("验证码");
    const button = screen.getByRole("button", { name: "发送验证码" });

    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    expect(button).toBeEnabled();
  });

  it("displays custom placeholder", () => {
    render(<OtpInput {...defaultProps} placeholder="6位数字" />);

    expect(screen.getByPlaceholderText("6位数字")).toBeInTheDocument();
  });

  it("renders controlled value", () => {
    render(<OtpInput {...defaultProps} value="123456" />);

    const input = screen.getByPlaceholderText("验证码");
    expect(input).toHaveValue("123456");
  });

  it("calls onChange with filtered numeric value", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<OtpInput {...defaultProps} onChange={onChange} />);

    const input = screen.getByPlaceholderText("验证码");

    // Type alphanumeric characters
    await user.type(input, "abc123xyz456");

    // Should filter and only pass numeric characters
    // userEvent.type triggers onChange for each character
    // Check that the last call has all numeric digits
    const calls = onChange.mock.calls.map(call => call[0]);
    const numericCalls = calls.filter(call => call !== "");
    expect(numericCalls).toEqual(["1", "2", "3", "4", "5", "6"]);
  });

  it("calls onSendOtp when button is clicked", async () => {
    const user = userEvent.setup();
    const onSendOtp = vi.fn();
    render(<OtpInput {...defaultProps} onSendOtp={onSendOtp} />);

    const button = screen.getByRole("button", { name: "发送验证码" });
    await user.click(button);

    expect(onSendOtp).toHaveBeenCalledTimes(1);
  });

  it("shows resend text when OTP has been sent", () => {
    render(<OtpInput {...defaultProps} hasSent={true} />);

    expect(
      screen.getByRole("button", { name: "重发验证码" })
    ).toBeInTheDocument();
  });

  it("shows countdown text when counting down", () => {
    render(<OtpInput {...defaultProps} countdown={30} hasSent={true} />);

    expect(
      screen.getByRole("button", { name: "30秒后重试" })
    ).toBeInTheDocument();
  });

  it("disables button during countdown", () => {
    render(<OtpInput {...defaultProps} countdown={30} hasSent={true} />);

    const button = screen.getByRole("button", { name: "30秒后重试" });
    expect(button).toBeDisabled();
  });

  it("shows verifying text when isVerifying is true", () => {
    render(<OtpInput {...defaultProps} isVerifying={true} />);

    expect(
      screen.getByRole("button", { name: "验证中..." })
    ).toBeInTheDocument();
  });

  it("disables button when isVerifying is true", () => {
    render(<OtpInput {...defaultProps} isVerifying={true} />);

    const button = screen.getByRole("button", { name: "验证中..." });
    expect(button).toBeDisabled();
  });

  it("disables input and button when isLoading is true", () => {
    render(<OtpInput {...defaultProps} isLoading={true} />);

    const input = screen.getByPlaceholderText("验证码");
    const button = screen.getByRole("button", { name: "发送验证码" });

    expect(input).toBeDisabled();
    expect(button).toBeDisabled();
  });

  it("disables input and button when disabled prop is true", () => {
    render(<OtpInput {...defaultProps} disabled={true} />);

    const input = screen.getByPlaceholderText("验证码");
    const button = screen.getByRole("button", { name: "发送验证码" });

    expect(input).toBeDisabled();
    expect(button).toBeDisabled();
  });

  it("respects maxLength prop", () => {
    render(<OtpInput {...defaultProps} maxLength={4} />);

    const input = screen.getByPlaceholderText("验证码");
    expect(input).toHaveAttribute("maxLength", "4");
  });

  it("applies custom className to container", () => {
    const { container } = render(
      <OtpInput {...defaultProps} className="custom-class" />
    );

    const wrapper = container.firstChild;
    expect(wrapper).toHaveClass("custom-class");
  });

  it("applies custom inputClassName to input", () => {
    render(<OtpInput {...defaultProps} inputClassName="custom-input" />);

    const input = screen.getByPlaceholderText("验证码");
    expect(input).toHaveClass("custom-input");
  });

  it("filters out non-numeric characters in onChange", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<OtpInput {...defaultProps} onChange={onChange} />);

    const input = screen.getByPlaceholderText("验证码");

    // Clear previous calls
    onChange.mockClear();

    // Type various non-numeric characters
    await user.type(input, "a!@#$%^&*()");

    // Should be called with empty string (all filtered out)
    expect(onChange).toHaveBeenCalledWith("");
  });

  it("shows correct button text priority: verifying > countdown > hasSent", () => {
    const { rerender } = render(
      <OtpInput {...defaultProps} countdown={10} hasSent={true} />
    );

    // Countdown takes priority
    expect(
      screen.getByRole("button", { name: "10秒后重试" })
    ).toBeInTheDocument();

    // Verifying takes highest priority
    rerender(
      <OtpInput
        {...defaultProps}
        countdown={10}
        hasSent={true}
        isVerifying={true}
      />
    );
    expect(
      screen.getByRole("button", { name: "验证中..." })
    ).toBeInTheDocument();

    // After countdown, show resend
    rerender(<OtpInput {...defaultProps} countdown={0} hasSent={true} />);
    expect(
      screen.getByRole("button", { name: "重发验证码" })
    ).toBeInTheDocument();

    // Initially, show send
    rerender(<OtpInput {...defaultProps} countdown={0} hasSent={false} />);
    expect(
      screen.getByRole("button", { name: "发送验证码" })
    ).toBeInTheDocument();
  });
});
