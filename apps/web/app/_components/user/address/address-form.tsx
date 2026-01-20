"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@ukesjtu/nomad-ui/components/primitives/form";
import { AddressForm } from "@ukesjtu/nomad-ui/components/user/address";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  createAddressAction,
  updateAddressAction,
} from "@/app/_actions/addresses";
import {
  type CreateAddressData,
  createAddressSchema,
} from "@/types/validations/addresses";

/**
 * Props for the AddressFormContainer component
 */
interface AddressFormContainerProps {
  /** Initial data for editing existing address */
  initialData?: CreateAddressData & { id?: string };
  /** Callback function called when submission succeeds */
  onSuccess?: () => void;
  /** Callback function called when cancel is clicked */
  onCancel?: () => void;
  /** Submit button label */
  submitLabel?: string;
}

/**
 * Container component for address form
 * Manages form state, schema validation, submission logic, and Server Actions
 */
export default function AddressFormContainer({
  initialData,
  onSuccess,
  onCancel,
  submitLabel = "保存",
}: AddressFormContainerProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize form with Zod validation schema
  const form = useForm({
    resolver: zodResolver(createAddressSchema),
    defaultValues: {
      recipientName: initialData?.recipientName || "",
      phoneNumber: initialData?.phoneNumber || "",
      province: initialData?.province || "",
      city: initialData?.city || "",
      district: initialData?.district || "",
      town: initialData?.town || "",
      detailAddress: initialData?.detailAddress || "",
      isDefault: initialData?.isDefault ?? false,
    },
  });

  // Handle form submission with Server Actions
  const handleSubmit = async (data: CreateAddressData) => {
    setIsSubmitting(true);
    try {
      let result;
      if (initialData?.id) {
        result = await updateAddressAction(initialData.id, data);
      } else {
        result = await createAddressAction(data);
      }

      if (result.success) {
        toast.success(initialData?.id ? "地址更新成功" : "地址添加成功");
        form.reset();
        onSuccess?.();
      } else {
        toast.error(result.error || "操作失败");
      }
    } catch (error) {
      console.error("Address form submission error:", error);
      toast.error(
        error instanceof Error ? error.message : "发生未知错误，请稍后重试"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <AddressForm
        control={form.control}
        errors={form.formState.errors}
        onSubmit={form.handleSubmit(handleSubmit)}
        onCancel={onCancel}
        isLoading={isSubmitting}
        submitLabel={submitLabel}
      />
    </Form>
  );
}
