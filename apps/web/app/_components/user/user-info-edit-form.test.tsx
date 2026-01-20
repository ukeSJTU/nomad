import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { UserInfoEditForm } from "@/components/user/user-info-edit-form";
import type { UserInfo } from "@/types/dto";

// Mock the updateUserInfoAction
vi.mock("@/app/_actions", () => ({
  updateUserInfoAction: vi.fn(),
}));

// Mock the UI component from packages/ui
vi.mock("@ukesjtu/nomad-ui/components/user", () => ({
  UserInfoEditForm: vi.fn(
    ({ control, errors, onSubmit, onCancel, isLoading, errorMessage }) => (
      <div data-testid="user-info-edit-form">
        <form onSubmit={onSubmit}>
          <button type="submit" disabled={isLoading}>
            {isLoading ? "保存中..." : "保存"}
          </button>
          <button type="button" onClick={onCancel} disabled={isLoading}>
            取消
          </button>
          {errorMessage && (
            <div data-testid="error-message">{errorMessage}</div>
          )}
        </form>
      </div>
    )
  ),
}));

describe("UserInfoEditForm Container", () => {
  const mockUserData: UserInfo = {
    id: "user-123",
    name: "张三",
    nickname: "小张",
    email: "zhangsan@example.com",
    emailVerified: true,
    phoneNumber: "13800138000",
    phoneNumberVerified: true,
    gender: "male",
    birthday: "1990-01-01",
    image: null,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  };

  const defaultProps = {
    userData: mockUserData,
    onCancel: vi.fn(),
    onSuccess: vi.fn(),
  };

  describe("Rendering", () => {
    it("should render the UI component", () => {
      render(<UserInfoEditForm {...defaultProps} />);
      expect(screen.getByTestId("user-info-edit-form")).toBeInTheDocument();
    });
  });

  describe("Form Submission", () => {
    it("should call updateUserInfoAction on form submit", async () => {
      const user = userEvent.setup();
      const { updateUserInfoAction } = await import("@/app/_actions");
      vi.mocked(updateUserInfoAction).mockResolvedValue({
        success: true,
        data: undefined,
      });

      render(<UserInfoEditForm {...defaultProps} />);

      const saveButton = screen.getByRole("button", { name: "保存" });
      await user.click(saveButton);

      await waitFor(() => {
        expect(updateUserInfoAction).toHaveBeenCalled();
      });
    });

    it("should call onSuccess when update succeeds", async () => {
      const user = userEvent.setup();
      const onSuccess = vi.fn();
      const { updateUserInfoAction } = await import("@/app/_actions");
      vi.mocked(updateUserInfoAction).mockResolvedValue({
        success: true,
        data: undefined,
      });

      render(<UserInfoEditForm {...defaultProps} onSuccess={onSuccess} />);

      const saveButton = screen.getByRole("button", { name: "保存" });
      await user.click(saveButton);

      await waitFor(() => {
        expect(onSuccess).toHaveBeenCalledTimes(1);
      });
    });

    it("should display error message when update fails", async () => {
      const user = userEvent.setup();
      const { updateUserInfoAction } = await import("@/app/_actions");
      vi.mocked(updateUserInfoAction).mockResolvedValue({
        success: false,
        error: "更新失败",
      });

      render(<UserInfoEditForm {...defaultProps} />);

      const saveButton = screen.getByRole("button", { name: "保存" });
      await user.click(saveButton);

      await waitFor(() => {
        expect(screen.getByTestId("error-message")).toHaveTextContent(
          "更新失败"
        );
      });
    });
  });

  describe("Cancel Action", () => {
    it("should call onCancel when cancel button is clicked", async () => {
      const user = userEvent.setup();
      const onCancel = vi.fn();
      render(<UserInfoEditForm {...defaultProps} onCancel={onCancel} />);

      const cancelButton = screen.getByRole("button", { name: "取消" });
      await user.click(cancelButton);

      expect(onCancel).toHaveBeenCalledTimes(1);
    });
  });
});
