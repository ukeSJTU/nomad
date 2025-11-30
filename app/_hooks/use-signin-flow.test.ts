import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import type { OtpLoginData, PasswordLoginData } from "@/types/validations";

import { useSignInFlow } from "./use-signin-flow";

// Mock router
const mockRouterPush = vi.fn();
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockRouterPush,
  }),
}));

// Mock toast
vi.mock("sonner", () => ({
  toast: {
    error: vi.fn(),
  },
}));

// Mock auth actions
const mockSignInWithPasswordAction = vi.fn();
const mockSignInWithOtpAction = vi.fn();
const mockSendPhoneOtpAction = vi.fn();
const mockSendEmailOtpAction = vi.fn();
vi.mock("@/app/_actions/auth", () => ({
  signInWithPasswordAction: (...args: any[]) =>
    mockSignInWithPasswordAction(...args),
  signInWithOtpAction: (...args: any[]) => mockSignInWithOtpAction(...args),
  sendPhoneOtpAction: (...args: any[]) => mockSendPhoneOtpAction(...args),
  sendEmailOtpAction: (...args: any[]) => mockSendEmailOtpAction(...args),
}));

// Mock validateAccount utility
vi.mock("@/lib/validation/account", () => ({
  validateAccount: vi.fn(),
}));

import { toast } from "sonner";

import { validateAccount } from "@/lib/validation/account";

const mockToastError = vi.mocked(toast.error);
const mockValidateAccount = vi.mocked(validateAccount);

const mockFetchOptions = {
  headers: { "x-captcha-response": "test-token" },
};

describe("useSignInFlow", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should initialize with isLoading as false", () => {
    const { result } = renderHook(() => useSignInFlow());
    expect(result.current.isLoading).toBe(false);
  });

  describe("handlePasswordLogin", () => {
    const mockPasswordData: PasswordLoginData = {
      account: "user@example.com",
      password: "SecureP@ssw0rd",
      agreedToTerms: true,
    };

    it("redirects on success", async () => {
      mockSignInWithPasswordAction.mockResolvedValue({
        success: true,
        data: undefined,
      });

      const { result } = renderHook(() => useSignInFlow());
      await act(async () => {
        await result.current.handlePasswordLogin(
          mockPasswordData,
          mockFetchOptions
        );
      });

      expect(mockSignInWithPasswordAction).toHaveBeenCalledWith(
        mockPasswordData,
        mockFetchOptions
      );
      expect(mockRouterPush).toHaveBeenCalledWith("/");
      expect(result.current.isLoading).toBe(false);
    });

    it("shows toast on failure", async () => {
      mockSignInWithPasswordAction.mockResolvedValue({
        success: false,
        error: "登录失败",
      });

      const { result } = renderHook(() => useSignInFlow());
      await act(async () => {
        await result.current.handlePasswordLogin(
          mockPasswordData,
          mockFetchOptions
        );
      });

      expect(mockToastError).toHaveBeenCalledWith("登录失败");
      expect(mockRouterPush).not.toHaveBeenCalled();
    });
  });

  describe("handleOtpLogin", () => {
    const mockOtpData: OtpLoginData = {
      account: "user@example.com",
      otp: "123456",
      agreedToTerms: true,
    };

    it("redirects on success", async () => {
      mockSignInWithOtpAction.mockResolvedValue({
        success: true,
        data: undefined,
      });

      const { result } = renderHook(() => useSignInFlow());
      await act(async () => {
        await result.current.handleOtpLogin(mockOtpData, mockFetchOptions);
      });

      expect(mockSignInWithOtpAction).toHaveBeenCalledWith(
        mockOtpData,
        mockFetchOptions
      );
      expect(mockRouterPush).toHaveBeenCalledWith("/");
    });

    it("shows toast on failure", async () => {
      mockSignInWithOtpAction.mockResolvedValue({
        success: false,
        error: "验证码错误",
      });

      const { result } = renderHook(() => useSignInFlow());
      await act(async () => {
        await result.current.handleOtpLogin(mockOtpData, mockFetchOptions);
      });

      expect(mockToastError).toHaveBeenCalledWith("验证码错误");
      expect(mockRouterPush).not.toHaveBeenCalled();
    });
  });

  describe("handleSendOtp", () => {
    it("sends phone OTP when account is phone number", async () => {
      mockValidateAccount.mockReturnValue({
        isPhone: true,
        isEmail: false,
        isValid: true,
      });
      mockSendPhoneOtpAction.mockResolvedValue({
        success: true,
        data: undefined,
      });

      const { result } = renderHook(() => useSignInFlow());
      const success = await result.current.handleSendOtp(
        "+8613800138000",
        mockFetchOptions
      );

      expect(success).toBe(true);
      expect(mockSendPhoneOtpAction).toHaveBeenCalledWith(
        "+8613800138000",
        mockFetchOptions
      );
    });

    it("sends email OTP when account is email", async () => {
      mockValidateAccount.mockReturnValue({
        isPhone: false,
        isEmail: true,
        isValid: true,
      });
      mockSendEmailOtpAction.mockResolvedValue({
        success: true,
        data: undefined,
      });

      const { result } = renderHook(() => useSignInFlow());
      const success = await result.current.handleSendOtp(
        "user@example.com",
        mockFetchOptions
      );

      expect(success).toBe(true);
      expect(mockSendEmailOtpAction).toHaveBeenCalledWith(
        "user@example.com",
        "sign-in",
        mockFetchOptions
      );
    });

    it("returns false for invalid account format", async () => {
      mockValidateAccount.mockReturnValue({
        isPhone: false,
        isEmail: false,
        isValid: false,
      });

      const { result } = renderHook(() => useSignInFlow());
      const success = await result.current.handleSendOtp("invalid");

      expect(success).toBe(false);
      expect(mockToastError).toHaveBeenCalledWith("无效的账号格式");
      expect(mockSendPhoneOtpAction).not.toHaveBeenCalled();
      expect(mockSendEmailOtpAction).not.toHaveBeenCalled();
    });
  });
});
