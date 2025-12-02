import { loadEnvConfig } from "@next/env";
import { defineConfig } from "drizzle-kit";

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
    url: process.env.DATABASE_URL ?? "",
  },
});
