import { EventEmitter } from "events";

import { createScopedLogger } from "@/infra/logging/logger";
import type {
  AuthEventHandler,
  AuthEventKey,
  AuthEventMap,
} from "@/types/services";

const logger = createScopedLogger({ module: "auth-events" });

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

      logger.error({ err: error, event }, "[auth-events] handler error");
    }
  };

  authEventEmitter.on(event, wrappedHandler);
  return () => authEventEmitter.off(event, wrappedHandler);
}
