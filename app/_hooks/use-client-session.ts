"use client";

import { useEffect, useState } from "react";

import { type SessionUser, getSessionUser } from "@/actions/session";

interface UseClientSessionResult {
  data: SessionUser | null;
  isPending: boolean;
  error: string | null;
}

/**
 * Fetches the current session user from a server action.
 * Ensures client components don't import backend clients directly.
 */
export function useClientSession(): UseClientSessionResult {
  const [data, setData] = useState<SessionUser | null>(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const session = await getSessionUser();
        if (!cancelled) {
          setData(session);
        }
      } catch (err) {
        console.error("Failed to load session", err);
        if (!cancelled) {
          setError("加载会话失败");
        }
      } finally {
        if (!cancelled) {
          setIsPending(false);
        }
      }
    };

    load();

    return () => {
      cancelled = true;
    };
  }, []);

  return { data, isPending, error };
}
