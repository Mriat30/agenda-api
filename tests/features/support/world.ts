import { IWorldOptions, setWorldConstructor, World } from "@cucumber/cucumber";
import type { Response } from "supertest";

import { prisma } from "../../../src/infraestructure/db/prisma";
import { ProveedorDeFechaYHoraFake } from "../../../src/proveedor_de_tiempo/infraestructura/proveedor-de-fecha-y-hora-fake";

export class CustomWorld extends World {
  public prisma = prisma;
  public lastResponse?: Response;
  public testData: Record<string, any> = {};
  public proveedorDeFechaYHora!: ProveedorDeFechaYHoraFake;

  constructor(options: IWorldOptions) {
    super(options);
  }

  async cleanDatabase() {
    await this.prisma.$transaction([this.prisma.user.deleteMany({})]);
  }

  async createTestUser(data: {
    telegram_id: string;
    name: string;
    last_name: string;
    phone: string;
    address: string;
  }) {
    return await this.prisma.user.create({ data });
  }

  setData(key: string, value: any) {
    this.testData[key] = value;
  }

  getData(key: string) {
    return this.testData[key];
  }
}

setWorldConstructor(CustomWorld);
