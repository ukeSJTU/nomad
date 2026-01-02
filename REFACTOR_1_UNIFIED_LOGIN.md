# 组件拆分案例 1: UnifiedLoginForm

## 📋 组件概述

**文件路径**: `apps/web/app/_components/auth/forms/unified-login.tsx`

**当前状态**: 630 行代码，包含多个子组件和复杂的状态管理逻辑

**复杂度**:

- ⭐⭐⭐⭐⭐ 高复杂度
- 包含两种登录方式（密码登录、OTP登录）
- 集成 Turnstile 人机验证
- 表单验证、错误处理、倒计时管理
- 多个内部子组件

---

## 🔍 当前代码结构分析

### 当前组件层级

```
UnifiedLoginForm (协调器)
├── PasswordLoginForm (密码登录)
│   ├── ErrorDisplay (错误展示)
│   ├── TermsCheckbox (协议勾选)
│   └── react-hook-form (表单管理)
└── OtpLoginForm (验证码登录)
    ├── ErrorDisplay (错误展示)
    ├── TermsCheckbox (协议勾选)
    ├── OtpInput (验证码输入)
    ├── TurnstileWidget (人机验证)
    ├── react-hook-form (表单管理)
    └── useOtpCountdown (倒计时逻辑)
```

### 混合在一起的关注点

1. **UI 渲染**: 表单布局、输入框、按钮
2. **表单管理**: `useForm`, 字段验证
3. **业务逻辑**: 登录切换、OTP 发送、Turnstile 集成
4. **状态管理**: `useState` (登录方式、验证状态)
5. **副作用**: Turnstile token 获取、倒计时

---

## ✨ 拆分方案

### 拆分目标

将组件拆分为 **3 层架构**:

1. **UI Components** (纯展示层) - 不包含任何逻辑
2. **Custom Hooks** (逻辑层) - 封装所有业务逻辑
3. **Container Components** (容器层) - 组合 UI 和逻辑

---

## 📁 拆分后的文件结构

```
auth/forms/unified-login/
├── index.tsx                          # 导出入口
├── UnifiedLoginForm.tsx               # 容器组件（协调器）
├── components/
│   ├── PasswordLoginFormUI.tsx        # 密码登录 UI 组件
│   ├── OtpLoginFormUI.tsx             # OTP 登录 UI 组件
│   ├── ErrorDisplay.tsx               # 错误展示组件
│   ├── TermsCheckbox.tsx              # 协议勾选组件
│   └── SocialLoginButton.tsx          # 社交登录按钮
├── hooks/
│   ├── usePasswordLogin.ts            # 密码登录逻辑
│   ├── useOtpLogin.ts                 # OTP 登录逻辑
│   └── useLoginMethod.ts              # 登录方式切换逻辑
└── types.ts                           # TypeScript 类型定义
```

---

## 💻 拆分后的代码实现

### 1. 类型定义 (`types.ts`)

```typescript
import type { ActionResult } from "@/types/common";
import type { FetchOptions } from "@/types/http";
import type { OtpLoginData, PasswordLoginData } from "@/types/validations";

export interface PasswordLoginFormUIProps {
  // 表单数据
  account: string;
  password: string;
  agreedToTerms: boolean;

  // 事件处理
  onAccountChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onTermsChange: (checked: boolean) => void;
  onSubmit: () => void;
  onSwitchToOtp: () => void;

  // 状态
  isLoading: boolean;
  errors: {
    account?: string;
    password?: string;
    agreedToTerms?: string;
  };

  // 其他
  className?: string;
}

export interface OtpLoginFormUIProps {
  // 表单数据
  account: string;
  otp: string;
  agreedToTerms: boolean;

  // 事件处理
  onAccountChange: (value: string) => void;
  onOtpChange: (value: string) => void;
  onTermsChange: (checked: boolean) => void;
  onSendOtp: () => void;
  onSubmit: () => void;
  onSwitchToPassword: () => void;

  // 状态
  isLoading: boolean;
  isVerifying: boolean;
  countdown: number;
  errors: {
    account?: string;
    otp?: string;
    agreedToTerms?: string;
  };

  // 其他
  className?: string;
}

export interface UnifiedLoginFormProps {
  onPasswordSubmit: (
    data: PasswordLoginData,
    fetchOptions?: FetchOptions
  ) => Promise<ActionResult>;

  onOtpSubmit: (
    data: OtpLoginData,
    fetchOptions?: FetchOptions
  ) => Promise<ActionResult>;

  onSendOtp: (
    account: string,
    fetchOptions?: FetchOptions
  ) => Promise<OtpSendActionResult>;

  initialLoginMethod?: "password" | "otp";
  isLoading?: boolean;
  className?: string;
}
```

