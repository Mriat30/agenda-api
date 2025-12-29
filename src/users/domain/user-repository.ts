import { User } from "./user";

export interface UserRepository {
  getByPhoneNumber(phone: string): Promise<User | null>;
  save(user: User): Promise<void>;
}
