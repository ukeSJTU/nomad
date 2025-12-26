import { randomInt, randomUUID } from "crypto";
import { addHours } from "date-fns";

import { db } from "@/db";
import {
  account,
  airlines,
  airports,
  cities,
  flightSearchHistory,
  flightSeatClasses,
  flights,
  orderPassengers,
  orders,
  passengers,
  payments,
  user,
} from "@/db/schema";

type CityInsert = typeof cities.$inferInsert;
type CityRow = typeof cities.$inferSelect;
type AirlineRow = typeof airlines.$inferSelect;
type AirportRow = typeof airports.$inferSelect;
type FlightRow = typeof flights.$inferSelect;
type SeatClassRow = typeof flightSeatClasses.$inferSelect;
type UserRow = typeof user.$inferSelect;
type OrderRow = typeof orders.$inferSelect;
type OrderPassengerRow = typeof orderPassengers.$inferSelect;

const randomCode = (length: number) => {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let result = "";
  for (let i = 0; i < length; i += 1) {
    result += alphabet.charAt(Math.floor(Math.random() * alphabet.length));
  }
  return result;
};

const uniqueSuffix = () => randomCode(3) + randomInt(0, 1000);

const uniquePhone = () =>
  `13${randomInt(0, 1_000_000_000).toString().padStart(9, "0")}`;

const maxAirlineCodes = 26 * 26; // Two-letter space (A-Z)
const usedAirlineCodes = new Set<string>();
let airlineCodeCounter = 0;

const nextAirlineCode = () => {
  if (airlineCodeCounter >= maxAirlineCodes) {
    throw new Error("Exhausted unique airline IATA codes in tests");
  }
  const first = Math.floor(airlineCodeCounter / 26);
  const second = airlineCodeCounter % 26;
  const code =
    String.fromCharCode(65 + first) + String.fromCharCode(65 + second); // AA, AB, ..., ZZ
  airlineCodeCounter += 1;
  return code;
};

const uniqueAirlineCode = (preferred?: string) => {
  if (preferred) {
    const sanitized = preferred.toUpperCase();
    if (!/^[A-Z]{2}$/.test(sanitized)) {
      throw new Error(
        `Invalid airline IATA code provided to factory: ${preferred}`
      );
    }
    if (usedAirlineCodes.has(sanitized)) {
      throw new Error(
        `Airline IATA code already used in test data: ${preferred}`
      );
    }
    usedAirlineCodes.add(sanitized);
    return sanitized;
  }

  let code = nextAirlineCode();
  while (usedAirlineCodes.has(code)) {
    code = nextAirlineCode();
  }
  usedAirlineCodes.add(code);
  return code;
};

export async function createCity(
  overrides: Partial<CityInsert> = {}
): Promise<CityRow> {
  const iataCode = overrides.iataCode ?? randomCode(3);
  const isDomestic = overrides.isDomestic ?? true;
  const pinyinFirstLetter =
    overrides.pinyinFirstLetter ?? (isDomestic ? iataCode[0] : null);

  const [created] = await db
    .insert(cities)
    .values({
      name: overrides.name ?? `城市-${iataCode}`,
      iataCode,
      timezone: overrides.timezone ?? "Asia/Shanghai",
      isDomestic,
      pinyinFirstLetter,
      continent: overrides.continent ?? (isDomestic ? null : "Asia"),
      isPopular: overrides.isPopular ?? false,
      displayOrder: overrides.displayOrder ?? 1,
      isDeleted: overrides.isDeleted ?? false,
      id: overrides.id,
    })
    .returning();

  return created;
}

export async function createAirline(
  overrides: Partial<typeof airlines.$inferInsert> = {}
): Promise<AirlineRow> {
  const iataCode = uniqueAirlineCode(overrides.iataCode);

  const [created] = await db
    .insert(airlines)
    .values({
      id: overrides.id,
      iataCode,
      name: overrides.name ?? `航空公司${iataCode}`,
      logoUrl: overrides.logoUrl ?? "https://example.com/logo.png",
      isDeleted: overrides.isDeleted ?? false,
    })
    .returning();

  return created;
}

export async function createAirport(
  params: Partial<typeof airports.$inferInsert> & {
    city?: CityRow;
  } = {}
): Promise<AirportRow> {
  const cityRow = params.city ?? (await createCity());
  const iataCode = params.iataCode ?? randomCode(3);

  const [created] = await db
    .insert(airports)
    .values({
      id: params.id,
      iataCode,
      name: params.name ?? `机场-${iataCode}`,
      cityId: params.cityId ?? cityRow.id,
      isDeleted: params.isDeleted ?? false,
    })
    .returning();

  return created;
}

