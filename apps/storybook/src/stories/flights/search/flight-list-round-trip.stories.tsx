import type { FlightCardProps } from "@nomad/ui/components/flights/results";
import { FlightListRoundTrip } from "@nomad/ui/components/flights/search";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  title: "Flights/Search/FlightListRoundTrip",
  component: FlightListRoundTrip,
  parameters: {
    layout: "padded",
  },
  argTypes: {
    flights: {
      control: "object",
      description: "Array of flight card props",
    },
    activeTab: {
      control: "radio",
      options: ["outbound", "return"],
      description: "Active tab (outbound or return)",
    },
    noFlightsTitle: {
      control: "text",
      description: "Text to display when no flights are found",
    },
    noFlightsDescription: {
      control: "text",
      description: "Description text for empty state",
    },
    className: {
      control: "text",
      description: "Custom className for the container",
    },
  },
} satisfies Meta<typeof FlightListRoundTrip>;

export default meta;
type Story = StoryObj<typeof meta>;

// Mock currency formatter
const mockFormatCurrency = (value: number) => `¥${value.toFixed(2)}`;

// Mock outbound flights data
const mockOutboundFlights: FlightCardProps[] = [
  {
    airlineLogo:
      "https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?w=100&h=100&fit=crop",
    airlineName: "中国国际航空",
    flightNumber: "CA1234",
    aircraftType: "Boeing 737-800",
    departureTime: "08:00",
    departureAirport: "北京首都国际机场 T3",
    arrivalTime: "10:55",
    arrivalAirport: "上海浦东国际机场 T2",
    duration: "2h 55m",
    seatClasses: [
      {
        id: "1",
        classType: "ECONOMY",
        totalSeats: 150,
        availableSeats: 45,
        price: 804,
      },
      {
        id: "2",
        classType: "BUSINESS",
        totalSeats: 30,
        availableSeats: 8,
        price: 3200,
      },
    ],
    lowestPrice: 804,
    formatCurrency: mockFormatCurrency,
    buttonText: "选择去程",
    onSeatClassClick: seatClass => {
      console.log("Outbound seat class clicked:", seatClass);
    },
  },
  {
    airlineLogo:
      "https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?w=100&h=100&fit=crop",
    airlineName: "中国东方航空",
    flightNumber: "MU5678",
    aircraftType: "Airbus A320",
    departureTime: "14:30",
    departureAirport: "北京首都国际机场 T2",
    arrivalTime: "17:25",
    arrivalAirport: "上海虹桥国际机场 T1",
    duration: "2h 55m",
    seatClasses: [
      {
        id: "3",
        classType: "ECONOMY",
        totalSeats: 150,
        availableSeats: 32,
        price: 920,
      },
      {
        id: "4",
        classType: "BUSINESS",
        totalSeats: 30,
        availableSeats: 12,
        price: 2800,
      },
    ],
    lowestPrice: 920,
    formatCurrency: mockFormatCurrency,
    buttonText: "选择去程",
    onSeatClassClick: seatClass => {
      console.log("Outbound seat class clicked:", seatClass);
    },
  },
  {
    airlineLogo:
      "https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?w=100&h=100&fit=crop",
    airlineName: "海南航空",
    flightNumber: "HU7890",
    aircraftType: "Boeing 787-9",
    departureTime: "20:15",
    departureAirport: "北京大兴国际机场 T1",
    arrivalTime: "23:05",
    arrivalAirport: "上海浦东国际机场 T1",
    duration: "2h 50m",
    seatClasses: [
      {
        id: "5",
        classType: "ECONOMY",
        totalSeats: 180,
        availableSeats: 67,
        price: 750,
      },
      {
        id: "6",
        classType: "BUSINESS",
        totalSeats: 40,
        availableSeats: 5,
        price: 3500,
      },
      {
        id: "7",
        classType: "FIRST",
        totalSeats: 8,
        availableSeats: 1,
        price: 9500,
      },
    ],
    lowestPrice: 750,
    formatCurrency: mockFormatCurrency,
    buttonText: "选择去程",
    onSeatClassClick: seatClass => {
      console.log("Outbound seat class clicked:", seatClass);
    },
  },
];

