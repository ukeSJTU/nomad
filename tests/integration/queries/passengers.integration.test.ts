import {
  chinesePassengerFactory,
  deletedPassengerFactory,
  passengerFactory,
  userFactory,
} from "@tests/factories";
import { clearDatabase } from "@tests/helpers/db";
import { beforeEach, describe, expect, it } from "vitest";

import { db } from "@/lib/db";
import { getPassengers } from "@/lib/queries/passengers";
import { user } from "@/lib/schema";
import { passengers } from "@/lib/schema/passengers";

describe("getPassengers Integration Test", () => {
  beforeEach(async () => {
    // Clear all test data before each test
    await clearDatabase();
  });

  it("should return all passengers for a user", async () => {
    // Arrange: Create a user with 3 passengers
    const testUser = userFactory.build({ id: "user-1" });
    await db.insert(user).values(testUser);

    const passenger1 = passengerFactory.build({
      userId: testUser.id,
      englishFirstName: "John",
      englishLastName: "Doe",
    });
    const passenger2 = passengerFactory.build({
      userId: testUser.id,
      englishFirstName: "Jane",
      englishLastName: "Smith",
    });
    const passenger3 = chinesePassengerFactory.build({
      userId: testUser.id,
      chineseName: "张三",
    });

    await db.insert(passengers).values([passenger1, passenger2, passenger3]);

    // Act: Get passengers for the user
    const result = await getPassengers(testUser.id);

    // Assert: Should return all 3 passengers
    expect(result).toHaveLength(3);

    // Find passengers by their unique attributes
    const johnPassenger = result.find(p => p.englishFirstName === "John");
    const janePassenger = result.find(p => p.englishFirstName === "Jane");
    const chinesePassenger = result.find(p => p.chineseName === "张三");

    expect(johnPassenger).toBeDefined();
    expect(johnPassenger?.englishLastName).toBe("Doe");
    expect(janePassenger).toBeDefined();
    expect(janePassenger?.englishLastName).toBe("Smith");
    expect(chinesePassenger).toBeDefined();
  });

  it("should return empty array when user has no passengers", async () => {
    // Arrange: Create a user with no passengers
    const testUser = userFactory.build({ id: "user-empty" });
    await db.insert(user).values(testUser);

    // Act: Get passengers for the user
    const result = await getPassengers(testUser.id);

    // Assert: Should return empty array
    expect(result).toEqual([]);
  });

  it("should not return passengers from other users", async () => {
    // Arrange: Create two users with their own passengers
    const user1 = userFactory.build({ id: "user-1" });
    const user2 = userFactory.build({ id: "user-2" });
    await db.insert(user).values([user1, user2]);

    const user1Passenger = passengerFactory.build({
      userId: user1.id,
      englishFirstName: "User1Passenger",
    });
    const user2Passenger = passengerFactory.build({
      userId: user2.id,
      englishFirstName: "User2Passenger",
    });

    await db.insert(passengers).values([user1Passenger, user2Passenger]);

    // Act: Get passengers for user1
    const result = await getPassengers(user1.id);

    // Assert: Should only return user1's passenger
    expect(result).toHaveLength(1);
    expect(result[0].englishFirstName).toBe("User1Passenger");
  });

  it("should not return deleted passengers", async () => {
    // Arrange: Create a user with both active and deleted passengers
    const testUser = userFactory.build({ id: "user-1" });
    await db.insert(user).values(testUser);

    const activePassenger = passengerFactory.build({
      userId: testUser.id,
      englishFirstName: "ActivePassenger",
      isDeleted: false,
    });
    const deletedPassenger = deletedPassengerFactory.build({
      userId: testUser.id,
      englishFirstName: "DeletedPassenger",
      isDeleted: true,
    });

    await db.insert(passengers).values([activePassenger, deletedPassenger]);

    // Act: Get passengers for the user
    const result = await getPassengers(testUser.id);

    // Assert: Should only return active passengers, not deleted ones
    expect(result).toHaveLength(1);
    expect(result[0].englishFirstName).toBe("ActivePassenger");
    expect(result.some(p => p.englishFirstName === "DeletedPassenger")).toBe(
      false
    );
  });

  it("should correctly map database fields to API format", async () => {
    // Arrange: Create a user with a passenger that has all fields populated
    const testUser = userFactory.build({ id: "user-1" });
    await db.insert(user).values(testUser);

    const fullPassenger = passengerFactory.build({
      userId: testUser.id,
      chineseName: "李四",
      englishFirstName: "John",
      englishLastName: "Smith",
      nationality: "CN",
      gender: "male",
      dateOfBirth: "1990-05-15",
      placeOfBirth: "Shanghai",
      phone: "13912345678",
      fax: "021-12345678",
      email: "john@test.com",
      documentType: "passport",
      documentNumber: "E12345678",
      documentExpiryDate: "2030-12-31",
    });

    await db.insert(passengers).values(fullPassenger);

    // Act: Get passengers for the user
    const result = await getPassengers(testUser.id);

    // Assert: All fields should be correctly mapped
    expect(result).toHaveLength(1);
    const passenger = result[0];
    expect(passenger.id).toBeDefined(); // UUID is generated
    expect(passenger.chineseName).toBe("李四");
    expect(passenger.englishFirstName).toBe("John");
    expect(passenger.englishLastName).toBe("Smith");
    expect(passenger.nationality).toBe("CN");
    expect(passenger.gender).toBe("male");
    expect(passenger.dateOfBirth).toBe("1990-05-15");
    expect(passenger.placeOfBirth).toBe("Shanghai");
    expect(passenger.phone).toBe("13912345678");
    expect(passenger.fax).toBe("021-12345678");
    expect(passenger.email).toBe("john@test.com");
    expect(passenger.documentType).toBe("passport");
    expect(passenger.documentNumber).toBe("E12345678");
    expect(passenger.documentExpiryDate).toBe("2030-12-31");
    expect(passenger.isDeleted).toBe(false);
    expect(passenger.createdAt).toBeDefined();
    expect(passenger.updatedAt).toBeDefined();
  });
});
