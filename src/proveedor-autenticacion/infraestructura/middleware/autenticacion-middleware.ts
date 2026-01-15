import { NextFunction, Request, Response } from "express";

import { Autenticador } from "../../dominio/autenticador";
import { UsuarioNoAutorizadoError } from "../proveedor-autenticacion";

export interface AutenticadorMiddlewareConfig {
  autenticador: Autenticador;
}

export class AutenticacionMiddleware {
  constructor(private config: AutenticadorMiddlewareConfig) {}

  public ejecutar = async (req: Request, res: Response, next: NextFunction) => {
    const telegramId = req.headers["x-telegram-id"] as string;

    try {
      await this.config.autenticador.autorizar(telegramId);
      next();
    } catch (error) {
      if (error instanceof UsuarioNoAutorizadoError) {
        return res.status(403).send({ error: "Usuario no autorizado" });
      }
      return res.status(500).send({ error: "Error interno del servidor" });
    }
  };
}
