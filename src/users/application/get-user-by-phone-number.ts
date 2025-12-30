import { User } from "../domain/user";
import { UserRepository } from "../domain/user-repository";

export class GetUserByPhoneNumber {
  constructor(private readonly userRepository: UserRepository) {}

  async getUser(phoneNumber: string): Promise<User | null> {
    return this.userRepository.findByPhoneNumber(phoneNumber);
  }
}
