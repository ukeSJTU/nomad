import { describe, expect, it } from "vitest";

import { generateUUIDFromString } from "./uuid";

describe("generateUUIDFromString", () => {
  it("returns a deterministic UUID for the same input", () => {
    const first = generateUUIDFromString("test-input");
    const second = generateUUIDFromString("test-input");
    expect(first).toBe(second);
  });

  it("produces different UUIDs for different inputs", () => {
    const first = generateUUIDFromString("alpha");
    const second = generateUUIDFromString("beta");
    expect(first).not.toBe(second);
  });

  it("matches UUID v4 string format", () => {
    const uuid = generateUUIDFromString("format-check");
    expect(uuid).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
    );
  });
});
