import Link from "next/link";

import { getUserSecurityStatus } from "@/lib/queries/user";
import { requireAuth } from "@/utils/auth-helpers";

import EmailPageClient from "./page.client";

/**
 * Email Management Page (Server Component)
 *
 * This page allows users to update their email address.
 *
 * Features:
 * - Authentication check with redirect to sign-in
 * - Server-side data fetching to get current email
 * - Delegates to client component for form handling
 */
export default async function EmailPage() {
  // Check authentication (redirects to sign-in if not authenticated)
  const userId = await requireAuth();

  // Fetch user security status to get current email
  const securityStatus = await getUserSecurityStatus(userId);

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
            <span className="text-foreground">修改邮箱</span>
          </div>
          <h1 className="text-3xl font-bold mb-2">修改邮箱</h1>
          <p className="text-muted-foreground">验证新邮箱后即可完成修改</p>
        </div>

        {/* Client Component for Form Handling */}
        <EmailPageClient currentEmail={securityStatus.email} />
      </div>
    </div>
  );
}
