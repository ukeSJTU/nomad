import { act, renderHook, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

// Mock toast
vi.mock("sonner", () => ({
  toast: {
    error: vi.fn(),
  },
}));

// Mock auth client
vi.mock("@/lib/auth/client", () => ({
  authClient: {
    phoneNumber: {
      verify: vi.fn(),
      sendOtp: vi.fn(),
    },
    signIn: {
      emailOtp: vi.fn(),
    },
    emailOtp: {
      sendVerificationOtp: vi.fn(),
    },
  },
}));

// Mock setInitialPasswordAction
vi.mock("@/lib/actions", () => ({
  setInitialPasswordAction: vi.fn(),
}));

// Import the hook after mocking dependencies
import { toast } from "sonner";

import { setInitialPasswordAction } from "@/lib/actions";
import { authClient } from "@/lib/auth/client";
import type {
  EmailVerificationData,
  PasswordSetupData,
  PhoneVerificationData,
} from "@/types/validations/auth";

import { useSignUpFlow } from "./use-signup-flow";

// Get mock functions
const mockToastError = vi.mocked(toast.error);
const mockPhoneNumberVerify = vi.mocked(authClient.phoneNumber.verify);
const mockPhoneNumberSendOtp = vi.mocked(authClient.phoneNumber.sendOtp);
const mockEmailOtpVerify = vi.mocked(authClient.signIn.emailOtp);
const mockEmailOtpSendVerificationOtp = vi.mocked(
  authClient.emailOtp.sendVerificationOtp
);
const mockSetInitialPasswordAction = vi.mocked(setInitialPasswordAction);

describe("useSignUpFlow", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Initial State", () => {
    it("should initialize with correct default values", () => {
      const { result } = renderHook(() => useSignUpFlow());

      expect(result.current.currentStep).toBe(1);
      expect(result.current.signUpMethod).toBe("phone");
      expect(result.current.phoneData).toBeNull();
      expect(result.current.emailData).toBeNull();
      expect(result.current.isLoading).toBe(false);
    });
  });

  describe("setSignUpMethod", () => {
    it("should update signup method to email", () => {
      const { result } = renderHook(() => useSignUpFlow());

      act(() => {
        result.current.setSignUpMethod("email");
      });

      expect(result.current.signUpMethod).toBe("email");
    });

    it("should update signup method to phone", () => {
      const { result } = renderHook(() => useSignUpFlow());

      act(() => {
        result.current.setSignUpMethod("email");
        result.current.setSignUpMethod("phone");
      });

      expect(result.current.signUpMethod).toBe("phone");
    });
  });

  describe("handlePhoneVerified", () => {
    const mockPhoneData: PhoneVerificationData = {
      phoneNumber: "13800138000",
      otp: "123456",
      agreedToTerms: true,
    };

    it("should successfully verify phone and move to step 2", async () => {
      mockPhoneNumberVerify.mockResolvedValue({ error: null });
      const { result } = renderHook(() => useSignUpFlow());

      let actionResult;
      await act(async () => {
        actionResult = await result.current.handlePhoneVerified(mockPhoneData);
      });

      expect(mockPhoneNumberVerify).toHaveBeenCalledWith(
        {
          phoneNumber: "+8613800138000",
          code: "123456",
        },
        undefined
      );
      expect(actionResult).toEqual({ success: true, data: undefined });
      expect(result.current.currentStep).toBe(2);
      expect(result.current.phoneData).toEqual(mockPhoneData);
      expect(result.current.isLoading).toBe(false);
    });

    it("should pass fetchOptions to phone verification", async () => {
      mockPhoneNumberVerify.mockResolvedValue({ error: null });
      const { result } = renderHook(() => useSignUpFlow());

      const fetchOptions = {
        headers: { "X-Turnstile-Token": "test-token" },
      };

      await act(async () => {
        await result.current.handlePhoneVerified(mockPhoneData, fetchOptions);
      });

      expect(mockPhoneNumberVerify).toHaveBeenCalledWith(
        {
          phoneNumber: "+8613800138000",
          code: "123456",
        },
        fetchOptions
      );
    });

    it("should handle phone verification error", async () => {
      mockPhoneNumberVerify.mockResolvedValue({
        error: { message: "验证码错误" },
      });
      const { result } = renderHook(() => useSignUpFlow());

      let actionResult;
      await act(async () => {
        actionResult = await result.current.handlePhoneVerified(mockPhoneData);
      });

      expect(mockToastError).toHaveBeenCalledWith("验证码错误");
      expect(actionResult).toEqual({ success: false, error: "验证码错误" });
      expect(result.current.currentStep).toBe(1);
      expect(result.current.phoneData).toBeNull();
      expect(result.current.isLoading).toBe(false);
    });

    it("should handle phone verification error with default message", async () => {
      mockPhoneNumberVerify.mockResolvedValue({
        error: {},
      });
      const { result } = renderHook(() => useSignUpFlow());

      let actionResult;
      await act(async () => {
        actionResult = await result.current.handlePhoneVerified(mockPhoneData);
      });

      expect(mockToastError).toHaveBeenCalledWith("验证码错误，请重试");
      expect(actionResult).toEqual({
        success: false,
        error: "验证码错误，请重试",
      });
    });

    it("should handle network error during phone verification", async () => {
      mockPhoneNumberVerify.mockRejectedValue(new Error("Network error"));
      const { result } = renderHook(() => useSignUpFlow());

      let actionResult;
      await act(async () => {
        actionResult = await result.current.handlePhoneVerified(mockPhoneData);
      });

      expect(mockToastError).toHaveBeenCalledWith("网络错误，请稍后重试");
      expect(actionResult).toEqual({
        success: false,
        error: "网络错误，请稍后重试",
      });
      expect(result.current.isLoading).toBe(false);
    });
  });

  describe("handleEmailVerified", () => {
    const mockEmailData: EmailVerificationData = {
      email: "test@example.com",
      otp: "123456",
      agreedToTerms: true,
    };

    it("should successfully verify email and move to step 2", async () => {
      mockEmailOtpVerify.mockResolvedValue({ error: null });
      const { result } = renderHook(() => useSignUpFlow());

      let actionResult;
      await act(async () => {
        actionResult = await result.current.handleEmailVerified(mockEmailData);
      });

      expect(mockEmailOtpVerify).toHaveBeenCalledWith(
        {
          email: "test@example.com",
          otp: "123456",
        },
        undefined
      );
      expect(actionResult).toEqual({ success: true, data: undefined });
      expect(result.current.currentStep).toBe(2);
      expect(result.current.emailData).toEqual(mockEmailData);
      expect(result.current.isLoading).toBe(false);
    });

    it("should pass fetchOptions to email verification", async () => {
      mockEmailOtpVerify.mockResolvedValue({ error: null });
      const { result } = renderHook(() => useSignUpFlow());

      const fetchOptions = {
        headers: { "X-Turnstile-Token": "test-token" },
      };

      await act(async () => {
        await result.current.handleEmailVerified(mockEmailData, fetchOptions);
      });

      expect(mockEmailOtpVerify).toHaveBeenCalledWith(
        {
          email: "test@example.com",
          otp: "123456",
        },
        fetchOptions
      );
    });

    it("should handle email verification error", async () => {
      mockEmailOtpVerify.mockResolvedValue({
        error: { message: "验证码已过期" },
      });
      const { result } = renderHook(() => useSignUpFlow());

      let actionResult;
      await act(async () => {
        actionResult = await result.current.handleEmailVerified(mockEmailData);
      });

      expect(mockToastError).toHaveBeenCalledWith("验证码已过期");
      expect(actionResult).toEqual({ success: false, error: "验证码已过期" });
      expect(result.current.currentStep).toBe(1);
      expect(result.current.emailData).toBeNull();
    });

    it("should handle email verification error with default message", async () => {
      mockEmailOtpVerify.mockResolvedValue({
        error: {},
      });
      const { result } = renderHook(() => useSignUpFlow());

      let actionResult;
      await act(async () => {
        actionResult = await result.current.handleEmailVerified(mockEmailData);
      });

      expect(mockToastError).toHaveBeenCalledWith("验证码错误，请重试");
      expect(actionResult).toEqual({
        success: false,
        error: "验证码错误，请重试",
      });
    });

    it("should handle network error during email verification", async () => {
      mockEmailOtpVerify.mockRejectedValue(new Error("Network error"));
      const { result } = renderHook(() => useSignUpFlow());

      let actionResult;
      await act(async () => {
        actionResult = await result.current.handleEmailVerified(mockEmailData);
      });

      expect(mockToastError).toHaveBeenCalledWith("网络错误，请稍后重试");
      expect(actionResult).toEqual({
        success: false,
        error: "网络错误，请稍后重试",
      });
    });
  });

  describe("handlePasswordSetup", () => {
    const mockPasswordData: PasswordSetupData = {
      password: "SecureP@ssw0rd",
      confirmPassword: "SecureP@ssw0rd",
    };

    it("should successfully set password and move to step 3", async () => {
      mockSetInitialPasswordAction.mockResolvedValue({
        success: true,
        message: "Password set successfully",
      });
      const { result } = renderHook(() => useSignUpFlow());

      await act(async () => {
        await result.current.handlePasswordSetup(mockPasswordData);
      });

      expect(mockSetInitialPasswordAction).toHaveBeenCalledWith(
        "SecureP@ssw0rd"
      );
      expect(result.current.currentStep).toBe(3);
      expect(result.current.isLoading).toBe(false);
    });

    it("should handle password setup error", async () => {
      mockSetInitialPasswordAction.mockResolvedValue({
        success: false,
        error: "密码设置失败",
      });
      const { result } = renderHook(() => useSignUpFlow());

      await act(async () => {
        await result.current.handlePasswordSetup(mockPasswordData);
      });

      expect(mockToastError).toHaveBeenCalledWith("密码设置失败");
      expect(result.current.currentStep).toBe(1); // Should not move to step 3
    });

    it("should handle password setup error with default message", async () => {
      mockSetInitialPasswordAction.mockResolvedValue({
        success: false,
        error: "Failed to set password",
      });
      const { result } = renderHook(() => useSignUpFlow());

      await act(async () => {
        await result.current.handlePasswordSetup(mockPasswordData);
      });

      expect(mockToastError).toHaveBeenCalledWith("Failed to set password");
    });

    it("should handle network error during password setup", async () => {
      mockSetInitialPasswordAction.mockRejectedValue(
        new Error("Network error")
      );
      const { result } = renderHook(() => useSignUpFlow());

      await act(async () => {
        await result.current.handlePasswordSetup(mockPasswordData);
      });

      expect(mockToastError).toHaveBeenCalledWith("网络错误，请稍后重试");
      expect(result.current.isLoading).toBe(false);
    });
  });

  describe("handleSendPhoneOtp", () => {
    it("should successfully send phone OTP", async () => {
      mockPhoneNumberSendOtp.mockResolvedValue({ error: null });
      const { result } = renderHook(() => useSignUpFlow());

      let sendResult;
      await act(async () => {
        sendResult = await result.current.handleSendPhoneOtp("13800138000");
      });

      expect(mockPhoneNumberSendOtp).toHaveBeenCalledWith(
        {
          phoneNumber: "+8613800138000",
        },
        undefined
      );
      expect(sendResult).toBe(true);
      expect(result.current.isLoading).toBe(false);
    });

    it("should pass fetchOptions to phone OTP send", async () => {
      mockPhoneNumberSendOtp.mockResolvedValue({ error: null });
      const { result } = renderHook(() => useSignUpFlow());

      const fetchOptions = {
        headers: { "X-Turnstile-Token": "test-token" },
      };

      await act(async () => {
        await result.current.handleSendPhoneOtp("13800138000", fetchOptions);
      });

      expect(mockPhoneNumberSendOtp).toHaveBeenCalledWith(
        {
          phoneNumber: "+8613800138000",
        },
        fetchOptions
      );
    });

    it("should handle error when phone number is empty", async () => {
      const { result } = renderHook(() => useSignUpFlow());

      let sendResult;
      await act(async () => {
        sendResult = await result.current.handleSendPhoneOtp("");
      });

      expect(mockToastError).toHaveBeenCalledWith("请先输入手机号");
      expect(sendResult).toBe(false);
      expect(mockPhoneNumberSendOtp).not.toHaveBeenCalled();
    });

    it("should handle phone OTP send error", async () => {
      mockPhoneNumberSendOtp.mockResolvedValue({
        error: { message: "发送失败" },
      });
      const { result } = renderHook(() => useSignUpFlow());

      let sendResult;
      await act(async () => {
        sendResult = await result.current.handleSendPhoneOtp("13800138000");
      });

      expect(sendResult).toBe(false);
    });

    it("should handle network error during phone OTP send", async () => {
      mockPhoneNumberSendOtp.mockRejectedValue(new Error("Network error"));
      const { result } = renderHook(() => useSignUpFlow());

      let sendResult;
      await act(async () => {
        sendResult = await result.current.handleSendPhoneOtp("13800138000");
      });

      expect(sendResult).toBe(false);
      expect(result.current.isLoading).toBe(false);
    });
  });

  describe("handleSendEmailOtp", () => {
    it("should successfully send email OTP", async () => {
      mockEmailOtpSendVerificationOtp.mockResolvedValue({ error: null });
      const { result } = renderHook(() => useSignUpFlow());

      let sendResult;
      await act(async () => {
        sendResult =
          await result.current.handleSendEmailOtp("test@example.com");
      });

      expect(mockEmailOtpSendVerificationOtp).toHaveBeenCalledWith(
        {
          email: "test@example.com",
          type: "sign-in",
        },
        undefined
      );
      expect(sendResult).toBe(true);
      expect(result.current.isLoading).toBe(false);
    });

    it("should pass fetchOptions to email OTP send", async () => {
      mockEmailOtpSendVerificationOtp.mockResolvedValue({ error: null });
      const { result } = renderHook(() => useSignUpFlow());

      const fetchOptions = {
        headers: { "X-Turnstile-Token": "test-token" },
      };

      await act(async () => {
        await result.current.handleSendEmailOtp(
          "test@example.com",
          fetchOptions
        );
      });

      expect(mockEmailOtpSendVerificationOtp).toHaveBeenCalledWith(
        {
          email: "test@example.com",
          type: "sign-in",
        },
        fetchOptions
      );
    });

    it("should handle error when email is empty", async () => {
      const { result } = renderHook(() => useSignUpFlow());

      let sendResult;
      await act(async () => {
        sendResult = await result.current.handleSendEmailOtp("");
      });

      expect(mockToastError).toHaveBeenCalledWith("请先输入邮箱地址");
      expect(sendResult).toBe(false);
      expect(mockEmailOtpSendVerificationOtp).not.toHaveBeenCalled();
    });

    it("should handle email OTP send error", async () => {
      mockEmailOtpSendVerificationOtp.mockResolvedValue({
        error: { message: "发送失败" },
      });
      const { result } = renderHook(() => useSignUpFlow());

      let sendResult;
      await act(async () => {
        sendResult =
          await result.current.handleSendEmailOtp("test@example.com");
      });

      expect(sendResult).toBe(false);
    });

    it("should handle network error during email OTP send", async () => {
      mockEmailOtpSendVerificationOtp.mockRejectedValue(
        new Error("Network error")
      );
      const { result } = renderHook(() => useSignUpFlow());

      let sendResult;
      await act(async () => {
        sendResult =
          await result.current.handleSendEmailOtp("test@example.com");
      });

      expect(sendResult).toBe(false);
      expect(result.current.isLoading).toBe(false);
    });
  });

  describe("Loading State", () => {
    it("should set loading state during phone verification", async () => {
      mockPhoneNumberVerify.mockImplementation(
        () =>
          new Promise(resolve =>
            setTimeout(() => resolve({ error: null }), 100)
          )
      );
      const { result } = renderHook(() => useSignUpFlow());

      const mockPhoneData: PhoneVerificationData = {
        phoneNumber: "13800138000",
        otp: "123456",
        agreedToTerms: true,
      };

      act(() => {
        result.current.handlePhoneVerified(mockPhoneData);
      });

      // Should be loading immediately after calling
      await waitFor(() => {
        expect(result.current.isLoading).toBe(true);
      });

      // Should be false after completion
      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });
    });

    it("should set loading state during email verification", async () => {
      mockEmailOtpVerify.mockImplementation(
        () =>
          new Promise(resolve =>
            setTimeout(() => resolve({ error: null }), 100)
          )
      );
      const { result } = renderHook(() => useSignUpFlow());

      const mockEmailData: EmailVerificationData = {
        email: "test@example.com",
        otp: "123456",
        agreedToTerms: true,
      };

      act(() => {
        result.current.handleEmailVerified(mockEmailData);
      });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(true);
      });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });
    });

    it("should set loading state during password setup", async () => {
      mockSetInitialPasswordAction.mockImplementation(
        () =>
          new Promise(resolve =>
            setTimeout(
              () => resolve({ success: true, message: "Success" }),
              100
            )
          )
      );
      const { result } = renderHook(() => useSignUpFlow());

      const mockPasswordData: PasswordSetupData = {
        password: "SecureP@ssw0rd",
        confirmPassword: "SecureP@ssw0rd",
      };

      act(() => {
        result.current.handlePasswordSetup(mockPasswordData);
      });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(true);
      });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });
    });
  });
});
