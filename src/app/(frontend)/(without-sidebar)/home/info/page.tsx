import Link from "next/link";
import { redirect } from "next/navigation";

import { Separator } from "@/components/ui/separator";
import { UserInfoForm } from "@/components/user";
import { getUserInfo } from "@/lib/repositories";
import { requireAuth } from "@/utils/auth-helpers";

export const dynamic = "force-dynamic";

/**
 * User Information Page (Server Component)
 *
 * Displays and allows editing of the current user's personal information.
 * This is a Server Component that handles authentication and data fetching,
 * then renders the UserInfoForm client component for user interaction.
 *
 * Features:
 * - Authentication check with redirect to sign-in
 * - Server-side data fetching with data masking for sensitive fields
 * - View/edit modes for user information
 * - Update functionality via Server Actions
 */
export default async function UserInfoPage() {
  // Check authentication (redirects to sign-in if not authenticated)
  const userId = await requireAuth();

  // Fetch user information (with masked sensitive data)
  const userData = await getUserInfo(userId);

  // Handle case where user data is not found (should not happen for authenticated users)
  if (!userData) {
    redirect("/error?type=session_expired");
  }

  return (
    <div className="mx-auto pt-2 pb-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">个人信息</h1>
          <p className="text-muted-foreground">查看和管理您的个人信息</p>
        </div>

        <div className="space-y-6">
          {/* User Info Form Component */}
          <UserInfoForm userData={userData} />

          {/* Account Security Section */}
          <div className="space-y-6 bg-white p-6 rounded-lg border">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-foreground">
                账号安全
              </h2>
            </div>

            <Separator />

            <div className="space-y-4">
              {/* Email */}
              <div className="grid grid-cols-[auto_1fr] items-start gap-4">
                <label className="pt-1 text-sm font-medium text-muted-foreground w-36">
                  邮箱
                </label>
                <div className="flex items-center gap-2">
                  {userData.email && userData.emailVerified ? (
                    <>
                      <span className="text-sm text-foreground">
                        {userData.email}
                      </span>
                      <span className="text-xs text-chart-5">(已验证)</span>
                      <Link
                        href="/home/security/email"
                        className="text-sm text-primary hover:underline"
                      >
                        修改
                      </Link>
                    </>
                  ) : (
                    <>
                      <span className="text-sm text-muted-foreground">
                        未填写
                      </span>
                      <Link
                        href="/home/security/email"
                        className="text-sm text-primary hover:underline"
                      >
                        验证
                      </Link>
                    </>
                  )}
                </div>
              </div>

              {/* Phone Number */}
              <div className="grid grid-cols-[auto_1fr] items-start gap-4">
                <label className="pt-1 text-sm font-medium text-muted-foreground w-36">
                  手机号
                </label>
                <div className="flex items-center gap-2">
                  {userData.phoneNumber && userData.phoneNumberVerified ? (
                    <>
                      <span className="text-sm text-foreground">
                        {userData.phoneNumber}
                      </span>
                      <span className="text-xs text-chart-5">(已验证)</span>
                      <Link
                        href="/home/security/phone"
                        className="text-sm text-primary hover:underline"
                      >
                        修改
                      </Link>
                    </>
                  ) : (
                    <>
                      <span className="text-sm text-muted-foreground">
                        未填写
                      </span>
                      <Link
                        href="/home/security/phone"
                        className="text-sm text-primary hover:underline"
                      >
                        验证
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
