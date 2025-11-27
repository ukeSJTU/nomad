"use client";

import { toast } from "sonner";

import { linkSocialAccountAction } from "@/app/_actions/auth";
import { Button } from "@/components/ui/button";

/**
 * Props for LinkButton component
 */
interface LinkButtonProps {
  /** Social provider identifier */
  providerId: "github" | "google";
  /** Display name of the provider for error messages */
  providerName: string;
}

/**
 * LinkButton Component
 *
 * A client component that handles OAuth linking for social accounts.
 * When clicked, it requests a server-generated OAuth URL and redirects the browser.
 *
 * This component must be a Client Component because:
 * - Browser must perform the redirect after receiving the URL from the server
 * - Cannot be called from Server Components
 *
 * @example
 * ```tsx
 * <LinkButton providerId="github" providerName="GitHub" />
 * ```
 */
export function LinkButton({ providerId, providerName }: LinkButtonProps) {
  /**
   * Handle linking a social account
   * Initiates OAuth flow via better-auth
   */
  const handleLink = async () => {
    try {
      // Initiate OAuth flow for linking account
      const result = await linkSocialAccountAction(
        providerId,
        "/home/accounts"
      );

      if (!result.success || !result.data?.url) {
        console.error(`Failed to link ${providerId}:`, result.error);
        toast.error(`Failed to link ${providerName} account`, {
          description: result.error || "Please try again later",
        });
        return;
      }

      window.location.href = result.data.url;
      // OAuth redirect will happen automatically if successful
    } catch (error) {
      console.error(`Error linking ${providerId}:`, error);
      toast.error(`Error linking ${providerName} account`, {
        description: "An unexpected error occurred",
      });
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleLink}
      className="text-sm"
    >
      绑定账号
    </Button>
  );
}
