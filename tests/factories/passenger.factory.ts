import { randomUUID } from "crypto";
import { Factory } from "fishery";

/**
 * Passenger type based on passengers schema
 */
type Passenger = {
  id: string;
  userId: string;
  chineseName: string | null;
  englishFirstName: string | null;
  englishLastName: string | null;
  nationality: string | null;
  gender: "male" | "female" | "other" | null;
  dateOfBirth: string | null; // YYYY-MM-DD format
  placeOfBirth: string | null;
  phone: string | null;
  fax: string | null;
  email: string | null;
  documentType: "passport" | "id_card" | "other";
  documentNumber: string;
  documentExpiryDate: string; // YYYY-MM-DD format
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
};

/**
 * Factory for creating test passengers
 *
 * Usage:
 * - passengerFactory.build() - Create a passenger object (not inserted to DB)
 * - passengerFactory.build({ userId: 'user-1' }) - Associate with a specific user
 * - passengerFactory.build({ chineseName: '张三' }) - Override specific fields
 */
export const passengerFactory = Factory.define<Passenger>(({ sequence }) => ({
  id: randomUUID(), // Generate valid UUID
  userId: `user-1`, // Default user, should be overridden in tests
  chineseName: null,
  englishFirstName: `First${sequence}`,
  englishLastName: `Last${sequence}`,
  nationality: "US",
  gender: "male",
  dateOfBirth: "1990-01-01",
  placeOfBirth: "New York",
  phone: "13800138000",
  fax: null,
  email: `passenger${sequence}@test.com`,
  documentType: "passport",
  documentNumber: `P${sequence.toString().padStart(8, "0")}`,
  documentExpiryDate: "2030-12-31",
  isDeleted: false,
  createdAt: new Date(),
  updatedAt: new Date(),
}));

/**
 * Factory for creating deleted passengers
 */
export const deletedPassengerFactory = passengerFactory.params({
  isDeleted: true,
});

/**
 * Factory for creating Chinese passengers
 */
export const chinesePassengerFactory = passengerFactory.params({
  chineseName: "张三",
  englishFirstName: null,
  englishLastName: null,
  nationality: "CN",
  placeOfBirth: "Beijing",
  documentType: "id_card",
});

/**
 * Factory for creating foreign passengers
 */
export const foreignPassengerFactory = passengerFactory.params({
  chineseName: null,
  nationality: "US",
  placeOfBirth: "New York",
  documentType: "passport",
});

/**
 * Factory for creating passengers with expired documents
 */
export const expiredDocumentPassengerFactory = passengerFactory.params({
  documentExpiryDate: "2020-01-01", // Expired
});
