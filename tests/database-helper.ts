import { prisma } from "../src/infraestructure/db/prisma";

export const DatabaseHelper = {
  async cleanDatabase() {
    if (process.env.NODE_ENV !== "test") {
      throw new Error("Solo se puede limpiar la DB en entorno de test");
    }

    await prisma.$transaction([
      prisma.turnoUnico.deleteMany(),
      prisma.user.deleteMany(),
    ]);
  },

  async disconnect() {
    await prisma.$disconnect();
  },
};
