import { Given, Then, When } from "@cucumber/cucumber";
import { expect } from "chai";
import request from "supertest";

import { app } from "../../../src/app";
import { CustomWorld } from "../support/world";

Given(
  "que existe un usuario registrado de nombre {string} y telefono {string}",
  async function (this: CustomWorld, nombre: string, telefono: string) {
    await this.prisma.user.deleteMany({
      where: { phone: telefono },
    });

    await this.prisma.user.create({
      data: {
        name: nombre,
        phone: telefono,
        email: `${nombre.toLowerCase()}@test.com`,
      },
    });
  }
);

When(
  "consulto el usuario con telefono {string}",
  async function (this: CustomWorld, telefono: string) {
    this.lastResponse = await request(app).get(`/users/${telefono}`).send();
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
