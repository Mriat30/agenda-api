import { Agenda } from "./agenda";

export interface AgendasRepositorio {
  guardar(agenda: Agenda): Promise<void>;
}
