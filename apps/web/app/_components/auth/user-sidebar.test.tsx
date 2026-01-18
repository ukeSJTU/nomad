import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { usePathname, useRouter } from "next/navigation";
import { describe, expect, it, vi } from "vitest";

import UserSidebar from "./user-sidebar";

// Mock next/navigation
vi.mock("next/navigation", () => ({
  usePathname: vi.fn(),
  useRouter: vi.fn(),
}));

// Mock sonner toast
vi.mock("sonner", () => ({
  toast: {
    info: vi.fn(),
  },
}));

describe("UserSidebar", () => {
  const mockPush = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useRouter).mockReturnValue({
      push: mockPush,
    } as ReturnType<typeof useRouter>);
  });
  describe("Basic Rendering", () => {
    it("renders all top-level menu items", () => {
      vi.mocked(usePathname).mockReturnValue("/home");

      render(<UserSidebar />);

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
      vi.mocked(usePathname).mockReturnValue("/home");

      render(<UserSidebar />);

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
      vi.mocked(usePathname).mockReturnValue("/home/orders");

      render(<UserSidebar />);

      const ordersButton = screen.getByText("订单");
      // Check that the button exists and is visible
      expect(ordersButton).toBeInTheDocument();
    });
    it("highlights menu item when on sub-path", () => {
      vi.mocked(usePathname).mockReturnValue("/home/passengers/new");

      render(<UserSidebar />);

      // Should find and highlight "常用旅客信息"
      const passengersButton = screen.getByText("常用旅客信息");
      expect(passengersButton).toBeInTheDocument();
    });

    it("highlights menu item when editing an entity", () => {
      vi.mocked(usePathname).mockReturnValue(
        "/home/passengers/7a90dab0-c1e9-492a-9409-a45b8cae1d34/edit"
      );

      render(<UserSidebar />);

      const passengersButton = screen.getByText("常用旅客信息");
      expect(passengersButton).toBeInTheDocument();
    });

    it("highlights 我的信息 when on /home/info", () => {
      vi.mocked(usePathname).mockReturnValue("/home/info");

      render(<UserSidebar />);

      const infoButton = screen.getByText("我的信息");
      expect(infoButton).toBeInTheDocument();
    });
  });

  describe("Collapsible Expansion Logic", () => {
    it("auto-expands parent when child path is active", () => {
      vi.mocked(usePathname).mockReturnValue("/home/passengers");

      render(<UserSidebar />);

      // "常用信息" should be expanded automatically
      expect(screen.getByText("常用旅客信息")).toBeInTheDocument();
      expect(screen.getByText("常用联系人")).toBeInTheDocument();
    });

    it("auto-expands parent when on child sub-path", () => {
      vi.mocked(usePathname).mockReturnValue("/home/passengers/new");

      render(<UserSidebar />);

      // "常用信息" should be expanded automatically
      expect(screen.getByText("常用旅客信息")).toBeInTheDocument();
      expect(screen.getByText("常用联系人")).toBeInTheDocument();
      expect(screen.getByText("常用报销凭证")).toBeInTheDocument();
      expect(screen.getByText("常用地址")).toBeInTheDocument();
    });

    it("auto-expands parent when on deeply nested child path", () => {
      vi.mocked(usePathname).mockReturnValue(
        "/home/passengers/7a90dab0-c1e9-492a-9409-a45b8cae1d34/edit"
      );

      render(<UserSidebar />);

      // "常用信息" should be expanded automatically
      expect(screen.getByText("常用旅客信息")).toBeInTheDocument();
    });

    it("auto-expands 个人中心 when on /home/security", () => {
      vi.mocked(usePathname).mockReturnValue("/home/security");

      render(<UserSidebar />);

      expect(screen.getByText("我的信息")).toBeInTheDocument();
      expect(screen.getByText("绑定和关联")).toBeInTheDocument();
      expect(screen.getByText("账户安全")).toBeInTheDocument();
      expect(screen.getByText("我的社区主页")).toBeInTheDocument();
    });

    it("can manually expand and collapse parent items", async () => {
      vi.mocked(usePathname).mockReturnValue("/home");

      render(<UserSidebar />);

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
    it("shows toast when clicking unimplemented feature", async () => {
      const { toast } = await import("sonner");
      vi.mocked(usePathname).mockReturnValue("/home");

      render(<UserSidebar />);

      const messagesButton = screen.getByText("我的消息");
      await userEvent.click(messagesButton);

      expect(toast.info).toHaveBeenCalledWith("功能开发中", {
        description: "我的消息 功能正在开发中,敬请期待!",
      });
    });

    it("shows toast for unimplemented child items", async () => {
      const { toast } = await import("sonner");
      vi.mocked(usePathname).mockReturnValue("/home");

      render(<UserSidebar />);

      // Expand "常用信息"
      const commonInfoButton = screen.getByText("常用信息");
      await userEvent.click(commonInfoButton);

      await waitFor(() => {
        expect(screen.getByText("常用联系人")).toBeInTheDocument();
      });

      // Click unimplemented child
      const contactsButton = screen.getByText("常用联系人");
      await userEvent.click(contactsButton);

      expect(toast.info).toHaveBeenCalledWith("功能开发中", {
        description: "常用联系人 功能正在开发中,敬请期待!",
      });
    });
  });

  describe("Navigation", () => {
    it("calls router.push when clicking implemented items", async () => {
      vi.mocked(usePathname).mockReturnValue("/home/orders");

      render(<UserSidebar />);

      const ordersButton = screen.getByText("订单");
      await userEvent.click(ordersButton);

      expect(mockPush).toHaveBeenCalledWith("/home/orders");
    });

    it("calls router.push for child items", async () => {
      vi.mocked(usePathname).mockReturnValue("/home/passengers");

      render(<UserSidebar />);

      // Should auto-expand
      const passengersButton = screen.getByText("常用旅客信息");
      await userEvent.click(passengersButton);

      expect(mockPush).toHaveBeenCalledWith("/home/passengers");
    });
  });

  describe("Edge Cases", () => {
    it("handles root /home path correctly - highlights 我的携程首页", () => {
      vi.mocked(usePathname).mockReturnValue("/home");

      render(<UserSidebar />);

      // When on /home path, "我的携程首页" should be active/highlighted
      const homeButton = screen.getByText("我的携程首页");
      expect(homeButton).toBeInTheDocument();
    });

    it("handles non-matching path gracefully", () => {
      vi.mocked(usePathname).mockReturnValue("/some/other/path");

      render(<UserSidebar />);

      expect(screen.getByText("我的携程首页")).toBeInTheDocument();
      expect(screen.getByText("订单")).toBeInTheDocument();
    });

    it("does not expand parent when path only partially matches", () => {
      // /home/pass should not match /home/passengers
      vi.mocked(usePathname).mockReturnValue("/home/pass");

      render(<UserSidebar />);

      // Should not auto-expand "常用信息"
      expect(screen.queryByText("常用旅客信息")).not.toBeInTheDocument();
    });
  });
});
