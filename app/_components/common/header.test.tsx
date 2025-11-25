import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import Header from "@/components/common/header";

// Mock next-themes
vi.mock("next-themes", () => ({
  useTheme: () => ({ theme: "light", setTheme: vi.fn() }),
}));

// Mock Next.js navigation
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
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

// Mock Next.js Image component
vi.mock("next/image", () => ({
  default: ({
    src,
    alt,
    ...props
  }: {
    src: string;
    alt: string;
    width?: number;
    height?: number;
  }) => <img src={src} alt={alt} {...props} />,
}));

// Mock auth client
vi.mock("@/lib/auth/client", () => ({
  authClient: {
    useSession: () => ({
      data: null,
      isPending: false,
    }),
    signOut: vi.fn(),
  },
}));

// Mock child components
vi.mock("@/components/common/search-bar", () => ({
  default: () => <div data-testid="search-bar">Search Bar</div>,
}));

vi.mock("@/components/common/user-menu", () => ({
  default: () => <div data-testid="user-menu">User Menu</div>,
}));

describe("Header Component", () => {
  it("should render the header element", () => {
    const { container } = render(<Header />);
    const header = container.querySelector("header");
    expect(header).toBeInTheDocument();
  });

  it("should display the logo and brand name", () => {
    render(<Header />);

    // Check for logo image
    const logo = screen.getByAltText("Nomad Logo");
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute("src", "/logo.png");

    // Check for brand name
    expect(screen.getByText("Nomad")).toBeInTheDocument();
  });

  it("should render the search bar component", () => {
    render(<Header />);
    expect(screen.getByTestId("search-bar")).toBeInTheDocument();
  });

  it("should render the user menu component", () => {
    render(<Header />);
    expect(screen.getByTestId("user-menu")).toBeInTheDocument();
  });

  it("should display '我的订单' (My Orders) button", () => {
    render(<Header />);
    expect(screen.getByText("我的订单")).toBeInTheDocument();
  });

  it("should display '联系客服' (Contact Service) button", () => {
    render(<Header />);
    expect(screen.getByText("联系客服")).toBeInTheDocument();
  });

  it("should render theme toggle button with accessibility label", () => {
    render(<Header />);
    const themeButton = screen.getByLabelText("Toggle theme");
    expect(themeButton).toBeInTheDocument();
  });

  it("should have correct header structure with three main sections", () => {
    const { container } = render(<Header />);

    // Header should have a container with flex layout
    const headerContainer = container.querySelector("header > div");
    expect(headerContainer).toBeInTheDocument();

    // Check for logo link (left section)
    const logoLink = screen.getByRole("link", { name: /nomad logo/i });
    expect(logoLink).toHaveAttribute("href", "/");
  });

  it("should have multiple separators for visual structure", () => {
    const { container } = render(<Header />);

    // Check for separator elements
    const separators = container.querySelectorAll(
      '[data-orientation="vertical"]'
    );
    expect(separators.length).toBeGreaterThan(0);
  });
});
