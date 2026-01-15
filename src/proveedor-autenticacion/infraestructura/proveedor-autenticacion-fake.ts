/* eslint-disable @typescript-eslint/no-unused-vars */
import { Autenticador } from "../dominio/autenticador";
import { UsuarioNoAutorizadoError } from "./proveedor-autenticacion";

export class ProveedorAutenticacionFake implements Autenticador {
  constructor(private readonly debeSerAdmin: boolean) {}
  async autorizar(id: string): Promise<void> {
    if (!this.debeSerAdmin) {
      throw new UsuarioNoAutorizadoError("Usuario no autorizado");
    }
  }
}
