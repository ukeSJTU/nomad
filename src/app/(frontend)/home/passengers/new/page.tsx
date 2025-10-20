import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { NewPassengerClient } from "@/components/passengers/new-passenger-client";
import { auth } from "@/lib/auth";

export default async function NewPassengerPage() {
  // Check authentication
  const headersList = await headers();
  const session = await auth.api.getSession({
    headers: headersList,
  });

  if (!session?.user?.id) {
    redirect("/auth/sign-in");
  }

  return <NewPassengerClient />;
}
