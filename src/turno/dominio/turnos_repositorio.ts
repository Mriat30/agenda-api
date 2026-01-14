import { Slot } from "./slot";
import { TurnoUnico } from "./turno-unico";

export interface TurnosRepositorio {
  guardar(turno: TurnoUnico): Promise<void>;
  obtenerPorFechaYSlot(fecha: Date, slot: Slot): Promise<TurnoUnico | null>;
}
