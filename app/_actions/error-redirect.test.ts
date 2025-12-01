import { redirect } from "next/navigation";
import { describe, expect, it, vi } from "vitest";

import { redirectToError } from "./error-redirect";

vi.mock("next/navigation", () => ({
  redirect: vi.fn(),
}));

describe("redirectToError (server)", () => {
  it("calls redirect with correct URL for type only", () => {
    redirectToError("unauthorized");
    expect(redirect).toHaveBeenCalledWith("/error?type=unauthorized");
  });

  it("calls redirect with type and custom message", () => {
    redirectToError("payment_failed", "支付超时");
    expect(redirect).toHaveBeenCalledWith(
      expect.stringContaining("type=payment_failed")
    );
    expect(redirect).toHaveBeenCalledWith(expect.stringContaining("message="));
  });

  it("calls redirect with all parameters", () => {
    redirectToError("server_error", "服务器维护", "暂时无法访问");
    expect(redirect).toHaveBeenCalledWith(
      expect.stringContaining("type=server_error")
    );
    expect(redirect).toHaveBeenCalledWith(expect.stringContaining("message="));
    expect(redirect).toHaveBeenCalledWith(expect.stringContaining("title="));
  });

  it("encodes URL parameters correctly", () => {
    redirectToError("error", "错误：无法连接", "系统错误");

    const lastCall =
      vi.mocked(redirect).mock.calls[
        vi.mocked(redirect).mock.calls.length - 1
      ][0];

    expect(lastCall).toContain("/error?");
    expect(lastCall).toContain("type=error");
    expect(lastCall).not.toContain("错误：");
  });
});
