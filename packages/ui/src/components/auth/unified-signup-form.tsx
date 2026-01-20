"use client";

import { Form } from "@ukesjtu/nomad-ui/components/primitives/form";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@ukesjtu/nomad-ui/components/primitives/tabs";
import { cn } from "@ukesjtu/nomad-ui/lib/utils";
import type { UseFormReturn } from "react-hook-form";
import {
  VerificationForm,
  type VerificationFormData,
} from "./verification-form";

// ============================================
// Types
// ============================================

/**
 * Signup method - phone or email
 */
export type SignupMethod = "phone" | "email";

/**
 * Props for the UnifiedSignupForm component
 */
export interface UnifiedSignupFormProps {
  // Tab control
  /** Current signup method */
  method: SignupMethod;
  /** Callback when signup method changes */
  onMethodChange: (method: SignupMethod) => void;

  // Phone form (full form object from useForm)
  /** Form instance for phone verification */
  phoneForm: UseFormReturn<VerificationFormData>;
  /** Submit handler for phone form */
  onPhoneSubmit: (e?: React.BaseSyntheticEvent) => void;
  /** Callback to send phone OTP */
  onSendPhoneOtp: () => void;
  /** Phone OTP countdown timer */
  phoneCountdown: number;

  // Email form (full form object from useForm)
  /** Form instance for email verification */
  emailForm: UseFormReturn<VerificationFormData>;
  /** Submit handler for email form */
  onEmailSubmit: (e?: React.BaseSyntheticEvent) => void;
  /** Callback to send email OTP */
  onSendEmailOtp: () => void;
  /** Email OTP countdown timer */
  emailCountdown: number;

  // State
  /** Whether the form is in loading state */
  isLoading?: boolean;

  // Navigation callbacks
  /** Callback when terms link is clicked */
  onTermsClick?: () => void;
  /** Callback when privacy link is clicked */
  onPrivacyClick?: () => void;
  /** Callback when enterprise registration link is clicked */
  onEnterpriseClick?: () => void;

  /** Custom className */
  className?: string;
}

/**
 * Unified signup form UI component supporting phone and email signup methods
 *
 * This is a pure UI component - form state management, validation, and
 * business logic are handled by the parent container component.
 *
 * Uses the existing VerificationForm component for each tab.
 *
 * @example
 * ```tsx
 * // Parent container handles all logic
 * <UnifiedSignupForm
 *   method={method}
 *   onMethodChange={setMethod}
 *   phoneForm={phoneForm}
 *   onPhoneSubmit={phoneForm.handleSubmit(handlePhoneVerify)}
 *   onSendPhoneOtp={handleSendPhoneOtp}
 *   phoneCountdown={phoneCountdown}
 *   emailForm={emailForm}
 *   onEmailSubmit={emailForm.handleSubmit(handleEmailVerify)}
 *   onSendEmailOtp={handleSendEmailOtp}
 *   emailCountdown={emailCountdown}
 *   isLoading={isLoading}
 * />
 * ```
 */
export function UnifiedSignupForm({
  method,
  onMethodChange,
  phoneForm,
  onPhoneSubmit,
  onSendPhoneOtp,
  phoneCountdown,
  emailForm,
  onEmailSubmit,
  onSendEmailOtp,
  emailCountdown,
  isLoading,
  onTermsClick,
  onPrivacyClick,
  onEnterpriseClick,
  className,
}: UnifiedSignupFormProps) {
  return (
    <div className={cn("space-y-4", className)}>
      <Tabs
        value={method}
        onValueChange={v => onMethodChange(v as SignupMethod)}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="phone" disabled={isLoading}>
            手机注册
          </TabsTrigger>
          <TabsTrigger value="email" disabled={isLoading}>
            邮箱注册
          </TabsTrigger>
        </TabsList>

        {/* Phone Verification Tab */}
        <TabsContent value="phone">
          <Form {...phoneForm}>
            <VerificationForm
              mode="phone"
              control={phoneForm.control}
              errors={phoneForm.formState.errors}
              onSubmit={onPhoneSubmit}
              onSendOtp={onSendPhoneOtp}
              countdown={phoneCountdown}
              isLoading={isLoading}
              onTermsClick={onTermsClick}
              onPrivacyClick={onPrivacyClick}
              onEnterpriseClick={onEnterpriseClick}
            />
          </Form>
        </TabsContent>

        {/* Email Verification Tab */}
        <TabsContent value="email">
          <Form {...emailForm}>
            <VerificationForm
              mode="email"
              control={emailForm.control}
              errors={emailForm.formState.errors}
              onSubmit={onEmailSubmit}
              onSendOtp={onSendEmailOtp}
              countdown={emailCountdown}
              isLoading={isLoading}
              onTermsClick={onTermsClick}
              onPrivacyClick={onPrivacyClick}
              onEnterpriseClick={onEnterpriseClick}
            />
          </Form>
        </TabsContent>
      </Tabs>
    </div>
  );
}
