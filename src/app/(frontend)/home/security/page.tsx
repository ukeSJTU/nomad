import { AlertCircle, CheckCircle } from "lucide-react";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { auth } from "@/lib/auth";
import { getUserSecurityStatus } from "@/lib/queries";

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
  // Check authentication
  const headersList = await headers();
  const session = await auth.api.getSession({
    headers: headersList,
  });

  // Redirect to sign-in if not authenticated
  if (!session?.user?.id) {
    redirect("/auth/sign-in");
  }

  // Fetch user security status
  const securityStatus = await getUserSecurityStatus(session.user.id);

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
          <Card className="p-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-4 flex-1">
                {/* Status Icon */}
                <div className="mt-1">
                  {securityStatus.hasPassword ? (
                    <CheckCircle className="size-5 text-green-600" />
                  ) : (
                    <AlertCircle className="size-5 text-yellow-600" />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-1">登录密码</h3>
                  <div className="text-sm text-muted-foreground space-y-1">
                    {securityStatus.hasPassword ? (
                      <p className="text-green-600 font-medium">已设置 ✓</p>
                    ) : (
                      <p className="text-yellow-600 font-medium">未设置 ⚠️</p>
                    )}
                    <p className="mt-2">
                      安全性高的密码以便账号更安全。建议定期更换密码，且设置一个包含数字和字母的密码，并且长度超过8位以上的密码。
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="shrink-0">
                <Button variant="outline" size="sm" asChild>
                  <Link href="/home/security/password">
                    {securityStatus.hasPassword ? "修改" : "设置登录密码"}
                  </Link>
                </Button>
              </div>
            </div>
          </Card>

          {/* Bound Phone */}
          <Card className="p-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-4 flex-1">
                {/* Status Icon */}
                <div className="mt-1">
                  {securityStatus.phoneNumber &&
                  securityStatus.phoneNumberVerified ? (
                    <CheckCircle className="size-5 text-green-600" />
                  ) : (
                    <AlertCircle className="size-5 text-yellow-600" />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-1">绑定手机</h3>
                  <div className="text-sm text-muted-foreground space-y-1">
                    {securityStatus.phoneNumber &&
                    securityStatus.phoneNumberVerified ? (
                      <>
                        <p className="text-green-600 font-medium">
                          已绑定 ✓ {securityStatus.phoneNumber}
                        </p>
                      </>
                    ) : (
                      <p className="text-yellow-600 font-medium">未绑定 ⚠️</p>
                    )}
                    <p className="mt-2">
                      绑定手机后，您即可享受手机号登录、动态码登录、找回密码等，为了账号安全，建议您在更换手机号后第一时间更换绑定手机。
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="shrink-0">
                <Button variant="outline" size="sm" asChild>
                  <Link href="/home/security/phone">
                    {securityStatus.phoneNumber &&
                    securityStatus.phoneNumberVerified
                      ? "修改"
                      : "设置绑定手机"}
                  </Link>
                </Button>
              </div>
            </div>
          </Card>

          {/* Bound Email */}
          <Card className="p-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-4 flex-1">
                {/* Status Icon */}
                <div className="mt-1">
                  {securityStatus.emailVerified ? (
                    <CheckCircle className="size-5 text-green-600" />
                  ) : (
                    <AlertCircle className="size-5 text-yellow-600" />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-1">绑定邮箱</h3>
                  <div className="text-sm text-muted-foreground space-y-1">
                    {securityStatus.emailVerified ? (
                      <>
                        <p className="text-green-600 font-medium">
                          已绑定 ✓ {securityStatus.email}
                        </p>
                      </>
                    ) : (
                      <p className="text-yellow-600 font-medium">未绑定 ⚠️</p>
                    )}
                    <p className="mt-2">
                      绑定邮箱后，您即可使用邮箱登录账号或找回密码等。
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="shrink-0">
                <Button variant="outline" size="sm" asChild>
                  <Link href="/home/security/email">
                    {securityStatus.emailVerified ? "修改" : "设置绑定邮箱"}
                  </Link>
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
