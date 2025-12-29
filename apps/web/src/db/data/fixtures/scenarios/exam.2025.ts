/**
 * Exam 2025 Scenario
 *
 * This file contains the exact data required for the 2025 course exam.
 * All data is predefined and will be inserted exactly as specified.
 *
 *
 * Missing fields filled with reasonable defaults:
 * - City: continent (null for domestic cities), displayOrder (sequential)
 * - Airport: Full Chinese names based on standard airport names
 * - Flight: departureTerminal (T2), arrivalTerminal (T3), aircraftType (Boeing 737-800 or Airbus A320)
 * - Seat classes: totalSeats and availableSeats calculated based on typical aircraft capacity
 *   - Economy: 180 total, 150 available (83% load factor)
 *   - Business: 30 total, 20 available (67% load factor)
 * - User/Passenger: optional profile fields left null unless required by tests
 *
 * Note: Users/accounts/passengers are seeded to match temp/ctrip inputs:
 * - 账号密码登录: 19821511872 / mM0947679307!
 * - 修改个人信息: 姓名 赵六, 昵称 oldnick_
 * - 常用旅客: 张三 (身份证 150207199009273275)
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
  phoneNumber?: string | null;
  phoneNumberVerified?: boolean | null;
  balance?: string;
  nickname?: string | null;
  gender?: "male" | "female" | "other" | null;
  birthday?: string | null;
  image?: string | null;
}

/**
 * Account fixture for exam scenario
 */
export interface AccountFixture {
  id: string;
  accountId: string;
  providerId: string;
  userId: string;
  password: string | null;
}

/**
 * Passenger fixture for exam scenario
 */
export interface PassengerFixture {
  userId: string; // Reference to user ID
  name: string;
  nationality?: string;
  gender?: "male" | "female" | "other";
  dateOfBirth?: string; // YYYY-MM-DD
  placeOfBirth?: string;
  phone?: string;
  email?: string;
  documentType: "passport" | "id_card" | "other";
  documentNumber: string;
  documentExpiryDate?: string; // YYYY-MM-DD
}

const EXAM_USER_ID = "exam-user-19821511872";

/**
 * Complete exam scenario data
 *
 * Based on temp/ctrip JSON test flow prerequisites
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
      isPopular: true,
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
   * Total: 16 flights (9 on 2025-12-28, 7 on 2025-12-29)
   * Routes: SHA↔BJS, SHA↔NKG, BJS↔NKG
   */
  flights: [
    // ========== 2025-12-28 Flights (9 flights) ==========

    // SHA → BJS (3 flights)
    {
      flightNumber: "CZ3539",
      airlineIataCode: "CZ",
      departureAirportIataCode: "PVG",
      arrivalAirportIataCode: "PEK",
      departureDatetime: "2025-12-28T08:00:00+08:00",
      arrivalDatetime: "2025-12-28T10:30:00+08:00",
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
      departureDatetime: "2025-12-28T14:20:00+08:00",
      arrivalDatetime: "2025-12-28T16:50:00+08:00",
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
      departureDatetime: "2025-12-28T19:15:00+08:00",
      arrivalDatetime: "2025-12-28T21:45:00+08:00",
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
      departureDatetime: "2025-12-28T09:00:00+08:00",
      arrivalDatetime: "2025-12-28T10:15:00+08:00",
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
      departureDatetime: "2025-12-28T16:30:00+08:00",
      arrivalDatetime: "2025-12-28T17:45:00+08:00",
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
      departureDatetime: "2025-12-28T11:00:00+08:00",
      arrivalDatetime: "2025-12-28T12:15:00+08:00",
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
      departureDatetime: "2025-12-28T18:30:00+08:00",
      arrivalDatetime: "2025-12-28T19:45:00+08:00",
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
      departureDatetime: "2025-12-28T08:45:00+08:00",
      arrivalDatetime: "2025-12-28T11:15:00+08:00",
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

    // NKG → BJS (1 flight)
    {
      flightNumber: "CA1702",
      airlineIataCode: "CA",
      departureAirportIataCode: "NKG",
      arrivalAirportIataCode: "PEK",
      departureDatetime: "2025-12-28T13:00:00+08:00",
      arrivalDatetime: "2025-12-28T15:30:00+08:00",
      departureTerminal: "T2",
      arrivalTerminal: "T3",
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

    // ========== 2025-12-29 Flights (7 flights) ==========

    // SHA → BJS (3 flights)
    {
      flightNumber: "CZ3541",
      airlineIataCode: "CZ",
      departureAirportIataCode: "PVG",
      arrivalAirportIataCode: "PEK",
      departureDatetime: "2025-12-29T09:30:00+08:00",
      arrivalDatetime: "2025-12-29T12:00:00+08:00",
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
      departureDatetime: "2025-12-29T15:45:00+08:00",
      arrivalDatetime: "2025-12-29T18:15:00+08:00",
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
      departureDatetime: "2025-12-29T21:30:00+08:00",
      arrivalDatetime: "2025-12-30T00:00:00+08:00", // Next day arrival
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
      departureDatetime: "2025-12-29T10:15:00+08:00",
      arrivalDatetime: "2025-12-29T11:30:00+08:00",
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
      departureDatetime: "2025-12-29T12:30:00+08:00",
      arrivalDatetime: "2025-12-29T13:45:00+08:00",
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
      departureDatetime: "2025-12-29T09:15:00+08:00",
      arrivalDatetime: "2025-12-29T11:45:00+08:00",
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

    // NKG → BJS (1 flight)
    {
      flightNumber: "CA1704",
      airlineIataCode: "CA",
      departureAirportIataCode: "NKG",
      arrivalAirportIataCode: "PEK",
      departureDatetime: "2025-12-29T13:20:00+08:00",
      arrivalDatetime: "2025-12-29T15:50:00+08:00",
      departureTerminal: "T2",
      arrivalTerminal: "T3",
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
   * Seeded phone login user from temp/ctrip:
   * - Phone: 19821511872
   * - Password: mM0947679307!
   */
  users: [
    {
      id: EXAM_USER_ID,
      name: "赵六",
      email: "19821511872@nomad.com",
      emailVerified: true,
      phoneNumber: "19821511872",
      phoneNumberVerified: true,
      nickname: "oldnick_",
      gender: "male",
    },
  ] as UserFixture[],

  /**
   * Test accounts for exam (credential login)
   */
  accounts: [
    {
      id: "acc-exam-19821511872",
      accountId: "19821511872",
      providerId: "credential",
      userId: EXAM_USER_ID,
      password:
        "ec5562b1ceac74dc91896a91fcba19a5:4676993811320d9e9cf359877b664eba691f7e324116de15a47f438945e9dd3b1e2353183768c82cfdc88be04f7f70085eb355b1f87084a19261b0268af7fb1f",
    },
  ] as AccountFixture[],

  /**
   * Test passengers for exam
   *
   * Seeded frequent traveler from temp/ctrip:
   * - 张三: documentNumber 150207199009273275
   */
  passengers: [
    {
      userId: EXAM_USER_ID,
      name: "张三",
      documentType: "id_card",
      documentNumber: "150207199009273275",
    },
  ] as PassengerFixture[],
} as const;
