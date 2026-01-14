import { prisma } from "../../infraestructure/db/prisma";
import { Autenticador } from "../../proveedor-autenticacion/dominio/autenticador";
import { AutenticacionMiddleware } from "../../proveedor-autenticacion/infraestructura/middleware/autenticacion-middleware";
import { ProveedorAutenticacion } from "../../proveedor-autenticacion/infraestructura/proveedor-autenticacion";
import { PrismaUsuariosRepositorio } from "../../usuario/infrastructure/user-repository/prisma-usuarios-repositorio";
import { CrearAgenda } from "../aplicacion/crear-agenda";
import { PrismaAgendaRepositorio } from "./prisma-agendas-repositorio";
import { AgendasControlador } from "./rest-api/agendas-controlador";

const agendaRepositorio = new PrismaAgendaRepositorio(prisma);
const usuariosRepositorio = new PrismaUsuariosRepositorio();

const crearAgendaUseCase = new CrearAgenda(agendaRepositorio);

export const authContainer: { autenticador: Autenticador } = {
  autenticador: new ProveedorAutenticacion(usuariosRepositorio),
};

export const authMiddleware = new AutenticacionMiddleware(authContainer);

export const agendasControlador = new AgendasControlador(crearAgendaUseCase);
