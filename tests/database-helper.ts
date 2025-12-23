import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface PrismaModel {
  deleteMany: (args?: unknown) => Promise<unknown>;
}

export const DatabaseHelper = {
  async cleanDatabase() {
    if (process.env.NODE_ENV !== "test") {
      throw new Error("Solo se puede limpiar la DB en entorno de test");
    }

    const modelNames = Object.getOwnPropertyNames(prisma).filter(
      (model) => !model.startsWith("$")
    ) as Array<keyof typeof prisma>;

    for (const modelName of modelNames) {
      const model = prisma[modelName] as unknown as PrismaModel;

      if (model && typeof model.deleteMany === "function") {
        await model.deleteMany();
      }
    }
  },

  async disconnect() {
    await prisma.$disconnect();
  },
};
