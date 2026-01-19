import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { UiProvider } from "../../platform";
import type { UserMenuProps } from "./user-menu";
import { UserMenu } from "./user-menu";

// Create mock Link component
const MockLink = ({
  children,
  href,
  ...props
}: {
  children: React.ReactNode;
  href: string;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}) => (
  <a href={href} {...props}>
    {children}
  </a>
);

// Helper to render UserMenu with mock Link adapter
const renderUserMenu = (props: Partial<UserMenuProps> = {}) => {
  const defaultProps: UserMenuProps = {
    session: null,
    isPending: false,
    onSignOut: vi.fn(),
    signInHref: "/auth/sign-in",
    signUpHref: "/auth/sign-up",
    userInfoHref: "/home/info",
    walletsHref: "/home/wallets",
    passengersHref: "/home/passengers",
    ...props,
  };

  return render(<UserMenu {...defaultProps} />, {
    wrapper: ({ children }) => (
      <UiProvider components={{ Link: MockLink }}>{children}</UiProvider>
    ),
  });
};
describe("UserMenu Component", () => {
  describe("when user is logged in", () => {
    const mockSession = {
      id: "user-123",
      name: "张三",
      email: "zhangsan@example.com",
      image: "https://github.com/shadcn.png",
    };

    it("should display standardized text '尊敬的用户' instead of username", () => {
      renderUserMenu({ session: mockSession });

      // Should show "尊敬的用户" in collapsed state
      expect(screen.getByText("尊敬的用户")).toBeInTheDocument();

      // Should NOT show the actual username "张三" in collapsed state
      const usernameElements = screen.queryAllByText("张三");
      expect(usernameElements.length).toBe(0);
    });

    it("should display ChevronDown icon with correct styling", () => {
      const { container } = renderUserMenu({ session: mockSession });

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
      const { container } = renderUserMenu({ session: mockSession });

      // Find Link element
      const linkElement = container.querySelector('a[href="/home/info"]');
      expect(linkElement).toBeInTheDocument();

      // Link should contain the trigger content
      expect(linkElement).toHaveTextContent("尊敬的用户");
    });

    it("should render avatar with user initials as fallback", () => {
      renderUserMenu({ session: mockSession });

      // Avatar fallback should show initials "张" for "张三"
      // Check that the avatar fallback text is rendered
      expect(screen.getByText("张")).toBeInTheDocument();
    });
  });

  describe("when user is not logged in", () => {
    it("should display Sign In and Sign Up buttons", () => {
      renderUserMenu({ session: null });

      expect(screen.getByRole("link", { name: /登录/i })).toBeInTheDocument();
      expect(screen.getByRole("link", { name: /注册/i })).toBeInTheDocument();
    });

    it("should NOT display '尊敬的用户' text", () => {
      renderUserMenu({ session: null });

      expect(screen.queryByText("尊敬的用户")).not.toBeInTheDocument();
    });

    it("should render links with correct hrefs", () => {
      const { container } = renderUserMenu({ session: null });

      const signInLink = container.querySelector('a[href="/auth/sign-in"]');
      expect(signInLink).toBeInTheDocument();

      const signUpLink = container.querySelector('a[href="/auth/sign-up"]');
      expect(signUpLink).toBeInTheDocument();
    });
  });

  describe("when session is loading", () => {
    it("should display loading skeleton", () => {
      const { container } = renderUserMenu({ isPending: true });

      // Find skeleton loader
      const skeleton = container.querySelector(".animate-pulse");
      expect(skeleton).toBeInTheDocument();
    });

    it("should NOT display login buttons during loading", () => {
      renderUserMenu({ isPending: true });

      expect(
        screen.queryByRole("link", { name: /登录/i })
      ).not.toBeInTheDocument();
      expect(
        screen.queryByRole("link", { name: /注册/i })
      ).not.toBeInTheDocument();
    });
  });

  describe("when user has no name (anonymous)", () => {
    it("should still display '尊敬的用户' text", () => {
      const sessionWithoutName = {
        id: "user-456",
        email: "anonymous@example.com",
      };

      renderUserMenu({ session: sessionWithoutName });

      expect(screen.getByText("尊敬的用户")).toBeInTheDocument();
    });

    it("should display 'A' as avatar fallback for anonymous users", () => {
      const sessionWithoutName = {
        id: "user-456",
        email: "anonymous@example.com",
      };

      renderUserMenu({ session: sessionWithoutName });

      // Avatar fallback should show "A" for anonymous
      expect(screen.getByText("A")).toBeInTheDocument();
    });
  });

  describe("custom hrefs", () => {
    it("should use custom hrefs when provided", () => {
      const customHrefs = {
        signInHref: "/custom/login",
        signUpHref: "/custom/register",
        userInfoHref: "/custom/profile",
        walletsHref: "/custom/wallet",
        passengersHref: "/custom/passengers",
      };

      const { container } = renderUserMenu({
        session: null,
        ...customHrefs,
      });

      const signInLink = container.querySelector('a[href="/custom/login"]');
      expect(signInLink).toBeInTheDocument();

      const signUpLink = container.querySelector('a[href="/custom/register"]');
      expect(signUpLink).toBeInTheDocument();
    });
  });
});
