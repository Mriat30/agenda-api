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

  describe("getById", () => {
    it("debe guardar un usuario y permitir recuperarlo por su ID", async () => {
      const userId = "user-123";
      const userEmail = "mateo@example.com";
      const slackId = "U888999";
      const user = new User(userId, "", userEmail, slackId);

      await repository.save(user);

      const foundUser = await repository.getById(userId);

      expect(foundUser?.id).toBe(userId);
      expect(foundUser?.email).toBe(userEmail);
      expect(foundUser?.phone).toBe(slackId);
    });
  });
});
