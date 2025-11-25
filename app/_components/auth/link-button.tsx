"use client";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { authClient } from "@/domains/auth/client";

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
 * When clicked, it initiates the OAuth flow via better-auth's linkSocial method.
 *
 * This component must be a Client Component because:
 * - authClient.linkSocial() triggers browser redirect
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
      const result = await authClient.linkSocial({
        provider: providerId,
        callbackURL: "/home/accounts", // Redirect back after OAuth
      });

      if (result.error) {
        console.error(`Failed to link ${providerId}:`, result.error);
        toast.error(`Failed to link ${providerName} account`, {
          description: result.error.message || "Please try again later",
        });
      }
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
