import { UserInfoDisplay } from "@nomad/ui/components/user";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import type { UserInfo } from "@/types/dto";

describe("UserInfoDisplay Component", () => {
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
    onEdit: vi.fn(),
  };

  describe("Rendering", () => {
    it("should render the title", () => {
      render(<UserInfoDisplay {...defaultProps} />);
      expect(screen.getByText("个人信息")).toBeInTheDocument();
    });

    it("should render the edit button", () => {
      render(<UserInfoDisplay {...defaultProps} />);
      expect(screen.getByRole("button", { name: "编辑" })).toBeInTheDocument();
    });

    it("should render all field labels", () => {
      render(<UserInfoDisplay {...defaultProps} />);
      expect(screen.getByText("昵称")).toBeInTheDocument();
      expect(screen.getByText("姓名")).toBeInTheDocument();
      expect(screen.getByText("性别")).toBeInTheDocument();
      expect(screen.getByText("生日")).toBeInTheDocument();
    });

    it("should render user data correctly", () => {
      render(<UserInfoDisplay {...defaultProps} />);
      expect(screen.getByText("小张")).toBeInTheDocument();
      expect(screen.getByText("张三")).toBeInTheDocument();
      expect(screen.getByText("男")).toBeInTheDocument();
      expect(screen.getByText("1990-01-01")).toBeInTheDocument();
    });
  });

  describe("Gender Display", () => {
    it("should display '男' for male gender", () => {
      render(
        <UserInfoDisplay
          {...defaultProps}
          userData={{ ...mockUserData, gender: "male" }}
        />
      );
      expect(screen.getByText("男")).toBeInTheDocument();
    });

    it("should display '女' for female gender", () => {
      render(
        <UserInfoDisplay
          {...defaultProps}
          userData={{ ...mockUserData, gender: "female" }}
        />
      );
      expect(screen.getByText("女")).toBeInTheDocument();
    });

    it("should display '其他' for other gender", () => {
      render(
        <UserInfoDisplay
          {...defaultProps}
          userData={{ ...mockUserData, gender: "other" }}
        />
      );
      expect(screen.getByText("其他")).toBeInTheDocument();
    });

    it("should display '未设置' when gender is null", () => {
      render(
        <UserInfoDisplay
          {...defaultProps}
          userData={{ ...mockUserData, gender: null }}
        />
      );
      expect(screen.getAllByText("未设置")[0]).toBeInTheDocument();
    });
  });

  describe("Empty Values", () => {
    it("should display '未设置' when nickname is null", () => {
      render(
        <UserInfoDisplay
          {...defaultProps}
          userData={{ ...mockUserData, nickname: null }}
        />
      );
      expect(screen.getByText("未设置")).toBeInTheDocument();
    });

    it("should display '未设置' when birthday is null", () => {
      render(
        <UserInfoDisplay
          {...defaultProps}
          userData={{ ...mockUserData, birthday: null }}
        />
      );
      expect(screen.getAllByText("未设置")[0]).toBeInTheDocument();
    });
  });

  describe("User Interactions", () => {
    it("should call onEdit when edit button is clicked", async () => {
      const user = userEvent.setup();
      const onEdit = vi.fn();
      render(<UserInfoDisplay {...defaultProps} onEdit={onEdit} />);

      const editButton = screen.getByRole("button", { name: "编辑" });
      await user.click(editButton);

      expect(onEdit).toHaveBeenCalledTimes(1);
    });
  });
});
