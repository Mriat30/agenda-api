/* eslint-disable @typescript-eslint/no-unused-vars */
import { Autenticador } from "../dominio/autenticador";

export class ProveedorAutenticacionFake implements Autenticador {
  constructor(private readonly debeSerAdmin: boolean) {}
  async autorizar(id: string): Promise<boolean> {
    return this.debeSerAdmin;
  }
}
