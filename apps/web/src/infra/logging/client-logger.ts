type ClientLevel =
  | "fatal"
  | "error"
  | "warn"
  | "info"
  | "debug"
  | "trace"
  | "silent";

const VALID_LOG_LEVELS: ClientLevel[] = [
  "fatal",
  "error",
  "warn",
  "info",
  "debug",
  "trace",
  "silent",
];

const LEVEL_PRIORITY: Record<ClientLevel, number> = {
  fatal: 60,
  error: 50,
  warn: 40,
  info: 30,
  debug: 20,
  trace: 10,
  silent: 0,
};

const resolveClientLogLevel = (): ClientLevel => {
  if (process.env.NODE_ENV === "test") return "silent";

  const envLevel = process.env.NEXT_PUBLIC_LOG_LEVEL as ClientLevel | undefined;

  if (envLevel && VALID_LOG_LEVELS.includes(envLevel)) {
    return envLevel;
  }

  return process.env.NODE_ENV === "development" ? "debug" : "info";
};

const baseLevel = resolveClientLogLevel();

const shouldLog = (level: ClientLevel) =>
  LEVEL_PRIORITY[level] >= LEVEL_PRIORITY[baseLevel] && baseLevel !== "silent";

const formatMessage = (
  bindings: Record<string, unknown> | undefined,
  msg: unknown
) => (bindings ? { ...bindings, message: msg } : msg);

const createConsoleLogger = (bindings?: Record<string, unknown>) => ({
  fatal: (...args: unknown[]) => {
    if (shouldLog("fatal"))
      console.error(formatMessage(bindings, args[0]), ...args.slice(1));
  },
  error: (...args: unknown[]) => {
    if (shouldLog("error"))
      console.error(formatMessage(bindings, args[0]), ...args.slice(1));
  },
  warn: (...args: unknown[]) => {
    if (shouldLog("warn"))
      console.warn(formatMessage(bindings, args[0]), ...args.slice(1));
  },
  info: (...args: unknown[]) => {
    if (shouldLog("info"))
      console.info(formatMessage(bindings, args[0]), ...args.slice(1));
  },
  debug: (...args: unknown[]) => {
    if (shouldLog("debug"))
      console.debug(formatMessage(bindings, args[0]), ...args.slice(1));
  },
  trace: (...args: unknown[]) => {
    if (shouldLog("trace"))
      console.debug(formatMessage(bindings, args[0]), ...args.slice(1));
  },
  child: (childBindings?: Record<string, unknown>) =>
    createConsoleLogger({ ...bindings, ...childBindings }),
});

const clientLogger = createConsoleLogger({ service: "nomad-client" });

export const createClientLogger = (bindings?: Record<string, unknown>) =>
  clientLogger.child(bindings);

export default clientLogger;
