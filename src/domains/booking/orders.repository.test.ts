import { createOrderScenario } from "@tests/integration/helpers/factories";
import { addHours, subHours } from "date-fns";
import { eq } from "drizzle-orm";
import { describe, expect, it } from "vitest";

import { db } from "@/db";
import {
  flightSeatClasses,
  orders as ordersTable,
  user as userTable,
} from "@/db/schema";
import {
  cancelExpiredOrdersAndReleaseSeats,
  cancelOrderAndReleaseSeats,
  getAllOrdersByUserId,
  getExpiredOrders,
  getOrderDetailById,
  getOrderForCancellation,
  getOrderForRefund,
  refundOrderAndReleaseSeats,
} from "@/domains/booking/orders.repository";

describe("booking.orders.repository", () => {
  it("returns all orders for user ordered by creation time", async () => {
    const scenario = await createOrderScenario({
      includeInbound: true,
      passengerCount: 2,
    });

    const orders = await getAllOrdersByUserId(scenario.user.id);

    expect(orders).toHaveLength(1);
    expect(orders[0]?.orderNumber).toBe(scenario.order.orderNumber);
    expect(orders[0]?.passengerNames).toHaveLength(2);
    expect(orders[0]?.inboundFlight).not.toBeNull();
  });

  it("returns full order detail with masked contact data", async () => {
    const scenario = await createOrderScenario({
      includeInbound: true,
      passengerCount: 1,
      contactPhone: "13812345678",
      contactEmail: "user@example.com",
    });

    const detail = await getOrderDetailById(
      scenario.order.id,
      scenario.user.id
    );

    expect(detail).not.toBeNull();
    expect(detail?.contact.contactPhone).toBe("138****5678");
    expect(detail?.contact.contactEmail).toBe("us***@example.com");
    expect(detail?.payment.totalAmount).toBe(
      String(scenario.order.totalAmount)
    );
  });

  it("returns order for cancellation and updates seats when cancelling", async () => {
    const scenario = await createOrderScenario({
      includeInbound: true,
      passengerCount: 2,
      status: "PENDING_PAYMENT",
    });

    const orderForCancel = await getOrderForCancellation(
      scenario.order.id,
      scenario.user.id
    );
    expect(orderForCancel?.id).toBe(scenario.order.id);

    await cancelOrderAndReleaseSeats(orderForCancel!, new Date());

    const [outbound] = await db
      .select()
      .from(flightSeatClasses)
      .where(eq(flightSeatClasses.id, scenario.outbound.seatClass.id));
    const [inbound] = await db
      .select()
      .from(flightSeatClasses)
      .where(eq(flightSeatClasses.id, scenario.inbound!.seatClass.id));

    expect(outbound?.availableSeats).toBe(
      (scenario.outbound.seatClass.availableSeats ?? 0) + 2
    );
    expect(inbound?.availableSeats).toBe(
      (scenario.inbound!.seatClass.availableSeats ?? 0) + 2
    );

    const [updatedOrder] = await db
      .select()
      .from(ordersTable)
      .where(eq(ordersTable.id, scenario.order.id));
    expect(updatedOrder?.status).toBe("CANCELLED");
  });

  it("finds expired orders and cancels them releasing seats", async () => {
    const active = await createOrderScenario({
      passengerCount: 1,
      paymentDeadline: addHours(new Date(), 2),
    });
    const expired = await createOrderScenario({
      passengerCount: 1,
      paymentDeadline: subHours(new Date(), 1),
    });

    const expiredOrders = await getExpiredOrders(new Date());
    expect(expiredOrders.map(o => o.id)).toContain(expired.order.id);
    expect(expiredOrders.map(o => o.id)).not.toContain(active.order.id);

    const result = await cancelExpiredOrdersAndReleaseSeats(
      expiredOrders,
      new Date()
    );
    expect(result.cancelledCount).toBe(expiredOrders.length);
    expect(result.releasedSeats).toBe(
      expiredOrders.reduce(
        (sum, o) =>
          sum + o.passengerCount * (o.inboundFlightSeatClassId ? 2 : 1),
        0
      )
    );

    const [outbound] = await db
      .select()
      .from(flightSeatClasses)
      .where(eq(flightSeatClasses.id, expired.outbound.seatClass.id));
    expect(outbound?.availableSeats).toBe(
      (expired.outbound.seatClass.availableSeats ?? 0) +
        expired.order.passengerCount
    );
  });

  it("returns refund data and performs refund with seat release", async () => {
    const scenario = await createOrderScenario({
      includeInbound: true,
      passengerCount: 1,
      pricePerTicket: "200.00",
      baseAmount: "200.00",
      totalAmount: "200.00",
      status: "CONFIRMED",
    });

    const refundData = await getOrderForRefund(
      scenario.order.id,
      scenario.user.id
    );
    expect(refundData?.totalAmount).toBe("200.00");

    await refundOrderAndReleaseSeats(
      {
        id: scenario.order.id,
        userId: scenario.user.id,
        passengerCount: scenario.order.passengerCount,
        totalAmount: "200.00",
        outboundFlightSeatClassId: scenario.outbound.seatClass.id,
        inboundFlightSeatClassId: scenario.inbound?.seatClass.id ?? null,
      },
      new Date()
    );

    const [orderRow] = await db
      .select()
      .from(ordersTable)
      .where(eq(ordersTable.id, scenario.order.id));
    expect(orderRow?.status).toBe("REFUNDED");

    const [userRow] = await db
      .select()
      .from(userTable)
      .where(eq(userTable.id, scenario.user.id));
    expect(userRow?.balance).toBe("10200.00");

    const [outbound] = await db
      .select()
      .from(flightSeatClasses)
      .where(eq(flightSeatClasses.id, scenario.outbound.seatClass.id));
    expect(outbound?.availableSeats).toBe(
      (scenario.outbound.seatClass.availableSeats ?? 0) +
        scenario.order.passengerCount
    );
  });
});
