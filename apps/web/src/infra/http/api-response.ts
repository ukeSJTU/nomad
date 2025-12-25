import "server-only";

import { nanoid } from "nanoid";
import { NextResponse } from "next/server";

import type {
  ErrorDetail,
  ErrorResponse,
  PaginatedResponse,
  PaginationMeta,
  ResponseMeta,
  SuccessResponse,
} from "@/types/api";

/**
 * API Response Utility Class
 *
 * Provides standardized methods for creating API responses with:
 * - Automatic requestId generation
 * - Automatic timestamp generation
 * - Consistent response format
 * - Type safety
 * - Support for custom requestId (for request chain tracking)
 */
export class ApiResponse {
  /**
   * Generate response metadata
   */
  private static generateMeta(customRequestId?: string): ResponseMeta {
    return {
      timestamp: new Date().toISOString(),
      requestId: customRequestId || `req_${nanoid(16)}`,
    };
  }

  /**
   * Create a success response
   */
  static success<T>(
    data: T,
    status: number = 200,
    options?: { requestId?: string }
  ): NextResponse<SuccessResponse<T>> {
    const response: SuccessResponse<T> = {
      success: true,
      data,
      meta: this.generateMeta(options?.requestId),
    };

    return NextResponse.json(response, { status });
  }

  /**
   * Create an error response
   */
  static error(
    code: string,
    message: string,
    status: number = 500,
    options?: { requestId?: string; details?: ErrorDetail[] }
  ): NextResponse<ErrorResponse> {
    const response: ErrorResponse = {
      success: false,
      error: {
        code,
        message,
        ...(options?.details && { details: options.details }),
      },
      meta: this.generateMeta(options?.requestId),
    };

    return NextResponse.json(response, { status });
  }

  /**
   * Create a paginated response
   */
  static paginated<T>(
    items: T[],
    pagination: PaginationMeta,
    status: number = 200,
    options?: { requestId?: string }
  ): NextResponse<PaginatedResponse<T>> {
    const response: PaginatedResponse<T> = {
      success: true,
      data: {
        items,
        pagination,
      },
      meta: this.generateMeta(options?.requestId),
    };

    return NextResponse.json(response, { status });
  }

  /**
   * Create a validation error response (400)
   */
  static validationError(
    details: ErrorDetail[],
    options?: { requestId?: string }
  ): NextResponse<ErrorResponse> {
    return this.error("VALIDATION_ERROR", "Request validation failed", 400, {
      ...options,
      details,
    });
  }

  /**
   * Create an unauthorized error response (401)
   */
  static unauthorized(
    code: string = "AUTH_UNAUTHORIZED",
    message: string = "Unauthorized access",
    options?: { requestId?: string }
  ): NextResponse<ErrorResponse> {
    return this.error(code, message, 401, options);
  }

  /**
   * Create a forbidden error response (403)
   */
  static forbidden(
    code: string = "AUTH_FORBIDDEN",
    message: string = "Access forbidden",
    options?: { requestId?: string }
  ): NextResponse<ErrorResponse> {
    return this.error(code, message, 403, options);
  }

  /**
   * Create a not found error response (404)
   */
  static notFound(
    code: string = "BUSINESS_NOT_FOUND",
    message: string = "Resource not found",
    options?: { requestId?: string }
  ): NextResponse<ErrorResponse> {
    return this.error(code, message, 404, options);
  }

  /**
   * Create a conflict error response (409)
   */
  static conflict(
    code: string = "BUSINESS_CONFLICT",
    message: string = "Resource conflict",
    options?: { requestId?: string }
  ): NextResponse<ErrorResponse> {
    return this.error(code, message, 409, options);
  }

  /**
   * Create a business logic error response (422)
   */
  static businessError(
    code: string,
    message: string,
    options?: { requestId?: string }
  ): NextResponse<ErrorResponse> {
    return this.error(code, message, 422, options);
  }

  /**
   * Create a rate limit error response (429)
   */
  static rateLimitExceeded(
    message: string = "Rate limit exceeded",
    options?: { requestId?: string }
  ): NextResponse<ErrorResponse> {
    return this.error("SYSTEM_RATE_LIMIT_EXCEEDED", message, 429, options);
  }

  /**
   * Create an internal server error response (500)
   */
  static internalError(
    message: string = "Internal server error",
    options?: { requestId?: string }
  ): NextResponse<ErrorResponse> {
    return this.error("SYSTEM_INTERNAL_ERROR", message, 500, options);
  }

  /**
   * Create a service unavailable error response (503)
   */
  static serviceUnavailable(
    message: string = "Service temporarily unavailable",
    options?: { requestId?: string }
  ): NextResponse<ErrorResponse> {
    return this.error("SYSTEM_SERVICE_UNAVAILABLE", message, 503, options);
  }

  /**
   * Create a no content response (204) - for DELETE operations
   * Note: 204 responses should not have a body, so this returns empty response
   */
  static noContent(): NextResponse {
    return new NextResponse(null, { status: 204 });
  }
}