---

### 2. UI 组件 - 密码登录 (`components/PasswordLoginFormUI.tsx`)

```tsx
"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

import { ErrorDisplay } from "./ErrorDisplay";
import { TermsCheckbox } from "./TermsCheckbox";
import type { PasswordLoginFormUIProps } from "../types";

/**
 * 密码登录表单 - 纯 UI 组件
 *
 * 职责:
 * - 渲染表单布局
 * - 显示输入框和按钮
 * - 展示错误信息
 * - 转发用户交互事件
 *
 * 不包含:
 * - 表单验证逻辑
 * - 状态管理
 * - 副作用处理
 */
export function PasswordLoginFormUI({
  account,
  password,
  agreedToTerms,
  onAccountChange,
  onPasswordChange,
  onTermsChange,
  onSubmit,
  onSwitchToOtp,
  isLoading,
  errors,
  className,
}: PasswordLoginFormUIProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  // 获取第一个错误信息（按优先级）
  const firstError = errors.account || errors.password;

  return (
    <form onSubmit={handleSubmit} className={cn("space-y-4", className)}>
      {/* 标题 */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground mb-2">
          账号密码登录
        </h1>
      </div>

      {/* 账号输入 */}
      <div>
        <Input
          type="text"
          value={account}
          onChange={e => onAccountChange(e.target.value)}
          placeholder="国内手机号/用户名/邮箱"
          className="h-12"
          disabled={isLoading}
          aria-label="账号"
          aria-invalid={!!errors.account}
        />
      </div>

      {/* 密码输入 */}
      <div>
        <div className="relative">
          <Input
            type="password"
            value={password}
            onChange={e => onPasswordChange(e.target.value)}
            placeholder="登录密码"
            className="h-12 pr-20"
            disabled={isLoading}
            aria-label="密码"
            aria-invalid={!!errors.password}
          />
          <Link
            href="/auth/forgot-password"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-primary hover:text-primary/90"
          >
            忘记密码
          </Link>
        </div>
      </div>

      {/* 错误提示 */}
      <ErrorDisplay message={firstError} />

      {/* 登录按钮 */}
      <Button
        type="submit"
        className="w-full h-12 bg-secondary hover:bg-secondary/90 text-white font-medium"
        disabled={isLoading}
      >
        {isLoading ? "登录中..." : "登 录"}
      </Button>

      {/* 协议勾选 */}
      <TermsCheckbox
        checked={agreedToTerms}
        onChange={onTermsChange}
        disabled={isLoading}
        error={errors.agreedToTerms}
      />

      {/* 底部链接 */}
      <div className="flex items-center justify-between text-sm pt-2">
        <Button
          type="button"
          variant="link"
          onClick={onSwitchToOtp}
          disabled={isLoading}
          className="text-primary hover:text-primary/90 p-0 h-auto"
        >
          验证码登录
        </Button>

        <Link
          href="/auth/sign-up"
          className="text-primary hover:text-primary/90"
        >
          免费注册
        </Link>
      </div>
    </form>
  );
}
```

---

### 3. UI 组件 - OTP 登录 (`components/OtpLoginFormUI.tsx`)

