import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("./user.repository", () => ({
  updateUserProfile: vi.fn(),
  rechargeUserBalance: vi.fn(),
  updateUserPhoneNumber: vi.fn(),
  updateUserEmail: vi.fn(),
}));

import {
  rechargeUserBalance as rechargeUserBalanceRepo,
  updateUserEmail as updateUserEmailRepo,
  updateUserPhoneNumber as updateUserPhoneNumberRepo,
  updateUserProfile as updateUserProfileRepo,
} from "./user.repository";
import {
  rechargeBalance,
  updateUserEmail,
  updateUserInfo,
  updateUserPhoneNumber,
} from "./user.service";

const mockUpdateUserProfile = vi.mocked(updateUserProfileRepo);
const mockRechargeUserBalance = vi.mocked(rechargeUserBalanceRepo);
const mockUpdateUserPhoneNumber = vi.mocked(updateUserPhoneNumberRepo);
const mockUpdateUserEmail = vi.mocked(updateUserEmailRepo);

describe("user.service", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("builds update payload while clearing empty optional fields", async () => {
    const result = await updateUserInfo("user-1", {
      nickname: "",
      name: "",
      gender: "female",
      birthday: "",
    });

    expect(mockUpdateUserProfile).toHaveBeenCalledTimes(1);
    const [, payload] = mockUpdateUserProfile.mock.calls[0] ?? [];
    expect(payload).toMatchObject({
      nickname: null,
      gender: "female",
      birthday: null,
    });
    expect(payload?.updatedAt).toBeInstanceOf(Date);
    expect(payload).not.toHaveProperty("name");
    expect(result).toEqual({
      success: true,
      message: "User information updated successfully",
    });
  });

  it("returns failure when profile update throws", async () => {
    mockUpdateUserProfile.mockRejectedValueOnce(new Error("db down"));

    const result = await updateUserInfo("user-2", { nickname: "Alice" });

    expect(mockUpdateUserProfile).toHaveBeenCalledWith("user-2", {
      nickname: "Alice",
      updatedAt: expect.any(Date),
    });
    expect(result).toEqual({
      success: false,
      error: "db down",
    });
  });

  it("rounds amounts and returns balance on successful recharge", async () => {
    mockRechargeUserBalance.mockResolvedValueOnce("110.00");

    const result = await rechargeBalance("user-3", 10.129);

    expect(mockRechargeUserBalance).toHaveBeenCalledWith("user-3", 10.13);
    expect(result).toEqual({
      success: true,
      message: "充值成功",
      data: {
        newBalance: "110.00",
      },
    });
  });

  it.each([
    0, 10001,
  ])("rejects recharge amounts outside allowed range (%s)", async amount => {
    const result = await rechargeBalance("user-4", amount);

    expect(result).toEqual({
      success: false,
      error: "充值金额必须在 1 到 10000 元之间",
    });
    expect(mockRechargeUserBalance).not.toHaveBeenCalled();
  });

  it("returns error when user is missing during recharge", async () => {
    mockRechargeUserBalance.mockResolvedValueOnce(null);

    const result = await rechargeBalance("missing-user", 50);

    expect(result).toEqual({
      success: false,
      error: "用户不存在",
    });
  });

  it("surfaces repository errors when recharge fails", async () => {
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    mockRechargeUserBalance.mockRejectedValueOnce(new Error("tx failed"));

    const result = await rechargeBalance("user-5", 99);

    expect(result).toEqual({
      success: false,
      error: "tx failed",
    });
    consoleSpy.mockRestore();
  });

  it("delegates phone number update to repository", async () => {
    await updateUserPhoneNumber("user-6", "13812345678");

    expect(mockUpdateUserPhoneNumber).toHaveBeenCalledWith(
      "user-6",
      "13812345678"
    );
  });

  it("delegates email update to repository", async () => {
    await updateUserEmail("user-7", "user@example.com");

    expect(mockUpdateUserEmail).toHaveBeenCalledWith(
      "user-7",
      "user@example.com"
    );
  });
});
