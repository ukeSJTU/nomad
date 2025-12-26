/**
 * Real airport data for seeding
 *
 * This file contains real airports with accurate IATA codes and names.
 * Airports are linked to cities via cityIataCode (will be resolved to cityId during seeding).
 */

import type { InferInsertModel } from "drizzle-orm";

import { airports } from "@/db/schema";

/**
 * Airport fixture type - derived from schema, excluding auto-generated fields
 * Uses cityIataCode instead of cityId for easier fixture definition
 */
export type AirportFixture = Omit<
  InferInsertModel<typeof airports>,
  "id" | "cityId" | "createdAt" | "updatedAt"
> & {
  cityIataCode: string; // Reference to city IATA code (will be resolved to UUID)
};

/**
 * Real airports data (100+ airports)
 * Covers major airports in domestic and international cities
 */
export const REAL_AIRPORTS: readonly AirportFixture[] = [
  // === Beijing (BJS) ===
  { iataCode: "PEK", name: "首都国际机场", cityIataCode: "BJS" },
  { iataCode: "PKX", name: "大兴国际机场", cityIataCode: "BJS" },

  // === Shanghai (SHA) ===
  { iataCode: "PVG", name: "浦东国际机场", cityIataCode: "SHA" },
  { iataCode: "SHA", name: "虹桥国际机场", cityIataCode: "SHA" },

  // === Guangzhou (CAN) ===
  { iataCode: "CAN", name: "白云国际机场", cityIataCode: "CAN" },

  // === Shenzhen (SZX) ===
  { iataCode: "SZX", name: "宝安国际机场", cityIataCode: "SZX" },

  // === Chengdu (CTU) ===
  { iataCode: "CTU", name: "双流国际机场", cityIataCode: "CTU" },
  { iataCode: "TFU", name: "天府国际机场", cityIataCode: "CTU" },

  // === Hangzhou (HGH) ===
  { iataCode: "HGH", name: "萧山国际机场", cityIataCode: "HGH" },

  // === Wuhan (WUH) ===
  { iataCode: "WUH", name: "天河国际机场", cityIataCode: "WUH" },

  // === Xi'an (XIY) ===
  { iataCode: "XIY", name: "咸阳国际机场", cityIataCode: "XIY" },

  // === Chongqing (CKG) ===
  { iataCode: "CKG", name: "江北国际机场", cityIataCode: "CKG" },

  // === Nanjing (NKG) ===
  { iataCode: "NKG", name: "禄口国际机场", cityIataCode: "NKG" },

  // === Tianjin (TSN) ===
  { iataCode: "TSN", name: "滨海国际机场", cityIataCode: "TSN" },

  // === Shenyang (SHE) ===
  { iataCode: "SHE", name: "桃仙国际机场", cityIataCode: "SHE" },

  // === Dalian (DLC) ===
  { iataCode: "DLC", name: "周水子国际机场", cityIataCode: "DLC" },

  // === Harbin (HRB) ===
  { iataCode: "HRB", name: "太平国际机场", cityIataCode: "HRB" },

  // === Changchun (CGQ) ===
  { iataCode: "CGQ", name: "龙嘉国际机场", cityIataCode: "CGQ" },

  // === Qingdao (TAO) ===
  { iataCode: "TAO", name: "流亭国际机场", cityIataCode: "TAO" },

  // === Jinan (TNA) ===
  { iataCode: "TNA", name: "遥墙国际机场", cityIataCode: "TNA" },

  // === Nanning (NNG) ===
  { iataCode: "NNG", name: "吴圩国际机场", cityIataCode: "NNG" },

  // === Kunming (KMG) ===
  { iataCode: "KMG", name: "长水国际机场", cityIataCode: "KMG" },

  // === Fuzhou (FOC) ===
  { iataCode: "FOC", name: "长乐国际机场", cityIataCode: "FOC" },

  // === Xiamen (XMN) ===
  { iataCode: "XMN", name: "高崎国际机场", cityIataCode: "XMN" },

  // === Changsha (CSX) ===
  { iataCode: "CSX", name: "黄花国际机场", cityIataCode: "CSX" },

  // === Nanchang (NNC) ===
  { iataCode: "NNC", name: "昌北国际机场", cityIataCode: "NNC" },

  // === Hefei (HFE) ===
  { iataCode: "HFE", name: "新桥国际机场", cityIataCode: "HFE" },

  // === Shijiazhuang (SJW) ===
  { iataCode: "SJW", name: "正定国际机场", cityIataCode: "SJW" },

  // === Taiyuan (TYN) ===
  { iataCode: "TYN", name: "武宿国际机场", cityIataCode: "TYN" },

  // === Hohhot (HET) ===
  { iataCode: "HET", name: "白塔国际机场", cityIataCode: "HET" },

  // === Lanzhou (LHW) ===
  { iataCode: "LHW", name: "中川国际机场", cityIataCode: "LHW" },

  // === Xining (XNN) ===
  { iataCode: "XNN", name: "曹家堡国际机场", cityIataCode: "XNN" },

  // === Urumqi (URC) ===
  { iataCode: "URC", name: "地窝堡国际机场", cityIataCode: "URC" },

  // === Yinchuan (INC) ===
  { iataCode: "INC", name: "河东国际机场", cityIataCode: "INC" },

  // === Guiyang (KWE) ===
  { iataCode: "KWE", name: "龙洞堡国际机场", cityIataCode: "KWE" },

  // === Lijiang (LJG) ===
  { iataCode: "LJG", name: "三义国际机场", cityIataCode: "LJG" },

  // === Sanya (SYX) ===
  { iataCode: "SYX", name: "凤凰国际机场", cityIataCode: "SYX" },

  // === Haikou (HAK) ===
  { iataCode: "HAK", name: "美兰国际机场", cityIataCode: "HAK" },

  // === Tokyo (TYO) ===
  {
    iataCode: "NRT",
    name: "Narita International Airport",
    cityIataCode: "TYO",
  },
  { iataCode: "HND", name: "Haneda Airport", cityIataCode: "TYO" },

  // === Seoul (SEL) ===
  {
    iataCode: "ICN",
    name: "Incheon International Airport",
    cityIataCode: "SEL",
  },
  { iataCode: "GMP", name: "Gimpo International Airport", cityIataCode: "SEL" },

  // === Singapore (SIN) ===
  { iataCode: "SIN", name: "Changi Airport", cityIataCode: "SIN" },

  // === Bangkok (BKK) ===
  { iataCode: "BKK", name: "Suvarnabhumi Airport", cityIataCode: "BKK" },
  {
    iataCode: "DMK",
    name: "Don Mueang International Airport",
    cityIataCode: "BKK",
  },

  // === Hong Kong (HKG) ===
  {
    iataCode: "HKG",
    name: "Hong Kong International Airport",
    cityIataCode: "HKG",
  },

  // === Taipei (TPE) ===
  {
    iataCode: "TPE",
    name: "Taoyuan International Airport",
    cityIataCode: "TPE",
  },
  { iataCode: "TSA", name: "Songshan Airport", cityIataCode: "TPE" },

  // === Kuala Lumpur (KUL) ===
  {
    iataCode: "KUL",
    name: "Kuala Lumpur International Airport",
    cityIataCode: "KUL",
  },

  // === Manila (MNL) ===
  {
    iataCode: "MNL",
    name: "Ninoy Aquino International Airport",
    cityIataCode: "MNL",
  },

  // === Hanoi (HAN) ===
  {
    iataCode: "HAN",
    name: "Noi Bai International Airport",
    cityIataCode: "HAN",
  },

  // === Ho Chi Minh City (SGN) ===
  {
    iataCode: "SGN",
    name: "Tan Son Nhat International Airport",
    cityIataCode: "SGN",
  },

  // === Dubai (DXB) ===
  { iataCode: "DXB", name: "Dubai International Airport", cityIataCode: "DXB" },

  // === New Delhi (DEL) ===
  {
    iataCode: "DEL",
    name: "Indira Gandhi International Airport",
    cityIataCode: "DEL",
  },

  // === London (LON) ===
  { iataCode: "LHR", name: "Heathrow Airport", cityIataCode: "LON" },
  { iataCode: "LGW", name: "Gatwick Airport", cityIataCode: "LON" },

  // === Paris (PAR) ===
  { iataCode: "CDG", name: "Charles de Gaulle Airport", cityIataCode: "PAR" },
  { iataCode: "ORY", name: "Orly Airport", cityIataCode: "PAR" },

  // === Frankfurt (FRA) ===
  { iataCode: "FRA", name: "Frankfurt Airport", cityIataCode: "FRA" },

  // === Amsterdam (AMS) ===
  { iataCode: "AMS", name: "Schiphol Airport", cityIataCode: "AMS" },

  // === Rome (ROM) ===
  { iataCode: "FCO", name: "Fiumicino Airport", cityIataCode: "ROM" },

  // === Madrid (MAD) ===
  {
    iataCode: "MAD",
    name: "Adolfo Suárez Madrid-Barajas Airport",
    cityIataCode: "MAD",
  },

  // === New York (NYC) ===
  {
    iataCode: "JFK",
    name: "John F. Kennedy International Airport",
    cityIataCode: "NYC",
  },
  { iataCode: "LGA", name: "LaGuardia Airport", cityIataCode: "NYC" },
  {
    iataCode: "EWR",
    name: "Newark Liberty International Airport",
    cityIataCode: "NYC",
  },

  // === Los Angeles (LAX) ===
  {
    iataCode: "LAX",
    name: "Los Angeles International Airport",
    cityIataCode: "LAX",
  },

  // === San Francisco (SFO) ===
  {
    iataCode: "SFO",
    name: "San Francisco International Airport",
    cityIataCode: "SFO",
  },

  // === Toronto (YTO) ===
  {
    iataCode: "YYZ",
    name: "Toronto Pearson International Airport",
    cityIataCode: "YTO",
  },

  // === Vancouver (YVR) ===
  {
    iataCode: "YVR",
    name: "Vancouver International Airport",
    cityIataCode: "YVR",
  },

  // === Sydney (SYD) ===
  {
    iataCode: "SYD",
    name: "Sydney Kingsford Smith Airport",
    cityIataCode: "SYD",
  },

  // === Melbourne (MEL) ===
  { iataCode: "MEL", name: "Melbourne Airport", cityIataCode: "MEL" },

  // === Auckland (AKL) ===
  { iataCode: "AKL", name: "Auckland Airport", cityIataCode: "AKL" },
] as const;
