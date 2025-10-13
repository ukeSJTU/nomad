"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import SignUpModal, {
  PasswordSetupForm,
  PhoneVerificationForm,
} from "@/components/auth";
import { Stepper, type StepperStep } from "@/components/common";
import { authClient } from "@/lib/auth/client";
import type { PasswordSetupData, PhoneVerificationData } from "@/types/auth";

/**
 * Configuration for the registration stepper component
 * Defines the three main steps of the registration process
 */
const signUpSteps: StepperStep[] = [
  {
    id: "verify-phone",
    label: "验证手机", // Verify Phone
    description: "输入手机号码", // Enter phone number
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
  const [_phoneData, setPhoneData] = useState<PhoneVerificationData | null>(
    null
  ); // Store verified phone data
  const [currentPhoneNumber, setCurrentPhoneNumber] = useState(""); // Current phone number input
  const [currentCountryCode, setCurrentCountryCode] = useState("+86"); // Current country code selection
  const [error, setError] = useState<string | null>(null); // Error message display

  // Countdown timer effect for OTP resend functionality
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

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
    setPhoneData(data); // Store verified phone data for later use
    setIsLoading(true);
    setError(null); // Clear previous errors

    const fullPhoneNumber = `${data.countryCode}${data.phoneNumber}`;

    try {
      // Call better-auth to verify the OTP code
      const { error: verifyError } = await authClient.phoneNumber.verify({
        phoneNumber: fullPhoneNumber,
        code: data.otp,
      });

      if (verifyError) {
        console.error("验证码验证失败:", verifyError);
        setError("验证码错误，请重试"); // OTP verification failed, please try again
      } else {
        console.log("手机验证成功", data);
        setCurrentStep(2); // Proceed to password setup step
      }
    } catch (error) {
      console.error("验证码验证异常:", error);
      setError("网络错误，请稍后重试"); // Network error, please try again later
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handles password setup form submission
   * Calls the API to set the initial password and completes registration
   */
  const handlePasswordSetupSubmit = async (data: PasswordSetupData) => {
    setIsLoading(true);
    setError(null); // Clear previous errors

    try {
      // Call API endpoint to set the initial password
      const response = await fetch("/api/auth/set-initial-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Include session cookies for authentication
        body: JSON.stringify({
          password: data.password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to set password");
      }

      const result = await response.json();
      console.log("Password set successfully:", result);

      // Password setup successful, proceed to success step
      setCurrentStep(3);
    } catch (error) {
      console.error("Password setup error:", error);
      setError(
        error instanceof Error ? error.message : "设置密码失败，请重试" // Failed to set password, please try again
      );
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handles OTP sending functionality
   * Sends verification code to the user's phone number using better-auth
   */
  const handleSendOtp = async () => {
    // Validate that phone number is entered
    if (!currentPhoneNumber || !currentCountryCode) {
      setError("请先输入手机号"); // Please enter phone number first
      return;
    }

    const fullPhoneNumber = `${currentCountryCode}${currentPhoneNumber}`;

    setIsLoading(true);
    setError(null); // Clear previous errors

    try {
      // Call better-auth client instance to send OTP
      const { error: sendError } = await authClient.phoneNumber.sendOtp({
        phoneNumber: fullPhoneNumber,
      });

      if (sendError) {
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
          <h1 className="text-2xl font-bold text-gray-900">
            注册账户 {/* Register Account */}
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            请按照以下步骤完成注册{" "}
            {/* Please follow these steps to complete registration */}
          </p>
        </div>

        {/* Progress Stepper */}
        <Stepper
          steps={signUpSteps}
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
          // Step 1: Phone Verification Form
          <PhoneVerificationForm
            onSubmit={handlePhoneVerificationSubmit}
            onSendOtp={handleSendOtp}
            onPhoneChange={(phoneNumber, countryCode) => {
              // Update parent state when phone number changes
              setCurrentPhoneNumber(phoneNumber);
              setCurrentCountryCode(countryCode);
            }}
            isLoading={isLoading}
            countdown={countdown}
          />
        ) : currentStep === 2 ? (
          // Step 2: Password Setup Form
          <PasswordSetupForm
            onSubmit={handlePasswordSetupSubmit}
            isLoading={isLoading}
          />
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
