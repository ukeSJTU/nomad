import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import { getUserSecurityStatus } from "@/lib/queries/user";

import PasswordPageClient from "./page.client";

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
  const headersList = await headers();
  const session = await auth.api.getSession({
    headers: headersList,
  });

  // Redirect to sign-in if not authenticated
  if (!session?.user?.id) {
    redirect("/auth/sign-in");
  }

  // Fetch user security status to determine if user has a password
  const securityStatus = await getUserSecurityStatus(session.user.id);

  // Handle case where user data is not found (should not happen for authenticated users)
  if (!securityStatus) {
    redirect("/auth/sign-in");
  }

  // Get user email for OAuth password setup (unmasked)
  const userEmail = session.user.email;

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
