/**
 * Exam 2025 Scenario
 *
 * This file contains the exact data required for the 2025 course exam.
 * All data is predefined and will be inserted exactly as specified.
 *
 * Note: This is a minimal template with 1-2 sample entries.
 * You should manually update this file with the complete exam requirements.
 */

import type { AirlineFixture } from "../base/airlines";
import type { AirportFixture } from "../base/airports";
import type { CityFixture } from "../base/cities";

/**
 * Flight fixture for exam scenario
 * Note: IDs will be auto-generated, references use IATA codes
 */
export interface FlightFixture {
  flightNumber: string;
  airlineIataCode: string;
  departureAirportIataCode: string;
  arrivalAirportIataCode: string;
  departureDatetime: string; // ISO 8601 format
  arrivalDatetime: string; // ISO 8601 format
  departureTerminal: string | null;
  arrivalTerminal: string | null;
  aircraftType: string | null;
  seatClasses: SeatClassFixture[];
}

/**
 * Seat class fixture for exam scenario
 */
export interface SeatClassFixture {
  classType: "ECONOMY" | "BUSINESS" | "FIRST";
  price: number;
  availableSeats: number;
  totalSeats: number;
}

/**
 * User fixture for exam scenario
 */
export interface UserFixture {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
}

/**
 * Passenger fixture for exam scenario
 */
export interface PassengerFixture {
  userId: string; // Reference to user ID
  name: string;
  nationality: string;
  gender: "male" | "female" | "other";
  dateOfBirth: string; // YYYY-MM-DD
  placeOfBirth: string;
  phone: string;
  email: string;
  documentType: "passport" | "id_card" | "other";
  documentNumber: string;
  documentExpiryDate: string; // YYYY-MM-DD
}

/**
 * Complete exam scenario data
 *
 * TODO: Update this with the complete exam requirements from your instructor
 */
export const EXAM_2025_SCENARIO = {
  /**
   * Cities for exam
   * Example: Shanghai, Beijing, Nanjing as specified by instructor
   */
  cities: [
    {
      iataCode: "SHA",
      name: "上海",
      timezone: "Asia/Shanghai",
      isDomestic: true,
      pinyinFirstLetter: "S",
      continent: null,
      isPopular: true,
      displayOrder: 1,
    },
    {
      iataCode: "BJS",
      name: "北京",
      timezone: "Asia/Shanghai",
      isDomestic: true,
      pinyinFirstLetter: "B",
      continent: null,
      isPopular: true,
      displayOrder: 2,
    },
  ] as CityFixture[],

  /**
   * Airports for exam
   */
  airports: [
    { iataCode: "PVG", name: "浦东国际机场", cityIataCode: "SHA" },
    { iataCode: "PEK", name: "首都国际机场", cityIataCode: "BJS" },
  ] as AirportFixture[],

  /**
   * Airlines for exam
   */
  airlines: [
    { iataCode: "CA", name: "中国国际航空", logoUrl: null },
    { iataCode: "MU", name: "中国东方航空", logoUrl: null },
  ] as AirlineFixture[],

  /**
   * Flights for exam
   * Example: CA1234 from Shanghai to Beijing on 2024-12-16
   *
   * TODO: Update with exact flight details from instructor
   */
  flights: [
    {
      flightNumber: "CA1234",
      airlineIataCode: "CA",
      departureAirportIataCode: "PVG",
      arrivalAirportIataCode: "PEK",
      departureDatetime: "2024-12-16T08:00:00+08:00",
      arrivalDatetime: "2024-12-16T10:30:00+08:00",
      departureTerminal: "T2",
      arrivalTerminal: "T3",
      aircraftType: "Boeing 737-800",
      seatClasses: [
        {
          classType: "ECONOMY",
          price: 800,
          availableSeats: 150,
          totalSeats: 180,
        },
        {
          classType: "BUSINESS",
          price: 2400,
          availableSeats: 20,
          totalSeats: 30,
        },
      ],
    },
  ] as FlightFixture[],

  /**
   * Test users for exam
   */
  users: [
    {
      id: "exam-user-1",
      name: "Test User",
      email: "test@exam.com",
      emailVerified: true,
    },
  ] as UserFixture[],

  /**
   * Test passengers for exam
   */
  passengers: [
    {
      userId: "exam-user-1",
      name: "张三",
      nationality: "CN",
      gender: "male" as const,
      dateOfBirth: "1990-01-01",
      placeOfBirth: "上海",
      phone: "13800138000",
      email: "zhangsan@exam.com",
      documentType: "id_card" as const,
      documentNumber: "310101199001011234",
      documentExpiryDate: "2030-12-31",
    },
  ] as PassengerFixture[],
} as const;
