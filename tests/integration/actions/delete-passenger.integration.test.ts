import { passengerFactory, userFactory } from "@tests/factories";
import { clearDatabase } from "@tests/helpers/db";
import { and, eq } from "drizzle-orm";
import { beforeEach, describe, expect, it } from "vitest";

import { db } from "@/lib/db";
import { user } from "@/lib/schema";
import { passengers } from "@/lib/schema/passengers";

/**
 * Integration tests for delete passenger functionality
 *
 * These tests verify the core database logic for soft-deleting passengers.
 * They test the same logic used in deletePassengerAction, but without
 * the Next.js server action wrapper (which requires runtime context).
 *
 * Test scenarios:
 * 1. Successfully soft delete a passenger
 * 2. Verify deleted passenger is marked as deleted
 * 3. Prevent deleting non-existent passenger
 * 4. Prevent deleting another user's passenger
 * 5. Prevent deleting already deleted passenger
 */
describe("Delete Passenger Integration Test", () => {
  beforeEach(async () => {
    // Clear all test data before each test
    await clearDatabase();
  });

  it("should successfully soft delete a passenger", async () => {
    // Arrange: Create a user with a passenger
    const testUser = userFactory.build({
      id: "user-delete-1",
      email: "delete1@test.com",
    });
    await db.insert(user).values(testUser);

    const passenger = passengerFactory.build({
      userId: testUser.id,
      englishFirstName: "John",
      englishLastName: "Doe",
      email: "delete-passenger1@test.com",
      isDeleted: false,
    });
    const [insertedPassenger] = await db
      .insert(passengers)
      .values(passenger)
      .returning();

    // Act: Soft delete the passenger
    await db
      .update(passengers)
      .set({ isDeleted: true, updatedAt: new Date() })
      .where(eq(passengers.id, insertedPassenger.id));

    // Assert: Passenger should be marked as deleted
    const [deletedPassenger] = await db
      .select()
      .from(passengers)
      .where(eq(passengers.id, insertedPassenger.id));

    expect(deletedPassenger).toBeDefined();
    expect(deletedPassenger.isDeleted).toBe(true);
    expect(deletedPassenger.englishFirstName).toBe("John");
    expect(deletedPassenger.englishLastName).toBe("Doe");
  });

  it("should verify deleted passenger is not returned in active queries", async () => {
    // Arrange: Create a user with two passengers
    const testUser = userFactory.build({
      id: "user-delete-2",
      email: "delete2@test.com",
    });
    await db.insert(user).values(testUser);

    const activePassenger = passengerFactory.build({
      userId: testUser.id,
      englishFirstName: "Active",
      englishLastName: "Passenger",
      email: "delete-passenger2-active@test.com",
      isDeleted: false,
    });
    const toDeletePassenger = passengerFactory.build({
      userId: testUser.id,
      englishFirstName: "ToDelete",
      englishLastName: "Passenger",
      email: "delete-passenger2-todelete@test.com",
      isDeleted: false,
    });

    const [insertedActive, insertedToDelete] = await db
      .insert(passengers)
      .values([activePassenger, toDeletePassenger])
      .returning();

    // Act: Soft delete one passenger
    await db
      .update(passengers)
      .set({ isDeleted: true, updatedAt: new Date() })
      .where(eq(passengers.id, insertedToDelete.id));

    // Assert: Query for active passengers should only return the active one
    const activePassengers = await db
      .select()
      .from(passengers)
      .where(
        and(eq(passengers.userId, testUser.id), eq(passengers.isDeleted, false))
      );

    expect(activePassengers).toHaveLength(1);
    expect(activePassengers[0].id).toBe(insertedActive.id);
    expect(activePassengers[0].englishFirstName).toBe("Active");
  });

  it("should not find non-existent passenger for deletion", async () => {
    // Arrange: Create a user but no passengers
    const testUser = userFactory.build({
      id: "user-delete-3",
      email: "delete3@test.com",
    });
    await db.insert(user).values(testUser);

    const nonExistentId = "00000000-0000-0000-0000-000000000000";

    // Act: Try to find the non-existent passenger
    const [existingPassenger] = await db
      .select()
      .from(passengers)
      .where(
        and(
          eq(passengers.id, nonExistentId),
          eq(passengers.userId, testUser.id),
          eq(passengers.isDeleted, false)
        )
      );

    // Assert: Should not find the passenger
    expect(existingPassenger).toBeUndefined();
  });

  it("should not allow deleting another user's passenger", async () => {
    // Arrange: Create two users, each with a passenger
    const user1 = userFactory.build({
      id: "user-delete-4-1",
      email: "delete4-1@test.com",
    });
    const user2 = userFactory.build({
      id: "user-delete-4-2",
      email: "delete4-2@test.com",
    });
    await db.insert(user).values([user1, user2]);

    const user1Passenger = passengerFactory.build({
      userId: user1.id,
      englishFirstName: "User1",
      englishLastName: "Passenger",
      email: "delete-passenger4-user1@test.com",
      isDeleted: false,
    });
    const user2Passenger = passengerFactory.build({
      userId: user2.id,
      englishFirstName: "User2",
      englishLastName: "Passenger",
      email: "delete-passenger4-user2@test.com",
      isDeleted: false,
    });

    const [, insertedUser2Passenger] = await db
      .insert(passengers)
      .values([user1Passenger, user2Passenger])
      .returning();

    // Act: User1 tries to find User2's passenger (simulating permission check)
    const [foundPassenger] = await db
      .select()
      .from(passengers)
      .where(
        and(
          eq(passengers.id, insertedUser2Passenger.id),
          eq(passengers.userId, user1.id), // User1 trying to access User2's passenger
          eq(passengers.isDeleted, false)
        )
      );

    // Assert: Should not find the passenger (permission check fails)
    expect(foundPassenger).toBeUndefined();

    // Verify User2's passenger is still active
    const [user2PassengerCheck] = await db
      .select()
      .from(passengers)
      .where(
        and(
          eq(passengers.id, insertedUser2Passenger.id),
          eq(passengers.userId, user2.id),
          eq(passengers.isDeleted, false)
        )
      );

    expect(user2PassengerCheck).toBeDefined();
    expect(user2PassengerCheck.englishFirstName).toBe("User2");
  });

  it("should not find already deleted passenger for deletion", async () => {
    // Arrange: Create a user with an already deleted passenger
    const testUser = userFactory.build({
      id: "user-delete-5",
      email: "delete5@test.com",
    });
    await db.insert(user).values(testUser);

    const deletedPassenger = passengerFactory.build({
      userId: testUser.id,
      englishFirstName: "Deleted",
      englishLastName: "Passenger",
      email: "delete-passenger5@test.com",
      isDeleted: true, // Already deleted
    });

    const [insertedPassenger] = await db
      .insert(passengers)
      .values(deletedPassenger)
      .returning();

    // Act: Try to find the already deleted passenger (simulating the check in deletePassengerAction)
    const [existingPassenger] = await db
      .select()
      .from(passengers)
      .where(
        and(
          eq(passengers.id, insertedPassenger.id),
          eq(passengers.userId, testUser.id),
          eq(passengers.isDeleted, false) // Looking for non-deleted passengers
        )
      );

    // Assert: Should not find the passenger (it's already deleted)
    expect(existingPassenger).toBeUndefined();

    // Verify the passenger still exists in database but is marked as deleted
    const [passengerInDb] = await db
      .select()
      .from(passengers)
      .where(eq(passengers.id, insertedPassenger.id));

    expect(passengerInDb).toBeDefined();
    expect(passengerInDb.isDeleted).toBe(true);
  });
});
