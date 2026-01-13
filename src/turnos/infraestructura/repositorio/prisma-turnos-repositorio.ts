import { prisma } from "../../../infraestructure/db/prisma";
import { RepositorioBase } from "../../../shared/domain/repositorio_base";
import { TurnoUnico } from "../../dominio/turno-unico";
import { TurnosRepositorio } from "../../dominio/turnos_repositorio";

export class PrismaTurnosRepositorio
  implements TurnosRepositorio, RepositorioBase<TurnoUnico>
{
  async guardar(turno: TurnoUnico): Promise<void> {
    await prisma.turnoUnico.upsert({
      where: { id: turno.id ?? "" },
      update: {
        telegramId: turno.telegramId,
        masaje: turno.masaje,
        horaInicio: turno.slot.horaInicio,
        horaFin: turno.slot.horaFin,
        fecha: turno.fecha,
        estado: turno.estado,
      },
      create: {
        id: turno.id,
        telegramId: turno.telegramId,
        masaje: turno.masaje,
        horaInicio: turno.slot.horaInicio,
        horaFin: turno.slot.horaFin,
        fecha: turno.fecha,
        estado: turno.estado,
      },
    });
  }

  async obtenerTodos(): Promise<TurnoUnico[]> {
    return [];
  }

  async borrarTodos(): Promise<void> {
    // falta implementar
  }
}
