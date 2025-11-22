import { and, eq } from "drizzle-orm";

import { db } from "@/lib/db";
import { passengers } from "@/lib/schema/passengers";
import type { Passenger, PassengerDetailData } from "@/types/dto/passengers";
import {
  maskDocumentNumber,
  maskEmail,
  maskPhoneNumber,
} from "@/utils/mask-data";

export async function getPassengers(userId: string): Promise<Passenger[]> {
  const result = await db
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
 * @returns Passenger detail with masked sensitive data, or null if passenger not found
 */
export async function getPassengerById(
  id: string
): Promise<PassengerDetailData | null> {
  const [passenger] = await db
    .select()
    .from(passengers)
    .where(eq(passengers.id, id))
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
