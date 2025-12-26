import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import type { OrderListItem } from "@/types/dto";

import OrderCard from "./order-card";

// Mock order data helper
const createMockOrder = (
  overrides?: Partial<OrderListItem>
): OrderListItem => ({
  id: "1",
  orderNumber: "NMD20251118001",
  status: "PENDING_PAYMENT",
  createdAt: "2025-11-18T10:30:00Z",
  totalAmount: "1000",
  passengerCount: 1,
  passengerNames: ["张三"],
  outboundFlight: {
    flightNumber: "MU5186",
    airlineName: "中国东方航空",
    airlineIataCode: "MU",
    airlineLogoUrl: null,
    departureAirportName: "首都国际机场",
    departureAirportIataCode: "PEK",
    departureCityName: "北京",
    arrivalAirportName: "虹桥国际机场",
    arrivalAirportIataCode: "SHA",
    arrivalCityName: "上海",
    departureDatetime: "2025-12-01T07:30:00Z",
    arrivalDatetime: "2025-12-01T09:45:00Z",
    seatClassType: "ECONOMY",
  },
  inboundFlight: null,
  ...overrides,
});

describe("OrderCard Component", () => {
  const mockOnCheckChange = vi.fn();
  const mockOnDelete = vi.fn();
  const mockOnActionClick = vi.fn();

  const defaultProps = {
    order: createMockOrder(),
    isChecked: false,
    onCheckChange: mockOnCheckChange,
    onDelete: mockOnDelete,
    onActionClick: mockOnActionClick,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Rendering", () => {
    it("should render order card with basic information", () => {
      render(<OrderCard {...defaultProps} />);

      // Check order number
      expect(screen.getByText("NMD20251118001")).toBeInTheDocument();

      // Check booking date label
      expect(screen.getByText("预订日期:")).toBeInTheDocument();
      expect(screen.getByText("2025-11-18")).toBeInTheDocument();

      // Check flight route
      expect(screen.getByText(/北京 —/)).toBeInTheDocument();
      expect(screen.getByText(/上海/)).toBeInTheDocument();

      // Check price
      expect(screen.getByText("¥1000")).toBeInTheDocument();
    });

    it("should render delete button", () => {
      render(<OrderCard {...defaultProps} />);

      const deleteButton = screen.getByRole("button", { name: "删除订单" });
      expect(deleteButton).toBeInTheDocument();
    });

    it("should render checkbox", () => {
      render(<OrderCard {...defaultProps} />);

      const checkbox = screen.getByRole("checkbox");
      expect(checkbox).toBeInTheDocument();
    });

    it("should display correct order status for PENDING_PAYMENT", () => {
      render(<OrderCard {...defaultProps} />);

      expect(screen.getByText("待支付")).toBeInTheDocument();
    });

    it("should display correct order status for CONFIRMED", () => {
      const order = createMockOrder({ status: "CONFIRMED" });
      render(<OrderCard {...defaultProps} order={order} />);

      expect(screen.getByText("已确认")).toBeInTheDocument();
    });

    it("should display correct order status for CANCELLED", () => {
      const order = createMockOrder({ status: "CANCELLED" });
      render(<OrderCard {...defaultProps} order={order} />);

      expect(screen.getByText("已取消")).toBeInTheDocument();
    });

    it("should display correct order status for REFUNDED", () => {
      const order = createMockOrder({ status: "REFUNDED" });
      render(<OrderCard {...defaultProps} order={order} />);

      expect(screen.getByText("已退款")).toBeInTheDocument();
    });
  });

  describe("Outbound Flight Information", () => {
    it("should display outbound flight details", () => {
      render(<OrderCard {...defaultProps} />);

      // Check departure and arrival cities
      expect(screen.getByText(/北京 —/)).toBeInTheDocument();
      expect(screen.getByText(/上海/)).toBeInTheDocument();

      // Check flight date and time (dates are formatted in local timezone)
      expect(screen.getByText(/2025-12-01/)).toBeInTheDocument();
      expect(screen.getByText(/MU5186/)).toBeInTheDocument();

      // Check flight number
      expect(screen.getByText(/MU5186/)).toBeInTheDocument();
    });

    it("should display passenger names for outbound flight", () => {
      render(<OrderCard {...defaultProps} />);

      expect(screen.getByText(/出行人：张三/)).toBeInTheDocument();
    });

    it("should display multiple passenger names separated by 、", () => {
      const order = createMockOrder({
        passengerNames: ["张三", "李四", "王五"],
      });
      render(<OrderCard {...defaultProps} order={order} />);

      expect(screen.getByText(/出行人：张三、李四、王五/)).toBeInTheDocument();
    });
  });

  describe("Inbound Flight Information", () => {
    it("should display inbound flight when present", () => {
      const order = createMockOrder({
        inboundFlight: {
          flightNumber: "MU8230",
          airlineName: "中国东方航空",
          airlineIataCode: "MU",
          airlineLogoUrl: null,
          departureAirportName: "虹桥国际机场",
          departureAirportIataCode: "SHA",
          departureCityName: "上海",
          arrivalAirportName: "首都国际机场",
          arrivalAirportIataCode: "PEK",
          arrivalCityName: "北京",
          departureDatetime: "2025-12-05T20:40:00Z",
          arrivalDatetime: "2025-12-05T22:55:00Z",
          seatClassType: "ECONOMY",
        },
      });

      render(<OrderCard {...defaultProps} order={order} />);

      // Check for flight numbers to verify both flights are displayed
      expect(screen.getByText(/MU5186/)).toBeInTheDocument();
      expect(screen.getByText(/MU8230/)).toBeInTheDocument();

      // Check for passenger names appearing twice (once for each flight)
      const passengerTexts = screen.getAllByText(/出行人：张三/);
      expect(passengerTexts.length).toBe(2);
    });

    it("should not display inbound flight section when null", () => {
      render(<OrderCard {...defaultProps} />);

      // Should only have one flight number (outbound)
      expect(screen.getByText(/MU5186/)).toBeInTheDocument();
      expect(screen.queryByText(/MU8230/)).not.toBeInTheDocument();
    });

    it("should display passenger names for inbound flight", () => {
      const order = createMockOrder({
        passengerNames: ["张三", "李四"],
        inboundFlight: {
          flightNumber: "MU8230",
          airlineName: "中国东方航空",
          airlineIataCode: "MU",
          airlineLogoUrl: null,
          departureAirportName: "虹桥国际机场",
          departureAirportIataCode: "SHA",
          departureCityName: "上海",
          arrivalAirportName: "首都国际机场",
          arrivalAirportIataCode: "PEK",
          arrivalCityName: "北京",
          departureDatetime: "2025-12-05T20:40:00Z",
          arrivalDatetime: "2025-12-05T22:55:00Z",
          seatClassType: "ECONOMY",
        },
      });

      render(<OrderCard {...defaultProps} order={order} />);

      // Should show passenger names for both flights
      const passengerTexts = screen.getAllByText(/出行人：张三、李四/);
      expect(passengerTexts.length).toBe(2); // One for outbound, one for inbound
    });
  });

  describe("User Interactions", () => {
    it("should call onCheckChange when checkbox is clicked", async () => {
      const user = userEvent.setup();
      render(<OrderCard {...defaultProps} />);

      const checkbox = screen.getByRole("checkbox");
      await user.click(checkbox);

      expect(mockOnCheckChange).toHaveBeenCalledTimes(1);
      expect(mockOnCheckChange).toHaveBeenCalledWith(true);
    });

    it("should call onCheckChange with false when unchecking", async () => {
      const user = userEvent.setup();
      render(<OrderCard {...defaultProps} isChecked={true} />);

      const checkbox = screen.getByRole("checkbox");
      await user.click(checkbox);

      expect(mockOnCheckChange).toHaveBeenCalledTimes(1);
      expect(mockOnCheckChange).toHaveBeenCalledWith(false);
    });

    it("should call onDelete when delete button is clicked", async () => {
      const user = userEvent.setup();
      render(<OrderCard {...defaultProps} />);

      const deleteButton = screen.getByRole("button", { name: "删除订单" });
      await user.click(deleteButton);

      expect(mockOnDelete).toHaveBeenCalledTimes(1);
    });

    it("should show checkbox as checked when isChecked is true", () => {
      render(<OrderCard {...defaultProps} isChecked={true} />);

      const checkbox = screen.getByRole("checkbox");
      expect(checkbox).toHaveAttribute("aria-checked", "true");
    });

    it("should show checkbox as unchecked when isChecked is false", () => {
      render(<OrderCard {...defaultProps} isChecked={false} />);

      const checkbox = screen.getByRole("checkbox");
      expect(checkbox).toHaveAttribute("aria-checked", "false");
    });
  });

  describe("Date Formatting", () => {
    it("should format booking date correctly", () => {
      const order = createMockOrder({
        createdAt: "2025-11-18T14:30:45Z",
      });

      render(<OrderCard {...defaultProps} order={order} />);

      expect(screen.getByText("2025-11-18")).toBeInTheDocument();
    });

    it("should format flight departure datetime correctly", () => {
      const order = createMockOrder({
        outboundFlight: {
          ...createMockOrder().outboundFlight,
          departureDatetime: "2025-12-25T15:45:00Z",
          arrivalDatetime: "2025-12-25T18:30:00Z",
        },
      });

      render(<OrderCard {...defaultProps} order={order} />);

      // Check that the date is present (timezone may vary)
      expect(
        screen.getByText(/2025-12-25/) || screen.getByText(/2025-12-26/)
      ).toBeInTheDocument();
    });
  });

  describe("Price Display", () => {
    it("should display price with currency symbol", () => {
      render(<OrderCard {...defaultProps} />);

      expect(screen.getByText("¥1000")).toBeInTheDocument();
    });

    it("should display different price amounts correctly", () => {
      const order = createMockOrder({ totalAmount: "2388.50" });
      render(<OrderCard {...defaultProps} order={order} />);

      expect(screen.getByText("¥2388.50")).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("should have accessible checkbox with proper id", () => {
      render(<OrderCard {...defaultProps} />);

      const checkbox = screen.getByRole("checkbox");
      expect(checkbox).toHaveAttribute("id", "order-1");
    });

    it("should have accessible delete button", () => {
      render(<OrderCard {...defaultProps} />);

      const deleteButton = screen.getByRole("button", { name: "删除订单" });
      expect(deleteButton).toBeInTheDocument();
    });
  });

  describe("Edge Cases", () => {
    it("should handle very long order numbers", () => {
      const order = createMockOrder({
        orderNumber: "NMD202511181234567890ABCDEFGHIJ",
      });

      render(<OrderCard {...defaultProps} order={order} />);

      expect(
        screen.getByText("NMD202511181234567890ABCDEFGHIJ")
      ).toBeInTheDocument();
    });

    it("should handle single passenger", () => {
      const order = createMockOrder({
        passengerNames: ["独行侠"],
        passengerCount: 1,
      });

      render(<OrderCard {...defaultProps} order={order} />);

      expect(screen.getByText(/出行人：独行侠/)).toBeInTheDocument();
    });

    it("should handle many passengers", () => {
      const order = createMockOrder({
        passengerNames: ["张三", "李四", "王五", "赵六", "孙七"],
        passengerCount: 5,
      });

      render(<OrderCard {...defaultProps} order={order} />);

      expect(
        screen.getByText(/出行人：张三、李四、王五、赵六、孙七/)
      ).toBeInTheDocument();
    });

    it("should handle zero amount", () => {
      const order = createMockOrder({ totalAmount: "0" });

      render(<OrderCard {...defaultProps} order={order} />);

      expect(screen.getByText("¥0")).toBeInTheDocument();
    });
  });

  describe("Action Buttons", () => {
    it('should render "去付款" button for pending payment orders', () => {
      const order = createMockOrder({ status: "PENDING_PAYMENT" });

      render(<OrderCard {...defaultProps} order={order} />);

      expect(
        screen.getByRole("button", { name: "去付款" })
      ).toBeInTheDocument();
    });

    it('should render "重发确认信息" button for confirmed orders', () => {
      const order = createMockOrder({ status: "CONFIRMED" });

      render(<OrderCard {...defaultProps} order={order} />);

      expect(
        screen.getByRole("button", { name: "重发确认信息" })
      ).toBeInTheDocument();
    });

    it("should not render action button for cancelled orders", () => {
      const order = createMockOrder({ status: "CANCELLED" });

      render(<OrderCard {...defaultProps} order={order} />);

      expect(
        screen.queryByRole("button", { name: "去付款" })
      ).not.toBeInTheDocument();
      expect(
        screen.queryByRole("button", { name: "重发确认信息" })
      ).not.toBeInTheDocument();
    });

    it("should not render action button for refunded orders", () => {
      const order = createMockOrder({ status: "REFUNDED" });

      render(<OrderCard {...defaultProps} order={order} />);

      expect(
        screen.queryByRole("button", { name: "去付款" })
      ).not.toBeInTheDocument();
      expect(
        screen.queryByRole("button", { name: "重发确认信息" })
      ).not.toBeInTheDocument();
    });

    it('should call onActionClick when "去付款" button is clicked', async () => {
      const user = userEvent.setup();
      const order = createMockOrder({ status: "PENDING_PAYMENT" });

      render(<OrderCard {...defaultProps} order={order} />);

      const paymentButton = screen.getByRole("button", { name: "去付款" });
      await user.click(paymentButton);

      expect(mockOnActionClick).toHaveBeenCalledTimes(1);
    });

    it('should call onActionClick when "重发确认信息" button is clicked', async () => {
      const user = userEvent.setup();
      const order = createMockOrder({ status: "CONFIRMED" });

      render(<OrderCard {...defaultProps} order={order} />);

      const resendButton = screen.getByRole("button", {
        name: "重发确认信息",
      });
      await user.click(resendButton);

      expect(mockOnActionClick).toHaveBeenCalledTimes(1);
    });
  });

  describe("Navigation", () => {
    it("should render order number as a link", () => {
      render(<OrderCard {...defaultProps} />);

      const orderLink = screen.getByRole("link", { name: "NMD20251118001" });
      expect(orderLink).toBeInTheDocument();
      expect(orderLink).toHaveAttribute("href", "/orders/1");
    });

    it("should make CardContent clickable with proper link", () => {
      render(<OrderCard {...defaultProps} />);

      // Find the link that wraps CardContent by checking parent elements
      const links = screen.getAllByRole("link");
      const cardContentLink = links.find(link =>
        link.getAttribute("href")?.includes("/orders/1")
      );

      expect(cardContentLink).toBeInTheDocument();
      expect(cardContentLink).toHaveAttribute("href", "/orders/1");
    });
  });

  describe("Hover State", () => {
    it("should have hover styles applied via className", () => {
      const { container } = render(<OrderCard {...defaultProps} />);

      // Check if Card has hover transition classes
      const card = container.querySelector('[class*="transition"]');
      expect(card).toBeInTheDocument();
      expect(card?.className).toContain("hover:border-primary");
    });
  });
});
