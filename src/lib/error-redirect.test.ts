import { redirect } from "next/navigation";
import { describe, expect, it, vi } from "vitest";

import { getErrorUrl, redirectToError } from "./error-redirect";

// Mock Next.js redirect
vi.mock("next/navigation", () => ({
  redirect: vi.fn(),
}));

describe("Error Redirect Utilities", () => {
  describe("getErrorUrl", () => {
    it("should generate URL with only type parameter", () => {
      const url = getErrorUrl("missing_flight");
      expect(url).toBe("/error?type=missing_flight");
    });

    it("should generate URL with type and custom message", () => {
      const url = getErrorUrl("flight_not_found", "航班已取消");
      expect(url).toBe(
        "/error?type=flight_not_found&message=%E8%88%AA%E7%8F%AD%E5%B7%B2%E5%8F%96%E6%B6%88"
      );
    });

    it("should generate URL with type, message and title", () => {
      const url = getErrorUrl("custom_error", "自定义消息", "自定义标题");
      expect(url).toContain("type=custom_error");
      expect(url).toContain("message=");
      expect(url).toContain("title=");
    });

    it("should properly encode special characters", () => {
      const url = getErrorUrl("error", "包含空格 和 & 符号");
      expect(url).toContain("message=");
      expect(url).not.toContain(" ");
      expect(url).not.toContain("&message=包含空格");
    });

    it("should handle empty strings", () => {
      const url = getErrorUrl("");
      expect(url).toBe("/error?type=");
    });
  });

  describe("redirectToError", () => {
    it("should call redirect with correct URL for type only", () => {
      try {
        redirectToError("unauthorized");
      } catch {
        // redirect throws, which is expected
      }
      expect(redirect).toHaveBeenCalledWith("/error?type=unauthorized");
    });

    it("should call redirect with type and custom message", () => {
      try {
        redirectToError("payment_failed", "支付超时");
      } catch {
        // redirect throws, which is expected
      }
      expect(redirect).toHaveBeenCalledWith(
        expect.stringContaining("type=payment_failed")
      );
      expect(redirect).toHaveBeenCalledWith(
        expect.stringContaining("message=")
      );
    });

    it("should call redirect with all parameters", () => {
      try {
        redirectToError("server_error", "服务器维护", "暂时无法访问");
      } catch {
        // redirect throws, which is expected
      }
      expect(redirect).toHaveBeenCalledWith(
        expect.stringContaining("type=server_error")
      );
      expect(redirect).toHaveBeenCalledWith(
        expect.stringContaining("message=")
      );
      expect(redirect).toHaveBeenCalledWith(expect.stringContaining("title="));
    });

    it("should encode URL parameters correctly", () => {
      try {
        redirectToError("error", "错误：无法连接", "系统错误");
      } catch {
        // redirect throws, which is expected
      }

      const lastCall =
        vi.mocked(redirect).mock.calls[
          vi.mocked(redirect).mock.calls.length - 1
        ][0];

      expect(lastCall).toContain("/error?");
      expect(lastCall).toContain("type=error");
      // URL should be encoded
      expect(lastCall).not.toContain("错误：");
    });
  });

  describe("Integration with ERROR_CONFIGS", () => {
    it("should generate valid URLs for all predefined error types", () => {
      const errorTypes = [
        "missing_flight",
        "flight_not_found",
        "unauthorized",
        "payment_failed",
        "order_not_found",
      ];

      errorTypes.forEach(type => {
        const url = getErrorUrl(type);
        expect(url).toBe(`/error?type=${type}`);
        expect(url).toMatch(/^\/error\?type=\w+/);
      });
    });
  });

  describe("Edge cases", () => {
    it("should handle very long messages", () => {
      const longMessage = "a".repeat(1000);
      const url = getErrorUrl("error", longMessage);
      expect(url).toContain("/error?type=error&message=");
      expect(url.length).toBeGreaterThan(100);
    });

    it("should handle special characters in all parameters", () => {
      const url = getErrorUrl("测试", "消息<>&", "标题?#");
      expect(url).toBeTruthy();
      expect(url).toContain("/error?");
    });

    it("should handle undefined optional parameters", () => {
      const url = getErrorUrl("error", undefined, undefined);
      expect(url).toBe("/error?type=error");
    });
  });
});
