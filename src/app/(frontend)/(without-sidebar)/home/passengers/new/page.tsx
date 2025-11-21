import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";

import { NewPassengerClient } from "./page.client";

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
