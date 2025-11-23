import { describe, expect, it } from "vitest";

import {
  DEFAULT_ERROR_CONFIG,
  ERROR_CONFIGS,
  type ErrorConfig,
} from "./errors";

describe("Error Configurations", () => {
  describe("ERROR_CONFIGS", () => {
    it("should have all required error types", () => {
      const requiredErrorTypes = [
        "missing_flight",
        "flight_not_found",
        "unauthorized",
        "payment_failed",
        "order_not_found",
        "not_found",
      ];

      requiredErrorTypes.forEach(type => {
        expect(ERROR_CONFIGS).toHaveProperty(type);
      });
    });

    it("should have valid config structure for all errors", () => {
      Object.entries(ERROR_CONFIGS).forEach(([_key, config]) => {
        expect(config).toHaveProperty("title");
        expect(config).toHaveProperty("message");
        expect(config).toHaveProperty("actionLabel");
        expect(config).toHaveProperty("actionHref");

        expect(typeof config.title).toBe("string");
        expect(typeof config.message).toBe("string");
        expect(typeof config.actionLabel).toBe("string");
        expect(typeof config.actionHref).toBe("string");

        expect(config.title.length).toBeGreaterThan(0);
        expect(config.message.length).toBeGreaterThan(0);
        expect(config.actionLabel.length).toBeGreaterThan(0);
        expect(config.actionHref).toMatch(/^\//);
      });
    });

    it("should have valid error types", () => {
      const validTypes = ["warning", "error", "info"];

      Object.values(ERROR_CONFIGS).forEach(config => {
        if (config.type) {
          expect(validTypes).toContain(config.type);
        }
      });
    });

    it("should have boolean showBackButton when present", () => {
      Object.values(ERROR_CONFIGS).forEach(config => {
        if ("showBackButton" in config) {
          expect(typeof config.showBackButton).toBe("boolean");
        }
      });
    });
  });

  describe("DEFAULT_ERROR_CONFIG", () => {
    it("should have required properties", () => {
      expect(DEFAULT_ERROR_CONFIG).toHaveProperty("title");
      expect(DEFAULT_ERROR_CONFIG).toHaveProperty("message");
      expect(DEFAULT_ERROR_CONFIG).toHaveProperty("actionLabel");
      expect(DEFAULT_ERROR_CONFIG).toHaveProperty("actionHref");
      expect(DEFAULT_ERROR_CONFIG).toHaveProperty("type");
    });

    it("should have valid values", () => {
      expect(typeof DEFAULT_ERROR_CONFIG.title).toBe("string");
      expect(typeof DEFAULT_ERROR_CONFIG.message).toBe("string");
      expect(typeof DEFAULT_ERROR_CONFIG.actionLabel).toBe("string");
      expect(typeof DEFAULT_ERROR_CONFIG.actionHref).toBe("string");
      expect(DEFAULT_ERROR_CONFIG.actionHref).toBe("/");
    });

    it("should have error type", () => {
      expect(DEFAULT_ERROR_CONFIG.type).toBe("error");
    });
  });

  describe("Flight-related errors", () => {
    it("should have correct configuration for missing_flight", () => {
      const config = ERROR_CONFIGS.missing_flight;
      expect(config.type).toBe("warning");
      expect(config.title).toBe("未选择航班");
      expect(config.actionHref).toBe("/flights");
      expect(config.showBackButton).toBe(true);
    });

    it("should have correct configuration for flight_not_found", () => {
      const config = ERROR_CONFIGS.flight_not_found;
      expect(config.type).toBe("error");
      expect(config.title).toBe("航班不存在");
      expect(config.actionHref).toBe("/flights");
    });
  });

  describe("Payment-related errors", () => {
    it("should have correct configuration for payment_failed", () => {
      const config = ERROR_CONFIGS.payment_failed;
      expect(config.type).toBe("error");
      expect(config.title).toBe("支付失败");
      expect(config.actionHref).toBe("/flights/booking/payment");
      expect(config.showBackButton).toBe(true);
    });

    it("should have correct configuration for insufficient_balance", () => {
      const config = ERROR_CONFIGS.insufficient_balance;
      expect(config.type).toBe("warning");
      expect(config.title).toBe("余额不足");
    });
  });

  describe("Authentication errors", () => {
    it("should have correct configuration for unauthorized", () => {
      const config = ERROR_CONFIGS.unauthorized;
      expect(config.type).toBe("warning");
      expect(config.title).toBe("需要登录");
      expect(config.actionHref).toBe("/auth/sign-in");
    });

    it("should have correct configuration for session_expired", () => {
      const config = ERROR_CONFIGS.session_expired;
      expect(config.type).toBe("warning");
      expect(config.title).toBe("会话已过期");
      expect(config.actionHref).toBe("/auth/sign-in");
    });
  });

  describe("Order-related errors", () => {
    it("should have correct configuration for order_not_found", () => {
      const config = ERROR_CONFIGS.order_not_found;
      expect(config.type).toBe("error");
      expect(config.title).toBe("订单不存在");
      expect(config.actionHref).toBe("/orders");
    });

    it("should have correct configuration for order_expired", () => {
      const config = ERROR_CONFIGS.order_expired;
      expect(config.type).toBe("warning");
      expect(config.title).toBe("订单已过期");
    });
  });

  describe("Type safety", () => {
    it("should satisfy ErrorConfig interface", () => {
      const testConfig: ErrorConfig = {
        title: "测试标题",
        message: "测试消息",
        actionLabel: "测试按钮",
        actionHref: "/test",
        type: "error",
        showBackButton: true,
      };

      expect(testConfig).toBeDefined();
      expect(typeof testConfig.title).toBe("string");
    });
  });
});
