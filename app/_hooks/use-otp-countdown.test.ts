import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { useOtpCountdown } from "./use-otp-countdown";

describe("useOtpCountdown", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe("Initial State", () => {
    it("should initialize with countdown at 0", () => {
      const { result } = renderHook(() => useOtpCountdown());

      expect(result.current.countdown).toBe(0);
      expect(result.current.isActive).toBe(false);
    });
  });

  describe("start", () => {
    it("should start countdown with default duration (60s)", () => {
      const { result } = renderHook(() => useOtpCountdown());

      act(() => {
        result.current.start();
      });

      expect(result.current.countdown).toBe(60);
      expect(result.current.isActive).toBe(true);
    });

    it("should start countdown with custom duration", () => {
      const { result } = renderHook(() => useOtpCountdown({ duration: 30 }));

      act(() => {
        result.current.start();
      });

      expect(result.current.countdown).toBe(30);
      expect(result.current.isActive).toBe(true);
    });

    it("should decrement countdown every second", () => {
      const { result } = renderHook(() => useOtpCountdown());

      act(() => {
        result.current.start();
      });

      expect(result.current.countdown).toBe(60);

      act(() => {
        vi.advanceTimersByTime(1000);
      });

      expect(result.current.countdown).toBe(59);

      // Advance one second at a time to trigger each timeout
      for (let i = 0; i < 3; i++) {
        act(() => {
          vi.advanceTimersByTime(1000);
        });
      }

      expect(result.current.countdown).toBe(56);
    });

    it("should stop at 0 and set isActive to false", () => {
      const { result } = renderHook(() => useOtpCountdown({ duration: 3 }));

      act(() => {
        result.current.start();
      });

      expect(result.current.isActive).toBe(true);

      // Advance one second at a time
      for (let i = 0; i < 3; i++) {
        act(() => {
          vi.advanceTimersByTime(1000);
        });
      }

      expect(result.current.countdown).toBe(0);
      expect(result.current.isActive).toBe(false);
    });
  });

  describe("reset", () => {
    it("should reset countdown to 0", () => {
      const { result } = renderHook(() => useOtpCountdown());

      act(() => {
        result.current.start();
      });

      expect(result.current.countdown).toBe(60);

      act(() => {
        result.current.reset();
      });

      expect(result.current.countdown).toBe(0);
      expect(result.current.isActive).toBe(false);
    });

    it("should stop the timer when reset", () => {
      const { result } = renderHook(() => useOtpCountdown());

      act(() => {
        result.current.start();
      });

      // Advance 2 seconds one at a time
      for (let i = 0; i < 2; i++) {
        act(() => {
          vi.advanceTimersByTime(1000);
        });
      }

      expect(result.current.countdown).toBe(58);

      act(() => {
        result.current.reset();
      });

      act(() => {
        vi.advanceTimersByTime(2000);
      });

      // Should stay at 0 after reset
      expect(result.current.countdown).toBe(0);
    });
  });

  describe("restart", () => {
    it("should allow restarting after countdown completes", () => {
      const { result } = renderHook(() => useOtpCountdown({ duration: 2 }));

      act(() => {
        result.current.start();
      });

      // Advance 2 seconds one at a time
      for (let i = 0; i < 2; i++) {
        act(() => {
          vi.advanceTimersByTime(1000);
        });
      }

      expect(result.current.countdown).toBe(0);

      act(() => {
        result.current.start();
      });

      expect(result.current.countdown).toBe(2);
      expect(result.current.isActive).toBe(true);
    });
  });
});
