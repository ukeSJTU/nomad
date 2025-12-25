import { Github } from "lucide-react";
import React from "react";

/**
 * 登录表单的视觉展示组件
 * 从 app/_components/auth/forms/unified-login.tsx 复制样式
 * 移除所有业务逻辑、hooks、验证等,仅保留视觉效果
 */

interface LoginFormVisualProps {
  /** 表单类型 */
  type?: "password" | "otp";
  /** 账号输入框的值(用于动画展示) */
  accountValue?: string;
  /** 密码输入框的值(用于动画展示) */
  passwordValue?: string;
  /** 验证码输入框的值(用于动画展示) */
  otpValue?: string;
  /** 是否勾选协议 */
  termsChecked?: boolean;
  /** 自定义类名 */
  className?: string;
}

export const LoginFormVisual: React.FC<LoginFormVisualProps> = ({
  type = "password",
  accountValue = "",
  passwordValue = "",
  otpValue = "",
  termsChecked = false,
  className = "",
}) => {
  return (
    <div className={`space-y-6 ${className}`}>
      <div className="space-y-4">
        {/* Title */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground mb-2">
            {type === "password" ? "账号密码登录" : "验证码登录"}
          </h1>
        </div>

        {/* Account Input */}
        <div>
          <input
            type="text"
            value={accountValue}
            placeholder={
              type === "password" ? "国内手机号/用户名/邮箱" : "国内手机号/邮箱"
            }
            className="flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
            readOnly
          />
        </div>

        {/* Password Input (for password login) */}
        {type === "password" && (
          <div className="relative">
            <input
              type="password"
              value={passwordValue}
              placeholder="登录密码"
              className="flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 pr-20 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
              readOnly
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-primary hover:text-primary/90 cursor-pointer">
              忘记密码
            </span>
          </div>
        )}

        {/* OTP Input (for OTP login) */}
        {type === "otp" && (
          <div className="relative">
            <input
              type="text"
              value={otpValue}
              placeholder="短信验证码"
              className="flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 pr-24 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
              readOnly
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-primary hover:text-primary/90 cursor-pointer">
              获取验证码
            </button>
          </div>
        )}

        {/* Submit Button */}
        <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 w-full h-12 bg-secondary hover:bg-secondary/90 text-white">
          登 录
        </button>

        {/* Terms Agreement Checkbox */}
        <div className="flex flex-row items-start space-x-2 space-y-0">
          <button
            type="button"
            role="checkbox"
            aria-checked={termsChecked}
            className={`peer h-4 w-4 shrink-0 rounded-full border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${
              termsChecked ? "bg-primary text-primary-foreground" : ""
            }`}
          >
            {termsChecked && (
              <svg
                className="h-full w-full"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={3}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            )}
          </button>
          <label className="text-xs text-muted-foreground font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            阅读并同意Nomad的{" "}
            <span className="text-primary hover:text-primary/90 cursor-pointer">
              服务协议
            </span>{" "}
            及{" "}
            <span className="text-primary hover:text-primary/90 cursor-pointer">
              个人信息保护政策
            </span>
          </label>
        </div>

        {/* Bottom Links */}
        <div className="flex items-center justify-between text-sm pt-2">
          <button className="text-primary hover:text-primary/90 p-0 h-auto underline-offset-4 hover:underline">
            {type === "password" ? "验证码登录" : "账号登录"}
          </button>

          {type === "password" && (
            <span className="text-primary hover:text-primary/90 cursor-pointer">
              免费注册
            </span>
          )}
        </div>
      </div>

      {/* GitHub Login Button (only for password mode) */}
      {type === "password" && (
        <div className="flex items-center justify-start">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-foreground hover:bg-foreground/90 transition-colors cursor-pointer">
            <Github className="h-5 w-5 text-white" />
          </div>
        </div>
      )}
    </div>
  );
};
