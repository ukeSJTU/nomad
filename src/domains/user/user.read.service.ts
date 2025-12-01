import type { UserInfo, UserProfile, UserSecurityStatus } from "@/types/dto";

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
): Promise<UserProfile | undefined> {
  const user = await getUserByIdFromRepo(userId);

  if (!user) {
    return undefined;
  }

  return mapUserToProfile(user);
}

function mapUserToProfile(user: UserRow): UserProfile {
  return {
    id: user.id,
    name: user.name,
    nickname: user.nickname ?? null,
    email: user.email,
    emailVerified: user.emailVerified,
    phoneNumber: user.phoneNumber ?? null,
    phoneNumberVerified: user.phoneNumberVerified ?? false,
    gender: user.gender ?? null,
    birthday: user.birthday ?? null,
    image: user.image ?? null,
    balance: user.balance,
    createdAt: user.createdAt.toISOString(),
    updatedAt: user.updatedAt.toISOString(),
  };
}
