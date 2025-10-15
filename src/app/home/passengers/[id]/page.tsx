import { eq } from "drizzle-orm";
import Link from "next/link";
import { notFound } from "next/navigation";

import { PassengerDetailView } from "@/components/passengers";
import type { PassengerDetailData } from "@/components/passengers/passenger-detail-view";
import { db } from "@/lib/db";
import { passengers } from "@/lib/schema/passengers";
import {
  maskDocumentNumber,
  maskEmail,
  maskPhoneNumber,
} from "@/lib/utils/mask-data";

async function getPassengerById(id: string) {
  const [passenger] = await db
    .select()
    .from(passengers)
    .where(eq(passengers.id, id))
    .limit(1);

  return passenger;
}

export default async function PassengerDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // Fetch passenger data from database
  const passenger = await getPassengerById(id);

  if (!passenger) {
    notFound();
  }

  // Prepare passenger data with server-side masking
  const maskedPassenger: PassengerDetailData = {
    chineseName: passenger.chineseName ?? undefined,
    englishLastName: passenger.englishLastName ?? undefined,
    englishFirstName: passenger.englishFirstName ?? undefined,
    nationality: passenger.nationality ?? "未设置",
    gender: passenger.gender ?? "other",
    dateOfBirth: passenger.dateOfBirth ?? new Date(),
    placeOfBirth: passenger.placeOfBirth ?? undefined,
    // Mask sensitive data on server-side
    phone: passenger.phone ? maskPhoneNumber(passenger.phone) : undefined,
    fax: passenger.fax ?? undefined,
    email: passenger.email ? maskEmail(passenger.email) : undefined,
    documentType: passenger.documentType,
    documentNumber: maskDocumentNumber(passenger.documentNumber),
    documentExpiryDate: passenger.documentExpiryDate ?? undefined,
  };

  return (
    <div className="container mx-auto max-w-4xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800">
          查看常用旅客信息
        </h2>
        <Link
          href="/home/passenger"
          className="text-sm text-blue-600 hover:text-blue-700 hover:underline"
        >
          查看所有旅客信息
        </Link>
      </div>
      <PassengerDetailView passenger={maskedPassenger} />
    </div>
  );
}
