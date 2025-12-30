import {
  InvalidEmailFormatError,
  RequiredEmailError,
  User,
} from "../../../src/users/domain/user";

describe("User", () => {
  it("should throw RequiredEmailError if the email is not provided", () => {
    expect(() => {
      new User("Mateo", null as never, "1");
    }).toThrow(RequiredEmailError);
  });

  it("should throw RequiredEmailError if email is empty a string", () => {
    expect(() => {
      new User("Mateo", " ", "1");
    }).toThrow(RequiredEmailError);
  });

  it("should throw InvalidEmailFormatError if the email is invalid", () => {
    expect(() => {
      new User("Mateo", "mateo.com", "123");
    }).toThrow(InvalidEmailFormatError);
  });
});