```tsx
"use client";

import { useRef } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  TurnstileWidget,
  type TurnstileInstance,
} from "@/components/auth/turnstile";

import { ErrorDisplay } from "./ErrorDisplay";
import { TermsCheckbox } from "./TermsCheckbox";
import { OtpInput } from "./OtpInput";
import type { OtpLoginFormUIProps } from "../types";

/**
 * OTP 登录表单 - 纯 UI 组件
 *
 * 职责:
 * - 渲染表单布局
 * - 显示输入框、OTP 输入、Turnstile
 * - 展示错误信息和倒计时
 * - 转发用户交互事件
 *
 * 不包含:
 * - OTP 发送逻辑
 * - Turnstile token 处理
 * - 倒计时计算
 * - 表单验证
 */
export function OtpLoginFormUI({
  account,
  otp,
  agreedToTerms,
  onAccountChange,
  onOtpChange,
  onTermsChange,
  onSendOtp,
  onSubmit,
  onSwitchToPassword,
  isLoading,
  isVerifying,
  countdown,
  errors,
  className,
}: OtpLoginFormUIProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  // 获取第一个错误信息
  const firstError = errors.account || errors.otp;

  return (
    <form onSubmit={handleSubmit} className={cn("space-y-4", className)}>
      {/* 标题 */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground mb-2">验证码登录</h1>
      </div>

      {/* 账号输入 */}
      <div>
        <Input
          type="text"
          value={account}
          onChange={e => onAccountChange(e.target.value)}
          placeholder="国内手机号/邮箱"
          className="h-12"
          disabled={isLoading}
          aria-label="账号"
          aria-invalid={!!errors.account}
        />
      </div>

      {/* OTP 输入 */}
      <div>
        <OtpInput
          value={otp}
          onChange={onOtpChange}
          onSendOtp={onSendOtp}
          countdown={countdown}
          isLoading={isLoading}
          isVerifying={isVerifying}
          placeholder="短信验证码"
        />
      </div>

      {/* 错误提示 */}
      <ErrorDisplay message={firstError} />

      {/* 登录按钮 */}
      <Button
        type="submit"
        className="w-full h-12 bg-secondary hover:bg-secondary/90 text-white font-medium"
        disabled={isLoading}
      >
        {isLoading ? "登录中..." : "登 录"}
      </Button>

      {/* 协议勾选 */}
      <TermsCheckbox
        checked={agreedToTerms}
        onChange={onTermsChange}
        disabled={isLoading}
        error={errors.agreedToTerms}
      />

      {/* 底部链接 */}
      <div className="flex items-center justify-between text-sm pt-2">
        <Button
          type="button"
          variant="link"
          onClick={onSwitchToPassword}
          disabled={isLoading}
          className="text-primary hover:text-primary/90 p-0 h-auto"
        >
          账号登录
        </Button>
      </div>
    </form>
  );
}
```

---

### 4. Custom Hook - 密码登录逻辑 (`hooks/usePasswordLogin.ts`)

```tsx
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import type { ActionResult } from "@/types/common";
import type { FetchOptions } from "@/types/http";
import {
  type PasswordLoginData,
  passwordLoginSchema,
} from "@/types/validations";

interface UsePasswordLoginProps {
  onSubmit: (
    data: PasswordLoginData,
    fetchOptions?: FetchOptions
  ) => Promise<ActionResult>;
  isLoading?: boolean;
}

/**
 * 密码登录逻辑 Hook
 *
 * 职责:
 * - 管理表单状态
 * - 处理表单验证
 * - 协调提交流程
 * - 错误处理
 */
export function usePasswordLogin({
  onSubmit,
  isLoading = false,
}: UsePasswordLoginProps) {
  const form = useForm<PasswordLoginData>({
    resolver: zodResolver(passwordLoginSchema),
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    criteriaMode: "firstError",
    defaultValues: {
      account: "",
      password: "",
      agreedToTerms: false,
    },
  });

  const handleSubmit = async () => {
    // 顺序验证：只有前一个字段通过才验证下一个
    const accountValid = await form.trigger("account");
    if (!accountValid) return;

    const passwordValid = await form.trigger("password");
    if (!passwordValid) return;

    const termsValid = await form.trigger("agreedToTerms");
    if (!termsValid) return;

    // 所有验证通过，提交表单
    try {
      const data = form.getValues();
      await onSubmit(data);
    } catch (error) {
      toast.error("登录失败，请重试");
    }
  };

  // 从表单错误中提取需要的错误信息
  const errors = {
    account: form.formState.errors.account?.message,
    password: form.formState.errors.password?.message,
    agreedToTerms: form.formState.errors.agreedToTerms?.message,
  };

  return {
    // 表单值
    account: form.watch("account"),
    password: form.watch("password"),
    agreedToTerms: form.watch("agreedToTerms"),

    // 表单方法
    setAccount: (value: string) => form.setValue("account", value),
    setPassword: (value: string) => form.setValue("password", value),
    setAgreedToTerms: (value: boolean) => form.setValue("agreedToTerms", value),

    // 提交处理
    handleSubmit,

    // 错误信息
    errors,

    // 加载状态
    isLoading,
  };
}
```

