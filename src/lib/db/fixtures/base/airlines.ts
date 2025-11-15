/**
 * Real airline data for seeding
 *
 * This file contains real airlines with accurate IATA codes and names.
 */

export interface AirlineFixture {
  iataCode: string;
  name: string;
  logoUrl: string | null;
}

/**
 * Real airlines data (30+ airlines)
 * Covers major domestic and international airlines
 */
export const REAL_AIRLINES: readonly AirlineFixture[] = [
  // === Chinese Airlines ===
  { iataCode: "CA", name: "中国国际航空", logoUrl: null },
  { iataCode: "MU", name: "中国东方航空", logoUrl: null },
  { iataCode: "CZ", name: "中国南方航空", logoUrl: null },
  { iataCode: "HU", name: "海南航空", logoUrl: null },
  { iataCode: "SC", name: "山东航空", logoUrl: null },
  { iataCode: "SU", name: "四川航空", logoUrl: null },
  { iataCode: "ZH", name: "深圳航空", logoUrl: null },
  { iataCode: "FM", name: "上海航空", logoUrl: null },
  { iataCode: "MF", name: "厦门航空", logoUrl: null },
  { iataCode: "LU", name: "祥鹏航空", logoUrl: null },
  { iataCode: "CH", name: "春秋航空", logoUrl: null },
  { iataCode: "HO", name: "吉祥航空", logoUrl: null },
  { iataCode: "PN", name: "西部航空", logoUrl: null },
  { iataCode: "GS", name: "天津航空", logoUrl: null },
  { iataCode: "EU", name: "成都航空", logoUrl: null },

  // === Asian Airlines ===
  { iataCode: "NH", name: "All Nippon Airways", logoUrl: null },
  { iataCode: "JL", name: "Japan Airlines", logoUrl: null },
  { iataCode: "KE", name: "Korean Air", logoUrl: null },
  { iataCode: "OZ", name: "Asiana Airlines", logoUrl: null },
  { iataCode: "SQ", name: "Singapore Airlines", logoUrl: null },
  { iataCode: "TG", name: "Thai Airways", logoUrl: null },
  { iataCode: "CX", name: "Cathay Pacific", logoUrl: null },
  { iataCode: "BR", name: "EVA Air", logoUrl: null },
  { iataCode: "CI", name: "China Airlines", logoUrl: null },
  { iataCode: "MH", name: "Malaysia Airlines", logoUrl: null },
  { iataCode: "PR", name: "Philippine Airlines", logoUrl: null },
  { iataCode: "VN", name: "Vietnam Airlines", logoUrl: null },

  // === European Airlines ===
  { iataCode: "BA", name: "British Airways", logoUrl: null },
  { iataCode: "AF", name: "Air France", logoUrl: null },
  { iataCode: "LH", name: "Lufthansa", logoUrl: null },
  { iataCode: "KL", name: "KLM Royal Dutch Airlines", logoUrl: null },

  // === American Airlines ===
  { iataCode: "AA", name: "American Airlines", logoUrl: null },
  { iataCode: "UA", name: "United Airlines", logoUrl: null },
  { iataCode: "DL", name: "Delta Air Lines", logoUrl: null },
  { iataCode: "AC", name: "Air Canada", logoUrl: null },

  // === Middle Eastern Airlines ===
  { iataCode: "EK", name: "Emirates", logoUrl: null },
  { iataCode: "QR", name: "Qatar Airways", logoUrl: null },

  // === Oceania Airlines ===
  { iataCode: "QF", name: "Qantas", logoUrl: null },
  { iataCode: "NZ", name: "Air New Zealand", logoUrl: null },
] as const;
