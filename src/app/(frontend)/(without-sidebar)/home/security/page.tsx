import { redirect } from "next/navigation";

import { SecurityItem } from "@/components/security";
import { getUserSecurityStatus } from "@/lib/queries";
import { requireAuth } from "@/utils/auth-helpers";

/**
 * Account Security Page (Server Component)
 *
 * Displays user's account security settings including:
 * - Login password status (set/not set)
 * - Bound phone number status
 * - Bound email status
 *
 * Features:
 * - Authentication check with redirect to sign-in
 * - Server-side data fetching with data masking
 * - Status indicators (✓ for set, ⚠️ for not set)
 * - Action buttons for each security item
 */
export default async function SecurityPage() {
  // Check authentication (redirects to sign-in if not authenticated)
  const userId = await requireAuth();

  // Fetch user security status
  const securityStatus = await getUserSecurityStatus(userId);

  // Handle case where user data is not found (should not happen for authenticated users)
  if (!securityStatus) {
    redirect("/auth/sign-in");
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">账号安全</h1>
          <p className="text-muted-foreground">
            管理您的账号安全设置，包括密码、手机号和邮箱
          </p>
        </div>

        {/* Security Items */}
        <div className="space-y-4">
          {/* Login Password */}
          <SecurityItem
            title="登录密码"
            description="安全性高的密码以便账号更安全。建议定期更换密码，且设置一个包含数字和字母的密码，并且长度超过8位以上的密码。"
            isSet={securityStatus.hasPassword}
            value={securityStatus.hasPassword ? "" : undefined}
            actionHref="/home/security/password"
            actionLabel={securityStatus.hasPassword ? "修改" : "设置登录密码"}
          />

          {/* Bound Phone */}
          <SecurityItem
            title="绑定手机"
            description="绑定手机后，您即可享受手机号登录、动态码登录、找回密码等，为了账号安全，建议您在更换手机号后第一时间更换绑定手机。"
            isSet={
              !!(
                securityStatus.phoneNumber && securityStatus.phoneNumberVerified
              )
            }
            value={securityStatus.phoneNumber || undefined}
            actionHref="/home/security/phone"
            actionLabel={
              securityStatus.phoneNumber && securityStatus.phoneNumberVerified
                ? "修改"
                : "设置绑定手机"
            }
          />

          {/* Bound Email */}
          <SecurityItem
            title="绑定邮箱"
            description="绑定邮箱后，您即可使用邮箱登录账号或找回密码等。"
            isSet={securityStatus.emailVerified}
            value={securityStatus.email || undefined}
            actionHref="/home/security/email"
            actionLabel={securityStatus.emailVerified ? "修改" : "设置绑定邮箱"}
          />
        </div>
      </div>
    </div>
  );
}
