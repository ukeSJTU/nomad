import { render, screen, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { toast } from "sonner";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { unlinkAccountAction } from "@/app/_actions/auth";
import { UnlinkButton } from "./unlink-button";

// Mock dependencies
vi.mock("sonner", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

vi.mock("@/app/_actions/auth", () => ({
  unlinkAccountAction: vi.fn(),
}));

describe("UnlinkButton Container", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the UI component", () => {
    render(<UnlinkButton providerId="github" />);
    expect(
      screen.getByRole("button", { name: "取消绑定" })
    ).toBeInTheDocument();
  });

  it("handles successful unlinking", async () => {
    const user = userEvent.setup();

    vi.mocked(unlinkAccountAction).mockResolvedValue({
      success: true,
      message: "Account unlinked successfully",
    });

    render(<UnlinkButton providerId="github" />);

    const button = screen.getByRole("button", { name: "取消绑定" });
    await user.click(button);

    await waitFor(() => {
      expect(unlinkAccountAction).toHaveBeenCalledWith("github");
      expect(toast.success).toHaveBeenCalledWith(
        "Account unlinked successfully"
      );
    });
  });

  it("displays error toast when unlinking fails", async () => {
    const user = userEvent.setup();

    vi.mocked(unlinkAccountAction).mockResolvedValue({
      success: false,
      error: "Cannot unlink the last account",
    });

    render(<UnlinkButton providerId="google" />);

    const button = screen.getByRole("button", { name: "取消绑定" });
    await user.click(button);

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(
        "Cannot unlink the last account"
      );
    });
  });

  it("shows loading state while processing", async () => {
    const user = userEvent.setup();

    vi.mocked(unlinkAccountAction).mockImplementation(
      () =>
        new Promise(resolve => {
          setTimeout(() => resolve({ success: true, message: "Success" }), 100);
        })
    );

    render(<UnlinkButton providerId="github" />);

    const button = screen.getByRole("button", { name: "取消绑定" });
    await user.click(button);

    // Should show loading state
    await waitFor(() => {
      expect(screen.getByRole("button", { name: "解绑中..." })).toBeDisabled();
    });

    // Wait for completion
    await waitFor(() => {
      expect(toast.success).toHaveBeenCalled();
    });
  });

  it("disables button during loading", async () => {
    const user = userEvent.setup();

    vi.mocked(unlinkAccountAction).mockImplementation(
      () => new Promise(resolve => setTimeout(resolve, 100))
    );

    render(<UnlinkButton providerId="github" />);

    const button = screen.getByRole("button", { name: "取消绑定" });
    await user.click(button);

    await waitFor(() => {
      const loadingButton = screen.getByRole("button");
      expect(loadingButton).toBeDisabled();
    });
  });
});
