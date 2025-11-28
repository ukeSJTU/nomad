import {
  createAirline,
  createAirport,
  createCity,
  createFlight,
  createSeatClass,
} from "@tests/integration/helpers/factories";
import { addDays } from "date-fns";
import { fromZonedTime } from "date-fns-tz";
import { describe, expect, it } from "vitest";

import {
  searchFlights,
  searchRoundTripFlights,
} from "@/domains/flights/flight.repository";

const toDateString = (date: Date) => date.toISOString().slice(0, 10);

describe("flight.repository", () => {
  it("searches flights by route/date and returns seat classes and lowest price", async () => {
    const departureCity = await createCity({
      iataCode: "SHA",
      name: "上海",
      timezone: "Asia/Shanghai",
      pinyinFirstLetter: "S",
    });
    const arrivalCity = await createCity({
      iataCode: "BJS",
      name: "北京",
      timezone: "Asia/Shanghai",
      pinyinFirstLetter: "B",
    });
    const departureAirport = await createAirport({
      city: departureCity,
      iataCode: "PVG",
      name: "浦东",
    });
    const arrivalAirport = await createAirport({
      city: arrivalCity,
      iataCode: "PEK",
      name: "首都",
    });
    const airline = await createAirline({ iataCode: "CA" });

    const departureDate = addDays(new Date(), 30);
    const dateStr = toDateString(departureDate);
    const departureTime = fromZonedTime(
      new Date(`${dateStr}T10:00:00`),
      "Asia/Shanghai"
    );
    const arrivalTime = fromZonedTime(
      new Date(`${dateStr}T12:00:00`),
      "Asia/Shanghai"
    );

    const { flight } = await createFlight({
      airline,
      departureAirport,
      arrivalAirport,
      departureTime,
      arrivalTime,
      flightNumber: "CA123",
    });
    await createSeatClass({
      flight,
      classType: "ECONOMY",
      price: "800.00",
      availableSeats: 5,
    });

    const results = await searchFlights({
      from: "sha",
      to: "bjs",
      departureDate: dateStr,
      classType: "ECONOMY",
    });

    expect(results).toHaveLength(1);
    expect(results[0]?.airline.iataCode).toBe("CA");
    expect(results[0]?.seatClasses).toHaveLength(1);
    expect(results[0]?.lowestPrice).toBe(800);
    expect(results[0]?.lowestPriceClassType).toBe("ECONOMY");
  });

  it("filters flights by class type and returns empty when no seat class matches", async () => {
    const departureCity = await createCity({
      iataCode: "SZX",
      name: "深圳",
      timezone: "Asia/Shanghai",
      pinyinFirstLetter: "S",
    });
    const arrivalCity = await createCity({
      iataCode: "CAN",
      name: "广州",
      timezone: "Asia/Shanghai",
      pinyinFirstLetter: "G",
    });
    const departureAirport = await createAirport({
      city: departureCity,
      iataCode: "SZX",
      name: "深圳机场",
    });
    const arrivalAirport = await createAirport({
      city: arrivalCity,
      iataCode: "CAN",
      name: "白云机场",
    });
    const airline = await createAirline({ iataCode: "CZ" });

    const departureDate = addDays(new Date(), 10);
    const dateStr = toDateString(departureDate);

    const { flight } = await createFlight({
      airline,
      departureAirport,
      arrivalAirport,
      departureTime: fromZonedTime(
        new Date(`${dateStr}T09:00:00`),
        "Asia/Shanghai"
      ),
      arrivalTime: fromZonedTime(
        new Date(`${dateStr}T11:00:00`),
        "Asia/Shanghai"
      ),
    });
    await createSeatClass({
      flight,
      classType: "ECONOMY",
      price: "600.00",
    });

    const results = await searchFlights({
      from: "SZX",
      to: "CAN",
      departureDate: dateStr,
      classType: "BUSINESS",
    });

    expect(results).toHaveLength(0);
  });

  it("searches round trip flights and returns outbound and inbound results", async () => {
    const cityA = await createCity({
      iataCode: "HGH",
      name: "杭州",
      timezone: "Asia/Shanghai",
      pinyinFirstLetter: "H",
    });
    const cityB = await createCity({
      iataCode: "WUH",
      name: "武汉",
      timezone: "Asia/Shanghai",
      pinyinFirstLetter: "W",
    });
    const airportA = await createAirport({
      city: cityA,
      iataCode: "HGH",
      name: "萧山",
    });
    const airportB = await createAirport({
      city: cityB,
      iataCode: "WUH",
      name: "天河",
    });
    const airline = await createAirline({ iataCode: "MU" });

    const departDate = addDays(new Date(), 5);
    const returnDate = addDays(new Date(), 8);
    const departStr = toDateString(departDate);
    const returnStr = toDateString(returnDate);

    const { flight: outboundFlight } = await createFlight({
      airline,
      departureAirport: airportA,
      arrivalAirport: airportB,
      departureTime: fromZonedTime(
        new Date(`${departStr}T08:00:00`),
        "Asia/Shanghai"
      ),
      arrivalTime: fromZonedTime(
        new Date(`${departStr}T10:00:00`),
        "Asia/Shanghai"
      ),
    });
    await createSeatClass({
      flight: outboundFlight,
      classType: "ECONOMY",
      price: "500.00",
    });

    const { flight: inboundFlight } = await createFlight({
      airline,
      departureAirport: airportB,
      arrivalAirport: airportA,
      departureTime: fromZonedTime(
        new Date(`${returnStr}T18:00:00`),
        "Asia/Shanghai"
      ),
      arrivalTime: fromZonedTime(
        new Date(`${returnStr}T20:00:00`),
        "Asia/Shanghai"
      ),
    });
    await createSeatClass({
      flight: inboundFlight,
      classType: "ECONOMY",
      price: "550.00",
    });

    const { outbound, inbound } = await searchRoundTripFlights({
      from: "HGH",
      to: "WUH",
      departureDate: departStr,
      returnDate: returnStr,
      classType: "ECONOMY",
    });

    expect(outbound).toHaveLength(1);
    expect(inbound).toHaveLength(1);
  });
});
