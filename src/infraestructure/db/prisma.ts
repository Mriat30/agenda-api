import { PrismaClient } from "@prisma/client";

import { Configuration } from "../../shared/infrastructure/config/configuration";

const dbUrl = Configuration.getDatabaseUrl();

const globalForPrisma = global as unknown as { prisma: PrismaClient };
const logLevels =
  process.env.NODE_ENV === "test"
    ? ["error", "warn"]
    : ["query", "info", "warn", "error"];

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    datasources: {
      db: {
        url: dbUrl,
      },
    },
    log: logLevels as never,
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
