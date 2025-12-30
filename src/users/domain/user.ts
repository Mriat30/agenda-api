export class RequiredEmailError extends Error {
  constructor() {
    super("El email es obligatorio para registrar un usuario.");
    this.name = "RequiredEmailError";
    Object.setPrototypeOf(this, RequiredEmailError.prototype);
  }
}

export class User {
  constructor(
    readonly name: string,
    readonly email: string,
    readonly phone: string,
    readonly id?: string
  ) {
    if (!email) {
      throw new RequiredEmailError();
    }
  }
}
