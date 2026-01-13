import { Request, Response } from "express";

import {
  AgendarTurnoUnico,
  FechaInvalidaError,
  HorarioNoDisponibleError,
  UsuarioNoRegistradoError,
} from "../../aplicacion/agendar-turno-unico";

export class TurnosControlador {
  constructor(private readonly agendarTurnoUnico: AgendarTurnoUnico) {}

  async post(req: Request, res: Response) {
    // #swagger.tags = ['Turnos']
    // #swagger.summary = 'Agendar un turno único'
    /* #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        type: 'object',
                        required: ['telegramId', 'masaje', 'horaInicio', 'horaFin', 'fecha'],
                        properties: {
                            telegramId: { type: 'string', example: '123456789' },
                            masaje: { type: 'string', example: 'Masaje relajante' },
                            horaInicio: { type: 'string', format: 'date-time', example: '2023-10-01T10:00:00Z' },
                            horaFin: { type: 'string', format: 'date-time', example: '2023-10-01T11:00:00Z' },
                            fecha: { type: 'string', format: 'date', example: '2023-10-01' }
                        }
                    }
                }
            }
        }
    */
    /* #swagger.responses[201] = {
            description: 'Turno agendado exitosamente'
        }
    */
    /* #swagger.responses[409] = {
            description: 'Horario no disponible',
            content: {
                "application/json": {
                    schema: {
                        type: 'object',
                        properties: {
                            error: { type: 'string', example: 'Horario no disponible' }
                        }
                    }
                }
            }
        }
    */
    /* #swagger.responses[400] = {
            description: 'Fecha inválida',
            content: {
                "application/json": {
                    schema: {
                        type: 'object',
                        properties: {
                            error: { type: 'string', example: 'Fecha inválida' }
                        }
                    }
                }
            }
        }
    */
    /* #swagger.responses[404] = {
            description: 'Usuario no registrado',
            content: {
                "application/json": {
                    schema: {
                        type: 'object',
                        properties: {
                            error: { type: 'string', example: 'Usuario no registrado' }
                        }
                    }
                }
            }
        }
    */
    /* #swagger.responses[500] = {
            description: 'Error interno del servidor',
            content: {
                "application/json": {
                    schema: {
                        type: 'object',
                        properties: {
                            error: { type: 'string', example: 'Error interno del servidor' }
                        }
                    }
                }
            }
        }
    */
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
      } else if (error instanceof UsuarioNoRegistradoError) {
        res.status(404).send({ error: error.message });
      } else {
        res.status(500).send({ error: "Error interno del servidor" });
      }
    }
  }
}
