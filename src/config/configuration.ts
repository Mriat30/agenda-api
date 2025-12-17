import "dotenv/config";

export class Configuration {
  static getDatabaseUrl(): string {
    const mode = process.env.NODE_ENV || "development";

    switch (mode) {
      case "test":
        return (
          process.env.TEST_DB_URL ||
          "postgresql://test_user:test_password@localhost:5433/test_db?schema=public"
        );

      case "production":
        if (!process.env.DATABASE_URL)
          throw new Error("DATABASE_URL is missing in production");
        return process.env.DATABASE_URL;

      default:
        return (
          process.env.DATABASE_URL ||
          "postgresql://dev_user:dev_pass@localhost:5432/dev_db?schema=public"
        );
    }
  }
}
