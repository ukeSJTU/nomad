import { getPassengersAction } from "@/actions/passengers";

import { PassengersPageClient } from "./page.client";

export const dynamic = "force-dynamic";

export default async function PassengersPage() {
  const initialPassengers = await getPassengersAction();

  return <PassengersPageClient initialPassengers={initialPassengers} />;
}
