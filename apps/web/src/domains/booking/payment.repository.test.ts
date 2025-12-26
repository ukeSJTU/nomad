import { describe, expect, it } from "vitest";
import { createOrderScenario } from "@/tests/integration/helpers/factories";

import { getOrderForPayment } from "./payment.repository";

describe("booking.payment.repository", () => {
  it("returns payment page data with flights, passengers, and ancillary details", async () => {
    const scenario = await createOrderScenario({
      includeInbound: true,
      passengerCount: 2,
      ancillaryDetails: ["INSURANCE_BASIC"],
      ancillaryAmount: "50.00",
    });

    const result = await getOrderForPayment(
      scenario.order.id,
      scenario.user.id
    );

    expect(result).not.toBeNull();
    expect(result?.passengers).toHaveLength(2);
    expect(result?.outboundFlight.seatClass.classType).toBe("ECONOMY");
    expect(result?.inboundFlight).not.toBeNull();
    expect(result?.ancillaryDetails).toEqual(["INSURANCE_BASIC"]);
    expect(result?.totalAmount).toBe(scenario.order.totalAmount);
  });
});
