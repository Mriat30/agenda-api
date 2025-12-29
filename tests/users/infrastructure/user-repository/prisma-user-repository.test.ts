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
      const name = "mateo";
      const userEmail = "mateo@example.com";
      const phone = "888999";
      const user = new User(name, userEmail, phone);

      await repository.save(user);

      const foundUser = await repository.getByPhoneNumber(phone);

      expect(foundUser?.name).toBe(name);
      expect(foundUser?.email).toBe(userEmail);
      expect(foundUser?.phone).toBe(phone);
    });
  });
});
