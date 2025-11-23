import { describe, expect, it } from "vitest";

import type { OrderUserEmailData } from "@/types/dto/emails";
import type { OrderDetailFull } from "@/types/dto/orders";

import { transformOrderDetailToEmailData } from "./email-transformers";

describe("email-transformers", () => {
  describe("transformOrderDetailToEmailData", () => {
    const mockUser: OrderUserEmailData = {
      name: "张三",
      email: "zhangsan@example.com",
    };

    const mockOrderDetail: OrderDetailFull = {
      status: {
        id: "order-123",
        orderNumber: "ORD-2024-001",
        status: "CONFIRMED",
        paymentDeadline: "2024-12-31T23:59:59Z",
        createdAt: "2024-01-15T10:00:00Z",
      },
      outboundFlight: {
        flightNumber: "CA1234",
        airlineName: "中国国际航空",
        airlineIataCode: "CA",
        airlineLogoUrl: "https://example.com/logo.png",
        departureAirportName: "北京首都国际机场",
        departureAirportIataCode: "PEK",
        departureCityName: "北京",
        arrivalAirportName: "上海浦东国际机场",
        arrivalAirportIataCode: "PVG",
        arrivalCityName: "上海",
        departureDatetime: "2024-02-01T08:00:00Z",
        arrivalDatetime: "2024-02-01T10:30:00Z",
        seatClassType: "economy",
        duration: 150,
        aircraftType: "Boeing 737",
        departureTerminal: "T3",
        arrivalTerminal: "T2",
      },
      inboundFlight: {
        flightNumber: "CA5678",
        airlineName: "中国国际航空",
        airlineIataCode: "CA",
        airlineLogoUrl: "https://example.com/logo.png",
        departureAirportName: "上海浦东国际机场",
        departureAirportIataCode: "PVG",
        departureCityName: "上海",
        arrivalAirportName: "北京首都国际机场",
        arrivalAirportIataCode: "PEK",
        arrivalCityName: "北京",
        departureDatetime: "2024-02-05T14:00:00Z",
        arrivalDatetime: "2024-02-05T16:30:00Z",
        seatClassType: "business",
        duration: 150,
        aircraftType: "Boeing 737",
        departureTerminal: "T2",
        arrivalTerminal: "T3",
      },
      passengers: [
        {
          name: "张三",
          idType: "id_card",
          idNumber: "110101199001011234",
        },
        {
          name: "李四",
          idType: "passport",
          idNumber: "E12345678",
        },
      ],
      contact: {
        contactPhone: "+86 138 0000 0000",
        contactEmail: "contact@example.com",
      },
      payment: {
        outboundFlight: {
          depatureCityName: "北京",
          arrivalCityName: "上海",
          unitPrice: "500.00",
          passengerCount: 2,
        },
        inboundFlight: {
          depatureCityName: "上海",
          arrivalCityName: "北京",
          unitPrice: "1200.00",
          passengerCount: 2,
        },
        ancillaryServices: [
          {
            name: "行李托运",
            code: "BAGGAGE",
            unitPrice: "50.00",
            quantity: 2,
          },
        ],
        createdAt: "2024-01-15T10:00:00Z",
        baseAmount: "3400.00",
        ancillaryAmount: "100.00",
        totalAmount: "3500.00",
      },
    };

    it("should transform order detail to email data correctly", () => {
      const result = transformOrderDetailToEmailData(mockOrderDetail, mockUser);

      expect(result.orderNumber).toBe("ORD-2024-001");
      expect(result.user).toEqual(mockUser);
    });

    it("should transform outbound flight correctly", () => {
      const result = transformOrderDetailToEmailData(mockOrderDetail, mockUser);

      expect(result.outboundFlight).toEqual({
        flightNumber: "CA1234",
        airlineName: "中国国际航空",
        departureAirport: "北京首都国际机场",
        arrivalAirport: "上海浦东国际机场",
        departureTime: "2024-02-01T08:00:00Z",
        arrivalTime: "2024-02-01T10:30:00Z",
        seatClass: "经济舱",
      });
    });

    it("should transform inbound flight correctly when present", () => {
      const result = transformOrderDetailToEmailData(mockOrderDetail, mockUser);

      expect(result.inboundFlight).toEqual({
        flightNumber: "CA5678",
        airlineName: "中国国际航空",
        departureAirport: "上海浦东国际机场",
        arrivalAirport: "北京首都国际机场",
        departureTime: "2024-02-05T14:00:00Z",
        arrivalTime: "2024-02-05T16:30:00Z",
        seatClass: "商务舱",
      });
    });

    it("should handle null inbound flight", () => {
      const orderWithoutInbound: OrderDetailFull = {
        ...mockOrderDetail,
        inboundFlight: null,
      };

      const result = transformOrderDetailToEmailData(
        orderWithoutInbound,
        mockUser
      );

      expect(result.inboundFlight).toBeNull();
    });

    it("should transform passengers correctly", () => {
      const result = transformOrderDetailToEmailData(mockOrderDetail, mockUser);

      expect(result.passengers).toEqual([
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
      ]);
    });

    it("should transform pricing correctly", () => {
      const result = transformOrderDetailToEmailData(mockOrderDetail, mockUser);

      expect(result.pricing).toEqual({
        baseAmount: "3400.00",
        ancillaryAmount: "100.00",
        totalAmount: "3500.00",
      });
    });

    it("should transform contact information correctly", () => {
      const result = transformOrderDetailToEmailData(mockOrderDetail, mockUser);

      expect(result.contact).toEqual({
        phone: "+86 138 0000 0000",
        email: "contact@example.com",
      });
    });

    it("should handle missing contact information", () => {
      const orderWithoutContact: OrderDetailFull = {
        ...mockOrderDetail,
        contact: {},
      };

      const result = transformOrderDetailToEmailData(
        orderWithoutContact,
        mockUser
      );

      expect(result.contact).toEqual({
        phone: undefined,
        email: undefined,
      });
    });

    it("should transform first class seat correctly", () => {
      const orderWithFirstClass: OrderDetailFull = {
        ...mockOrderDetail,
        outboundFlight: {
          ...mockOrderDetail.outboundFlight,
          seatClassType: "first",
        },
      };

      const result = transformOrderDetailToEmailData(
        orderWithFirstClass,
        mockUser
      );

      expect(result.outboundFlight.seatClass).toBe("头等舱");
    });

    it("should handle unknown seat class type", () => {
      const orderWithUnknownClass: OrderDetailFull = {
        ...mockOrderDetail,
        outboundFlight: {
          ...mockOrderDetail.outboundFlight,
          seatClassType: "premium_economy" as any,
        },
      };

      const result = transformOrderDetailToEmailData(
        orderWithUnknownClass,
        mockUser
      );

      expect(result.outboundFlight.seatClass).toBe("premium_economy");
    });

    it("should handle unknown document type", () => {
      const orderWithUnknownDocType: OrderDetailFull = {
        ...mockOrderDetail,
        passengers: [
          {
            name: "王五",
            idType: "drivers_license" as any,
            idNumber: "DL123456",
          },
        ],
      };

      const result = transformOrderDetailToEmailData(
        orderWithUnknownDocType,
        mockUser
      );

      expect(result.passengers[0].documentType).toBe("drivers_license");
    });

    it("should handle other document type", () => {
      const orderWithOtherDocType: OrderDetailFull = {
        ...mockOrderDetail,
        passengers: [
          {
            name: "赵六",
            idType: "other",
            idNumber: "OTHER123",
          },
        ],
      };

      const result = transformOrderDetailToEmailData(
        orderWithOtherDocType,
        mockUser
      );

      expect(result.passengers[0].documentType).toBe("其他证件");
    });

    it("should preserve user data without modification", () => {
      const userWithoutName: OrderUserEmailData = {
        email: "test@example.com",
      };

      const result = transformOrderDetailToEmailData(
        mockOrderDetail,
        userWithoutName
      );

      expect(result.user).toEqual(userWithoutName);
      expect(result.user.name).toBeUndefined();
    });

    it("should handle empty passenger list", () => {
      const orderWithNoPassengers: OrderDetailFull = {
        ...mockOrderDetail,
        passengers: [],
      };

      const result = transformOrderDetailToEmailData(
        orderWithNoPassengers,
        mockUser
      );

      expect(result.passengers).toEqual([]);
    });

    it("should handle multiple passengers with same document type", () => {
      const orderWithMultiplePassport: OrderDetailFull = {
        ...mockOrderDetail,
        passengers: [
          {
            name: "John Doe",
            idType: "passport",
            idNumber: "US123456",
          },
          {
            name: "Jane Doe",
            idType: "passport",
            idNumber: "US789012",
          },
          {
            name: "Jack Doe",
            idType: "passport",
            idNumber: "US345678",
          },
        ],
      };

      const result = transformOrderDetailToEmailData(
        orderWithMultiplePassport,
        mockUser
      );

      expect(result.passengers).toHaveLength(3);
      expect(result.passengers.every(p => p.documentType === "护照")).toBe(
        true
      );
    });
  });
});
