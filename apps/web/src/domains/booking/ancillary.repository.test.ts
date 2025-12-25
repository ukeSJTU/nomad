import { createOrderScenario } from "@/tests/integration/helpers/factories";
import { describe, expect, it } from "vitest";

import { getOrderForAncillary } from "./ancillary.repository";

describe("booking.ancillary.repository", () => {
  it("returns order with passengers and parsed ancillary details", async () => {
    const scenario = await createOrderScenario({
      ancillaryDetails: ["INSURANCE_BASIC", "MEAL_STANDARD"],
      ancillaryAmount: "80.00",
    });

    const result = await getOrderForAncillary(
      scenario.order.id,
      scenario.user.id
    );

    expect(result).not.toBeNull();
    expect(result?.passengers).toHaveLength(scenario.order.passengerCount ?? 1);
    expect(result?.ancillaryDetails).toEqual([
      "INSURANCE_BASIC",
      "MEAL_STANDARD",
    ]);
    expect(result?.outboundFlight.seatClass.classType).toBe("ECONOMY");
  });
});
