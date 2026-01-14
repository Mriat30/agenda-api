import { Given, Then, When } from "@cucumber/cucumber";
import { expect } from "chai";
import request from "supertest";

import { app } from "../../../src/app";
import { User } from "../../../src/usuario/domain/user";
import { CustomWorld } from "../support/world";

Given(
  "que existe un usuario registrado de nombre {string} y telefono {string}",
  async function (this: CustomWorld, nombre: string, telefono: string) {
    const userDomain = new User(
      "1",
      nombre,
      "Perez",
      telefono,
      "Calle Falsa 123"
    );
    await this.usuariosRepositorio.guardar(userDomain);
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
    const userDomain = new User(
      telegramId,
      nombre,
      "Perez",
      telefono,
      "Calle Falsa 123"
    );
    await this.usuariosRepositorio.guardar(userDomain);
  }
);

Given(
  "que no existe un usuario registrado con telefono {string}",
  async function (this: CustomWorld, _telefono: string) {
    // La DB se limpia en el Before, por lo que no es necesario borrar manualmente.
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
