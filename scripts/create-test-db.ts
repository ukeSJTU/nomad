import { Client } from "pg";

const connectionString = "postgresql://postgres:123456@localhost:5432/nomad";
// Parse the connection string to get credentials but connect to 'postgres' database
const url = new URL(connectionString);
url.pathname = "/postgres";

async function createTestDb() {
  const client = new Client({
    connectionString: url.toString(),
  });

  try {
    await client.connect();
    // Check if database exists
    const res = await client.query(
      "SELECT 1 FROM pg_database WHERE datname = 'nomad_test'"
    );
    if (res.rowCount === 0) {
      console.log("Creating nomad_test database...");
      await client.query("CREATE DATABASE nomad_test");
      console.log("nomad_test created successfully.");
    } else {
      console.log("nomad_test already exists.");
    }
  } catch (err) {
    console.error("Error creating database:", err);
  } finally {
    await client.end();
  }
}

createTestDb();
