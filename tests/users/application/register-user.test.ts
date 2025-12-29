import { RegisterUser } from "../../../src/users/application/register-user";
import { User } from "../../../src/users/domain/user";
import { UserRepository } from "../../../src/users/domain/user-repository";

describe("RegisterUser", () => {
  let repository: UserRepository;

  beforeEach(() => {
    repository = {
      save: jest.fn(),
    } as unknown as jest.Mocked<UserRepository>;
  });

  it("should save a user in the repository", async () => {
    const registerUser = new RegisterUser(repository);
    const newUser = new User("", "juan", "test@gmail.com", "12345");

    await registerUser.register("juan", "test@gmail.com", "12345");

    expect(repository.save).toHaveBeenCalledWith(newUser);
  });
});
