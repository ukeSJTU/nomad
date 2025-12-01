"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/infra/auth";

export interface SessionUser {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
}

export interface AuthResult {
  success: boolean;
  userId?: string;
  error?: string;
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

export async function getAuthenticatedUserId(): Promise<AuthResult> {
  try {
    const user = await getSessionUser();

    if (!user?.id) {
      return {
        success: false,
        error: "Authentication required. Please log in first.",
      };
    }

    return {
      success: true,
      userId: user.id,
    };
  } catch (error) {
    logger.error({ err: error }, "Authentication error:");
    return {
      success: false,
      error: "Failed to verify authentication. Please try again.",
    };
  }
}

export async function requireAuth(redirectTo?: string): Promise<string> {
  const authResult = await getAuthenticatedUserId();

  if (!authResult.success || !authResult.userId) {
    redirect(getLoginUrl(redirectTo));
  }

  return authResult.userId;
}
