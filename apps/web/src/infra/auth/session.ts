import "server-only";

import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "./better-auth.plugin";

export interface SessionUser {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
}

function getLoginUrl(redirectTo?: string): string {
  return redirectTo
    ? `/auth/sign-in?redirect=${encodeURIComponent(redirectTo)}`
    : "/auth/sign-in";
}

export async function getSessionUser(): Promise<SessionUser | null> {
  const headersList = await headers();
  const session = await auth.api.getSession({ headers: headersList });

  if (!session?.user?.id) {
    return null;
  }

  return {
    id: session.user.id,
    name: session.user.name ?? null,
    email: session.user.email ?? null,
    image: session.user.image ?? null,
  };
}

export async function requireSessionUser(
  redirectTo?: string
): Promise<SessionUser> {
  const user = await getSessionUser();

  if (!user) {
    redirect(getLoginUrl(redirectTo));
  }

  return user;
}
