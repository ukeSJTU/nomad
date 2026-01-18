import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import type { AncillaryCategory } from "./ancillary-selection";
import { AncillarySelection } from "./ancillary-selection";

describe("AncillarySelection", () => {
  const mockOnToggleService = vi.fn();
  const mockFormatPrice = vi.fn((price: number) => `¥${price.toFixed(2)}`);

  const mockCategories: AncillaryCategory[] = [
    {
      category: "INSURANCE",
      services: [
        {
          code: "INSURANCE_BASIC",
          name: "基础旅行险",
          description: "提供基本的旅行意外保障，包括意外伤害和医疗费用",
          price: 50.0,
          category: "INSURANCE",
        },
        {
          code: "INSURANCE_PREMIUM",
          name: "高级旅行险",
          description:
            "提供全面的旅行保障，包括意外伤害、医疗费用、行李丢失和航班延误",
          price: 120.0,
          category: "INSURANCE",
        },
      ],
    },
    {
      category: "AIRPORT_PICKUP",
      services: [
        {
          code: "PICKUP_ECONOMY",
          name: "经济型接送机",
          description: "舒适的经济型车辆接送机服务",
          price: 80.0,
          category: "AIRPORT_PICKUP",
        },
      ],
    },
    {
      category: "MEAL",
      services: [
        {
          code: "MEAL_STANDARD",
          name: "标准餐食",
          description: "提供标准的机上餐食，包括主食、小吃和饮料",
          price: 30.0,
          category: "MEAL",
        },
      ],
    },
  ];

  const defaultProps = {
    selectedServices: [],
    onToggleService: mockOnToggleService,
    categories: mockCategories,
    formatPrice: mockFormatPrice,
  };

  it("renders ancillary selection card with default title", () => {
    render(<AncillarySelection {...defaultProps} />);
    expect(screen.getByText("选择增值服务")).toBeInTheDocument();
  });

  it("renders with custom title", () => {
    render(<AncillarySelection {...defaultProps} title="自定义标题" />);
    expect(screen.getByText("自定义标题")).toBeInTheDocument();
  });

  it("renders all category titles", () => {
    render(<AncillarySelection {...defaultProps} />);
    expect(screen.getByText("旅行保险")).toBeInTheDocument();
    expect(screen.getByText("接送机服务")).toBeInTheDocument();
    expect(screen.getByText("机上餐食")).toBeInTheDocument();
  });

  it("renders all services with names and descriptions", () => {
    render(<AncillarySelection {...defaultProps} />);

    // Insurance services
    expect(screen.getByText("基础旅行险")).toBeInTheDocument();
    expect(
      screen.getByText("提供基本的旅行意外保障，包括意外伤害和医疗费用")
    ).toBeInTheDocument();
    expect(screen.getByText("高级旅行险")).toBeInTheDocument();

    // Airport pickup service
    expect(screen.getByText("经济型接送机")).toBeInTheDocument();
    expect(screen.getByText("舒适的经济型车辆接送机服务")).toBeInTheDocument();

    // Meal service
    expect(screen.getByText("标准餐食")).toBeInTheDocument();
    expect(
      screen.getByText("提供标准的机上餐食，包括主食、小吃和饮料")
    ).toBeInTheDocument();
  });

  it("formats and displays prices correctly", () => {
    render(<AncillarySelection {...defaultProps} />);
    expect(screen.getByText("¥50.00")).toBeInTheDocument();
    expect(screen.getByText("¥120.00")).toBeInTheDocument();
    expect(screen.getByText("¥80.00")).toBeInTheDocument();
    expect(screen.getByText("¥30.00")).toBeInTheDocument();
  });

  it("renders checkboxes for all services", () => {
    render(<AncillarySelection {...defaultProps} />);
    const checkboxes = screen.getAllByRole("checkbox");
    expect(checkboxes).toHaveLength(4); // 2 insurance + 1 pickup + 1 meal
  });

  it("shows selected services as checked", () => {
    render(
      <AncillarySelection
        {...defaultProps}
        selectedServices={["INSURANCE_BASIC", "MEAL_STANDARD"]}
      />
    );

    const basicInsuranceCheckbox = screen.getByRole("checkbox", {
      name: /基础旅行险/i,
    });
    const mealCheckbox = screen.getByRole("checkbox", {
      name: /标准餐食/i,
    });

    expect(basicInsuranceCheckbox).toBeChecked();
    expect(mealCheckbox).toBeChecked();
  });

  it("shows unselected services as unchecked", () => {
    render(
      <AncillarySelection
        {...defaultProps}
        selectedServices={["INSURANCE_BASIC"]}
      />
    );

    const premiumInsuranceCheckbox = screen.getByRole("checkbox", {
      name: /高级旅行险/i,
    });
    const pickupCheckbox = screen.getByRole("checkbox", {
      name: /经济型接送机/i,
    });

    expect(premiumInsuranceCheckbox).not.toBeChecked();
    expect(pickupCheckbox).not.toBeChecked();
  });

  it("calls onToggleService when a service is clicked", async () => {
    const user = userEvent.setup();
    render(<AncillarySelection {...defaultProps} />);

    const basicInsuranceCheckbox = screen.getByRole("checkbox", {
      name: /基础旅行险/i,
    });
    await user.click(basicInsuranceCheckbox);

    expect(mockOnToggleService).toHaveBeenCalledWith("INSURANCE_BASIC");
  });

  it("calls onToggleService when toggling multiple services", async () => {
    const user = userEvent.setup();
    render(<AncillarySelection {...defaultProps} />);

    const basicInsuranceCheckbox = screen.getByRole("checkbox", {
      name: /基础旅行险/i,
    });
    const mealCheckbox = screen.getByRole("checkbox", {
      name: /标准餐食/i,
    });

    await user.click(basicInsuranceCheckbox);
    await user.click(mealCheckbox);

    expect(mockOnToggleService).toHaveBeenCalledWith("INSURANCE_BASIC");
    expect(mockOnToggleService).toHaveBeenCalledWith("MEAL_STANDARD");
    expect(mockOnToggleService).toHaveBeenCalled();
  });

  it("renders category icons", () => {
    const { container } = render(<AncillarySelection {...defaultProps} />);

    // Check for lucide-react icon classes
    const icons = container.querySelectorAll("svg");
    expect(icons.length).toBeGreaterThan(0);
  });

  it("applies custom className to card", () => {
    const { container } = render(
      <AncillarySelection {...defaultProps} className="custom-class" />
    );
    const card = container.querySelector(".custom-class");
    expect(card).toBeInTheDocument();
  });

  it("handles services without descriptions", () => {
    const categoriesWithoutDesc: AncillaryCategory[] = [
      {
        category: "INSURANCE",
        services: [
          {
            code: "INSURANCE_BASIC",
            name: "基础旅行险",
            price: 50.0,
            category: "INSURANCE",
          },
        ],
      },
    ];

    render(
      <AncillarySelection
        {...defaultProps}
        categories={categoriesWithoutDesc}
      />
    );
    expect(screen.getByText("基础旅行险")).toBeInTheDocument();
    expect(screen.getByText("¥50.00")).toBeInTheDocument();
  });

  it("handles empty categories array", () => {
    render(<AncillarySelection {...defaultProps} categories={[]} />);
    expect(screen.getByText("选择增值服务")).toBeInTheDocument();
  });
});
