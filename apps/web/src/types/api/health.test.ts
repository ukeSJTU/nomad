import { describe, expect, it } from "vitest";

import { healthDataSchema, healthResponseSchema } from "./health";

describe("Health Data Schema", () => {
  it("should validate correct health data", () => {
    const validData = {
      status: "ok",
      timestamp: "2024-01-15T10:30:00Z",
      uptime: 3600,
      message: "Service is healthy",
    };

    const result = healthDataSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it("should reject invalid status", () => {
    const invalidData = {
      status: "error",
      timestamp: "2024-01-15T10:30:00Z",
      uptime: 3600,
      message: "Service is healthy",
    };

    const result = healthDataSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });

  it("should reject negative uptime", () => {
    const invalidData = {
      status: "ok",
      timestamp: "2024-01-15T10:30:00Z",
      uptime: -100,
      message: "Service is healthy",
    };

    const result = healthDataSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });

  it("should accept zero uptime", () => {
    const validData = {
      status: "ok",
      timestamp: "2024-01-15T10:30:00Z",
      uptime: 0,
      message: "Service just started",
    };

    const result = healthDataSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });
});

describe("Health Response Schema", () => {
  it("should validate complete health response", () => {
    const validData = {
      success: true,
      data: {
        status: "ok",
        timestamp: "2024-01-15T10:30:00Z",
        uptime: 3600,
        message: "Service is healthy",
      },
      meta: {
        timestamp: "2024-01-15T10:30:00Z",
        requestId: "req-123456",
      },
    };

    const result = healthResponseSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it("should reject when success is false", () => {
    const invalidData = {
      success: false,
      data: {
        status: "ok",
        timestamp: "2024-01-15T10:30:00Z",
        uptime: 3600,
        message: "Service is healthy",
      },
      meta: {
        timestamp: "2024-01-15T10:30:00Z",
        requestId: "req-123456",
      },
    };

    const result = healthResponseSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });
});
