import { GetUserByTelegramId } from "../../../src/users/application/get-user-by-telegram-id";
import { User } from "../../../src/users/domain/user";
import { UsuariosRepositorio } from "../../../src/users/domain/user-repository";

describe("GetUserByTelegramId", () => {
  let repository: UsuariosRepositorio;

  beforeEach(() => {
    repository = {
      findByTelegramId: jest.fn(),
    } as unknown as jest.Mocked<UsuariosRepositorio>;
  });

  it("should return user from the repository when the user exists", async () => {
    const getUserByTelegramId = new GetUserByTelegramId(repository);
    const telegramId = "123456789";
    const aUser = new User(telegramId, "juan", "test", "12345", "Esquel 770");
    (repository.findByTelegramId as jest.Mock).mockResolvedValue(aUser);

    const existingUser = await getUserByTelegramId.getUser(telegramId);

    expect(existingUser).toEqual(aUser);
    expect(repository.findByTelegramId).toHaveBeenCalledWith(aUser.telegramId);
  });
});
