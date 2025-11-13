"use client";

import { Github } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import EmailLoginForm from "@/components/auth/forms/email-login";
import EmailOtpLoginForm from "@/components/auth/forms/email-otp-login";
import PhoneLoginForm from "@/components/auth/forms/phone-login";
import PhoneOtpLoginForm from "@/components/auth/forms/phone-otp-login";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { authClient } from "@/lib/auth/client";
import type {
  EmailLoginData,
  EmailOtpLoginData,
  PhoneLoginData,
  PhoneOtpLoginData,
} from "@/types/auth";

export default function SignInPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [currentPhoneNumber, setCurrentPhoneNumber] = useState("");
  const [currentEmail, setCurrentEmail] = useState("");
  const [activeTab, setActiveTab] = useState<"password" | "otp">("password");

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

    // For China mainland phone numbers, add +86 prefix for better-auth
    const fullPhoneNumber = `+86${data.phoneNumber}`;

    try {
      // Use phone number + password to sign in
      const { error: signInError } = await authClient.signIn.phoneNumber({
        phoneNumber: fullPhoneNumber,
        password: data.password,
        rememberMe: true,
      });

      if (signInError) {
        console.error("登录失败:", signInError);
        // Error will be shown in form field
      } else {
        // Redirect to home page after successful login
        router.push("/");
      }
    } catch (error) {
      console.error("登录异常:", error);
      // Error will be shown in form field
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

    // For China mainland phone numbers, add +86 prefix for better-auth
    const fullPhoneNumber = `+86${data.phoneNumber}`;

    try {
      // Verify OTP code - this will sign in the user if successful
      const { error: verifyError } = await authClient.phoneNumber.verify({
        phoneNumber: fullPhoneNumber,
        code: data.otp,
      });

      if (verifyError) {
        console.error("验证码验证失败:", verifyError);
        // Error will be shown in form field
      } else {
        // Redirect to home page after successful login
        router.push("/");
      }
    } catch (error) {
      console.error("登录异常:", error);
      // Error will be shown in form field
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handles email + password login
   * Uses email/password authentication
   */
  const handleEmailPasswordLogin = async (data: EmailLoginData) => {
    setIsLoading(true);

    try {
      // Use email + password to sign in
      const { error: signInError } = await authClient.signIn.email({
        email: data.email,
        password: data.password,
        rememberMe: true,
      });

      if (signInError) {
        console.error("登录失败:", signInError);
        // Error will be shown in form field
      } else {
        // Redirect to home page after successful login
        router.push("/");
      }
    } catch (error) {
      console.error("登录异常:", error);
      // Error will be shown in form field
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handles email + OTP login
   * Verifies OTP code and signs in the user
   */
  const handleEmailOtpLogin = async (data: EmailOtpLoginData) => {
    setIsLoading(true);

    try {
      // Verify OTP code - this will sign in the user if successful
      const { error: verifyError } = await authClient.signIn.emailOtp({
        email: data.email,
        otp: data.otp,
      });

      if (verifyError) {
        console.error("验证码验证失败:", verifyError);
        // Error will be shown in form field
      } else {
        // Redirect to home page after successful login
        router.push("/");
      }
    } catch (error) {
      console.error("登录异常:", error);
      // Error will be shown in form field
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handles OTP sending functionality for phone
   * Sends verification code to the user's phone number
   */
  const handleSendPhoneOtp = async () => {
    // Validate that phone number is entered
    if (!currentPhoneNumber) {
      // Validation is now handled in the form component
      return;
    }

    // For China mainland phone numbers, add +86 prefix for better-auth
    const fullPhoneNumber = `+86${currentPhoneNumber}`;

    setIsLoading(true);

    try {
      // Send OTP using better-auth
      const { error: sendError } = await authClient.phoneNumber.sendOtp({
        phoneNumber: fullPhoneNumber,
      });

      if (sendError) {
        console.error("发送验证码失败:", sendError);
        // Error will be shown in form field
      } else {
        setCountdown(60); // Start 60-second countdown for resend
      }
    } catch (error) {
      console.error("发送验证码异常:", error);
      // Error will be shown in form field
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handles OTP sending functionality for email
   * Sends verification code to the user's email
   */
  const handleSendEmailOtp = async () => {
    // Validate that email is entered
    if (!currentEmail) {
      // Validation is now handled in the form component
      return;
    }

    setIsLoading(true);

    try {
      // Send OTP using better-auth
      // Use "sign-in" type to allow user login with OTP
      const { error: sendError } =
        await authClient.emailOtp.sendVerificationOtp({
          email: currentEmail,
          type: "sign-in",
        });

      if (sendError) {
        console.error("发送验证码失败:", sendError);
        // Error will be shown in form field
      } else {
        setCountdown(60); // Start 60-second countdown for resend
      }
    } catch (error) {
      console.error("发送验证码异常:", error);
      // Error will be shown in form field
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handles GitHub social sign-in
   * Redirects user to GitHub OAuth flow
   */
  const handleGitHubSignIn = async () => {
    setIsLoading(true);

    try {
      const data = await authClient.signIn.social({
        provider: "github",
      });

      if (data.error) {
        console.error("GitHub登录失败:", data.error);
      }
      // The authClient will handle the redirect to GitHub
    } catch (error) {
      console.error("GitHub登录异常:", error);
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
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {activeTab === "password" ? "账号密码登录" : "验证码登录"}
            </h1>
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

          {/* Login Method Tabs (Phone vs Email) */}
          <Tabs defaultValue="phone" className="w-full mb-6">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="phone">手机号登录</TabsTrigger>
              <TabsTrigger value="email">邮箱登录</TabsTrigger>
            </TabsList>

            {/* Phone Login Method */}
            <TabsContent value="phone">
              {/* Password vs OTP Tabs for Phone */}
              <Tabs
                defaultValue="password"
                className="w-full"
                onValueChange={value =>
                  setActiveTab(value as "password" | "otp")
                }
              >
                <TabsList
                  className="grid w-full grid-cols-2 mb-6"
                  data-testid="phone-login-method-tabs"
                >
                  <TabsTrigger
                    value="password"
                    data-testid="phone-password-tab"
                  >
                    密码登录
                  </TabsTrigger>
                  <TabsTrigger value="otp" data-testid="phone-otp-tab">
                    验证码登录
                  </TabsTrigger>
                </TabsList>

                {/* Phone Password Login Tab */}
                <TabsContent value="password">
                  <PhoneLoginForm
                    onSubmit={handlePhonePasswordLogin}
                    isLoading={isLoading}
                  />
                </TabsContent>

                {/* Phone OTP Login Tab */}
                <TabsContent value="otp">
                  <PhoneOtpLoginForm
                    onSubmit={handlePhoneOtpLogin}
                    onSendOtp={handleSendPhoneOtp}
                    onPhoneChange={phoneNumber => {
                      setCurrentPhoneNumber(phoneNumber);
                    }}
                    isLoading={isLoading}
                    countdown={countdown}
                  />
                </TabsContent>
              </Tabs>
            </TabsContent>

            {/* Email Login Method */}
            <TabsContent value="email">
              {/* Password vs OTP Tabs for Email */}
              <Tabs
                defaultValue="password"
                className="w-full"
                onValueChange={value =>
                  setActiveTab(value as "password" | "otp")
                }
              >
                <TabsList
                  className="grid w-full grid-cols-2 mb-6"
                  data-testid="email-login-method-tabs"
                >
                  <TabsTrigger
                    value="password"
                    data-testid="email-password-tab"
                  >
                    密码登录
                  </TabsTrigger>
                  <TabsTrigger value="otp" data-testid="email-otp-tab">
                    验证码登录
                  </TabsTrigger>
                </TabsList>

                {/* Email Password Login Tab */}
                <TabsContent value="password">
                  <EmailLoginForm
                    onSubmit={handleEmailPasswordLogin}
                    isLoading={isLoading}
                  />
                </TabsContent>

                {/* Email OTP Login Tab */}
                <TabsContent value="otp">
                  <EmailOtpLoginForm
                    onSubmit={handleEmailOtpLogin}
                    onSendOtp={handleSendEmailOtp}
                    onEmailChange={email => {
                      setCurrentEmail(email);
                    }}
                    isLoading={isLoading}
                    countdown={countdown}
                  />
                </TabsContent>
              </Tabs>
            </TabsContent>
          </Tabs>

          {/* Social Sign In Section */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-gray-500">或</span>
              </div>
            </div>

            <div className="mt-6">
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={handleGitHubSignIn}
                disabled={isLoading}
              >
                <Github className="size-5" />
                {/* Here using english text instead of Chinese text "使用GitHub 登录" is beccause “登录” interfere with the original “登录” button and failing the e2e tests for sign-in process */}
                Login With GitHub
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
