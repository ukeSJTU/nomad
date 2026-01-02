"use client";

import { Button } from "@nomad/ui/components/button";
import { useTransition } from "react";
import { toast } from "sonner";
import { unlinkAccountAction } from "@/app/_actions/auth";

/**
 * Props for UnlinkButton component
 */
interface UnlinkButtonProps {
  /** Social provider identifier */
  providerId: string;
}

/**
 * UnlinkButton Component
 *
 * A minimal client component that wraps the unlinkAccountAction Server Action.
 * Handles the unlinking of social accounts with loading state and toast notifications.
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

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleUnlink}
      disabled={isPending}
      className="text-sm"
    >
      {isPending ? "解绑中..." : "取消绑定"}
    </Button>
  );
}
