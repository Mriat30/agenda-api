import { User } from "../domain/user";
import { UserRepository } from "../domain/user-repository";

export class RegisterUser {
  constructor(private readonly userRepository: UserRepository) {}

  async register(user: User): Promise<void> {
    await this.userRepository.save(user);
  }
}
