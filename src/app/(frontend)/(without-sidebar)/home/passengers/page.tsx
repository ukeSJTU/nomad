import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import { getPassengers } from "@/lib/queries";

import { PassengersPageClient } from "./page.client";

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
