import { Slot } from "../../turno/dominio/slot";

export class HorarioDeAtencionPorDia {
  constructor(
    readonly dia: string,
    readonly intervaloDeAtencion: Slot,
    readonly id?: string
  ) {}
}
