import { ProveedorDeFechaYHoraReal } from "../../proveedor_de_tiempo/infraestructura/proveedor-de-fecha-y-hora-real";
import { AgendarTurnoUnico } from "../aplicacion/agendar-turno-unico";
import { PrismaTurnosRepositorio } from "./repositorio/prisma-turnos-repositorio";
import { TurnosControlador } from "./rest-api/turnos-controlador";

export const dependencias = {
  repositorio: new PrismaTurnosRepositorio(),
  proveedorTiempo: new ProveedorDeFechaYHoraReal(),
};

export const turnosController = new TurnosControlador(
  new AgendarTurnoUnico(
    dependencias.repositorio,
    new Proxy(dependencias.proveedorTiempo, {
      get: (target, prop: keyof typeof dependencias.proveedorTiempo) => {
        return dependencias.proveedorTiempo[prop];
      },
    })
  )
);
