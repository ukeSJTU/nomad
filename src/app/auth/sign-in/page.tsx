"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import PhoneLoginForm from "@/components/auth/forms/phone-login";
import PhoneOtpLoginForm from "@/components/auth/forms/phone-otp-login";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { authClient } from "@/lib/auth/client";
import type { PhoneLoginData, PhoneOtpLoginData } from "@/types/auth";

export default function SignInPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [countdown, setCountdown] = useState(0);
  const [currentPhoneNumber, setCurrentPhoneNumber] = useState("");
  const [currentCountryCode, setCurrentCountryCode] = useState("+86");

  // Countdown timer for OTP resend
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  /**
   * Handles phone + password login
   * Uses phone number/password authentication
   */
  const handlePhonePasswordLogin = async (data: PhoneLoginData) => {
    setIsLoading(true);
    setError(null);

    const fullPhoneNumber = `${data.countryCode}${data.phoneNumber}`;

    try {
      // Use phone number + password to sign in
      const { error: signInError } = await authClient.signIn.phoneNumber({
        phoneNumber: fullPhoneNumber,
        password: data.password,
        rememberMe: true,
      });

      if (signInError) {
        console.error("登录失败:", signInError);
        setError("手机号或密码错误，请重试");
      } else {
        console.log("登录成功");
        // Redirect to home page after successful login
        router.push("/");
      }
    } catch (error) {
      console.error("登录异常:", error);
      setError("网络错误，请稍后重试");
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handles phone + OTP login
   * Verifies OTP code and signs in the user
   */
  const handlePhoneOtpLogin = async (data: PhoneOtpLoginData) => {
    setIsLoading(true);
    setError(null);

    const fullPhoneNumber = `${data.countryCode}${data.phoneNumber}`;

    try {
      // Verify OTP code - this will sign in the user if successful
      const { error: verifyError } = await authClient.phoneNumber.verify({
        phoneNumber: fullPhoneNumber,
        code: data.otp,
      });

      if (verifyError) {
        console.error("验证码验证失败:", verifyError);
        setError("验证码错误，请重试");
      } else {
        console.log("登录成功");
        // Redirect to home page after successful login
        router.push("/");
      }
    } catch (error) {
      console.error("登录异常:", error);
      setError("网络错误，请稍后重试");
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handles OTP sending functionality
   * Sends verification code to the user's phone number
   */
  const handleSendOtp = async () => {
    // Validate that phone number is entered
    if (!currentPhoneNumber || !currentCountryCode) {
      setError("请先输入手机号");
      return;
    }

    const fullPhoneNumber = `${currentCountryCode}${currentPhoneNumber}`;

    setIsLoading(true);
    setError(null);

    try {
      // Send OTP using better-auth
      const { error: sendError } = await authClient.phoneNumber.sendOtp({
        phoneNumber: fullPhoneNumber,
      });

      if (sendError) {
        console.error("发送验证码失败:", sendError);
        setError("发送验证码失败，请重试");
      } else {
        console.log("验证码发送成功");
        setCountdown(60); // Start 60-second countdown for resend
      }
    } catch (error) {
      console.error("发送验证码异常:", error);
      setError("网络错误，请稍后重试");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Login Card */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">登录</h1>
            <p className="text-sm text-gray-600">
              还没有账户？
              <Link
                href="/auth/sign-up"
                className="text-blue-600 hover:text-blue-700 ml-1"
              >
                立即注册
              </Link>
            </p>
          </div>

          {/* Error Display */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {/* Login Tabs */}
          <Tabs defaultValue="password" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="password">密码登录</TabsTrigger>
              <TabsTrigger value="otp">验证码登录</TabsTrigger>
            </TabsList>

            {/* Password Login Tab */}
            <TabsContent value="password">
              <PhoneLoginForm
                onSubmit={handlePhonePasswordLogin}
                isLoading={isLoading}
              />
            </TabsContent>

            {/* OTP Login Tab */}
            <TabsContent value="otp">
              <PhoneOtpLoginForm
                onSubmit={handlePhoneOtpLogin}
                onSendOtp={handleSendOtp}
                onPhoneChange={(phoneNumber, countryCode) => {
                  setCurrentPhoneNumber(phoneNumber);
                  setCurrentCountryCode(countryCode);
                }}
                isLoading={isLoading}
                countdown={countdown}
              />
            </TabsContent>
          </Tabs>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center text-sm text-gray-600">
          <p>
            登录即表示您同意我们的
            <Link href="/terms" className="text-blue-600 hover:text-blue-700">
              服务条款
            </Link>
            和
            <Link href="/privacy" className="text-blue-600 hover:text-blue-700">
              隐私政策
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
