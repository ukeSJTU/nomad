import {
  __resetEnvForTests,
  isDevelopment,
  isProduction,
  isTest,
} from "@/config/env"; // 如果路径不是这个，按你项目实际改
import { beforeEach, describe, expect, it, vi } from "vitest";

beforeEach(() => {
  vi.unstubAllEnvs();
  __resetEnvForTests();
});

describe("Environment utility functions", () => {
  describe("isProduction", () => {
    it("should return true when NODE_ENV is production", () => {
      vi.stubEnv("NODE_ENV", "production");
      expect(isProduction()).toBe(true);
    });

    it("should return false when NODE_ENV is development", () => {
      vi.stubEnv("NODE_ENV", "development");
      expect(isProduction()).toBe(false);
    });

    it("should return false when NODE_ENV is test", () => {
      vi.stubEnv("NODE_ENV", "test");
      expect(isProduction()).toBe(false);
    });

    it("should return false when NODE_ENV is undefined", () => {
      vi.stubEnv("NODE_ENV", undefined as any);
      expect(isProduction()).toBe(false);
    });

    it("should return false when NODE_ENV is empty string", () => {
      vi.stubEnv("NODE_ENV", "");
      expect(isProduction()).toBe(false);
    });
  });

  describe("isDevelopment", () => {
    it("should return true when NODE_ENV is development", () => {
      vi.stubEnv("NODE_ENV", "development");
      expect(isDevelopment()).toBe(true);
    });

    it("should return false when NODE_ENV is production", () => {
      vi.stubEnv("NODE_ENV", "production");
      expect(isDevelopment()).toBe(false);
    });

    it("should return false when NODE_ENV is test", () => {
      vi.stubEnv("NODE_ENV", "test");
      expect(isDevelopment()).toBe(false);
    });

    it("should return false when NODE_ENV is undefined", () => {
      vi.stubEnv("NODE_ENV", undefined as any);
      expect(isDevelopment()).toBe(false);
    });

    it("should return false when NODE_ENV is empty string", () => {
      vi.stubEnv("NODE_ENV", "");
      expect(isDevelopment()).toBe(false);
    });
  });

  describe("isTest", () => {
    it("should return true when NODE_ENV is test", () => {
      vi.stubEnv("NODE_ENV", "test");
      expect(isTest()).toBe(true);
    });

    it("should return false when NODE_ENV is development", () => {
      vi.stubEnv("NODE_ENV", "development");
      expect(isTest()).toBe(false);
    });

    it("should return false when NODE_ENV is production", () => {
      vi.stubEnv("NODE_ENV", "production");
      expect(isTest()).toBe(false);
    });

    it("should return false when NODE_ENV is undefined", () => {
      vi.stubEnv("NODE_ENV", undefined as any);
      expect(isTest()).toBe(false);
    });

    it("should return false when NODE_ENV is empty string", () => {
      vi.stubEnv("NODE_ENV", "");
      expect(isTest()).toBe(false);
    });
  });

  describe("Environment functions integration", () => {
    it("should only have one environment true at a time for production", () => {
      vi.stubEnv("NODE_ENV", "production");
      expect(isProduction()).toBe(true);
      expect(isDevelopment()).toBe(false);
      expect(isTest()).toBe(false);
    });

    it("should only have one environment true at a time for development", () => {
      vi.stubEnv("NODE_ENV", "development");
      expect(isProduction()).toBe(false);
      expect(isDevelopment()).toBe(true);
      expect(isTest()).toBe(false);
    });

    it("should only have one environment true at a time for test", () => {
      vi.stubEnv("NODE_ENV", "test");
      expect(isProduction()).toBe(false);
      expect(isDevelopment()).toBe(false);
      expect(isTest()).toBe(true);
    });

    it("should all return false for unknown environment", () => {
      vi.stubEnv("NODE_ENV", "staging" as any);
      expect(isProduction()).toBe(false);
      expect(isDevelopment()).toBe(false);
      expect(isTest()).toBe(false);
    });
  });
});
