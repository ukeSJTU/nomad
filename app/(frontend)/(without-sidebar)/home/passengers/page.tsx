import { requireAuth } from "@/domains/auth/utils/helpers";
import { getPassengers } from "@/domains/passengers/passenger.repository";

import { PassengersPageClient } from "./page.client";

export const dynamic = "force-dynamic";

export default async function PassengersPage() {
  // Check authentication (redirects to sign-in if not authenticated)
  const userId = await requireAuth();

  const initialPassengers = await getPassengers(userId);

  return <PassengersPageClient initialPassengers={initialPassengers} />;
}
