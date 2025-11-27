import { redirect } from "next/navigation";

import { getUserBalanceAction } from "@/actions/user";

import { WalletPageClient } from "./page.client";

export default async function WalletPage() {
  const balance = await getUserBalanceAction();

  if (!balance) {
    redirect("/error?type=unauthorized");
  }

  return <WalletPageClient initialBalance={balance} />;
}
