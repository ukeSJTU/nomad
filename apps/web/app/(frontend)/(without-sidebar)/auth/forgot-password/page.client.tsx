"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@ukesjtu/nomad-ui/components/primitives/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@ukesjtu/nomad-ui/components/primitives/form";
import { Input } from "@ukesjtu/nomad-ui/components/primitives/input";
import { OtpInput } from "@ukesjtu/nomad-ui/components/security/otp-input";
import { CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import PasswordSetupForm from "@/components/auth/forms/password-setup";
import {
  type TurnstileInstance,
  TurnstileWidget,
} from "@/components/auth/turnstile";
import { Stepper, type StepperStep } from "@/components/common";
import { useForgotPasswordFlow } from "@/hooks/use-forgot-password-flow";
import type { FetchOptions } from "@/types/http";
import {
  type ForgotPasswordAccountData,
  forgotPasswordAccountSchema,
} from "@/types/validations";

const steps: StepperStep[] = [
  {
    id: "account",
    label: "验证账号",
    description: "输入手机号或邮箱",
  },
  {
    id: "verify",
    label: "验证身份",
    description: "输入验证码",
  },
  {
    id: "reset",
    label: "重置密码",
    description: "设置新密码",
  },
];

export default function ForgotPasswordPageClient() {
  const router = useRouter();
  const turnstileRef = useRef<TurnstileInstance>(null);
  const [isVerifyingCaptcha, setIsVerifyingCaptcha] = useState(false);

  const {
    currentStep,
    maskedAccount,
    countdown,
    otp,
    setOtp,
    isLoading,
    isResetting,
    hasCompleted,
    handleAccountSubmit,
    handleVerifyOtp,
    handleResendOtp,
    handleResetPassword,
  } = useForgotPasswordFlow();

  const accountForm = useForm<ForgotPasswordAccountData>({
    resolver: zodResolver(forgotPasswordAccountSchema),
    defaultValues: {
      account: "",
    },
  });

  const handleWithCaptcha = async <T,>(
    action: (fetchOptions: FetchOptions) => Promise<T>
  ): Promise<T | undefined> => {
    setIsVerifyingCaptcha(true);
    try {
      const token = await turnstileRef.current?.getResponsePromise();

      if (!token) {
        toast.error("人机验证失败，请重试");
        return undefined;
      }

      const fetchOptions: FetchOptions = {
        headers: {
          "x-captcha-token": token,
        },
      };

      return await action(fetchOptions);
    } finally {
      setIsVerifyingCaptcha(false);
      turnstileRef.current?.reset();
    }
  };

  const onAccountSubmit = async (data: ForgotPasswordAccountData) => {
    await handleWithCaptcha(fetchOptions =>
      handleAccountSubmit(data.account, fetchOptions)
    );
  };

  const handleSendOtp = async () => {
    await handleWithCaptcha(fetchOptions => handleResendOtp(fetchOptions));
  };

  const handleVerifyClick = () => {
    handleVerifyOtp(otp);
  };

  const handleFinish = async (passwordData: {
    password: string;
    confirmPassword: string;
  }) => {
    await handleResetPassword(passwordData);
  };

  const isBusy = isLoading || isVerifyingCaptcha;

  return (
    <div className="min-h-screen flex items-center justify-center bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground">找回密码</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            通过手机号或邮箱验证身份后重置登录密码
          </p>
        </div>

        <Stepper steps={steps} currentStep={currentStep} variant="compact" />

        {currentStep === 1 && (
          <Form {...accountForm}>
            <form
              onSubmit={accountForm.handleSubmit(onAccountSubmit)}
              className="space-y-6"
            >
              <div className="space-y-4">
                <FormField
                  control={accountForm.control}
                  name="account"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-foreground">
                        账号
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="国内手机号/邮箱"
                          className="h-12"
                          disabled={isBusy}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button
                type="submit"
                className="w-full h-12 bg-secondary text-secondary-foreground hover:bg-secondary/90 font-medium"
                disabled={isBusy}
              >
                {isBusy ? "发送中..." : "下一步，发送验证码"}
              </Button>
            </form>
          </Form>
        )}

        {currentStep === 2 && (
          <div className="space-y-6">
            <div className="p-3 bg-muted border border-border rounded-md">
              <p className="text-sm text-foreground">
                验证码已发送至：{" "}
                <span className="font-mono">
                  {maskedAccount ?? "请检查账号"}
                </span>
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                如未收到，可在倒计时结束后重新发送
              </p>
            </div>

            <OtpInput
              value={otp}
              onChange={setOtp}
              onSendOtp={handleSendOtp}
              countdown={countdown}
              hasSent={countdown > 0}
              isLoading={isLoading}
              isVerifying={isVerifyingCaptcha}
              placeholder="6位数字验证码"
            />

            <Button
              type="button"
              className="w-full h-12 bg-secondary text-secondary-foreground hover:bg-secondary/90 font-medium"
              onClick={handleVerifyClick}
              disabled={isBusy}
            >
              {isBusy ? "验证中..." : "下一步，验证"}
            </Button>
          </div>
        )}

        {currentStep === 3 && (
          <>
            {!hasCompleted ? (
              <PasswordSetupForm
                onSubmit={handleFinish}
                isLoading={isResetting}
                maskedIdentifier={maskedAccount ?? undefined}
                submitButtonText="完成"
                showHelpLink={false}
              />
            ) : (
              <div className="text-center space-y-4 py-8 border border-border rounded-lg">
                <div className="flex justify-center">
                  <CheckCircle2 className="h-12 w-12 text-green-500" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">
                  密码重置成功
                </h3>
                <p className="text-sm text-muted-foreground">
                  重置密码成功，请使用新密码登录
                </p>
                <Button
                  className="w-full h-11"
                  onClick={() => router.push("/auth/sign-in")}
                >
                  去登录
                </Button>
              </div>
            )}
          </>
        )}

        <TurnstileWidget
          ref={turnstileRef}
          action="forgot-password"
          size="invisible"
        />
      </div>
    </div>
  );
}
