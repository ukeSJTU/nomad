import {
  airlineFactory,
  airportFactory,
  cityFactory,
  expiredOrderFactory,
  flightFactory,
  flightSeatClassFactory,
  orderFactory,
  userFactory,
} from "@tests/factories";
import { clearDatabase } from "@tests/helpers/db";
import { eq } from "drizzle-orm";
import { beforeEach, describe, expect, it } from "vitest";

import { db } from "@/lib/db";
import {
  airlines,
  airports,
  cities,
  flights,
  flightSeatClasses,
  orders,
  user,
} from "@/lib/schema";
import { cancelExpiredOrders } from "@/lib/services/orders";

describe("cancelExpiredOrders Integration Test", () => {
  beforeEach(async () => {
    // Clear all test data before each test
    await clearDatabase();
  });

  /**
   * Helper function to create a complete test flight environment
   * This creates all necessary related records: city, airport, airline, flight, seat class
   */
  async function createTestFlightEnvironment() {
    // Create user
    const testUser = userFactory.build({ id: "test-user-1" });
    await db.insert(user).values(testUser);

    // Create cities
    const departureCity = cityFactory.build({ iataCode: "SHA" });
    const arrivalCity = cityFactory.build({ iataCode: "BJS" });
    const [insertedDepartureCity, insertedArrivalCity] = await db
      .insert(cities)
      .values([departureCity, arrivalCity])
      .returning();

    // Create airports
    const departureAirport = airportFactory.build({
      iataCode: "PVG",
      cityId: insertedDepartureCity.id,
    });
    const arrivalAirport = airportFactory.build({
      iataCode: "PEK",
      cityId: insertedArrivalCity.id,
    });
    const [insertedDepartureAirport, insertedArrivalAirport] = await db
      .insert(airports)
      .values([departureAirport, arrivalAirport])
      .returning();

    // Create airline
    const airline = airlineFactory.build({ iataCode: "CA" });
    const [insertedAirline] = await db
      .insert(airlines)
      .values(airline)
      .returning();

    // Create flight
    const flight = flightFactory.build({
      flightNumber: "CA1234",
      airlineId: insertedAirline.id,
      departureAirportId: insertedDepartureAirport.id,
      arrivalAirportId: insertedArrivalAirport.id,
    });
    const [insertedFlight] = await db
      .insert(flights)
      .values(flight)
      .returning();

    // Create seat class with 100 available seats
    const seatClass = flightSeatClassFactory.build({
      flightId: insertedFlight.id,
      classType: "ECONOMY",
      totalSeats: 100,
      availableSeats: 100,
    });
    const [insertedSeatClass] = await db
      .insert(flightSeatClasses)
      .values(seatClass)
      .returning();

    return {
      user: testUser,
      departureCity: insertedDepartureCity,
      arrivalCity: insertedArrivalCity,
      departureAirport: insertedDepartureAirport,
      arrivalAirport: insertedArrivalAirport,
      airline: insertedAirline,
      flight: insertedFlight,
      seatClass: insertedSeatClass,
    };
  }

  describe("Basic functionality", () => {
    it("should cancel expired orders and release seats", async () => {
      // Arrange: Create test environment
      const { seatClass, user: testUser } = await createTestFlightEnvironment();

      // Create an expired order (payment deadline 1 minute ago)
      const expiredOrder = expiredOrderFactory.build({
        userId: testUser.id,
        outboundFlightSeatClassId: seatClass.id,
        passengerCount: 2,
      });
      const [insertedExpiredOrder] = await db
        .insert(orders)
        .values(expiredOrder)
        .returning();

      // Lock 2 seats
      await db
        .update(flightSeatClasses)
        .set({ availableSeats: 98 }) // 100 - 2
        .where(eq(flightSeatClasses.id, seatClass.id));

      // Act: Cancel expired orders
      const result = await cancelExpiredOrders();

      // Assert: Should succeed
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.cancelledCount).toBe(1);
        expect(result.data.releasedSeats).toBe(2);
      }

      // Verify: Order status should be CANCELLED
      const updatedOrder = await db.query.orders.findFirst({
        where: (orders, { eq }) => eq(orders.id, insertedExpiredOrder.id),
      });
      expect(updatedOrder?.status).toBe("CANCELLED");

      // Verify: Seats should be released (back to 100)
      const updatedSeatClass = await db.query.flightSeatClasses.findFirst({
        where: (seatClasses, { eq }) => eq(seatClasses.id, seatClass.id),
      });
      expect(updatedSeatClass?.availableSeats).toBe(100);
    });

    it("should handle multiple expired orders", async () => {
      // Arrange: Create test environment
      const { seatClass, user: testUser } = await createTestFlightEnvironment();

      // Create 3 expired orders
      const expiredOrder1 = expiredOrderFactory.build({
        userId: testUser.id,
        outboundFlightSeatClassId: seatClass.id!,
        passengerCount: 1,
      });
      const expiredOrder2 = expiredOrderFactory.build({
        userId: testUser.id,
        outboundFlightSeatClassId: seatClass.id!,
        passengerCount: 2,
      });
      const expiredOrder3 = expiredOrderFactory.build({
        userId: testUser.id,
        outboundFlightSeatClassId: seatClass.id!,
        passengerCount: 3,
      });
      await db
        .insert(orders)
        .values([expiredOrder1, expiredOrder2, expiredOrder3]);

      // Lock 6 seats total (1 + 2 + 3)
      await db
        .update(flightSeatClasses)
        .set({ availableSeats: 94 }) // 100 - 6
        .where(eq(flightSeatClasses.id, seatClass.id!));

      // Act: Cancel expired orders
      const result = await cancelExpiredOrders();

      // Assert: Should cancel all 3 orders
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.cancelledCount).toBe(3);
        expect(result.data.releasedSeats).toBe(6);
      }

      // Verify: All seats should be released (back to 100)
      const updatedSeatClass = await db.query.flightSeatClasses.findFirst({
        where: (seatClasses, { eq }) => eq(seatClasses.id, seatClass.id!),
      });
      expect(updatedSeatClass?.availableSeats).toBe(100);
    });

    it("should not cancel orders that have not expired", async () => {
      // Arrange: Create test environment
      const { seatClass, user: testUser } = await createTestFlightEnvironment();

      // Create a non-expired order (payment deadline 10 minutes from now)
      const validOrder = orderFactory.build({
        userId: testUser.id,
        outboundFlightSeatClassId: seatClass.id,
        paymentDeadline: new Date(Date.now() + 10 * 60 * 1000),
      });
      const [insertedValidOrder] = await db
        .insert(orders)
        .values(validOrder)
        .returning();

      // Act: Cancel expired orders
      const result = await cancelExpiredOrders();

      // Assert: No orders should be cancelled
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.cancelledCount).toBe(0);
        expect(result.data.releasedSeats).toBe(0);
      }

      // Verify: Order status should still be PENDING_PAYMENT
      const updatedOrder = await db.query.orders.findFirst({
        where: (orders, { eq }) => eq(orders.id, insertedValidOrder.id),
      });
      expect(updatedOrder?.status).toBe("PENDING_PAYMENT");
    });

    it("should not cancel orders with CONFIRMED status", async () => {
      // Arrange: Create test environment
      const { seatClass, user: testUser } = await createTestFlightEnvironment();

      // Create a confirmed order with expired deadline
      const confirmedOrder = expiredOrderFactory.build({
        userId: testUser.id,
        outboundFlightSeatClassId: seatClass.id,
        status: "CONFIRMED", // Already confirmed
        paymentDeadline: new Date(Date.now() - 1 * 60 * 1000), // Expired deadline
      });
      const [insertedConfirmedOrder] = await db
        .insert(orders)
        .values(confirmedOrder)
        .returning();

      // Act: Cancel expired orders
      const result = await cancelExpiredOrders();

      // Assert: No orders should be cancelled
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.cancelledCount).toBe(0);
      }

      // Verify: Order status should still be CONFIRMED
      const updatedOrder = await db.query.orders.findFirst({
        where: (orders, { eq }) => eq(orders.id, insertedConfirmedOrder.id),
      });
      expect(updatedOrder?.status).toBe("CONFIRMED");
    });

    it("should return zero counts when no expired orders exist", async () => {
      // Arrange: Empty database (no orders)

      // Act: Cancel expired orders
      const result = await cancelExpiredOrders();

      // Assert: Should succeed with zero counts
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.cancelledCount).toBe(0);
        expect(result.data.releasedSeats).toBe(0);
        expect(result.message).toContain("No expired orders found");
      }
    });
  });
});
