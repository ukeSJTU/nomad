import { notFound } from "next/navigation";

import { getPassengerAction } from "@/app/home/passengers/actions";
import { EditPassengerClient } from "@/components/passengers/edit-passenger-client";

export default async function EditPassengerPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // Fetch passenger data using server action
  const passenger = await getPassengerAction(id);

  if (!passenger) {
    notFound();
  }

  return <EditPassengerClient passenger={passenger} />;
}
