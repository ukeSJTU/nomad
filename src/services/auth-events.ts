import { EventEmitter } from "events";

import type {
  AuthEventHandler,
  AuthEventKey,
  AuthEventMap,
} from "@/types/services";

const authEventEmitter = new EventEmitter();

export function emitAuthEvent<K extends AuthEventKey>(
  event: K,
  payload: AuthEventMap[K]
): void {
  authEventEmitter.emit(event, payload);
}

export function onAuthEvent<K extends AuthEventKey>(
  event: K,
  handler: AuthEventHandler<K>
): () => void {
  const wrappedHandler = async (payload: AuthEventMap[K]) => {
    try {
      await handler(payload);
    } catch (error) {
      // Avoid breaking the primary flow if a listener fails.

      console.error(`[auth-events] handler error for ${event}:`, error);
    }
  };

  authEventEmitter.on(event, wrappedHandler);
  return () => authEventEmitter.off(event, wrappedHandler);
}
