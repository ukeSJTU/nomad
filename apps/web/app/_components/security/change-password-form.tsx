"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@ukesjtu/nomad-ui/components/primitives/form";
import { ChangePasswordForm } from "@ukesjtu/nomad-ui/components/security";
import { useForm } from "react-hook-form";
import {
  type ChangePasswordData,
  changePasswordSchema,
} from "@/types/validations";

type ChangePasswordFormData = ChangePasswordData;

/**
 * Props for the ChangePasswordFormContainer component
 */
interface ChangePasswordFormContainerProps {
  /** Callback function called when form is submitted with valid data */
  onSubmit: (data: ChangePasswordFormData) => Promise<void>;
  /** Whether the form is in loading state (disables submit button) */
  isLoading?: boolean;
}

/**
 * Container component for change password form
 * Manages form state, schema validation, and submission logic
 */
export default function ChangePasswordFormContainer({
  onSubmit,
  isLoading = false,
}: ChangePasswordFormContainerProps) {
  // Initialize form with Zod validation schema
  const form = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  // Handle form submission
  const handleSubmit = async (data: ChangePasswordFormData) => {
    await onSubmit(data);
  };

  // Watch new password field for real-time validation feedback
  const newPassword = form.watch("newPassword");

  return (
    <Form {...form}>
      <ChangePasswordForm
        control={form.control}
        errors={form.formState.errors}
        onSubmit={form.handleSubmit(handleSubmit)}
        newPasswordValue={newPassword}
        isLoading={isLoading}
      />
    </Form>
  );
}
