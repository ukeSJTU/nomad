"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import SignUpModal, {
  EmailVerificationForm,
  PasswordSetupForm,
  PhoneVerificationForm,
} from "@/components/auth";
import TurnstileWidget from "@/components/auth/turnstile-widget";
import { Stepper, type StepperStep } from "@/components/common";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTurnstileCaptcha } from "@/hooks/use-turnstile-captcha";
import { setInitialPasswordAction } from "@/lib/actions";
import { authClient } from "@/lib/auth/client";
import { getTurnstileSiteKey } from "@/lib/turnstile";
import type {
  EmailVerificationData,
  PasswordSetupData,
  PhoneVerificationData,
} from "@/types/auth";
import { maskEmail, maskPhoneNumber } from "@/utils/mask-data";

const TURNSTILE_SITE_KEY = getTurnstileSiteKey();

/**
 * Get stepper steps based on sign-up method
 * @param method - "phone" or "email"
 * @returns Array of stepper steps
 */
const getSignUpSteps = (method: "phone" | "email"): StepperStep[] => [
  {
    id: "verify",
    label: method === "phone" ? "验证手机" : "验证邮箱", // Verify Phone / Verify Email
    description: method === "phone" ? "输入手机号码" : "输入邮箱地址", // Enter phone number / Enter email address
  },
  {
    id: "set-password",
    label: "设置密码", // Set Password
    description: "设置初始密码", // Set initial password
  },
  {
    id: "complete",
    label: "注册成功", // Registration Success
    description: "完成注册", // Complete registration
  },
];

/**
 * Main sign-up page component that handles the complete registration flow
 * Includes phone verification, password setup, and user agreement modal
 *
 * Flow:
 * 1. Show agreement modal (auto-displayed)
 * 2. Phone verification (country code + phone number + OTP)
 * 3. Password setup (with real-time validation)
 * 4. Registration success
 */
