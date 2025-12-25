import {
  createAccountForUser,
  createUser,
} from "@/tests/integration/helpers/factories";
import { describe, expect, it } from "vitest";

import {
  getUserBalance,
  getUserById,
  getUserInfo,
  getUserSecurityStatus,
  rechargeUserBalance,
  updateUserEmail,
  updateUserPhoneNumber,
  updateUserProfile,
} from "./user.repository";

describe("user.repository", () => {
  it("returns masked user info", async () => {
    const user = await createUser({
      email: "user@example.com",
      phoneNumber: "13812345678",
      nickname: "nickname",
      gender: "male",
    });

    const info = await getUserInfo(user.id);

    expect(info.email).toBe("us***@example.com");
    expect(info.phoneNumber).toBe("138****5678");
    expect(info.nickname).toBe("nickname");
  });

  it("computes security status and password flag", async () => {
    const user = await createUser({
      email: "secure@example.com",
      phoneNumber: "13898765432",
      phoneNumberVerified: true,
      emailVerified: true,
    });
    await createAccountForUser(user.id, {
      providerId: "credential",
      accountId: "cred-1",
    });
    await createAccountForUser(user.id, {
      providerId: "github",
      accountId: "gh-1",
    });

    const status = await getUserSecurityStatus(user.id);

    expect(status.hasPassword).toBe(true);
    expect(status.email).toBe("se***@example.com");
    expect(status.phoneNumber).toBe("138****5432");
    expect(status.emailVerified).toBe(true);
    expect(status.phoneNumberVerified).toBe(true);
  });

  it("reads and updates balance information", async () => {
    const user = await createUser({ balance: "123.45" });

    expect(await getUserBalance(user.id)).toBe("123.45");

    const newBalance = await rechargeUserBalance(user.id, 100);
    expect(newBalance).toBe("223.45");
  });

  it("returns null when recharging a missing user", async () => {
    const result = await rechargeUserBalance("missing-user", 10);
    expect(result).toBeNull();
  });

  it("updates profile, phone, and email fields", async () => {
    const user = await createUser({
      nickname: "Old Nick",
      phoneNumber: "13800000000",
      email: "old@example.com",
    });

    await updateUserProfile(user.id, { nickname: "New Nick" });
    await updateUserPhoneNumber(user.id, "13899999999");
    await updateUserEmail(user.id, "new@example.com");

    const updated = await getUserById(user.id);
    expect(updated?.nickname).toBe("New Nick");
    expect(updated?.phoneNumber).toBe("13899999999");
    expect(updated?.email).toBe("new@example.com");
    expect(updated?.emailVerified).toBe(true);
    expect(updated?.phoneNumberVerified).toBe(true);
  });
});
