"use client";

import { UserInfoForm as UserInfoFormUI } from "@ukesjtu/nomad-ui/components/user";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { UserInfo } from "@/types/dto";
import { UserInfoEditForm } from "./user-info-edit-form";

/**
 * Props for the UserInfoForm container component
 */
interface UserInfoFormProps {
  /** Current user data to populate the form */
  userData: UserInfo;
}

/**
 * Container component for user info form
 * Manages mode switching, router refresh, and success dialog state
 */
export function UserInfoForm({ userData }: UserInfoFormProps) {
  const router = useRouter();
  const [isEditMode, setIsEditMode] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);

  // Handle cancel - reset edit mode
  const handleCancel = () => {
    setIsEditMode(false);
  };

  // Handle success - show dialog and exit edit mode
  const handleEditSuccess = () => {
    setShowSuccessDialog(true);
    setIsEditMode(false);
  };

  // Handle success dialog close - refresh router data
  const handleSuccessDialogClose = () => {
    setShowSuccessDialog(false);
    router.refresh();
  };

  // Prepare edit form slot with UserInfoEditForm container
  const editFormSlot = (
    <UserInfoEditForm
      userData={userData}
      onCancel={handleCancel}
      onSuccess={handleEditSuccess}
    />
  );

  return (
    <UserInfoFormUI
      userData={userData}
      editFormSlot={editFormSlot}
      onEditStart={() => setIsEditMode(true)}
      onEditCancel={handleCancel}
      onEditSuccess={handleSuccessDialogClose}
      showSuccessDialog={showSuccessDialog}
      isEditMode={isEditMode}
    />
  );
}
