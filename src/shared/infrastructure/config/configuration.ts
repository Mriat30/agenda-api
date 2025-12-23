import "dotenv/config";

export class Configuration {
  static getDatabaseUrl(): string {
    const nodeEnv = process.env.NODE_ENV || "development";

    if (process.env.DATABASE_URL) {
      return process.env.DATABASE_URL;
    }

    if (nodeEnv === "test") {
      return (
        process.env.TEST_DB_URL ||
        "postgresql://test_user:test_password@localhost:5433/test_db?schema=public"
      );
    }

    return "postgresql://dev_user:dev_password@localhost:5432/dev_db?schema=public";
  }

  static getPort(): number {
    return Number(process.env.PORT) || 3000;
  }
}
