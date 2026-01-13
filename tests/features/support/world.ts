import { IWorldOptions, setWorldConstructor, World } from "@cucumber/cucumber";
import type { Response } from "supertest";

import { ProveedorDeFechaYHoraFake } from "../../../src/proveedor_de_tiempo/infraestructura/proveedor-de-fecha-y-hora-fake";
import { User } from "../../../src/users/domain/user";
import { PrismaUsuariosRepositorio } from "../../../src/users/infrastructure/user-repository/prisma-usuarios-repositorio";
import { DatabaseHelper } from "../../database-helper";

export class CustomWorld extends World {
  public lastResponse?: Response;
  public testData: Record<string, any> = {};
  public proveedorDeFechaYHora!: ProveedorDeFechaYHoraFake;
  public usuariosRepositorio = new PrismaUsuariosRepositorio();

  constructor(options: IWorldOptions) {
    super(options);
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
