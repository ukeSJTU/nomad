import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { PaymentMethodSelector } from "./payment-method-selector";

describe("PaymentMethodSelector", () => {
  const mockOnPaymentMethodChange = vi.fn();

  const defaultProps = {
    paymentMethod: "balance",
    userBalance: "¥1,234.56",
    onPaymentMethodChange: mockOnPaymentMethodChange,
  };

  it("renders payment method selector with title", () => {
    render(<PaymentMethodSelector {...defaultProps} />);
    expect(screen.getByText("支付方式")).toBeInTheDocument();
  });

  it("displays user balance for platform balance option", () => {
    render(<PaymentMethodSelector {...defaultProps} />);
    expect(screen.getByText("平台余额")).toBeInTheDocument();
    expect(screen.getByText(/可用余额: ¥1,234.56/)).toBeInTheDocument();
  });

  it("shows balance option as selected by default", () => {
    render(<PaymentMethodSelector {...defaultProps} />);
    const balanceRadio = screen.getByRole("radio", { name: /平台余额/i });
    expect(balanceRadio).toBeChecked();
  });

  it("displays disabled wechat payment option", () => {
    render(<PaymentMethodSelector {...defaultProps} />);
    expect(screen.getByText("微信支付")).toBeInTheDocument();
    expect(screen.getAllByText("暂不可用").length).toBeGreaterThan(0);
    const wechatRadio = screen.getByRole("radio", { name: /微信支付/i });
    expect(wechatRadio).toBeDisabled();
  });

  it("displays disabled alipay option", () => {
    render(<PaymentMethodSelector {...defaultProps} />);
    expect(screen.getByText("支付宝")).toBeInTheDocument();
    expect(screen.getAllByText("暂不可用").length).toBe(2);
    const alipayRadio = screen.getByRole("radio", { name: /支付宝/i });
    expect(alipayRadio).toBeDisabled();
  });

  it("calls onPaymentMethodChange when balance option is clicked", async () => {
    const user = userEvent.setup();
    render(
      <PaymentMethodSelector
        {...defaultProps}
        paymentMethod="wechat" // Start with different selection
      />
    );

    const balanceRadio = screen.getByRole("radio", { name: /平台余额/i });
    await user.click(balanceRadio);

    expect(mockOnPaymentMethodChange).toHaveBeenCalledWith("balance");
  });

  it("formats different balance amounts correctly", () => {
    const { rerender } = render(<PaymentMethodSelector {...defaultProps} />);
    expect(screen.getByText(/可用余额: ¥1,234.56/)).toBeInTheDocument();

    rerender(
      <PaymentMethodSelector {...defaultProps} userBalance="¥10,000.00" />
    );
    expect(screen.getByText(/可用余额: ¥10,000.00/)).toBeInTheDocument();

    rerender(<PaymentMethodSelector {...defaultProps} userBalance="¥0.00" />);
    expect(screen.getByText(/可用余额: ¥0.00/)).toBeInTheDocument();
  });

  it("renders wallet icon for balance option", () => {
    render(<PaymentMethodSelector {...defaultProps} />);
    const walletIcon = screen
      .getByText("平台余额")
      .closest("label")
      ?.querySelector("svg");
    expect(walletIcon).toBeInTheDocument();
  });

  it("renders credit card icons for wechat and alipay", () => {
    render(<PaymentMethodSelector {...defaultProps} />);
    const wechatIcon = screen
      .getByText("微信支付")
      .closest("label")
      ?.querySelector("svg");
    const alipayIcon = screen
      .getByText("支付宝")
      .closest("label")
      ?.querySelector("svg");
    expect(wechatIcon).toBeInTheDocument();
    expect(alipayIcon).toBeInTheDocument();
  });

  it("applies correct styling classes", () => {
    render(<PaymentMethodSelector {...defaultProps} />);

    // Balance option should be hoverable - find the parent div of the radio and label
    const balanceRadio = screen.getByRole("radio", { name: /平台余额/i });
    const balanceDiv = balanceRadio.parentElement;
    expect(balanceDiv?.className).toContain("hover:bg-gray-50");

    // Disabled options should have opacity-50
    const wechatRadio = screen.getByRole("radio", { name: /微信支付/i });
    const wechatDiv = wechatRadio.parentElement;
    expect(wechatDiv?.className).toContain("opacity-50");
  });
});
