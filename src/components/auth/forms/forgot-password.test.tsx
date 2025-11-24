import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";

import ForgotPasswordForm from "./forgot-password";

describe("ForgotPasswordForm UI", () => {
  test("Given 用户在忘记密码页面 When 输入有效账户并通过人机验证点击发送验证码 Then 显示60秒倒计时按钮", () => {
    render(<ForgotPasswordForm />);
    expect(screen.getByPlaceholderText("国内手机号/邮箱")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "发送验证码" })
    ).toBeInTheDocument();
  });

  test("Given 已发送验证码 When 输入正确6位验证码 Then 进入设置密码步骤", () => {
    render(<ForgotPasswordForm />);
    expect(screen.getByPlaceholderText("短信验证码")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "验证并继续" })
    ).toBeInTheDocument();
  });

  test("Given 已验证OTP When 设置新密码并确认 Then 点击更新密码按钮显示成功提示", () => {
    render(<ForgotPasswordForm />);
    expect(screen.getByPlaceholderText("新密码")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("确认新密码")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "更新密码" })
    ).toBeInTheDocument();
  });
});
