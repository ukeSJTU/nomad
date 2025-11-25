import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

import { formatCurrency as formatCurrencyUtil } from "@/lib/currency";

interface PassengerInfo {
  name: string;
  documentType: string;
  documentNumber: string;
}

interface FlightInfo {
  flightNumber: string;
  departureAirport: string;
  arrivalAirport: string;
  departureTime: string; // ISO string or formatted string
  arrivalTime: string;
  seatClass: string;
}

interface OrderConfirmationEmailProps {
  orderNumber: string;
  userName?: string;
  outboundFlight: FlightInfo;
  inboundFlight?: FlightInfo;
  passengers: PassengerInfo[];
  baseAmount: string; // Decimal string (e.g., "1500.00")
  ancillaryAmount: string; // Decimal string (e.g., "200.00")
  totalAmount: string; // Decimal string (e.g., "1700.00")
  contactEmail?: string;
  contactPhone?: string;
}

export const OrderConfirmationEmail = ({
  orderNumber,
  userName,
  outboundFlight,
  inboundFlight,
  passengers,
  baseAmount,
  ancillaryAmount,
  totalAmount,
  contactEmail,
  contactPhone,
}: OrderConfirmationEmailProps) => {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleString("zh-CN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  return (
    <Html>
      <Head />
      <Preview>订单确认 - {orderNumber}</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Heading style={heading}>订单确认</Heading>
            <Text style={orderNumberText}>订单号：{orderNumber}</Text>
          </Section>

          {/* Content */}
          <Section style={content}>
            {/* Greeting */}
            <Text style={greeting}>
              {userName ? `${userName}，您好！` : "您好！"}
            </Text>
            <Text style={description}>
              感谢您的预订！您的订单已确认并支付成功。以下是您的订单详情：
            </Text>

            {/* Outbound Flight */}
            <Section style={flightSection}>
              <Text style={flightLabel}>
                {inboundFlight ? "● 去程航班" : "● 航班信息"}
              </Text>
              <Section style={flightDetails}>
                <Row>
                  <Text style={flightInfo}>
                    <strong>航班号：</strong>
                    {outboundFlight.flightNumber}
                  </Text>
                </Row>
                <Row>
                  <Text style={flightInfo}>
                    <strong>起飞：</strong>
                    {outboundFlight.departureAirport} -{" "}
                    {formatDate(outboundFlight.departureTime)}
                  </Text>
                </Row>
                <Row>
                  <Text style={flightInfo}>
                    <strong>到达：</strong>
                    {outboundFlight.arrivalAirport} -{" "}
                    {formatDate(outboundFlight.arrivalTime)}
                  </Text>
                </Row>
                <Row>
                  <Text style={flightInfo}>
                    <strong>舱位：</strong>
                    {outboundFlight.seatClass}
                  </Text>
                </Row>
              </Section>
            </Section>

            {/* Inbound Flight (if exists) */}
            {inboundFlight && (
              <Section style={flightSection}>
                <Text style={flightLabel}>● 返程航班</Text>
                <Section style={flightDetails}>
                  <Row>
                    <Text style={flightInfo}>
                      <strong>航班号：</strong>
                      {inboundFlight.flightNumber}
                    </Text>
                  </Row>
                  <Row>
                    <Text style={flightInfo}>
                      <strong>起飞：</strong>
                      {inboundFlight.departureAirport} -{" "}
                      {formatDate(inboundFlight.departureTime)}
                    </Text>
                  </Row>
                  <Row>
                    <Text style={flightInfo}>
                      <strong>到达：</strong>
                      {inboundFlight.arrivalAirport} -{" "}
                      {formatDate(inboundFlight.arrivalTime)}
                    </Text>
                  </Row>
                  <Row>
                    <Text style={flightInfo}>
                      <strong>舱位：</strong>
                      {inboundFlight.seatClass}
                    </Text>
                  </Row>
                </Section>
              </Section>
            )}

            <Hr style={divider} />

            {/* Passengers */}
            <Section style={passengerSection}>
              <Text style={sectionTitle}>乘客信息</Text>
              {passengers.map((passenger, index) => (
                <Section key={index} style={passengerItem}>
                  <Text style={passengerText}>
                    <strong>
                      {index + 1}. {passenger.name}
                    </strong>
                  </Text>
                  <Text style={passengerDetail}>
                    {passenger.documentType}：{passenger.documentNumber}
                  </Text>
                </Section>
              ))}
            </Section>

            <Hr style={divider} />

            {/* Pricing */}
            <Section style={pricingSection}>
              <Text style={sectionTitle}>费用明细</Text>
              <Row style={priceRow}>
                <Text style={priceLabel}>基础票价</Text>
                <Text style={priceValue}>{formatCurrencyUtil(baseAmount)}</Text>
              </Row>
              {parseFloat(ancillaryAmount) > 0 && (
                <Row style={priceRow}>
                  <Text style={priceLabel}>附加服务</Text>
                  <Text style={priceValue}>
                    {formatCurrencyUtil(ancillaryAmount)}
                  </Text>
                </Row>
              )}
              <Hr style={priceDivider} />
              <Row style={priceRow}>
                <Text style={totalLabel}>总计</Text>
                <Text style={totalValue}>
                  {formatCurrencyUtil(totalAmount)}
                </Text>
              </Row>
            </Section>

            <Hr style={divider} />

            {/* Contact Info */}
            <Section style={contactSection}>
              <Text style={sectionTitle}>联系方式</Text>
              {contactEmail && (
                <Text style={contactText}>
                  <strong>邮箱：</strong>
                  {contactEmail}
                </Text>
              )}
              {contactPhone && (
                <Text style={contactText}>
                  <strong>手机：</strong>
                  {contactPhone}
                </Text>
              )}
            </Section>

            {/* Important Notice */}
            <Section style={noticeSection}>
              <Text style={noticeTitle}>重要提示</Text>
              <Text style={noticeText}>
                • 请凭订单号和有效证件办理值机手续
                <br />
                • 建议提前 2 小时到达机场
                <br />• 如需更改或取消订单，请联系客服
              </Text>
            </Section>
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>感谢您选择 Nomad</Text>
            <Text style={footerText}>© 2025 Nomad. 保留所有权利。</Text>
            <Text style={footerLinks}>
              <Link href="https://nomad.com/help" style={footerLink}>
                帮助中心
              </Link>
              {" • "}
              <Link href="https://nomad.com/contact" style={footerLink}>
                联系我们
              </Link>
              {" • "}
              <Link href="https://nomad.com/terms" style={footerLink}>
                服务条款
              </Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

OrderConfirmationEmail.PreviewProps = {
  orderNumber: "NMD20251122ABCD",
  userName: "张三",
  outboundFlight: {
    flightNumber: "CA1234",
    departureAirport: "北京首都国际机场 (PEK)",
    arrivalAirport: "上海浦东国际机场 (PVG)",
    departureTime: "2025-12-25T08:30:00",
    arrivalTime: "2025-12-25T11:00:00",
    seatClass: "经济舱",
  },
  inboundFlight: {
    flightNumber: "CA5678",
    departureAirport: "上海浦东国际机场 (PVG)",
    arrivalAirport: "北京首都国际机场 (PEK)",
    departureTime: "2025-12-28T14:30:00",
    arrivalTime: "2025-12-28T17:00:00",
    seatClass: "经济舱",
  },
  passengers: [
    {
      name: "张三",
      documentType: "身份证",
      documentNumber: "110101199001011234",
    },
    {
      name: "李四",
      documentType: "护照",
      documentNumber: "E12345678",
    },
  ],
  baseAmount: "1800.0",
  ancillaryAmount: "200.0",
  totalAmount: "2000.0",
  contactEmail: "zhangsan@example.com",
  contactPhone: "13800138000",
} as OrderConfirmationEmailProps;

export default OrderConfirmationEmail;

// ============================================================================
// Styles
// ============================================================================

const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Ubuntu, "Microsoft YaHei", "微软雅黑", sans-serif',
  padding: "20px 0",
};

const container = {
  backgroundColor: "#ffffff",
  borderRadius: "12px",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.07), 0 1px 3px rgba(0, 0, 0, 0.06)",
  margin: "0 auto",
  maxWidth: "600px",
  overflow: "hidden",
};

