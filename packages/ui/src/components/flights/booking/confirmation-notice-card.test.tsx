import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ConfirmationNoticeCard } from "./confirmation-notice-card";

describe("ConfirmationNoticeCard", () => {
  it("renders with default title and notices", () => {
    render(<ConfirmationNoticeCard />);

    expect(screen.getByText("温馨提示")).toBeInTheDocument();
    expect(
      screen.getByText(/请至少提前2小时到达机场办理值机手续/)
    ).toBeInTheDocument();
    expect(screen.getByText(/请携带有效身份证件原件/)).toBeInTheDocument();
    expect(
      screen.getByText(/如需改签或退票，请在航班起飞前联系客服/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/订单详情已发送至您的邮箱，请注意查收/)
    ).toBeInTheDocument();
  });

  it("renders with custom title", () => {
    render(<ConfirmationNoticeCard title="注意事项" />);

    expect(screen.getByText("注意事项")).toBeInTheDocument();
  });

  it("renders with custom notices", () => {
    const customNotices = ["自定义提示1", "自定义提示2"];
    render(<ConfirmationNoticeCard notices={customNotices} />);

    expect(screen.getByText(/自定义提示1/)).toBeInTheDocument();
    expect(screen.getByText(/自定义提示2/)).toBeInTheDocument();
    expect(
      screen.queryByText(/请至少提前2小时到达机场办理值机手续/)
    ).not.toBeInTheDocument();
  });

  it("renders empty list when notices is empty array", () => {
    render(<ConfirmationNoticeCard notices={[]} />);

    expect(screen.getByText("温馨提示")).toBeInTheDocument();
    const list = screen.getByRole("list");
    expect(list.children).toHaveLength(0);
  });

  it("applies correct styling classes", () => {
    const { container } = render(<ConfirmationNoticeCard />);

    const card = container.querySelector(".bg-accent");
    expect(card).toBeInTheDocument();

    const list = screen.getByRole("list");
    expect(list).toHaveClass("space-y-1", "text-sm", "text-accent-foreground");
  });
});
