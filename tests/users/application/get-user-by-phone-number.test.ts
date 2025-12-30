import { GetUserByPhoneNumber } from "../../../src/users/application/get-user-by-phone-number";
import { User } from "../../../src/users/domain/user";
import { UserRepository } from "../../../src/users/domain/user-repository";

describe("GetUserByPhoneNumber", () => {
  let repository: UserRepository;

  beforeEach(() => {
    repository = {
      save: jest.fn(),
      findByPhoneNumber: jest.fn(),
    } as unknown as jest.Mocked<UserRepository>;
  });

  it("should return a user from the repository if it exists", async () => {
    const getUserByPhoneNumber = new GetUserByPhoneNumber(repository);
    const aUser = new User("juan", "test@gmail.com", "12345");

    (repository.findByPhoneNumber as jest.Mock).mockResolvedValue(aUser);

    const existingUser = await getUserByPhoneNumber.getUser(aUser.phone);

    expect(existingUser).toEqual(aUser);
    expect(repository.findByPhoneNumber).toHaveBeenCalledWith(aUser.phone);
  });
});
