import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import type { OrderContactCardData } from "@/types/dto/orders";

import { OrderContactInfo } from "./order-contact-info";

/**
 * Helper function to create mock contact data
 */
const createMockContactInfo = (
  overrides?: Partial<OrderContactCardData>
): OrderContactCardData => ({
  contactPhone: "139****2484",
  contactEmail: "test@example.com",
  ...overrides,
});

describe("OrderContactInfo Component", () => {
  describe("Rendering", () => {
    it("should render contact information card with title", () => {
      const contactInfo = createMockContactInfo();
      render(<OrderContactInfo contactInfo={contactInfo} />);

      expect(screen.getByText("联系信息")).toBeInTheDocument();
    });

    it("should display phone number when provided", () => {
      const contactInfo = createMockContactInfo({
        contactPhone: "139****2484",
      });
      render(<OrderContactInfo contactInfo={contactInfo} />);

      expect(screen.getByText("手机号：")).toBeInTheDocument();
      expect(screen.getByText("139****2484")).toBeInTheDocument();
    });

    it("should display email when provided", () => {
      const contactInfo = createMockContactInfo({
        contactEmail: "test@example.com",
      });
      render(<OrderContactInfo contactInfo={contactInfo} />);

      expect(screen.getByText("邮箱地址：")).toBeInTheDocument();
      expect(screen.getByText("test@example.com")).toBeInTheDocument();
    });

    it("should display both phone and email when both provided", () => {
      const contactInfo = createMockContactInfo({
        contactPhone: "139****2484",
        contactEmail: "test@example.com",
      });
      render(<OrderContactInfo contactInfo={contactInfo} />);

      expect(screen.getByText("手机号：")).toBeInTheDocument();
      expect(screen.getByText("139****2484")).toBeInTheDocument();
      expect(screen.getByText("邮箱地址：")).toBeInTheDocument();
      expect(screen.getByText("test@example.com")).toBeInTheDocument();
    });

    it("should display placeholder message when no contact info provided", () => {
      const contactInfo = createMockContactInfo({
        contactPhone: undefined,
        contactEmail: undefined,
      });
      render(<OrderContactInfo contactInfo={contactInfo} />);

      expect(screen.getByText("暂无联系信息")).toBeInTheDocument();
    });
  });

  describe("Partial Contact Information", () => {
    it("should display only phone when email is not provided", () => {
      const contactInfo = createMockContactInfo({
        contactPhone: "139****2484",
        contactEmail: undefined,
      });
      render(<OrderContactInfo contactInfo={contactInfo} />);

      expect(screen.getByText("手机号：")).toBeInTheDocument();
      expect(screen.getByText("139****2484")).toBeInTheDocument();
      expect(screen.queryByText("邮箱地址：")).not.toBeInTheDocument();
      expect(screen.queryByText("暂无联系信息")).not.toBeInTheDocument();
    });

    it("should display only email when phone is not provided", () => {
      const contactInfo = createMockContactInfo({
        contactPhone: undefined,
        contactEmail: "test@example.com",
      });
      render(<OrderContactInfo contactInfo={contactInfo} />);

      expect(screen.queryByText("手机号：")).not.toBeInTheDocument();
      expect(screen.getByText("邮箱地址：")).toBeInTheDocument();
      expect(screen.getByText("test@example.com")).toBeInTheDocument();
      expect(screen.queryByText("暂无联系信息")).not.toBeInTheDocument();
    });
  });

  describe("Masked Data Display", () => {
    it("should display masked phone number", () => {
      const contactInfo = createMockContactInfo({
        contactPhone: "139****2484",
      });
      render(<OrderContactInfo contactInfo={contactInfo} />);

      const phoneText = screen.getByText("139****2484");
      expect(phoneText).toBeInTheDocument();
      expect(phoneText.textContent).toContain("****");
    });

    it("should handle different masked phone formats", () => {
      const contactInfo = createMockContactInfo({
        contactPhone: "139****2484",
      });
      render(<OrderContactInfo contactInfo={contactInfo} />);

      expect(screen.getByText("139****2484")).toBeInTheDocument();
    });

    it("should display full email address", () => {
      const contactInfo = createMockContactInfo({
        contactEmail: "user@example.com",
      });
      render(<OrderContactInfo contactInfo={contactInfo} />);

      expect(screen.getByText("user@example.com")).toBeInTheDocument();
    });
  });

  describe("Empty String Handling", () => {
    it("should treat empty string as no contact info", () => {
      const contactInfo = createMockContactInfo({
        contactPhone: "",
        contactEmail: "",
      });
      render(<OrderContactInfo contactInfo={contactInfo} />);

      expect(screen.getByText("暂无联系信息")).toBeInTheDocument();
      expect(screen.queryByText("手机号：")).not.toBeInTheDocument();
      expect(screen.queryByText("邮箱地址：")).not.toBeInTheDocument();
    });

    it("should display phone when email is empty string", () => {
      const contactInfo = createMockContactInfo({
        contactPhone: "139****2484",
        contactEmail: "",
      });
      render(<OrderContactInfo contactInfo={contactInfo} />);

      expect(screen.getByText("139****2484")).toBeInTheDocument();
      expect(screen.queryByText("暂无联系信息")).not.toBeInTheDocument();
    });

    it("should display email when phone is empty string", () => {
      const contactInfo = createMockContactInfo({
        contactPhone: "",
        contactEmail: "test@example.com",
      });
      render(<OrderContactInfo contactInfo={contactInfo} />);

      expect(screen.getByText("test@example.com")).toBeInTheDocument();
      expect(screen.queryByText("暂无联系信息")).not.toBeInTheDocument();
    });
  });
});
