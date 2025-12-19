import "dotenv/config";

export class Configuration {
  static getDatabaseUrl(): string {
    const nodeEnv = process.env.NODE_ENV || "development";
    const dbUrl = process.env.DATABASE_URL;
    const testDbUrl = process.env.TEST_DB_URL;

    if (nodeEnv === "test") {
      return (
        testDbUrl ||
        "postgresql://test_user:test_password@localhost:5433/test_db?schema=public"
      );
    }

    if (nodeEnv === "production") {
      if (!dbUrl) {
        throw new Error(
          "CRITICAL: DATABASE_URL is missing in production mode!"
        );
      }
      return dbUrl;
    }

    return (
      dbUrl ||
      "postgresql://dev_user:dev_pass@localhost:5432/dev_db?schema=public"
    );
  }

  static getPort(): number {
    return Number(process.env.PORT) || 3000;
  }
}
