import { PrismaClient } from "@prisma/client";

import { RepositorioBase } from "../../../shared/domain/repositorio_base";
import { Slot } from "../../dominio/slot";
import { TurnoUnico } from "../../dominio/turno-unico";
import { TurnosRepositorio } from "../../dominio/turnos_repositorio";

export class PrismaTurnosRepositorio
  implements TurnosRepositorio, RepositorioBase<TurnoUnico>
{
  constructor(private prisma: PrismaClient) {}

  async guardar(turno: TurnoUnico): Promise<void> {
    await this.prisma.turnoUnico.upsert({
      where: { id: turno.id ?? "" },
      update: {
        masaje: turno.masaje,
        horaInicio: turno.slot.horaInicio,
        horaFin: turno.slot.horaFin,
        fecha: turno.fecha,
        estado: turno.estado,
        telegramId: turno.telegramId,
        agendaId: turno.agendaId,
      },
      create: {
        id: turno.id,
        masaje: turno.masaje,
        horaInicio: turno.slot.horaInicio,
        horaFin: turno.slot.horaFin,
        fecha: turno.fecha,
        estado: turno.estado,
        user: {
          connect: { telegram_id: turno.telegramId },
        },
        agenda: {
          connect: { id: turno.agendaId },
        },
      },
    });
  }

  async obtenerTodos(): Promise<TurnoUnico[]> {
    const prismaTurnos = await this.prisma.turnoUnico.findMany();

    return prismaTurnos.map(
      (prismaTurno) =>
        new TurnoUnico(
          prismaTurno.telegramId,
          prismaTurno.masaje,
          new Slot(prismaTurno.horaInicio, prismaTurno.horaFin),
          prismaTurno.fecha,
          prismaTurno.agendaId,
          prismaTurno.id
        )
    );
  }

  async borrarTodos(): Promise<void> {
    await this.prisma.turnoUnico.deleteMany();
  }

  async obtenerPorFechaYSlot(
    fecha: Date,
    slot: Slot
  ): Promise<TurnoUnico | null> {
    const prismaTurno = await this.prisma.turnoUnico.findFirst({
      where: {
        fecha: fecha,
        horaInicio: slot.horaInicio,
        horaFin: slot.horaFin,
      },
    });

    if (!prismaTurno) return null;

    return new TurnoUnico(
      prismaTurno.telegramId,
      prismaTurno.masaje,
      new Slot(prismaTurno.horaInicio, prismaTurno.horaFin),
      prismaTurno.fecha,
      prismaTurno.agendaId,
      prismaTurno.id
    );
  }
}
