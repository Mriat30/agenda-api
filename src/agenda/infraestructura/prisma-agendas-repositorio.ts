import { PrismaClient } from "@prisma/client";

import { Agenda } from "../dominio/agenda";
import { AgendasRepositorio } from "../dominio/agendas-repositorio";

export class PrismaAgendaRepositorio implements AgendasRepositorio {
  constructor(private prisma: PrismaClient) {}

  async guardar(agenda: Agenda): Promise<void> {
    await this.prisma.agenda.create({
      data: {
        id: agenda.id,
        nombre: agenda.nombre,
        duracionTurnosEnMinutos: agenda.duracionTurnosEnMinutos,
        horariosDeAtencion: {
          create: agenda.horariosDeAtencionPorDia.map((h) => ({
            dia: h.dia,
            horaInicio: h.intervaloDeAtencion.horaInicio,
            horaFin: h.intervaloDeAtencion.horaFin,
            activo: true,
          })),
        },
      },
    });
  }
}
