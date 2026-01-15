export class RequiredNameError extends Error {
  constructor() {
    super("El nombre es obligatorio para registrar un usuario.");
    this.name = "RequiredNameError";
    Object.setPrototypeOf(this, RequiredNameError.prototype);
  }
}

export class InvalidNameFormatError extends Error {
  constructor(name: string) {
    super(`El formato del nombre "${name}" no es válido.`);
    this.name = "InvalidNameFormatError";
    Object.setPrototypeOf(this, InvalidNameFormatError.prototype);
  }
}

export class User {
  constructor(
    readonly telegramId: string,
    readonly name: string,
    readonly lastName: string,
    readonly phone: string,
    readonly address: string,
    readonly rol: string = "CLIENTE",
    readonly id?: string
  ) {
    this.validateName(name);
  }

  private validateName(name: string) {
    if (!name || name.trim() === "") {
      throw new RequiredNameError();
    }
    const nameRegex = /^[a-zA-Z\s]+$/;
    if (!nameRegex.test(name)) {
      throw new InvalidNameFormatError(name);
    }
  }

  public esAdmin(): boolean {
    return this.rol === "ADMIN";
  }
}
