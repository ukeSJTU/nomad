import { createOrderScenario } from "@tests/integration/helpers/factories";
import { describe, expect, it } from "vitest";

import { getOrderConfirmation } from "@/domains/booking";

describe("confirmation.repository", () => {
  it("returns confirmation data with payment and flight details", async () => {
    const scenario = await createOrderScenario({
      includeInbound: true,
      passengerCount: 1,
      totalAmount: "300.00",
    });

    const result = await getOrderConfirmation(
      scenario.order.id,
      scenario.user.id
    );

    expect(result).not.toBeNull();
    expect(result?.payment?.amount).toBe("300.00");
    expect(result?.passengers).toHaveLength(1);
    expect(result?.outboundFlight.flightNumber).toBe(
      scenario.outbound.flight.flightNumber
    );
    expect(result?.inboundFlight).not.toBeNull();
  });
});
