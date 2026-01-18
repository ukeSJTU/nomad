import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { UserInfoDisplay } from "./user-info-display";

describe("UserInfoDisplay", () => {
  const mockUserData = {
    nickname: "小张",
    name: "张三",
    gender: "male" as const,
    birthday: "1990-01-01",
  };

  it("renders user information correctly", () => {
    render(<UserInfoDisplay userData={mockUserData} onEdit={vi.fn()} />);

    expect(screen.getByText("个人信息")).toBeInTheDocument();
    expect(screen.getByText("小张")).toBeInTheDocument();
    expect(screen.getByText("张三")).toBeInTheDocument();
    expect(screen.getByText("男")).toBeInTheDocument();
    expect(screen.getByText("1990-01-01")).toBeInTheDocument();
  });

  it("displays placeholder when optional fields are missing", () => {
    render(
      <UserInfoDisplay
        userData={{
          name: "张三",
          nickname: null,
          gender: null,
          birthday: null,
        }}
        onEdit={vi.fn()}
      />
    );

    const placeholders = screen.getAllByText("未设置");
    expect(placeholders).toHaveLength(3); // nickname, gender, birthday
  });

  it("renders edit button and calls onEdit when clicked", async () => {
    const user = userEvent.setup();
    const onEdit = vi.fn();

    render(<UserInfoDisplay userData={mockUserData} onEdit={onEdit} />);

    const editButton = screen.getByRole("button", { name: "编辑" });
    await user.click(editButton);

    expect(onEdit).toHaveBeenCalledTimes(1);
  });

  it("displays all gender options correctly", () => {
    const { rerender } = render(
      <UserInfoDisplay
        userData={{ ...mockUserData, gender: "male" }}
        onEdit={vi.fn()}
      />
    );
    expect(screen.getByText("男")).toBeInTheDocument();

    rerender(
      <UserInfoDisplay
        userData={{ ...mockUserData, gender: "female" }}
        onEdit={vi.fn()}
      />
    );
    expect(screen.getByText("女")).toBeInTheDocument();

    rerender(
      <UserInfoDisplay
        userData={{ ...mockUserData, gender: "other" }}
        onEdit={vi.fn()}
      />
    );
    expect(screen.getByText("其他")).toBeInTheDocument();
  });
});
