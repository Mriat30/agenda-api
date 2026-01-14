import { Request, Response } from "express";

import { AgendaMapper } from "../../../turno/aplicacion/mappers/agenda-mapper";
import { CrearAgenda } from "../../aplicacion/crear-agenda";

export class AgendasControlador {
  constructor(private readonly crearAgenda: CrearAgenda) {}

  async post(req: Request, res: Response) {
    try {
      const agendaDominio = AgendaMapper.toDomain(req.body);
      await this.crearAgenda.crear(agendaDominio);
      res.status(201).send();
    } catch (error: any) {
      console.error("ERROR EN CONTROLADOR AGENDAS:", error);

      return res.status(400).json({
        error: error.message,
      });
    }
  }
}
