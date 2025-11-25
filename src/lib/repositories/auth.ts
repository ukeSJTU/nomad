import { and, eq } from "drizzle-orm";

import { db } from "@/db";
import { account } from "@/db/schema";

import type { DbExecutor } from "./transaction";

export type AccountRow = typeof account.$inferSelect;

export async function getAccountsByUserId(
  userId: string,
  dbClient: DbExecutor = db
): Promise<AccountRow[]> {
  return dbClient.select().from(account).where(eq(account.userId, userId));
}

export async function deleteAccountById(
  accountId: string,
  userId: string,
  dbClient: DbExecutor = db
): Promise<void> {
  await dbClient
    .delete(account)
    .where(and(eq(account.id, accountId), eq(account.userId, userId)));
}

export async function findCredentialAccount(
  userId: string,
  dbClient: DbExecutor = db
): Promise<AccountRow | undefined> {
  const [credentialAccount] = await dbClient
    .select()
    .from(account)
    .where(
      and(eq(account.userId, userId), eq(account.providerId, "credential"))
    )
    .limit(1);

  return credentialAccount;
}
