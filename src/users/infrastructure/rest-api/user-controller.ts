import { Request, Response } from "express";

import { RegisterUser } from "../../application/register-user";
import { InvalidEmailFormatError, RequiredEmailError } from "../../domain/user";

export class UserController {
  constructor(private readonly registerUser: RegisterUser) {}

  async register(req: Request, res: Response) {
    const { name, email, phone } = req.body;
    try {
      await this.registerUser.register(name, email, phone);
      res.status(201).send();
    } catch (error) {
      if (error instanceof RequiredEmailError) {
        return res.status(422).json({ message: error.message });
      }
      if (error instanceof InvalidEmailFormatError) {
        return res.status(400).json({ message: error.message });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  }
}
