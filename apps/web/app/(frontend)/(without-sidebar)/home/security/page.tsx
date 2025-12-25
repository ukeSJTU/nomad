import { SecurityItem, type SecurityStatus } from "@/components/security";
import { getUserSecurityStatus } from "@/domains/user";
import { requireSessionUser } from "@/infra/auth/session";

export const dynamic = "force-dynamic";

/**
 * Security items configuration
 * Contains text content for each security setting item
 */
const SECURITY_ITEMS = {
  password: {
    title: "登录密码",
    description:
      "安全性高的密码以便账号更安全。建议定期更换密码，且设置一个包含数字和字母的密码，并且长度超过8位以上的密码。",
    setLabel: "修改",
    notSetLabel: "设置登录密码",
    href: "/home/security/password",
  },
  phone: {
    title: "绑定手机",
    description:
      "绑定手机后，您即可享受手机号登录、动态码登录、找回密码等，为了账号安全，建议您在更换手机号后第一时间更换绑定手机。",
    setLabel: "修改",
    verifyLabel: "验证",
    notSetLabel: "设置绑定手机",
    href: "/home/security/phone",
  },
  email: {
    title: "绑定邮箱",
    description: "绑定邮箱后，您即可使用邮箱登录账号或找回密码等。",
    setLabel: "修改",
    verifyLabel: "验证",
    notSetLabel: "设置绑定邮箱",
    href: "/home/security/email",
  },
} as const;

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
 * - Status indicators (CheckCircle for set, AlertCircle for not set)
 * - Action buttons for each security item
 */
export default async function SecurityPage() {
  const user = await requireSessionUser("/home/security");
  const securityStatus = await getUserSecurityStatus(user.id);

  if (!securityStatus) {
    return null;
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

  // Derived status for each security item
  const passwordStatus: SecurityStatus = securityStatus.hasPassword
    ? "verified"
    : "notSet";

  const phoneStatus: SecurityStatus = getSecurityStatus(
    !!securityStatus.phoneNumber,
    securityStatus.phoneNumberVerified
  );

  const emailStatus: SecurityStatus = getSecurityStatus(
    !!securityStatus.email,
    securityStatus.emailVerified
  );

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
            title={SECURITY_ITEMS.password.title}
            description={SECURITY_ITEMS.password.description}
            status={passwordStatus}
            value={undefined}
            actionHref={SECURITY_ITEMS.password.href}
            actionLabel={
              passwordStatus === "verified"
                ? SECURITY_ITEMS.password.setLabel
                : SECURITY_ITEMS.password.notSetLabel
            }
          />

          {/* Bound Phone */}
          <SecurityItem
            title={SECURITY_ITEMS.phone.title}
            description={SECURITY_ITEMS.phone.description}
            status={phoneStatus}
            value={securityStatus.phoneNumber || undefined}
            actionHref={SECURITY_ITEMS.phone.href}
            actionLabel={
              phoneStatus === "verified"
                ? SECURITY_ITEMS.phone.setLabel
                : phoneStatus === "unverified"
                  ? SECURITY_ITEMS.phone.verifyLabel
                  : SECURITY_ITEMS.phone.notSetLabel
            }
          />

          {/* Bound Email */}
          <SecurityItem
            title={SECURITY_ITEMS.email.title}
            description={SECURITY_ITEMS.email.description}
            status={emailStatus}
            value={securityStatus.email || undefined}
            actionHref={SECURITY_ITEMS.email.href}
            actionLabel={
              emailStatus === "verified"
                ? SECURITY_ITEMS.email.setLabel
                : emailStatus === "unverified"
                  ? SECURITY_ITEMS.email.verifyLabel
                  : SECURITY_ITEMS.email.notSetLabel
            }
          />
        </div>
      </div>
    </div>
  );
}
