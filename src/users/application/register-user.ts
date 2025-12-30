import { User } from "../domain/user";
import { UserRepository } from "../domain/user-repository";

export class RegisterUser {
  constructor(private readonly userRepository: UserRepository) {}

  async register(name: string, email: string, phone: string): Promise<void> {
    const newUser = new User(name, email, phone);
    const existingUser = await this.userRepository.findByPhoneNumber(phone);

    if (existingUser) {
      throw new PhoneNumberAlreadyExistsError(phone);
    }
    await this.userRepository.save(newUser);
  }
}

export class PhoneNumberAlreadyExistsError extends Error {
  constructor(phone: string) {
    super(`El numero de telofono "${phone}" ya esta registrado.`);
    this.name = "PhoneNumberAlreadyExistsError";
    Object.setPrototypeOf(this, PhoneNumberAlreadyExistsError.prototype);
  }
}
