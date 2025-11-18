import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import OrderCard from "@/components/user/order-card";
import type { OrderListItem } from "@/types/dto/orders";

const meta = {
  title: "User/OrderCard",
  component: OrderCard,
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof OrderCard>;

export default meta;
type Story = StoryObj<typeof meta>;

// ========== 单程票 ==========

// 单程 - 待支付
export const OneWayPendingPayment: Story = {
  args: {
    order: {
      id: "1",
      orderNumber: "NMD20251118001",
      status: "PENDING_PAYMENT",
      createdAt: "2025-11-18T10:30:00Z",
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
      passengerNames: ["张三"],
      passengerCount: 1,
      totalAmount: "1000",
    } as OrderListItem,
    isChecked: false,
    onCheckChange: () => {},
    onDelete: () => {},
  },
};

// 单程 - 已确认
export const OneWayConfirmed: Story = {
  args: {
    order: {
      id: "2",
      orderNumber: "NMD20251117002",
      status: "CONFIRMED",
      createdAt: "2025-11-17T14:20:00Z",
      outboundFlight: {
        flightNumber: "CA1234",
        airlineName: "中国国际航空",
        airlineIataCode: "CA",
        airlineLogoUrl: null,
        departureAirportName: "白云国际机场",
        departureAirportIataCode: "CAN",
        departureCityName: "广州",
        arrivalAirportName: "宝安国际机场",
        arrivalAirportIataCode: "SZX",
        arrivalCityName: "深圳",
        departureDatetime: "2025-12-05T10:00:00Z",
        arrivalDatetime: "2025-12-05T11:00:00Z",
        seatClassType: "BUSINESS",
      },
      inboundFlight: null,
      passengerNames: ["李四", "王五"],
      passengerCount: 2,
      totalAmount: "1688",
    } as OrderListItem,
    isChecked: false,
    onCheckChange: () => {},
    onDelete: () => {},
  },
};

// 单程 - 已取消
export const OneWayCancelled: Story = {
  args: {
    order: {
      id: "3",
      orderNumber: "NMD20251116003",
      status: "CANCELLED",
      createdAt: "2025-11-16T09:15:00Z",
      outboundFlight: {
        flightNumber: "CZ3456",
        airlineName: "中国南方航空",
        airlineIataCode: "CZ",
        airlineLogoUrl: null,
        departureAirportName: "双流国际机场",
        departureAirportIataCode: "CTU",
        departureCityName: "成都",
        arrivalAirportName: "江北国际机场",
        arrivalAirportIataCode: "CKG",
        arrivalCityName: "重庆",
        departureDatetime: "2025-11-25T12:00:00Z",
        arrivalDatetime: "2025-11-25T13:00:00Z",
        seatClassType: "ECONOMY",
      },
      inboundFlight: null,
      passengerNames: ["赵六"],
      passengerCount: 1,
      totalAmount: "488",
    } as OrderListItem,
    isChecked: false,
    onCheckChange: () => {},
    onDelete: () => {},
  },
};

// 单程 - 已退款
export const OneWayRefunded: Story = {
  args: {
    order: {
      id: "4",
      orderNumber: "NMD20251115004",
      status: "REFUNDED",
      createdAt: "2025-11-15T16:45:00Z",
      outboundFlight: {
        flightNumber: "3U8888",
        airlineName: "四川航空",
        airlineIataCode: "3U",
        airlineLogoUrl: null,
        departureAirportName: "萧山国际机场",
        departureAirportIataCode: "HGH",
        departureCityName: "杭州",
        arrivalAirportName: "咸阳国际机场",
        arrivalAirportIataCode: "XIY",
        arrivalCityName: "西安",
        departureDatetime: "2025-11-20T14:30:00Z",
        arrivalDatetime: "2025-11-20T17:00:00Z",
        seatClassType: "ECONOMY",
      },
      inboundFlight: null,
      passengerNames: ["孙七"],
      passengerCount: 1,
      totalAmount: "888",
    } as OrderListItem,
    isChecked: false,
    onCheckChange: () => {},
    onDelete: () => {},
  },
};

// ========== 往返票 ==========

// 往返 - 待支付
export const RoundTripPendingPayment: Story = {
  args: {
    order: {
      id: "5",
      orderNumber: "NMD20251118005",
      status: "PENDING_PAYMENT",
      createdAt: "2025-11-18T11:00:00Z",
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
        departureDatetime: "2025-12-10T07:30:00Z",
        arrivalDatetime: "2025-12-10T09:45:00Z",
        seatClassType: "ECONOMY",
      },
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
        departureDatetime: "2025-12-15T20:40:00Z",
        arrivalDatetime: "2025-12-15T22:55:00Z",
        seatClassType: "ECONOMY",
      },
      passengerNames: ["周八"],
      passengerCount: 1,
      totalAmount: "2000",
    } as OrderListItem,
    isChecked: false,
    onCheckChange: () => {},
    onDelete: () => {},
  },
};

