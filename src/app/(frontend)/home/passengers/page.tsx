import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { PassengersPageClient } from "@/components/passengers/passengers-page-client";
import { auth } from "@/lib/auth";
import { getPassengers } from "@/lib/queries";

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
