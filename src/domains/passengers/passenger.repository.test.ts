import {
  createPassengerForUser,
  createUser,
} from "@/tests/integration/helpers/factories";
import { describe, expect, it } from "vitest";

import {
  batchSoftDeletePassengersForUser,
  createPassengerRecord,
  findPassengerForUser,
  getPassengerById,
  getPassengers,
  softDeletePassengerForUser,
  updatePassengerRecord,
} from "@/domains/passengers";

describe("passenger.repository", () => {
  it("returns only non-deleted passengers for the given user", async () => {
    const user = await createUser();
    const otherUser = await createUser({
      id: "other-user",
      email: "other@example.com",
    });

    const active = await createPassengerForUser(user.id, {
      name: "Active Passenger",
    });
    await createPassengerForUser(user.id, {
      name: "Deleted Passenger",
      isDeleted: true,
    });
    await createPassengerForUser(otherUser.id, {
      name: "Other User Passenger",
    });

    const passengers = await getPassengers(user.id);

    expect(passengers).toHaveLength(1);
    expect(passengers[0]?.id).toBe(active.id);
    expect(passengers[0]?.name).toBe("Active Passenger");
    expect(passengers[0]?.isDeleted).toBe(false);
  });

  it("gets passenger by id and masks sensitive fields", async () => {
    const user = await createUser();
    const passenger = await createPassengerForUser(user.id, {
      phone: "13812345678",
      email: "passenger@example.com",
      documentNumber: "P1234567890",
    });

    const result = await getPassengerById(passenger.id, user.id);

    expect(result).not.toBeNull();
    expect(result?.phone).toBe("138****5678");
    expect(result?.email).toBe("pa***@example.com");
    expect(result?.documentNumber).toBe("P123****890");
  });

  it("creates, updates, and soft deletes passenger records", async () => {
    const user = await createUser();
    const created = await createPassengerRecord({
      userId: user.id,
      name: "Initial Name",
      documentType: "passport",
      documentNumber: "PN123456",
    });

    expect(created.name).toBe("Initial Name");

    const updated = await updatePassengerRecord(created.id, {
      name: "Updated Name",
    });

    expect(updated?.name).toBe("Updated Name");

    const deleted = await softDeletePassengerForUser(created.id, user.id);
    expect(deleted).toBe(true);

    const found = await findPassengerForUser(created.id, user.id);
    // soft delete hides record from normal query
    expect(found).toBeUndefined();
  });

  it("batch soft deletes only the targeted user passengers", async () => {
    const user = await createUser({
      id: "batch-user",
      email: "batch@example.com",
    });
    const otherUser = await createUser({
      id: "batch-other",
      email: "batch-other@example.com",
    });

    const p1 = await createPassengerForUser(user.id);
    const p2 = await createPassengerForUser(user.id);
    await createPassengerForUser(otherUser.id);

    const deletedCount = await batchSoftDeletePassengersForUser(user.id, [
      p1.id,
      p2.id,
    ]);

    expect(deletedCount).toBe(2);
    const remaining = await getPassengers(user.id);
    expect(remaining).toHaveLength(0);
  });
});
