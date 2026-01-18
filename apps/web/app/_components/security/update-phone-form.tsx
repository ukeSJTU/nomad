"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@nomad/ui/components/primitives/form";
import { UpdatePhoneForm } from "@nomad/ui/components/security";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { type UpdatePhoneData, updatePhoneSchema } from "@/types/validations";

export type PhoneFormMode = "bind" | "verify" | "update";

interface UpdatePhoneFormContainerProps {
  /** Current phone number (empty for bind mode) */
  currentPhoneNumber?: string | null;
  /** Form mode: bind (first time), verify (existing unverified), update (change verified) */
  mode: PhoneFormMode;
  onSubmit: (data: UpdatePhoneData) => void;
  onSendOtp: (phoneNumber: string) => void;
  isLoading?: boolean;
  isVerifying?: boolean;
  countdown?: number;
}

/**
 * Container component for update phone form
 * Manages form state, schema validation, OTP countdown tracking
 */
export default function UpdatePhoneFormContainer({
  currentPhoneNumber,
  mode,
  onSubmit,
  onSendOtp,
  isLoading = false,
  isVerifying = false,
  countdown = 0,
}: UpdatePhoneFormContainerProps) {
  const form = useForm<UpdatePhoneData>({
    resolver: zodResolver(updatePhoneSchema),
    defaultValues: {
      phoneNumber:
        mode === "verify" && currentPhoneNumber ? currentPhoneNumber : "",
      otp: "",
    },
  });

  // Watch for changes in phoneNumber
  const phoneNumber = form.watch("phoneNumber");

  /** Track if OTP has been sent at least once */
  const hasSentRef = useRef(false);

  // Mark as sent when countdown starts
  useEffect(() => {
    if (countdown > 0) {
      hasSentRef.current = true;
    }
  }, [countdown]);

  const handleSubmit = (data: UpdatePhoneData) => {
    onSubmit(data);
  };

  const handleSendOtp = async () => {
    // For verify mode, use current phone number
    const targetPhone =
      mode === "verify" && currentPhoneNumber
        ? currentPhoneNumber
        : form.getValues("phoneNumber");

    // Validate phone number before sending OTP (skip for verify mode since phone is fixed)
    if (mode !== "verify") {
      const isValid = await form.trigger("phoneNumber");
      if (!isValid) return;
    }

    onSendOtp(targetPhone);
  };

  return (
    <Form {...form}>
      <UpdatePhoneForm
        control={form.control}
        errors={form.formState.errors}
        onSubmit={form.handleSubmit(handleSubmit)}
        onSendOtp={handleSendOtp}
        currentPhoneNumber={currentPhoneNumber}
        phoneNumberValue={phoneNumber}
        mode={mode}
        isLoading={isLoading}
        isVerifying={isVerifying}
        countdown={countdown}
        hasSent={hasSentRef.current}
      />
    </Form>
  );
}
