import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { UserInfoForm } from "@/components/user";
import { auth } from "@/lib/auth";
import { getUserInfo } from "@/lib/queries";

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
  // Check authentication
  const headersList = await headers();
  const session = await auth.api.getSession({
    headers: headersList,
  });

  // Redirect to sign-in if not authenticated
  if (!session?.user?.id) {
    redirect("/auth/sign-in");
  }

  // Fetch user information (with masked sensitive data)
  const userData = await getUserInfo(session.user.id);

  // Handle case where user data is not found (should not happen for authenticated users)
  if (!userData) {
    redirect("/auth/sign-in");
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">个人信息</h1>
          <p className="text-muted-foreground">查看和管理您的个人信息</p>
        </div>

        {/* User Info Form Component */}
        <UserInfoForm userData={userData} />
      </div>
    </div>
  );
}
