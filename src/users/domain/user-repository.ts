import { User } from "./user";

export interface UsuariosRepositorio {
  findByPhoneNumber(phone: string): Promise<User | null>;
  findByTelegramId(telegramId: string): Promise<User | null>;
  save(user: User): Promise<void>;
}
