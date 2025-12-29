import { IWorldOptions, setWorldConstructor, World } from "@cucumber/cucumber";
import type { Response } from "supertest";

import { prisma } from "../../../src/infraestructure/db/prisma";

export class CustomWorld extends World {
  public prisma = prisma;
  public lastResponse?: Response;
  public testData: Record<string, any> = {};

  constructor(options: IWorldOptions) {
    super(options);
  }

  async cleanDatabase() {
    await this.prisma.$transaction([this.prisma.user.deleteMany({})]);
  }

  async createTestUser(data: { name: string; phone: string; email: string }) {
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
