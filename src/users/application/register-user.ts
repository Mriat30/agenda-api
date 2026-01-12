import { User } from "../domain/user";
import { UsuariosRepositorio } from "../domain/user-repository";

export class RegisterUser {
  constructor(private readonly UsuariosRepositorio: UsuariosRepositorio) {}

  async register(
    idTelegram: string,
    name: string,
    lastName: string,
    phone: string,
    address: string
  ): Promise<void> {
    const newUser = new User(idTelegram, name, lastName, phone, address);
    const existingUser = await this.UsuariosRepositorio.findByPhoneNumber(
      phone
    );

    if (existingUser) {
      throw new PhoneNumberAlreadyExistsError(phone);
    }
    await this.UsuariosRepositorio.save(newUser);
  }
}

export class PhoneNumberAlreadyExistsError extends Error {
  constructor(phone: string) {
    super(`El numero de telofono "${phone}" ya esta registrado.`);
    this.name = "PhoneNumberAlreadyExistsError";
    Object.setPrototypeOf(this, PhoneNumberAlreadyExistsError.prototype);
  }
}
