import { act, renderHook, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

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

// Mock auth client
vi.mock("@/domains/auth/client", () => ({
  authClient: {
    signIn: {
      phoneNumber: vi.fn(),
      email: vi.fn(),
      emailOtp: vi.fn(),
    },
    phoneNumber: {
      verify: vi.fn(),
      sendOtp: vi.fn(),
    },
    emailOtp: {
      sendVerificationOtp: vi.fn(),
    },
  },
}));

// Mock validateAccount utility
vi.mock("@/utils/auth", () => ({
  validateAccount: vi.fn(),
}));

// Import the hook after mocking dependencies
import { toast } from "sonner";

import { authClient } from "@/domains/auth/client";
import type { OtpLoginData, PasswordLoginData } from "@/types/validations/auth";
import { validateAccount } from "@/utils/auth";

import { useSignInFlow } from "./use-signin-flow";

// Get mock functions
const mockToastError = vi.mocked(toast.error);
const mockSignInPhone = vi.mocked(authClient.signIn.phoneNumber);
const mockSignInEmail = vi.mocked(authClient.signIn.email);
const mockPhoneNumberVerify = vi.mocked(authClient.phoneNumber.verify);
const mockSignInEmailOtp = vi.mocked(authClient.signIn.emailOtp);
const mockPhoneNumberSendOtp = vi.mocked(authClient.phoneNumber.sendOtp);
const mockEmailOtpSendVerificationOtp = vi.mocked(
  authClient.emailOtp.sendVerificationOtp
);
const mockValidateAccount = vi.mocked(validateAccount);

describe("useSignInFlow", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Initial State", () => {
    it("should initialize with isLoading as false", () => {
      const { result } = renderHook(() => useSignInFlow());

      expect(result.current.isLoading).toBe(false);
    });
  });

  describe("handlePasswordLogin", () => {
    describe("Phone Number Login", () => {
      const mockPasswordData: PasswordLoginData = {
        account: "+8613800138000",
        password: "SecureP@ssw0rd",
        agreedToTerms: true,
      };

      it("should successfully login with phone number", async () => {
        mockValidateAccount.mockReturnValue({
          isPhone: true,
          isEmail: false,
          isValid: true,
        });
        mockSignInPhone.mockResolvedValue({ error: null });
        const { result } = renderHook(() => useSignInFlow());

        let actionResult;
        await act(async () => {
          actionResult =
            await result.current.handlePasswordLogin(mockPasswordData);
        });

        expect(mockValidateAccount).toHaveBeenCalledWith("+8613800138000");
        expect(mockSignInPhone).toHaveBeenCalledWith({
          phoneNumber: "+8613800138000",
          password: "SecureP@ssw0rd",
          rememberMe: true,
        });
        expect(mockRouterPush).toHaveBeenCalledWith("/");
        expect(actionResult).toEqual({ success: true, data: undefined });
        expect(result.current.isLoading).toBe(false);
      });

      it("should handle phone login error", async () => {
        mockValidateAccount.mockReturnValue({
          isPhone: true,
          isEmail: false,
          isValid: true,
        });
        mockSignInPhone.mockResolvedValue({
          error: { message: "密码错误" },
        });
        const { result } = renderHook(() => useSignInFlow());

        let actionResult;
        await act(async () => {
          actionResult =
            await result.current.handlePasswordLogin(mockPasswordData);
        });

        expect(mockToastError).toHaveBeenCalledWith("密码错误");
        expect(actionResult).toEqual({ success: false, error: "密码错误" });
        expect(mockRouterPush).not.toHaveBeenCalled();
      });

      it("should handle phone login error with default message", async () => {
        mockValidateAccount.mockReturnValue({
          isPhone: true,
          isEmail: false,
          isValid: true,
        });
        mockSignInPhone.mockResolvedValue({
          error: {},
        });
        const { result } = renderHook(() => useSignInFlow());

        let actionResult;
        await act(async () => {
          actionResult =
            await result.current.handlePasswordLogin(mockPasswordData);
        });

        expect(mockToastError).toHaveBeenCalledWith(
          "登录失败，请检查账号和密码"
        );
        expect(actionResult).toEqual({
          success: false,
          error: "登录失败，请检查账号和密码",
        });
      });
    });

    describe("Email Login", () => {
      const mockPasswordData: PasswordLoginData = {
        account: "test@example.com",
        password: "SecureP@ssw0rd",
        agreedToTerms: true,
      };

      it("should successfully login with email", async () => {
        mockValidateAccount.mockReturnValue({
          isPhone: false,
          isEmail: true,
          isValid: true,
        });
        mockSignInEmail.mockResolvedValue({ error: null });
        const { result } = renderHook(() => useSignInFlow());

        let actionResult;
        await act(async () => {
          actionResult =
            await result.current.handlePasswordLogin(mockPasswordData);
        });

        expect(mockValidateAccount).toHaveBeenCalledWith("test@example.com");
        expect(mockSignInEmail).toHaveBeenCalledWith({
          email: "test@example.com",
          password: "SecureP@ssw0rd",
          rememberMe: true,
        });
        expect(mockRouterPush).toHaveBeenCalledWith("/");
        expect(actionResult).toEqual({ success: true, data: undefined });
      });

      it("should handle email login error", async () => {
        mockValidateAccount.mockReturnValue({
          isPhone: false,
          isEmail: true,
          isValid: true,
        });
        mockSignInEmail.mockResolvedValue({
          error: { message: "邮箱或密码错误" },
        });
        const { result } = renderHook(() => useSignInFlow());

        let actionResult;
        await act(async () => {
          actionResult =
            await result.current.handlePasswordLogin(mockPasswordData);
        });

        expect(mockToastError).toHaveBeenCalledWith("邮箱或密码错误");
        expect(actionResult).toEqual({
          success: false,
          error: "邮箱或密码错误",
        });
        expect(mockRouterPush).not.toHaveBeenCalled();
      });
    });

    describe("Invalid Account Format", () => {
      const mockPasswordData: PasswordLoginData = {
        account: "invalid-account",
        password: "SecureP@ssw0rd",
        agreedToTerms: true,
      };

      it("should reject invalid account format", async () => {
        mockValidateAccount.mockReturnValue({
          isPhone: false,
          isValid: false,
          isEmail: false,
        });
        const { result } = renderHook(() => useSignInFlow());

        let actionResult;
        await act(async () => {
          actionResult =
            await result.current.handlePasswordLogin(mockPasswordData);
        });

        expect(actionResult).toEqual({
          success: false,
          error: "请输入正确的手机号或邮箱格式",
        });
        expect(mockSignInPhone).not.toHaveBeenCalled();
        expect(mockSignInEmail).not.toHaveBeenCalled();
      });
    });

    describe("Network Error", () => {
      const mockPasswordData: PasswordLoginData = {
        account: "+8613800138000",
        password: "SecureP@ssw0rd",
        agreedToTerms: true,
      };

      it("should handle network error during login", async () => {
        mockValidateAccount.mockReturnValue({
          isPhone: true,
          isEmail: false,
          isValid: true,
        });
        mockSignInPhone.mockRejectedValue(new Error("Network error"));
        const { result } = renderHook(() => useSignInFlow());

        // Mock console.error to avoid noise in test output
        const consoleErrorSpy = vi
          .spyOn(console, "error")
          .mockImplementation(() => {});

        let actionResult;
        await act(async () => {
          actionResult =
            await result.current.handlePasswordLogin(mockPasswordData);
        });

        expect(mockToastError).toHaveBeenCalledWith("登录失败，请稍后重试");
        expect(actionResult).toEqual({
          success: false,
          error: "登录失败，请稍后重试",
        });
        expect(consoleErrorSpy).toHaveBeenCalledWith(
          "登录异常:",
          expect.any(Error)
        );

        consoleErrorSpy.mockRestore();
      });
    });
  });

  describe("handleOtpLogin", () => {
    describe("Phone OTP Login", () => {
      const mockOtpData: OtpLoginData = {
        account: "+8613800138000",
        otp: "123456",
        agreedToTerms: true,
      };

      it("should successfully login with phone OTP", async () => {
        mockValidateAccount.mockReturnValue({
          isPhone: true,
          isEmail: false,
          isValid: true,
        });
        mockPhoneNumberVerify.mockResolvedValue({ error: null });
        const { result } = renderHook(() => useSignInFlow());

        let actionResult;
        await act(async () => {
          actionResult = await result.current.handleOtpLogin(mockOtpData);
        });

        expect(mockValidateAccount).toHaveBeenCalledWith("+8613800138000");
        expect(mockPhoneNumberVerify).toHaveBeenCalledWith(
          {
            phoneNumber: "+8613800138000",
            code: "123456",
          },
          undefined
        );
        expect(mockRouterPush).toHaveBeenCalledWith("/");
        expect(actionResult).toEqual({ success: true, data: undefined });
      });

      it("should pass fetchOptions to phone OTP verification", async () => {
        mockValidateAccount.mockReturnValue({
          isPhone: true,
          isEmail: false,
          isValid: true,
        });
        mockPhoneNumberVerify.mockResolvedValue({ error: null });
        const { result } = renderHook(() => useSignInFlow());

        const fetchOptions = {
          headers: { "X-Turnstile-Token": "test-token" },
        };

        await act(async () => {
          await result.current.handleOtpLogin(mockOtpData, fetchOptions);
        });

        expect(mockPhoneNumberVerify).toHaveBeenCalledWith(
          {
            phoneNumber: "+8613800138000",
            code: "123456",
          },
          fetchOptions
        );
      });

      it("should handle phone OTP verification error", async () => {
        mockValidateAccount.mockReturnValue({
          isPhone: true,
          isEmail: false,
          isValid: true,
        });
        mockPhoneNumberVerify.mockResolvedValue({
          error: { message: "验证码错误" },
        });
        const { result } = renderHook(() => useSignInFlow());

        let actionResult;
        await act(async () => {
          actionResult = await result.current.handleOtpLogin(mockOtpData);
        });

        expect(mockToastError).toHaveBeenCalledWith("验证码错误");
        expect(actionResult).toEqual({ success: false, error: "验证码错误" });
        expect(mockRouterPush).not.toHaveBeenCalled();
      });

      it("should handle phone OTP verification error with default message", async () => {
        mockValidateAccount.mockReturnValue({
          isPhone: true,
          isEmail: false,
          isValid: true,
        });
        mockPhoneNumberVerify.mockResolvedValue({
          error: {},
        });
        const { result } = renderHook(() => useSignInFlow());

        let actionResult;
        await act(async () => {
          actionResult = await result.current.handleOtpLogin(mockOtpData);
        });

        expect(mockToastError).toHaveBeenCalledWith("验证码错误");
        expect(actionResult).toEqual({ success: false, error: "验证码错误" });
      });
    });

    describe("Email OTP Login", () => {
      const mockOtpData: OtpLoginData = {
        account: "test@example.com",
        otp: "123456",
        agreedToTerms: true,
      };

      it("should successfully login with email OTP", async () => {
        mockValidateAccount.mockReturnValue({
          isPhone: false,
          isEmail: true,
          isValid: true,
        });
        mockSignInEmailOtp.mockResolvedValue({ error: null });
        const { result } = renderHook(() => useSignInFlow());

        let actionResult;
        await act(async () => {
          actionResult = await result.current.handleOtpLogin(mockOtpData);
        });

        expect(mockValidateAccount).toHaveBeenCalledWith("test@example.com");
        expect(mockSignInEmailOtp).toHaveBeenCalledWith(
          {
            email: "test@example.com",
            otp: "123456",
          },
          undefined
        );
        expect(mockRouterPush).toHaveBeenCalledWith("/");
        expect(actionResult).toEqual({ success: true, data: undefined });
      });

      it("should pass fetchOptions to email OTP verification", async () => {
        mockValidateAccount.mockReturnValue({
          isPhone: false,
          isEmail: true,
          isValid: true,
        });
        mockSignInEmailOtp.mockResolvedValue({ error: null });
        const { result } = renderHook(() => useSignInFlow());

        const fetchOptions = {
          headers: { "X-Turnstile-Token": "test-token" },
        };

        await act(async () => {
          await result.current.handleOtpLogin(mockOtpData, fetchOptions);
        });

        expect(mockSignInEmailOtp).toHaveBeenCalledWith(
          {
            email: "test@example.com",
            otp: "123456",
          },
          fetchOptions
        );
      });

      it("should handle email OTP verification error", async () => {
        mockValidateAccount.mockReturnValue({
          isPhone: false,
          isEmail: true,
          isValid: true,
        });
        mockSignInEmailOtp.mockResolvedValue({
          error: { message: "验证码已过期" },
        });
        const { result } = renderHook(() => useSignInFlow());

        let actionResult;
        await act(async () => {
          actionResult = await result.current.handleOtpLogin(mockOtpData);
        });

        expect(mockToastError).toHaveBeenCalledWith("验证码已过期");
        expect(actionResult).toEqual({
          success: false,
          error: "验证码已过期",
        });
        expect(mockRouterPush).not.toHaveBeenCalled();
      });
    });

    describe("Invalid Account Format", () => {
      const mockOtpData: OtpLoginData = {
        account: "invalid-account",
        otp: "123456",
        agreedToTerms: true,
      };

      it("should reject invalid account format", async () => {
        mockValidateAccount.mockReturnValue({
          isPhone: false,
          isValid: false,
          isEmail: false,
        });
        const { result } = renderHook(() => useSignInFlow());

        let actionResult;
        await act(async () => {
          actionResult = await result.current.handleOtpLogin(mockOtpData);
        });

        expect(actionResult).toEqual({
          success: false,
          error: "请输入正确的手机号或邮箱格式",
        });
        expect(mockPhoneNumberVerify).not.toHaveBeenCalled();
        expect(mockSignInEmailOtp).not.toHaveBeenCalled();
      });
    });

    describe("Network Error", () => {
      const mockOtpData: OtpLoginData = {
        account: "+8613800138000",
        otp: "123456",
        agreedToTerms: true,
      };

      it("should handle network error during OTP login", async () => {
        mockValidateAccount.mockReturnValue({
          isPhone: true,
          isEmail: false,
          isValid: true,
        });
        mockPhoneNumberVerify.mockRejectedValue(new Error("Network error"));
        const { result } = renderHook(() => useSignInFlow());

        // Mock console.error to avoid noise in test output
        const consoleErrorSpy = vi
          .spyOn(console, "error")
          .mockImplementation(() => {});

        let actionResult;
        await act(async () => {
          actionResult = await result.current.handleOtpLogin(mockOtpData);
        });

        expect(mockToastError).toHaveBeenCalledWith("登录失败，请稍后重试");
        expect(actionResult).toEqual({
          success: false,
          error: "登录失败，请稍后重试",
        });
        expect(consoleErrorSpy).toHaveBeenCalledWith(
          "验证码登录异常:",
          expect.any(Error)
        );

        consoleErrorSpy.mockRestore();
      });
    });
  });

  describe("handleSendOtp", () => {
    describe("Phone OTP Sending", () => {
      it("should successfully send phone OTP", async () => {
        mockValidateAccount.mockReturnValue({
          isPhone: true,
          isEmail: false,
          isValid: true,
        });
        mockPhoneNumberSendOtp.mockResolvedValue({ error: null });
        const { result } = renderHook(() => useSignInFlow());

        let sendResult;
        await act(async () => {
          sendResult = await result.current.handleSendOtp("+8613800138000");
        });

        expect(mockValidateAccount).toHaveBeenCalledWith("+8613800138000");
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
        mockValidateAccount.mockReturnValue({
          isPhone: true,
          isEmail: false,
          isValid: true,
        });
        mockPhoneNumberSendOtp.mockResolvedValue({ error: null });
        const { result } = renderHook(() => useSignInFlow());

        const fetchOptions = {
          headers: { "X-Turnstile-Token": "test-token" },
        };

        await act(async () => {
          await result.current.handleSendOtp("+8613800138000", fetchOptions);
        });

        expect(mockPhoneNumberSendOtp).toHaveBeenCalledWith(
          {
            phoneNumber: "+8613800138000",
          },
          fetchOptions
        );
      });

      it("should handle phone OTP send error", async () => {
        mockValidateAccount.mockReturnValue({
          isPhone: true,
          isEmail: false,
          isValid: true,
        });
        mockPhoneNumberSendOtp.mockResolvedValue({
          error: { message: "发送失败" },
        });
        const { result } = renderHook(() => useSignInFlow());

        // Mock console.error to avoid noise in test output
        const consoleErrorSpy = vi
          .spyOn(console, "error")
          .mockImplementation(() => {});

        let sendResult;
        await act(async () => {
          sendResult = await result.current.handleSendOtp("+8613800138000");
        });

        expect(mockToastError).toHaveBeenCalledWith("发送验证码失败，请重试");
        expect(sendResult).toBe(false);
        expect(consoleErrorSpy).toHaveBeenCalledWith(
          "发送验证码失败:",
          expect.objectContaining({ message: "发送失败" })
        );

        consoleErrorSpy.mockRestore();
      });
    });

    describe("Email OTP Sending", () => {
      it("should successfully send email OTP", async () => {
        mockValidateAccount.mockReturnValue({
          isPhone: false,
          isEmail: true,
          isValid: true,
        });
        mockEmailOtpSendVerificationOtp.mockResolvedValue({ error: null });
        const { result } = renderHook(() => useSignInFlow());

        let sendResult;
        await act(async () => {
          sendResult = await result.current.handleSendOtp("test@example.com");
        });

        expect(mockValidateAccount).toHaveBeenCalledWith("test@example.com");
        expect(mockEmailOtpSendVerificationOtp).toHaveBeenCalledWith(
          {
            email: "test@example.com",
            type: "sign-in",
          },
          undefined
        );
        expect(sendResult).toBe(true);
      });

      it("should pass fetchOptions to email OTP send", async () => {
        mockValidateAccount.mockReturnValue({
          isPhone: false,
          isEmail: true,
          isValid: true,
        });
        mockEmailOtpSendVerificationOtp.mockResolvedValue({ error: null });
        const { result } = renderHook(() => useSignInFlow());

        const fetchOptions = {
          headers: { "X-Turnstile-Token": "test-token" },
        };

        await act(async () => {
          await result.current.handleSendOtp("test@example.com", fetchOptions);
        });

        expect(mockEmailOtpSendVerificationOtp).toHaveBeenCalledWith(
          {
            email: "test@example.com",
            type: "sign-in",
          },
          fetchOptions
        );
      });

      it("should handle email OTP send error", async () => {
        mockValidateAccount.mockReturnValue({
          isPhone: false,
          isEmail: true,
          isValid: true,
        });
        mockEmailOtpSendVerificationOtp.mockResolvedValue({
          error: { message: "发送失败" },
        });
        const { result } = renderHook(() => useSignInFlow());

        // Mock console.error to avoid noise in test output
        const consoleErrorSpy = vi
          .spyOn(console, "error")
          .mockImplementation(() => {});

        let sendResult;
        await act(async () => {
          sendResult = await result.current.handleSendOtp("test@example.com");
        });

        expect(mockToastError).toHaveBeenCalledWith("发送验证码失败，请重试");
        expect(sendResult).toBe(false);
        expect(consoleErrorSpy).toHaveBeenCalledWith(
          "发送验证码失败:",
          expect.objectContaining({ message: "发送失败" })
        );

        consoleErrorSpy.mockRestore();
      });
    });

    describe("Invalid Account Format", () => {
      it("should reject invalid account format", async () => {
        mockValidateAccount.mockReturnValue({
          isPhone: false,
          isValid: false,
          isEmail: false,
        });
        const { result } = renderHook(() => useSignInFlow());

        let sendResult;
        await act(async () => {
          sendResult = await result.current.handleSendOtp("invalid-account");
        });

        expect(mockToastError).toHaveBeenCalledWith("无效的账号格式");
        expect(sendResult).toBe(false);
        expect(mockPhoneNumberSendOtp).not.toHaveBeenCalled();
        expect(mockEmailOtpSendVerificationOtp).not.toHaveBeenCalled();
      });
    });

    describe("Network Error", () => {
      it("should handle network error during phone OTP send", async () => {
        mockValidateAccount.mockReturnValue({
          isPhone: true,
          isEmail: false,
          isValid: true,
        });
        mockPhoneNumberSendOtp.mockRejectedValue(new Error("Network error"));
        const { result } = renderHook(() => useSignInFlow());

        // Mock console.error to avoid noise in test output
        const consoleErrorSpy = vi
          .spyOn(console, "error")
          .mockImplementation(() => {});

        let sendResult;
        await act(async () => {
          sendResult = await result.current.handleSendOtp("+8613800138000");
        });

        expect(mockToastError).toHaveBeenCalledWith("发送验证码失败，请重试");
        expect(sendResult).toBe(false);
        expect(consoleErrorSpy).toHaveBeenCalledWith(
          "发送验证码异常:",
          expect.any(Error)
        );

        consoleErrorSpy.mockRestore();
      });

      it("should handle network error during email OTP send", async () => {
        mockValidateAccount.mockReturnValue({
          isPhone: false,
          isEmail: true,
          isValid: true,
        });
        mockEmailOtpSendVerificationOtp.mockRejectedValue(
          new Error("Network error")
        );
        const { result } = renderHook(() => useSignInFlow());

        // Mock console.error to avoid noise in test output
        const consoleErrorSpy = vi
          .spyOn(console, "error")
          .mockImplementation(() => {});

        let sendResult;
        await act(async () => {
          sendResult = await result.current.handleSendOtp("test@example.com");
        });

        expect(mockToastError).toHaveBeenCalledWith("发送验证码失败，请重试");
        expect(sendResult).toBe(false);
        expect(consoleErrorSpy).toHaveBeenCalledWith(
          "发送验证码异常:",
          expect.any(Error)
        );

        consoleErrorSpy.mockRestore();
      });
    });
  });

  describe("Loading State", () => {
    it("should set loading state during password login", async () => {
      mockValidateAccount.mockReturnValue({
        isPhone: true,
        isEmail: false,
        isValid: true,
      });
      mockSignInPhone.mockImplementation(
        () =>
          new Promise(resolve =>
            setTimeout(() => resolve({ error: null }), 100)
          )
      );
      const { result } = renderHook(() => useSignInFlow());

      const mockPasswordData: PasswordLoginData = {
        account: "+8613800138000",
        password: "SecureP@ssw0rd",
        agreedToTerms: true,
      };

      act(() => {
        result.current.handlePasswordLogin(mockPasswordData);
      });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(true);
      });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });
    });

    it("should set loading state during OTP login", async () => {
      mockValidateAccount.mockReturnValue({
        isPhone: true,
        isEmail: false,
        isValid: true,
      });
      mockPhoneNumberVerify.mockImplementation(
        () =>
          new Promise(resolve =>
            setTimeout(() => resolve({ error: null }), 100)
          )
      );
      const { result } = renderHook(() => useSignInFlow());

      const mockOtpData: OtpLoginData = {
        account: "+8613800138000",
        otp: "123456",
        agreedToTerms: true,
      };

      act(() => {
        result.current.handleOtpLogin(mockOtpData);
      });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(true);
      });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });
    });

    it("should set loading state during OTP sending", async () => {
      mockValidateAccount.mockReturnValue({
        isPhone: true,
        isEmail: false,
        isValid: true,
      });
      mockPhoneNumberSendOtp.mockImplementation(
        () =>
          new Promise(resolve =>
            setTimeout(() => resolve({ error: null }), 100)
          )
      );
      const { result } = renderHook(() => useSignInFlow());

      act(() => {
        result.current.handleSendOtp("+8613800138000");
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
