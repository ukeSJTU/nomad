import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import type { OrderPassengerCardData } from "@/types/dto/orders";

import { OrderPassengerInfo } from "./order-passenger-info";

/**
 * Helper function to create mock passenger array
 */
const createMockPassengers = (
  overrides?: Partial<OrderPassengerCardData[0]>[]
): OrderPassengerCardData => {
  if (overrides) {
    return overrides.map(override => ({
      name: "张三",
      idType: "id_card" as const,
      idNumber: "310115199001011234",
      ...override,
    }));
  }
  return [
    {
      name: "张三",
      idType: "id_card" as const,
      idNumber: "310115199001011234",
    },
  ];
};

describe("OrderPassengerInfo Component", () => {
  describe("Rendering", () => {
    it("should render passenger information card with title", () => {
      const passengers = createMockPassengers();
      render(<OrderPassengerInfo passengers={passengers} />);

      expect(screen.getByText("出行人信息")).toBeInTheDocument();
    });

    it("should display single passenger with ID card", () => {
      const passengers = createMockPassengers();
      render(<OrderPassengerInfo passengers={passengers} />);

      expect(screen.getByText("张三")).toBeInTheDocument();
      expect(screen.getByText(/身份证/)).toBeInTheDocument();
      expect(screen.getByText(/310115199001011234/)).toBeInTheDocument();
    });

    it("should display passenger with passport", () => {
      const passengers: OrderPassengerCardData = [
        {
          name: "John Smith",
          idType: "passport",
          idNumber: "E12345678",
        },
      ];
      render(<OrderPassengerInfo passengers={passengers} />);

      expect(screen.getByText("John Smith")).toBeInTheDocument();
      expect(screen.getByText(/护照/)).toBeInTheDocument();
      expect(screen.getByText(/E12345678/)).toBeInTheDocument();
    });

    it("should display multiple passengers", () => {
      const passengers: OrderPassengerCardData = [
        {
          name: "张三",
          idType: "id_card",
          idNumber: "310115199001011234",
        },
        {
          name: "李四",
          idType: "passport",
          idNumber: "P87654321",
        },
        {
          name: "王五",
          idType: "id_card",
          idNumber: "310115199501011234",
        },
      ];
      render(<OrderPassengerInfo passengers={passengers} />);

      // Check all passenger names
      expect(screen.getByText("张三")).toBeInTheDocument();
      expect(screen.getByText("李四")).toBeInTheDocument();
      expect(screen.getByText("王五")).toBeInTheDocument();

      // Check identity types
      const idCardElements = screen.getAllByText(/身份证/);
      expect(idCardElements).toHaveLength(2);

      const passportElements = screen.getAllByText(/护照/);
      expect(passportElements).toHaveLength(1);

      // Check ID numbers
      expect(screen.getByText(/310115199001011234/)).toBeInTheDocument();
      expect(screen.getByText(/P87654321/)).toBeInTheDocument();
      expect(screen.getByText(/310115199501011234/)).toBeInTheDocument();
    });
  });

  describe("Identity Types", () => {
    it("should display correct label for ID card type", () => {
      const passengers: OrderPassengerCardData = [
        {
          name: "张三",
          idType: "id_card",
          idNumber: "310115199001011234",
        },
      ];
      render(<OrderPassengerInfo passengers={passengers} />);

      expect(
        screen.getByText(/身份证: 310115199001011234/)
      ).toBeInTheDocument();
    });

    it("should display correct label for passport type", () => {
      const passengers: OrderPassengerCardData = [
        {
          name: "John Smith",
          idType: "passport",
          idNumber: "E12345678",
        },
      ];
      render(<OrderPassengerInfo passengers={passengers} />);

      expect(screen.getByText(/护照: E12345678/)).toBeInTheDocument();
    });

    it("should display correct label for other type", () => {
      const passengers: OrderPassengerCardData = [
        {
          name: "测试",
          idType: "other",
          idNumber: "OTHER123456",
        },
      ];
      render(<OrderPassengerInfo passengers={passengers} />);

      expect(screen.getByText(/其他: OTHER123456/)).toBeInTheDocument();
    });
  });

  describe("Empty State", () => {
    it("should render empty grid when no passengers provided", () => {
      const passengers: OrderPassengerCardData = [];
      const { container } = render(
        <OrderPassengerInfo passengers={passengers} />
      );

      expect(screen.getByText("出行人信息")).toBeInTheDocument();
      expect(container.querySelector('[class*="grid"]')).toBeInTheDocument();
    });
  });

  describe("Multiple Passengers Layout", () => {
    it("should render 4 passengers correctly", () => {
      const passengers: OrderPassengerCardData = [
        { name: "张三", idType: "id_card", idNumber: "310115199001011234" },
        { name: "李四", idType: "passport", idNumber: "P87654321" },
        { name: "王五", idType: "id_card", idNumber: "310115199501011234" },
        { name: "赵六", idType: "passport", idNumber: "A98765432" },
      ];
      render(<OrderPassengerInfo passengers={passengers} />);

      expect(screen.getByText("张三")).toBeInTheDocument();
      expect(screen.getByText("李四")).toBeInTheDocument();
      expect(screen.getByText("王五")).toBeInTheDocument();
      expect(screen.getByText("赵六")).toBeInTheDocument();
    });

    it("should handle mixed Chinese and English names", () => {
      const passengers: OrderPassengerCardData = [
        { name: "张三", idType: "id_card", idNumber: "310115199001011234" },
        { name: "John Smith", idType: "passport", idNumber: "E12345678" },
        { name: "李四", idType: "id_card", idNumber: "310115199501011234" },
        { name: "Maria Garcia", idType: "passport", idNumber: "P12345678" },
      ];
      render(<OrderPassengerInfo passengers={passengers} />);

      expect(screen.getByText("张三")).toBeInTheDocument();
      expect(screen.getByText("John Smith")).toBeInTheDocument();
      expect(screen.getByText("李四")).toBeInTheDocument();
      expect(screen.getByText("Maria Garcia")).toBeInTheDocument();
    });
  });

  describe("ID Number Display", () => {
    it("should display full ID number without masking", () => {
      const passengers: OrderPassengerCardData = [
        {
          name: "张三",
          idType: "id_card",
          idNumber: "310115199001011234",
        },
      ];
      render(<OrderPassengerInfo passengers={passengers} />);

      const idText = screen.getByText(/310115199001011234/);
      expect(idText.textContent).toContain("310115199001011234");
      expect(idText.textContent).not.toContain("****");
    });

    it("should display masked ID number when provided", () => {
      const passengers: OrderPassengerCardData = [
        {
          name: "张三",
          idType: "id_card",
          idNumber: "310115********1234",
        },
      ];
      render(<OrderPassengerInfo passengers={passengers} />);

      expect(
        screen.getByText(/310115\*\*\*\*\*\*\*\*1234/)
      ).toBeInTheDocument();
    });

    it("should handle various ID number formats", () => {
      const passengers: OrderPassengerCardData = [
        { name: "Test1", idType: "id_card", idNumber: "110101199001011234" },
        { name: "Test2", idType: "passport", idNumber: "E12345678" },
        { name: "Test3", idType: "passport", idNumber: "P-123-456-78" },
        { name: "Test4", idType: "other", idNumber: "OTHER123" },
      ];
      render(<OrderPassengerInfo passengers={passengers} />);

      expect(screen.getByText(/110101199001011234/)).toBeInTheDocument();
      expect(screen.getByText(/E12345678/)).toBeInTheDocument();
      expect(screen.getByText(/P-123-456-78/)).toBeInTheDocument();
      expect(screen.getByText(/OTHER123/)).toBeInTheDocument();
    });
  });
});
