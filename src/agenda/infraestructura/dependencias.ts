import { prisma } from "../../infraestructure/db/prisma";
import { AutenticacionMiddleware } from "../../proveedor-autenticacion/infraestructura/middleware/autenticacion-middleware";
import { AutenticadorMiddlewareConfig } from "../../proveedor-autenticacion/infraestructura/middleware/autenticacion-middleware";
import { ProveedorAutenticacion } from "../../proveedor-autenticacion/infraestructura/proveedor-autenticacion";
import { PrismaUsuariosRepositorio } from "../../usuario/infrastructure/user-repository/prisma-usuarios-repositorio";
import { CrearAgenda } from "../aplicacion/crear-agenda";
import { PrismaAgendaRepositorio } from "./prisma-agendas-repositorio";
import { AgendasControlador } from "./rest-api/agendas-controlador";

const agendaRepositorio = new PrismaAgendaRepositorio(prisma);
const usuariosRepositorio = new PrismaUsuariosRepositorio();

const crearAgendaUseCase = new CrearAgenda(agendaRepositorio);

export const authConfig: AutenticadorMiddlewareConfig = {
  autenticador: new ProveedorAutenticacion(usuariosRepositorio),
};

export const authMiddleware = new AutenticacionMiddleware(authConfig);

export const agendasControlador = new AgendasControlador(crearAgendaUseCase);
