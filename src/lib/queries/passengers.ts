import { eq } from "drizzle-orm";

import { db } from "@/lib/db";
import { passengers } from "@/lib/schema/passengers";
import type { Passenger } from "@/types/api/passengers";

export async function getPassengers(userId: string): Promise<Passenger[]> {
  const result = await db
    .select()
    .from(passengers)
    .where(eq(passengers.userId, userId));

  // Convert database result to API format
  return result.map(p => ({
    id: p.id,
    chineseName: p.chineseName,
    englishFirstName: p.englishFirstName,
    englishLastName: p.englishLastName,
    nationality: p.nationality,
    gender: p.gender,
    dateOfBirth: p.dateOfBirth,
    placeOfBirth: p.placeOfBirth,
    phone: p.phone,
    fax: p.fax,
    email: p.email,
    documentType: p.documentType,
    documentNumber: p.documentNumber,
    documentExpiryDate: p.documentExpiryDate ?? "",
    isDeleted: false,
    createdAt: p.createdAt?.toISOString() ?? new Date().toISOString(),
    updatedAt: p.updatedAt?.toISOString() ?? new Date().toISOString(),
  }));
}
