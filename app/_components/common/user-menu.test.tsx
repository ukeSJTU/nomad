import { render, screen } from "@testing-library/react";
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

// Mock Next.js Link component
vi.mock("next/link", () => ({
  default: ({
    children,
    href,
    ...props
  }: {
    children: React.ReactNode;
    href: string;
  }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

// Mock auth client
const mockUseSession = vi.fn();
vi.mock("@/lib/auth/client", () => ({
  authClient: {
    useSession: () => mockUseSession(),
    signOut: vi.fn(),
  },
}));

describe("UserMenu Component", () => {
  describe("when user is logged in", () => {
    const mockSession = {
      user: {
        id: "user-123",
        name: "张三",
        email: "zhangsan@example.com",
        image: "https://github.com/shadcn.png",
      },
      session: {
        token: "mock-token",
        expiresAt: new Date(Date.now() + 86400000),
      },
    };

    it("should display standardized text '尊敬的用户' instead of username", () => {
      mockUseSession.mockReturnValue({
        data: mockSession,
        isPending: false,
      });

      render(<UserMenu />);

      // Should show "尊敬的用户" in collapsed state
      expect(screen.getByText("尊敬的用户")).toBeInTheDocument();

      // Should NOT show the actual username "张三" in collapsed state
      const usernameElements = screen.queryAllByText("张三");
      expect(usernameElements.length).toBe(0);
    });

    it("should display ChevronDown icon with correct styling", () => {
      mockUseSession.mockReturnValue({
        data: mockSession,
        isPending: false,
      });

      const { container } = render(<UserMenu />);

      // Find ChevronDown icon by checking for lucide-react svg
      const chevronIcon = container.querySelector(
        'svg[class*="lucide-chevron-down"]'
      );
      expect(chevronIcon).toBeInTheDocument();

      // Check icon has correct size and color classes
      expect(chevronIcon).toHaveClass("size-3.5");
      expect(chevronIcon).toHaveClass("text-muted-foreground");
    });

    it("should wrap trigger area in Link component pointing to /home/info", () => {
      mockUseSession.mockReturnValue({
        data: mockSession,
        isPending: false,
      });

      const { container } = render(<UserMenu />);

      // Find Link element
      const linkElement = container.querySelector('a[href="/home/info"]');
      expect(linkElement).toBeInTheDocument();

      // Link should contain the trigger content
      expect(linkElement).toHaveTextContent("尊敬的用户");
    });

    it("should render avatar with user initials as fallback", () => {
      mockUseSession.mockReturnValue({
        data: mockSession,
        isPending: false,
      });

      render(<UserMenu />);

      // Avatar fallback should show initials "张" for "张三"
      // Check that the avatar fallback text is rendered
      expect(screen.getByText("张")).toBeInTheDocument();
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

    it("should NOT display '尊敬的用户' text", () => {
      mockUseSession.mockReturnValue({
        data: null,
        isPending: false,
      });

      render(<UserMenu />);

      expect(screen.queryByText("尊敬的用户")).not.toBeInTheDocument();
    });
  });

  describe("when session is loading", () => {
    it("should display loading skeleton", () => {
      mockUseSession.mockReturnValue({
        data: null,
        isPending: true,
      });

      const { container } = render(<UserMenu />);

      // Find skeleton loader
      const skeleton = container.querySelector(".animate-pulse");
      expect(skeleton).toBeInTheDocument();
    });
  });

  describe("when user has no name (anonymous)", () => {
    it("should still display '尊敬的用户' text", () => {
      const sessionWithoutName = {
        user: {
          id: "user-456",
          email: "anonymous@example.com",
        },
        session: {
          token: "mock-token",
          expiresAt: new Date(Date.now() + 86400000),
        },
      };

      mockUseSession.mockReturnValue({
        data: sessionWithoutName,
        isPending: false,
      });

      render(<UserMenu />);

      expect(screen.getByText("尊敬的用户")).toBeInTheDocument();
    });

    it("should display 'A' as avatar fallback for anonymous users", () => {
      const sessionWithoutName = {
        user: {
          id: "user-456",
          email: "anonymous@example.com",
        },
        session: {
          token: "mock-token",
          expiresAt: new Date(Date.now() + 86400000),
        },
      };

      mockUseSession.mockReturnValue({
        data: sessionWithoutName,
        isPending: false,
      });

      render(<UserMenu />);

      // Avatar fallback should show "A" for anonymous
      expect(screen.getByText("A")).toBeInTheDocument();
    });
  });
});
