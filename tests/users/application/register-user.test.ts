import {
  PhoneNumberAlreadyExistsError,
  RegisterUser,
} from "../../../src/users/application/register-user";
import { User } from "../../../src/users/domain/user";
import { UserRepository } from "../../../src/users/domain/user-repository";

describe("RegisterUser", () => {
  let repository: UserRepository;

  beforeEach(() => {
    repository = {
      save: jest.fn(),
      findByPhoneNumber: jest.fn(),
    } as unknown as jest.Mocked<UserRepository>;
  });

  it("should save a user in the repository", async () => {
    const registerUser = new RegisterUser(repository);
    const newUser = new User("juan", "test@gmail.com", "12345");

    await registerUser.register("juan", "test@gmail.com", "12345");

    expect(repository.save).toHaveBeenCalledWith(newUser);
  });

  it("should throw PhoneNumberAlreadyExistsError if user with same phone number exists", async () => {
    const registerUser = new RegisterUser(repository);
    const usedPhoneNumber = "12345";

    const existingUser = new User("juan", "test@gmail.com", usedPhoneNumber);
    (repository.findByPhoneNumber as jest.Mock).mockResolvedValue(existingUser);

    await expect(
      registerUser.register("pedro", "pedro@gmail.com", usedPhoneNumber)
    ).rejects.toThrow(PhoneNumberAlreadyExistsError);
    expect(repository.findByPhoneNumber).toHaveBeenCalledWith(usedPhoneNumber);
    expect(repository.save).not.toHaveBeenCalled();
  });
});
