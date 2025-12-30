import { User } from "./user";

export interface UserRepository {
  findByPhoneNumber(phone: string): Promise<User | null>;
  save(user: User): Promise<void>;
}
