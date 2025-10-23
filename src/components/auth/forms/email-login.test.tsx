import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import EmailLoginForm from "./email-login";

describe("EmailLoginForm", () => {
  it("should render all form fields correctly", () => {
    const onSubmit = vi.fn();
    render(<EmailLoginForm onSubmit={onSubmit} />);

    expect(screen.getByLabelText("邮箱")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("请输入邮箱")).toBeInTheDocument();
    expect(screen.getByLabelText("密码")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("请输入密码")).toBeInTheDocument();
    expect(screen.getByRole("checkbox")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "登录" })).toBeInTheDocument();
  });

  it("should show validation error for empty email", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(<EmailLoginForm onSubmit={onSubmit} />);

    await user.type(screen.getByPlaceholderText("请输入密码"), "Password123");
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
    render(<EmailLoginForm onSubmit={onSubmit} />);

    await user.type(screen.getByPlaceholderText("请输入邮箱"), "invalid-email");
    await user.type(screen.getByPlaceholderText("请输入密码"), "Password123");
    await user.click(screen.getByRole("checkbox"));
    await user.click(screen.getByRole("button", { name: "登录" }));

    await waitFor(() => {
      expect(screen.getByText("请输入有效的邮箱地址")).toBeInTheDocument();
    });
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("should show validation error for empty password", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(<EmailLoginForm onSubmit={onSubmit} />);

    await user.type(
      screen.getByPlaceholderText("请输入邮箱"),
      "test@example.com"
    );
    await user.click(screen.getByRole("checkbox"));
    await user.click(screen.getByRole("button", { name: "登录" }));

    await waitFor(() => {
      expect(screen.getByText("请输入密码")).toBeInTheDocument();
    });
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("should show validation error when terms are not agreed", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(<EmailLoginForm onSubmit={onSubmit} />);

    await user.type(
      screen.getByPlaceholderText("请输入邮箱"),
      "test@example.com"
    );
    await user.type(screen.getByPlaceholderText("请输入密码"), "Password123");
    await user.click(screen.getByRole("button", { name: "登录" }));

    await waitFor(() => {
      expect(screen.getByText("请同意服务协议和隐私政策")).toBeInTheDocument();
    });
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("should call onSubmit with correct data when form is valid", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(<EmailLoginForm onSubmit={onSubmit} />);

    await user.type(
      screen.getByPlaceholderText("请输入邮箱"),
      "test@example.com"
    );
    await user.type(screen.getByPlaceholderText("请输入密码"), "Password123");
    await user.click(screen.getByRole("checkbox"));
    await user.click(screen.getByRole("button", { name: "登录" }));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({
        email: "test@example.com",
        password: "Password123",
        agreedToTerms: true,
      });
    });
  });

  it("should disable form when isLoading is true", () => {
    const onSubmit = vi.fn();
    render(<EmailLoginForm onSubmit={onSubmit} isLoading={true} />);

    expect(screen.getByPlaceholderText("请输入邮箱")).toBeDisabled();
    expect(screen.getByRole("button", { name: "登录中..." })).toBeDisabled();
  });
});
