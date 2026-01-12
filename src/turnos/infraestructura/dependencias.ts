import { AgendarTurnoUnico } from "../aplicacion/agendar-turno-unico";
import { PrismaTurnosRepositorio } from "./repositorio/prisma-turnos-repositorio";
import { TurnosControlador } from "./rest-api/turnos-controlador";

const turnosRepositorio = new PrismaTurnosRepositorio();
const agendarTurnoUnico = new AgendarTurnoUnico(turnosRepositorio);

export const turnosController = new TurnosControlador(agendarTurnoUnico);
