import { __resetEnvForTests } from "@/config/env";
import { beforeEach, describe, expect, it, vi } from "vitest";

// 小工具：每次测试前都强制重新加载 logger 模块，让它用新的 env
async function importLogger() {
  // 清除 Node 模块缓存
  vi.resetModules();
  // 让 env.ts 内部的 cachedEnv / cachedFeatures 失效
  __resetEnvForTests();
  // 重新导入 logger 模块
  return import("./logger");
}

describe("logger", () => {
  beforeEach(() => {
    // 清掉 Vitest stub 过的 env
    vi.unstubAllEnvs();
    // 确保 env 缓存和模块缓存都是干净的
    __resetEnvForTests();
    vi.resetModules();
  });

  describe("getLogLevel", () => {
    it("should return 'silent' in test environment", async () => {
      vi.stubEnv("NODE_ENV", "test");
      vi.stubEnv("LOG_LEVEL", undefined as any);

      const { getLogLevel } = await importLogger();

      expect(getLogLevel()).toBe("silent");
    });

    it("should use LOG_LEVEL when provided", async () => {
      vi.stubEnv("NODE_ENV", "production");
      vi.stubEnv("LOG_LEVEL", "error");

      const { getLogLevel } = await importLogger();

      expect(getLogLevel()).toBe("error");
    });

    it("should default to 'info' in production when LOG_LEVEL is not set", async () => {
      vi.stubEnv("NODE_ENV", "production");
      vi.stubEnv("LOG_LEVEL", undefined as any);

      const { getLogLevel } = await importLogger();

      expect(getLogLevel()).toBe("info");
    });

    it("should default to 'debug' in non-production when LOG_LEVEL is not set", async () => {
      vi.stubEnv("NODE_ENV", "development");
      vi.stubEnv("LOG_LEVEL", undefined as any);

      const { getLogLevel } = await importLogger();

      expect(getLogLevel()).toBe("debug");
    });
  });
});
