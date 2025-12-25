import { describe, expect, it } from "vitest";
import { z } from "zod";

import {
  createPaginatedResponseSchema,
  createSuccessResponseSchema,
  errorResponseSchema,
  messageResponseSchema,
  paginationQuerySchema,
  responseMetaSchema,
  successMessageResponseSchema,
} from "./response";

describe("Response Meta Schema", () => {
  it("should validate correct response metadata", () => {
    const validData = {
      timestamp: "2024-01-15T10:30:00Z",
      requestId: "req-123456",
    };

    const result = responseMetaSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it("should reject invalid datetime format", () => {
    const invalidData = {
      timestamp: "2024-01-15 10:30:00",
      requestId: "req-123456",
    };

    const result = responseMetaSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });
});

describe("Error Response Schema", () => {
  it("should validate error response without details", () => {
    const validData = {
      success: false,
      error: {
        code: "NOT_FOUND",
        message: "Resource not found",
      },
      meta: {
        timestamp: "2024-01-15T10:30:00Z",
        requestId: "req-123456",
      },
    };

    const result = errorResponseSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it("should validate error response with validation details", () => {
    const validData = {
      success: false,
      error: {
        code: "VALIDATION_ERROR",
        message: "Validation failed",
        details: [
          { field: "email", message: "Invalid email format" },
          { field: "password", message: "Password too short" },
        ],
      },
      meta: {
        timestamp: "2024-01-15T10:30:00Z",
        requestId: "req-123456",
      },
    };

    const result = errorResponseSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });
});

describe("Success Response Schema Factory", () => {
  it("should create and validate success response with custom data", () => {
    const userSchema = z.object({
      id: z.string(),
      name: z.string(),
    });

    const userResponseSchema = createSuccessResponseSchema(userSchema);

    const validData = {
      success: true,
      data: {
        id: "user-123",
        name: "John Doe",
      },
      meta: {
        timestamp: "2024-01-15T10:30:00Z",
        requestId: "req-123456",
      },
    };

    const result = userResponseSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });
});

describe("Paginated Response Schema Factory", () => {
  it("should create and validate paginated response", () => {
    const itemSchema = z.object({
      id: z.string(),
      name: z.string(),
    });

    const paginatedSchema = createPaginatedResponseSchema(itemSchema);

    const validData = {
      success: true,
      data: {
        items: [
          { id: "1", name: "Item 1" },
          { id: "2", name: "Item 2" },
        ],
        pagination: {
          page: 1,
          pageSize: 20,
          totalPages: 5,
          totalItems: 100,
        },
      },
      meta: {
        timestamp: "2024-01-15T10:30:00Z",
        requestId: "req-123456",
      },
    };

    const result = paginatedSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it("should reject invalid pagination metadata", () => {
    const itemSchema = z.object({ id: z.string() });
    const paginatedSchema = createPaginatedResponseSchema(itemSchema);

    const invalidData = {
      success: true,
      data: {
        items: [],
        pagination: {
          page: 0, // Invalid: must be positive
          pageSize: 20,
          totalPages: 0,
          totalItems: 0,
        },
      },
      meta: {
        timestamp: "2024-01-15T10:30:00Z",
        requestId: "req-123456",
      },
    };

    const result = paginatedSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });
});

describe("Pagination Query Schema", () => {
  it("should validate with default values", () => {
    const result = paginationQuerySchema.safeParse({});
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.page).toBe(1);
      expect(result.data.pageSize).toBe(20);
    }
  });

  it("should coerce string values to numbers", () => {
    const result = paginationQuerySchema.safeParse({
      page: "2",
      pageSize: "50",
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.page).toBe(2);
      expect(result.data.pageSize).toBe(50);
    }
  });

  it("should reject page size exceeding 100", () => {
    const result = paginationQuerySchema.safeParse({
      pageSize: 101,
    });
    expect(result.success).toBe(false);
  });

  it("should reject negative page number", () => {
    const result = paginationQuerySchema.safeParse({
      page: -1,
    });
    expect(result.success).toBe(false);
  });

  it("should reject zero page number", () => {
    const result = paginationQuerySchema.safeParse({
      page: 0,
    });
    expect(result.success).toBe(false);
  });
});

describe("Message Response Schema", () => {
  it("should validate simple message response", () => {
    const validData = {
      message: "Operation completed successfully",
    };

    const result = messageResponseSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });
});

describe("Success Message Response Schema", () => {
  it("should validate complete success message response", () => {
    const validData = {
      success: true,
      data: {
        message: "User deleted successfully",
      },
      meta: {
        timestamp: "2024-01-15T10:30:00Z",
        requestId: "req-123456",
      },
    };

    const result = successMessageResponseSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });
});
