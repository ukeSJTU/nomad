import Link from "next/link";

import { requireAuth } from "@/domains/auth/utils/helpers";
import { getUserSecurityStatus } from "@/domains/user/user.repository";

import PasswordPageClient from "./page.client";

export const dynamic = "force-dynamic";

/**
 * Password Management Page (Server Component)
 *
 * This page allows users to:
 * - Change their password (if they already have one)
 * - Set a password (if they are OAuth users without a password)
 *
 * Features:
 * - Authentication check with redirect to sign-in
 * - Server-side data fetching to determine user's password status
 * - Delegates to client component for form handling
 */
export default async function PasswordPage() {
  // Check authentication
  const userId = await requireAuth();

  // Fetch user security status to determine if user has a password
  const securityStatus = await getUserSecurityStatus(userId);

  // Get user email for OAuth password setup (unmasked)
  const userEmail = securityStatus.email;

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <Link href="/home/security" className="hover:text-foreground">
              账号安全
            </Link>
            <span>/</span>
            <span className="text-foreground">
              {securityStatus.hasPassword ? "修改密码" : "设置密码"}
            </span>
          </div>
          <h1 className="text-3xl font-bold mb-2">
            {securityStatus.hasPassword ? "修改密码" : "设置登录密码"}
          </h1>
          <p className="text-muted-foreground">
            {securityStatus.hasPassword
              ? "为了您的账号安全，建议定期更换密码"
              : "设置密码后，您可以使用密码登录"}
          </p>
        </div>

        {/* Client Component for Form Handling */}
        <PasswordPageClient
          hasPassword={securityStatus.hasPassword}
          userEmail={userEmail}
        />
      </div>
    </div>
  );
}