---

### 5. Custom Hook - OTP 登录逻辑 (`hooks/useOtpLogin.ts`)

```typescript
import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import type { OtpSendActionResult } from "@/app/_actions/auth";
import type { TurnstileInstance } from "@/components/auth/turnstile";
import { useOtpCountdown } from "@/hooks/use-otp-countdown";
import { buildOtpStorageKeyFromAccount } from "@/lib/otp";
import type { ActionResult } from "@/types/common";
import type { FetchOptions } from "@/types/http";
import { type OtpLoginData, otpLoginSchema } from "@/types/validations";

interface UseOtpLoginProps {
  onSubmit: (
    data: OtpLoginData,
    fetchOptions?: FetchOptions
  ) => Promise<ActionResult>;

  onSendOtp: (
    account: string,
    fetchOptions?: FetchOptions
  ) => Promise<OtpSendActionResult>;

  isLoading?: boolean;
}

/**
 * OTP 登录逻辑 Hook
 *
 * 职责:
 * - 管理表单状态
 * - 处理 OTP 发送逻辑
 * - 集成 Turnstile 验证
 * - 管理倒计时
 * - 错误处理
 */
export function useOtpLogin({
  onSubmit,
  onSendOtp,
  isLoading = false,
}: UseOtpLoginProps) {
  const [isVerifying, setIsVerifying] = useState(false);
  const turnstileRef = useRef<TurnstileInstance | undefined>(null);

  const form = useForm<OtpLoginData>({
    resolver: zodResolver(otpLoginSchema),
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    criteriaMode: "firstError",
    defaultValues: {
      account: "",
      otp: "",
      agreedToTerms: false,
    },
  });

  const accountValue = form.watch("account");

  // 根据账号动态生成倒计时存储 key
  const countdownKey = useMemo(
    () => buildOtpStorageKeyFromAccount(accountValue),
    [accountValue]
  );

  const { countdown, start: startCountdown } = useOtpCountdown({
    storageKey: countdownKey,
  });

  /**
   * 发送 OTP
   */
  const handleSendOtp = async () => {
    // 验证账号字段
    const isValid = await form.trigger("account");
    if (!isValid) return;

    const account = form.getValues("account");

    setIsVerifying(true);

    try {
      // 获取 Turnstile token
      const token = await turnstileRef.current?.getResponsePromise();

      if (!token) {
        toast.error("人机验证失败，请重试");
        return;
      }

      // 调用后端 API 发送 OTP
      const result = await onSendOtp(account, {
        headers: { "x-captcha-token": token },
      });

      if (result.success) {
        startCountdown();
        toast.success("验证码已发送");
      } else {
        if (result.retryAfterSeconds) {
          startCountdown(result.retryAfterSeconds);
        }
        toast.error(result.error || "发送验证码失败，请重试");
      }
    } catch (error) {
      toast.error("人机验证失败，请重试");
    } finally {
      setIsVerifying(false);
      turnstileRef.current?.reset();
    }
  };

  /**
   * 提交表单
   */
  const handleSubmit = async () => {
    // 顺序验证
    const accountValid = await form.trigger("account");
    if (!accountValid) return;

    const otpValid = await form.trigger("otp");
    if (!otpValid) return;

    const termsValid = await form.trigger("agreedToTerms");
    if (!termsValid) return;

    try {
      const data = form.getValues();
      await onSubmit(data);
    } catch (error) {
      toast.error("登录失败，请重试");
    }
  };

  const errors = {
    account: form.formState.errors.account?.message,
    otp: form.formState.errors.otp?.message,
    agreedToTerms: form.formState.errors.agreedToTerms?.message,
  };

  return {
    // 表单值
    account: form.watch("account"),
    otp: form.watch("otp"),
    agreedToTerms: form.watch("agreedToTerms"),

    // 表单方法
    setAccount: (value: string) => form.setValue("account", value),
    setOtp: (value: string) => form.setValue("otp", value),
    setAgreedToTerms: (value: boolean) => form.setValue("agreedToTerms", value),

    // OTP 相关
    handleSendOtp,
    countdown,
    isVerifying,
    turnstileRef,

    // 提交处理
    handleSubmit,

    // 错误信息
    errors,

    // 加载状态
    isLoading,
  };
}
```

