"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import {
  changePasswordAction,
  setPasswordForOAuthUserAction,
} from "@/app/_actions/auth";
import PasswordSetupForm from "@/components/auth/forms/password-setup";
import ChangePasswordForm from "@/components/security/change-password-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createClientLogger } from "@/infra/logging/client-logger";
import { type PasswordSetupData } from "@/types/validations";

const logger = createClientLogger({ module: "security-password-page" });

/**
 * Props for the PasswordPageClient component
 */
interface PasswordPageClientProps {
  /** Whether the user already has a password */
  hasPassword: boolean;
  /** User's email address (for OAuth users setting password) */
  userEmail: string;
}

/**
 * Client component for password management
 *
 * Handles two scenarios:
 * 1. User has password: Show change password form
 * 2. OAuth user without password: Show password setup form
 */
export default function PasswordPageClient({
  hasPassword,
  userEmail,
}: PasswordPageClientProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Handle change password form submission
   * For users who already have a password
   */
  const handleChangePassword = async (data: {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  }) => {
    setIsLoading(true);

    try {
      const result = await changePasswordAction(
        data.currentPassword,
        data.newPassword
      );

      if (!result.success) {
        toast.error(result.error || "修改密码失败");
        return;
      }

      toast.success("密码修改成功");
      // Redirect back to security page after 1 second
      setTimeout(() => {
        router.push("/home/security");
      }, 1000);
    } catch (error) {
      logger.error({ err: error }, "Change password error");
      toast.error("网络错误，请稍后重试");
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handle password setup form submission
   * For OAuth users who don't have a password yet
   */
  const handleSetPassword = async (data: PasswordSetupData) => {
    setIsLoading(true);

    try {
      const result = await setPasswordForOAuthUserAction(data.password);

      if (!result.success) {
        toast.error(result.error || "设置密码失败");
        return;
      }

      toast.success("密码设置成功");
      // Redirect back to security page after 1 second
      setTimeout(() => {
        router.push("/home/security");
      }, 1000);
    } catch (error) {
      logger.error({ err: error }, "Set password error");
      toast.error("网络错误，请稍后重试");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{hasPassword ? "修改密码" : "设置登录密码"}</CardTitle>
      </CardHeader>
      <CardContent>
        {hasPassword ? (
          // Scenario 1: User has password - show change password form
          <ChangePasswordForm
            onSubmit={handleChangePassword}
            isLoading={isLoading}
          />
        ) : (
          // Scenario 2: OAuth user without password - show password setup form
          <div className="space-y-4">
            <div className="rounded-lg bg-blue-50 p-4 text-sm text-blue-800">
              <p className="font-medium mb-1">设置密码</p>
              <p>
                您当前通过第三方账号登录（{userEmail}
                ），设置密码后可以使用密码登录。
              </p>
            </div>
            <PasswordSetupForm
              onSubmit={handleSetPassword}
              isLoading={isLoading}
              submitButtonText="确认设置"
              showHelpLink={false}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
