import { Slot } from "./slot";

export class TurnoUnico {
  readonly estado: string;

  constructor(
    readonly telegramId: string,
    readonly masaje: string,
    readonly slot: Slot,
    readonly fecha: Date,
    readonly agendaId: string,
    readonly id?: string
  ) {
    this.estado = "pendiente";
  }
}
