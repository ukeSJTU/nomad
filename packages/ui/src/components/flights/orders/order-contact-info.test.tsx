import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { OrderContactInfo } from "./order-contact-info";

describe("OrderContactInfo", () => {
  it("renders card title", () => {
    render(
      <OrderContactInfo
        contactInfo={{
          contactPhone: "13800138000",
          contactEmail: "test@example.com",
        }}
      />
    );

    expect(screen.getByText("联系信息")).toBeInTheDocument();
  });

  it("displays phone number when provided", () => {
    render(<OrderContactInfo contactInfo={{ contactPhone: "13800138000" }} />);

    expect(screen.getByText("手机号：")).toBeInTheDocument();
    expect(screen.getByText("13800138000")).toBeInTheDocument();
  });

  it("displays email when provided", () => {
    render(
      <OrderContactInfo contactInfo={{ contactEmail: "test@example.com" }} />
    );

    expect(screen.getByText("邮箱地址：")).toBeInTheDocument();
    expect(screen.getByText("test@example.com")).toBeInTheDocument();
  });

  it("displays both phone and email when both provided", () => {
    render(
      <OrderContactInfo
        contactInfo={{
          contactPhone: "13800138000",
          contactEmail: "test@example.com",
        }}
      />
    );

    expect(screen.getByText("手机号：")).toBeInTheDocument();
    expect(screen.getByText("13800138000")).toBeInTheDocument();
    expect(screen.getByText("邮箱地址：")).toBeInTheDocument();
    expect(screen.getByText("test@example.com")).toBeInTheDocument();
  });

  it("displays fallback message when no contact info provided", () => {
    render(<OrderContactInfo contactInfo={{}} />);

    expect(screen.getByText("暂无联系信息")).toBeInTheDocument();
  });

  it("displays fallback message when empty strings provided", () => {
    render(
      <OrderContactInfo contactInfo={{ contactPhone: "", contactEmail: "" }} />
    );

    expect(screen.getByText("暂无联系信息")).toBeInTheDocument();
  });
});