---

### 6. Custom Hook - 登录方式切换 (`hooks/useLoginMethod.ts`)

```typescript
import { useState } from "react";

type LoginMethod = "password" | "otp";

interface UseLoginMethodProps {
  initialMethod?: LoginMethod;
}

/**
 * 登录方式切换逻辑 Hook
 *
 * 职责:
 * - 管理当前登录方式状态
 * - 提供切换方法
 */
export function useLoginMethod({
  initialMethod = "password",
}: UseLoginMethodProps = {}) {
  const [loginMethod, setLoginMethod] = useState<LoginMethod>(initialMethod);

  const switchToPassword = () => setLoginMethod("password");
  const switchToOtp = () => setLoginMethod("otp");
  const toggleLoginMethod = () => {
    setLoginMethod(prev => (prev === "password" ? "otp" : "password"));
  };

  return {
    loginMethod,
    isPasswordLogin: loginMethod === "password",
    isOtpLogin: loginMethod === "otp",
    switchToPassword,
    switchToOtp,
    toggleLoginMethod,
  };
}
```

---

### 7. 容器组件 - 统一登录表单 (`UnifiedLoginForm.tsx`)

```tsx
"use client";

import { Github } from "lucide-react";

import { PasswordLoginFormUI } from "./components/PasswordLoginFormUI";
import { OtpLoginFormUI } from "./components/OtpLoginFormUI";
import { TurnstileWidget } from "@/components/auth/turnstile";
import { usePasswordLogin } from "./hooks/usePasswordLogin";
import { useOtpLogin } from "./hooks/useOtpLogin";
import { useLoginMethod } from "./hooks/useLoginMethod";
import type { UnifiedLoginFormProps } from "./types";

/**
 * 统一登录表单 - 容器组件
 *
 * 职责:
 * - 组合 UI 组件和逻辑 Hooks
 * - 管理登录方式切换
 * - 传递 props 到子组件
 *
 * 不包含:
 * - 表单验证逻辑（由 hooks 处理）
 * - UI 渲染（由 UI 组件处理）
 */
export default function UnifiedLoginForm({
  onPasswordSubmit,
  onOtpSubmit,
  onSendOtp,
  initialLoginMethod = "password",
  isLoading = false,
  className,
}: UnifiedLoginFormProps) {
  // 登录方式切换逻辑
  const { isPasswordLogin, switchToPassword, switchToOtp } = useLoginMethod({
    initialMethod: initialLoginMethod,
  });

  // 密码登录逻辑
  const passwordLogin = usePasswordLogin({
    onSubmit: onPasswordSubmit,
    isLoading,
  });

  // OTP 登录逻辑
  const otpLogin = useOtpLogin({
    onSubmit: onOtpSubmit,
    onSendOtp,
    isLoading,
  });

  // 渲染密码登录
  if (isPasswordLogin) {
    return (
      <div className="space-y-6">
        <PasswordLoginFormUI
          account={passwordLogin.account}
          password={passwordLogin.password}
          agreedToTerms={passwordLogin.agreedToTerms}
          onAccountChange={passwordLogin.setAccount}
          onPasswordChange={passwordLogin.setPassword}
          onTermsChange={passwordLogin.setAgreedToTerms}
          onSubmit={passwordLogin.handleSubmit}
          onSwitchToOtp={switchToOtp}
          isLoading={passwordLogin.isLoading}
          errors={passwordLogin.errors}
          className={className}
        />

        {/* 社交登录 */}
        <div className="flex items-center justify-start">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-foreground hover:bg-foreground/90 transition-colors cursor-pointer">
            <Github className="h-5 w-5 text-white" />
          </div>
        </div>
      </div>
    );
  }

  // 渲染 OTP 登录
  return (
    <>
      <OtpLoginFormUI
        account={otpLogin.account}
        otp={otpLogin.otp}
        agreedToTerms={otpLogin.agreedToTerms}
        onAccountChange={otpLogin.setAccount}
        onOtpChange={otpLogin.setOtp}
        onTermsChange={otpLogin.setAgreedToTerms}
        onSendOtp={otpLogin.handleSendOtp}
        onSubmit={otpLogin.handleSubmit}
        onSwitchToPassword={switchToPassword}
        isLoading={otpLogin.isLoading}
        isVerifying={otpLogin.isVerifying}
        countdown={otpLogin.countdown}
        errors={otpLogin.errors}
        className={className}
      />

      {/* Turnstile Widget */}
      <TurnstileWidget
        ref={otpLogin.turnstileRef}
        action="send-otp"
        size="invisible"
      />
    </>
  );
}
```

