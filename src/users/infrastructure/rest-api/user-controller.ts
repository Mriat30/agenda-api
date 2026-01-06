import { Request, Response } from "express";

import { GetUserByPhoneNumber } from "../../application/get-user-by-phone-number";
import { RegisterUser } from "../../application/register-user";
import { InvalidNameFormatError, RequiredNameError } from "../../domain/user";

export class UserController {
  constructor(
    private readonly registerUser: RegisterUser,
    private readonly getUserByPhone: GetUserByPhoneNumber
  ) {}

  async register(req: Request, res: Response) {
    // #swagger.tags = ['Users']
    // #swagger.summary = 'Registrar un nuevo usuario'
    /* #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: { $ref: '#/components/schemas/User' }
                }
            }
        }
    */
    const { telegramId, name, lastName, phone, address } = req.body;
    try {
      await this.registerUser.register(
        telegramId,
        name,
        lastName,
        phone,
        address
      );
      res.status(201).send();
    } catch (error) {
      if (error instanceof RequiredNameError) {
        return res.status(422).json({ message: error.message });
      }
      if (error instanceof InvalidNameFormatError) {
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
