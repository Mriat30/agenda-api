import { UsuariosRepositorio } from "../../usuario/domain/user-repository";
import { Autenticador } from "../dominio/autenticador";

export class ProveedorAutenticacion implements Autenticador {
  constructor(private readonly usuariosRepositorio: UsuariosRepositorio) {}

  async autorizar(id: string): Promise<boolean> {
    const usuario = await this.usuariosRepositorio.obtenerPorTelegramId(id);
    return usuario?.rol === "ADMIN";
  }
}
