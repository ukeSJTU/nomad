import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { UserInfoForm } from "./user-info-form";

describe("UserInfoForm", () => {
  const mockUserData = {
    name: "张三",
    nickname: "小张",
    gender: "male" as const,
    birthday: "1990-01-01",
  };

  const mockEditFormSlot = (
    <div data-testid="edit-form">
      <button>保存</button>
      <button>取消</button>
    </div>
  );

  const defaultProps = {
    userData: mockUserData,
    editFormSlot: mockEditFormSlot,
    onEditStart: vi.fn(),
    onEditCancel: vi.fn(),
    onEditSuccess: vi.fn(),
    showSuccessDialog: false,
    isEditMode: false,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Display Mode", () => {
    it("renders UserInfoDisplay when not in edit mode", () => {
      render(<UserInfoForm {...defaultProps} />);

      expect(screen.getByText("个人信息")).toBeInTheDocument();
      expect(screen.getByText("张三")).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "编辑" })).toBeInTheDocument();
    });

    it("calls onEditStart when edit button is clicked", async () => {
      const user = userEvent.setup();
      const onEditStart = vi.fn();

      render(<UserInfoForm {...defaultProps} onEditStart={onEditStart} />);

      const editButton = screen.getByRole("button", { name: "编辑" });
      await user.click(editButton);

      expect(onEditStart).toHaveBeenCalledTimes(1);
    });

    it("does not show success dialog when showSuccessDialog is false", () => {
      render(<UserInfoForm {...defaultProps} showSuccessDialog={false} />);

      expect(screen.queryByText("保存成功")).not.toBeInTheDocument();
    });

    it("shows success dialog when showSuccessDialog is true", () => {
      render(<UserInfoForm {...defaultProps} showSuccessDialog={true} />);

      expect(screen.getByText("保存成功")).toBeInTheDocument();
    });
  });

  describe("Edit Mode", () => {
    it("renders editFormSlot when in edit mode", () => {
      render(<UserInfoForm {...defaultProps} isEditMode={true} />);

      expect(screen.getByTestId("edit-form")).toBeInTheDocument();
      expect(screen.queryByText("个人信息")).not.toBeInTheDocument();
    });

    it("does not render UserInfoDisplay when in edit mode", () => {
      render(<UserInfoForm {...defaultProps} isEditMode={true} />);

      expect(screen.queryByText("个人信息")).not.toBeInTheDocument();
    });
  });

  describe("Success Dialog", () => {
    it("calls onEditSuccess when success dialog is closed", async () => {
      const user = userEvent.setup();
      const onEditSuccess = vi.fn();

      render(
        <UserInfoForm
          {...defaultProps}
          showSuccessDialog={true}
          onEditSuccess={onEditSuccess}
        />
      );

      const confirmButton = screen.getByRole("button", { name: "确定" });
      await user.click(confirmButton);

      await waitFor(() => {
        expect(onEditSuccess).toHaveBeenCalledTimes(1);
      });
    });
  });
});
