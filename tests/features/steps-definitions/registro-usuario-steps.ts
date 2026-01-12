import { Given, Then, When } from "@cucumber/cucumber";
import { expect } from "chai";
import request from "supertest";

import { app } from "../../../src/app";
import { User } from "../../../src/users/domain/user";
import { PrismaUsuariosRepositorio } from "../../../src/users/infrastructure/user-repository/prisma-usuarios-repositorio";
import { CustomWorld } from "../support/world";

const UsuariosRepositorio = new PrismaUsuariosRepositorio();

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
    await UsuariosRepositorio.guardar(
      new User("999", "Existente", "Usuario", telefono, "Calle 123")
    );
  }
);

When(
  "registro un usuario con id {string}, nombre {string}, apellido {string}, teléfono {string} y direccion {string}",
  async function (
    this: CustomWorld,
    id: string,
    nombre: string,
    apellido: string,
    telefono: string,
    direccion: string
  ) {
    this.lastResponse = await request(app).post("/users").send({
      telegramId: id,
      name: nombre,
      lastName: apellido,
      phone: telefono,
      address: direccion,
    });
  }
);

When(
  "registro un usuario con id {string}, apellido {string}, teléfono {string} y direccion {string}",
  async function (
    this: CustomWorld,
    id: string,
    apellido: string,
    telefono: string,
    direccion: string
  ) {
    this.lastResponse = await request(app).post("/users").send({
      telegramId: id,
      lastName: apellido,
      phone: telefono,
      address: direccion,
    });
  }
);

Then("el registro debe ser exitoso", function (this: CustomWorld) {
  expect(this.lastResponse?.status).to.equal(201);
});

Then("el registro falla con Nombre requerido", function (this: CustomWorld) {
  expect(this.lastResponse?.status).to.equal(422);
});

Then(
  "el registro falla con Formato de nombre invalido",
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

Then(
  "el usuario con telefono {string} debe existir en el sistema",
  async function (this: CustomWorld, telefono: string) {
    const usuarioEncontrado = await this.prisma.user.findUnique({
      where: { phone: telefono },
    });
    expect(usuarioEncontrado).to.not.be.null;
    expect(usuarioEncontrado?.phone).to.equal(telefono);
  }
);
