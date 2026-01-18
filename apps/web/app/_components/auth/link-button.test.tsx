import { render, screen, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { toast } from "sonner";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { linkSocialAccountAction } from "@/app/_actions/auth";
import { LinkButton } from "./link-button";

// Mock dependencies
vi.mock("sonner", () => ({
  toast: {
    error: vi.fn(),
  },
}));

vi.mock("@/app/_actions/auth", () => ({
  linkSocialAccountAction: vi.fn(),
}));

vi.mock("@/infra/logging/client-logger", () => ({
  createClientLogger: () => ({
    error: vi.fn(),
  }),
}));

// Mock window.location
const originalLocation = window.location;

describe("LinkButton Container", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // @ts-expect-error - mocking window.location
    delete window.location;
    window.location = { href: "" } as Location;
  });

  afterEach(() => {
    window.location = originalLocation;
  });

  it("renders the UI component", () => {
    render(<LinkButton providerId="github" providerName="GitHub" />);
    expect(
      screen.getByRole("button", { name: "绑定账号" })
    ).toBeInTheDocument();
  });

  it("handles successful linking and redirects", async () => {
    const user = userEvent.setup();
    const mockUrl = "https://github.com/oauth/authorize";

    vi.mocked(linkSocialAccountAction).mockResolvedValue({
      success: true,
      data: { url: mockUrl },
    });

    render(<LinkButton providerId="github" providerName="GitHub" />);

    const button = screen.getByRole("button", { name: "绑定账号" });
    await user.click(button);

    await waitFor(() => {
      expect(linkSocialAccountAction).toHaveBeenCalledWith(
        "github",
        "/home/accounts"
      );
      expect(window.location.href).toBe(mockUrl);
    });
  });

  it("displays error toast when linking fails", async () => {
    const user = userEvent.setup();

    vi.mocked(linkSocialAccountAction).mockResolvedValue({
      success: false,
      error: "Account already linked",
    });

    render(<LinkButton providerId="github" providerName="GitHub" />);

    const button = screen.getByRole("button", { name: "绑定账号" });
    await user.click(button);

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(
        "Failed to link GitHub account",
        {
          description: "Account already linked",
        }
      );
    });
  });

  it("displays error toast when URL is missing", async () => {
    const user = userEvent.setup();

    vi.mocked(linkSocialAccountAction).mockResolvedValue({
      success: true,
      data: {},
    });

    render(<LinkButton providerId="google" providerName="Google" />);

    const button = screen.getByRole("button", { name: "绑定账号" });
    await user.click(button);

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(
        "Failed to link Google account",
        {
          description: "Please try again later",
        }
      );
    });
  });

  it("handles unexpected errors", async () => {
    const user = userEvent.setup();

    vi.mocked(linkSocialAccountAction).mockRejectedValue(
      new Error("Network error")
    );

    render(<LinkButton providerId="github" providerName="GitHub" />);

    const button = screen.getByRole("button", { name: "绑定账号" });
    await user.click(button);

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("Error linking GitHub account", {
        description: "An unexpected error occurred",
      });
    });
  });

  it("shows loading state while processing", async () => {
    const user = userEvent.setup();

    vi.mocked(linkSocialAccountAction).mockImplementation(
      () =>
        new Promise(resolve => {
          setTimeout(
            () => resolve({ success: true, data: { url: "https://test.com" } }),
            100
          );
        })
    );

    render(<LinkButton providerId="github" providerName="GitHub" />);

    const button = screen.getByRole("button", { name: "绑定账号" });
    await user.click(button);

    // Should show loading state
    expect(screen.getByRole("button", { name: "绑定中..." })).toBeDisabled();

    // Wait for completion
    await waitFor(() => {
      expect(window.location.href).toBe("https://test.com");
    });
  });
});
