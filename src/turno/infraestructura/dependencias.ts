import { prisma } from "../../infraestructure/db/prisma";
import { ProveedorDeFechaYHoraReal } from "../../proveedor_de_tiempo/infraestructura/proveedor-de-fecha-y-hora-real";
import { PrismaUsuariosRepositorio } from "../../usuario/infrastructure/user-repository/prisma-usuarios-repositorio";
import {
  AgendarTurnoUnico,
  AgendarTurnoUnicoDependencias,
} from "../aplicacion/agendar-turno-unico";
import { PrismaTurnosRepositorio } from "./repositorio/prisma-turnos-repositorio";
import { TurnosControlador } from "./rest-api/turnos-controlador";

export const dependencias: AgendarTurnoUnicoDependencias = {
  usuariosRepositorio: new PrismaUsuariosRepositorio(),
  turnosRepositorio: new PrismaTurnosRepositorio(prisma),
  proveedorDeFechaYHora: new ProveedorDeFechaYHoraReal(),
};

export const turnosController = new TurnosControlador(
  new AgendarTurnoUnico(dependencias)
);
