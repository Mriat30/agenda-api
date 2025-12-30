import { Request, Response } from "express";

import { GetUserByPhoneNumber } from "../../application/get-user-by-phone-number";
import { RegisterUser } from "../../application/register-user";
import { InvalidEmailFormatError, RequiredEmailError } from "../../domain/user";

export class UserController {
  constructor(
    private readonly registerUser: RegisterUser,
    private readonly getUserByPhone: GetUserByPhoneNumber
  ) {}

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

  async get(req: Request, res: Response) {
    const phone = req.query.phone as string;
    try {
      if (phone) {
        const user = await this.getUserByPhone.getUser(phone);
        if (!user) {
          return res.status(404).json({ message: "Usuario no encontrado" });
        }
        return res.status(200).json(user);
      }
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
}
