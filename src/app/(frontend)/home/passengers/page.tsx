import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { PassengersPageClient } from "@/components/passengers/passengers-page-client";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { passengers } from "@/lib/schema/passengers";
import type { Passenger } from "@/types/api/passengers";

async function getPassengers(userId: string): Promise<Passenger[]> {
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

export default async function PassengersPage() {
  const headersList = await headers();
  const session = await auth.api.getSession({
    headers: headersList,
  });

  if (!session?.user?.id) {
    redirect("/auth/sign-in");
  }

  const initialPassengers = await getPassengers(session.user.id);

  return <PassengersPageClient initialPassengers={initialPassengers} />;
}
