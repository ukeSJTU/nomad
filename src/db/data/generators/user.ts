/**
 * User and Passenger Generator
 *
 * Generates realistic user and passenger data using Faker.js.
 */

import { faker } from "@faker-js/faker";
import type { InferInsertModel } from "drizzle-orm";

import type { user } from "@/db/schema";
import type { passengers } from "@/db/schema/passengers";

type UserInsert = Omit<
  InferInsertModel<typeof user>,
  "createdAt" | "updatedAt"
>;
type PassengerInsert = Omit<
  InferInsertModel<typeof passengers>,
  "id" | "isDeleted" | "createdAt" | "updatedAt"
>;

/**
 * Generate test users
 *
 * @param count - Number of users to generate
 * @returns Array of user insert objects
 */
export function generateUsers(count: number): UserInsert[] {
  const users: UserInsert[] = [];

  for (let i = 0; i < count; i++) {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const email = faker.internet.email({
      firstName: firstName.toLowerCase(),
      lastName: lastName.toLowerCase(),
    });

    users.push({
      id: `user-${i + 1}`,
      name: `${firstName} ${lastName}`,
      email,
      emailVerified: faker.datatype.boolean({ probability: 0.8 }), // 80% verified
      image: faker.helpers.maybe(() => faker.image.avatar(), {
        probability: 0.3,
      }),
      phoneNumber: faker.helpers.maybe(() => faker.phone.number(), {
        probability: 0.5,
      }),
      phoneNumberVerified: null,
      balance: "10000.00", // Default balance for all users
    });
  }

  return users;
}

/**
 * Generate passengers for a user
 *
 * @param userId - User ID
 * @param count - Number of passengers to generate for this user
 * @returns Array of passenger insert objects
 */
export function generatePassengers(
  userId: string,
  count: number
): PassengerInsert[] {
  const passengers: PassengerInsert[] = [];

  for (let i = 0; i < count; i++) {
    const gender = faker.helpers.arrayElement([
      "male",
      "female",
      "other",
    ] as const);
    const firstName = faker.person.firstName(
      gender === "other" ? undefined : gender
    );
    const lastName = faker.person.lastName();
    const name = `${firstName} ${lastName}`;

    // Generate date of birth (18-80 years old)
    const dateOfBirth = faker.date.birthdate({ min: 18, max: 80, mode: "age" });
    const dateOfBirthStr = dateOfBirth.toISOString().split("T")[0];

    // Generate document expiry date (1-10 years in the future)
    const expiryDate = faker.date.future({ years: 10 });
    const expiryDateStr = expiryDate.toISOString().split("T")[0];

    // Document type (80% passport, 20% ID card)
    const documentType = faker.helpers.weightedArrayElement([
      { value: "passport" as const, weight: 8 },
      { value: "id_card" as const, weight: 2 },
    ]);

    // Generate document number
    const documentNumber =
      documentType === "passport"
        ? `P${faker.string.alphanumeric({ length: 8, casing: "upper" })}`
        : faker.string.numeric({ length: 18 });

    // Generate phone number (max 20 chars)
    // Use simple format to ensure it fits: XXX-XXX-XXXX (12 chars)
    const phoneNumber = `${faker.string.numeric(3)}-${faker.string.numeric(3)}-${faker.string.numeric(4)}`;

    passengers.push({
      userId,
      name,
      nationality: faker.helpers.arrayElement(["CN", "US", "GB", "JP", "KR"]),
      gender,
      dateOfBirth: dateOfBirthStr,
      placeOfBirth: faker.location.city(),
      phone: phoneNumber,
      email: faker.internet.email({
        firstName: firstName.toLowerCase(),
        lastName: lastName.toLowerCase(),
      }),
      documentType,
      documentNumber,
      documentExpiryDate: expiryDateStr,
    });
  }

  return passengers;
}
