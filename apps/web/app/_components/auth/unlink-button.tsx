"use client";

import { UnlinkButton as UnlinkButtonUI } from "@nomad/ui/components/auth/unlink-button";
import { useTransition } from "react";
import { toast } from "sonner";
import { unlinkAccountAction } from "@/app/_actions/auth";

/**
 * Props for UnlinkButton container component
 */
interface UnlinkButtonProps {
  /** Social provider identifier */
  providerId: string;
}

/**
 * UnlinkButton Container Component
 *
 * Wraps the pure UI UnlinkButton component with unlinking logic.
 * Handles server actions, transition state, and toast notifications.
 *
 * This component must be a Client Component because:
 * - Uses useTransition hook for pending state
 * - Displays toast notifications
 * - Handles user interactions
 *
 * @example
 * ```tsx
 * <UnlinkButton providerId="github" />
 * ```
 */
export function UnlinkButton({ providerId }: UnlinkButtonProps) {
  const [isPending, startTransition] = useTransition();

  /**
   * Handle unlinking a social account
   * Calls the Server Action and displays appropriate toast
   */
  const handleUnlink = () => {
    startTransition(async () => {
      const result = await unlinkAccountAction(providerId);

      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error(result.error);
      }
    });
  };

  return <UnlinkButtonUI onClick={handleUnlink} loading={isPending} />;
}
