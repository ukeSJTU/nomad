import { and, eq } from "drizzle-orm";

import { db } from "@/lib/db";
import { passengers } from "@/lib/schema/passengers";
import type { Passenger } from "@/types/dto/passengers";

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
