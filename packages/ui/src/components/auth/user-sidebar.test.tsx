import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { UserSidebar } from "./user-sidebar";
import type { UserSidebarMenuItem } from "./user-sidebar-types";

describe("UserSidebar", () => {
  const mockOnNavigate = vi.fn();
  const mockOnUnimplementedClick = vi.fn();

  const createMenuItems = (activePath: string): UserSidebarMenuItem[] => {
    // Helper to check if path is active
    const isActive = (href?: string): boolean => {
      if (!href) return false;
      return activePath === href || activePath.startsWith(`${href}/`);
    };

    const items: UserSidebarMenuItem[] = [
      { title: "我的携程首页", href: "#", isImplemented: false },
      {
        title: "订单",
        href: "/home/orders",
        isActive: isActive("/home/orders"),
      },
      {
        title: "我的消息",
        href: "/home/messages",
        isImplemented: false,
      },
      {
        title: "钱包",
        children: [
          {
            title: "我的钱包",
            href: "/home/wallets",
            isActive: isActive("/home/wallets"),
          },
          {
            title: "钱包安全设置",
            href: "/home/wallets/security",
            isImplemented: false,
          },
        ],
      },
      {
        title: "礼品卡",
        href: "/home/gift-cards",
        isImplemented: false,
      },
      { title: "优惠券", href: "/home/coupons", isImplemented: false },
      { title: "积分", href: "/home/points", isImplemented: false },
      {
        title: "我的收藏",
        href: "/home/favorites",
        isImplemented: false,
      },
      {
        title: "常用信息",
        children: [
          {
            title: "常用旅客信息",
            href: "/home/passengers",
            isActive: isActive("/home/passengers"),
          },
          {
            title: "常用联系人",
            href: "/home/contacts",
            isImplemented: false,
          },
          {
            title: "常用报销凭证",
            href: "/home/invoices",
            isImplemented: false,
          },
          {
            title: "常用地址",
            href: "/home/addresses",
            isImplemented: false,
          },
        ],
      },
      {
        title: "个人中心",
        children: [
          {
            title: "我的信息",
            href: "/home/info",
            isActive: isActive("/home/info"),
          },
          {
            title: "绑定和关联",
            href: "/home/accounts",
            isActive: isActive("/home/accounts"),
          },
          {
            title: "账户安全",
            href: "/home/security",
            isActive: isActive("/home/security"),
          },
          {
            title: "我的社区主页",
            href: "/home/community",
            isImplemented: false,
          },
        ],
      },
    ];

    return items;
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Basic Rendering", () => {
    it("renders all top-level menu items", () => {
      const items = createMenuItems("/home");

      render(
        <UserSidebar
          items={items}
          onNavigate={mockOnNavigate}
          onUnimplementedClick={mockOnUnimplementedClick}
        />
      );

      expect(screen.getByText("我的携程首页")).toBeInTheDocument();
      expect(screen.getByText("订单")).toBeInTheDocument();
      expect(screen.getByText("我的消息")).toBeInTheDocument();
      expect(screen.getByText("钱包")).toBeInTheDocument();
      expect(screen.getByText("礼品卡")).toBeInTheDocument();
      expect(screen.getByText("优惠券")).toBeInTheDocument();
      expect(screen.getByText("积分")).toBeInTheDocument();
      expect(screen.getByText("我的收藏")).toBeInTheDocument();
      expect(screen.getByText("常用信息")).toBeInTheDocument();
      expect(screen.getByText("个人中心")).toBeInTheDocument();
    });

    it("renders child items when parent is expanded", async () => {
      const items = createMenuItems("/home");

      render(
        <UserSidebar
          items={items}
          onNavigate={mockOnNavigate}
          onUnimplementedClick={mockOnUnimplementedClick}
        />
      );

      // Click to expand "常用信息"
      const commonInfoButton = screen.getByText("常用信息");
      await userEvent.click(commonInfoButton);

      // Wait for child items to appear
      await waitFor(() => {
        expect(screen.getByText("常用旅客信息")).toBeInTheDocument();
      });
      expect(screen.getByText("常用联系人")).toBeInTheDocument();
      expect(screen.getByText("常用报销凭证")).toBeInTheDocument();
      expect(screen.getByText("常用地址")).toBeInTheDocument();
    });
  });

  describe("Active State and Highlighting", () => {
    it("highlights active menu item - exact path match", () => {
      const items = createMenuItems("/home/orders");

      render(
        <UserSidebar
          items={items}
          onNavigate={mockOnNavigate}
          onUnimplementedClick={mockOnUnimplementedClick}
        />
      );

      const ordersButton = screen.getByText("订单");
      expect(ordersButton).toBeInTheDocument();
      expect(ordersButton.closest("button")).toHaveClass(
        "justify-start",
        "px-4"
      );
    });

    it("highlights menu item when on sub-path", () => {
      const items = createMenuItems("/home/passengers/new");

      render(
        <UserSidebar
          items={items}
          onNavigate={mockOnNavigate}
          onUnimplementedClick={mockOnUnimplementedClick}
        />
      );

      // Should find and highlight "常用旅客信息"
      const passengersButton = screen.getByText("常用旅客信息");
      expect(passengersButton).toBeInTheDocument();
    });

    it("highlights menu item when editing an entity", () => {
      const items = createMenuItems(
        "/home/passengers/7a90dab0-c1e9-492a-9409-a45b8cae1d34/edit"
      );

      render(
        <UserSidebar
          items={items}
          onNavigate={mockOnNavigate}
          onUnimplementedClick={mockOnUnimplementedClick}
        />
      );

      const passengersButton = screen.getByText("常用旅客信息");
      expect(passengersButton).toBeInTheDocument();
    });

    it("highlights 我的信息 when on /home/info", () => {
      const items = createMenuItems("/home/info");

      render(
        <UserSidebar
          items={items}
          onNavigate={mockOnNavigate}
          onUnimplementedClick={mockOnUnimplementedClick}
        />
      );

      const infoButton = screen.getByText("我的信息");
      expect(infoButton).toBeInTheDocument();
    });
  });

  describe("Collapsible Expansion Logic", () => {
    it("auto-expands parent when child path is active", () => {
      const items = createMenuItems("/home/passengers");

      render(
        <UserSidebar
          items={items}
          onNavigate={mockOnNavigate}
          onUnimplementedClick={mockOnUnimplementedClick}
        />
      );

      // "常用信息" should be expanded automatically
      expect(screen.getByText("常用旅客信息")).toBeInTheDocument();
      expect(screen.getByText("常用联系人")).toBeInTheDocument();
    });

    it("auto-expands parent when on child sub-path", () => {
      const items = createMenuItems("/home/passengers/new");

      render(
        <UserSidebar
          items={items}
          onNavigate={mockOnNavigate}
          onUnimplementedClick={mockOnUnimplementedClick}
        />
      );

      // "常用信息" should be expanded automatically
      expect(screen.getByText("常用旅客信息")).toBeInTheDocument();
      expect(screen.getByText("常用联系人")).toBeInTheDocument();
      expect(screen.getByText("常用报销凭证")).toBeInTheDocument();
      expect(screen.getByText("常用地址")).toBeInTheDocument();
    });

    it("auto-expands parent when on deeply nested child path", () => {
      const items = createMenuItems(
        "/home/passengers/7a90dab0-c1e9-492a-9409-a45b8cae1d34/edit"
      );

      render(
        <UserSidebar
          items={items}
          onNavigate={mockOnNavigate}
          onUnimplementedClick={mockOnUnimplementedClick}
        />
      );

      // "常用信息" should be expanded automatically
      expect(screen.getByText("常用旅客信息")).toBeInTheDocument();
    });

    it("auto-expands 个人中心 when on /home/security", () => {
      const items = createMenuItems("/home/security");

      render(
        <UserSidebar
          items={items}
          onNavigate={mockOnNavigate}
          onUnimplementedClick={mockOnUnimplementedClick}
        />
      );

      expect(screen.getByText("我的信息")).toBeInTheDocument();
      expect(screen.getByText("绑定和关联")).toBeInTheDocument();
      expect(screen.getByText("账户安全")).toBeInTheDocument();
      expect(screen.getByText("我的社区主页")).toBeInTheDocument();
    });

    it("can manually expand and collapse parent items", async () => {
      const items = createMenuItems("/home");

      render(
        <UserSidebar
          items={items}
          onNavigate={mockOnNavigate}
          onUnimplementedClick={mockOnUnimplementedClick}
        />
      );

      // Initially collapsed
      expect(screen.queryByText("我的钱包")).not.toBeInTheDocument();

      // Click to expand
      const walletButton = screen.getByText("钱包");
      await userEvent.click(walletButton);

      await waitFor(() => {
        expect(screen.getByText("我的钱包")).toBeInTheDocument();
      });
      expect(screen.getByText("钱包安全设置")).toBeInTheDocument();

      // Click to collapse
      await userEvent.click(walletButton);

      await waitFor(() => {
        expect(screen.queryByText("我的钱包")).not.toBeInTheDocument();
      });
    });
  });

  describe("Unimplemented Features", () => {
    it("calls onUnimplementedClick when clicking unimplemented feature", async () => {
      const items = createMenuItems("/home");

      render(
        <UserSidebar
          items={items}
          onNavigate={mockOnNavigate}
          onUnimplementedClick={mockOnUnimplementedClick}
        />
      );

      const messagesButton = screen.getByText("我的消息");
      await userEvent.click(messagesButton);

      expect(mockOnUnimplementedClick).toHaveBeenCalledWith("我的消息");
    });

    it("calls onUnimplementedClick for unimplemented child items", async () => {
      const items = createMenuItems("/home");

      render(
        <UserSidebar
          items={items}
          onNavigate={mockOnNavigate}
          onUnimplementedClick={mockOnUnimplementedClick}
        />
      );

      // Expand "常用信息"
      const commonInfoButton = screen.getByText("常用信息");
      await userEvent.click(commonInfoButton);

      await waitFor(() => {
        expect(screen.getByText("常用联系人")).toBeInTheDocument();
      });

      // Click unimplemented child
      const contactsButton = screen.getByText("常用联系人");
      await userEvent.click(contactsButton);

      expect(mockOnUnimplementedClick).toHaveBeenCalledWith("常用联系人");
    });
  });

  describe("Navigation", () => {
    it("calls onNavigate when clicking implemented items", async () => {
      const items = createMenuItems("/home/orders");

      render(
        <UserSidebar
          items={items}
          onNavigate={mockOnNavigate}
          onUnimplementedClick={mockOnUnimplementedClick}
        />
      );

      const ordersButton = screen.getByText("订单");
      await userEvent.click(ordersButton);

      expect(mockOnNavigate).toHaveBeenCalledWith("/home/orders");
    });

    it("calls onNavigate for child items", async () => {
      const items = createMenuItems("/home/passengers");

      render(
        <UserSidebar
          items={items}
          onNavigate={mockOnNavigate}
          onUnimplementedClick={mockOnUnimplementedClick}
        />
      );

      // Should auto-expand
      const passengersButton = screen.getByText("常用旅客信息");
      await userEvent.click(passengersButton);

      expect(mockOnNavigate).toHaveBeenCalledWith("/home/passengers");
    });
  });

  describe("Edge Cases", () => {
    it("handles non-matching path gracefully", () => {
      const items = createMenuItems("/some/other/path");

      render(
        <UserSidebar
          items={items}
          onNavigate={mockOnNavigate}
          onUnimplementedClick={mockOnUnimplementedClick}
        />
      );

      expect(screen.getByText("我的携程首页")).toBeInTheDocument();
      expect(screen.getByText("订单")).toBeInTheDocument();
    });

    it("does not expand parent when path only partially matches", () => {
      // /home/pass should not match /home/passengers
      const items = createMenuItems("/home/pass");

      render(
        <UserSidebar
          items={items}
          onNavigate={mockOnNavigate}
          onUnimplementedClick={mockOnUnimplementedClick}
        />
      );

      // Should not auto-expand "常用信息"
      expect(screen.queryByText("常用旅客信息")).not.toBeInTheDocument();
    });
  });
});
