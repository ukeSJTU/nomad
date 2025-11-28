/**
 * Exam 2025 Scenario
 *
 * This file contains the exact data required for the 2025 course exam.
 * All data is predefined and will be inserted exactly as specified.
 *
 * Data source: ctrip_test.md - Test flow prerequisites
 *
 * Missing fields filled with reasonable defaults:
 * - City: continent (null for domestic cities), displayOrder (sequential)
 * - Airport: Full Chinese names based on standard airport names
 * - Flight: departureTerminal (T2), arrivalTerminal (T3), aircraftType (Boeing 737-800 or Airbus A320)
 * - Seat classes: totalSeats and availableSeats calculated based on typical aircraft capacity
 *   - Economy: 180 total, 150 available (83% load factor)
 *   - Business: 30 total, 20 available (67% load factor)
 *
 * Note: Users and passengers arrays are EMPTY because the test will create them during execution:
 * - test1-1: Registers user with phone 13812341234
 * - test2-1: Adds passengers 张三 and 李四
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
 * Based on ctrip_test.md test flow prerequisites
 */
export const EXAM_2025_SCENARIO = {
  /**
   * Cities for exam
   * Required cities: Shanghai (SHA), Beijing (BJS), Nanjing (NKG)
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
    {
      iataCode: "NKG",
      name: "南京",
      timezone: "Asia/Shanghai",
      isDomestic: true,
      pinyinFirstLetter: "N",
      continent: null,
      isPopular: false,
      displayOrder: 3,
    },
  ] as CityFixture[],

  /**
   * Airports for exam
   * Using main airports for each city
   */
  airports: [
    { iataCode: "PVG", name: "浦东国际机场", cityIataCode: "SHA" },
    { iataCode: "PEK", name: "首都国际机场", cityIataCode: "BJS" },
    { iataCode: "NKG", name: "南京禄口国际机场", cityIataCode: "NKG" },
  ] as AirportFixture[],

  /**
   * Airlines for exam
   * Required airlines: China Southern (CZ), China Eastern (MU), Air China (CA), Spring Airlines (9C)
   */
  airlines: [
    { iataCode: "CZ", name: "中国南方航空", logoUrl: null },
    { iataCode: "MU", name: "中国东方航空", logoUrl: null },
    { iataCode: "CA", name: "中国国际航空", logoUrl: null },
    { iataCode: "9C", name: "春秋航空", logoUrl: null },
  ] as AirlineFixture[],

  /**
   * Flights for exam
   * Total: 14 flights (8 on 2025-12-15, 6 on 2025-12-16)
   * Routes: SHA↔BJS, SHA↔NKG, BJS→NKG
   */
  flights: [
    // ========== 2025-12-15 Flights (8 flights) ==========

    // SHA → BJS (3 flights)
    {
      flightNumber: "CZ3539",
      airlineIataCode: "CZ",
      departureAirportIataCode: "PVG",
      arrivalAirportIataCode: "PEK",
      departureDatetime: "2025-12-15T08:00:00+08:00",
      arrivalDatetime: "2025-12-15T10:30:00+08:00",
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
    {
      flightNumber: "MU5137",
      airlineIataCode: "MU",
      departureAirportIataCode: "PVG",
      arrivalAirportIataCode: "PEK",
      departureDatetime: "2025-12-15T14:20:00+08:00",
      arrivalDatetime: "2025-12-15T16:50:00+08:00",
      departureTerminal: "T2",
      arrivalTerminal: "T3",
      aircraftType: "Airbus A320",
      seatClasses: [
        {
          classType: "ECONOMY",
          price: 750,
          availableSeats: 150,
          totalSeats: 180,
        },
        {
          classType: "BUSINESS",
          price: 2250,
          availableSeats: 20,
          totalSeats: 30,
        },
      ],
    },
    {
      flightNumber: "CA1835",
      airlineIataCode: "CA",
      departureAirportIataCode: "PVG",
      arrivalAirportIataCode: "PEK",
      departureDatetime: "2025-12-15T19:15:00+08:00",
      arrivalDatetime: "2025-12-15T21:45:00+08:00",
      departureTerminal: "T2",
      arrivalTerminal: "T3",
      aircraftType: "Boeing 737-800",
      seatClasses: [
        {
          classType: "ECONOMY",
          price: 900,
          availableSeats: 150,
          totalSeats: 180,
        },
        {
          classType: "BUSINESS",
          price: 2700,
          availableSeats: 20,
          totalSeats: 30,
        },
      ],
    },

    // SHA → NKG (2 flights)
    {
      flightNumber: "MU2801",
      airlineIataCode: "MU",
      departureAirportIataCode: "PVG",
      arrivalAirportIataCode: "NKG",
      departureDatetime: "2025-12-15T09:00:00+08:00",
      arrivalDatetime: "2025-12-15T10:15:00+08:00",
      departureTerminal: "T2",
      arrivalTerminal: "T2",
      aircraftType: "Airbus A320",
      seatClasses: [
        {
          classType: "ECONOMY",
          price: 450,
          availableSeats: 150,
          totalSeats: 180,
        },
        {
          classType: "BUSINESS",
          price: 1350,
          availableSeats: 20,
          totalSeats: 30,
        },
      ],
    },
    {
      flightNumber: "CZ6201",
      airlineIataCode: "CZ",
      departureAirportIataCode: "PVG",
      arrivalAirportIataCode: "NKG",
      departureDatetime: "2025-12-15T16:30:00+08:00",
      arrivalDatetime: "2025-12-15T17:45:00+08:00",
      departureTerminal: "T2",
      arrivalTerminal: "T2",
      aircraftType: "Boeing 737-800",
      seatClasses: [
        {
          classType: "ECONOMY",
          price: 480,
          availableSeats: 150,
          totalSeats: 180,
        },
        {
          classType: "BUSINESS",
          price: 1440,
          availableSeats: 20,
          totalSeats: 30,
        },
      ],
    },

    // NKG → SHA (2 flights)
    {
      flightNumber: "MU2802",
      airlineIataCode: "MU",
      departureAirportIataCode: "NKG",
      arrivalAirportIataCode: "PVG",
      departureDatetime: "2025-12-15T11:00:00+08:00",
      arrivalDatetime: "2025-12-15T12:15:00+08:00",
      departureTerminal: "T2",
      arrivalTerminal: "T2",
      aircraftType: "Airbus A320",
      seatClasses: [
        {
          classType: "ECONOMY",
          price: 450,
          availableSeats: 150,
          totalSeats: 180,
        },
        {
          classType: "BUSINESS",
          price: 1350,
          availableSeats: 20,
          totalSeats: 30,
        },
      ],
    },
    {
      flightNumber: "CZ6202",
      airlineIataCode: "CZ",
      departureAirportIataCode: "NKG",
      arrivalAirportIataCode: "PVG",
      departureDatetime: "2025-12-15T18:30:00+08:00",
      arrivalDatetime: "2025-12-15T19:45:00+08:00",
      departureTerminal: "T2",
      arrivalTerminal: "T2",
      aircraftType: "Boeing 737-800",
      seatClasses: [
        {
          classType: "ECONOMY",
          price: 480,
          availableSeats: 150,
          totalSeats: 180,
        },
        {
          classType: "BUSINESS",
          price: 1440,
          availableSeats: 20,
          totalSeats: 30,
        },
      ],
    },

    // BJS → NKG (1 flight)
    {
      flightNumber: "CA1701",
      airlineIataCode: "CA",
      departureAirportIataCode: "PEK",
      arrivalAirportIataCode: "NKG",
      departureDatetime: "2025-12-15T08:45:00+08:00",
      arrivalDatetime: "2025-12-15T11:15:00+08:00",
      departureTerminal: "T3",
      arrivalTerminal: "T2",
      aircraftType: "Boeing 737-800",
      seatClasses: [
        {
          classType: "ECONOMY",
          price: 720,
          availableSeats: 150,
          totalSeats: 180,
        },
        {
          classType: "BUSINESS",
          price: 2160,
          availableSeats: 20,
          totalSeats: 30,
        },
      ],
    },

    // ========== 2025-12-16 Flights (6 flights) ==========

    // SHA → BJS (3 flights)
    {
      flightNumber: "CZ3541",
      airlineIataCode: "CZ",
      departureAirportIataCode: "PVG",
      arrivalAirportIataCode: "PEK",
      departureDatetime: "2025-12-16T09:30:00+08:00",
      arrivalDatetime: "2025-12-16T12:00:00+08:00",
      departureTerminal: "T2",
      arrivalTerminal: "T3",
      aircraftType: "Boeing 737-800",
      seatClasses: [
        {
          classType: "ECONOMY",
          price: 820,
          availableSeats: 150,
          totalSeats: 180,
        },
        {
          classType: "BUSINESS",
          price: 2460,
          availableSeats: 20,
          totalSeats: 30,
        },
      ],
    },
    {
      flightNumber: "MU5139",
      airlineIataCode: "MU",
      departureAirportIataCode: "PVG",
      arrivalAirportIataCode: "PEK",
      departureDatetime: "2025-12-16T15:45:00+08:00",
      arrivalDatetime: "2025-12-16T18:15:00+08:00",
      departureTerminal: "T2",
      arrivalTerminal: "T3",
      aircraftType: "Airbus A320",
      seatClasses: [
        {
          classType: "ECONOMY",
          price: 780,
          availableSeats: 150,
          totalSeats: 180,
        },
        {
          classType: "BUSINESS",
          price: 2340,
          availableSeats: 20,
          totalSeats: 30,
        },
      ],
    },
    {
      flightNumber: "9C8947",
      airlineIataCode: "9C",
      departureAirportIataCode: "PVG",
      arrivalAirportIataCode: "PEK",
      departureDatetime: "2025-12-16T21:30:00+08:00",
      arrivalDatetime: "2025-12-17T00:00:00+08:00", // Next day arrival
      departureTerminal: "T2",
      arrivalTerminal: "T3",
      aircraftType: "Airbus A320",
      seatClasses: [
        {
          classType: "ECONOMY",
          price: 650,
          availableSeats: 150,
          totalSeats: 180,
        },
        // No business class for Spring Airlines (budget carrier)
      ],
    },

    // SHA → NKG (1 flight)
    {
      flightNumber: "MU2803",
      airlineIataCode: "MU",
      departureAirportIataCode: "PVG",
      arrivalAirportIataCode: "NKG",
      departureDatetime: "2025-12-16T10:15:00+08:00",
      arrivalDatetime: "2025-12-16T11:30:00+08:00",
      departureTerminal: "T2",
      arrivalTerminal: "T2",
      aircraftType: "Airbus A320",
      seatClasses: [
        {
          classType: "ECONOMY",
          price: 460,
          availableSeats: 150,
          totalSeats: 180,
        },
        {
          classType: "BUSINESS",
          price: 1380,
          availableSeats: 20,
          totalSeats: 30,
        },
      ],
    },

    // NKG → SHA (1 flight)
    {
      flightNumber: "MU2804",
      airlineIataCode: "MU",
      departureAirportIataCode: "NKG",
      arrivalAirportIataCode: "PVG",
      departureDatetime: "2025-12-16T12:30:00+08:00",
      arrivalDatetime: "2025-12-16T13:45:00+08:00",
      departureTerminal: "T2",
      arrivalTerminal: "T2",
      aircraftType: "Airbus A320",
      seatClasses: [
        {
          classType: "ECONOMY",
          price: 460,
          availableSeats: 150,
          totalSeats: 180,
        },
        {
          classType: "BUSINESS",
          price: 1380,
          availableSeats: 20,
          totalSeats: 30,
        },
      ],
    },

    // BJS → NKG (1 flight)
    {
      flightNumber: "CA1703",
      airlineIataCode: "CA",
      departureAirportIataCode: "PEK",
      arrivalAirportIataCode: "NKG",
      departureDatetime: "2025-12-16T09:15:00+08:00",
      arrivalDatetime: "2025-12-16T11:45:00+08:00",
      departureTerminal: "T3",
      arrivalTerminal: "T2",
      aircraftType: "Boeing 737-800",
      seatClasses: [
        {
          classType: "ECONOMY",
          price: 740,
          availableSeats: 150,
          totalSeats: 180,
        },
        {
          classType: "BUSINESS",
          price: 2220,
          availableSeats: 20,
          totalSeats: 30,
        },
      ],
    },
  ] as FlightFixture[],

  /**
   * Test users for exam
   *
   * EMPTY: The test flow will create the user during test1-1 (registration)
   * - Phone: 13812341234
   * - Password: mypassword
   */
  users: [] as UserFixture[],

  /**
   * Test passengers for exam
   *
   * EMPTY: The test flow will create passengers during test2-1 (add passenger)
   * - 张三: documentNumber 100111222233334444
   * - 李四: documentNumber 100111222233334445
   * - 王五: documentNumber 100111222233334446 (added during booking in test4-1)
   */
  passengers: [] as PassengerFixture[],
} as const;
