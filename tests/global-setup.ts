import { execSync } from "child_process";

async function globalSetup(): Promise<void> {
  const testDbUrl =
    process.env.TEST_DB_URL ||
    "postgresql://test_user:test_password@localhost:5433/test_db?schema=public";

  process.env.DATABASE_URL = testDbUrl;
  process.env.NODE_ENV = "test";

  try {
    execSync("npx prisma db push --skip-generate", {
      stdio: "inherit",
      env: { ...process.env, DATABASE_URL: testDbUrl },
    });
  } catch (error) {
    console.error("❌ Error sincronizando la DB de test:", error);
    process.exit(1);
  }
}

export default globalSetup;
