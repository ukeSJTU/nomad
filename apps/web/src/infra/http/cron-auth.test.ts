import { beforeEach, describe, expect, it, vi } from "vitest";

import { createUnauthorizedResponse, verifyCronSecret } from "./cron-auth";

describe("cron-auth", () => {
  const VALID_SECRET = "test-secret-123";

  beforeEach(() => {
    // Reset environment variables before each test
    vi.stubEnv("CRON_SECRET", VALID_SECRET);
  });

  describe("verifyCronSecret", () => {
    it("should return true for valid Bearer token", () => {
      const request = new Request("http://localhost", {
        headers: {
          Authorization: `Bearer ${VALID_SECRET}`,
        },
      });

      expect(verifyCronSecret(request)).toBe(true);
    });

    it("should return false when Authorization header is missing", () => {
      const request = new Request("http://localhost");

      expect(verifyCronSecret(request)).toBe(false);
    });

    it("should return false when Authorization header is not Bearer type", () => {
      const request = new Request("http://localhost", {
        headers: {
          Authorization: `Basic ${VALID_SECRET}`,
        },
      });

      expect(verifyCronSecret(request)).toBe(false);
    });

    it("should return false when token is invalid", () => {
      const request = new Request("http://localhost", {
        headers: {
          Authorization: "Bearer wrong-secret",
        },
      });

      expect(verifyCronSecret(request)).toBe(false);
    });

    it("should return false when token is empty", () => {
      const request = new Request("http://localhost", {
        headers: {
          Authorization: "Bearer ",
        },
      });

      expect(verifyCronSecret(request)).toBe(false);
    });

    it("should return false when CRON_SECRET is not set", () => {
      vi.stubEnv("CRON_SECRET", undefined);

      const request = new Request("http://localhost", {
        headers: {
          Authorization: `Bearer ${VALID_SECRET}`,
        },
      });

      expect(verifyCronSecret(request)).toBe(false);
    });

    it("should handle tokens with different lengths", () => {
      const request = new Request("http://localhost", {
        headers: {
          Authorization: "Bearer short",
        },
      });

      expect(verifyCronSecret(request)).toBe(false);
    });

    it("should be case-sensitive", () => {
      const request = new Request("http://localhost", {
        headers: {
          Authorization: `Bearer ${VALID_SECRET.toUpperCase()}`,
        },
      });

      expect(verifyCronSecret(request)).toBe(false);
    });
  });

  describe("createUnauthorizedResponse", () => {
    it("should return 401 status", async () => {
      const response = createUnauthorizedResponse();

      expect(response.status).toBe(401);
    });

    it("should include WWW-Authenticate header", () => {
      const response = createUnauthorizedResponse();

      expect(response.headers.get("WWW-Authenticate")).toBe(
        'Bearer realm="Cron Jobs"'
      );
    });

    it("should return JSON error response", async () => {
      const response = createUnauthorizedResponse();
      const body = await response.json();

      expect(body).toEqual({
        success: false,
        error: "Unauthorized",
        message: "Invalid or missing authentication token",
      });
    });
  });
});
