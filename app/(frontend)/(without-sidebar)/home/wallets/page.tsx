import { redirect } from "next/navigation";

import { getUserBalance } from "@/domains/user";
import { getSessionUser } from "@/infra/auth/session";

import { WalletPageClient } from "./page.client";

export default async function WalletPage() {
  const user = await getSessionUser();

  if (!user) {
    redirect("/error?type=unauthorized");
  }

  const balance = await getUserBalance(user.id);

  return <WalletPageClient initialBalance={balance} />;
}
