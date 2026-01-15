import { NextFunction, Request, Response } from "express";

import { Autenticador } from "../../dominio/autenticador";

export interface AutenticadorMiddlewareConfig {
  autenticador: Autenticador;
}

export class AutenticacionMiddleware {
  constructor(private config: AutenticadorMiddlewareConfig) {}

  public ejecutar = async (req: Request, res: Response, next: NextFunction) => {
    const telegramId = req.headers["x-telegram-id"] as string;

    if (!telegramId) return res.status(401).send();
    const autorizar = await this.config.autenticador.autorizar(telegramId);
    if (!autorizar) return res.status(403).send();

    next();
  };
}
