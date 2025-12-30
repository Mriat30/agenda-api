import { Given, Then, When } from "@cucumber/cucumber";
import { expect } from "chai";
import request from "supertest";

import { app } from "../../../src/app";
import { User } from "../../../src/users/domain/user";
import { PrismaUserRepository } from "../../../src/users/infrastructure/user-repository/prisma-user-repository";
import { CustomWorld } from "../support/world";

const userRepository = new PrismaUserRepository();

Given(
  "que no existe un usuario registrado con el telefono {string}",
  async function (this: CustomWorld, telefono: string) {
    await this.prisma.user.deleteMany({
      where: { phone: telefono },
    });
  }
);

Given(
  "que existe un usuario registrado con el telefono {string}",
  async function (this: CustomWorld, telefono: string) {
    await userRepository.save(
      new User("Juan Perez", "test@ŋmail.com", telefono)
    );
  }
);

When(
  "registro un usuario con nombre {string}, teléfono {string} y email {string}",
  async function (
    this: CustomWorld,
    nombre: string,
    telefono: string,
    email: string
  ) {
    this.lastResponse = await request(app).post("/users").send({
      name: nombre,
      phone: telefono,
      email: email,
    });
  }
);

Then("el registro debe ser exitoso", function (this: CustomWorld) {
  expect(this.lastResponse?.status).to.equal(201);
});

Then(
  "el usuario {string} debe existir en el sistema",
  async function (this: CustomWorld, email: string) {
    const usuarioEncontrado = await this.prisma.user.findUnique({
      where: { email: email },
    });
    expect(usuarioEncontrado).to.not.be.null;
    expect(usuarioEncontrado?.email).to.equal(email);
  }
);

When(
  "registro un usuario con nombre {string}, telefono {string}",
  async function (this: CustomWorld, nombre: string, telefono: string) {
    this.lastResponse = await request(app).post("/users").send({
      name: nombre,
      phone: telefono,
    });
  }
);

Then("el registro falla con Email requerido", function (this: CustomWorld) {
  expect(this.lastResponse?.status).to.equal(422);
});

Then(
  "el registro falla con Formato de email invalido",
  function (this: CustomWorld) {
    expect(this.lastResponse?.status).to.equal(400);
  }
);

Then(
  "el registro falla con Telefono ya registrado",
  function (this: CustomWorld) {
    expect(this.lastResponse?.status).to.equal(409);
    expect(this.lastResponse?.body.message).to.equal("Telefono ya registrado");
  }
);
