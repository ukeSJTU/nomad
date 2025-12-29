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
  signInWithPasswordAction: (...args: unknown[]) =>
    mockSignInWithPasswordAction(...args),
  signInWithOtpAction: (...args: unknown[]) => mockSignInWithOtpAction(...args),
  sendPhoneOtpAction: (...args: unknown[]) => mockSendPhoneOtpAction(...args),
  sendEmailOtpAction: (...args: unknown[]) => mockSendEmailOtpAction(...args),
}));

// Mock validateAccount utility
vi.mock("@/lib/validation", () => ({
  validateAccount: vi.fn(),
}));

import { toast } from "sonner";

import { validateAccount } from "@/lib/validation";

const mockToastError = vi.mocked(toast.error);
const mockValidateAccount = vi.mocked(validateAccount);

const mockFetchOptions = {
  headers: { "x-captcha-token": "test-token" },
};

/**
 * @requirement REQ-U04
 * @requirement REQ-U05
 * @requirement REQ-U06
 * @requirement REQ-U07
 */
describe("useSignInFlow", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should initialize with isLoading as false", () => {
    const { result } = renderHook(() => useSignInFlow());
    expect(result.current.isLoading).toBe(false);
  });

  /**
   * @requirement REQ-U04
   * @requirement REQ-U06
   */
  describe("handlePasswordLogin", () => {
    const mockPasswordData: PasswordLoginData = {
      account: "user@example.com",
      password: "SecureP@ssw0rd",
      agreedToTerms: true,
    };

    /**
     * @requirement REQ-U04
     * @scenario 场景1
     */
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

    /**
     * @requirement REQ-U04
     * @scenario 场景3
     */
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

  /**
   * @requirement REQ-U05
   * @requirement REQ-U07
   */
  describe("handleOtpLogin", () => {
    const mockOtpData: OtpLoginData = {
      account: "user@example.com",
      otp: "123456",
      agreedToTerms: true,
    };

    /**
     * @requirement REQ-U05
     * @scenario 场景1
     */
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

    /**
     * @requirement REQ-U05
     * @scenario 场景5
     */
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
    /**
     * @requirement REQ-U05
     * @scenario 场景1
     */
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
      const response = await result.current.handleSendOtp(
        "13800138000",
        mockFetchOptions
      );

      expect(response.success).toBe(true);
      expect(mockSendPhoneOtpAction).toHaveBeenCalledWith(
        "13800138000",
        mockFetchOptions
      );
    });

    /**
     * @requirement REQ-U07
     * @scenario 场景1
     */
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
      const response = await result.current.handleSendOtp(
        "user@example.com",
        mockFetchOptions
      );

      expect(response.success).toBe(true);
      expect(mockSendEmailOtpAction).toHaveBeenCalledWith(
        "user@example.com",
        "sign-in",
        mockFetchOptions
      );
    });

    /**
     * @requirement REQ-U05
     * @scenario 场景2
     */
    it("returns false for invalid account format", async () => {
      mockValidateAccount.mockReturnValue({
        isPhone: false,
        isEmail: false,
        isValid: false,
      });

      const { result } = renderHook(() => useSignInFlow());
      const response = await result.current.handleSendOtp("invalid");

      expect(response.success).toBe(false);
      expect(mockToastError).toHaveBeenCalledWith("无效的账号格式");
      expect(mockSendPhoneOtpAction).not.toHaveBeenCalled();
      expect(mockSendEmailOtpAction).not.toHaveBeenCalled();
    });
  });
});
