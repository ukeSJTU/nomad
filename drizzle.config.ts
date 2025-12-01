import { loadEnvConfig } from "@next/env";
import { defineConfig } from "drizzle-kit";
import { env } from "./src/config/env";

// Load environment variables based on NODE_ENV
// - NODE_ENV=test → loads .env.test
// - NODE_ENV=development → loads .env.local or .env.development
// - NODE_ENV=production → loads .env.production
loadEnvConfig(process.cwd());

export default defineConfig({
  out: "./drizzle",
  schema: ["./src/db/schema/index.ts"],
  dialect: "postgresql",
  dbCredentials: {
    url: env.DATABASE_URL!,
  },
});
