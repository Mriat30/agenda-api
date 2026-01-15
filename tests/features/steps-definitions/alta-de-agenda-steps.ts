import { DataTable, Given, Then, When } from "@cucumber/cucumber";
import { expect } from "chai";
import request from "supertest";

import { authContainer } from "../../../src/agenda/infraestructura/dependencias";
import { app } from "../../../src/app";
import { ProveedorAutenticacionFake } from "../../../src/proveedor-autenticacion/infraestructura/proveedor-autenticacion-fake";
import { CrearAgendaDTO } from "../../../src/turno/aplicacion/dtos/agenda-dto";
import { CustomWorld } from "../support/world";

Given("que el administrador está autenticado", function (this: CustomWorld) {
  const fake = new ProveedorAutenticacionFake(true);

  authContainer.autenticador = fake;

  this.setData("adminTelegramId", "admin-123");
});

Given("que el administrador no está autenticado", function (this: CustomWorld) {
  const fake = new ProveedorAutenticacionFake(false);

  authContainer.autenticador = fake;

  this.setData("adminTelegramId", "admin-123");
});

When(
  "intento crear una agenda con los siguientes datos:",
  async function (this: CustomWorld, table: DataTable) {
    const data = table.rowsHash();
    this.setData("currentAgendaData", {
      nombre: data.nombre,
      duracionTurnoMinutos: parseInt(data.duracion_turno),
    });
  }
);

When(
  "con la siguiente disponibilidad:",
  async function (this: CustomWorld, table: DataTable) {
    const disponibilidad = table.hashes().map((row) => ({
      dia: row.dia,
      horaInicio: row.inicio,
      horaFin: row.fin,
    }));

    const baseData = this.getData<any>("currentAgendaData");
    const adminId = this.getData<string>("adminTelegramId");

    const dto: CrearAgendaDTO = {
      ...baseData,
      horariosDeAtencion: disponibilidad,
    };

    this.lastResponse = await request(app)
      .post("/agendas")
      .set("x-telegram-id", adminId)
      .send(dto);
  }
);

Then("el alta de la agenda debe ser exitosa", function (this: CustomWorld) {
  expect(this.lastResponse?.status).to.equal(201);
});

Then(
  "el alta de la agenda debe fallar con No estas autenticado para crear una agenda.",
  function (this: CustomWorld) {
    expect(this.lastResponse?.status).to.equal(401);
  }
);