export default function SignUpPage() {
  const router = useRouter();

  // State management for the registration flow
  const [currentStep, setCurrentStep] = useState(1); // Current step in the registration process (1-3)
  const [showAgreementModal, setShowAgreementModal] = useState(true); // Show modal by default
  const [agreedToTerms, setAgreedToTerms] = useState(false); // Whether user agreed to terms
  const [isLoading, setIsLoading] = useState(false); // Global loading state for API calls
  const [countdown, setCountdown] = useState(0); // OTP resend countdown timer
  const [signUpMethod, setSignUpMethod] = useState<"phone" | "email">("phone"); // Sign-up method selection
  const [phoneData, setPhoneData] = useState<PhoneVerificationData | null>(
    null
  ); // Store verified phone data
  const [emailData, setEmailData] = useState<EmailVerificationData | null>(
    null
  ); // Store verified email data
  const [currentPhoneNumber, setCurrentPhoneNumber] = useState(""); // Current phone number input
  const [currentEmail, setCurrentEmail] = useState(""); // Current email input
  const [error, setError] = useState<string | null>(null); // Error message display
  const {
    captchaError,
    setCaptchaError,
    resetSignal,
    handleSolved,
    handleWidgetError,
    handleWidgetExpire,
    prepareCaptchaRequest,
  } = useTurnstileCaptcha();
  const isCaptchaValidationError = (error?: { message?: string }) =>
    typeof error?.message === "string" &&
    error.message.toLowerCase().includes("captcha");
  const notifyCaptchaFailure = () => {
    setCaptchaError("人机验证失败，请重新完成人机验证");
  };

  // Countdown timer effect for OTP resend functionality
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  // Debug: Log phoneData changes
  useEffect(() => {
    console.log("phoneData updated:", phoneData);
  }, [phoneData]);

  // Modal handlers for user agreement
  const handleAgreeToTerms = () => {
    setShowAgreementModal(false);
    setAgreedToTerms(true);
  };

  const handleDisagreeToTerms = () => {
    // Force redirect to home page if user disagrees
    router.push("/");
  };

  const handleModalClose = () => {
    // Force redirect to home page when modal is closed (X button)
    router.push("/");
  };

  // Form handlers for the registration flow

  /**
   * Handles phone verification form submission
   * Verifies the OTP code using better-auth and proceeds to password setup
   */
  const handlePhoneVerificationSubmit = async (data: PhoneVerificationData) => {
    const captchaRequest = prepareCaptchaRequest();

    if (!captchaRequest) {
      return;
    }

    setIsLoading(true);
    setError(null); // Clear previous errors

    // For China mainland phone numbers, add +86 prefix for better-auth
    const fullPhoneNumber = `+86${data.phoneNumber}`;

    try {
      // Call better-auth to verify the OTP code
      const { error: verifyError } = await authClient.phoneNumber.verify({
        phoneNumber: fullPhoneNumber,
        code: data.otp,
        fetchOptions: captchaRequest.fetchOptions,
      });

      if (verifyError) {
        if (isCaptchaValidationError(verifyError)) {
          notifyCaptchaFailure();
          return;
        }
        console.error("验证码验证失败:", verifyError);
        setError("验证码错误，请重试"); // OTP verification failed, please try again
      } else {
        console.log("手机验证成功", data);
        // Store verified phone data BEFORE proceeding to next step
        setPhoneData(data);
        setCurrentStep(2); // Proceed to password setup step
      }
    } catch (error) {
      console.error("验证码验证异常:", error);
      setError("网络错误，请稍后重试"); // Network error, please try again later
    } finally {
      captchaRequest.complete();
      setIsLoading(false);
    }
  };

  /**
   * Handles password setup form submission
   * Calls the Server Action to set the initial password and completes registration
   */
  const handlePasswordSetupSubmit = async (data: PasswordSetupData) => {
    setIsLoading(true);
    setError(null); // Clear previous errors

    try {
      // Call Server Action to set the initial password
      const result = await setInitialPasswordAction(data.password);

      if (!result.success) {
        setError(result.error || "Failed to set password");
        return;
      }

      console.log("Password set successfully:", result.message);

      // Password setup successful, proceed to success step
      setCurrentStep(3);
    } catch (error) {
      console.error("Password setup error:", error);
      setError("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handles email verification form submission
   * Verifies the OTP code using better-auth and proceeds to password setup
   * Uses signIn.emailOtp which will create the user if they don't exist
   */
  const handleEmailVerificationSubmit = async (data: EmailVerificationData) => {
    const captchaRequest = prepareCaptchaRequest();

    if (!captchaRequest) {
      return;
    }

    setEmailData(data); // Store verified email data for later use
    setIsLoading(true);
    setError(null); // Clear previous errors

    try {
      // Call better-auth to verify the OTP code and sign in/sign up the user
      // This will create the user if they don't exist (similar to phone sign-up)
      const { error: verifyError } = await authClient.signIn.emailOtp({
        email: data.email,
        otp: data.otp,
        fetchOptions: captchaRequest.fetchOptions,
      });

      if (verifyError) {
        if (isCaptchaValidationError(verifyError)) {
          notifyCaptchaFailure();
          return;
        }
        console.error("验证码验证失败:", verifyError);
        setError("验证码错误，请重试"); // OTP verification failed, please try again
      } else {
        console.log("邮箱验证成功", data);
        setCurrentStep(2); // Proceed to password setup step
      }
    } catch (error) {
      console.error("验证码验证异常:", error);
      setError("网络错误，请稍后重试"); // Network error, please try again later
    } finally {
      captchaRequest.complete();
      setIsLoading(false);
    }
  };

  /**
   * Handles OTP sending functionality for phone
   * Sends verification code to the user's phone number using better-auth
   */
  const handleSendPhoneOtp = async () => {
    // Validate that phone number is entered
    if (!currentPhoneNumber) {
      setError("请先输入手机号"); // Please enter phone number first
      return;
    }

    const captchaRequest = prepareCaptchaRequest();

    if (!captchaRequest) {
      return;
    }

    // For China mainland phone numbers, add +86 prefix for better-auth
    const fullPhoneNumber = `+86${currentPhoneNumber}`;

    setIsLoading(true);
    setError(null); // Clear previous errors

    try {
      // Call better-auth client instance to send OTP
      const { error: sendError } = await authClient.phoneNumber.sendOtp({
        phoneNumber: fullPhoneNumber,
        fetchOptions: captchaRequest.fetchOptions,
      });

      if (sendError) {
        if (isCaptchaValidationError(sendError)) {
          notifyCaptchaFailure();
          return;
        }
        console.error("发送验证码失败:", sendError);
        setError("发送验证码失败，请重试"); // Failed to send OTP, please try again
      } else {
        console.log("验证码发送成功");
        setCountdown(60); // Start 60-second countdown for resend
      }
    } catch (error) {
      console.error("发送验证码异常:", error);
      setError("网络错误，请稍后重试"); // Network error, please try again later
    } finally {
      captchaRequest.complete();
      setIsLoading(false);
    }
  };

  /**
   * Handles OTP sending functionality for email
   * Sends verification code to the user's email using better-auth
   * Uses "sign-in" type which allows user creation on verification
   */
  const handleSendEmailOtp = async () => {
    // Validate that email is entered
    if (!currentEmail) {
      setError("请先输入邮箱地址"); // Please enter email first
      return;
    }

    const captchaRequest = prepareCaptchaRequest();

    if (!captchaRequest) {
      return;
    }

    setIsLoading(true);
    setError(null); // Clear previous errors

    try {
      // Call better-auth client instance to send OTP
      // Use "sign-in" type to allow user creation on verification (similar to phone)
      const { error: sendError } =
        await authClient.emailOtp.sendVerificationOtp({
          email: currentEmail,
          type: "sign-in",
          fetchOptions: captchaRequest.fetchOptions,
        });

      if (sendError) {
        if (isCaptchaValidationError(sendError)) {
          notifyCaptchaFailure();
          return;
        }
        console.error("发送验证码失败:", sendError);
        setError("发送验证码失败，请重试"); // Failed to send OTP, please try again
      } else {
        console.log("验证码发送成功");
        setCountdown(60); // Start 60-second countdown for resend
      }
    } catch (error) {
      console.error("发送验证码异常:", error);
      setError("网络错误，请稍后重试"); // Network error, please try again later
    } finally {
      captchaRequest.complete();
      setIsLoading(false);
    }
  };

  // Don't render main content if user hasn't agreed to terms
  // Show only the agreement modal
  if (!agreedToTerms) {
    return (
      <SignUpModal
        open={showAgreementModal}
        onOpenChange={handleModalClose}
        onAgree={handleAgreeToTerms}
        onDisagree={handleDisagreeToTerms}
      />
    );
  }

  // Main registration page content
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Page Header */}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">注册账户</h1>
          <p className="mt-2 text-sm text-gray-600">请按照以下步骤完成注册 </p>
        </div>

        {/* Progress Stepper - Updates based on sign-up method */}
        <Stepper
          steps={getSignUpSteps(signUpMethod)}
          currentStep={currentStep}
          variant="compact"
          className="mb-6"
        />

        {/* Error Display - Shows validation and API errors */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        {/* Dynamic Form Content Based on Current Step */}
        {currentStep === 1 ? (
          <>
            {/* Step 1: Phone or Email Verification with Tabs */}
            <Tabs
              defaultValue="phone"
              className="w-full"
              onValueChange={value =>
                setSignUpMethod(value as "phone" | "email")
              }
            >
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="phone">手机注册</TabsTrigger>
                <TabsTrigger value="email">邮箱注册</TabsTrigger>
              </TabsList>

              {/* Phone Verification Tab */}
              <TabsContent value="phone">
                <PhoneVerificationForm
                  onSubmit={handlePhoneVerificationSubmit}
                  onSendOtp={handleSendPhoneOtp}
                  onPhoneChange={phoneNumber => {
                    // Update parent state when phone number changes
                    setCurrentPhoneNumber(phoneNumber);
                  }}
                  isLoading={isLoading}
                  countdown={countdown}
                />
              </TabsContent>

              {/* Email Verification Tab */}
              <TabsContent value="email">
                <EmailVerificationForm
                  onSubmit={handleEmailVerificationSubmit}
                  onSendOtp={handleSendEmailOtp}
                  onEmailChange={email => {
                    // Update parent state when email changes
                    setCurrentEmail(email);
                  }}
                  isLoading={isLoading}
                  countdown={countdown}
                />
              </TabsContent>
            </Tabs>

            <div className="mt-6 space-y-3">
              <p className="text-sm text-gray-600 text-center">
                注册前请完成人机验证，发送或验证验证码的每一步都需要新的令牌。
              </p>
              <TurnstileWidget
                siteKey={TURNSTILE_SITE_KEY}
                resetSignal={resetSignal}
                onSuccess={handleSolved}
                onExpire={handleWidgetExpire}
                onError={handleWidgetError}
              />
              {captchaError && (
                <p className="text-sm text-red-600 text-center">
                  {captchaError}
                </p>
              )}
            </div>
          </>
        ) : currentStep === 2 ? (
          // Step 2: Password Setup Form
          (() => {
            const maskedId =
              signUpMethod === "phone" && phoneData
                ? maskPhoneNumber(phoneData.phoneNumber)
                : signUpMethod === "email" && emailData
                  ? maskEmail(emailData.email)
                  : undefined;
            console.log(
              "Rendering step 2 - signUpMethod:",
              signUpMethod,
              "phoneData:",
              phoneData,
              "maskedId:",
              maskedId
            );
            return (
              <PasswordSetupForm
                onSubmit={handlePasswordSetupSubmit}
                isLoading={isLoading}
                maskedIdentifier={maskedId}
              />
            );
          })()
        ) : (
          // Step 3: Registration Success
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-green-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              注册成功！{/* Registration Successful! */}
            </h3>
            <p className="text-sm text-gray-600">
              您的账户已成功创建，欢迎使用 Nomad
              {/* Your account has been successfully created, welcome to Nomad */}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
