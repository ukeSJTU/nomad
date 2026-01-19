"use client";

import { SuccessDialog } from "./success-dialog";
import { UserInfoDisplay } from "./user-info-display";

/**
 * Props for UserInfoForm component
 */
export interface UserInfoFormProps {
  /** User information to display */
  userData: {
    /** User's nickname */
    nickname?: string | null;
    /** User's real name */
    name: string;
    /** User's gender */
    gender?: "male" | "female" | "other" | null;
    /** User's birthday */
    birthday?: string | null;
  };
  /** Edit form component to render in edit mode */
  editFormSlot: React.ReactNode;
  /** Callback when edit button is clicked */
  onEditStart: () => void;
  /** Callback when cancel is clicked */
  onEditCancel: () => void;
  /** Callback when save succeeds (after dialog closes) */
  onEditSuccess: () => void;
  /** Whether to show success dialog */
  showSuccessDialog: boolean;
  /** Whether currently in edit mode */
  isEditMode: boolean;
}

/**
 * UserInfoForm component - orchestrates user info display and editing
 * Pure UI component that manages view switching between display and edit modes
 * Uses render props pattern for edit form to allow container to manage form state
 */
export function UserInfoForm({
  userData,
  editFormSlot,
  onEditStart,
  onEditCancel,
  onEditSuccess,
  showSuccessDialog,
  isEditMode,
}: UserInfoFormProps) {
  const handleSuccessDialogClose = (open: boolean) => {
    if (!open) {
      onEditSuccess();
    }
  };

  if (isEditMode) {
    return <>{editFormSlot}</>;
  }

  return (
    <>
      <UserInfoDisplay userData={userData} onEdit={onEditStart} />
      <SuccessDialog
        open={showSuccessDialog}
        onOpenChange={handleSuccessDialogClose}
      />
    </>
  );
}