const header = {
  backgroundColor: "#4F46E5",
  padding: "32px 40px",
  textAlign: "center" as const,
};

const heading = {
  color: "#ffffff",
  fontSize: "28px",
  fontWeight: "700",
  lineHeight: "1.3",
  margin: "0 0 8px 0",
};

const orderNumberText = {
  color: "#e0e7ff",
  fontSize: "14px",
  fontWeight: "500",
  margin: "0",
  letterSpacing: "0.5px",
};

const content = {
  padding: "40px",
};

const greeting = {
  color: "#1a1a1a",
  fontSize: "18px",
  fontWeight: "600",
  lineHeight: "1.5",
  margin: "0 0 12px 0",
};

const description = {
  color: "#6b7280",
  fontSize: "15px",
  lineHeight: "1.6",
  margin: "0 0 32px 0",
};

const flightSection = {
  marginBottom: "24px",
};

const flightLabel = {
  color: "#4F46E5",
  fontSize: "16px",
  fontWeight: "600",
  margin: "0 0 12px 0",
};

const flightDetails = {
  backgroundColor: "#f9fafb",
  borderRadius: "8px",
  padding: "16px",
};

const flightInfo = {
  color: "#374151",
  fontSize: "14px",
  lineHeight: "1.6",
  margin: "0 0 8px 0",
};

