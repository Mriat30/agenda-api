import { Request, Response } from "express";

import {
  AgendarTurnoUnico,
  FechaInvalidaError,
  HorarioNoDisponibleError,
} from "../../aplicacion/agendar-turno-unico";

export class TurnosControlador {
  constructor(private readonly agendarTurnoUnico: AgendarTurnoUnico) {}

  async post(req: Request, res: Response) {
    const { telegramId, masaje, horaInicio, horaFin, fecha } = req.body;
    try {
      await this.agendarTurnoUnico.agendar(
        telegramId,
        masaje,
        new Date(horaInicio),
        new Date(horaFin),
        new Date(fecha)
      );
      res.status(201).send();
    } catch (error) {
      if (error instanceof HorarioNoDisponibleError) {
        res.status(409).send({ error: error.message });
      } else if (error instanceof FechaInvalidaError) {
        res.status(400).send({ error: error.message });
      } else {
        res.status(500).send({ error: "Error interno del servidor" });
      }
    }
  }
}
