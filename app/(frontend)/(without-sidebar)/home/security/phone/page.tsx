import Link from "next/link";
import { redirect } from "next/navigation";

import { getUserSecurityStatusAction } from "@/actions/user";
import type { SecurityStatus } from "@/components/security";

import PhonePageClient from "./page.client";
export const dynamic = "force-dynamic";

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
  const securityStatus = await getUserSecurityStatusAction();

  // Handle case where user data is not found (should not happen for authenticated users)
  if (!securityStatus) {
    redirect("/error?type=session_expired");
  }

  // Helper function to determine security status
  const getSecurityStatus = (
    hasValue: boolean,
    isVerified: boolean
  ): SecurityStatus => {
    if (!hasValue) return "notSet";
    if (hasValue && !isVerified) return "unverified";
    return "verified";
  };

  const phoneStatus: SecurityStatus = getSecurityStatus(
    !!securityStatus.phoneNumber,
    securityStatus.phoneNumberVerified
  );

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
        <PhonePageClient
          currentPhoneNumber={securityStatus.phoneNumber}
          currentStatus={phoneStatus}
        />
      </div>
    </div>
  );
}
