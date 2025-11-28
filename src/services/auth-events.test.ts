import { describe, expect, it, vi } from "vitest";

import { emitAuthEvent, onAuthEvent } from "./auth-events";

describe("auth-events", () => {
  it("invokes registered handlers with payload", async () => {
    const handler = vi.fn();
    const unsubscribe = onAuthEvent("emailUpdated", handler);

    const payload = { userId: "user-1", email: "test@example.com" };
    emitAuthEvent("emailUpdated", payload);

    await Promise.resolve();

    expect(handler).toHaveBeenCalledWith(payload);
    unsubscribe();
  });

  it("swallows handler errors without throwing", async () => {
    const handler = vi.fn().mockImplementation(() => {
      throw new Error("boom");
    });
    const unsubscribe = onAuthEvent("phoneNumberUpdated", handler);

    const payload = {
      userId: "user-2",
      phoneNumber: "+8613812345678",
      userEmail: "notify@example.com",
    };

    expect(() => emitAuthEvent("phoneNumberUpdated", payload)).not.toThrow();
    await Promise.resolve();
    expect(handler).toHaveBeenCalledWith(payload);

    unsubscribe();
  });
});
