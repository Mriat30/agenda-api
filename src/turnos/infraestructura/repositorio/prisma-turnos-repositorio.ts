import { prisma } from "../../../infraestructure/db/prisma";
import { RepositorioBase } from "../../../shared/domain/repositorio_base";
import { Slot } from "../../dominio/slot";
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
    const prismaTurnos = await prisma.turnoUnico.findMany();

    if (prismaTurnos.length > 0) {
      return prismaTurnos.map(
        (prismaTurno) =>
          new TurnoUnico(
            prismaTurno.telegramId,
            prismaTurno.masaje,
            new Slot(prismaTurno.horaInicio, prismaTurno.horaFin),
            prismaTurno.fecha,
            prismaTurno.estado,
            prismaTurno.id
          )
      );
    }
    return [];
  }

  async borrarTodos(): Promise<void> {
    await prisma.turnoUnico.deleteMany();
  }

  async obtenerPorFechaYSlot(
    fecha: Date,
    slot: Slot
  ): Promise<TurnoUnico | null> {
    const prismaTurno = await prisma.turnoUnico.findFirst({
      where: {
        fecha: fecha,
        horaInicio: slot.horaInicio,
        horaFin: slot.horaFin,
      },
    });

    if (prismaTurno) {
      return new TurnoUnico(
        prismaTurno.telegramId,
        prismaTurno.masaje,
        new Slot(prismaTurno.horaInicio, prismaTurno.horaFin),
        prismaTurno.fecha,
        prismaTurno.estado,
        prismaTurno.id
      );
    }
    return null;
  }
}
