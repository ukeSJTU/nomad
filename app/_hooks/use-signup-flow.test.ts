import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import type {
  EmailVerificationData,
  PasswordSetupData,
  PhoneVerificationData,
} from "@/types/validations";

import { useSignUpFlow } from "./use-signup-flow";

// Mock toast
vi.mock("sonner", () => ({
  toast: {
    error: vi.fn(),
    success: vi.fn(),
  },
}));

// Mock auth actions
const mockSignInWithOtpAction = vi.fn();
const mockSendPhoneOtpAction = vi.fn();
const mockSendEmailOtpAction = vi.fn();
const mockVerifyEmailOtpAction = vi.fn();
const mockSetInitialPasswordAction = vi.fn();
vi.mock("@/app/_actions", () => ({
  setInitialPasswordAction: (...args: any[]) =>
    mockSetInitialPasswordAction(...args),
}));
vi.mock("@/app/_actions/auth", () => ({
  signInWithOtpAction: (...args: any[]) => mockSignInWithOtpAction(...args),
  sendPhoneOtpAction: (...args: any[]) => mockSendPhoneOtpAction(...args),
  sendEmailOtpAction: (...args: any[]) => mockSendEmailOtpAction(...args),
  verifyEmailOtpAction: (...args: any[]) => mockVerifyEmailOtpAction(...args),
}));

import { toast } from "sonner";

const mockToastError = vi.mocked(toast.error);

const mockFetchOptions = {
  headers: { "x-captcha-token": "test-token" },
};

describe("useSignUpFlow", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("initializes with step 1 and phone method", () => {
    const { result } = renderHook(() => useSignUpFlow());
    expect(result.current.currentStep).toBe(1);
    expect(result.current.signUpMethod).toBe("phone");
  });

  it("advances after successful phone verification", async () => {
    mockSignInWithOtpAction.mockResolvedValue({
      success: true,
      data: undefined,
    });
    const { result } = renderHook(() => useSignUpFlow());
    const data: PhoneVerificationData = {
      phoneNumber: "13800138000",
      otp: "123456",
      agreedToTerms: true,
    };

    await act(async () => {
      await result.current.handlePhoneVerified(data);
    });

    expect(mockSignInWithOtpAction).toHaveBeenCalled();
    expect(result.current.currentStep).toBe(2);
  });

  it("shows error when phone verification fails", async () => {
    mockSignInWithOtpAction.mockResolvedValue({
      success: false,
      error: "验证码错误",
    });
    const { result } = renderHook(() => useSignUpFlow());
    const data: PhoneVerificationData = {
      phoneNumber: "13800138000",
      otp: "123456",
      agreedToTerms: true,
    };

    await act(async () => {
      await result.current.handlePhoneVerified(data, mockFetchOptions);
    });

    expect(mockToastError).toHaveBeenCalledWith("验证码错误");
    expect(result.current.currentStep).toBe(1);
  });

  it("advances after successful email verification", async () => {
    mockVerifyEmailOtpAction.mockResolvedValue({
      success: true,
      data: undefined,
    });
    const { result } = renderHook(() => useSignUpFlow());
    const data: EmailVerificationData = {
      email: "user@example.com",
      otp: "123456",
      agreedToTerms: true,
    };

    await act(async () => {
      await result.current.handleEmailVerified(data);
    });

    expect(mockVerifyEmailOtpAction).toHaveBeenCalled();
    expect(result.current.currentStep).toBe(2);
  });

  it("sends phone OTP", async () => {
    mockSendPhoneOtpAction.mockResolvedValue({
      success: true,
      data: undefined,
    });
    const { result } = renderHook(() => useSignUpFlow());
    const success = await result.current.handleSendPhoneOtp(
      "13800138000",
      mockFetchOptions
    );
    expect(success).toBe(true);
    expect(mockSendPhoneOtpAction).toHaveBeenCalledWith(
      "13800138000",
      mockFetchOptions
    );
  });

  it("sends email OTP", async () => {
    mockSendEmailOtpAction.mockResolvedValue({
      success: true,
      data: undefined,
    });
    const { result } = renderHook(() => useSignUpFlow());
    const success = await result.current.handleSendEmailOtp(
      "user@example.com",
      mockFetchOptions
    );
    expect(success).toBe(true);
    expect(mockSendEmailOtpAction).toHaveBeenCalledWith(
      "user@example.com",
      "email-verification",
      mockFetchOptions
    );
  });

  it("moves to step 3 after setting password", async () => {
    mockSetInitialPasswordAction.mockResolvedValue({
      success: true,
      data: undefined,
    });
    const { result } = renderHook(() => useSignUpFlow());
    const data: PasswordSetupData = {
      password: "Password123",
      confirmPassword: "Password123",
    };

    await act(async () => {
      await result.current.handlePasswordSetup(data);
    });

    expect(mockSetInitialPasswordAction).toHaveBeenCalled();
    expect(result.current.currentStep).toBe(3);
  });
});
