import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import UserMenu from "@/components/common/user-menu";

// Mock next-themes
vi.mock("next-themes", () => ({
  useTheme: () => ({ theme: "light", setTheme: vi.fn() }),
}));

// Mock Next.js navigation
const mockPush = vi.fn();
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
    replace: vi.fn(),
    prefetch: vi.fn(),
  }),
  usePathname: () => "/",
}));

// Mock auth actions + session hook
const mockUseSession = vi.fn();
const mockSignOutAction = vi.fn();
vi.mock("@/hooks/use-client-session", () => ({
  useClientSession: () => mockUseSession(),
}));
vi.mock("@/app/_actions/auth", () => ({
  signOutAction: (...args: unknown[]) => mockSignOutAction(...args),
}));

describe("UserMenu Container", () => {
  describe("when user is logged in", () => {
    const mockSession = {
      id: "user-123",
      name: "张三",
      email: "zhangsan@example.com",
      image: "https://github.com/shadcn.png",
    };

    it("should pass session data to UI component", () => {
      mockUseSession.mockReturnValue({
        data: mockSession,
        isPending: false,
      });

      render(<UserMenu />);

      // Should show "尊敬的用户"
      expect(screen.getByText("尊敬的用户")).toBeInTheDocument();
    });

    it("should handle sign out action", async () => {
      const user = userEvent.setup();
      mockUseSession.mockReturnValue({
        data: mockSession,
        isPending: false,
      });

      render(<UserMenu />);

      // Hover over the user menu trigger to open the hover card
      const userMenuTrigger = screen.getByText("尊敬的用户");
      await user.hover(userMenuTrigger);

      // Wait for hover card to appear and find sign out button
      const signOutButton = await screen.findByText("退出登录");
      await user.click(signOutButton);

      // Wait for async action
      await new Promise(resolve => setTimeout(resolve, 0));

      expect(mockSignOutAction).toHaveBeenCalled();
      expect(mockPush).toHaveBeenCalledWith("/");
    });
  });

  describe("when user is not logged in", () => {
    it("should display Sign In and Sign Up buttons", () => {
      mockUseSession.mockReturnValue({
        data: null,
        isPending: false,
      });

      render(<UserMenu />);

      expect(screen.getByRole("link", { name: /登录/i })).toBeInTheDocument();
      expect(screen.getByRole("link", { name: /注册/i })).toBeInTheDocument();
    });
  });

  describe("when session is loading", () => {
    it("should display loading skeleton", () => {
      mockUseSession.mockReturnValue({
        data: null,
        isPending: true,
      });

      const { container } = render(<UserMenu />);

      const skeleton = container.querySelector(".animate-pulse");
      expect(skeleton).toBeInTheDocument();
    });
  });
});
