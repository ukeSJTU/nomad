import { createCity } from "@tests/integration/helpers/factories";
import { describe, expect, it } from "vitest";

import { getAllCities } from "@/domains/flights";
import { vi } from "vitest";

vi.mock("server-only", () => {
  return {}; // 返回空对象，不做任何检查
});

describe("city.repository", () => {
  it("returns active cities ordered by displayOrder then name", async () => {
    await createCity({ name: "北京", iataCode: "BJS", displayOrder: 2 });
    await createCity({ name: "上海", iataCode: "SHA", displayOrder: 1 });
    await createCity({ name: "删除城市", iataCode: "DEL", isDeleted: true });

    const result = await getAllCities();

    expect(result.map(c => c.name)).toEqual(["上海", "北京"]);
  });
});
