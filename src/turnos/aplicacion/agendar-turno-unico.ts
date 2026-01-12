import { Slot } from "../dominio/slot";
import { TurnoUnico } from "../dominio/turno-unico";
import { TurnosRepositorio } from "../dominio/turnos_repositorio";

export class AgendarTurnoUnico {
  constructor(private readonly turnosRepositorio: TurnosRepositorio) {}

  async agendar(
    telegramId: string,
    masaje: string,
    horaInicio: Date,
    horaFin: Date,
    fecha: Date,
    estado: string
  ): Promise<void> {
    const slot = new Slot(horaInicio, horaFin);
    const nuevoTurno = new TurnoUnico(telegramId, masaje, slot, fecha, estado);
    await this.turnosRepositorio.guardar(nuevoTurno);
  }
}
