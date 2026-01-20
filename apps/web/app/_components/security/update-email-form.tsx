"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@ukesjtu/nomad-ui/components/primitives/form";
import { UpdateEmailForm } from "@ukesjtu/nomad-ui/components/security";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { type UpdateEmailData, updateEmailSchema } from "@/types/validations";

export type EmailFormMode = "bind" | "verify" | "update";

interface UpdateEmailFormContainerProps {
  /** Current email address (empty for bind mode) */
  currentEmail?: string;
  /** Form mode: bind (first time), verify (existing unverified), update (change verified) */
  mode: EmailFormMode;
  onSubmit: (data: UpdateEmailData) => void;
  onSendOtp: (email: string) => void;
  isLoading?: boolean;
  isVerifying?: boolean;
  countdown?: number;
}

/**
 * Container component for update email form
 * Manages form state, schema validation, OTP countdown tracking
 */
export default function UpdateEmailFormContainer({
  currentEmail = "",
  mode,
  onSubmit,
  onSendOtp,
  isLoading = false,
  isVerifying = false,
  countdown = 0,
}: UpdateEmailFormContainerProps) {
  const form = useForm<UpdateEmailData>({
    resolver: zodResolver(updateEmailSchema),
    defaultValues: {
      email: mode === "verify" ? currentEmail : "",
      otp: "",
    },
  });

  // Watch for changes in email
  const email = form.watch("email");

  /** Track if OTP has been sent at least once */
  const hasSentRef = useRef(false);

  // Mark as sent when countdown starts
  useEffect(() => {
    if (countdown > 0) {
      hasSentRef.current = true;
    }
  }, [countdown]);

  const handleSubmit = (data: UpdateEmailData) => {
    onSubmit(data);
  };

  const handleSendOtp = async () => {
    // For verify mode, use current email
    const targetEmail =
      mode === "verify" ? currentEmail : form.getValues("email");

    // Validate email before sending OTP (skip for verify mode since email is fixed)
    if (mode !== "verify") {
      const isValid = await form.trigger("email");
      if (!isValid) return;
    }

    onSendOtp(targetEmail);
  };

  return (
    <Form {...form}>
      <UpdateEmailForm
        control={form.control}
        errors={form.formState.errors}
        onSubmit={form.handleSubmit(handleSubmit)}
        onSendOtp={handleSendOtp}
        currentEmail={currentEmail}
        emailValue={email}
        mode={mode}
        isLoading={isLoading}
        isVerifying={isVerifying}
        countdown={countdown}
        hasSent={hasSentRef.current}
      />
    </Form>
  );
}
