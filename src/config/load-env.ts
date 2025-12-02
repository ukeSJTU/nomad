import { loadEnvConfig } from "@next/env";

let loaded = false;

export function ensureNodeEnvLoaded() {
  if (loaded) return;
  loaded = true;
  loadEnvConfig(process.cwd());
}
