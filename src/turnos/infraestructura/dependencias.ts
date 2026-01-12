import { AgendarTurnoUnico } from "../aplicacion/agendar-turno-unico";
import { PrismaTurnosRepositorio } from "./repositorio/prisma-turnos-repositorio";

const turnosRepositorio = new PrismaTurnosRepositorio();
const agendarTurnoUnico = new AgendarTurnoUnico(turnosRepositorio);

export const turnosController = {
  agendarTurnoUnico,
};
