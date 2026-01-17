import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import {
  PaymentPriceBreakdown,
  type PaymentPriceBreakdownProps,
} from "./payment-price-breakdown";

describe("PaymentPriceBreakdown", () => {
  const defaultProps: PaymentPriceBreakdownProps = {
    orderNumber: "ORD-20260118-001",
    baseAmount: "¥1,234.56",
    ancillaryAmount: "¥100.00",
    showAncillary: true,
    totalAmount: "¥1,334.56",
    paymentMethod: "card",
    userBalance: "¥2,000.00",
    balanceAfterPayment: "¥665.44",
    isBalanceInsufficient: false,
  };

  it("renders order number", () => {
    render(<PaymentPriceBreakdown {...defaultProps} />);
    expect(screen.getByText("订单号")).toBeInTheDocument();
    expect(screen.getByText("ORD-20260118-001")).toBeInTheDocument();
  });

  it("renders base amount", () => {
    render(<PaymentPriceBreakdown {...defaultProps} />);
    expect(screen.getByText("机票费用")).toBeInTheDocument();
    expect(screen.getByText("¥1,234.56")).toBeInTheDocument();
  });

  it("renders ancillary amount when greater than zero", () => {
    render(<PaymentPriceBreakdown {...defaultProps} />);
    expect(screen.getByText("增值服务")).toBeInTheDocument();
    expect(screen.getByText("¥100.00")).toBeInTheDocument();
  });

  it("does not render ancillary amount when zero", () => {
    render(
      <PaymentPriceBreakdown
        {...defaultProps}
        ancillaryAmount="¥0.00"
        showAncillary={false}
      />
    );
    expect(screen.queryByText("增值服务")).not.toBeInTheDocument();
  });

  it("renders total amount", () => {
    render(<PaymentPriceBreakdown {...defaultProps} />);
    expect(screen.getByText("应付金额")).toBeInTheDocument();
    expect(screen.getByText("¥1,334.56")).toBeInTheDocument();
  });

  it("does not show balance info when payment method is not balance", () => {
    render(<PaymentPriceBreakdown {...defaultProps} paymentMethod="card" />);
    expect(screen.queryByText("账户余额")).not.toBeInTheDocument();
    expect(screen.queryByText("支付后余额")).not.toBeInTheDocument();
  });

  it("shows balance info when payment method is balance", () => {
    render(<PaymentPriceBreakdown {...defaultProps} paymentMethod="balance" />);
    expect(screen.getByText("账户余额")).toBeInTheDocument();
    expect(screen.getByText("¥2,000.00")).toBeInTheDocument();
    expect(screen.getByText("支付后余额")).toBeInTheDocument();
    expect(screen.getByText("¥665.44")).toBeInTheDocument();
  });

  it("shows insufficient balance warning when balance is not enough", () => {
    render(
      <PaymentPriceBreakdown
        {...defaultProps}
        paymentMethod="balance"
        isBalanceInsufficient={true}
        balanceAfterPayment="¥-334.56"
      />
    );
    expect(screen.getByText("余额不足，请充值后再支付")).toBeInTheDocument();
  });

  it("does not show insufficient balance warning when balance is enough", () => {
    render(
      <PaymentPriceBreakdown
        {...defaultProps}
        paymentMethod="balance"
        isBalanceInsufficient={false}
      />
    );
    expect(
      screen.queryByText("余额不足，请充值后再支付")
    ).not.toBeInTheDocument();
  });

  it("applies red text color to balance after payment when insufficient", () => {
    render(
      <PaymentPriceBreakdown
        {...defaultProps}
        paymentMethod="balance"
        isBalanceInsufficient={true}
        balanceAfterPayment="¥-334.56"
      />
    );

    const balanceText = screen.getByText("¥-334.56");
    expect(balanceText).toHaveClass("text-red-600");
  });

  it("applies blue text color to balance after payment when sufficient", () => {
    render(
      <PaymentPriceBreakdown
        {...defaultProps}
        paymentMethod="balance"
        isBalanceInsufficient={false}
      />
    );

    const balanceText = screen.getByText("¥665.44");
    expect(balanceText).toHaveClass("text-blue-900");
  });

  it("renders sticky card", () => {
    const { container } = render(<PaymentPriceBreakdown {...defaultProps} />);
    const card = container.querySelector(".sticky");
    expect(card).toBeInTheDocument();
  });

  it("renders plane icon", () => {
    const { container } = render(<PaymentPriceBreakdown {...defaultProps} />);
    expect(screen.getByText("费用明细")).toBeInTheDocument();
    // Icon is rendered by lucide-react
    const icon = container.querySelector("svg");
    expect(icon).toBeInTheDocument();
  });
});