---

### 8. 导出入口 (`index.tsx`)

```typescript
export { default as UnifiedLoginForm } from "./UnifiedLoginForm";
export type { UnifiedLoginFormProps } from "./types";

// 可选：导出子组件供其他地方复用
export { PasswordLoginFormUI } from "./components/PasswordLoginFormUI";
export { OtpLoginFormUI } from "./components/OtpLoginFormUI";
export { ErrorDisplay } from "./components/ErrorDisplay";
export { TermsCheckbox } from "./components/TermsCheckbox";

// 可选：导出 hooks 供其他地方复用
export { usePasswordLogin } from "./hooks/usePasswordLogin";
export { useOtpLogin } from "./hooks/useOtpLogin";
export { useLoginMethod } from "./hooks/useLoginMethod";
```

---

## 📊 拆分前后对比

### 代码行数

| 项目       | 拆分前 | 拆分后       |
| ---------- | ------ | ------------ |
| 单文件行数 | 630 行 | 最大 ~150 行 |
| 文件数量   | 1 个   | 10 个        |
| 可复用组件 | 2 个   | 7+ 个        |

### 职责分离

| 关注点    | 拆分前           | 拆分后         |
| --------- | ---------------- | -------------- |
| UI 渲染   | ❌ 混合在一起    | ✅ UI 组件独立 |
| 表单验证  | ❌ 混合在组件中  | ✅ Hook 中处理 |
| OTP 逻辑  | ❌ 混合在组件中  | ✅ Hook 中处理 |
| Turnstile | ❌ 混合在组件中  | ✅ Hook 中处理 |
| 状态管理  | ❌ 多个 useState | ✅ Hook 封装   |

---

## ✅ 拆分后的优势

### 1. **可测试性** 📝

```tsx
// 可以独立测试 UI 组件（快照测试）
describe("PasswordLoginFormUI", () => {
  it("renders correctly", () => {
    const { container } = render(
      <PasswordLoginFormUI
        account=""
        password=""
        agreedToTerms={false}
        onAccountChange={() => {}}
        // ... 其他 props
      />
    );
    expect(container).toMatchSnapshot();
  });
});

// 可以独立测试逻辑（单元测试）
describe("usePasswordLogin", () => {
  it("validates account field first", async () => {
    const { result } = renderHook(() =>
      usePasswordLogin({
        onSubmit: jest.fn(),
      })
    );

    await act(async () => {
      await result.current.handleSubmit();
    });

    expect(result.current.errors.account).toBeDefined();
  });
});
```

### 2. **可复用性** ♻️

- `PasswordLoginFormUI` 可以在其他地方使用不同的验证逻辑
- `usePasswordLogin` 可以搭配不同的 UI 组件
- `ErrorDisplay`, `TermsCheckbox` 可以在整个应用中复用

