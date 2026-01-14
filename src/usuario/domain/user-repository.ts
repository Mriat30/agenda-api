import { User } from "./user";

export interface UsuariosRepositorio {
  obtenerPorNumeroDeTelefono(phone: string): Promise<User | null>;
  obtenerPorTelegramId(telegramId: string): Promise<User | null>;
  guardar(user: User): Promise<void>;
}
