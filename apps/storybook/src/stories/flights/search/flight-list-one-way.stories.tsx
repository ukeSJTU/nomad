import type { FlightCardProps } from "@nomad/ui/components/flights/results";
import { FlightListOneWay } from "@nomad/ui/components/flights/search";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  title: "Flights/Search/FlightListOneWay",
  component: FlightListOneWay,
  parameters: {
    layout: "padded",
  },
  argTypes: {
    flights: {
      control: "object",
      description: "Array of flight card props",
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
} satisfies Meta<typeof FlightListOneWay>;

export default meta;
type Story = StoryObj<typeof meta>;

// Mock currency formatter
const mockFormatCurrency = (value: number) => `¥${value.toFixed(2)}`;

// Mock flights data
const mockFlights: FlightCardProps[] = [
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
    buttonText: "预订",
    onSeatClassClick: seatClass => {
      console.log("Seat class clicked:", seatClass);
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
    buttonText: "预订",
    onSeatClassClick: seatClass => {
      console.log("Seat class clicked:", seatClass);
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
    buttonText: "预订",
    onSeatClassClick: seatClass => {
      console.log("Seat class clicked:", seatClass);
    },
  },
];

// Default story with multiple flights
export const Default: Story = {
  args: {
    flights: mockFlights,
    className: "space-y-4",
  },
};

// Empty state
export const NoFlights: Story = {
  args: {
    flights: [],
    noFlightsTitle: "未找到航班",
    noFlightsDescription: "请尝试调整搜索条件",
  },
};

// Custom empty state text
export const CustomEmptyState: Story = {
  args: {
    flights: [],
    noFlightsTitle: "没有符合条件的航班",
    noFlightsDescription: "建议您修改出发日期或目的地再次搜索",
  },
};

// Single flight
export const SingleFlight: Story = {
  args: {
    flights: [mockFlights[0]],
    className: "space-y-4",
  },
};

// Many flights (scrollable)
export const ManyFlights: Story = {
  args: {
    flights: [
      ...mockFlights,
      {
        ...mockFlights[0],
        flightNumber: "CA9999",
        departureTime: "06:30",
        arrivalTime: "09:25",
      },
      {
        ...mockFlights[1],
        flightNumber: "MU8888",
        departureTime: "12:00",
        arrivalTime: "14:55",
      },
      {
        ...mockFlights[2],
        flightNumber: "HU7777",
        departureTime: "18:45",
        arrivalTime: "21:35",
      },
    ],
    className: "space-y-4",
  },
};

// Flight with next day arrival
export const NextDayArrival: Story = {
  args: {
    flights: [
      {
        ...mockFlights[0],
        departureTime: "23:00",
        arrivalTime: "01:30",
        daysOffset: 1,
        duration: "2h 30m",
      },
    ],
    className: "space-y-4",
  },
};
