import { db } from "@/db";

export type DbTransaction = Parameters<typeof db.transaction>[0] extends (
  tx: infer T
) => unknown
  ? T
  : never;

export type DbExecutor = typeof db | DbTransaction;

export async function runInTransaction<T>(
  fn: (tx: DbTransaction) => Promise<T>
): Promise<T> {
  return db.transaction(fn);
}