### 3. **可维护性** 🔧

- 每个文件职责单一，易于理解
- 修改 UI 不会影响逻辑，反之亦然
- 新增功能时只需修改对应层级

### 4. **性能优化** ⚡

```typescript
// UI 组件可以用 React.memo 优化
export const PasswordLoginFormUI = React.memo(function PasswordLoginFormUI(
  props: PasswordLoginFormUIProps
) {
  // ...
});

// 减少不必要的重渲染
```

### 5. **类型安全** 🛡️

- 每个组件和 Hook 都有明确的 TypeScript 类型
- Props 接口清晰，减少使用错误

### 6. **开发体验** 👨‍💻

- 文件更小，easier to navigate
- 责任清晰，easier to debug
- 组件独立，easier to develop in parallel

---

## 🎯 使用示例

### 在页面中使用

```tsx
// app/auth/login/page.tsx
import { UnifiedLoginForm } from "@/components/auth/forms/unified-login";
import {
  passwordLoginAction,
  otpLoginAction,
  sendOtpAction,
} from "@/app/_actions/auth";

export default function LoginPage() {
  return (
    <div className="container max-w-md mx-auto py-8">
      <UnifiedLoginForm
        onPasswordSubmit={passwordLoginAction}
        onOtpSubmit={otpLoginAction}
        onSendOtp={sendOtpAction}
        initialLoginMethod="password"
      />
    </div>
  );
}
```

### 单独使用 UI 组件

```tsx
// Storybook 或其他展示场景
import { PasswordLoginFormUI } from "@/components/auth/forms/unified-login";

export default function LoginDemo() {
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");

  return (
    <PasswordLoginFormUI
      account={account}
      password={password}
      agreedToTerms={false}
      onAccountChange={setAccount}
      onPasswordChange={setPassword}
      onTermsChange={() => {}}
      onSubmit={() => console.log("Submit")}
      onSwitchToOtp={() => console.log("Switch")}
      isLoading={false}
      errors={{}}
    />
  );
}
```

### 单独使用 Hook

```tsx
// 自定义登录页面，使用不同的 UI
import { usePasswordLogin } from "@/components/auth/forms/unified-login";

export function CustomLoginPage() {
  const login = usePasswordLogin({
    onSubmit: async data => {
      // 自定义提交逻辑
    },
  });

  return (
    <div>
      {/* 自定义 UI */}
      <input
        value={login.account}
        onChange={e => login.setAccount(e.target.value)}
      />
      {/* ... */}
    </div>
  );
}
```

---

## 🚀 迁移步骤

### 阶段 1: 创建新文件结构

1. 创建新的目录结构
2. 创建类型定义文件

### 阶段 2: 提取 UI 组件

1. 创建 `PasswordLoginFormUI.tsx`
2. 创建 `OtpLoginFormUI.tsx`
3. 迁移共享组件 (`ErrorDisplay`, `TermsCheckbox`)

### 阶段 3: 提取逻辑到 Hooks

1. 创建 `usePasswordLogin.ts`
2. 创建 `useOtpLogin.ts`
3. 创建 `useLoginMethod.ts`

### 阶段 4: 创建容器组件

1. 创建新的 `UnifiedLoginForm.tsx`
2. 组合 UI 组件和 Hooks

### 阶段 5: 更新导出和引用

1. 更新 `index.tsx` 导出
2. 更新使用该组件的页面引用
3. 删除旧文件

### 阶段 6: 测试

1. 添加单元测试
2. 添加集成测试
3. 手动测试所有功能

---

## 📝 总结

通过这次拆分，我们将一个 630 行的复杂组件拆分成了：

- **3 个纯 UI 组件** - 易于测试和复用
- **3 个逻辑 Hook** - 封装业务逻辑
- **1 个容器组件** - 组合 UI 和逻辑
- **1 个类型定义文件** - 类型安全

这种架构使得代码更加：

- ✅ 模块化
- ✅ 可测试
- ✅ 可复用
- ✅ 可维护
- ✅ 类型安全

**核心原则**: **UI 和逻辑完全分离，通过 props 和 hooks 连接**
