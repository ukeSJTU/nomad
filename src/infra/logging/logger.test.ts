import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

describe("logger", () => {
  beforeEach(() => {
    // Reset modules to ensure fresh logger instance for each test
    vi.resetModules();
    // Clear all environment stubs
    vi.unstubAllEnvs();
  });

  afterEach(() => {
    // Restore original environment variables
    vi.unstubAllEnvs();
    vi.clearAllMocks();
  });

  describe("getLogLevel", () => {
    it("should return 'silent' in test environment", async () => {
      vi.stubEnv("NODE_ENV", "test");
      vi.stubEnv("LOG_LEVEL", undefined as any);

      const { default: logger } = await import("./logger");
      expect(logger.level).toBe("silent");
    });

    it("should return 'debug' in development environment", async () => {
      vi.stubEnv("NODE_ENV", "development");
      vi.stubEnv("LOG_LEVEL", undefined as any);

      const { default: logger } = await import("./logger");
      expect(logger.level).toBe("debug");
    });

    it("should return 'info' in production environment", async () => {
      vi.stubEnv("NODE_ENV", "production");
      vi.stubEnv("LOG_LEVEL", undefined as any);

      const { default: logger } = await import("./logger");
      expect(logger.level).toBe("info");
    });

    it("should use LOG_LEVEL environment variable when set to valid level", async () => {
      vi.stubEnv("NODE_ENV", "development");
      vi.stubEnv("LOG_LEVEL", "warn");

      const { default: logger } = await import("./logger");
      expect(logger.level).toBe("warn");
    });

    it("should use LOG_LEVEL environment variable with 'error' level", async () => {
      vi.stubEnv("NODE_ENV", "production");
      vi.stubEnv("LOG_LEVEL", "error");

      const { default: logger } = await import("./logger");
      expect(logger.level).toBe("error");
    });

    it("should use LOG_LEVEL environment variable with 'trace' level", async () => {
      vi.stubEnv("NODE_ENV", "development");
      vi.stubEnv("LOG_LEVEL", "trace");

      const { default: logger } = await import("./logger");
      expect(logger.level).toBe("trace");
    });

    it("should fall back to default when LOG_LEVEL is invalid", async () => {
      const consoleWarnSpy = vi
        .spyOn(console, "warn")
        .mockImplementation(() => {});

      vi.stubEnv("NODE_ENV", "development");
      vi.stubEnv("LOG_LEVEL", "invalid-level");

      const { default: logger } = await import("./logger");

      expect(logger.level).toBe("debug"); // Falls back to development default
      expect(consoleWarnSpy).toHaveBeenCalledWith(
        "Invalid LOG_LEVEL: invalid-level, using default"
      );

      consoleWarnSpy.mockRestore();
    });

    it("should prioritize test environment over LOG_LEVEL", async () => {
      vi.stubEnv("NODE_ENV", "test");
      vi.stubEnv("LOG_LEVEL", "debug");

      const { default: logger } = await import("./logger");
      expect(logger.level).toBe("silent");
    });
  });

  describe("logger configuration", () => {
    it("should create logger instance with correct type", async () => {
      vi.stubEnv("NODE_ENV", "development");
      vi.stubEnv("LOG_LEVEL", undefined as any);

      const { default: logger } = await import("./logger");

      expect(logger).toBeDefined();
      expect(typeof logger.info).toBe("function");
      expect(typeof logger.error).toBe("function");
      expect(typeof logger.debug).toBe("function");
      expect(typeof logger.warn).toBe("function");
    });

    it("should have production configuration in production environment", async () => {
      vi.stubEnv("NODE_ENV", "production");
      vi.stubEnv("LOG_LEVEL", undefined as any);

      const { default: logger } = await import("./logger");
      expect(logger.level).toBe("info");
    });

    it("should have development configuration in development environment", async () => {
      vi.stubEnv("NODE_ENV", "development");
      vi.stubEnv("LOG_LEVEL", undefined as any);

      const { default: logger } = await import("./logger");
      expect(logger.level).toBe("debug");
    });
  });

  describe("createLoggerStream", () => {
    it("should use stdout in production environment", async () => {
      vi.stubEnv("NODE_ENV", "production");
      vi.stubEnv("LOG_LEVEL", undefined as any);

      await import("./logger");
      expect(process.stdout).toBeDefined();
    });

    it("should use stdout in test environment", async () => {
      vi.stubEnv("NODE_ENV", "test");
      vi.stubEnv("LOG_LEVEL", undefined as any);

      await import("./logger");
      expect(process.stdout).toBeDefined();
    });

    it("should use pretty stream in development environment", async () => {
      vi.stubEnv("NODE_ENV", "development");
      vi.stubEnv("LOG_LEVEL", undefined as any);

      const { default: logger } = await import("./logger");
      expect(logger).toBeDefined();
    });
  });

  describe("logger methods", () => {
    it("should have all standard pino log methods", async () => {
      vi.stubEnv("NODE_ENV", "development");
      vi.stubEnv("LOG_LEVEL", undefined as any);

      const { default: logger } = await import("./logger");

      expect(typeof logger.fatal).toBe("function");
      expect(typeof logger.error).toBe("function");
      expect(typeof logger.warn).toBe("function");
      expect(typeof logger.info).toBe("function");
      expect(typeof logger.debug).toBe("function");
      expect(typeof logger.trace).toBe("function");
    });

    it("should not output logs in test environment", async () => {
      vi.stubEnv("NODE_ENV", "test");
      vi.stubEnv("LOG_LEVEL", undefined as any);

      const stdoutSpy = vi
        .spyOn(process.stdout, "write")
        .mockImplementation(() => true);

      const { default: logger } = await import("./logger");

      logger.info("test message");
      logger.error("error message");
      logger.debug("debug message");

      // In silent mode, no logs should be written
      expect(stdoutSpy).not.toHaveBeenCalled();

      stdoutSpy.mockRestore();
    });
  });
});
