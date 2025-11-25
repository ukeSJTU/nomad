"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { PasswordSetupForm, SignUpModal } from "@/components/auth";
import UnifiedSignUpForm from "@/components/auth/forms/unified-signup";
import RegistrationSuccess from "@/components/auth/registration-success";
import { Stepper, type StepperStep } from "@/components/common";
import { useSignUpFlow } from "@/hooks/use-signup-flow";
import { maskEmail, maskPhoneNumber } from "@/utils/mask-data";

/**
 * Get stepper steps based on sign-up method
 */
const getSignUpSteps = (method: "phone" | "email"): StepperStep[] => [
  {
    id: "verify",
    label: method === "phone" ? "验证手机" : "验证邮箱",
    description: method === "phone" ? "输入手机号码" : "输入邮箱地址",
  },
  {
    id: "set-password",
    label: "设置密码",
    description: "设置初始密码",
  },
  {
    id: "complete",
    label: "注册成功",
    description: "完成注册",
  },
];

/**
 * Main sign-up page component that handles the complete registration flow
 *
 * Flow:
 * 1. Show agreement modal (auto-displayed)
 * 2. Phone/Email verification with OTP
 * 3. Password setup
 * 4. Registration success
 */
export default function SignUpPage() {
  const router = useRouter();

  // Modal state
  const [showAgreementModal, setShowAgreementModal] = useState(true);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  // Sign-up flow state and handlers
  const {
    currentStep,
    signUpMethod,
    phoneData,
    emailData,
    isLoading,
    setSignUpMethod,
    handlePhoneVerified,
    handleEmailVerified,
    handlePasswordSetup,
    handleSendPhoneOtp,
    handleSendEmailOtp,
  } = useSignUpFlow();

  // Modal handlers
  const handleAgreeToTerms = () => {
    setShowAgreementModal(false);
    setAgreedToTerms(true);
  };

  const handleDisagreeToTerms = () => {
    router.push("/");
  };

  const handleModalClose = () => {
    router.push("/");
  };

  // Show only modal if user hasn't agreed to terms
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

  // Get masked identifier for password setup step
  const getMaskedIdentifier = () => {
    if (signUpMethod === "phone" && phoneData) {
      return maskPhoneNumber(phoneData.phoneNumber);
    }
    if (signUpMethod === "email" && emailData) {
      return maskEmail(emailData.email);
    }
    return undefined;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Page Header */}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">注册账户</h1>
          <p className="mt-2 text-sm text-gray-600">请按照以下步骤完成注册</p>
        </div>

        {/* Progress Stepper */}
        <Stepper
          steps={getSignUpSteps(signUpMethod)}
          currentStep={currentStep}
          variant="compact"
          className="mb-6"
        />

        {/* Dynamic Form Content Based on Current Step */}
        {currentStep === 1 && (
          <UnifiedSignUpForm
            onPhoneVerified={handlePhoneVerified}
            onEmailVerified={handleEmailVerified}
            onSendPhoneOtp={handleSendPhoneOtp}
            onSendEmailOtp={handleSendEmailOtp}
            isLoading={isLoading}
            initialMethod={signUpMethod}
            onMethodChange={setSignUpMethod}
          />
        )}

        {currentStep === 2 && (
          <PasswordSetupForm
            onSubmit={handlePasswordSetup}
            isLoading={isLoading}
            maskedIdentifier={getMaskedIdentifier()}
          />
        )}

        {currentStep === 3 && <RegistrationSuccess />}
      </div>
    </div>
  );
}
