import { EventEmitter } from "events";

type AuthEventMap = {
  phoneNumberUpdated: {
    userId: string;
    phoneNumber: string;
    userEmail?: string | null;
    userName?: string | null;
  };
  emailUpdated: {
    userId: string;
    email: string;
    userName?: string | null;
  };
};

type AuthEventKey = keyof AuthEventMap;
type AuthEventHandler<K extends AuthEventKey> = (
  payload: AuthEventMap[K]
) => void | Promise<void>;

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