const divider = {
  borderTop: "1px solid #e5e7eb",
  margin: "32px 0",
};

const sectionTitle = {
  color: "#1a1a1a",
  fontSize: "16px",
  fontWeight: "600",
  margin: "0 0 16px 0",
};

const passengerSection = {
  marginBottom: "0",
};

const passengerItem = {
  marginBottom: "12px",
};

const passengerText = {
  color: "#374151",
  fontSize: "14px",
  lineHeight: "1.5",
  margin: "0 0 4px 0",
};

const passengerDetail = {
  color: "#6b7280",
  fontSize: "13px",
  lineHeight: "1.5",
  margin: "0",
};

const pricingSection = {
  marginBottom: "0",
};

const priceRow = {
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "8px",
};

const priceLabel = {
  color: "#6b7280",
  fontSize: "14px",
  margin: "0",
};

const priceValue = {
  color: "#374151",
  fontSize: "14px",
  fontWeight: "500",
  margin: "0",
};

const priceDivider = {
  borderTop: "1px solid #e5e7eb",
  margin: "12px 0",
};

const totalLabel = {
  color: "#1a1a1a",
  fontSize: "16px",
  fontWeight: "600",
  margin: "0",
};

const totalValue = {
  color: "#4F46E5",
  fontSize: "18px",
  fontWeight: "700",
  margin: "0",
};

const contactSection = {
  marginBottom: "0",
};

const contactText = {
  color: "#374151",
  fontSize: "14px",
  lineHeight: "1.6",
  margin: "0 0 8px 0",
};

const noticeSection = {
  backgroundColor: "#fffbeb",
  borderLeft: "4px solid #f59e0b",
  borderRadius: "8px",
  padding: "16px",
  marginTop: "32px",
};

const noticeTitle = {
  color: "#92400e",
  fontSize: "14px",
  fontWeight: "600",
  margin: "0 0 8px 0",
};

const noticeText = {
  color: "#78350f",
  fontSize: "13px",
  lineHeight: "1.6",
  margin: "0",
};

const footer = {
  backgroundColor: "#f9fafb",
  borderTop: "1px solid #e5e7eb",
  padding: "32px 40px",
  textAlign: "center" as const,
};

const footerText = {
  color: "#9ca3af",
  fontSize: "12px",
  lineHeight: "1.5",
  margin: "0 0 8px 0",
};

const footerLinks = {
  color: "#9ca3af",
  fontSize: "12px",
  lineHeight: "1.5",
  margin: "0",
};

const footerLink = {
  color: "#6b7280",
  textDecoration: "none",
  fontWeight: "500",
  borderBottom: "1px solid #6b7280",
};
