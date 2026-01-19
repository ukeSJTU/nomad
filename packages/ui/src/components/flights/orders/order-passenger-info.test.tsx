import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { OrderPassengerInfo } from "./order-passenger-info";

describe("OrderPassengerInfo", () => {
  const mockPassengers = [
    {
      name: "张三",
      idType: "id_card" as const,
      idNumber: "110101199001011234",
    },
    {
      name: "李四",
      idType: "passport" as const,
      idNumber: "E12345678",
    },
  ];

  it("renders card title", () => {
    render(<OrderPassengerInfo passengers={mockPassengers} />);

    expect(screen.getByText("出行人信息")).toBeInTheDocument();
  });

  it("displays all passengers", () => {
    render(<OrderPassengerInfo passengers={mockPassengers} />);

    expect(screen.getByText("张三")).toBeInTheDocument();
    expect(screen.getByText("李四")).toBeInTheDocument();
  });

  it("displays passenger ID type and number with default formatter", () => {
    render(<OrderPassengerInfo passengers={mockPassengers} />);

    expect(screen.getByText("身份证: 110101199001011234")).toBeInTheDocument();
    expect(screen.getByText("护照: E12345678")).toBeInTheDocument();
  });

  it("uses custom getIdentityTypeName function when provided", () => {
    const customFormatter = (idType: "passport" | "id_card" | "other") => {
      const types = {
        passport: "Passport",
        id_card: "ID Card",
        other: "Other",
      };
      return types[idType];
    };

    render(
      <OrderPassengerInfo
        passengers={mockPassengers}
        getIdentityTypeName={customFormatter}
      />
    );

    expect(screen.getByText("ID Card: 110101199001011234")).toBeInTheDocument();
    expect(screen.getByText("Passport: E12345678")).toBeInTheDocument();
  });

  it("handles single passenger", () => {
    const singlePassenger = [
      {
        name: "王五",
        idType: "id_card" as const,
        idNumber: "220101199002021234",
      },
    ];

    render(<OrderPassengerInfo passengers={singlePassenger} />);

    expect(screen.getByText("王五")).toBeInTheDocument();
    expect(screen.getByText("身份证: 220101199002021234")).toBeInTheDocument();
  });

  it("handles other ID type", () => {
    const otherIdPassenger = [
      {
        name: "赵六",
        idType: "other" as const,
        idNumber: "OTHER123456",
      },
    ];

    render(<OrderPassengerInfo passengers={otherIdPassenger} />);

    expect(screen.getByText("赵六")).toBeInTheDocument();
    expect(screen.getByText("其他: OTHER123456")).toBeInTheDocument();
  });

  it("displays passengers in grid layout", () => {
    render(<OrderPassengerInfo passengers={mockPassengers} />);

    const gridContainer = screen.getByText("张三").closest(".grid");
    expect(gridContainer).toHaveClass("grid-cols-1", "md:grid-cols-2", "gap-6");
  });
});
