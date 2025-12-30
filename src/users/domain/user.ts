export class RequiredEmailError extends Error {
  constructor() {
    super("El email es obligatorio para registrar un usuario.");
    this.name = "RequiredEmailError";
    Object.setPrototypeOf(this, RequiredEmailError.prototype);
  }
}

export class InvalidEmailFormatError extends Error {
  constructor(email: string) {
    super(`El formato del email "${email}" no es válido.`);
    this.name = "InvalidEmailFormatError";
    Object.setPrototypeOf(this, InvalidEmailFormatError.prototype);
  }
}

export class User {
  constructor(
    readonly name: string,
    readonly email: string,
    readonly phone: string,
    readonly id?: string
  ) {
    this.validateEmail(email);
  }

  private validateEmail(email: string) {
    if (!email || email.trim() === "") {
      throw new RequiredEmailError();
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      throw new InvalidEmailFormatError(email);
    }
  }
}
