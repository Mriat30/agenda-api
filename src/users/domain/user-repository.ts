import { User } from "./user";

export interface UserRepository {
  getById(id: string): Promise<User | null>;
  save(user: User): Promise<void>;
}
