"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import SignUpModal, { PhoneVerificationForm } from "@/components/auth";
import { Stepper, type StepperStep } from "@/components/common";
import type { OtpStepData, PhoneNumberStepData } from "@/types/auth";

const signUpSteps: StepperStep[] = [
  {
    id: "verify-phone",
    label: "验证手机",
    description: "输入手机号码",
  },
  {
    id: "verify-otp",
    label: "验证验证码",
    description: "输入验证码",
  },
  {
    id: "complete",
    label: "注册成功",
    description: "完成注册",
  },
];

export default function SignUpPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [showAgreementModal, setShowAgreementModal] = useState(true); // Show modal by default
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [formStep, setFormStep] = useState<"phone" | "otp">("phone");
  const [isLoading, setIsLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [phoneData, setPhoneData] = useState<PhoneNumberStepData | null>(null);

  // Countdown timer effect
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  // Modal handlers
  const handleAgreeToTerms = () => {
    setShowAgreementModal(false);
    setAgreedToTerms(true);
  };

  const handleDisagreeToTerms = () => {
    // Force redirect to home page
    router.push("/");
  };

  const handleModalClose = () => {
    // Force redirect to home page when modal is closed
    router.push("/");
  };

  // Form handlers
  const handlePhoneSubmit = (data: PhoneNumberStepData) => {
    setPhoneData(data);
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setFormStep("otp");
      setCurrentStep(2);
      setOtpSent(true);
      setCountdown(60);
    }, 1000);
  };

  const handleOtpSubmit = (data: OtpStepData) => {
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setCurrentStep(3);
      // Handle successful verification
      console.log("Phone verified successfully", { phoneData, otp: data.otp });
    }, 1000);
  };

  const handleSendOtp = () => {
    if (phoneData) {
      setIsLoading(true);

      // Simulate API call
      setTimeout(() => {
        setIsLoading(false);
        setOtpSent(true);
        setCountdown(60);
      }, 1000);
    }
  };

  // Don't render anything if user hasn't agreed to terms
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

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">注册账户</h1>
          <p className="mt-2 text-sm text-gray-600">请按照以下步骤完成注册</p>
        </div>

        {/* Stepper */}
        <Stepper
          steps={signUpSteps}
          currentStep={currentStep}
          variant="compact"
          className="mb-6"
        />

        {/* Form Content */}
        {currentStep < 3 ? (
          <PhoneVerificationForm
            currentStep={formStep}
            onPhoneSubmit={handlePhoneSubmit}
            onOtpSubmit={handleOtpSubmit}
            onSendOtp={handleSendOtp}
            isLoading={isLoading}
            otpSent={otpSent}
            countdown={countdown}
          />
        ) : (
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
              注册成功！
            </h3>
            <p className="text-sm text-gray-600">
              您的账户已成功创建，欢迎使用 Nomad
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
