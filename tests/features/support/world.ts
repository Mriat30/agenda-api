import { IWorldOptions, setWorldConstructor, World } from "@cucumber/cucumber";
import type { Response } from "supertest";

import { PrismaAgendaRepositorio } from "../../../src/agenda/infraestructura/prisma-agendas-repositorio";
import { app } from "../../../src/app";
import { prisma } from "../../../src/infraestructure/db/prisma";
import { ProveedorDeFechaYHoraFake } from "../../../src/proveedor_de_tiempo/infraestructura/proveedor-de-fecha-y-hora-fake";
import { dependencias } from "../../../src/turno/infraestructura/dependencias";
import { PrismaTurnosRepositorio } from "../../../src/turno/infraestructura/repositorio/prisma-turnos-repositorio";
import { User } from "../../../src/usuario/domain/user";
import { PrismaUsuariosRepositorio } from "../../../src/usuario/infrastructure/user-repository/prisma-usuarios-repositorio";
import { DatabaseHelper } from "../../database-helper";

export class CustomWorld extends World {
  public lastResponse?: Response;
  public testData: Record<string, any> = {};
  public proveedorDeFechaYHora!: ProveedorDeFechaYHoraFake;
  public usuariosRepositorio = new PrismaUsuariosRepositorio();
  public turnosRepositorio = new PrismaTurnosRepositorio(prisma);
  public agnedasRepositorio = new PrismaAgendaRepositorio(prisma);
  public usuarioActualTelegramId?: string;
  public app = app;

  constructor(options: IWorldOptions) {
    super(options);
  }

  setFechaActual(fecha: Date) {
    this.proveedorDeFechaYHora = new ProveedorDeFechaYHoraFake(fecha);
    dependencias.proveedorTiempo = this.proveedorDeFechaYHora;
  }

  async cleanDatabase() {
    await DatabaseHelper.cleanDatabase();
  }

  async createTestUser(user: User) {
    await this.usuariosRepositorio.guardar(user);
  }

  setData<T>(key: string, value: T) {
    this.testData[key] = value;
  }

  getData<T>(key: string): T {
    return this.testData[key];
  }
}

setWorldConstructor(CustomWorld);
