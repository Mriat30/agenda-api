import { Request, Response } from "express";

export class HealthController {
  run(req: Request, res: Response) {
    res.status(200).json({
      status: "online",
      message: "Bienvenidos a la API de agenda de masajes",
    });
  }
}
