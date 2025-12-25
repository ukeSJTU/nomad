import { defineConfig } from "drizzle-kit";
import { getDbEnv } from "./src/config/env";
import { ensureNodeEnvLoaded } from "./src/config/load-env";

ensureNodeEnvLoaded();

const dbEnv = getDbEnv();

export default defineConfig({
  out: "./drizzle",
  schema: ["./src/db/schema/index.ts"],
  dialect: "postgresql",
  dbCredentials: {
    url: dbEnv.DATABASE_URL,
  },
});
