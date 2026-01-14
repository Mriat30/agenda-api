import { Agenda } from "../dominio/agenda";
import { AgendasRepositorio } from "../dominio/agendas-repositorio";

export class CrearAgenda {
  constructor(private readonly agendasRepositorio: AgendasRepositorio) {}

  async crear(agenda: Agenda): Promise<void> {
    await this.agendasRepositorio.guardar(agenda);
  }
}
