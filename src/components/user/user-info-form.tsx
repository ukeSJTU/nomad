"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { SuccessDialog } from "@/components/user/success-dialog";
import { UserInfoDisplay } from "@/components/user/user-info-display";
import { UserInfoEditForm } from "@/components/user/user-info-edit-form";
import type { UserInfo } from "@/types/dto";

interface UserInfoFormProps {
  userData: UserInfo;
}

export function UserInfoForm({ userData }: UserInfoFormProps) {
  const router = useRouter();
  const [isEditMode, setIsEditMode] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);

  const handleSuccess = () => {
    setShowSuccessDialog(true);
    setIsEditMode(false);
    // Refresh the page data without full reload
    router.refresh();
  };

  if (isEditMode) {
    return (
      <UserInfoEditForm
        userData={userData}
        onCancel={() => setIsEditMode(false)}
        onSuccess={handleSuccess}
      />
    );
  }

  return (
    <>
      <UserInfoDisplay userData={userData} onEdit={() => setIsEditMode(true)} />
      <SuccessDialog
        open={showSuccessDialog}
        onOpenChange={setShowSuccessDialog}
      />
    </>
  );
}
