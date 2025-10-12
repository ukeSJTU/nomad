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

const signUpSteps: StepperStep[] = [
  {
    id: "verify-phone",
    label: "验证手机",
    description: "输入手机号码",
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

export default function SignUpPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [showAgreementModal, setShowAgreementModal] = useState(true); // Show modal by default
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [phoneData, setPhoneData] = useState<PhoneVerificationData | null>(
    null
  );
  const [currentPhoneNumber, setCurrentPhoneNumber] = useState("");
  const [currentCountryCode, setCurrentCountryCode] = useState("+86");

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
  const handlePhoneVerificationSubmit = async (data: PhoneVerificationData) => {
    setPhoneData(data);
    setIsLoading(true);

    const fullPhoneNumber = `${data.countryCode}${data.phoneNumber}`;

    try {
      const { error } = await authClient.phoneNumber.verify({
        phoneNumber: fullPhoneNumber,
        code: data.otp,
      });

      if (error) {
        console.error("验证码验证失败:", error);
      } else {
        console.log("手机验证成功", data);
        setCurrentStep(2);
      }
    } catch (error) {
      console.error("验证码验证异常:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordSetupSubmit = (data: PasswordSetupData) => {
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setCurrentStep(3);
      console.log("Registration completed", { phoneData, passwordData: data });
    }, 1000);
  };

  const handleSendOtp = async () => {
    if (!currentPhoneNumber || !currentCountryCode) {
      console.error("手机号或国家代码为空");
      return;
    }

    const fullPhoneNumber = `${currentCountryCode}${currentPhoneNumber}`;

    setIsLoading(true);

    try {
      const { error } = await authClient.phoneNumber.sendOtp({
        phoneNumber: fullPhoneNumber,
      });

      if (error) {
        console.error("发送验证码失败:", error);
      } else {
        console.log("验证码发送成功");
        setCountdown(60);
      }
    } catch (error) {
      console.error("发送验证码异常:", error);
    } finally {
      setIsLoading(false);
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
        {currentStep === 1 ? (
          <PhoneVerificationForm
            onSubmit={handlePhoneVerificationSubmit}
            onSendOtp={handleSendOtp}
            onPhoneChange={(phoneNumber, countryCode) => {
              setCurrentPhoneNumber(phoneNumber);
              setCurrentCountryCode(countryCode);
            }}
            isLoading={isLoading}
            countdown={countdown}
          />
        ) : currentStep === 2 ? (
          <PasswordSetupForm
            onSubmit={handlePasswordSetupSubmit}
            isLoading={isLoading}
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
