import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import { getUserSecurityStatus } from "@/lib/queries/user";

import PhonePageClient from "./page.client";

/**
 * Phone Number Management Page (Server Component)
 *
 * This page allows users to:
 * - Bind a phone number (if they don't have one)
 * - Update their phone number (if they already have one)
 *
 * Features:
 * - Authentication check with redirect to sign-in
 * - Server-side data fetching to get current phone number
 * - Delegates to client component for form handling
 */
export default async function PhonePage() {
  // Check authentication
  const headersList = await headers();
  const session = await auth.api.getSession({
    headers: headersList,
  });

  // Redirect to sign-in if not authenticated
  if (!session?.user?.id) {
    redirect("/auth/sign-in");
  }

  // Fetch user security status to get current phone number
  const securityStatus = await getUserSecurityStatus(session.user.id);

  // Handle case where user data is not found (should not happen for authenticated users)
  if (!securityStatus) {
    redirect("/auth/sign-in");
  }

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
              {securityStatus.phoneNumber ? "修改手机号" : "绑定手机号"}
            </span>
          </div>
          <h1 className="text-3xl font-bold mb-2">
            {securityStatus.phoneNumber ? "修改手机号" : "绑定手机号"}
          </h1>
          <p className="text-muted-foreground">
            {securityStatus.phoneNumber
              ? "验证新手机号后即可完成修改"
              : "绑定手机号后可以使用手机号登录"}
          </p>
        </div>

        {/* Client Component for Form Handling */}
        <PhonePageClient currentPhoneNumber={securityStatus.phoneNumber} />
      </div>
    </div>
  );
}
