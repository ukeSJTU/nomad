import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./drizzle",
  schema: ["./src/lib/schema/index.ts", "./auth-schema.ts"],
  dialect: "postgresql",
  dbCredentials: {
    url: "postgresql://uke@localhost:5432/nomad_test",
  },
});
