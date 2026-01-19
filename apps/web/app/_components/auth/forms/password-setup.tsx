"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  PasswordSetupForm,
  type PasswordSetupFormData,
} from "@nomad/ui/components/auth";
import { Form } from "@nomad/ui/components/primitives/form";
import { useForm } from "react-hook-form";
import zxcvbn from "zxcvbn";
import { createClientLogger } from "@/infra/logging/client-logger";
import { passwordSetupSchema } from "@/types/validations";

const logger = createClientLogger({ module: "password-setup-form" });

/**
 * Props for the PasswordSetupForm container component
 */
interface PasswordSetupFormContainerProps {
  /** Callback function called when form is submitted with valid data */
  onSubmit: (data: PasswordSetupFormData) => void;
  /** Whether the form is in loading state (disables submit button) */
  isLoading?: boolean;
  /** Masked phone number or email to display (e.g., "138****5678") */
  maskedIdentifier?: string;
  /** Custom submit button text (default: "完成注册") */
  submitButtonText?: string;
  /** Whether to show the help link at the bottom (default: true) */
  showHelpLink?: boolean;
}

/**
 * Password setup form container component for the registration flow
 * Manages form state, validation, and password strength calculation
 */
export default function PasswordSetupFormContainer({
  onSubmit,
  isLoading = false,
  maskedIdentifier,
  submitButtonText = "完成注册",
  showHelpLink = true,
}: PasswordSetupFormContainerProps) {
  // Initialize form with Zod validation schema
  const form = useForm<PasswordSetupFormData>({
    resolver: zodResolver(passwordSetupSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  logger.debug({ maskedIdentifier }, "PasswordSetupForm props");

  // Handle form submission
  const handleSubmit = (data: PasswordSetupFormData) => {
    onSubmit(data);
  };

  // Watch password field for real-time validation feedback
  const password = form.watch("password");

  // Calculate password strength using zxcvbn
  const result = zxcvbn(password);
  const strengthScore = result.score;

  return (
    <Form {...form}>
      <PasswordSetupForm
        control={form.control}
        errors={form.formState.errors}
        onSubmit={form.handleSubmit(handleSubmit)}
        passwordValue={password}
        strengthScore={strengthScore}
        isLoading={isLoading}
        maskedIdentifier={maskedIdentifier}
        submitButtonText={submitButtonText}
        showHelpLink={showHelpLink}
      />
    </Form>
  );
}
