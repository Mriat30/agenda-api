import { Given, Then, When } from "@cucumber/cucumber";
import { expect } from "chai";
import request from "supertest";

import { app } from "../../../src/app";
import { ProveedorDeFechaYHoraFake } from "../../../src/proveedor_de_tiempo/infraestructura/proveedor-de-fecha-y-hora-fake";
import { Slot } from "../../../src/turnos/dominio/slot";
import { TurnoUnico } from "../../../src/turnos/dominio/turno-unico";
import { dependencias } from "../../../src/turnos/infraestructura/dependencias";
import { User } from "../../../src/users/domain/user";
import { PrismaUsuariosRepositorio } from "../../../src/users/infrastructure/user-repository/prisma-usuarios-repositorio";
import { CustomWorld } from "../support/world";

Given(
  "que ahora es {string} a las {string}",
  async function (this: CustomWorld, fecha: string, hora: string) {
    const [dia, mes, anio] = fecha.split("-");
    const fechaISO = `${anio}-${mes}-${dia}T${hora}:00Z`;
    const fakeTime = new ProveedorDeFechaYHoraFake(new Date(fechaISO));
    dependencias.proveedorTiempo = fakeTime;
    this.proveedorDeFechaYHora = fakeTime;
  }
);

Given("que estoy registrado", async function (this: CustomWorld) {
  const usuariosRepositorio = new PrismaUsuariosRepositorio();
  const telegramId = "55555";
  const user = new User(
    telegramId,
    "Juan",
    "Perez",
    "123456789",
    "Calle Falsa 123"
  );

  await usuariosRepositorio.borrarTodos();
  await usuariosRepositorio.guardar(user);
  this.usuarioActualTelegramId = telegramId;
});

Given(
  "que el turno del {string} a las {string} está disponible",
  async function (this: CustomWorld, _fecha: string, _hora: string) {
    this.turnosRepositorio.borrarTodos();
  }
);

When(
  "intento reservar el turno del {string} a las {string}",
  async function (this: CustomWorld, fechaStr: string, hora: string) {
    const [dia, mes, anio] = fechaStr.split("-");
    const fechaISO = `${anio}-${mes}-${dia}`;

    const inicio = `${fechaISO}T${hora}:00Z`;
    const finDate = new Date(inicio);

    if (isNaN(finDate.getTime())) {
      throw new RangeError(`Fecha inválida generada: ${inicio}`);
    }

    finDate.setHours(finDate.getHours() + 1);

    this.lastResponse = await request(app)
      .post("/turnos")
      .send({
        telegramId: this.usuarioActualTelegramId,
        masaje: "Masaje Descontracturante",
        horaInicio: inicio,
        horaFin: finDate.toISOString(),
        fecha: `${fechaISO}T00:00:00Z`,
      });
  }
);

Then("el turno se reserva exitosamente", function (this: CustomWorld) {
  expect(this.lastResponse?.status).to.equal(201);
});

Given(
  "que el turno del {string} a las {string} está ocupado",
  async function (this: CustomWorld, fechaStr: string, hora: string) {
    const [dia, mes, anio] = fechaStr.split("-");
    const fechaISO = `${anio}-${mes}-${dia}`;
    const inicio = new Date(`${fechaISO}T${hora}:00Z`);
    const fin = new Date(inicio);
    fin.setHours(fin.getHours() + 1);

    const ocupanteId = "99999";
    await this.usuariosRepositorio.guardar(
      new User(ocupanteId, "Otro", "Usuario", "0000", "Calle 2")
    );

    const turnoUnico = new TurnoUnico(
      ocupanteId,
      "Masaje de prueba (Ocupante)",
      new Slot(inicio, fin),
      new Date(`${fechaISO}T00:00:00Z`),
      "pendiente"
    );
    await this.turnosRepositorio.guardar(turnoUnico);
  }
);

Then(
  "la reserva del turno falla con Turno no disponible",
  function (this: CustomWorld) {
    expect(this.lastResponse?.status).to.equal(409);
    expect(this.lastResponse?.body.error).to.equal(
      "El horario seleccionado no está disponible."
    );
  }
);
