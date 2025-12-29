import { User } from "../domain/user";
import { UserRepository } from "../domain/user-repository";

export class RegisterUser {
  constructor(private readonly userRepository: UserRepository) {}

  async register(name: string, email: string, phone: string): Promise<void> {
    await this.userRepository.save(new User("", name, email, phone));
  }
}
