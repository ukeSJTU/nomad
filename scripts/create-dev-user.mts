import { loadEnvConfig } from "@next/env";
import { auth } from "@/lib/auth/auth";

async function main() {
  loadEnvConfig(process.cwd());

  const email = "tester@nomad.dev";
  const password = "Nomad123!";
  const name = "Nomad Tester";

  try {
    const data = await auth.api.signUpEmail({
      body: {
        email,
        password,
        name,
      },
    });
    console.log("Created dev user:", { email, password, name, userId: data.user.id });
  } catch (error: unknown) {
    console.error("Failed to create dev user:", error);
  }
}

main();
