import {
  InvalidNameFormatError,
  RequiredNameError,
  User,
} from "../../../src/usuario/domain/user";

describe("User", () => {
  it("should throw RequiredNameError if the name is not provided", () => {
    expect(() => {
      new User("1", null as never, "Riat", "123", "Esquel 770");
    }).toThrow(RequiredNameError);
  });

  it("should throw RequiredNameError if name is empty a string", () => {
    expect(() => {
      new User("1", "", "Riat", "123", "Esquel 770");
    }).toThrow(RequiredNameError);
  });

  it("should throw InvalidNameFormatError if the name is invalid", () => {
    expect(() => {
      new User("1", "Mateo123", "Riat", "123", "Esquel 770");
    }).toThrow(InvalidNameFormatError);
  });
});
