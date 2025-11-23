import { requireAuth } from "@/utils/auth-helpers";

import { NewPassengerClient } from "./page.client";

export const dynamic = "force-dynamic";

export default async function NewPassengerPage() {
  // Check authentication (redirects to sign-in if not authenticated)
  await requireAuth();

  return <NewPassengerClient />;
}
