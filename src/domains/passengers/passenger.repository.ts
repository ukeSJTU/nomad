import { and, eq, inArray } from "drizzle-orm";

import { db } from "@/db";
import { passengers } from "@/db/schema/passengers";
import type { DbExecutor } from "@/db/transaction";
import {
  maskDocumentNumber,
  maskEmail,
  maskPhoneNumber,
} from "@/lib/mask-data";
import type { Passenger, PassengerDetailData } from "@/types/dto/passengers";

export type PassengerRow = typeof passengers.$inferSelect;
type PassengerInsert = typeof passengers.$inferInsert;

export async function getPassengers(
  userId: string,
  dbClient: DbExecutor = db
): Promise<Passenger[]> {
  const result = await dbClient
    .select()
    .from(passengers)
    .where(and(eq(passengers.userId, userId), eq(passengers.isDeleted, false)));

  // Convert database result to API format
  return result.map(p => ({
    id: p.id,
    name: p.name,
    nationality: p.nationality,
    gender: p.gender,
    dateOfBirth: p.dateOfBirth,
    placeOfBirth: p.placeOfBirth,
    phone: p.phone,
    email: p.email,
    documentType: p.documentType,
    documentNumber: p.documentNumber,
    documentExpiryDate: p.documentExpiryDate ?? null,
    isDeleted: false,
    createdAt: p.createdAt?.toISOString() ?? new Date().toISOString(),
    updatedAt: p.updatedAt?.toISOString() ?? new Date().toISOString(),
  }));
}

/**
 * Get passenger detail by ID with masked sensitive data
 *
 * This function fetches passenger data from the database and applies
 * data masking for sensitive fields (phone, email, documentNumber).
 *
 * @param id - The ID of the passenger to fetch
 * @param userId - The ID of the user who owns the passenger
 * @returns Passenger detail with masked sensitive data, or null if passenger not found
 */
export async function getPassengerById(
  id: string,
  userId: string,
  dbClient: DbExecutor = db
): Promise<PassengerDetailData | null> {
  const [passenger] = await dbClient
    .select()
    .from(passengers)
    .where(
      and(
        eq(passengers.id, id),
        eq(passengers.userId, userId),
        eq(passengers.isDeleted, false)
      )
    )
    .limit(1);

  if (!passenger) {
    return null;
  }

  // Apply data masking for sensitive fields
  const maskedPhone = passenger.phone ? maskPhoneNumber(passenger.phone) : null;
  const maskedEmail = passenger.email ? maskEmail(passenger.email) : null;
  const maskedDocumentNumber = maskDocumentNumber(passenger.documentNumber);

  // Convert database result to DTO format with masked data
  return {
    name: passenger.name,
    nationality: passenger.nationality ?? "未设置",
    gender: passenger.gender ?? "other",
    dateOfBirth: passenger.dateOfBirth ?? new Date().toISOString(),
    placeOfBirth: passenger.placeOfBirth,
    phone: maskedPhone,
    email: maskedEmail,
    documentType: passenger.documentType,
    documentNumber: maskedDocumentNumber,
    documentExpiryDate: passenger.documentExpiryDate,
  };
}

export async function createPassengerRecord(
  data: PassengerInsert,
  dbClient: DbExecutor = db
): Promise<PassengerRow> {
  const [createdPassenger] = await dbClient
    .insert(passengers)
    .values(data)
    .returning();

  return createdPassenger;
}

export async function findPassengerForUser(
  id: string,
  userId: string,
  dbClient: DbExecutor = db
): Promise<PassengerRow | undefined> {
  const [passenger] = await dbClient
    .select()
    .from(passengers)
    .where(
      and(
        eq(passengers.id, id),
        eq(passengers.userId, userId),
        eq(passengers.isDeleted, false)
      )
    );

  return passenger;
}

export async function updatePassengerRecord(
  id: string,
  updateData: Partial<PassengerInsert>,
  dbClient: DbExecutor = db
): Promise<PassengerRow | undefined> {
  const [updatedPassenger] = await dbClient
    .update(passengers)
    .set(updateData)
    .where(eq(passengers.id, id))
    .returning();

  return updatedPassenger;
}

export async function softDeletePassengerForUser(
  id: string,
  userId: string,
  dbClient: DbExecutor = db
): Promise<boolean> {
  const result = await dbClient
    .update(passengers)
    .set({ isDeleted: true, updatedAt: new Date() })
    .where(
      and(
        eq(passengers.id, id),
        eq(passengers.userId, userId),
        eq(passengers.isDeleted, false)
      )
    )
    .returning({ id: passengers.id });

  return result.length > 0;
}

export async function batchSoftDeletePassengersForUser(
  userId: string,
  ids: string[],
  dbClient: DbExecutor = db
): Promise<number> {
  const result = await dbClient
    .update(passengers)
    .set({ isDeleted: true, updatedAt: new Date() })
    .where(
      and(
        inArray(passengers.id, ids),
        eq(passengers.userId, userId),
        eq(passengers.isDeleted, false)
      )
    )
    .returning({ id: passengers.id });

  return result.length;
}
