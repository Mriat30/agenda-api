import { Given, Then, When } from "@cucumber/cucumber";
import { expect } from "chai";
import request from "supertest";

import { app } from "../../../src/app";
import { ProveedorDeFechaYHoraFake } from "../../../src/proveedor_de_tiempo/infraestructura/proveedor-de-fecha-y-hora-fake";
import { User } from "../../../src/users/domain/user";
import { PrismaUsuariosRepositorio } from "../../../src/users/infrastructure/user-repository/prisma-user-repository";
import { CustomWorld } from "../support/world";

Given(
  "que ahora es {string} a las {string}",
  async function (this: CustomWorld, fecha: string, hora: string) {
    const fechaInicial = new Date(`${fecha}T${hora}:00Z`);
    this.proveedorDeFechaYHora = new ProveedorDeFechaYHoraFake(fechaInicial);
  }
);

Given("que estoy registrado", async function (this: CustomWorld) {
  const UsuariosRepositorio = new PrismaUsuariosRepositorio();
  const user = new User(
    "55555",
    "Juan",
    "Perez",
    "123456789",
    "Calle Falsa 123"
  );

  await this.prisma.user.deleteMany({ where: { telegram_id: "55555" } });
  await UsuariosRepositorio.guardar(user);
});

Given(
  "que el turno del {string} a las {string} está disponible",
  async function (this: CustomWorld, _fecha: string, _hora: string) {
    // Pendiente de implementación hasta tener el modelo Appointment en Prisma
  }
);

When(
  "intento reservar el turno del {string} a las {string}",
  async function (this: CustomWorld, fecha: string, hora: string) {
    const inicio = `${fecha}T${hora}:00Z`;
    const finDate = new Date(inicio);
    finDate.setHours(finDate.getHours() + 1);

    this.lastResponse = await request(app)
      .post("/turnos")
      .send({
        telegramId: "55555",
        masaje: "Masaje Descontracturante",
        horaInicio: inicio,
        horaFin: finDate.toISOString(),
        fecha: `${fecha}T00:00:00Z`,
      });
  }
);

Then("el turno se reserva exitosamente", function (this: CustomWorld) {
  expect(this.lastResponse?.status).to.equal(201);
});
