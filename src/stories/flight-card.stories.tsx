import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { FlightCard } from "@/components/flights/flight-card";
import { FlightCardSkeleton } from "@/components/flights/flight-card-skeleton";

const meta = {
  title: "Flights/FlightCard",
  component: FlightCard,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    airlineLogo: {
      control: "text",
      description: "Airline logo URL",
    },
    airlineName: {
      control: "text",
      description: "Airline name",
    },
    flightNumber: {
      control: "text",
      description: "Flight number",
    },
    aircraftType: {
      control: "text",
      description: "Aircraft type",
    },
    departureTime: {
      control: "text",
      description: "Departure time (HH:mm format)",
    },
    departureAirport: {
      control: "text",
      description: "Departure airport",
    },
    arrivalTime: {
      control: "text",
      description: "Arrival time (HH:mm format)",
    },
    arrivalAirport: {
      control: "text",
      description: "Arrival airport",
    },
    daysOffset: {
      control: "number",
      description: "Days offset (optional, e.g., +1, +2)",
    },
    duration: {
      control: "text",
      description: "Total duration",
    },
    price: {
      control: "number",
      description: "Price (number, in CNY)",
    },
    buttonText: {
      control: "text",
      description: "Button text",
    },
  },
} satisfies Meta<typeof FlightCard>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default one-way flight
export const Default: Story = {
  args: {
    airlineLogo:
      "https://ui-avatars.com/api/?name=MU&background=0D8ABC&color=fff",
    airlineName: "China Eastern Airlines",
    flightNumber: "MU277",
    aircraftType: "Airbus 321 (M)",
    departureTime: "17:05",
    departureAirport: "Beijing Daxing Int'l T1",
    arrivalTime: "21:00",
    arrivalAirport: "Kansai Int'l T1",
    duration: "2h 55m",
    price: 804,
    buttonText: "Book",
  },
};

// Next day flight
export const NextDay: Story = {
  args: {
    airlineLogo:
      "https://ui-avatars.com/api/?name=CA&background=E30000&color=fff",
    airlineName: "Air China",
    flightNumber: "CA183",
    aircraftType: "Boeing 777 (L)",
    departureTime: "23:30",
    departureAirport: "Beijing Capital Int'l T3",
    arrivalTime: "05:15",
    arrivalAirport: "Narita Int'l T2",
    daysOffset: 1,
    duration: "3h 45m",
    price: 1250,
    buttonText: "Book",
  },
};

// Round-trip - Select outbound
export const RoundTripOutbound: Story = {
  args: {
    airlineLogo:
      "https://ui-avatars.com/api/?name=CZ&background=003E7E&color=fff",
    airlineName: "China Southern Airlines",
    flightNumber: "CZ389",
    aircraftType: "Airbus 330 (L)",
    departureTime: "08:30",
    departureAirport: "Shanghai Pudong Int'l T2",
    arrivalTime: "12:45",
    arrivalAirport: "Incheon Int'l T1",
    duration: "2h 15m",
    price: 980,
    buttonText: "Select Outbound",
  },
};

// Round-trip - Select return
export const RoundTripReturn: Story = {
  args: {
    airlineLogo:
      "https://ui-avatars.com/api/?name=HU&background=FFD100&color=000",
    airlineName: "Hainan Airlines",
    flightNumber: "HU7925",
    aircraftType: "Boeing 737 (M)",
    departureTime: "14:20",
    departureAirport: "Haneda Airport T3",
    arrivalTime: "17:30",
    arrivalAirport: "Shanghai Hongqiao Int'l T2",
    duration: "3h 10m",
    price: 1150,
    buttonText: "Book",
  },
};

// Expensive flight
export const ExpensiveFlight: Story = {
  args: {
    airlineLogo:
      "https://ui-avatars.com/api/?name=NH&background=1E3A8A&color=fff",
    airlineName: "All Nippon Airways",
    flightNumber: "NH920",
    aircraftType: "Boeing 787 (L)",
    departureTime: "10:00",
    departureAirport: "Shanghai Pudong Int'l T1",
    arrivalTime: "13:50",
    arrivalAirport: "Narita Int'l T1",
    duration: "2h 50m",
    price: 3580,
    buttonText: "Book",
  },
};

// Short flight
export const ShortFlight: Story = {
  args: {
    airlineLogo:
      "https://ui-avatars.com/api/?name=FM&background=DC143C&color=fff",
    airlineName: "Shanghai Airlines",
    flightNumber: "FM801",
    aircraftType: "Airbus 320 (M)",
    departureTime: "06:45",
    departureAirport: "Shanghai Hongqiao Int'l T2",
    arrivalTime: "08:20",
    arrivalAirport: "Guangzhou Baiyun Int'l T2",
    duration: "1h 35m",
    price: 450,
    buttonText: "Book",
  },
};

