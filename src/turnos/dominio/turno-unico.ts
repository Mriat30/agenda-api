import { Slot } from "./slot";

export class TurnoUnico {
  constructor(
    readonly telegramId: string,
    readonly masaje: string,
    readonly slot: Slot,
    readonly fecha: Date,
    readonly estado: string,
    readonly id?: string
  ) {}
}