// 往返 - 已确认
export const RoundTripConfirmed: Story = {
  args: {
    order: {
      id: "6",
      orderNumber: "NMD20251117006",
      status: "CONFIRMED",
      createdAt: "2025-11-17T15:20:00Z",
      outboundFlight: {
        flightNumber: "CA1801",
        airlineName: "中国国际航空",
        airlineIataCode: "CA",
        airlineLogoUrl: null,
        departureAirportName: "虹桥国际机场",
        departureAirportIataCode: "SHA",
        departureCityName: "上海",
        arrivalAirportName: "白云国际机场",
        arrivalAirportIataCode: "CAN",
        arrivalCityName: "广州",
        departureDatetime: "2025-12-20T08:00:00Z",
        arrivalDatetime: "2025-12-20T10:30:00Z",
        seatClassType: "BUSINESS",
      },
      inboundFlight: {
        flightNumber: "CA1802",
        airlineName: "中国国际航空",
        airlineIataCode: "CA",
        airlineLogoUrl: null,
        departureAirportName: "白云国际机场",
        departureAirportIataCode: "CAN",
        departureCityName: "广州",
        arrivalAirportName: "虹桥国际机场",
        arrivalAirportIataCode: "SHA",
        arrivalCityName: "上海",
        departureDatetime: "2025-12-25T18:00:00Z",
        arrivalDatetime: "2025-12-25T20:30:00Z",
        seatClassType: "BUSINESS",
      },
      passengerNames: ["吴九", "郑十"],
      passengerCount: 2,
      totalAmount: "4388",
    } as OrderListItem,
    isChecked: false,
    onCheckChange: () => {},
    onDelete: () => {},
  },
};

// 往返 - 已取消
export const RoundTripCancelled: Story = {
  args: {
    order: {
      id: "7",
      orderNumber: "NMD20251116007",
      status: "CANCELLED",
      createdAt: "2025-11-16T10:30:00Z",
      outboundFlight: {
        flightNumber: "HU7123",
        airlineName: "海南航空",
        airlineIataCode: "HU",
        airlineLogoUrl: null,
        departureAirportName: "双流国际机场",
        departureAirportIataCode: "CTU",
        departureCityName: "成都",
        arrivalAirportName: "首都国际机场",
        arrivalAirportIataCode: "PEK",
        arrivalCityName: "北京",
        departureDatetime: "2025-12-08T09:00:00Z",
        arrivalDatetime: "2025-12-08T11:30:00Z",
        seatClassType: "ECONOMY",
      },
      inboundFlight: {
        flightNumber: "HU7124",
        airlineName: "海南航空",
        airlineIataCode: "HU",
        airlineLogoUrl: null,
        departureAirportName: "首都国际机场",
        departureAirportIataCode: "PEK",
        departureCityName: "北京",
        arrivalAirportName: "双流国际机场",
        arrivalAirportIataCode: "CTU",
        arrivalCityName: "成都",
        departureDatetime: "2025-12-12T15:00:00Z",
        arrivalDatetime: "2025-12-12T17:30:00Z",
        seatClassType: "ECONOMY",
      },
      passengerNames: ["冯十一"],
      passengerCount: 1,
      totalAmount: "1888",
    } as OrderListItem,
    isChecked: false,
    onCheckChange: () => {},
    onDelete: () => {},
  },
};

// 往返 - 已退款
export const RoundTripRefunded: Story = {
  args: {
    order: {
      id: "8",
      orderNumber: "NMD20251115008",
      status: "REFUNDED",
      createdAt: "2025-11-15T13:00:00Z",
      outboundFlight: {
        flightNumber: "MF8501",
        airlineName: "厦门航空",
        airlineIataCode: "MF",
        airlineLogoUrl: null,
        departureAirportName: "萧山国际机场",
        departureAirportIataCode: "HGH",
        departureCityName: "杭州",
        arrivalAirportName: "高崎国际机场",
        arrivalAirportIataCode: "XMN",
        arrivalCityName: "厦门",
        departureDatetime: "2025-11-28T10:00:00Z",
        arrivalDatetime: "2025-11-28T11:45:00Z",
        seatClassType: "ECONOMY",
      },
      inboundFlight: {
        flightNumber: "MF8502",
        airlineName: "厦门航空",
        airlineIataCode: "MF",
        airlineLogoUrl: null,
        departureAirportName: "高崎国际机场",
        departureAirportIataCode: "XMN",
        departureCityName: "厦门",
        arrivalAirportName: "萧山国际机场",
        arrivalAirportIataCode: "HGH",
        arrivalCityName: "杭州",
        departureDatetime: "2025-12-02T16:00:00Z",
        arrivalDatetime: "2025-12-02T17:45:00Z",
        seatClassType: "ECONOMY",
      },
      passengerNames: ["陈十二", "褚十三", "卫十四"],
      passengerCount: 3,
      totalAmount: "2688",
    } as OrderListItem,
    isChecked: false,
    onCheckChange: () => {},
    onDelete: () => {},
  },
};
