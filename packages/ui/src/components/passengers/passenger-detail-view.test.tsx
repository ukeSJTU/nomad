import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import {
  type PassengerDetailData,
  PassengerDetailView,
} from "./passenger-detail-view";

const mockPassenger: PassengerDetailData = {
  name: "张三",
  nationality: "中国",
  gender: "male",
  dateOfBirth: "1990-01-01",
  placeOfBirth: "北京",
  phone: "13800138000",
  email: "zhangsan@example.com",
  documentType: "id_card",
  documentNumber: "110101199001011234",
  documentExpiryDate: "2030-12-31",
};

describe("PassengerDetailView", () => {
  it("renders passenger information section", () => {
    render(<PassengerDetailView passenger={mockPassenger} />);

    expect(screen.getByText("旅客信息")).toBeInTheDocument();
    expect(screen.getByText("张三")).toBeInTheDocument();
    expect(screen.getByText("中国")).toBeInTheDocument();
    expect(screen.getByText("男")).toBeInTheDocument();
    expect(screen.getByText("1990-01-01")).toBeInTheDocument();
    expect(screen.getByText("北京")).toBeInTheDocument();
    expect(screen.getByText("13800138000")).toBeInTheDocument();
    expect(screen.getByText("zhangsan@example.com")).toBeInTheDocument();
  });

  it("renders document information section", () => {
    render(<PassengerDetailView passenger={mockPassenger} />);

    expect(screen.getByText("证件信息")).toBeInTheDocument();
    expect(screen.getByText("身份证")).toBeInTheDocument();
    expect(screen.getByText("110101199001011234")).toBeInTheDocument();
    expect(screen.getByText("2030-12-31")).toBeInTheDocument();
  });

  it("renders null values as 未设置", () => {
    const passengerWithNulls: PassengerDetailData = {
      ...mockPassenger,
      placeOfBirth: null,
      phone: null,
      email: null,
    };

    render(<PassengerDetailView passenger={passengerWithNulls} />);

    const unsetTexts = screen.getAllByText("未设置");
    expect(unsetTexts).toHaveLength(3);
  });

  it("renders null expiry date as 长期有效", () => {
    const passengerWithNullExpiry: PassengerDetailData = {
      ...mockPassenger,
      documentExpiryDate: null,
    };

    render(<PassengerDetailView passenger={passengerWithNullExpiry} />);

    expect(screen.getByText("长期有效")).toBeInTheDocument();
  });

  it("renders correct gender labels", () => {
    const femalePassenger: PassengerDetailData = {
      ...mockPassenger,
      gender: "female",
    };

    const { rerender } = render(
      <PassengerDetailView passenger={femalePassenger} />
    );
    expect(screen.getByText("女")).toBeInTheDocument();

    const otherPassenger: PassengerDetailData = {
      ...mockPassenger,
      gender: "other",
    };

    rerender(<PassengerDetailView passenger={otherPassenger} />);
    expect(screen.getByText("其他")).toBeInTheDocument();
  });

  it("renders correct document type labels", () => {
    const passportPassenger: PassengerDetailData = {
      ...mockPassenger,
      documentType: "passport",
    };

    const { rerender } = render(
      <PassengerDetailView passenger={passportPassenger} />
    );
    expect(screen.getByText("护照")).toBeInTheDocument();

    const otherDocPassenger: PassengerDetailData = {
      ...mockPassenger,
      documentType: "other",
    };

    rerender(<PassengerDetailView passenger={otherDocPassenger} />);
    expect(screen.getByText("其他")).toBeInTheDocument();
  });
});
