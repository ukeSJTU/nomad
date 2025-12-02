import { getUserBalance } from "@/domains/user";
import { requireSessionUser } from "@/infra/auth/session";

import { WalletPageClient } from "./page.client";

export default async function WalletPage() {
  const user = await requireSessionUser("/home/wallets");

  const balance = await getUserBalance(user.id);

  return <WalletPageClient initialBalance={balance} />;
}
