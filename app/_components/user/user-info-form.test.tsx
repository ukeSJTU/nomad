import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useRouter } from "next/navigation";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { UserInfoForm } from "@/components/user/user-info-form";
import type { UserInfo } from "@/types/dto";

// Mock Next.js router
vi.mock("next/navigation", () => ({
  useRouter: vi.fn(),
}));

// Mock the child components
vi.mock("@/components/user/user-info-display", () => ({
  UserInfoDisplay: ({ onEdit }: { onEdit: () => void }) => (
    <div data-testid="user-info-display">
      <button onClick={onEdit}>编辑</button>
    </div>
  ),
}));

vi.mock("@/components/user/user-info-edit-form", () => ({
  UserInfoEditForm: ({
    onCancel,
    onSuccess,
  }: {
    onCancel: () => void;
    onSuccess: () => void;
  }) => (
    <div data-testid="user-info-edit-form">
      <button onClick={onCancel}>取消</button>
      <button onClick={onSuccess}>保存</button>
    </div>
  ),
}));

vi.mock("@/components/user/success-dialog", () => ({
  SuccessDialog: ({ open }: { open: boolean }) =>
    open ? <div data-testid="success-dialog">保存成功</div> : null,
}));

describe("UserInfoForm Component", () => {
  const mockUserData: UserInfo = {
    id: "user-123",
    name: "张三",
    nickname: "小张",
    email: "zhangsan@example.com",
    emailVerified: true,
    phoneNumber: "+8613800138000",
    phoneNumberVerified: true,
    gender: "male",
    birthday: "1990-01-01",
    image: null,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  };

  const mockRouter = {
    refresh: vi.fn(),
    push: vi.fn(),
    replace: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    prefetch: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useRouter).mockReturnValue(mockRouter);
  });

  describe("Display Mode", () => {
    it("should render UserInfoDisplay by default", () => {
      render(<UserInfoForm userData={mockUserData} />);
      expect(screen.getByTestId("user-info-display")).toBeInTheDocument();
    });

    it("should not show success dialog initially", () => {
      render(<UserInfoForm userData={mockUserData} />);
      expect(screen.queryByTestId("success-dialog")).not.toBeInTheDocument();
    });
  });

  describe("Mode Switching", () => {
    it("should switch to edit mode when edit is triggered", async () => {
      const user = userEvent.setup();
      render(<UserInfoForm userData={mockUserData} />);

      const editButton = screen.getByRole("button", { name: "编辑" });
      await user.click(editButton);

      expect(screen.getByTestId("user-info-edit-form")).toBeInTheDocument();
      expect(screen.queryByTestId("user-info-display")).not.toBeInTheDocument();
    });

    it("should switch back to display mode when cancel is triggered", async () => {
      const user = userEvent.setup();
      render(<UserInfoForm userData={mockUserData} />);

      // Switch to edit mode
      const editButton = screen.getByRole("button", { name: "编辑" });
      await user.click(editButton);

      // Cancel edit
      const cancelButton = screen.getByRole("button", { name: "取消" });
      await user.click(cancelButton);

      expect(screen.getByTestId("user-info-display")).toBeInTheDocument();
      expect(
        screen.queryByTestId("user-info-edit-form")
      ).not.toBeInTheDocument();
    });
  });

  describe("Success Flow", () => {
    it("should show success dialog and switch to display mode on successful save", async () => {
      const user = userEvent.setup();
      render(<UserInfoForm userData={mockUserData} />);

      // Switch to edit mode
      const editButton = screen.getByRole("button", { name: "编辑" });
      await user.click(editButton);

      // Trigger success
      const saveButton = screen.getByRole("button", { name: "保存" });
      await user.click(saveButton);

      await waitFor(() => {
        expect(screen.getByTestId("success-dialog")).toBeInTheDocument();
        expect(screen.getByTestId("user-info-display")).toBeInTheDocument();
        expect(
          screen.queryByTestId("user-info-edit-form")
        ).not.toBeInTheDocument();
      });
    });

    it("should refresh router on successful save", async () => {
      const user = userEvent.setup();
      render(<UserInfoForm userData={mockUserData} />);

      // Switch to edit mode
      const editButton = screen.getByRole("button", { name: "编辑" });
      await user.click(editButton);

      // Trigger success
      const saveButton = screen.getByRole("button", { name: "保存" });
      await user.click(saveButton);

      await waitFor(() => {
        expect(mockRouter.refresh).toHaveBeenCalledTimes(1);
      });
    });
  });
});
