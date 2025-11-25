import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import PhoneLoginForm from "./phone-login";

describe("PhoneLoginForm", () => {
  /**
   * Test 1: Component Rendering
   * Verify that the component renders correctly with all required fields
   */
  it("should render all form fields correctly", () => {
    const onSubmit = vi.fn();
    render(<PhoneLoginForm onSubmit={onSubmit} />);

    // Check phone number field
    expect(screen.getByLabelText("手机号")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("请输入手机号")).toBeInTheDocument();

    // Check password field
    expect(screen.getByLabelText("密码")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("请输入密码")).toBeInTheDocument();

    // Check terms agreement checkbox
    expect(screen.getByRole("checkbox")).toBeInTheDocument();
    expect(screen.getByText("服务协议")).toBeInTheDocument();
    expect(screen.getByText("隐私政策")).toBeInTheDocument();

    // Check submit button
    expect(screen.getByRole("button", { name: "登录" })).toBeInTheDocument();
  });

  /**
   * Test 2: Form Validation - Empty Phone Number
   * Verify that empty phone number shows validation error
   */
  it("should show validation error for empty phone number", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(<PhoneLoginForm onSubmit={onSubmit} />);

    // Fill password and agree to terms
    await user.type(screen.getByPlaceholderText("请输入密码"), "Password123");
    await user.click(screen.getByRole("checkbox"));

    // Submit form without phone number
    await user.click(screen.getByRole("button", { name: "登录" }));

    // Should show validation error
    await waitFor(() => {
      expect(screen.getByPlaceholderText("请输入手机号")).toBeInTheDocument();
    });

    // onSubmit should not be called
    expect(onSubmit).not.toHaveBeenCalled();
  });

  /**
   * Test 3: Form Validation - Invalid Phone Number Format
   * Verify that invalid phone number format shows validation error
   */
  it("should show validation error for invalid phone number format", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(<PhoneLoginForm onSubmit={onSubmit} />);

    // Enter invalid phone number (too short)
    await user.type(screen.getByPlaceholderText("请输入手机号"), "123");
    await user.type(screen.getByPlaceholderText("请输入密码"), "Password123");
    await user.click(screen.getByRole("checkbox"));

    // Submit form
    await user.click(screen.getByRole("button", { name: "登录" }));

    // Should show validation error
    await waitFor(() => {
      expect(
        screen.getByText("手机号格式不正确，请重新输入")
      ).toBeInTheDocument();
    });

    // onSubmit should not be called
    expect(onSubmit).not.toHaveBeenCalled();
  });

  /**
   * Test 4: Form Validation - Non-numeric Phone Number
   * Verify that non-numeric phone number shows validation error
   */
  it("should show validation error for non-numeric phone number", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(<PhoneLoginForm onSubmit={onSubmit} />);

    // Enter phone number with letters
    await user.type(screen.getByPlaceholderText("请输入手机号"), "138abc00000");
    await user.type(screen.getByPlaceholderText("请输入密码"), "Password123");
    await user.click(screen.getByRole("checkbox"));

    // Submit form
    await user.click(screen.getByRole("button", { name: "登录" }));

    // Should show validation error
    await waitFor(() => {
      expect(
        screen.getByText("手机号格式不正确，请重新输入")
      ).toBeInTheDocument();
    });

    // onSubmit should not be called
    expect(onSubmit).not.toHaveBeenCalled();
  });

  /**
   * Test 5: Form Validation - Empty Password
   * Verify that empty password shows validation error
   */
  it("should show validation error for empty password", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(<PhoneLoginForm onSubmit={onSubmit} />);

    // Fill phone number and agree to terms
    await user.type(screen.getByPlaceholderText("请输入手机号"), "13800138000");
    await user.click(screen.getByRole("checkbox"));

    // Submit form without password
    await user.click(screen.getByRole("button", { name: "登录" }));

    // Should show validation error
    await waitFor(() => {
      expect(screen.getByPlaceholderText("请输入密码")).toBeInTheDocument();
    });

    // onSubmit should not be called
    expect(onSubmit).not.toHaveBeenCalled();
  });

  /**
   * Test 6: Form Validation - Terms Agreement Required
   * Verify that terms agreement is required
   */
  it("should show validation error when terms are not agreed", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(<PhoneLoginForm onSubmit={onSubmit} />);

    // Fill phone number and password but don't agree to terms
    await user.type(screen.getByPlaceholderText("请输入手机号"), "13800138000");
    await user.type(screen.getByPlaceholderText("请输入密码"), "Password123");

    // Submit form
    await user.click(screen.getByRole("button", { name: "登录" }));

    // Should show validation error
    await waitFor(() => {
      expect(screen.getByText("请同意服务协议和隐私政策")).toBeInTheDocument();
    });

    // onSubmit should not be called
    expect(onSubmit).not.toHaveBeenCalled();
  });

  /**
   * Test 7: Successful Form Submission
   * Verify that valid form data calls onSubmit with correct data
   */
  it("should call onSubmit with correct data when form is valid", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(<PhoneLoginForm onSubmit={onSubmit} />);

    // Fill all fields with valid data
    await user.type(screen.getByPlaceholderText("请输入手机号"), "13800138000");
    await user.type(screen.getByPlaceholderText("请输入密码"), "Password123");
    await user.click(screen.getByRole("checkbox"));

    // Submit form
    await user.click(screen.getByRole("button", { name: "登录" }));

    // onSubmit should be called with correct data
    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledTimes(1);
      expect(onSubmit).toHaveBeenCalledWith({
        phoneNumber: "13800138000",
        password: "Password123",
        agreedToTerms: true,
      });
    });
  });

  /**
   * Test 8: Loading State
   * Verify that form fields and button are disabled when isLoading is true
   */
  it("should disable form fields and show loading text when isLoading is true", () => {
    const onSubmit = vi.fn();
    render(<PhoneLoginForm onSubmit={onSubmit} isLoading={true} />);

    // Phone number input should be disabled
    expect(screen.getByPlaceholderText("请输入手机号")).toBeDisabled();

    // Submit button should be disabled and show loading text
    const submitButton = screen.getByRole("button", { name: "登录中..." });
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toBeDisabled();
  });

  /**
   * Test 9: Phone Number Max Length
   * Verify that phone number input has maxLength of 11
   */
  it("should limit phone number input to 11 characters", () => {
    const onSubmit = vi.fn();
    render(<PhoneLoginForm onSubmit={onSubmit} />);

    const phoneInput = screen.getByPlaceholderText("请输入手机号");
    expect(phoneInput).toHaveAttribute("maxLength", "11");
  });

  /**
   * Test 10: Password Input Type
   * Verify that password field has type="password"
   */
  it("should render password field with type password", () => {
    const onSubmit = vi.fn();
    render(<PhoneLoginForm onSubmit={onSubmit} />);

    const passwordInput = screen.getByPlaceholderText("请输入密码");
    expect(passwordInput).toHaveAttribute("type", "password");
  });
});
