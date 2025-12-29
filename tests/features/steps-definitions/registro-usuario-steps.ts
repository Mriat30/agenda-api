/*
import { Given, Then, When } from "@cucumber/cucumber";
import { expect } from "chai";

import { User } from "../../../src/users/domain/user";
import { PrismaUserRepository } from "../../../src/users/infrastructure/user-repository/prisma-user-repository"

let userRepository: PrismaUserRepository;
let errorRegistro: any;
let usuarioRegistrado: User | null;

Given(
  "que no existe un usuario registrado con el email {string}",
  function (email: string) {
    userRepository = new PrismaUserRepository();

    const user = userRepository.getByEmail(email);
  }
);

When(
  "registro un usuario con nombre {string}, teléfono {string} y email {string}",
  async function (nombre: string, telefono: string, email: string) {
    try {
      const nuevoUsuario = new User(
        "id-generado-o-mock",
        nombre,
        email,
        telefono
      );

      await userRepository.save(nuevoUsuario);
      usuarioRegistrado = nuevoUsuario;
    } catch (error) {
      errorRegistro = error;
    }
  }
);

Then("el registro debe ser exitoso", function () {
  expect(errorRegistro).to.be.undefined;
});

Then(
  "el usuario {string} debe existir en el sistema",
  async function (email: string) {
    const usuarios = await userRepository.findAll();
    const usuarioEncontrado = usuarios.find((u) => u.email === email);

    expect(usuarioEncontrado).to.not.be.undefined;
    expect(usuarioEncontrado?.name).to.equal("Juan");
  }
);
* */
