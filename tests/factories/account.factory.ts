import type { InferInsertModel } from "drizzle-orm";
import { Factory } from "fishery";

import type { account } from "@/lib/schema";

/**
 * Account type based on Better Auth schema
 */
type Account = InferInsertModel<typeof account>;

/**
 * Factory for creating test social accounts
 *
 * Usage:
 * - accountFactory.build() - Create an account object (not inserted to DB)
 * - accountFactory.build({ providerId: 'google' }) - Override specific fields
 */
export const accountFactory = Factory.define<Account>(({ sequence }) => ({
  id: `account-${sequence}`,
  accountId: `account-id-${sequence}`,
  providerId: "github",
  userId: `user-${sequence}`,
  accessToken: `access-token-${sequence}`,
  refreshToken: `refresh-token-${sequence}`,
  idToken: null,
  accessTokenExpiresAt: null,
  refreshTokenExpiresAt: null,
  scope: null,
  password: null,
  createdAt: new Date(),
  updatedAt: new Date(),
}));

/**
 * Factory for creating GitHub accounts
 */
export const githubAccountFactory = accountFactory.params({
  providerId: "github",
  accountId: "github-user",
});

/**
 * Factory for creating Google accounts
 */
export const googleAccountFactory = accountFactory.params({
  providerId: "google",
  accountId: "user@gmail.com",
});

/**
 * Factory for creating credential (password) accounts
 */
export const credentialAccountFactory = accountFactory.params({
  providerId: "credential",
  accountId: "credential",
  accessToken: null,
  refreshToken: null,
  password: "hashed-password",
});