export async function createFlight(
  params: {
    airline?: AirlineRow;
    airlineId?: string;
    departureAirport?: AirportRow;
    arrivalAirport?: AirportRow;
    departureAirportId?: string;
    arrivalAirportId?: string;
    departureTime?: Date;
    arrivalTime?: Date;
    flightNumber?: string;
    isDeleted?: boolean;
  } = {}
): Promise<{
  flight: FlightRow;
  airline: AirlineRow;
  departureAirport: AirportRow;
  arrivalAirport: AirportRow;
}> {
  const airlineRow = params.airline ?? (await createAirline());
  const departureAirport =
    params.departureAirport ?? (await createAirport({ name: "出发机场" }));
  const arrivalAirport =
    params.arrivalAirport ?? (await createAirport({ name: "到达机场" }));

  const departureTime = params.departureTime ?? addHours(new Date(), 3);
  const arrivalTime = params.arrivalTime ?? addHours(departureTime, 2);

  const [created] = await db
    .insert(flights)
    .values({
      id: randomUUID(),
      flightNumber:
        params.flightNumber ??
        `${airlineRow.iataCode}${Math.floor(Math.random() * 900 + 100)}`,
      airlineId: params.airlineId ?? airlineRow.id,
      departureAirportId: params.departureAirportId ?? departureAirport.id,
      arrivalAirportId: params.arrivalAirportId ?? arrivalAirport.id,
      departureDatetime: departureTime,
      arrivalDatetime: arrivalTime,
      departureTerminal: "T1",
      arrivalTerminal: "T2",
      aircraftType: "A320",
      isDeleted: params.isDeleted ?? false,
    })
    .returning();

  return {
    flight: created,
    airline: airlineRow,
    departureAirport,
    arrivalAirport,
  };
}

export async function createSeatClass(
  params: {
    flight?: FlightRow;
    flightId?: string;
    classType?: "ECONOMY" | "BUSINESS" | "FIRST";
    price?: string;
    totalSeats?: number;
    availableSeats?: number;
    isDeleted?: boolean;
  } = {}
): Promise<SeatClassRow> {
  const flightRow = params.flight ?? (await createFlight()).flight;

  const [created] = await db
    .insert(flightSeatClasses)
    .values({
      id: randomUUID(),
      flightId: params.flightId ?? flightRow.id,
      classType: params.classType ?? "ECONOMY",
      price: params.price ?? "1000.00",
      totalSeats: params.totalSeats ?? 10,
      availableSeats: params.availableSeats ?? 10,
      isDeleted: params.isDeleted ?? false,
    })
    .returning();

  return created;
}

export async function createUser(
  overrides: Partial<typeof user.$inferInsert> = {}
): Promise<UserRow> {
  const id = overrides.id ?? `user-${uniqueSuffix()}`;
  const [created] = await db
    .insert(user)
    .values({
      id,
      name: overrides.name ?? `测试用户-${id}`,
      email: overrides.email ?? `${id}@example.com`,
      emailVerified: overrides.emailVerified ?? false,
      phoneNumber: overrides.phoneNumber ?? uniquePhone(),
      phoneNumberVerified: overrides.phoneNumberVerified ?? false,
      balance: overrides.balance ?? "10000.00",
      nickname: overrides.nickname ?? "测试昵称",
      gender: overrides.gender ?? "male",
      birthday: overrides.birthday,
      image: overrides.image,
    })
    .returning();

  return created;
}

export async function createAccountForUser(
  userId: string,
  overrides: Partial<typeof account.$inferInsert> = {}
) {
  const [created] = await db
    .insert(account)
    .values({
      id: overrides.id ?? randomUUID(),
      accountId: overrides.accountId ?? `acc-${uniqueSuffix()}`,
      providerId: overrides.providerId ?? "credential",
      userId,
      password: overrides.password ?? "hashed-password",
    })
    .returning();

  return created;
}

