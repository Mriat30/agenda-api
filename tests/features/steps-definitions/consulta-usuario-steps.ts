import { Given, Then, When } from "@cucumber/cucumber";
import { expect } from "chai";
import request from "supertest";

import { app } from "../../../src/app";
import { User } from "../../../src/users/domain/user";
import { PrismaUsuariosRepositorio } from "../../../src/users/infrastructure/user-repository/prisma-user-repository";
import { CustomWorld } from "../support/world";

Given(
  "que existe un usuario registrado de nombre {string} y telefono {string}",
  async function (this: CustomWorld, nombre: string, telefono: string) {
    const UsuariosRepositorio = new PrismaUsuariosRepositorio();

    await this.prisma.user.deleteMany({
      where: { phone: telefono },
    });
    const apellido = "Perez";
    const direccion = "Calle Falsa 123";
    const userDomain = new User("1", nombre, apellido, telefono, direccion);

    await UsuariosRepositorio.save(userDomain);
  }
);

Given(
  /^que existe un usuario registrado de nombre "([^"]*)", idTelegram "([^"]*)" y telefono "([^"]*)"$/,
  async function (
    this: CustomWorld,
    nombre: string,
    telegramId: string,
    telefono: string
  ) {
    const UsuariosRepositorio = new PrismaUsuariosRepositorio();

    await this.prisma.user.deleteMany({
      where: { telegram_id: telegramId },
    });
    const apellido = "Perez";
    const direccion = "Calle Falsa 123";
    const userDomain = new User(
      telegramId,
      nombre,
      apellido,
      telefono,
      direccion
    );

    await UsuariosRepositorio.save(userDomain);
  }
);

Given(
  "que no existe un usuario registrado con telefono {string}",
  async function (this: CustomWorld, telefono: string) {
    await this.prisma.user.deleteMany({
      where: { phone: telefono },
    });
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

When(
  "consulto el usuario con idTelegram {string}",
  async function (this: CustomWorld, idTelegram: string) {
    this.lastResponse = await request(app)
      .get("/users")
      .query({ telegramId: idTelegram });
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

Then(
  "la consulta es exitosa y obtengo el nombre {string}, idTelegram {string} y telefono {string}",
  function (
    this: CustomWorld,
    nombre: string,
    idTelegram: string,
    telefono: string
  ) {
    expect(this.lastResponse?.status).to.equal(200);
    expect(this.lastResponse?.body.name).to.equal(nombre);
    expect(this.lastResponse?.body.telegramId).to.equal(idTelegram);
    expect(this.lastResponse?.body.phone).to.equal(telefono);
  }
);

Then(
  "la consulta falla con Usuario no encontrado",
  function (this: CustomWorld) {
    expect(this.lastResponse?.status).to.equal(404);
    expect(this.lastResponse?.body.message).to.equal("Usuario no encontrado");
  }
);
