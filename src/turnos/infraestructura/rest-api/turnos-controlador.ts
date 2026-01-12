import { Request, Response } from "express";

import { AgendarTurnoUnico } from "../../aplicacion/agendar-turno-unico";

export class TurnosControlador {
  constructor(private readonly agendarTurnoUnico: AgendarTurnoUnico) {}

  async post(req: Request, res: Response) {
    const { telegramId, masaje, horaInicio, horaFin, fecha } = req.body;
    await this.agendarTurnoUnico.agendar(
      telegramId,
      masaje,
      new Date(horaInicio),
      new Date(horaFin),
      new Date(fecha)
    );
    res.status(201).send();
  }
}
