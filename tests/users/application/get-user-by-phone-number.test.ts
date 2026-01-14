import { GetUserByPhoneNumber } from "../../../src/usuario/application/get-user-by-phone-number";
import { User } from "../../../src/usuario/domain/user";
import { UsuariosRepositorio } from "../../../src/usuario/domain/user-repository";

describe("GetUserByPhoneNumber", () => {
  let repository: UsuariosRepositorio;

  beforeEach(() => {
    repository = {
      guardar: jest.fn(),
      obtenerPorNumeroDeTelefono: jest.fn(),
    } as unknown as jest.Mocked<UsuariosRepositorio>;
  });

  it("should return a user from the repository if it exists", async () => {
    const getUserByPhoneNumber = new GetUserByPhoneNumber(repository);
    const aUser = new User("1", "juan", "test", "12345", "Esquel 770");

    (repository.obtenerPorNumeroDeTelefono as jest.Mock).mockResolvedValue(
      aUser
    );

    const existingUser = await getUserByPhoneNumber.getUser(aUser.phone);

    expect(existingUser).toEqual(aUser);
    expect(repository.obtenerPorNumeroDeTelefono).toHaveBeenCalledWith(
      aUser.phone
    );
  });
});