// Mock return flights data
const mockReturnFlights: FlightCardProps[] = [
  {
    airlineLogo:
      "https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?w=100&h=100&fit=crop",
    airlineName: "中国东方航空",
    flightNumber: "MU5679",
    aircraftType: "Airbus A320",
    departureTime: "09:30",
    departureAirport: "上海浦东国际机场 T2",
    arrivalTime: "12:25",
    arrivalAirport: "北京首都国际机场 T3",
    duration: "2h 55m",
    seatClasses: [
      {
        id: "8",
        classType: "ECONOMY",
        totalSeats: 150,
        availableSeats: 38,
        price: 880,
      },
      {
        id: "9",
        classType: "BUSINESS",
        totalSeats: 30,
        availableSeats: 10,
        price: 3100,
      },
    ],
    lowestPrice: 880,
    formatCurrency: mockFormatCurrency,
    buttonText: "选择返程",
    onSeatClassClick: seatClass => {
      console.log("Return seat class clicked:", seatClass);
    },
  },
  {
    airlineLogo:
      "https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?w=100&h=100&fit=crop",
    airlineName: "海南航空",
    flightNumber: "HU7891",
    aircraftType: "Boeing 787-9",
    departureTime: "15:45",
    departureAirport: "上海浦东国际机场 T1",
    arrivalTime: "18:35",
    arrivalAirport: "北京大兴国际机场 T1",
    duration: "2h 50m",
    seatClasses: [
      {
        id: "10",
        classType: "ECONOMY",
        totalSeats: 180,
        availableSeats: 72,
        price: 780,
      },
      {
        id: "11",
        classType: "BUSINESS",
        totalSeats: 40,
        availableSeats: 8,
        price: 3600,
      },
    ],
    lowestPrice: 780,
    formatCurrency: mockFormatCurrency,
    buttonText: "选择返程",
    onSeatClassClick: seatClass => {
      console.log("Return seat class clicked:", seatClass);
    },
  },
];

// Default story - Outbound flights
export const OutboundFlights: Story = {
  args: {
    flights: mockOutboundFlights,
    activeTab: "outbound",
    className: "space-y-4",
  },
};

// Return flights
export const ReturnFlights: Story = {
  args: {
    flights: mockReturnFlights,
    activeTab: "return",
    className: "space-y-4",
  },
};

// Empty state - Outbound
export const NoOutboundFlights: Story = {
  args: {
    flights: [],
    activeTab: "outbound",
    noFlightsTitle: "未找到去程航班",
    noFlightsDescription: "请尝试调整搜索条件",
  },
};

// Empty state - Return
export const NoReturnFlights: Story = {
  args: {
    flights: [],
    activeTab: "return",
    noFlightsTitle: "未找到返程航班",
    noFlightsDescription: "请尝试调整搜索条件",
  },
};

// Custom empty state text
export const CustomEmptyState: Story = {
  args: {
    flights: [],
    activeTab: "outbound",
    noFlightsTitle: "没有符合条件的航班",
    noFlightsDescription: "建议您修改出发日期或目的地再次搜索",
  },
};

// Single outbound flight
export const SingleOutboundFlight: Story = {
  args: {
    flights: [mockOutboundFlights[0]],
    activeTab: "outbound",
    className: "space-y-4",
  },
};

// Single return flight
export const SingleReturnFlight: Story = {
  args: {
    flights: [mockReturnFlights[0]],
    activeTab: "return",
    className: "space-y-4",
  },
};

// Outbound flight with next day arrival
export const OutboundNextDayArrival: Story = {
  args: {
    flights: [
      {
        ...mockOutboundFlights[0],
        departureTime: "23:00",
        arrivalTime: "01:30",
        daysOffset: 1,
        duration: "2h 30m",
        buttonText: "选择去程",
      },
    ],
    activeTab: "outbound",
    className: "space-y-4",
  },
};

// Return flight with next day arrival
export const ReturnNextDayArrival: Story = {
  args: {
    flights: [
      {
        ...mockReturnFlights[0],
        departureTime: "22:30",
        arrivalTime: "01:20",
        daysOffset: 1,
        duration: "2h 50m",
        buttonText: "选择返程",
      },
    ],
    activeTab: "return",
    className: "space-y-4",
  },
};
