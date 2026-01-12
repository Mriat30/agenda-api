import { User } from "../domain/user";
import { UsuariosRepositorio } from "../domain/user-repository";

export class GetUserByTelegramId {
  constructor(private readonly UsuariosRepositorio: UsuariosRepositorio) {}

  async getUser(telegramId: string): Promise<User | null> {
    return this.UsuariosRepositorio.findByTelegramId(telegramId);
  }
}
