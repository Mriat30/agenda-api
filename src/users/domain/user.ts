export class User {
  constructor(
    readonly name: string,
    readonly email: string,
    readonly phone: string,
    readonly id?: string
  ) {}
}
