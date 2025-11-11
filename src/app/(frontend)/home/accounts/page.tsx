import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { LinkButton } from "@/components/auth/link-button";
import SocialAccountCard from "@/components/auth/social-account-card";
import { UnlinkButton } from "@/components/auth/unlink-button";
import { auth } from "@/lib/auth";

/**
 * Social provider configuration
 */
interface ProviderConfig {
  id: "github" | "google";
  name: string;
}

/**
 * Supported social providers
 */
const PROVIDERS: ProviderConfig[] = [
  { id: "github", name: "GitHub" },
  { id: "google", name: "Google" },
];

/**
 * Account Binding Page (Server Component)
 *
 * Displays social account binding status and allows users to link/unlink accounts.
 * This is a complete Server Component that only uses minimal Client Components
 * for interactive buttons (LinkButton and UnlinkButton).
 *
 * Features:
 * - Authentication check with redirect to sign-in
 * - Server-side data fetching for account bindings
 * - Displays GitHub and Google account cards
 * - Link/unlink functionality via Client Component buttons
 */
export default async function AccountsPage() {
  // Check authentication
  const headersList = await headers();
  const session = await auth.api.getSession({
    headers: headersList,
  });

  // Redirect to sign-in if not authenticated
  if (!session?.user?.id) {
    redirect("/auth/sign-in");
  }

  // Fetch user's linked accounts using better-auth server API
  const accounts = await auth.api.listUserAccounts({
    headers: headersList,
  });

  /**
   * Check if a provider is linked
   */
  const isLinked = (providerId: string): boolean => {
    return (accounts || []).some(acc => acc.providerId === providerId);
  };

  /**
   * Get account ID for a linked provider
   */
  const getAccountId = (providerId: string): string | undefined => {
    const account = (accounts || []).find(acc => acc.providerId === providerId);
    return account?.accountId;
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">绑定和关联</h1>
          <p className="text-muted-foreground">
            管理您的社交账号绑定，绑定后可以使用这些账号快速登录
          </p>
        </div>

        {/* Social Account Cards */}
        <div className="flex flex-wrap gap-6">
          {PROVIDERS.map(provider => {
            const linked = isLinked(provider.id);
            const accountId = getAccountId(provider.id);

            return (
              <SocialAccountCard
                key={provider.id}
                provider={provider.id}
                providerName={provider.name}
                isLinked={linked}
                accountId={accountId}
                linkButton={
                  <LinkButton
                    providerId={provider.id}
                    providerName={provider.name}
                  />
                }
                unlinkButton={<UnlinkButton providerId={provider.id} />}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
