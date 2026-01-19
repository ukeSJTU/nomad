"use client";

import { UserMenu as UserMenuUI } from "@nomad/ui/components/common/user-menu";
import { useRouter } from "next/navigation";
import { signOutAction } from "@/app/_actions/auth";
import { useClientSession } from "@/hooks/use-client-session";

/**
 * UserMenu container component - handles Next.js specific logic and data fetching.
 *
 * @description
 * Container responsibilities:
 * - Fetch session data via useClientSession hook
 * - Handle sign out action and navigation
 * - Pass data to pure UI component
 *
 * @returns {JSX.Element} The rendered UserMenu container
 */
export default function UserMenu() {
  const { data: session, isPending } = useClientSession();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOutAction();
    router.push("/");
  };

  return (
    <UserMenuUI
      session={session}
      isPending={isPending}
      onSignOut={handleSignOut}
      signInHref="/auth/sign-in"
      signUpHref="/auth/sign-up"
      userInfoHref="/home/info"
      walletsHref="/home/wallets"
      passengersHref="/home/passengers"
    />
  );
}
