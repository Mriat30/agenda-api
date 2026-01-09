import { User } from "../domain/user";
import { UserRepository } from "../domain/user-repository";

export class GetUserByTelegramId {
  constructor(private readonly userRepository: UserRepository) {}

  async getUser(telegramId: string): Promise<User | null> {
    return this.userRepository.findByTelegramId(telegramId);
  }
}
