import { User } from "../../../../src/usuario/domain/user";
import { PrismaUsuariosRepositorio } from "../../../../src/usuario/infrastructure/user-repository/prisma-usuarios-repositorio";
import { DatabaseHelper } from "../../../database-helper";

describe("PrismaUsuariosRepositorio Integration", () => {
  let repository: PrismaUsuariosRepositorio;

  beforeEach(async () => {
    repository = new PrismaUsuariosRepositorio();
    await DatabaseHelper.cleanDatabase();
  });

  afterAll(async () => {
    await DatabaseHelper.disconnect();
  });

  describe("obtenerPorNumeroDeTelefono", () => {
    it("should return a user by the phone number", async () => {
      const telegramId = "1";
      const name = "mateo";
      const lastName = "test";
      const phone = "888999";
      const address = "Esquel 770";
      const user = new User(telegramId, name, lastName, phone, address);

      await repository.guardar(user);

      const foundUser = await repository.obtenerPorNumeroDeTelefono(phone);

      expect(foundUser?.telegramId).toBe(telegramId);
      expect(foundUser?.name).toBe(name);
      expect(foundUser?.lastName).toBe(lastName);
      expect(foundUser?.phone).toBe(phone);
      expect(foundUser?.address).toBe(address);
    });
  });

  describe("obtenerPorTelegramId", () => {
    it("should return a user by the telegram id", async () => {
      const telegramId = "2";
      const name = "juan";
      const lastName = "perez";
      const phone = "777666";
      const address = "Calle Falsa 123";
      const user = new User(telegramId, name, lastName, phone, address);

      await repository.guardar(user);

      const foundUser = await repository.obtenerPorTelegramId(telegramId);

      expect(foundUser?.name).toBe(name);
      expect(foundUser?.lastName).toBe(lastName);
      expect(foundUser?.phone).toBe(phone);
      expect(foundUser?.address).toBe(address);
    });
  });

  describe("obtenerTodos", () => {
    it("si no existen usuarios, deberia devolver un arreglo vacio", async () => {
      const users = await repository.obtenerTodos();
      expect(users).toEqual([]);
    });

    it("si existen dos usuarios, deberia devolver un arreglo con dos usuarios", async () => {
      const user1 = new User(
        "3",
        "Ana",
        "Gomez",
        "111222",
        "Av. Siempre Viva 742"
      );
      const user2 = new User(
        "4",
        "Luis",
        "Martinez",
        "333444",
        "Calle Luna 456"
      );

      await repository.guardar(user1);
      await repository.guardar(user2);

      const users = await repository.obtenerTodos();
      expect(users.length).toBe(2);
      expect(users).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ telegramId: "3", name: "Ana" }),
          expect.objectContaining({ telegramId: "4", name: "Luis" }),
        ])
      );
    });
  });

  describe("borrarTodos", () => {
    it("deberia borrar todos los usuarios", async () => {
      const user1 = new User("5", "Carlos", "Lopez", "555666", "Calle Sol 789");
      const user2 = new User("6", "Marta", "Diaz", "777888", "Av. Luna 101");

      await repository.guardar(user1);
      await repository.guardar(user2);
      let users = await repository.obtenerTodos();

      await repository.borrarTodos();

      users = await repository.obtenerTodos();
      expect(users.length).toBe(0);
    });
  });
});
