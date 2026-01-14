import { HorarioDeAtencionPorDia } from "./horario-de-atencion-por-dia";

export class Agenda {
  constructor(
    readonly nombre: string,
    readonly duracionTurnosEnMinutos: number,
    readonly horariosDeAtencionPorDia: HorarioDeAtencionPorDia[],
    readonly id?: string
  ) {}
}