export async function createPassengerForUser(
  userId: string,
  overrides: Partial<typeof passengers.$inferInsert> = {}
) {
  const [created] = await db
    .insert(passengers)
    .values({
      userId,
      name: overrides.name ?? "测试旅客",
      nationality: overrides.nationality ?? "中国",
      gender: overrides.gender ?? "male",
      dateOfBirth: overrides.dateOfBirth ?? "1990-01-01",
      placeOfBirth: overrides.placeOfBirth ?? "上海",
      phone: overrides.phone ?? "13812345678",
      email: overrides.email ?? "passenger@example.com",
      documentType: overrides.documentType ?? "passport",
      documentNumber: overrides.documentNumber ?? `P${uniqueSuffix()}`,
      documentExpiryDate: overrides.documentExpiryDate ?? "2030-01-01",
      isDeleted: overrides.isDeleted ?? false,
    })
    .returning();

  return created;
}

export async function createOrderWithPassengers(params: {
  user: UserRow;
  outboundSeatClass: SeatClassRow;
  inboundSeatClass?: SeatClassRow | null;
  passengerCount?: number;
  status?: (typeof orders.$inferSelect)["status"];
  paymentDeadline?: Date;
  orderNumber?: string;
  contactPhone?: string | null;
  contactEmail?: string | null;
  ancillaryDetails?: unknown;
  ancillaryAmount?: string;
  pricePerTicket?: string;
  baseAmount?: string;
  totalAmount?: string;
  orderPassengersData?: Array<
    Partial<typeof orderPassengers.$inferInsert> & { orderId?: string }
  >;
}) {
  const passengerCount = params.passengerCount ?? 1;
  const pricePerTicket = params.pricePerTicket ?? "1000.00";
  const baseAmount =
    params.baseAmount ?? (Number(pricePerTicket) * passengerCount).toFixed(2);
  const ancillaryAmount = params.ancillaryAmount ?? "0.00";
  const totalAmount =
    params.totalAmount ??
    (Number(baseAmount) + Number(ancillaryAmount)).toFixed(2);

  const [createdOrder] = await db
    .insert(orders)
    .values({
      id: randomUUID(),
      orderNumber: params.orderNumber ?? `NMD${Date.now()}`,
      userId: params.user.id,
      outboundFlightSeatClassId: params.outboundSeatClass.id,
      inboundFlightSeatClassId: params.inboundSeatClass?.id ?? null,
      status: params.status ?? "PENDING_PAYMENT",
      paymentDeadline: params.paymentDeadline ?? addHours(new Date(), 2),
      passengerCount,
      contactPhone: params.contactPhone ?? "13811111111",
      contactEmail: params.contactEmail ?? "contact@example.com",
      pricePerTicket,
      baseAmount,
      ancillaryAmount,
      totalAmount,
      ancillaryDetails: params.ancillaryDetails ?? null,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    .returning();

  const passengerRows: OrderPassengerRow[] = [];

  const passengersData =
    params.orderPassengersData ??
    Array.from({ length: passengerCount }).map((_, index) => ({
      id: randomUUID(),
      orderId: createdOrder.id,
      name: `乘客-${index + 1}`,
      identityType: "passport",
      identityNumber: `P${uniqueSuffix()}${index}`,
      phone: "13811111111",
      createdAt: new Date(),
    }));

  for (const [index, p] of passengersData.entries()) {
    const passengerValue = {
      id: p.id ?? randomUUID(),
      orderId: p.orderId ?? createdOrder.id,
      name: p.name ?? `乘客-${index + 1}`,
      identityType: p.identityType ?? "passport",
      identityNumber: p.identityNumber ?? `P${uniqueSuffix()}${index}`,
      phone: p.phone ?? "13811111111",
      createdAt: p.createdAt ?? new Date(),
    } satisfies typeof orderPassengers.$inferInsert;

    const [createdPassenger] = await db
      .insert(orderPassengers)
      .values(passengerValue)
      .returning();

    passengerRows.push(createdPassenger);
  }

  return {
    order: createdOrder,
    passengers: passengerRows,
  };
}

export async function createPaymentForOrder(
  order: OrderRow,
  overrides: Partial<typeof payments.$inferInsert> = {}
) {
  const [created] = await db
    .insert(payments)
    .values({
      id: overrides.id ?? randomUUID(),
      orderId: order.id,
      amount: overrides.amount ?? order.totalAmount ?? "0.00",
      method: overrides.method ?? "balance",
      status: overrides.status ?? "SUCCESS",
      transactionId: overrides.transactionId ?? `txn-${uniqueSuffix()}`,
    })
    .returning();

  return created;
}

export async function createSearchHistoryRecord(params: {
  user: UserRow;
  departureCity?: CityRow;
  arrivalCity?: CityRow;
  tripType?: "one-way" | "round-trip";
  departureDate?: Date;
  returnDate?: Date | null;
  lowestPriceAtSearch?: string | null;
  currentLowestPrice?: string | null;
  seatClass?: "any" | "economy" | "business" | "first";
  isDeleted?: boolean;
  lastSearchedAt?: Date;
  searchCount?: number;
}) {
  const departureCity = params.departureCity ?? (await createCity());
  const arrivalCity =
    params.arrivalCity ??
    (await createCity({
      iataCode: randomCode(3),
      name: "到达城市",
    }));

  const departureDate =
    params.departureDate instanceof Date
      ? params.departureDate.toISOString().slice(0, 10)
      : (params.departureDate ?? "2025-01-01");

  const returnDate =
    params.returnDate instanceof Date
      ? params.returnDate.toISOString().slice(0, 10)
      : (params.returnDate ?? null);

  const [created] = await db
    .insert(flightSearchHistory)
    .values({
      id: randomUUID(),
      userId: params.user.id,
      departureCityId: departureCity.id,
      arrivalCityId: arrivalCity.id,
      departureCityIata: departureCity.iataCode,
      departureCityName: departureCity.name,
      arrivalCityIata: arrivalCity.iataCode,
      arrivalCityName: arrivalCity.name,
      tripType: params.tripType ?? "one-way",
      departureDate,
      returnDate,
      seatClass: params.seatClass ?? "any",
      lowestPriceAtSearch: params.lowestPriceAtSearch ?? "1200.00",
      currentLowestPrice: params.currentLowestPrice ?? "1100.00",
      searchCount: params.searchCount ?? 1,
      lastSearchedAt: params.lastSearchedAt ?? new Date(),
      isDeleted: params.isDeleted ?? false,
    })
    .returning();

  return {
    record: created,
    departureCity,
    arrivalCity,
  };
}

export async function createFlightWithSeatClass(
  params: {
    classType?: "ECONOMY" | "BUSINESS" | "FIRST";
    price?: string;
    availableSeats?: number;
  } = {}
) {
  const { flight, airline, departureAirport, arrivalAirport } =
    await createFlight();
  const seatClass = await createSeatClass({
    flight,
    classType: params.classType,
    price: params.price,
    availableSeats: params.availableSeats,
  });

  return { flight, seatClass, airline, departureAirport, arrivalAirport };
}

export async function createOrderScenario(
  params: {
    includeInbound?: boolean;
    passengerCount?: number;
    status?: (typeof orders.$inferSelect)["status"];
    paymentStatus?: (typeof payments.$inferSelect)["status"];
    pricePerTicket?: string;
    baseAmount?: string;
    ancillaryAmount?: string;
    totalAmount?: string;
    ancillaryDetails?: unknown;
    paymentDeadline?: Date;
    contactPhone?: string;
    contactEmail?: string;
    createPayment?: boolean;
    availableSeats?: number;
  } = {}
) {
  const user = await createUser();
  const outbound = await createFlightWithSeatClass({
    price: params.pricePerTicket,
    availableSeats: params.availableSeats ?? 5,
  });
  const inbound = params.includeInbound
    ? await createFlightWithSeatClass({
        price: params.pricePerTicket ?? "1200.00",
        availableSeats: params.availableSeats ?? 5,
      })
    : null;

  const { order, passengers } = await createOrderWithPassengers({
    user,
    outboundSeatClass: outbound.seatClass,
    inboundSeatClass: inbound?.seatClass ?? null,
    passengerCount: params.passengerCount,
    status: params.status,
    paymentDeadline: params.paymentDeadline,
    pricePerTicket: params.pricePerTicket,
    baseAmount: params.baseAmount,
    ancillaryAmount: params.ancillaryAmount,
    totalAmount: params.totalAmount,
    ancillaryDetails: params.ancillaryDetails,
    contactPhone: params.contactPhone,
    contactEmail: params.contactEmail,
  });

  const payment =
    params.createPayment === false
      ? null
      : await createPaymentForOrder(order, {
          status: params.paymentStatus,
          amount: params.totalAmount ?? order.totalAmount ?? "0.00",
        });

  return {
    user,
    outbound,
    inbound,
    order,
    passengers,
    payment,
  };
}
