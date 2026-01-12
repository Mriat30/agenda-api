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
      save: jest.fn(),
      findByPhoneNumber: jest.fn(),
    } as unknown as jest.Mocked<UsuariosRepositorio>;
  });

  it("should save a user in the repository", async () => {
    const registerUser = new RegisterUser(repository);
    const newUser = new User("1", "juan", "test", "12345", "Esquel 770");

    await registerUser.register("1", "juan", "test", "12345", "Esquel 770");

    expect(repository.save).toHaveBeenCalledWith(newUser);
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
    (repository.findByPhoneNumber as jest.Mock).mockResolvedValue(existingUser);

    await expect(
      registerUser.register("1", "pedro", "test", usedPhoneNumber, "Esquel 770")
    ).rejects.toThrow(PhoneNumberAlreadyExistsError);
    expect(repository.findByPhoneNumber).toHaveBeenCalledWith(usedPhoneNumber);
    expect(repository.save).not.toHaveBeenCalled();
  });
});
