import { act, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

type MockTurnstileProps = {
  siteKey: string;
  options: {
    theme: "light" | "dark";
  };
  onSuccess: (token: string) => void;
  onError: () => void;
  onExpire: () => void;
};

const turnstileProps: { current: MockTurnstileProps | null } = {
  current: null,
};

let resolvedThemeValue: "light" | "dark" = "light";

vi.mock("@marsidev/react-turnstile", () => ({
  Turnstile: (props: MockTurnstileProps) => {
    turnstileProps.current = props;
    return <div data-testid="turnstile-mock" />;
  },
}));

vi.mock("next-themes", () => ({
  useTheme: () => ({ resolvedTheme: resolvedThemeValue }),
}));

import { TurnstileWidget } from "./turnstile-widget";

const ORIGINAL_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

describe("TurnstileWidget", () => {
  beforeEach(() => {
    resolvedThemeValue = "light";
    turnstileProps.current = null;
  });

  afterEach(() => {
    if (ORIGINAL_SITE_KEY === undefined) {
      delete process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
    } else {
      process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY = ORIGINAL_SITE_KEY;
    }
  });

  it("renders the Turnstile component with the default theme", () => {
    render(<TurnstileWidget onSuccess={vi.fn()} />);

    expect(screen.getByTestId("turnstile-mock")).toBeInTheDocument();
    expect(turnstileProps.current?.options.theme).toBe("light");
  });

  it("calls onSuccess when a token is received", () => {
    const onSuccess = vi.fn();
    render(<TurnstileWidget onSuccess={onSuccess} />);

    act(() => {
      turnstileProps.current?.onSuccess("token-123");
    });

    expect(onSuccess).toHaveBeenCalledWith("token-123");
  });

  it("calls onError when the widget reports an error", () => {
    const onError = vi.fn();
    render(<TurnstileWidget onSuccess={vi.fn()} onError={onError} />);

    act(() => {
      turnstileProps.current?.onError();
    });

    expect(onError).toHaveBeenCalled();
  });

  it("calls onExpire when the token expires", () => {
    const onExpire = vi.fn();
    render(<TurnstileWidget onSuccess={vi.fn()} onExpire={onExpire} />);

    act(() => {
      turnstileProps.current?.onExpire();
    });

    expect(onExpire).toHaveBeenCalled();
  });

  it("re-renders the Turnstile widget when the theme changes", async () => {
    const onSuccess = vi.fn();
    const { rerender } = render(<TurnstileWidget onSuccess={onSuccess} />);

    expect(turnstileProps.current?.options.theme).toBe("light");

    resolvedThemeValue = "dark";
    rerender(<TurnstileWidget onSuccess={onSuccess} />);

    await waitFor(() => {
      expect(turnstileProps.current?.options.theme).toBe("dark");
    });
  });

  it("uses NEXT_PUBLIC_TURNSTILE_SITE_KEY when provided", () => {
    process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY = "public-site-key";
    render(<TurnstileWidget onSuccess={vi.fn()} />);

    expect(turnstileProps.current?.siteKey).toBe("public-site-key");
  });
});
