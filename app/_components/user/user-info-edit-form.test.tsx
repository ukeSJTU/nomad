import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { UserInfoEditForm } from "@/components/user/user-info-edit-form";
import type { UserInfo } from "@/types/dto";

// Mock the updateUserInfoAction
vi.mock("@/app/_actions", () => ({
  updateUserInfoAction: vi.fn(),
}));

describe("UserInfoEditForm Component", () => {
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

  const defaultProps = {
    userData: mockUserData,
    onCancel: vi.fn(),
    onSuccess: vi.fn(),
  };

  describe("Rendering", () => {
    it("should render the title", () => {
      render(<UserInfoEditForm {...defaultProps} />);
      expect(screen.getByText("编辑个人信息")).toBeInTheDocument();
    });

    it("should render all form fields", () => {
      render(<UserInfoEditForm {...defaultProps} />);
      expect(screen.getByLabelText("昵称")).toBeInTheDocument();
      expect(screen.getByLabelText("姓名")).toBeInTheDocument();
      expect(screen.getByText("性别")).toBeInTheDocument();
      expect(screen.getByLabelText("生日")).toBeInTheDocument();
    });

    it("should render save and cancel buttons", () => {
      render(<UserInfoEditForm {...defaultProps} />);
      expect(screen.getByRole("button", { name: "保存" })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "取消" })).toBeInTheDocument();
    });
  });

  describe("Form Initialization", () => {
    it("should populate form with user data", () => {
      render(<UserInfoEditForm {...defaultProps} />);
      expect(screen.getByDisplayValue("小张")).toBeInTheDocument();
      expect(screen.getByDisplayValue("张三")).toBeInTheDocument();
      expect(screen.getByDisplayValue("1990-01-01")).toBeInTheDocument();
    });

    it("should handle empty optional fields", () => {
      const userDataWithNulls = {
        ...mockUserData,
        nickname: null,
        birthday: null,
        gender: null,
      };
      render(
        <UserInfoEditForm {...defaultProps} userData={userDataWithNulls} />
      );
      const nicknameInput = screen.getByLabelText("昵称");
      const birthdayInput = screen.getByLabelText("生日");
      expect(nicknameInput).toHaveValue("");
      expect(birthdayInput).toHaveValue("");
    });
  });

  describe("Gender Selection", () => {
    it("should render all gender options", () => {
      render(<UserInfoEditForm {...defaultProps} />);
      expect(screen.getByLabelText("男")).toBeInTheDocument();
      expect(screen.getByLabelText("女")).toBeInTheDocument();
      expect(screen.getByLabelText("其他")).toBeInTheDocument();
    });

    it("should pre-select the current gender", () => {
      render(<UserInfoEditForm {...defaultProps} />);
      const maleRadio = screen.getByRole("radio", { name: "男" });
      expect(maleRadio).toBeChecked();
    });
  });

  describe("User Interactions", () => {
    it("should call onCancel when cancel button is clicked", async () => {
      const user = userEvent.setup();
      const onCancel = vi.fn();
      render(<UserInfoEditForm {...defaultProps} onCancel={onCancel} />);

      const cancelButton = screen.getByRole("button", { name: "取消" });
      await user.click(cancelButton);

      expect(onCancel).toHaveBeenCalledTimes(1);
    });

    it("should allow editing form fields", async () => {
      const user = userEvent.setup();
      render(<UserInfoEditForm {...defaultProps} />);

      const nicknameInput = screen.getByLabelText("昵称");
      await user.clear(nicknameInput);
      await user.type(nicknameInput, "新昵称");

      expect(nicknameInput).toHaveValue("新昵称");
    });

    it("should allow changing gender selection", async () => {
      const user = userEvent.setup();
      render(<UserInfoEditForm {...defaultProps} />);

      const femaleRadio = screen.getByRole("radio", { name: "女" });
      await user.click(femaleRadio);

      await waitFor(() => {
        expect(femaleRadio).toBeChecked();
      });
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
        expect(screen.getByText("更新失败")).toBeInTheDocument();
      });
    });

    it("should show loading state during submission", async () => {
      const user = userEvent.setup();
      const { updateUserInfoAction } = await import("@/app/_actions");
      vi.mocked(updateUserInfoAction).mockImplementation(
        () =>
          new Promise(resolve =>
            setTimeout(() => resolve({ success: true, data: undefined }), 100)
          )
      );

      render(<UserInfoEditForm {...defaultProps} />);

      const saveButton = screen.getByRole("button", { name: "保存" });
      await user.click(saveButton);

      expect(
        screen.getByRole("button", { name: "保存中..." })
      ).toBeInTheDocument();
      expect(saveButton).toBeDisabled();
    });
  });
});
