import {
  createAccountForUser,
  createUser,
} from "@tests/integration/helpers/factories";
import { describe, expect, it } from "vitest";

import {
  deleteAccountById,
  findCredentialAccount,
  getAccountsByUserId,
} from "@/domains/auth/infra/auth.repository";

describe("auth.repository", () => {
  it("returns accounts for user and finds credential account", async () => {
    const user = await createUser();
    const credential = await createAccountForUser(user.id, {
      providerId: "credential",
    });
    await createAccountForUser(user.id, { providerId: "github" });

    const accounts = await getAccountsByUserId(user.id);
    expect(accounts.map(a => a.providerId)).toEqual(
      expect.arrayContaining(["credential", "github"])
    );

    const found = await findCredentialAccount(user.id);
    expect(found?.id).toBe(credential.id);
  });

  it("deletes only the matched account for the user", async () => {
    const user = await createUser({
      id: "auth-user",
      email: "auth@example.com",
    });
    await createUser({ id: "other-user", email: "other@example.com" });
    const account = await createAccountForUser(user.id, {
      providerId: "credential",
    });
    await createAccountForUser("other-user", {
      providerId: "credential",
      accountId: "other",
    });

    await deleteAccountById(account.id, user.id);

    const remaining = await getAccountsByUserId(user.id);
    expect(remaining).toHaveLength(0);
  });
});
