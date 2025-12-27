import React from "react";

/**
 * 注册表单的视觉展示组件 - 三步骤流程
 * 步骤1: 邮箱验证
 * 步骤2: 设置密码
 * 步骤3: 完成注册
 */

interface SignUpFormVisualProps {
  /** 当前步骤 1-3 */
  currentStep: 1 | 2 | 3;
  /** 邮箱输入框的值 */
  emailValue?: string;
  /** 验证码输入框的值(6位数字) */
  codeValue?: string;
  /** 发送验证码按钮状态 */
  codeSent?: boolean;
  /** 倒计时秒数 */
  countdown?: number;
  /** 密码输入框的值 */
  passwordValue?: string;
  /** 确认密码输入框的值 */
  confirmPasswordValue?: string;
  /** 是否显示成功状态 */
  showSuccess?: boolean;
  /** 自定义类名 */
  className?: string;
}

export const SignUpFormVisual: React.FC<SignUpFormVisualProps> = ({
  currentStep,
  emailValue = "",
  codeValue = "",
  codeSent = false,
  countdown = 60,
  passwordValue = "",
  confirmPasswordValue = "",
  showSuccess = false,
  className = "",
}) => {
  return (
    <div className={`space-y-6 ${className}`}>
      {/* Stepper 指示器 */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          {[1, 2, 3].map(step => (
            <div key={step} className="flex items-center flex-1">
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all ${
                  currentStep >= step
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-muted text-muted-foreground bg-background"
                }`}
              >
                <span className="text-sm font-semibold">{step}</span>
              </div>
              {step < 3 && (
                <div
                  className={`flex-1 h-0.5 mx-2 transition-all ${
                    currentStep > step ? "bg-primary" : "bg-muted"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            {currentStep === 1 && "1/3 邮箱验证"}
            {currentStep === 2 && "2/3 设置密码"}
            {currentStep === 3 && "3/3 完成"}
          </p>
        </div>
      </div>

      {/* Step 1: 邮箱验证 */}
      {currentStep === 1 && (
        <div className="space-y-4">
          <div className="mb-4">
            <h1 className="text-2xl font-bold text-foreground mb-2">
              注册账号
            </h1>
            <p className="text-sm text-muted-foreground">
              请输入您的邮箱地址以接收验证码
            </p>
          </div>

          {/* 邮箱输入 */}
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">
              邮箱地址
            </label>
            <input
              type="email"
              value={emailValue}
              placeholder="请输入邮箱地址"
              className="flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
              readOnly
            />
          </div>

          {/* 发送验证码按钮 */}
          <button
            className={`inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 w-full h-10 ${
              codeSent
                ? "bg-muted text-muted-foreground"
                : "bg-primary text-primary-foreground hover:bg-primary/90"
            }`}
          >
            {codeSent ? `已发送 (${countdown}s)` : "发送验证码"}
          </button>

          {/* 验证码输入 */}
          {codeSent && (
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                验证码
              </label>
              <div className="flex gap-2 justify-center">
                {[0, 1, 2, 3, 4, 5].map(index => (
                  <input
                    key={index}
                    type="text"
                    value={codeValue[index] || ""}
                    maxLength={1}
                    className="w-12 h-14 text-center text-xl font-semibold rounded-md border border-input bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    readOnly
                  />
                ))}
              </div>
            </div>
          )}

          {/* 下一步按钮 */}
          <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 w-full h-12 bg-secondary text-white hover:bg-secondary/90">
            下一步
          </button>
        </div>
      )}

      {/* Step 2: 设置密码 */}
      {currentStep === 2 && (
        <div className="space-y-4">
          <div className="mb-4">
            <h1 className="text-2xl font-bold text-foreground mb-2">
              设置密码
            </h1>
            <p className="text-sm text-muted-foreground">
              请设置您的账号密码，密码长度为8-20位
            </p>
          </div>

          {/* 密码输入 */}
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">
              设置密码
            </label>
            <input
              type="password"
              value={passwordValue}
              placeholder="请输入密码"
              className="flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
              readOnly
            />
          </div>

          {/* 确认密码输入 */}
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">
              确认密码
            </label>
            <input
              type="password"
              value={confirmPasswordValue}
              placeholder="请再次输入密码"
              className="flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
              readOnly
            />
          </div>

          {/* 下一步按钮 */}
          <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 w-full h-12 bg-secondary text-white hover:bg-secondary/90">
            下一步
          </button>
        </div>
      )}

      {/* Step 3: 完成注册 */}
      {currentStep === 3 && (
        <div className="space-y-6 py-8 text-center">
          {/* 成功图标 */}
          <div className="flex justify-center">
            <div
              className={`w-20 h-20 rounded-full bg-green-100 flex items-center justify-center transition-all duration-500 ${
                showSuccess ? "scale-100 opacity-100" : "scale-0 opacity-0"
              }`}
            >
              <svg
                className="w-12 h-12 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>

          {/* 成功文字 */}
          <div>
            <h1 className="text-2xl font-bold text-foreground mb-2">
              注册成功！
            </h1>
            <p className="text-sm text-muted-foreground">
              正在跳转到登录页面...
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
