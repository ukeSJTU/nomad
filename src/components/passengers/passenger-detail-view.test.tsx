import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import PassengerDetailView from "./passenger-detail-view";

describe("PassengerDetailView Component", () => {
  it("renders the component with mock data", () => {
    render(<PassengerDetailView />);

    // Check for main heading
    expect(screen.getByText("查看常用旅客信息")).toBeInTheDocument();

    // Check for section headings
    expect(screen.getByText("旅客信息")).toBeInTheDocument();
    expect(screen.getByText("证件信息")).toBeInTheDocument();

    // Check for mock passenger data
    expect(screen.getByText("测试用户")).toBeInTheDocument();
    expect(screen.getByText("中国大陆")).toBeInTheDocument();
    expect(screen.getByText("男")).toBeInTheDocument();
    expect(screen.getByText("2004-09-12")).toBeInTheDocument();
    expect(screen.getByText("提瓦特")).toBeInTheDocument();
  });

  it("displays document information correctly", () => {
    render(<PassengerDetailView />);

    // Check document type
    expect(screen.getByText("身份证")).toBeInTheDocument();

    // Check masked document number
    expect(screen.getByText("3101**************876")).toBeInTheDocument();
  });

  it("displays field labels correctly", () => {
    render(<PassengerDetailView />);

    // Check for field labels
    expect(screen.getByText("中文名")).toBeInTheDocument();
    expect(screen.getByText("英文名")).toBeInTheDocument();
    expect(screen.getByText("性别")).toBeInTheDocument();
    expect(screen.getByText("生日")).toBeInTheDocument();
    expect(screen.getByText("出生地")).toBeInTheDocument();
    expect(screen.getByText("手机号码")).toBeInTheDocument();
    expect(screen.getByText("Email")).toBeInTheDocument();
  });

  it("shows '未设置' for unset optional fields", () => {
    render(<PassengerDetailView />);

    // Count how many "未设置" texts appear
    const unsetFields = screen.getAllByText("未设置");
    expect(unsetFields.length).toBeGreaterThan(0);
  });

  it("renders edit link when onEdit callback is provided", () => {
    const mockOnEdit = () => {};
    render(<PassengerDetailView onEdit={mockOnEdit} />);

    const editLink = screen.getByText("查看所有旅客信息");
    expect(editLink).toBeInTheDocument();
  });

  it("does not render edit link when onEdit is not provided", () => {
    render(<PassengerDetailView />);

    const editLink = screen.queryByText("查看所有旅客信息");
    expect(editLink).not.toBeInTheDocument();
  });
});
