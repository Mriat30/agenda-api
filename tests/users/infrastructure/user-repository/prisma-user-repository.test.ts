import { prisma } from "../../../../src/infraestructure/db/prisma";
import { PrismaUserRepository } from "../../../../src/users/infrastructure/user-repository/prisma-user-repository";

describe("PrismaUserRepository Integration", () => {
  let repository: PrismaUserRepository;

  beforeAll(() => {
    repository = new PrismaUserRepository();
  });

  beforeEach(async () => {
    await prisma.user.deleteMany();
  });

  describe("getById", () => {
    xit("debe recuperar un usuario insertado en la DB real", async () => {
      // 1. ARRANGE: Insertamos datos directamente en la DB (Bypaseando el repositorio)
      const newUser = await prisma.user.create({
        data: {
          email: "test@example.com",
          name: "Usuario Test",
          // Asegúrate de agregar campos obligatorios si tu schema los pide (ej. password)
        },
      });

      const foundUser = await repository.getById(newUser.id);

      expect(foundUser).toBeDefined();
      expect(foundUser?.id).toBe(newUser.id);
      expect(foundUser?.email).toBe("test@example.com");
    });
  });
});
