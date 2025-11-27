"use client";

import { AlertCircle } from "lucide-react";
import Image from "next/image";

import UnifiedLoginForm from "@/components/auth/forms/unified-login";
import { useSignInFlow } from "@/hooks/use-signin-flow";

export default function SignInPage() {
  const { isLoading, handlePasswordLogin, handleOtpLogin, handleSendOtp } =
    useSignInFlow();

  return (
    <div className="relative w-full">
      <div className="bg-secondary/10 py-2">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-2 text-xs">
            {/* This is just text notification, out system will not implement this */}
            <AlertCircle className="text-secondary w-4 h-4" />
            <span>
              依据《网络安全法》，为保障您相关功能的正常使用，账号需绑定手机，如您未绑定则登录后会引导您操作绑定。新版《隐私政策》已上线，感谢您的支持。
            </span>
          </div>
        </div>
      </div>

      {/* Here we use h-[540px] to make sure that the final image has a height of fixed 520 pixels */}
      <div className="relative w-full h-[540px] bg-accent overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/login_bg.png"
            alt="Login Background"
            fill
            className="object-cover object-center"
            priority
            quality={100}
          />
        </div>

        <div className="relative z-10 mx-auto h-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-full items-center justify-center lg:justify-end">
            <div className="w-full max-w-sm bg-card rounded-lg shadow overflow-hidden">
              <div className="p-6">
                <UnifiedLoginForm
                  onPasswordSubmit={handlePasswordLogin}
                  onOtpSubmit={handleOtpLogin}
                  onSendOtp={handleSendOtp}
                  initialLoginMethod="password"
                  isLoading={isLoading}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
