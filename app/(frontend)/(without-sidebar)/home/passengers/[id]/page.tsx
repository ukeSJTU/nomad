import Link from "next/link";
import { notFound } from "next/navigation";

import { PassengerDetailView } from "@/components/passengers";
import { getPassengerById } from "@/lib/repositories/passengers";

export default async function PassengerDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // Fetch passenger data with masked sensitive information
  const passenger = await getPassengerById(id);

  if (!passenger) {
    notFound();
  }

  return (
    <div className="container mx-auto max-w-4xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800">
          查看常用旅客信息
        </h2>
        <Link
          href="/home/passengers"
          className="text-sm text-blue-600 hover:text-blue-700 hover:underline"
        >
          查看所有旅客信息
        </Link>
      </div>
      <PassengerDetailView passenger={passenger} />
    </div>
  );
}
