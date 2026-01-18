"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@nomad/ui/components/primitives/form";
import { UserInfoEditForm as UserInfoEditFormUI } from "@nomad/ui/components/user";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { updateUserInfoAction } from "@/app/_actions";
import type { ActionResult } from "@/types/common";
import type { UserInfo } from "@/types/dto";
import {
  type UserInfoUpdateData,
  userInfoUpdateSchema,
} from "@/types/validations";

/**
 * Props for the UserInfoEditFormContainer component
 */
interface UserInfoEditFormContainerProps {
  /** Current user data to populate the form */
  userData: UserInfo;
  /** Callback function called when cancel is clicked */
  onCancel: () => void;
  /** Callback function called when update succeeds */
  onSuccess: () => void;
}

/**
 * Container component for user info edit form
 * Manages form state, schema validation, submission logic, and Server Actions
 */
export function UserInfoEditForm({
  userData,
  onCancel,
  onSuccess,
}: UserInfoEditFormContainerProps) {
  const [state, setState] = useState<ActionResult<void> | null>(null);
  const [isPending, startTransition] = useTransition();

  // Initialize form with Zod validation schema
  const form = useForm<UserInfoUpdateData>({
    resolver: zodResolver(userInfoUpdateSchema),
    defaultValues: {
      nickname: userData.nickname || "",
      name: userData.name || "",
      gender: userData.gender || undefined,
      birthday: userData.birthday || "",
    },
  });

  // Handle form submission with Server Actions
  const handleSubmit = async (data: UserInfoUpdateData) => {
    startTransition(async () => {
      const result = await updateUserInfoAction(data);
      setState(result);
      if (result.success) {
        onSuccess();
      }
    });
  };

  // Handle cancel with form reset
  const handleCancel = () => {
    form.reset({
      nickname: userData.nickname || "",
      name: userData.name || "",
      gender: userData.gender || undefined,
      birthday: userData.birthday || "",
    });
    onCancel();
  };

  return (
    <Form {...form}>
      <UserInfoEditFormUI
        control={form.control}
        errors={form.formState.errors}
        onSubmit={form.handleSubmit(handleSubmit)}
        onCancel={handleCancel}
        isLoading={isPending}
        errorMessage={state?.error}
      />
    </Form>
  );
}
