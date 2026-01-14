import { GetUserByTelegramId } from "../../../src/usuario/application/get-user-by-telegram-id";
import { User } from "../../../src/usuario/domain/user";
import { UsuariosRepositorio } from "../../../src/usuario/domain/user-repository";

describe("GetUserByTelegramId", () => {
  let repository: UsuariosRepositorio;

  beforeEach(() => {
    repository = {
      obtenerPorTelegramId: jest.fn(),
    } as unknown as jest.Mocked<UsuariosRepositorio>;
  });

  it("should return user from the repository when the user exists", async () => {
    const getUserByTelegramId = new GetUserByTelegramId(repository);
    const telegramId = "123456789";
    const aUser = new User(telegramId, "juan", "test", "12345", "Esquel 770");
    (repository.obtenerPorTelegramId as jest.Mock).mockResolvedValue(aUser);

    const existingUser = await getUserByTelegramId.getUser(telegramId);

    expect(existingUser).toEqual(aUser);
    expect(repository.obtenerPorTelegramId).toHaveBeenCalledWith(
      aUser.telegramId
    );
  });
});
