import "dotenv/config";

export class Configuration {
  static getDatabaseUrl(): string {
    const nodeEnv = process.env.NODE_ENV || "development";
    const dbUrl = process.env.DATABASE_URL;
    const testDbUrl = process.env.TEST_DB_URL;

    if (nodeEnv === "production") {
      if (!dbUrl)
        throw new Error(
          "CRITICAL: DATABASE_URL is missing in production environment"
        );
      return dbUrl;
    }

    if (nodeEnv === "test") {
      return (
        testDbUrl ||
        "postgresql://webapi:Passw0rd!@localhost:5433/db_test?schema=public"
      );
    }

    // 3. DESARROLLO LOCAL (Docker Compose)
    // Si no hay nada de lo anterior, usamos la de desarrollo.
    return (
      dbUrl ||
      "postgresql://dev_user:dev_pass@localhost:5432/dev_db?schema=public"
    );
  }

  static getPort(): number {
    return Number(process.env.PORT) || 3000;
  }
}
