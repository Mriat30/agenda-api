import {
  PhoneNumberAlreadyExistsError,
  RegisterUser,
} from "../../../src/users/application/register-user";
import { User } from "../../../src/users/domain/user";
import { UsuariosRepositorio } from "../../../src/users/domain/user-repository";

describe("RegisterUser", () => {
  let repository: UsuariosRepositorio;

  beforeEach(() => {
    repository = {
      guardar: jest.fn(),
      obtenerPorNumeroDeTelefono: jest.fn(),
    } as unknown as jest.Mocked<UsuariosRepositorio>;
  });

  it("should guardar a user in the repository", async () => {
    const registerUser = new RegisterUser(repository);
    const newUser = new User("1", "juan", "test", "12345", "Esquel 770");

    await registerUser.register("1", "juan", "test", "12345", "Esquel 770");

    expect(repository.guardar).toHaveBeenCalledWith(newUser);
  });

  it("should throw PhoneNumberAlreadyExistsError if user with same phone number exists", async () => {
    const registerUser = new RegisterUser(repository);
    const usedPhoneNumber = "12345";

    const existingUser = new User(
      "1",
      "juan",
      "test",
      usedPhoneNumber,
      "Esquel 770"
    );
    (repository.obtenerPorNumeroDeTelefono as jest.Mock).mockResolvedValue(
      existingUser
    );

    await expect(
      registerUser.register("1", "pedro", "test", usedPhoneNumber, "Esquel 770")
    ).rejects.toThrow(PhoneNumberAlreadyExistsError);
    expect(repository.obtenerPorNumeroDeTelefono).toHaveBeenCalledWith(
      usedPhoneNumber
    );
    expect(repository.guardar).not.toHaveBeenCalled();
  });
});
