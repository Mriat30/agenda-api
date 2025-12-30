import { Given, Then, When } from "@cucumber/cucumber";
import { expect } from "chai";
import request from "supertest";

import { app } from "../../../src/app";
import { User } from "../../../src/users/domain/user";
import { PrismaUserRepository } from "../../../src/users/infrastructure/user-repository/prisma-user-repository";
import { CustomWorld } from "../support/world";

Given(
  "que existe un usuario registrado de nombre {string} y telefono {string}",
  async function (this: CustomWorld, nombre: string, telefono: string) {
    const userRepository = new PrismaUserRepository();

    await this.prisma.user.deleteMany({
      where: { phone: telefono },
    });

    const email = `${nombre.toLowerCase()}@test.com`;
    const userDomain = new User(nombre, email, telefono);

    await userRepository.save(userDomain);
  }
);
When(
  "consulto el usuario con telefono {string}",
  async function (this: CustomWorld, telefono: string) {
    this.lastResponse = await request(app)
      .get("/users")
      .query({ phone: telefono });
  }
);
Then(
  "la consulta es exitosa y obtengo el nombre {string} y telefono {string}",
  function (this: CustomWorld, nombre: string, telefono: string) {
    expect(this.lastResponse?.status).to.equal(200);
    expect(this.lastResponse?.body.name).to.equal(nombre);
    expect(this.lastResponse?.body.phone).to.equal(telefono);
  }
);
