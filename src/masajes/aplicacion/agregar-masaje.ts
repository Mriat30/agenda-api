import { Masaje } from "../dominio/masaje";
import { MasajesRepositorio } from "../dominio/masajes-repositorio";

export class AgregarMasaje {
  constructor(private readonly masajesRepositorio: MasajesRepositorio) {}

  async agregar(nombre: string): Promise<void> {
    const masaje = new Masaje(nombre);
    await this.masajesRepositorio.guardar(masaje);
  }
}
