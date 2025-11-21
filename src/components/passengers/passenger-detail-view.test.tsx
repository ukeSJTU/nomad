import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import PassengerDetailView, {
  type PassengerDetailData,
} from "./passenger-detail-view";

const mockPassenger: PassengerDetailData = {
  name: "测试用户",
  nationality: "中国大陆",
  gender: "male",
  dateOfBirth: "2004-09-12",
  placeOfBirth: "提瓦特",
  phone: "138****1234",
  email: "te**@example.com",
  documentType: "id_card",
  documentNumber: "3101**************876",
  documentExpiryDate: "2030-12-31",
};

describe("PassengerDetailView Component", () => {
  it("renders the component with mock data", () => {
    render(<PassengerDetailView passenger={mockPassenger} />);

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
    render(<PassengerDetailView passenger={mockPassenger} />);

    // Check document type
    expect(screen.getByText("身份证")).toBeInTheDocument();

    // Check masked document number
    expect(screen.getByText("3101**************876")).toBeInTheDocument();
  });

  it("displays field labels correctly", () => {
    render(<PassengerDetailView passenger={mockPassenger} />);

    // Check for field labels
    expect(screen.getByText("姓名")).toBeInTheDocument();
    expect(screen.getByText("性别")).toBeInTheDocument();
    expect(screen.getByText("生日")).toBeInTheDocument();
    expect(screen.getByText("出生地")).toBeInTheDocument();
    expect(screen.getByText("手机号码")).toBeInTheDocument();
    expect(screen.getByText("Email")).toBeInTheDocument();
  });

  it("shows '未设置' for unset optional fields", () => {
    const passengerWithMissingFields: PassengerDetailData = {
      name: "测试用户",
      nationality: "中国大陆",
      gender: "male",
      dateOfBirth: "2004-09-12",
      documentType: "id_card",
      documentNumber: "3101**************876",
    };
    render(<PassengerDetailView passenger={passengerWithMissingFields} />);

    // Count how many "未设置" texts appear
    const unsetFields = screen.getAllByText("未设置");
    expect(unsetFields.length).toBeGreaterThan(0);
  });

  it("renders component correctly", () => {
    render(<PassengerDetailView passenger={mockPassenger} />);

    // Check that the component renders without crashing
    expect(screen.getByText("旅客信息")).toBeInTheDocument();
  });

  it("component renders without errors", () => {
    render(<PassengerDetailView passenger={mockPassenger} />);

    // Verify the component is rendered
    expect(screen.getByText("证件信息")).toBeInTheDocument();
  });
});
