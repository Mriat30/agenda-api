import { User } from "../domain/user";
import { UsuariosRepositorio } from "../domain/user-repository";

export class GetUserByPhoneNumber {
  constructor(private readonly UsuariosRepositorio: UsuariosRepositorio) {}

  async getUser(phoneNumber: string): Promise<User | null> {
    return this.UsuariosRepositorio.findByPhoneNumber(phoneNumber);
  }
}
