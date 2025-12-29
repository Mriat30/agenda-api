import { Request, Response } from "express";

import { RegisterUser } from "../../application/register-user";

export class UserController {
  constructor(private readonly registerUser: RegisterUser) {}

  async register(req: Request, res: Response) {
    const { name, email, phone } = req.body;
    await this.registerUser.register(name, email, phone);
    res.status(201).send();
  }
}
