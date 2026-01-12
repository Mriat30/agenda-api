import { TurnoUnico } from "./turno-unico";

export interface TurnosRepositorio {
  guardar(turno: TurnoUnico): Promise<void>;
}
