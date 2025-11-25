import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import { getUserBalance } from "@/lib/repositories";

import { WalletPageClient } from "./page.client";

export default async function WalletPage() {
  // Check authentication
  const headersList = await headers();
  const session = await auth.api.getSession({ headers: headersList });

  if (!session?.user?.id) {
    redirect("/error?type=unauthorized");
  }

  // Fetch user balance
  const balance = await getUserBalance(session.user.id);

  return <WalletPageClient initialBalance={balance} />;
}
