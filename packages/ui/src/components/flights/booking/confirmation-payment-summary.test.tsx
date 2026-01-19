import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import type { ConfirmationPaymentSummaryPayment } from "./confirmation-payment-summary";
import { ConfirmationPaymentSummary } from "./confirmation-payment-summary";

describe("ConfirmationPaymentSummary", () => {
  const mockPayment: ConfirmationPaymentSummaryPayment = {
    id: "pay_123",
    amount: "1500.00",
    method: "ALIPAY",
    status: "SUCCESS",
    transactionId: "txn_456",
    createdAt: new Date("2024-01-18T14:30:00"),
  };

  it("renders base amount and total amount", () => {
    render(
      <ConfirmationPaymentSummary
        baseAmount="1,000.00"
        ancillaryAmount="0.00"
        totalAmount="1,000.00"
        payment={null}
      />
    );

    expect(screen.getByText("费用明细")).toBeInTheDocument();
    expect(screen.getByText("机票费用")).toBeInTheDocument();
    expect(screen.getByText("实付金额")).toBeInTheDocument();

    const amounts = screen.getAllByText("¥1,000.00");
    expect(amounts).toHaveLength(2); // base amount and total amount
  });

  it("shows ancillary amount when greater than zero", () => {
    render(
      <ConfirmationPaymentSummary
        baseAmount="1,000.00"
        ancillaryAmount="500.00"
        totalAmount="1,500.00"
        payment={null}
      />
    );

    expect(screen.getByText("增值服务")).toBeInTheDocument();
    expect(screen.getByText("¥500.00")).toBeInTheDocument();
  });

  it("hides ancillary amount when zero", () => {
    render(
      <ConfirmationPaymentSummary
        baseAmount="1,000.00"
        ancillaryAmount="0.00"
        totalAmount="1,000.00"
        payment={null}
      />
    );

    expect(screen.queryByText("增值服务")).not.toBeInTheDocument();
  });

  it("hides ancillary amount when empty string", () => {
    render(
      <ConfirmationPaymentSummary
        baseAmount="1,000.00"
        ancillaryAmount=""
        totalAmount="1,000.00"
        payment={null}
      />
    );

    expect(screen.queryByText("增值服务")).not.toBeInTheDocument();
  });

  it("displays payment time when payment and formattedPaymentTime provided", () => {
    render(
      <ConfirmationPaymentSummary
        baseAmount="1,000.00"
        ancillaryAmount="500.00"
        totalAmount="1,500.00"
        payment={mockPayment}
        formattedPaymentTime="2024-01-18 14:30:00"
      />
    );

    expect(
      screen.getByText(/支付时间：2024-01-18 14:30:00/)
    ).toBeInTheDocument();
  });

  it("does not display payment time when payment is null", () => {
    render(
      <ConfirmationPaymentSummary
        baseAmount="1,000.00"
        ancillaryAmount="0.00"
        totalAmount="1,000.00"
        payment={null}
        formattedPaymentTime="2024-01-18 14:30:00"
      />
    );

    expect(screen.queryByText(/支付时间/)).not.toBeInTheDocument();
  });

  it("does not display payment time when formattedPaymentTime is not provided", () => {
    render(
      <ConfirmationPaymentSummary
        baseAmount="1,000.00"
        ancillaryAmount="0.00"
        totalAmount="1,000.00"
        payment={mockPayment}
      />
    );

    expect(screen.queryByText(/支付时间/)).not.toBeInTheDocument();
  });

  it("highlights total amount in orange", () => {
    render(
      <ConfirmationPaymentSummary
        baseAmount="1,000.00"
        ancillaryAmount="0.00"
        totalAmount="1,000.00"
        payment={null}
      />
    );

    const amounts = screen.getAllByText("¥1,000.00");
    // The second one (index 1) should be the total amount with orange color
    expect(amounts[1]).toHaveClass("text-orange-500");
  });

  it("renders separator between items and total", () => {
    const { container } = render(
      <ConfirmationPaymentSummary
        baseAmount="1,000.00"
        ancillaryAmount="500.00"
        totalAmount="1,500.00"
        payment={null}
      />
    );

    const separator = container.querySelector('[role="none"]');
    expect(separator).toBeInTheDocument();
  });
});
