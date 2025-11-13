import { passengerFactory, userFactory } from "@tests/factories";
import { clearDatabase } from "@tests/helpers/db";
import { eq } from "drizzle-orm";
import { beforeEach, describe, expect, it } from "vitest";

import { db } from "@/lib/db";
import { user } from "@/lib/schema";
import { passengers } from "@/lib/schema/passengers";
import {
  batchDeletePassengers,
  createPassenger,
  deletePassenger,
  getPassenger,
  updatePassenger,
} from "@/lib/services/passengers";

/**
 * Integration tests for Passenger Service Layer
 *
 * These tests verify the business logic in the service layer without
 * mocking the Next.js runtime. They test pure functions that can be
 * reused in different contexts (user actions, admin operations, cron jobs, etc.).
 *
 * Test scenarios cover:
 * - Creating passengers
 * - Updating passengers
 * - Getting passengers
 * - Deleting passengers (soft delete)
 * - Batch deleting passengers
 * - Authorization (user can only access their own passengers)
 * - Validation and error handling
 */
describe("Passenger Service Integration Tests", () => {
  beforeEach(async () => {
    // Clear all test data before each test
    await clearDatabase();
  });

  describe("createPassenger", () => {
    it("should successfully create a passenger with all fields", async () => {
      // Arrange: Create a test user
      const testUser = userFactory.build({
        id: "user-create-1",
        email: "create1@test.com",
      });
      await db.insert(user).values(testUser);

      // Act: Create a passenger
      const result = await createPassenger(testUser.id, {
        name: "John Doe",
        nationality: "US",
        gender: "male",
        dateOfBirth: "1990-01-01",
        placeOfBirth: "New York",
        phone: "+1234567890",
        email: "john@example.com",
        documentType: "passport",
        documentNumber: "P123456",
        documentExpiryDate: "2030-12-31",
      });

      // Assert: Should succeed
      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      expect(result.data?.name).toBe("John Doe");
      expect(result.data?.nationality).toBe("US");
      expect(result.data?.gender).toBe("male");
      expect(result.data?.documentType).toBe("passport");
      expect(result.data?.documentNumber).toBe("P123456");
      expect(result.data?.isDeleted).toBe(false);

      // Verify: Passenger should exist in database
      const dbPassengers = await db
        .select()
        .from(passengers)
        .where(eq(passengers.userId, testUser.id));
      expect(dbPassengers).toHaveLength(1);
      expect(dbPassengers[0].name).toBe("John Doe");
    });

    it("should successfully create a passenger with only required fields", async () => {
      // Arrange: Create a test user
      const testUser = userFactory.build({
        id: "user-create-2",
        email: "create2@test.com",
      });
      await db.insert(user).values(testUser);

      // Act: Create a passenger with minimal data
      const result = await createPassenger(testUser.id, {
        name: "Jane Smith",
        documentType: "id_card",
        documentNumber: "ID789",
        documentExpiryDate: "2030-12-31",
      });

      // Assert: Should succeed
      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      expect(result.data?.name).toBe("Jane Smith");
      expect(result.data?.documentType).toBe("id_card");
      expect(result.data?.documentNumber).toBe("ID789");
      expect(result.data?.nationality).toBeNull();
      expect(result.data?.gender).toBeNull();
    });

    it("should fail when required fields are missing", async () => {
      // Arrange: Create a test user
      const testUser = userFactory.build({
        id: "user-create-3",
        email: "create3@test.com",
      });
      await db.insert(user).values(testUser);

      // Act: Try to create passenger without required fields
      const result = await createPassenger(testUser.id, {
        name: "",
        documentType: "passport",
        documentNumber: "",
        documentExpiryDate: "",
      });

      // Assert: Should fail
      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
    });
  });

  describe("updatePassenger", () => {
    it("should successfully update a passenger", async () => {
      // Arrange: Create a user with a passenger
      const testUser = userFactory.build({
        id: "user-update-1",
        email: "update1@test.com",
      });
      await db.insert(user).values(testUser);

      const passenger = passengerFactory.build({
        userId: testUser.id,
        name: "Original Name",
        email: "original@test.com",
        isDeleted: false,
      });
      const [insertedPassenger] = await db
        .insert(passengers)
        .values(passenger)
        .returning();

      // Act: Update the passenger
      const result = await updatePassenger(testUser.id, insertedPassenger.id, {
        name: "Updated Name",
        email: "updated@test.com",
        nationality: "CA",
      });

      // Assert: Should succeed
      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      expect(result.data?.name).toBe("Updated Name");
      expect(result.data?.email).toBe("updated@test.com");
      expect(result.data?.nationality).toBe("CA");

      // Verify: Passenger should be updated in database
      const [dbPassenger] = await db
        .select()
        .from(passengers)
        .where(eq(passengers.id, insertedPassenger.id));
      expect(dbPassenger.name).toBe("Updated Name");
      expect(dbPassenger.email).toBe("updated@test.com");
    });

    it("should fail when updating non-existent passenger", async () => {
      // Arrange: Create a test user
      const testUser = userFactory.build({
        id: "user-update-2",
        email: "update2@test.com",
      });
      await db.insert(user).values(testUser);

      // Act: Try to update non-existent passenger
      const result = await updatePassenger(testUser.id, "non-existent-id", {
        name: "Updated Name",
      });

      // Assert: Should fail
      expect(result.success).toBe(false);
      expect(result.error).toContain("not found");
    });

    it("should fail when updating another user's passenger", async () => {
      // Arrange: Create two users
      const user1 = userFactory.build({
        id: "user-update-3a",
        email: "update3a@test.com",
      });
      const user2 = userFactory.build({
        id: "user-update-3b",
        email: "update3b@test.com",
      });
      await db.insert(user).values([user1, user2]);

      // Create passenger for user1
      const passenger = passengerFactory.build({
        userId: user1.id,
        name: "User1 Passenger",
        isDeleted: false,
      });
      const [insertedPassenger] = await db
        .insert(passengers)
        .values(passenger)
        .returning();

      // Act: Try to update user1's passenger as user2
      const result = await updatePassenger(user2.id, insertedPassenger.id, {
        name: "Hacked Name",
      });

      // Assert: Should fail
      expect(result.success).toBe(false);
      expect(result.error).toContain("not found");

      // Verify: Passenger should not be updated
      const [dbPassenger] = await db
        .select()
        .from(passengers)
        .where(eq(passengers.id, insertedPassenger.id));
      expect(dbPassenger.name).toBe("User1 Passenger");
    });
  });

  describe("getPassenger", () => {
    it("should successfully get a passenger", async () => {
      // Arrange: Create a user with a passenger
      const testUser = userFactory.build({
        id: "user-get-1",
        email: "get1@test.com",
      });
      await db.insert(user).values(testUser);

      const passenger = passengerFactory.build({
        userId: testUser.id,
        name: "Get Test Passenger",
        email: "get-passenger@test.com",
        isDeleted: false,
      });
      const [insertedPassenger] = await db
        .insert(passengers)
        .values(passenger)
        .returning();

      // Act: Get the passenger
      const result = await getPassenger(testUser.id, insertedPassenger.id);

      // Assert: Should succeed
      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      expect(result.data?.name).toBe("Get Test Passenger");
      expect(result.data?.email).toBe("get-passenger@test.com");
    });

    it("should return null when passenger not found", async () => {
      // Arrange: Create a test user
      const testUser = userFactory.build({
        id: "user-get-2",
        email: "get2@test.com",
      });
      await db.insert(user).values(testUser);

      // Act: Try to get non-existent passenger
      const result = await getPassenger(testUser.id, "non-existent-id");

      // Assert: Should return null
      expect(result.success).toBe(true);
      expect(result.data).toBeNull();
    });

    it("should not return another user's passenger", async () => {
      // Arrange: Create two users
      const user1 = userFactory.build({
        id: "user-get-3a",
        email: "get3a@test.com",
      });
      const user2 = userFactory.build({
        id: "user-get-3b",
        email: "get3b@test.com",
      });
      await db.insert(user).values([user1, user2]);

      // Create passenger for user1
      const passenger = passengerFactory.build({
        userId: user1.id,
        name: "User1 Passenger",
        isDeleted: false,
      });
      const [insertedPassenger] = await db
        .insert(passengers)
        .values(passenger)
        .returning();

      // Act: Try to get user1's passenger as user2
      const result = await getPassenger(user2.id, insertedPassenger.id);

      // Assert: Should return null
      expect(result.success).toBe(true);
      expect(result.data).toBeNull();
    });
  });

  describe("deletePassenger", () => {
    it("should successfully soft delete a passenger", async () => {
      // Arrange: Create a user with a passenger
      const testUser = userFactory.build({
        id: "user-delete-1",
        email: "delete1@test.com",
      });
      await db.insert(user).values(testUser);

      const passenger = passengerFactory.build({
        userId: testUser.id,
        name: "Delete Test Passenger",
        isDeleted: false,
      });
      const [insertedPassenger] = await db
        .insert(passengers)
        .values(passenger)
        .returning();

      // Act: Delete the passenger
      const result = await deletePassenger(testUser.id, insertedPassenger.id);

      // Assert: Should succeed
      expect(result.success).toBe(true);
      expect(result.message).toContain("deleted successfully");

      // Verify: Passenger should be marked as deleted
      const [dbPassenger] = await db
        .select()
        .from(passengers)
        .where(eq(passengers.id, insertedPassenger.id));
      expect(dbPassenger.isDeleted).toBe(true);
    });

    it("should fail when deleting non-existent passenger", async () => {
      // Arrange: Create a test user
      const testUser = userFactory.build({
        id: "user-delete-2",
        email: "delete2@test.com",
      });
      await db.insert(user).values(testUser);

      // Act: Try to delete non-existent passenger
      const result = await deletePassenger(testUser.id, "non-existent-id");

      // Assert: Should fail
      expect(result.success).toBe(false);
      expect(result.error).toContain("not found");
    });

    it("should fail when deleting another user's passenger", async () => {
      // Arrange: Create two users
      const user1 = userFactory.build({
        id: "user-delete-3a",
        email: "delete3a@test.com",
      });
      const user2 = userFactory.build({
        id: "user-delete-3b",
        email: "delete3b@test.com",
      });
      await db.insert(user).values([user1, user2]);

      // Create passenger for user1
      const passenger = passengerFactory.build({
        userId: user1.id,
        name: "User1 Passenger",
        isDeleted: false,
      });
      const [insertedPassenger] = await db
        .insert(passengers)
        .values(passenger)
        .returning();

      // Act: Try to delete user1's passenger as user2
      const result = await deletePassenger(user2.id, insertedPassenger.id);

      // Assert: Should fail
      expect(result.success).toBe(false);
      expect(result.error).toContain("not found");

      // Verify: Passenger should not be deleted
      const [dbPassenger] = await db
        .select()
        .from(passengers)
        .where(eq(passengers.id, insertedPassenger.id));
      expect(dbPassenger.isDeleted).toBe(false);
    });

    it("should fail when deleting already deleted passenger", async () => {
      // Arrange: Create a user with a deleted passenger
      const testUser = userFactory.build({
        id: "user-delete-4",
        email: "delete4@test.com",
      });
      await db.insert(user).values(testUser);

      const passenger = passengerFactory.build({
        userId: testUser.id,
        name: "Already Deleted",
        isDeleted: true, // Already deleted
      });
      const [insertedPassenger] = await db
        .insert(passengers)
        .values(passenger)
        .returning();

      // Act: Try to delete already deleted passenger
      const result = await deletePassenger(testUser.id, insertedPassenger.id);

      // Assert: Should fail
      expect(result.success).toBe(false);
      expect(result.error).toContain("not found");
    });
  });

  describe("batchDeletePassengers", () => {
    it("should successfully batch delete multiple passengers", async () => {
      // Arrange: Create a user with 3 passengers
      const testUser = userFactory.build({
        id: "user-batch-1",
        email: "batch1@test.com",
      });
      await db.insert(user).values(testUser);

      const passenger1 = passengerFactory.build({
        userId: testUser.id,
        name: "Passenger 1",
        isDeleted: false,
      });
      const passenger2 = passengerFactory.build({
        userId: testUser.id,
        name: "Passenger 2",
        isDeleted: false,
      });
      const passenger3 = passengerFactory.build({
        userId: testUser.id,
        name: "Passenger 3",
        isDeleted: false,
      });

      const insertedPassengers = await db
        .insert(passengers)
        .values([passenger1, passenger2, passenger3])
        .returning();

      const idsToDelete = insertedPassengers.map(p => p.id);

      // Act: Batch delete all 3 passengers
      const result = await batchDeletePassengers(testUser.id, idsToDelete);

      // Assert: Should succeed
      expect(result.success).toBe(true);
      expect(result.data).toBe(3);
      expect(result.message).toContain("3 passenger(s)");

      // Verify: All passengers should be marked as deleted
      const dbPassengers = await db
        .select()
        .from(passengers)
        .where(eq(passengers.userId, testUser.id));
      expect(dbPassengers).toHaveLength(3);
      expect(dbPassengers.every(p => p.isDeleted)).toBe(true);
    });

    it("should only delete user's own passengers", async () => {
      // Arrange: Create two users with passengers
      const user1 = userFactory.build({
        id: "user-batch-2a",
        email: "batch2a@test.com",
      });
      const user2 = userFactory.build({
        id: "user-batch-2b",
        email: "batch2b@test.com",
      });
      await db.insert(user).values([user1, user2]);

      const user1Passenger = passengerFactory.build({
        userId: user1.id,
        name: "User1 Passenger",
        isDeleted: false,
      });
      const user2Passenger = passengerFactory.build({
        userId: user2.id,
        name: "User2 Passenger",
        isDeleted: false,
      });

      const [p1, p2] = await db
        .insert(passengers)
        .values([user1Passenger, user2Passenger])
        .returning();

      // Act: Try to delete both passengers as user1
      const result = await batchDeletePassengers(user1.id, [p1.id, p2.id]);

      // Assert: Should only delete user1's passenger
      expect(result.success).toBe(true);
      expect(result.data).toBe(1); // Only 1 passenger deleted

      // Verify: Only user1's passenger should be deleted
      const [dbP1] = await db
        .select()
        .from(passengers)
        .where(eq(passengers.id, p1.id));
      const [dbP2] = await db
        .select()
        .from(passengers)
        .where(eq(passengers.id, p2.id));

      expect(dbP1.isDeleted).toBe(true);
      expect(dbP2.isDeleted).toBe(false);
    });

    it("should fail when no IDs provided", async () => {
      // Arrange: Create a test user
      const testUser = userFactory.build({
        id: "user-batch-3",
        email: "batch3@test.com",
      });
      await db.insert(user).values(testUser);

      // Act: Try to batch delete with empty array
      const result = await batchDeletePassengers(testUser.id, []);

      // Assert: Should fail
      expect(result.success).toBe(false);
      expect(result.error).toContain("At least one passenger ID is required");
    });

    it("should not delete already deleted passengers", async () => {
      // Arrange: Create a user with 2 passengers (1 active, 1 deleted)
      const testUser = userFactory.build({
        id: "user-batch-4",
        email: "batch4@test.com",
      });
      await db.insert(user).values(testUser);

      const activePassenger = passengerFactory.build({
        userId: testUser.id,
        name: "Active Passenger",
        isDeleted: false,
      });
      const deletedPassenger = passengerFactory.build({
        userId: testUser.id,
        name: "Deleted Passenger",
        isDeleted: true,
      });

      const [p1, p2] = await db
        .insert(passengers)
        .values([activePassenger, deletedPassenger])
        .returning();

      // Act: Try to batch delete both
      const result = await batchDeletePassengers(testUser.id, [p1.id, p2.id]);

      // Assert: Should only delete the active one
      expect(result.success).toBe(true);
      expect(result.data).toBe(1); // Only 1 passenger deleted
    });
  });
});
