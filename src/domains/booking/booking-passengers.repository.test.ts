import { randomUUID } from "crypto";
import {
  createFlightWithSeatClass,
  createPassengerForUser,
  createUser,
} from "@tests/integration/helpers/factories";
import { describe, expect, it } from "vitest";

import {
  getFlightSeatClassById,
  getFlightSeatClassesByIds,
  getSavedPassengers,
} from "@/domains/booking";

describe("booking-passengers.repository", () => {
  it("returns seat class details with flight, airline, and city info", async () => {
    const { seatClass } = await createFlightWithSeatClass({
      classType: "BUSINESS",
      price: "1500.00",
    });

    const result = await getFlightSeatClassById(seatClass.id);

    expect(result).not.toBeNull();
    expect(result?.classType).toBe("BUSINESS");
    expect(result?.flight.airline.name).toBeDefined();
    expect(result?.flight.departure.city.name).toBeDefined();
  });

  it("returns multiple seat classes and filters out missing ones", async () => {
    const { seatClass } = await createFlightWithSeatClass();
    const result = await getFlightSeatClassesByIds([
      seatClass.id,
      randomUUID(),
    ]);

    expect(result).toHaveLength(1);
    expect(result[0]?.id).toBe(seatClass.id);
  });

  it("returns saved passengers for user excluding deleted ones", async () => {
    const user = await createUser();
    const passenger = await createPassengerForUser(user.id, {
      name: "常用乘客",
    });
    await createPassengerForUser(user.id, { isDeleted: true });

    const saved = await getSavedPassengers(user.id);

    expect(saved).toHaveLength(1);
    expect(saved[0]?.id).toBe(passenger.id);
  });
});