// Multiple flight cards display
export const MultipleFlights: Story = {
  args: {
    airlineLogo:
      "https://ui-avatars.com/api/?name=MU&background=0D8ABC&color=fff",
    airlineName: "China Eastern Airlines",
    flightNumber: "MU277",
    aircraftType: "Airbus 321 (M)",
    departureTime: "17:05",
    departureAirport: "Beijing Daxing Int'l T1",
    arrivalTime: "21:00",
    arrivalAirport: "Kansai Int'l T1",
    duration: "2h 55m",
    price: 804,
    buttonText: "Book",
  },
  render: args => (
    <div className="space-y-4 w-full max-w-5xl p-4">
      <FlightCard {...args} />
      <FlightCard
        airlineLogo="https://ui-avatars.com/api/?name=CA&background=E30000&color=fff"
        airlineName="Air China"
        flightNumber="CA183"
        aircraftType="Boeing 777 (L)"
        departureTime="23:30"
        departureAirport="Beijing Capital Int'l T3"
        arrivalTime="05:15"
        arrivalAirport="Narita Int'l T2"
        daysOffset={1}
        duration="3h 45m"
        price={1250}
        buttonText="Book"
      />
      <FlightCard
        airlineLogo="https://ui-avatars.com/api/?name=CZ&background=003E7E&color=fff"
        airlineName="China Southern Airlines"
        flightNumber="CZ389"
        aircraftType="Airbus 330 (L)"
        departureTime="08:30"
        departureAirport="Shanghai Pudong Int'l T2"
        arrivalTime="12:45"
        arrivalAirport="Incheon Int'l T1"
        duration="2h 15m"
        price={980}
        buttonText="Select Outbound"
      />
    </div>
  ),
};

// Multi-seat class flight (expandable)
export const MultiSeatClass: Story = {
  args: {
    airlineLogo:
      "https://ui-avatars.com/api/?name=MU&background=0D8ABC&color=fff",
    airlineName: "China Eastern Airlines",
    flightNumber: "MU277",
    aircraftType: "Airbus 321 (M)",
    departureTime: "17:05",
    departureAirport: "Beijing Daxing Int'l T1",
    arrivalTime: "21:00",
    arrivalAirport: "Kansai Int'l T1",
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
      {
        id: "3",
        classType: "FIRST",
        totalSeats: 12,
        availableSeats: 2,
        price: 8500,
      },
    ],
    lowestPrice: 804,
    buttonText: "预订",
    onSeatClassClick: seatClass => {
      console.log("Selected seat class:", seatClass);
    },
  },
};

// Single seat class flight (no expand button)
export const SingleSeatClass: Story = {
  args: {
    airlineLogo:
      "https://ui-avatars.com/api/?name=CA&background=E30000&color=fff",
    airlineName: "Air China",
    flightNumber: "CA183",
    aircraftType: "Boeing 777 (L)",
    departureTime: "23:30",
    departureAirport: "Beijing Capital Int'l T3",
    arrivalTime: "05:15",
    arrivalAirport: "Narita Int'l T2",
    daysOffset: 1,
    duration: "3h 45m",
    seatClasses: [
      {
        id: "1",
        classType: "ECONOMY",
        totalSeats: 200,
        availableSeats: 120,
        price: 1250,
      },
    ],
    lowestPrice: 1250,
    buttonText: "预订",
    onSeatClassClick: seatClass => {
      console.log("Selected seat class:", seatClass);
    },
  },
};

// Loading skeleton state
export const Skeleton: Story = {
  args: {
    airlineLogo:
      "https://ui-avatars.com/api/?name=MU&background=0D8ABC&color=fff",
    airlineName: "China Eastern Airlines",
    flightNumber: "MU277",
    aircraftType: "Airbus 321 (M)",
    departureTime: "17:05",
    departureAirport: "Beijing Daxing Int'l T1",
    arrivalTime: "21:00",
    arrivalAirport: "Kansai Int'l T1",
    duration: "2h 55m",
    price: 804,
    buttonText: "预订",
  },
  render: () => (
    <div className="space-y-4 w-full max-w-5xl p-4">
      <FlightCardSkeleton />
      <FlightCardSkeleton />
      <FlightCardSkeleton />
    </div>
  ),
};
