import { render } from "@react-email/components";
import { describe, expect, it } from "vitest";

import { OrderConfirmationEmail } from "./order-confirmation";

describe("OrderConfirmationEmail", () => {
  const mockOrderData = {
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
    passengers: [
      {
        name: "张三",
        documentType: "身份证",
        documentNumber: "110101199001011234",
      },
    ],
    baseAmount: 1800.0,
    ancillaryAmount: 200.0,
    totalAmount: 2000.0,
    contactEmail: "zhangsan@example.com",
    contactPhone: "13800138000",
  };

  describe("Basic Rendering", () => {
    it("renders without crashing", async () => {
      const html = await render(<OrderConfirmationEmail {...mockOrderData} />);
      expect(html).toBeTruthy();
      expect(typeof html).toBe("string");
    });

    it("includes order number in the email", async () => {
      const html = await render(<OrderConfirmationEmail {...mockOrderData} />);
      expect(html).toContain("NMD20251122ABCD");
    });

    it("includes user name when provided", async () => {
      const html = await render(<OrderConfirmationEmail {...mockOrderData} />);
      expect(html).toContain("张三，您好！");
    });

    it("shows generic greeting when user name is not provided", async () => {
      const dataWithoutName = { ...mockOrderData, userName: undefined };
      const html = await render(
        <OrderConfirmationEmail {...dataWithoutName} />
      );
      expect(html).toContain("您好！");
      expect(html).not.toContain("张三，您好！");
    });
  });

  describe("Flight Information", () => {
    it("displays outbound flight information", async () => {
      const html = await render(<OrderConfirmationEmail {...mockOrderData} />);
      expect(html).toContain("CA1234");
      expect(html).toContain("北京首都国际机场 (PEK)");
      expect(html).toContain("上海浦东国际机场 (PVG)");
      expect(html).toContain("经济舱");
    });

    it("shows single flight label when no inbound flight", async () => {
      const html = await render(<OrderConfirmationEmail {...mockOrderData} />);
      expect(html).toContain("● 航班信息");
      expect(html).not.toContain("● 去程航班");
    });

    it("displays both outbound and inbound flights for round trip", async () => {
      const roundTripData = {
        ...mockOrderData,
        inboundFlight: {
          flightNumber: "CA5678",
          departureAirport: "上海浦东国际机场 (PVG)",
          arrivalAirport: "北京首都国际机场 (PEK)",
          departureTime: "2025-12-28T14:30:00",
          arrivalTime: "2025-12-28T17:00:00",
          seatClass: "经济舱",
        },
      };

      const html = await render(<OrderConfirmationEmail {...roundTripData} />);
      expect(html).toContain("● 去程航班");
      expect(html).toContain("● 返程航班");
      expect(html).toContain("CA1234");
      expect(html).toContain("CA5678");
    });
  });

  describe("Passenger Information", () => {
    it("displays all passengers", async () => {
      const html = await render(<OrderConfirmationEmail {...mockOrderData} />);
      expect(html).toContain("张三");
      expect(html).toContain("身份证");
      expect(html).toContain("110101199001011234");
    });

    it("numbers passengers correctly", async () => {
      const multiPassengerData = {
        ...mockOrderData,
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
          {
            name: "王五",
            documentType: "身份证",
            documentNumber: "110101199002021234",
          },
        ],
      };

      const html = await render(
        <OrderConfirmationEmail {...multiPassengerData} />
      );
      expect(html).toContain("张三");
      expect(html).toContain("李四");
      expect(html).toContain("王五");
      // Check numbering exists (HTML may have comment tags and spacing)
      expect(html).toMatch(/1[\s\S]*?张三/);
      expect(html).toMatch(/2[\s\S]*?李四/);
      expect(html).toMatch(/3[\s\S]*?王五/);
    });
  });

  describe("Pricing Information", () => {
    it("displays base amount correctly", async () => {
      const html = await render(<OrderConfirmationEmail {...mockOrderData} />);
      expect(html).toContain("¥1800.00");
    });

    it("shows ancillary amount when greater than zero", async () => {
      const html = await render(<OrderConfirmationEmail {...mockOrderData} />);
      expect(html).toContain("附加服务");
      expect(html).toContain("¥200.00");
    });

    it("hides ancillary amount when zero", async () => {
      const noAncillaryData = { ...mockOrderData, ancillaryAmount: 0 };
      const html = await render(
        <OrderConfirmationEmail {...noAncillaryData} />
      );
      expect(html).not.toContain("附加服务");
    });

    it("displays total amount correctly", async () => {
      const html = await render(<OrderConfirmationEmail {...mockOrderData} />);
      expect(html).toContain("¥2000.00");
    });

    it("formats decimal amounts correctly", async () => {
      const decimalData = {
        ...mockOrderData,
        baseAmount: 1234.56,
        ancillaryAmount: 98.76,
        totalAmount: 1333.32,
      };
      const html = await render(<OrderConfirmationEmail {...decimalData} />);
      expect(html).toContain("¥1234.56");
      expect(html).toContain("¥98.76");
      expect(html).toContain("¥1333.32");
    });
  });

  describe("Contact Information", () => {
    it("displays contact email when provided", async () => {
      const html = await render(<OrderConfirmationEmail {...mockOrderData} />);
      expect(html).toContain("zhangsan@example.com");
    });

    it("displays contact phone when provided", async () => {
      const html = await render(<OrderConfirmationEmail {...mockOrderData} />);
      expect(html).toContain("13800138000");
    });

    it("handles missing contact email", async () => {
      const noEmailData = { ...mockOrderData, contactEmail: undefined };
      const html = await render(<OrderConfirmationEmail {...noEmailData} />);
      expect(html).not.toContain("zhangsan@example.com");
      expect(html).toContain("13800138000"); // Phone should still show
    });

    it("handles missing contact phone", async () => {
      const noPhoneData = { ...mockOrderData, contactPhone: undefined };
      const html = await render(<OrderConfirmationEmail {...noPhoneData} />);
      expect(html).not.toContain("13800138000");
      expect(html).toContain("zhangsan@example.com"); // Email should still show
    });
  });

  describe("Content Sections", () => {
    it("includes important notice section", async () => {
      const html = await render(<OrderConfirmationEmail {...mockOrderData} />);
      expect(html).toContain("重要提示");
      expect(html).toContain("请凭订单号和有效证件办理值机手续");
    });

    it("includes footer with links", async () => {
      const html = await render(<OrderConfirmationEmail {...mockOrderData} />);
      expect(html).toContain("感谢您选择 Nomad");
      expect(html).toContain("© 2025 Nomad");
      expect(html).toContain("帮助中心");
      expect(html).toContain("联系我们");
      expect(html).toContain("服务条款");
    });

    it("includes confirmation message", async () => {
      const html = await render(<OrderConfirmationEmail {...mockOrderData} />);
      expect(html).toContain("感谢您的预订");
      expect(html).toContain("您的订单已确认并支付成功");
    });
  });

  describe("HTML Structure", () => {
    it("generates valid HTML with proper structure", async () => {
      const html = await render(<OrderConfirmationEmail {...mockOrderData} />);
      expect(html).toContain("<html");
      expect(html).toContain("<head");
      expect(html).toContain("<body");
      expect(html).toContain("</html>");
    });

    it("includes preview text", async () => {
      const html = await render(<OrderConfirmationEmail {...mockOrderData} />);
      expect(html).toContain("订单确认 - NMD20251122ABCD");
    });
  });
});
