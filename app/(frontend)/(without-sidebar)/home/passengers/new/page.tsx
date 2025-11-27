import { requireSessionUser } from "@/actions/session";

import { NewPassengerClient } from "./page.client";

export const dynamic = "force-dynamic";

export default async function NewPassengerPage() {
  await requireSessionUser("/home/passengers/new");

  return <NewPassengerClient />;
}
