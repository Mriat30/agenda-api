import { Slot } from "../../turnos/dominio/slot";

export class HorarioDeAtencionPorDia {
  constructor(
    readonly dia: string,
    readonly intervaloDeAtencion: Slot,
    readonly id?: string
  ) {}
}
