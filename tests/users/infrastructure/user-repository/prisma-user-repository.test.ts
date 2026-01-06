import { User } from "../../../../src/users/domain/user";
import { PrismaUserRepository } from "../../../../src/users/infrastructure/user-repository/prisma-user-repository";
import { DatabaseHelper } from "../../../database-helper";

describe("PrismaUserRepository Integration", () => {
  let repository: PrismaUserRepository;

  beforeEach(async () => {
    repository = new PrismaUserRepository();
    await DatabaseHelper.cleanDatabase();
  });

  afterAll(async () => {
    await DatabaseHelper.disconnect();
  });

  describe("getByPhoneNumber", () => {
    it("should return a user by the phone number", async () => {
      const telegramId = "1";
      const name = "mateo";
      const lastName = "test";
      const phone = "888999";
      const address = "Esquel 770";
      const user = new User(telegramId, name, lastName, phone, address);

      await repository.save(user);

      const foundUser = await repository.findByPhoneNumber(phone);

      expect(foundUser?.telegramId).toBe(telegramId);
      expect(foundUser?.name).toBe(name);
      expect(foundUser?.lastName).toBe(lastName);
      expect(foundUser?.phone).toBe(phone);
      expect(foundUser?.address).toBe(address);
    });
  });
});
