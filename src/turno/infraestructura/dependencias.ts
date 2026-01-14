import { prisma } from "../../infraestructure/db/prisma";
import { ProveedorDeFechaYHoraReal } from "../../proveedor_de_tiempo/infraestructura/proveedor-de-fecha-y-hora-real";
import { PrismaUsuariosRepositorio } from "../../usuario/infrastructure/user-repository/prisma-usuarios-repositorio";
import { AgendarTurnoUnico } from "../aplicacion/agendar-turno-unico";
import { PrismaTurnosRepositorio } from "./repositorio/prisma-turnos-repositorio";
import { TurnosControlador } from "./rest-api/turnos-controlador";

export const dependencias = {
  repositorio_usuarios: new PrismaUsuariosRepositorio(),
  repositorio: new PrismaTurnosRepositorio(prisma),
  proveedorTiempo: new ProveedorDeFechaYHoraReal(),
};

export const turnosController = new TurnosControlador(
  new AgendarTurnoUnico(
    dependencias.repositorio_usuarios,
    dependencias.repositorio,
    new Proxy(dependencias.proveedorTiempo, {
      get: (target, prop: keyof typeof dependencias.proveedorTiempo) => {
        return dependencias.proveedorTiempo[prop];
      },
    })
  )
);
