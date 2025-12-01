// biome-ignore lint/suspicious/noConsole: This is a setup script that needs console output
const { Client } = require("pg");

async function createTestDb() {
  const user = process.env.USER || "postgres";
  console.log(`Trying to connect as user: ${user}`);

  const client = new Client({
    connectionString: `postgres://${user}@localhost:5432/postgres`,
  });

  try {
    await client.connect();
    console.log("Connected to postgres database");

    const res = await client.query(
      "SELECT 1 FROM pg_database WHERE datname = 'nomad_test'"
    );
    if (res.rowCount === 0) {
      console.log("Creating nomad_test database...");
      await client.query("CREATE DATABASE nomad_test");
      console.log("nomad_test database created.");
    } else {
      console.log("nomad_test database already exists.");
    }
  } catch (err) {
    console.error("Error creating test database:", err);
    // Try connecting to template1 if postgres db doesn't exist
    if (err.code === "3D000") {
      console.log("Trying template1...");
      const client2 = new Client({
        connectionString: `postgres://${user}@localhost:5432/template1`,
      });
      try {
        await client2.connect();
        console.log("Connected to template1");
        const res = await client2.query(
          "SELECT 1 FROM pg_database WHERE datname = 'nomad_test'"
        );
        if (res.rowCount === 0) {
          await client2.query("CREATE DATABASE nomad_test");
          console.log("nomad_test database created.");
        }
        await client2.end();
      } catch (err2) {
        console.error("Error connecting to template1:", err2);
      }
    }
  } finally {
    await client.end();
  }
}

createTestDb();
