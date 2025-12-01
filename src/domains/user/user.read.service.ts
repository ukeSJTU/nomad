import type { UserInfo, UserSecurityStatus } from "@/types/dto";

import type { UserRow } from "./user.repository";
import {
  getUserBalance as getUserBalanceFromRepo,
  getUserById as getUserByIdFromRepo,
  getUserInfo as getUserInfoFromRepo,
  getUserSecurityStatus as getUserSecurityStatusFromRepo,
} from "./user.repository";

/**
 * Read-only user services that keep repository access scoped to this domain.
 */
export async function getUserInfo(userId: string): Promise<UserInfo> {
  return getUserInfoFromRepo(userId);
}

export async function getUserSecurityStatus(
  userId: string
): Promise<UserSecurityStatus> {
  return getUserSecurityStatusFromRepo(userId);
}

export async function getUserBalance(userId: string): Promise<string> {
  return getUserBalanceFromRepo(userId);
}

export async function getUserById(
  userId: string
): Promise<UserRow | undefined> {
  return getUserByIdFromRepo(userId);
}

export type { UserRow };
