import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import type { ConfirmationBookingInfoProps } from "./confirmation-booking-info";
import { ConfirmationBookingInfo } from "./confirmation-booking-info";

describe("ConfirmationBookingInfo", () => {
  const mockPassengers: ConfirmationBookingInfoProps["passengers"] = [
    {
      id: "1",
      name: "张三",
      identityType: "id_card",
      identityNumber: "110101199001011234",
    },
    {
      id: "2",
      name: "李四",
      identityType: "passport",
      identityNumber: "G12345678",
    },
  ];

  it("should render passenger information", () => {
    render(
      <ConfirmationBookingInfo
        passengers={mockPassengers}
        contactPhone="13800138000"
        contactEmail="test@example.com"
      />
    );

    expect(screen.getByText("乘机人信息")).toBeInTheDocument();
    const zhangSan = screen.getAllByText("张三");
    expect(zhangSan.length).toBeGreaterThan(0);
    expect(screen.getByText(/身份证.*110101199001011234/)).toBeInTheDocument();
    expect(screen.getByText("李四")).toBeInTheDocument();
    expect(screen.getByText(/护照.*G12345678/)).toBeInTheDocument();
  });

  it("should render contact information", () => {
    render(
      <ConfirmationBookingInfo
        passengers={mockPassengers}
        contactPhone="13800138000"
        contactEmail="test@example.com"
      />
    );

    expect(screen.getByText("联系人信息")).toBeInTheDocument();
    expect(screen.getByText(/姓名：/)).toBeInTheDocument();
    expect(screen.getByText("13800138000")).toBeInTheDocument();
    expect(screen.getByText("test@example.com")).toBeInTheDocument();
  });

  it("should use first passenger name as contact name when no phone provided", () => {
    render(
      <ConfirmationBookingInfo
        passengers={mockPassengers}
        contactPhone={null}
        contactEmail={null}
      />
    );

    expect(screen.getByText(/姓名：/)).toBeInTheDocument();
    expect(screen.queryByText("13800138000")).not.toBeInTheDocument();
    expect(screen.queryByText("test@example.com")).not.toBeInTheDocument();
  });

  it("should render ancillary services when provided", () => {
    const ancillaryServices = [
      { name: "行李托运", price: "100" },
      { name: "机上餐食", price: "50" },
    ];

    render(
      <ConfirmationBookingInfo
        passengers={mockPassengers}
        contactPhone="13800138000"
        contactEmail="test@example.com"
        ancillaryServices={ancillaryServices}
      />
    );

    expect(screen.getByText("增值服务")).toBeInTheDocument();
    expect(screen.getByText("行李托运")).toBeInTheDocument();
    expect(screen.getByText("¥100")).toBeInTheDocument();
    expect(screen.getByText("机上餐食")).toBeInTheDocument();
    expect(screen.getByText("¥50")).toBeInTheDocument();
  });

  it("should not render ancillary services section when empty", () => {
    render(
      <ConfirmationBookingInfo
        passengers={mockPassengers}
        contactPhone="13800138000"
        contactEmail="test@example.com"
        ancillaryServices={[]}
      />
    );

    expect(screen.queryByText("增值服务")).not.toBeInTheDocument();
  });

  it("should handle other identity type", () => {
    const passengers = [
      {
        id: "1",
        name: "王五",
        identityType: "other" as const,
        identityNumber: "OTHER123",
      },
    ];

    render(
      <ConfirmationBookingInfo
        passengers={passengers}
        contactPhone="13800138000"
        contactEmail="test@example.com"
      />
    );

    expect(screen.getByText(/其他.*OTHER123/)).toBeInTheDocument();
  });
});
