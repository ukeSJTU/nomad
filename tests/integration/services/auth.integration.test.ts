import {
  accountFactory,
  githubAccountFactory,
  googleAccountFactory,
  userFactory,
} from "@tests/factories";
import { clearDatabase } from "@tests/helpers/db";
import { beforeEach, describe, expect, it } from "vitest";

import { db } from "@/lib/db";
import { account, user } from "@/lib/schema";
import { unlinkSocialAccount } from "@/lib/services/auth";

describe("unlinkSocialAccount Integration Test", () => {
  beforeEach(async () => {
    // Clear all test data before each test
    await clearDatabase();
  });

  describe("Basic functionality", () => {
    it("should successfully unlink a social account when user has multiple accounts", async () => {
      // Arrange: Create a user with 2 accounts (GitHub and Google)
      const testUser = userFactory.build({
        id: "user-test-1",
        email: "test@test.com",
      });
      await db.insert(user).values(testUser);

      const githubAccount = githubAccountFactory.build({
        userId: testUser.id,
        accountId: "github-user-123",
      });
      const googleAccount = googleAccountFactory.build({
        userId: testUser.id,
        accountId: "user@gmail.com",
      });

      await db.insert(account).values([githubAccount, googleAccount]);

      // Act: Unlink GitHub account
      const result = await unlinkSocialAccount(testUser.id, "github");

      // Assert: Should succeed
      expect(result.success).toBe(true);
      expect(result.message).toContain("Successfully unlinked github account");

      // Verify: GitHub account should be deleted
      const remainingAccounts = await db.query.account.findMany({
        where: (accounts, { eq }) => eq(accounts.userId, testUser.id),
      });
      expect(remainingAccounts).toHaveLength(1);
      expect(remainingAccounts[0].providerId).toBe("google");
    });

    it("should prevent unlinking the last account", async () => {
      // Arrange: Create a user with only 1 account
      const testUser = userFactory.build({
        id: "user-test-2",
        email: "test2@test.com",
      });
      await db.insert(user).values(testUser);

      const githubAccount = githubAccountFactory.build({
        userId: testUser.id,
      });
      await db.insert(account).values(githubAccount);

      // Act: Try to unlink the only account
      const result = await unlinkSocialAccount(testUser.id, "github");

      // Assert: Should fail with appropriate error
      expect(result.success).toBe(false);
      expect(result.error).toContain("Cannot unlink your only account");

      // Verify: Account should still exist
      const remainingAccounts = await db.query.account.findMany({
        where: (accounts, { eq }) => eq(accounts.userId, testUser.id),
      });
      expect(remainingAccounts).toHaveLength(1);
    });

    it("should return error when account not found", async () => {
      // Arrange: Create a user with 2 accounts (GitHub and Google)
      const testUser = userFactory.build({
        id: "user-test-3",
        email: "test3@test.com",
      });
      await db.insert(user).values(testUser);

      const githubAccount = githubAccountFactory.build({
        userId: testUser.id,
      });
      const googleAccount = googleAccountFactory.build({
        userId: testUser.id,
      });
      await db.insert(account).values([githubAccount, googleAccount]);

      // Act: Try to unlink a non-existent Twitter account
      const result = await unlinkSocialAccount(testUser.id, "twitter");

      // Assert: Should fail
      expect(result.success).toBe(false);
      expect(result.error).toContain("Account not found");
    });
  });

  describe("Race condition protection", () => {
    it("should prevent race condition when unlinking accounts concurrently", async () => {
      // Arrange: Create a user with exactly 2 accounts
      const testUser = userFactory.build({
        id: "user-race-test",
        email: "race@test.com",
      });
      await db.insert(user).values(testUser);

      const githubAccount = githubAccountFactory.build({
        id: "github-account-1",
        userId: testUser.id,
        accountId: "github-user",
      });
      const googleAccount = googleAccountFactory.build({
        id: "google-account-1",
        userId: testUser.id,
        accountId: "user@gmail.com",
      });

      await db.insert(account).values([githubAccount, googleAccount]);

      // Act: Simulate concurrent unlink requests
      // With transaction protection, only ONE should succeed
      const [result1, result2] = await Promise.all([
        unlinkSocialAccount(testUser.id, "github"),
        unlinkSocialAccount(testUser.id, "google"),
      ]);

      // Assert: Only ONE operation should succeed
      const successCount = [result1, result2].filter(r => r.success).length;
      expect(successCount).toBe(1);

      // Verify: User still has at least 1 account (NOT locked out!)
      const remainingAccounts = await db.query.account.findMany({
        where: (accounts, { eq }) => eq(accounts.userId, testUser.id),
      });

      expect(remainingAccounts.length).toBeGreaterThanOrEqual(1);
    });

    it("should prevent race condition with 3 concurrent requests", async () => {
      // Arrange: Create a user with 3 accounts
      const testUser = userFactory.build({
        id: "user-race-test-2",
        email: "race2@test.com",
      });
      await db.insert(user).values(testUser);

      const accounts = [
        githubAccountFactory.build({
          id: "github-account-2",
          userId: testUser.id,
        }),
        googleAccountFactory.build({
          id: "google-account-2",
          userId: testUser.id,
        }),
        accountFactory.build({
          id: "twitter-account-2",
          userId: testUser.id,
          providerId: "twitter",
          accountId: "twitter-user",
        }),
      ];

      await db.insert(account).values(accounts);

      // Act: Try to unlink all 3 accounts concurrently
      // With transaction protection, at most 2 should succeed
      const results = await Promise.all([
        unlinkSocialAccount(testUser.id, "github"),
        unlinkSocialAccount(testUser.id, "google"),
        unlinkSocialAccount(testUser.id, "twitter"),
      ]);

      // Count successful operations
      const successCount = results.filter(r => r.success).length;

      // Verify: User should have at least 1 account remaining
      const remainingAccounts = await db.query.account.findMany({
        where: (accounts, { eq }) => eq(accounts.userId, testUser.id),
      });

      // Assert: User should still have at least 1 account
      expect(remainingAccounts.length).toBeGreaterThanOrEqual(1);
      // Assert: At most 2 operations should succeed (can't delete all 3)
      expect(successCount).toBeLessThanOrEqual(2);
    });
  });

  describe("Edge cases", () => {
    it("should handle multiple accounts of the same provider", async () => {
      // Arrange: Create a user with 2 GitHub accounts (edge case)
      const testUser = userFactory.build({
        id: "user-test-4",
        email: "test4@test.com",
      });
      await db.insert(user).values(testUser);

      const githubAccount1 = githubAccountFactory.build({
        id: "github-1",
        userId: testUser.id,
        accountId: "github-user-1",
      });
      const githubAccount2 = githubAccountFactory.build({
        id: "github-2",
        userId: testUser.id,
        accountId: "github-user-2",
      });

      await db.insert(account).values([githubAccount1, githubAccount2]);

      // Act: Unlink GitHub (should unlink the first one found)
      const result = await unlinkSocialAccount(testUser.id, "github");

      // Assert: Should succeed
      expect(result.success).toBe(true);

      // Verify: Should still have 1 GitHub account
      const remainingAccounts = await db.query.account.findMany({
        where: (accounts, { eq }) => eq(accounts.userId, testUser.id),
      });
      expect(remainingAccounts).toHaveLength(1);
      expect(remainingAccounts[0].providerId).toBe("github");
    });
  });
});
