import { notFound } from "next/navigation";

import { EditPassengerClient } from "@/components/passengers/edit-passenger-client";
import { getPassengerAction } from "@/lib/actions";

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
